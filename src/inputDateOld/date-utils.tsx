export const translateNumbers = (function () {
  // Regexp that matches all supported digits.
  // Most Unicode digit classes have the zero digit at a codepoint
  // where the four least significant bits are ether zero or six.
  // The notable exception is the Math-class where several classes
  // have sequential codepoints. The information about the offset
  // is needed when decoding, and by using groups in the RexExp
  // no lookup is needed.
  const reDigit = new RegExp(
    '('+
    '['+
    '\u0030-\u0039\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9'+
    '\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049'+
    '\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u19D0-\u19D9'+
    '\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9'+
    '\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9'+
    '\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59'+
    '\uABF0-\uABF9\uFF10-\uFF19'+
    ']'+
    '|\uD801[\uDCA0-\uDCA9]'+
    '|\uD804[\uDCF0-\uDCF9\uDDD0-\uDDD9\uDEF0-\uDEF9]'+
    '|\uD805['+
    '\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59'+
    '\uDEC0-\uDEC9\uDF30-\uDF39'+
    ']'+
    '|\uD806[\uDCE0-\uDCE9]|\uD807[\uDC50-\uDC59]'+
    '|\uD81A[\uDE60-\uDE69]|\uD81A[\uDF50-\uDF59]'+
    '|\uD83A[\uDD50-\uDD59]'+
    ')|('+
    '['+
    '\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF'+
    '\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF'+
    '\u0D66-\u0D6F\u0DE6-\u0DEF\u1946-\u194F'+
    ']'+
    '|\uD804[\uDC66-\uDC6F\uDD36-\uDD3F]'+
    ')|('+
    '\uD835[\uDFCE-\uDFFF]'+
    ')',
    'g'
  );

  function replace(match: string, offset0: string, offset6: string, offsetMath: string) {
    const raw = match.charCodeAt(match.length - 1);
    const digit = offset0 ? raw & 0xF : (offset6 ? (raw -6) & 0xF :
                                         (offsetMath ? ((raw - 0xCE) & 0x3F) % 10 : null));
    return !digit ? match : String.fromCharCode(48 + digit);
  }
  return function replaceDigits(input: string) {
    return input.replace(reDigit, replace);
  }
})();

type Token = [RegExp, { month: number; day: number; year: number }, string];
export interface Tokens{[key: string]: Token};
export interface ParsedDate { value: Date; locale: string; }

export const getFormats = (): Tokens => {
	const d = '(\\d{1,2})';
	const m = '(\\d{1,2})';
	const y = '(\\d{2}|\\d{4})';
	const mF = {
		iso: { month: 2, day: 3, year: 1 },
		us: { month: 1, day: 2, year: 3 },
		std: { month: 2, day: 1, year: 3 }
	};

	return {
		// standard 'YYYY-mm-dd' format
		iso: [new RegExp(`^${y}-${m}-${d}$`), mF.iso, 'fr-CA'],
		// US-only 'mm/dd/yyyy' format
		enUS: [new RegExp(`^${m} ?\/ ?${d} ?\/ ?${y}$`), mF.us, 'en-US'],
		// standard 'dd/mm/yyyy' format
		enGB: [new RegExp(`^${d} ?\/ ?${m} ?\/ ?${y}$`), mF.std, 'en-GB'],
		// standard 'dd.mm.yyyy' format
		// "de":"31.12.2020", "cs":"31. 12. 2020", "hr":"31. 12. 2020.", "bg":"31.12.2020 г."
		int: [new RegExp(`^${d} ?[.] ?${m} ?[.] ?${y}([.]| r[.])?$`), mF.std, 'de'],

		// "ko", "hu":"2020. 12. 31."
		koHu: [new RegExp(`^${y} ?[.] ?${m} ?[.] ?${d}[.]?$`), mF.iso, 'ko'],
		// "yue", "en-ZA", "ja", "zh", "zh", "ak", "eu": "2020/12/31"
		yue: [new RegExp(`^${y} ?\/ ?${m} ?\/ ?${d}$`), mF.iso, 'en-ZA'],
		// "nl","as","fy","my","qu","wo","yi":"31-12-2020"
		nl: [new RegExp(`^${d}-${m}-${y}$`), mF.std, 'nl-NL'],
	}
}

