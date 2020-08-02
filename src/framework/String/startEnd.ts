/* TODO DOC overload
('abc', 1) => 'a'
('abc', 'b', 1) => true

*/
/**
 * Checks if `string` starts with the given target string.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=0] The position to search from.
 * @returns {boolean} Returns `true` if `string` starts with `target`,
 *  else `false`.
 * @example
 *
 * _.start('abc', 'a');
 * // => true
 *
 * _.start('abc', 'b');
 * // => false
 *
 * _.start('abc', 'b', 1);
 * // => true
 */
export function start(str: string, length: number): string;
export function start(str: string, target: string, position?: number): boolean;
export function start(str: string, target: string|number, position: number = 0): string|boolean {
  if (length) { return str.slice(0, Math.max(length||1, 1)); }
  target = `${target}`;
  const pos = Math.max(position, 0);
  return (str.slice(position, position + target.length) === target);
}
/**
 * Checks if `string` ends with the given target string.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=string.length] The position to search up to.
 * @returns {boolean} Returns `true` if `string` ends with `target`,
 *  else `false`.
 * @example
 *
 * _.end('abc', 'c');
 * // => true
 *
 * _.end('abc', 'b');
 * // => false
 *
 * _.end('abc', 'b', 2);
 * // => true
 */
export function end(str: string, length: number): string;
export function end(str: string, target: string, position?: number): boolean;
export function end(str: string, target: string|number, position: number = str.length): string|boolean {
  if (length) { return str.slice(0 - Math.max(length||1, 1)); }
  target = `${target}`;
  const _end = position = Math.max(position, 0);
  position -= target.length;
  return position >= 0 && str.slice(position, _end) === target;
}
