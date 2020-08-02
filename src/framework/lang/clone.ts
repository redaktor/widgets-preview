// TODO - FIXME - needed?

import { isObject } from './isObjectTypes';
import assignValue from './assignValue';
import copyArray from './copy/array';
import copyBuffer from './copy/buffer';
import isPrototype from './isPrototype';
import isBuffer from './isBuffer';
import { each } from '../Collection/each';
import { assignIn } from '../Object/merge';
import { keys, keysIn } from '../Object/keys';
import { getAllKeys, getAllKeysIn, copySymbols, copySymbolsIn } from '../Object/keysAll';
import getTag from './tag';
import initCloneByTag from './cloneByTag';
declare const Stack: any;
export enum CLONE_FLAG {
  DEEP = 1,
  FLAT = 2,
  SYMBOL = 4
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} a The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(a: any[] ) {
  var length = a.length,
      result = a.constructor(length);
  // Add properties assigned by `RegExp#exec`.
  if (length && typeof a[0] == 'string' && Reflect.has(a, 'index')) {
    result.index = (<any>a).index;
    result.input = (<any>a).input;
  }
  return result;
}
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(o: any) {
  return (typeof o.constructor === 'function' && !isPrototype(o))
    ? Object.create(Reflect.getPrototypeOf(o)) : {};
}
/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value: any, bitmask: CLONE_FLAG, customizer?: any, key?: string | number, object?: any, stack?: any) {
  let result: any;
  const isDeep = (bitmask & CLONE_FLAG.DEEP) == CLONE_FLAG.DEEP;
  const isFlat = (bitmask & CLONE_FLAG.FLAT) == CLONE_FLAG.FLAT;
  const isFull = (bitmask & CLONE_FLAG.SYMBOL) == CLONE_FLAG.SYMBOL;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) { return result }
  if (!isObject(value)) { return value }
  var isArr = Array.isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) { return copyArray(value, result) }
  } else {
    var tag = getTag(value),
        isFunc = tag == '[object Function]' || tag == '[object GeneratorFunction]';

    if (isBuffer(value)) {
      return copyBuffer(value, isDeep);
    }
    if (tag == '[object Object]' || tag == '[object Arguments]' || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, assignIn(result, value))
          : copySymbols(value, Object.assign(result, value));
      }
    } else {
      const cloneableTags: any = {
      "[object Uint32Array]":1,"[object Uint16Array]":1,"[object Uint8ClampedArray]":1,
      "[object Uint8Array]":1,"[object Symbol]":1,"[object String]":1,"[object Set]":1,
      "[object RegExp]":1,"[object Object]":1,"[object Number]":1,"[object Map]":1,
      "[object Int32Array]":1,"[object Int16Array]":1,"[object Int8Array]":1,
      "[object Float64Array]":1,"[object Float32Array]":1,"[object Date]":1,
      "[object Boolean]":1,"[object DataView]":1,"[object ArrayBuffer]":1,
      "[object Array]":1,"[object Arguments]":1,
      "[object WeakMap]":false,"[object Function]":false,"[object Error]":false
      }
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep)
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  var keysFunc = isFull ? (isFlat ? getAllKeysIn : getAllKeys) : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  each(props || value, (subValue, key) => {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

/**
 * Creates a shallow clone of `value`.
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
 * and supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
 * arrays. The own enumerable properties of `arguments` objects are cloned
 * as plain objects. An empty object is returned for uncloneable values such
 * as error objects, functions, DOM nodes, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to clone.
 * @returns {*} Returns the cloned value.
 * @see _.cloneDeep
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var shallow = _.clone(objects);
 * console.log(shallow[0] === objects[0]);
 * // => true
 */
function clone(v: any) {
  return baseClone(v, CLONE_FLAG.SYMBOL);
}

/**
 * This method is like `_.clone` except that it accepts `customizer` which
 * is invoked to produce the cloned value. If `customizer` returns `undefined`,
 * cloning is handled by the method instead. The `customizer` is invoked with
 * up to four arguments; (value [, index|key, object, stack]).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to clone.
 * @param {Function} [customizer] The function to customize cloning.
 * @returns {*} Returns the cloned value.
 * @see _.cloneDeepWith
 * @example
 *
 * function customizer(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(false);
 *   }
 * }
 *
 * var el = _.cloneWith(document.body, customizer);
 *
 * console.log(el === document.body);
 * // => false
 * console.log(el.nodeName);
 * // => 'BODY'
 * console.log(el.childNodes.length);
 * // => 0
 */
function cloneWith(v: any, customizer: any) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  return baseClone(v, CLONE_FLAG.SYMBOL, customizer);
}

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(v: any) {
  return baseClone(v, CLONE_FLAG.DEEP | CLONE_FLAG.SYMBOL);
}

/**
 * This method is like `_.cloneWith` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @param {Function} [customizer] The function to customize cloning.
 * @returns {*} Returns the deep cloned value.
 * @see _.cloneWith
 * @example
 *
 * function customizer(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(true);
 *   }
 * }
 *
 * var el = _.cloneDeepWith(document.body, customizer);
 *
 * console.log(el === document.body);
 * // => false
 * console.log(el.nodeName);
 * // => 'BODY'
 * console.log(el.childNodes.length);
 * // => 20
 */
function cloneDeepWith(v: any, customizer: any) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  return baseClone(v, CLONE_FLAG.DEEP | CLONE_FLAG.SYMBOL, customizer);
}