const regExps = getFormats();

const dateExpressions = (userLocale?: string) => {
	const testDate = new Date(2021, 3, 3);
	const samples = {
		enUS: '4/3/2021',
		koHu: '2021. 4. 3.',
		yue: '2021/4/3',
		de: '3.4.2021',
		cs: '3. 4. 2021',
		hr: '03. 04. 2021.',
		bg: '3.04.2021 г.',
		nl: '3-4-2021'
	}
	const userLocalised = !!userLocale &&
		Intl.DateTimeFormat(userLocale).format(testDate);
	const localeLocalised = Intl.DateTimeFormat().format(testDate); // April 3
	const hasLocale = {enUS:0,	enGB: 0, int: 0, koHu: 0, yue: 0};

	const tokens: Token[] = userLocalised === samples.nl ? [regExps.nl, regExps.iso] : [regExps.iso];
	if (localeLocalised === samples.nl) {
		tokens.push(regExps.nl);
	}
	const localise = (localised: string) => {
		if (localised === samples.enUS) {
			hasLocale.enUS = 1;
			tokens.push(regExps.enUS);
		} else {
			hasLocale.enGB = 1;
			tokens.push(regExps.enGB);
		}
		if (
			localised === samples.de || localised === samples.cs ||
			localised === samples.hr || localised === samples.bg
		) {
			hasLocale.int = 1;
			tokens.push(regExps.int);
		} else if (localised === samples.koHu) {
			hasLocale.koHu = 1;
			tokens.push(regExps.koHu);
		} else if (localised === samples.yue) {
			hasLocale.yue = 1;
			tokens.push(regExps.yue);
		}
	}
	localise(!!userLocalised ? userLocalised : localeLocalised);

	if (!hasLocale.int) {
		tokens.push(regExps.int);
	}
	if (!hasLocale.enGB) {
		tokens.push(regExps.enGB);
	}
	if (!hasLocale.enUS) {
		tokens.push(regExps.enUS);
	}
	if (!hasLocale.koHu) {
		tokens.push(regExps.koHu);
	}
	if (!hasLocale.yue) {
		tokens.push(regExps.yue);
	}
	return tokens;
};

export function parseDate(value?: string, userLocale?: string): ParsedDate | undefined {
	if (!value) {
		return undefined;
	}
	value = value.trim();
	const { locale: localLocale } = Intl.DateTimeFormat().resolvedOptions();
	const matches = [];
	for (let [exp, order, fallbackLocale] of dateExpressions()) {
		const match = value.match(exp);
		if (match !== null) {
			const [y,m,d] = [
				parseInt(match[order.year], 10),
				parseInt(match[order.month], 10) - 1,
				parseInt(match[order.day], 10)
			];
			if (m > 12 || d > 31) {
				continue
			}
			const value = match[order.year].length === 4 ?
				new Date(y, m, d) : new Date(y > 50 ? (1900 + y) :(2000 + y), m, d);

			const locale = (!!userLocale && Intl.DateTimeFormat(userLocale).format(value) === match[0]) ?
				userLocale : (
					Intl.DateTimeFormat().format(value) === match[0] ? localLocale : fallbackLocale
				);

			if (match[order.year].length === 4) {
				return { value, locale };
			} else {
				matches.push({ value, locale })
			}
		}
	}
	return !!matches.length ? matches[0] : undefined;
}

export function formatDateISO(date: Date | undefined) {
	if (!date) {
		return '';
	}

	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date
		.getDate()
		.toString()
		.padStart(2, '0');

	return `${year}-${month}-${day}`;
}

export function formatDate(date: Date) {
	return Intl.DateTimeFormat().format(date);
}
