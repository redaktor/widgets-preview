/**
* The base implementation of `_.slice`
*
* @private
* @param {Array} array The array to slice.
* @param {number} [start=0] The start position.
* @param {number} [end=array.length] The end position.
* @returns {Array} Returns the slice of `array`.
*/
export function baseSlice(array: any[], start: number = 0, end?: number) {
  let index = -1;
  let l = array.length;
  end = end === void 0 ? l : end;
  if (start < 0) {
    start = -start > l ? 0 : (l + start);
  }
  end = end > l ? l : end;
  if (end < 0) {
    end += l;
  }
  l = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(l);
  while (++index < l) {
    result[index] = array[index + start];
  }
  return result;
}

/**
* Casts `array` to a slice if it's needed.
*
* @private
* @param {Array} array The array to inspect.
* @param {number} start The start position.
* @param {number} [end=array.length] The end position.
* @returns {Array} Returns the cast slice.
*/
export default function castSlice(array: any[], start: number = 0, end?: number) {
  const l = array.length;
  end = end === void 0 ? l : end;
  return (!start && end >= l) ? array : baseSlice(array, start, end);
}
