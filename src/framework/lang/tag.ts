const symToStringTag: any = Symbol ? Symbol.toStringTag : void 0;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} v The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(v: any) {
  const isOwn = Reflect.has(v, symToStringTag);
  const tag = v[symToStringTag];
	let unmasked = false;
  try {
    v[symToStringTag] = undefined;
    unmasked = true;
  } catch (e) {}

  const r = Object.prototype.toString.call(v);
  if (unmasked) {
    if (isOwn) {
      v[symToStringTag] = tag;
    } else {
      delete v[symToStringTag];
    }
  }
  return r;
}
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} v The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
export default function getTag(v: any) {
  if (v == null) {
    return v === undefined ? '[object Undefined]' : '[object Null]';
  }
  return (symToStringTag && symToStringTag in Object(v))
    ? getRawTag(v) : Object.prototype.toString.call(v);
}
