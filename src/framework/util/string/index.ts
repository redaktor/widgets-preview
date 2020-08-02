import has from '@dojo/framework/core/has';
import { lang } from '../../../dojo/core/main';
import { castSlice, isIndex } from '../array/helper';
import { is } from '../is';
import { to } from '../to';
import { eq } from '../lang';
import * as r from './regexes';
import jsonPointer from '../../JSON/Pointer';
const MAX_SAFE_INTEGER = 9007199254740991;
type _s = string|string[];
/* TODO
FIXME : is functions !!!
  DOC FIXME
  see pwLog / substitute
*/

/* helpers */
/* TODO FIXME API member
function KW(str: any, ...args: any[]) {
  args.unshift([str,'str','string']);
  return kwArgs.apply(null, args);
}
*/

function unicodeSize(str: string) {
  var result = r.Unicode.lastIndex = 0;
  while (r.Unicode.test(str)) {
    result++;
  }
  return result;
}

function baseRepeat(str: string, n: number) {
  var result = '';
  if (!str || n < 1 || n > MAX_SAFE_INTEGER) {
    return result;
  }
  // Leverage the exponentiation by squaring algorithm for a faster repeat.
  // SeeAlso https://en.wikipedia.org/wiki/Exponentiation_by_squaring !
  do {
    if (n % 2) { result += str; }
    n = Math.floor(n / 2);
    if (n) { str += str; }
  } while (n);

  return result;
}
function isIterateeCall(value: any, i: any, o: any) {
  if (typeof o !== 'object') { return false; }
  var type = typeof i;
  if (type === 'number'
    ? (Array.isArray(o) && isIndex(i, o.length))
    : (type == 'string' && o.hasOwnProperty(i))
  ) {
    return eq(o[i], value);
  }
  return false;
}


