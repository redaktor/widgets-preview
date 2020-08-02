/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
export default function copyArray(source: any[], a: any[]) {
  var index = -1,
      length = source.length;

  a || (a = Array(length));
  while (++index < length) {
    a[index] = source[index];
  }
  return a;
}
