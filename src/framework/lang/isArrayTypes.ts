import { MAX_SAFE_INTEGER, TypedTypesReg } from '../core/constants';
import { isObjectLike } from './isObjectTypes';
const isUintReg = /^(?:0|[1-9]\d*)$/;
export function isLength(v: any) {
  return typeof v == 'number' && v > -1 && v % 1 === 0 && v <= MAX_SAFE_INTEGER;
}
export function isIndex(v: any, length: number) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof v == 'number' || isUintReg.test(v)) && (v > -1 && v % 1 == 0 && v < length);
}
export function isArray(v: any) {
  return (!Array.isArray ? Object.prototype.toString.call(v) === '[object Array]' : Array.isArray(v))
}
export function isArrayLike(v: any) { return !!v && isLength(v.length) && typeof v !== 'function' }
export function isTypedArray(v: any) {
  if (!isObjectLike(v)) { return false }
  const T = Object.prototype.toString.call(v);
  return !Array.isArray(v) && T.slice(-5) === 'Array' && TypedTypesReg.test(T) && isLength(v.length)
}
