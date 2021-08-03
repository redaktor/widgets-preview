import spacetime from '@redaktor/widgets/common/spacetime';
import { TimeTarget, fixed, numeric } from '@redaktor/widgets/common/data/timeRelative';

export type ParseableDate = string | number | Date | null | undefined;
export type Token = [RegExp, { month: number; day: number; year: number }, string];
export interface Tokens { [key: string]: Token }
export interface RelativeDate { value: Date; expression: [TimeTarget, number]; }

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

export const dateExpressions = (userLocales: string[] = []) => {
	const testDate = new Date(2021, 3, 3);
	const [d, m, y] = ['(\\d{1,2})', '(\\d{1,2})', '(\\d{2}|\\d{4})'];
	const mF = {
		iso: { month: 2, day: 3, year: 1 },
		us: { month: 1, day: 2, year: 3 },
		std: { month: 2, day: 1, year: 3 }
	};
	const regExps: Tokens = {
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
	const localeLocalised = Intl.DateTimeFormat().format(testDate); // April 3
	const validLocales = userLocales.filter((ul) =>
		!!Intl.DateTimeFormat(ul).format(testDate));
	const hasNL = !!(validLocales.filter((ul) => {
		return Intl.DateTimeFormat(ul).format(testDate) === samples.nl
	})).length;
	const tokens: Token[] = hasNL ? [regExps.nl, regExps.iso] : [regExps.iso];
	if (localeLocalised === samples.nl) {
		tokens.push(regExps.nl);
	}
	const hasLocale = {enUS:0,	enGB: 0, int: 0, koHu: 0, yue: 0};
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
	validLocales.concat([Intl.DateTimeFormat().resolvedOptions().locale]).forEach((l) => { localise(l) });
	['int','enGB','enUS','koHu','yue'].forEach((k) => !(hasLocale as any)[k] && tokens.push(regExps[k]));
	return tokens;
};

function rel2date(rel: [TimeTarget, number], relativeTo: Date = (new Date()), timezone?: string): RelativeDate | undefined {
	if (rel) {
		const [unit, nr] = rel;
		let s = spacetime(relativeTo, timezone);
		s = s[nr < 0 ? 'subtract' : 'add'](Math.abs(nr), unit);
		return {value: s.d, expression: rel}
	}
}
export function parseRelative(
	value?:string,
	userLocales:string[] = [],
	relativeTo: Date = (new Date()),
	timezone?: string
): {value: Date, expression: [TimeTarget, number]} | undefined {
	if (typeof value !== 'string' || !value.length) { return }
	const IRTF: any = (Intl as any).RelativeTimeFormat;
  const translated = translateNumbers(value.trim());
  const numbers = translated.match(/\d{1,64}/);
	const hasNumber = !!numbers && !!numbers.length;
	const nr = hasNumber && numbers && numbers[0] && parseInt(numbers[0], 10);
	let i: number, j: number, k: number;
	if ((!!Intl && !!IRTF && typeof nr === 'number' && !isNaN(nr))) {
		const types: TimeTarget[] = ['second', 'minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'];
    const formats = ['short', 'narrow', 'long'];
    const unique = (value: string, index: number, self: string[]) => self.indexOf(value) === index;
  	const locales = IRTF.supportedLocalesOf(
	  	userLocales.concat([new IRTF().resolvedOptions().locale, 'zh','es','en','hi','de','fr']),
      { localeMatcher: 'lookup' }
  	).filter(unique);

    for (i = 0; i < locales.length; i++) {
    	const l = locales[i];
      try {
      	for (j = 0; j < types.length; j++) {
          const _numeric = formats.map((style) => new IRTF(l, { numeric: "always", style })
						.format(nr, types[j])).filter(unique);
          const _numericNull = formats.map((style) => new IRTF(l, { numeric: "always", style })
						.format(0, types[j])).filter(unique);
          const _numericMinus = formats.map((style) => new IRTF(l, { numeric: "always", style })
						.format(0-nr, types[j])).filter(unique);
          for (k = 0; k < _numeric.length; k++) {
          	if (translated === _numeric[k] || value.trim() === _numeric[k]) {
            	return rel2date([types[j], nr], relativeTo, timezone);
            }
          }
          for (k = 0; k < _numericNull.length; k++) {
          	if (translated === _numericNull[k] || value.trim() === _numericNull[k]) {
            	return rel2date([types[j], 0], relativeTo, timezone);
            }
          }
          for (k = 0; k < _numericMinus.length; k++) {
          	if (translated === _numericMinus[k] || value.trim() === _numericMinus[k]) {
            	return rel2date([types[j], 0-nr], relativeTo, timezone);
            }
          }
				}
			} catch(e) { }
    }
	}
  for (k = 0; k < fixed.length; k++) {
    if (fixed[k][2].test(value.trim())) {
      return rel2date([fixed[k][0], fixed[k][1]], relativeTo, timezone);
    }
  }
  for (k = 0; k < numeric.length; k++) {
  	const type = numeric[k][0];
    const matches = (value.match(numeric[k][2])||[]).filter((rr) => !!rr && rr !== value);
    if (matches && matches.length > 1) {
    	const _nr = parseInt(translateNumbers(matches[1].trim()), 10);
      if (!isNaN(_nr) && _nr > -1) {
      	return rel2date([type, numeric[k][1] < 0 ? 0-_nr : _nr], relativeTo, timezone);
      }
    }
  }
}

export function parseDate(
	value?: string,
	userLocales: string[] = [],
	relativeTo: Date = (new Date()),
	timezone?: string
): Date | undefined {
	if (!value) { return undefined }
	value = value.trim();
	const matches = [];
	for (let [exp, order] of dateExpressions(userLocales)) {
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

			if (match[order.year].length === 4) {
				return value;
			} else {
				matches.push(value)
			}
		}
	}
	if (!matches[0]) {
		const rel = parseRelative(value, userLocales, relativeTo, timezone);
		if (!!rel) { return rel.value }
	}
	return matches[0];
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

export function formatDate(date: Date = (new Date()), userLocales?: string[]) {
	if (Array.isArray(userLocales) && !userLocales.length) {
		userLocales = void 0;
	}
	return Intl.DateTimeFormat(userLocales).format(date);
}
