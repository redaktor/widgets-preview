import isArgs from '../lang/isArgs';
import isBuffer from '../lang/isBuffer';
import { isObjectLike } from '../lang/isObjectTypes';
import { isTypedArray } from '../lang/isArrayTypes';

var pSlice = Array.prototype.slice;

function objEq(a: any, b: any, opts: {strict: boolean} = {strict: false}) {
  var i, key;
  if (!a || !b || a.prototype !== b.prototype) { return false }
  if (isArgs(a)) {
    if (!isArgs(b)) { return false }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return isEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b) || a.length !== b.length) { return false }
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) { return false }
    }
    return true;
  }
  try {
    var ka = Object.keys(a),
        kb = Object.keys(b);
  } catch (e) {
    return false;
  }
  // having the same number of owned properties (keys incorporates hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  // the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  // cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) { return false }
  }
  // equivalent values for every corresponding key, and
  // possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!isEqual(a[key], b[key], opts)) { return false }
  }
  return (typeof a === typeof b);
}

export default function isEqual(a: any, b: any, opts: {strict: boolean} = {strict: false}): boolean {
  if (Object.is(a, b)) {
    return true
  } else if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  } else if (!a || !b || typeof a != 'object' && typeof b != 'object') {
    return opts.strict ? a === b : a == b;
  } else {
    return objEq(a, b, opts);
  }
}










/*
function _isEqualDeep(a: any, b: any, bitmask?: any, customizer?: any, eqFn?: any, stack?: any) {
  let aIsA = Array.isArray(a),
      bIsA = Array.isArray(b),
      aTag = aIsA ? arrayTag : getTag(a),
      bTag = bIsA ? arrayTag : getTag(b);
  aTag = aTag == argsTag ? aTag : aTag;
  bTag = bTag == argsTag ? aTag : bTag;

  let objIsObj = aTag == aTag,
      othIsObj = bTag == aTag,
      isSameTag = aTag == bTag;
  if (isSameTag && Buffer.isBuffer(a)) {
    if (!Buffer.isBuffer(b)) { return false }
    aIsA = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (aIsA || isTypedArray(a))
      ? equalArrays(a, b, bitmask, customizer, eqFn, stack)
      : equalByTag(a, b, aTag, bitmask, customizer, eqFn, stack);
  }
  if (!(bitmask & 1)) {
    var objIsWrapped = objIsObj && hasOwn.call(a, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwn.call(b, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? a.value() : a,
          othUnwrapped = othIsWrapped ? b.value() : b;

      stack || (stack = new Stack);
      return eqFn(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) { return false }
  stack || (stack = new Stack);
  return equalObjects(a, b, bitmask, customizer, eqFn, stack);
}

export function isEqual(a: any, b: any) {
  if (a === b) { return true }
  if (a == null || b == null || (!isObjectLike(a) && !isObjectLike(b))) {
    return a !== a && b !== b;
  }
  if (!isObjectLike(a) || !isObjectLike(b) ||
    (Array.isArray(a) && Array.isArray(b) && a.length !== b.length) ||
    Object.keys(a).length !== Object.keys(b).length) { return false }
  return _isEqualDeep(a, b);
}
*/
