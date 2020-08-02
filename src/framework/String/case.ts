import regexApostroph from './regex/regexApostroph';
import { deburr } from './slug';
import { hasUnicode } from './checks';
import castSlice from './slice';
import words from './words';
//import { each } from '../Collection/each';

function caseFirstFn(methodName: string) {
  return function(str: string) {
    str = `${str}`;
    const Symbols = hasUnicode(str) ? Array.from(str) : null;
    var chr: any = Symbols ? Symbols[0] : str.charAt(0);
    var trailing = Symbols ? castSlice(Symbols, 1).join('') : str.slice(1);

    return chr[methodName]() + trailing;
  };
}
function caseFn(cb: any) {
  return (str: string) => words(deburr(str).replace(regexApostroph, '')).reduce(cb, '');
}
/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
export function capitalize(str: string) {
  str = `${str}`.toLowerCase();
  return upperFirst(str);
}
/**
* Converts the first character of `string` to upper case.
*
* @static
* @memberOf _
* @since 4.0.0
* @category String
* @param {string} [string=''] The string to convert.
* @returns {string} Returns the converted string.
* @example
*
* _.upperFirst('fred');
* // => 'Fred'
*
* _.upperFirst('FRED');
* // => 'FRED'
*/
export const upperFirst = caseFirstFn('toUpperCase');
/**
 * Converts the first character of `string` to lower case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.lowerFirst('Fred');
 * // => 'fred'
 *
 * _.lowerFirst('FRED');
 * // => 'fRED'
 */
export const lowerFirst = caseFirstFn('toLowerCase');
/**
 * Converts `string`, as space separated words, to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the upper cased string.
 * @example
 *
 * _.upperCase('--foo-bar');
 * // => 'FOO BAR'
 *
 * _.upperCase('fooBar');
 * // => 'FOO BAR'
 *
 * _.upperCase('__foo_bar__');
 * // => 'FOO BAR'
 */
export const upperCase = caseFn((result: string, word: string, index: number) =>
  result + (index ? ' ' : '') + word.toUpperCase());
/**
 * Converts `string`, as space separated words, to lower case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the lower cased string.
 * @example
 *
 * _.lowerCase('--Foo-Bar--');
 * // => 'foo bar'
 *
 * _.lowerCase('fooBar');
 * // => 'foo bar'
 *
 * _.lowerCase('__FOO_BAR__');
 * // => 'foo bar'
 */
export const lowerCase = caseFn((result: string, word: string, index: number) =>
  result + (index ? ' ' : '') + word.toLowerCase());
/**
 * Converts `string`, as a whole, to lower case just like
 * [String#toLowerCase](https://mdn.io/toLowerCase).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the lower cased string.
 * @example
 *
 * _.toLower('--Foo-Bar--');
 * // => '--foo-bar--'
 *
 * _.toLower('fooBar');
 * // => 'foobar'
 *
 * _.toLower('__FOO_BAR__');
 * // => '__foo_bar__'
 */
export function toLower(str: string) {
  return `${str}`.toLowerCase();
}
/**
 * Converts `string`, as a whole, to upper case just like
 * [String#toUpperCase](https://mdn.io/toUpperCase).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the upper cased string.
 * @example
 *
 * _.toUpper('--foo-bar--');
 * // => '--FOO-BAR--'
 *
 * _.toUpper('fooBar');
 * // => 'FOOBAR'
 *
 * _.toUpper('__foo_bar__');
 * // => '__FOO_BAR__'
 */
export function toUpper(str: string) {
  return `${str}`.toUpperCase();
}

/* case formats ... TODO might go to formats - TODO doc */
export const readable = (s: string) => { /* TODO from any case */
  return (!s) ? '' : s.replace(/([A-Z])/g, ($1) => [' ', $1.toLowerCase()].join(''));
}
export const camelCase = caseFn((result: string, word: string, index: number) =>
  result + (index ? capitalize(word) : word.toLowerCase()));
export const pascalCase = caseFn((result:string, word: string, index: number) =>
  result + capitalize(word));                         // PascalCase
export const kebapCase = caseFn((result: string, word: string, index: number) =>
  result + (index ? '-' : '') + word.toLowerCase());  // kebap-case
export const snakeCase = caseFn((result: string, word: string, index: number) =>
  result + (index ? '_' : '') + word.toLowerCase());  // snake_case
export const startCase = caseFn((result: string, word: string, index: number) =>
  result + (index ? ' ' : '') + upperFirst(word));    // Start Case Anyword
