import { rsApos } from './regexApostroph';
/** Used to match unescaped characters in compiled string literals. */
export const reUnescapedString = /['\n\r\u2028\u2029\\]/g;
/** Used to compose unicode character classes. */
export const rsAstralRange = '\\ud800-\\udfff';
export const rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23';
export const rsComboSymbolsRange = '\\u20d0-\\u20f0';
export const rsDingbatRange = '\\u2700-\\u27bf';
export const rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff';
export const rsMathOpRange = '\\xac\\xb1\\xd7\\xf7';
export const rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf';
export const rsPunctuationRange = '\\u2000-\\u206f';
export const rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000';
export const rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde';
export const rsVarRange = '\\ufe0e\\ufe0f';
export const rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
/** Used to compose unicode capture groups. */
export const rsAstral = '[' + rsAstralRange + ']';
export const rsBreak = '[' + rsBreakRange + ']';
export const rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']';
export const rsDigits = '\\d+';
export const rsDingbat = '[' + rsDingbatRange + ']';
export const rsLower = '[' + rsLowerRange + ']';
export const rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']';
export const rsFitz = '\\ud83c[\\udffb-\\udfff]';
export const rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
export const rsNonAstral = '[^' + rsAstralRange + ']';
export const rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
export const rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
export const rsUpper = '[' + rsUpperRange + ']';
export const rsZWJ = '\\u200d';
/** Used to compose unicode regexes. */
export const rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')';
export const rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')';
export const rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?';
export const rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?';
export const reOptMod = rsModifier + '?';
export const rsOptVar = '[' + rsVarRange + ']?';
export const rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
export const rsSeq = rsOptVar + reOptMod + rsOptJoin;
export const rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;
export const rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match `RegExp` flags from their coerced string values. */
export const Flags = /\w*$/;

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
export const HasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');
/** Used to detect strings that need a more robust regexp to match words. */
export const HasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
export const Unicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
/** Used to match complex or compound words. */
export const UnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
  rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr,
  rsUpper + '+' + rsOptUpperContr,
  rsDigits,
  rsEmoji
].join('|'), 'g');
/** Used to match words composed of alphanumeric characters. */
export const AsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
export const AsciiWordBreak = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+|\n+/gs;
/** Used to match Latin Unicode letters (excluding mathematical operators). */
export const Latin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
