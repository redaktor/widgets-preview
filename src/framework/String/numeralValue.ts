import units, {metric, unitDefinitions, Unit, UnitName, Category} from './lexicon/units';
/* TODO
for parsing numerals to numbers, see the nlp branch with ../lexicon/numbers !
*/

const pows = {
	// regexPrefix, regexSuffix
	_2: ['s?q[. ]*|square ?|quadrat ?|centiare|centare', ' carr[eé]', '[²]$'].map((r) => new RegExp(r, 'i')),
	_3: ['[ck]b[. ]*|[ck]ubi[ck] ?', ' cube', '[³]$'].map((r) => new RegExp(r, 'i'))
	// m²|m2|ft²|ft2 AND 3 TODO
};

interface UnitResult {
  name: string;
  category: string;
  pow: number;
  unit?: {
    system: string;
    category: string;
    toBase?: number;
    name: string;
  }
  baseUnit?: {
    name: string;
  }
  prefix?: {
    toBase: number;
    name: string;
    by?: number;
  }
}
interface AmountUnitResult extends UnitResult {
  amount: number;
}
function getUnit(category: Category, name: string, pow: number, system = 'metric'): UnitResult['unit'] {
  name = `${name}${pow === 1 ? '' : (pow === 2 ? '²' : '³')}`;
  return {system, category, name}
}
function getPow(s: string) {
	let pow2s = s, pow3s = s;
	pows._2.forEach((r) => { pow2s = pow2s.replace(r, '') });
  pows._3.forEach((r) => { pow3s = pow3s.replace(r, '') });
  let pow;
  if (pow2s !== s) {
    s = pow2s;
    pow = 2;
  } else if (pow3s !== s) {
    s = pow3s;
    pow = 3;
  } else {
  	pow = 1;
  }
  return pow
}
function parseSystem(s: string, system: Unit[], category: Category) {
	const res: UnitResult = {name: s, category, pow: getPow(s)};
  loop:
  for (const a of system.values()) {
  	const [shortRegexes, longRegex, imperialToBase] = a;
    const regexes = shortRegexes.concat([longRegex]).values();
    for (let r of regexes) {
      if (new RegExp(`^(${r})$`, r === shortRegexes[0] ? '' : 'i').test(s)) {
      	const name = `${shortRegexes[0]}${(res.pow === 2 ? '²' : (res.pow === 3 ? '³' : ''))}`.replace(' ?','');
        res.unit = getUnit(category, name, res.pow);
        if (res.unit && imperialToBase) { res.unit.toBase = imperialToBase }
        res.baseUnit = {name};
        break loop;
      }
    }
  }
	return !!res.unit && res;
}
export function parseUnit(s: string, category: Category) {
  s = s.trim();
  let res: UnitResult | false = {name: s, category, pow: getPow(s)};
  const prefixes = metric.prefix.values();
  const metrics = units[category].metric.values();
  loop:
  for (const a of metrics) {
    // [ [['m'],'meters?|m[eè]tre'] ]
    const [shortRegexArray, longRegex] = a;
    for (const pa of prefixes) {
      // [18,'E','e(?:ks|x)a',60]
      const [toBase, shortPrefixRegex, longPrefixRegex, by] = pa;
      let shortRegexes = shortRegexArray.values();
      const name = `${shortRegexArray[0]}${(res.pow === 2 ? '²' : (res.pow === 3 ? '³' : ''))}`.replace(' ?','');
      for (let shortRegex of shortRegexes) {
        if (new RegExp(`^(${shortRegex})$`).test(s) || new RegExp(`^(${longRegex})$`, 'i').test(s)) {
          res.unit = getUnit(category, name, res.pow);
          res.baseUnit = {name};
        } else if (new RegExp(`^(${shortPrefixRegex})(${shortRegex})`).test(s) || new RegExp(`^(${longPrefixRegex})(${longRegex})`, 'i').test(s)) {
          res.unit = getUnit(category, `${shortPrefixRegex}${name}`, res.pow);
          res.prefix = {toBase, name: shortPrefixRegex, by};
          res.baseUnit = {name};
        }
        if (res.unit) {
          res.unit.toBase = toBase||1;
          break loop;
        }
      }
    }
  }

  if (res.hasOwnProperty('unit')) { return res }

  const {us, nautical, digital} = units[category];
  if (!!us) { res = parseSystem(s, us, category) }
  if (!res.hasOwnProperty('unit') && !!nautical) { res = parseSystem(s, nautical, category) }
  if (!res.hasOwnProperty('unit') && !!digital) { res = parseSystem(s, digital, category) }
  return !!res && res.hasOwnProperty('unit') && res
}

export default function parseAmountAndUnit(s: string, unitCategory: Category, defaultUnit?: UnitName): AmountUnitResult | undefined {
	let hasAmount = false;
  const res = s.split(/\s/).map((w) => {
    const _amount = parseFloat(w.trim().replace(',',''));
    const amount = !isNaN(_amount) && _amount;
    if (typeof amount === 'number' && !hasAmount) {
      hasAmount = true;
      return amount
    } else if (hasAmount) {
      const unit = parseUnit(w, unitCategory);
      return !!unit && unit;
    }
    return false
  }).filter((v) => (typeof v === 'number' || !!v));
  if (res.length > 1 && typeof res[0] === 'number' && typeof res[1] === 'object') {
  	return {amount: (res[0] as number), ...(res[1] as UnitResult)}
  } else if (res.length > 0 && typeof res[0] === 'number' && !!defaultUnit && unitDefinitions.hasOwnProperty(defaultUnit)) {
    const amount = res[0];
    if (typeof amount === 'number' && !isNaN(amount)) {
      return {amount, ...unitDefinitions[defaultUnit]}
    }
  }
}
