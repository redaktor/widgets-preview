function eq(a: any, b: any) { return a === b || (a !== a && b !== b) }
/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} o The o to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(o: any, key: string | number, value: any) {
  if (key == '__proto__' && Object.defineProperty) {
    Object.defineProperty(o, key, {
      configurable: true, enumerable: true, value, writable: true
    });
  } else {
    o[key] = value;
  }
}
/**
 * Assigns `value` to `key` of `o` if the existing value is not equivalent
 *
 * @private
 * @param {Object} o The o to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
export default function assignValue(o: any, key: string | number, value: any) {
  var objValue = o[key];
  if (!(Object.hasOwnProperty.call(o, key) && eq(objValue, value)) ||
      (value === undefined && !(key in o))) {
    baseAssignValue(o, key, value);
  }
}
