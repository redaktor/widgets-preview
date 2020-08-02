import { trimAll } from './regex/regexesTrim';
import castSlice from './slice';

function symbolsForTrim(str: string, chars: string, guard?: any, regexSuffix = ''): string|string[] {
  str = `${str}`; chars = `${chars}`;
  if (!str.length) { return '' }
  if (str && (guard || chars === undefined)) {
    return str.replace(trimAll, '');
  }
  return Array.from(str);
}
function charsStartIndex(strSymbols: string[], chrSymbols: string[]) {
  var index = -1, length = strSymbols.length;
  while (++index < length && chrSymbols.indexOf(strSymbols[index]) > -1) {}
  return index;
}
function charsEndIndex(strSymbols: string[], chrSymbols: string[]) {
  var index = strSymbols.length;
  while (index-- && chrSymbols.indexOf(strSymbols[index]) > -1) {}
  return index;
}
export function baseTrim(str: string, chars: string, guard?: any, type?: 'Start'|'End') {
  var strSymbols = symbolsForTrim(str, chars, guard);
  if (typeof strSymbols === 'string') { return strSymbols; }
  const chrSymbols = Array.from(chars);
  const start = type === 'End' ? 0 : charsStartIndex(strSymbols, chrSymbols);
  const end = type === 'Start' ? void 0 : charsEndIndex(strSymbols, chrSymbols)+1;
  return castSlice(strSymbols, start, end).join('');
}
/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trim('  abc  ');
 * // => 'abc'
 *
 * _.trim('-_-abc-_-', '_-');
 * // => 'abc'
 *
 * _.map(['  foo  ', '  bar  '], _.trim);
 * // => ['foo', 'bar']
 */
export function trim(str: string, chars: string, guard?: any, type?: 'Start'|'End') {
  return baseTrim(str, chars, guard)
}
/**
 * Removes trailing whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trimEnd('  abc  ');
 * // => '  abc'
 *
 * _.trimEnd('-_-abc-_-', '_-');
 * // => '-_-abc'
 */
export function trimEnd(str: string, chars: string, guard?: any) {
  return baseTrim(str, chars, guard, 'End')
}
/**
 * Removes leading whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trimStart('  abc  ');
 * // => 'abc  '
 *
 * _.trimStart('-_-abc-_-', '_-');
 * // => 'abc-_-'
 */
export function trimStart(str: string, chars: string, guard?: any) {
  return baseTrim(str, chars, guard, 'Start')
}
