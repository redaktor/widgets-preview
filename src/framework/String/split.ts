type NN = [number, number];
const HIGH_SURROGATE: NN = [0xd800, 0xdbff];
const LOW_SURROGATE: [number] = [0xdc00];
const REGIONAL: NN = [0x1f1e6, 0x1f1ff];
const FITZPATRICK: NN = [0x1f3fb, 0x1f3ff];
const VARIATION: NN = [0xfe00, 0xfe0f];
const DIACRITICAL_MARKS: NN = [0x20d0, 0x20ff];

const ZWJ = 0x200d;

const GRAPHEMS = [
  0x0308, // ( ◌̈ ) COMBINING DIAERESIS
  0x0937, // ( ष ) DEVANAGARI LETTER SSA
  0x0937, // ( ष ) DEVANAGARI LETTER SSA
  0x093F, // ( ि ) DEVANAGARI VOWEL SIGN I
  0x093F, // ( ि ) DEVANAGARI VOWEL SIGN I
  0x0BA8, // ( ந ) TAMIL LETTER NA
  0x0BBF, // ( ி ) TAMIL VOWEL SIGN I
  0x0BCD, // ( ◌்) TAMIL SIGN VIRAMA
  0x0E31, // ( ◌ั ) THAI CHARACTER MAI HAN-AKAT
  0x0E33, // ( ำ ) THAI CHARACTER SARA AM
  0x0E40, // ( เ ) THAI CHARACTER SARA E
  0x0E49, // ( เ ) THAI CHARACTER MAI THO
  0x1100, // ( ᄀ ) HANGUL CHOSEONG KIYEOK
  0x1161, // ( ᅡ ) HANGUL JUNGSEONG A
  0x11A8 // ( ᆨ ) HANGUL JONGSEONG KIYEOK
];

function realCharacters(s: string) {
  if (typeof s !== 'string') { return [] }
  const result = [];
  let i = 0;
  let increment = 0;
  while (i < s.length) {
    increment += nextUnits(i + increment, s);
    if (isGraphem(s[i + increment])) {
      increment++
    }
    if (isVariationSelector(s[i + increment])) {
      increment++
    }
    if (isDiacriticalMark(s[i + increment])) {
      increment++
    }
    if (isZeroWidthJoiner(s[i + increment])) {
      increment++
      continue
    }
    result.push(s.substring(i, i + increment));
    i += increment;
    increment = 0
  }
  return result
}

// Decide how many code units make up the current character.
// BMP characters: 1 code unit
// Non-BMP characters (represented by surrogate pairs): 2 code units
// Emoji with skin-tone modifiers: 4 code units (2 code points)
// Country flags: 4 code units (2 code points)
// Variations: 2 code units
function nextUnits(i: number, s: string) {
  const current = s[i];
  // If we don't have a value that is part of a surrogate pair, or we're at
  // the end, only take the value at i
  if (!isFirstOfSurrogatePair(current) || i === s.length - 1) {
    return 1
  }

  const currentPair = current + s[i + 1];
  let nextPair = s.substring(i + 2, i + 5);

  // Country flags are comprised of two regional indicator symbols,
  // each represented by a surrogate pair.
  // See http://emojipedia.org/flags/
  // If both pairs are regional indicator symbols, take 4
  if (isRegionalIndicator(currentPair) && isRegionalIndicator(nextPair)) {
    return 4
  }

  // If the next pair make a Fitzpatrick skin tone
  // modifier, take 4
  // See http://emojipedia.org/modifiers/
  // Technically, only some code points are meant to be
  // combined with the skin tone modifiers. This function
  // does not check the current pair to see if it is
  // one of them.
  if (isFitzpatrickModifier(nextPair)) {
    return 4
  }
  return 2
}

function isFirstOfSurrogatePair (s: string) {
  return s && betweenInclusive(s[0].charCodeAt(0), ...HIGH_SURROGATE)
}
function isRegionalIndicator (s: string) {
  return betweenInclusive(codePointFromSurrogatePair(s), ...REGIONAL)
}
function isFitzpatrickModifier (s: string) {
  return betweenInclusive(codePointFromSurrogatePair(s), ...FITZPATRICK)
}
function isVariationSelector (s: string) {
  return typeof s === 'string' && betweenInclusive(s.charCodeAt(0), ...VARIATION)
}
function isDiacriticalMark (s: string) {
  return typeof s === 'string' && betweenInclusive(s.charCodeAt(0), ...DIACRITICAL_MARKS)
}
function isGraphem (s: string) {
  return typeof s === 'string' && GRAPHEMS.indexOf(s.charCodeAt(0)) !== -1
}
function isZeroWidthJoiner (s: string) {
  return typeof s === 'string' && s.charCodeAt(0) === ZWJ
}
function codePointFromSurrogatePair (pair: string) {
  const highOffset = pair.charCodeAt(0) - HIGH_SURROGATE[0];
  const lowOffset = pair.charCodeAt(1) - LOW_SURROGATE[0];
  return (highOffset << 10) + lowOffset + 0x10000
}
function betweenInclusive(value: number, lower: number, upper: number) {
  return value >= lower && value <= upper
}

export function substring(s: string, start: number, length: number) {
  const chars = realCharacters(s);
  if (start === undefined) {
    return s
  }
  if (start >= chars.length) {
    return ''
  }
  const rest = chars.length - start;
  const stringWidth = length === undefined ? rest : length;
  let endIndex: number|undefined = start + stringWidth;
  if (endIndex > (start + rest)) {
    endIndex = undefined
  }
  return chars.slice(start, endIndex).join('')
}

export function clampStrings(s: string | string[], length: number) {
  if (typeof s === 'string') { s = [s] }
  const splitEvery = (n: number, xs: any[], y: any[] = []): any[] =>
    xs.length===0 ? y : splitEvery(n, xs.slice(n), y.concat([xs.slice(0, n)]));
  return s.reduce((a: string[], _s) => {
    const _a = realCharacters(_s);
    if (_a.length <= length) { return a.concat([_s]) }
    return a.concat(splitEvery(length, _a).map((r, i) => `${!!i ? '[…]' : ''}${r.join('')}${!!i ? '' : '[…]'}`))
  }, [])
}

export default realCharacters;