function paddingStr(length: number, chars: string = ' ') {
  chars = to(chars, 'string');

  var charsLength = chars.length;
  if (charsLength < 2) {
    return charsLength ? baseRepeat(chars, length) : chars;
  }
  var result = baseRepeat(chars, Math.ceil(length / stringSize(chars)));
  return hasUnicode(chars)
    ? castSlice(stringToArray(result), 0, length).join('')
    : result.slice(0, length);
}
export function stripTags(s: string) {
  return (s.replace(/(<([^>]+)>)/ig, '')) || '';
}
export function addSlashes(s: string) {
  return (s.replace(/\\/g, '\\\\').replace(/\'/g, "\\'").replace(/\"/g, '\\"')) || '';
}


/* EXPORTS WITH ONLY 1 ARGUMENT (a string) */
export function hasUnicode(str: string) {
  return r.HasUnicode.test(str);
}
export function hasUnicodeWord(str: string): boolean {
  return r.HasUnicodeWord.test(str);
}
export function unicodeWords(str: string): RegExpMatchArray {
  return str.match(r.UnicodeWord) || [];
}
export function asciiWords(str: string): RegExpMatchArray {
  return str.match(r.AsciiWord) || [];
}
export function stringToArray(str: string, splitter: string = '') {
  return hasUnicode(str) ? (str.match(r.Unicode) || []) : str.split(splitter);
}

/**
 * Gets the number of symbols in `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the string size.
 */

export function stringSize(str: string) {
  return hasUnicode(str) ? unicodeSize(str) : str.length;
}


export function deburr(str: string) {
  str = to(str, 'string');
  const deburrLetter = (o: any): any => ((k: string) => (o === null ? undefined : o[k]));
  return str && str.replace(r.Latin, deburrLetter).replace(r.ComboMark, '');
}

export function words(str: string, pattern?: RegExp|string, guard?: any): RegExpMatchArray {
  str = to(str, 'string');
  pattern = guard ? void 0 : pattern;
  if (pattern === void 0) {
    return hasUnicodeWord(str) ? unicodeWords(str) : asciiWords(str);
  }
  return str.match(<RegExp>pattern) || [];
}


/**
 * Pads `string` on the left and right sides if it's shorter than `length`.
 * Padding characters are truncated if they can't be evenly divided by `length`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * _.pad('abc', 8);
 * // => '  abc   '
 *
 * _.pad('abc', 8, '_-');
 * // => '_-abc_-_'
 *
 * _.pad('abc', 3);
 * // => 'abc'
 */
export function pad(str: string, length: number, chars: string = ' ') {
  const o = KW(str, [length,'length','integer'], [chars,'chars','string']);
  var strLength = o.length ? stringSize(o.str) : 0;
  if (!o.length || strLength >= o.length) { return o.str; }
  var mid = (o.length - strLength) / 2;
  return (
    paddingStr(Math.floor(mid), o.chars) +
    o.str +
    paddingStr(Math.ceil(mid), o.chars)
  );
}

/**
 * Pads `string` on the right side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * _.padEnd('abc', 6);
 * // => 'abc   '
 *
 * _.padEnd('abc', 6, '_-');
 * // => 'abc_-_'
 *
 * _.padEnd('abc', 3);
 * // => 'abc'
 */
export function padEnd(str: string, length: number, chars: string = ' ') {
  const o = KW(str, [length,'length','integer'], [chars,'chars','string']);
  var strLength = o.length ? stringSize(o.str) : 0;
  return (o.length && strLength < o.length)
    ? (o.str + paddingStr(o.length - strLength, o.chars))
    : o.str;
}

/**
 * Pads `string` on the left side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * _.padStart('abc', 6);
 * // => '   abc'
 *
 * _.padStart('abc', 6, '_-');
 * // => '_-_abc'
 *
 * _.padStart('abc', 3);
 * // => 'abc'
 */
export function padStart(str: string, length: number, chars: string = ' ') {
  const o = KW(str, [length,'length','integer'], [chars,'chars','string']);
  var strLength = o.length ? stringSize(o.str) : 0;
  return (o.length && strLength < o.length)
    ? (paddingStr(o.length - strLength, o.chars) + o.str)
    : o.str;
}



/**
 * Truncates `string` if it's longer than the given maximum string length.
 * The last characters of the truncated string are replaced with the omission
 * string which defaults to "...".
 *
 * TODO - DOC [arguments OR kwArgs/options]
 */
export function truncate(str: string, length = 30, omission = ' […]', separator?: any) {
  const o = KW( str,
    [length, 'length', 'integer'],
    [omission, 'omission', 'string'],
    [separator, 'separator']
  );
  var Sep = o.separator;
  var strLength = o.str.length;
  if (hasUnicode(o.str)) {
    var Symbols = stringToArray(o.str);
    strLength = Symbols.length;
  }
  if (o.length >= strLength) { return o.str; }
  var end = o.length - stringSize(o.omission);
  if (end < 1) { return o.omission; }
  var result = Symbols ? castSlice(Symbols, 0, end).join('') : o.str.slice(0, end);

  if (Sep === undefined) { return result + o.omission; }
  if (Symbols) {
    end += (result.length - end);
  }
  if (Sep instanceof RegExp) {
    if (o.str.slice(end).search(Sep)) {
      var match: any, substring = result;
      if (!Sep.global) {
        Sep = RegExp(Sep.source, to(r.Flags.exec(<any>Sep), 'string') + 'g');
      }
      Sep.lastIndex = 0;
      while ((match = Sep.exec(substring))) {
        var newEnd = match.index;
      }
      result = result.slice(0, newEnd === undefined ? end : newEnd);
    }
  } else if (o.str.indexOf(to(Sep, 'string'), end) != end) {
    var index = result.lastIndexOf(Sep);
    if (index > -1) {
      result = result.slice(0, index);
    }
  }
  return result + o.omission;
}

/**
 * Repeats the given string `n` times.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to repeat.
 * @param {number} [n=1] The number of times to repeat the string.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the repeated string.
 * @example
 *
 * _.repeat('*', 3);
 * // => '***'
 *
 * _.repeat('abc', 2);
 * // => 'abcabc'
 *
 * _.repeat('abc', 0);
 * // => ''
 */
export function repeat(str: string, n: number = 1, guard?: any) {
  const o = KW(str, [n,'n','integer'],[guard,'guard']);
  if (guard && isIterateeCall(str, n, guard)) { n = 1; }
  return baseRepeat(str, n);
}


/* TODO FIXME TEST: startsWith and truncate
!! template
*/
// string, non empty = is
function str(s: string) {
	return (typeof s === 'string' && s.trim() != '');
}
