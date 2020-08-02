import { MAX_SAFE_INTEGER } from '../lang/constants';
/**
 * Repeats the given string `n` times.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to repeat.
 * @param {number} [n=1] The number of times to repeat the string.
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
export function repeat(str: string, n: number) {
  var result = '';
  if (!str || n < 1 || n > MAX_SAFE_INTEGER) { return result }
  // Leverage the exponentiation by squaring algorithm for a faster repeat.
  // SeeAlso https://en.wikipedia.org/wiki/Exponentiation_by_squaring !
  do {
    if (n % 2) { result += str; }
    n = Math.floor(n / 2);
    if (n) { str += str; }
  } while (n);

  return result;
}
