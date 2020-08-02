import { eachCB, keyCB } from '../core/interfaces';
import jsonPointer from '../JSON/Pointer';

import { MAX_SAFE_INTEGER } from '../core/constants';
import isArgs from '../lang/isArgs';
import isPrototype from '../lang/isPrototype';
import { isObject } from '../lang/isObjectTypes';
import { isIndex, isArrayLike, isTypedArray } from '../lang/isArrayTypes';
import { toStr } from '../lang/to';
import { each /*as E*/, map, reduce, filter } from '../Collection/each';
//export const each = E; // CYCLICAL !

const hasOwnProperty = Object.hasOwnProperty;
const oIs = (v: any) => {
	const _is: any = {
		arr: Array.isArray(v), buf: (typeof Buffer !== 'undefined' && Buffer.isBuffer(v)), args: isArgs(v)
	}
  _is.typed = !_is.buf && isTypedArray(v);
  return _is;
}
const pathArr = (v: any) => Array.isArray(v) ? (Array.isArray(v[0]) ? v[0] : v) : [v];
const noPath = (paths: string[]) => {
	paths = pathArr(paths);
  return (k: string) => (paths.indexOf(k) < 0 && paths.indexOf(k.slice(1)) < 0)
}
function enumerableInherited(o: any, R: any[] = []) {
  if (o === null) { return [] }
  if (!isObject(o)) { o = Object(o) || {} } // TODO FIXME initial in Proxy
  var isProto = isPrototype(o);
  for (var k in o) {
    !(k === 'constructor' && (isProto || !hasOwnProperty.call(o, k))) && R.push(k)
  }
  return R;
}
function doTimes(n: number, iteratee: (i: number) => any, i = -1) {
  let R = Array(n);
  while (++i < n) { R[i] = iteratee(i) }
  return R;
}
function _keys(o: any, inherited = false): string[] {
  if (o instanceof Set || o instanceof Map) { return (<any>o.keys()) }
  if (!isArrayLike(o)) { return !!inherited ? enumerableInherited(o) : Object.keys(o) }
  const _is = oIs(o);
  const _no: any = {buf: {offset:1,parent:1}, typed:{buffer:1,byteLength:1,byteOffset:1}};
  _is.typed = !_is.buf && isTypedArray(o);
  const skip = _is.arr || _is.buf || _is.args || _is.typed;
  const R = skip ? doTimes(o.length||0, String) : [];
  const L = R.length;
  for (var k in o) {
    const doSkip = (isIndex(k, length) || k === 'length' || (_is.buf && !!_no.buf[k]) ||
                    (_is.typed && !!_no.typed[k]));
    if ((inherited || hasOwnProperty.call(o, k)) && !(skip && doSkip)) { R.push(k) }
  }
  return R
}

export function eachKeys(o: any, inherited: boolean, start: number, fn: eachCB) { // TODO FIXME
	const myKeys = _keys(o, inherited);
  return each(myKeys, fn, start)
}
export function keys(o: any) { return _keys(o) }
export function keysIn(o: any) { return _keys(o, true) }
export function forIn(o: any, iteratee: eachCB) { return eachKeys(o, true, 0, iteratee) }
export function forInRight(o: any, iteratee: eachCB) { return eachKeys(o, true, -1, iteratee) }
export function forOwn(o: any, iteratee: eachCB) { return eachKeys(o, false, 0, iteratee) }
export function forOwnRight(o: any, iteratee: eachCB) { return eachKeys(o, false, -1, iteratee) }

export function invert(o: any) {
	return reduce(o, (_o, v, k) => { _o[toStr(v)] = k; return _o }, {})
}
export function invertBy(o: any, fn: keyCB) {
	return reduce(o, (_o, v, k) => { _o[fn(v, k, _o)] = k; return _o }, {})
}
export function mapKeys(o: any, fn: keyCB) {
	return reduce(keys(o), (_o, k) => { _o[fn(o[k], k, _o)] = o[k]; return _o }, {})
}
export function mapKeysIn(o: any, fn: keyCB) {
	return reduce(keysIn(o), (_o, k) => { _o[fn(o[k], k, _o)] = o[k]; return _o }, {})
}
export function mapValues(o: any, fn: keyCB) {
	return reduce(o, (_o, v, k) => { _o[`${k}`] = fn(v, k, _o); return _o }, {})
}
export function unset(o: any, ...paths: string[]) {
	return map(pathArr(paths), (p) => jsonPointer(o).remove(p)) && o
}
export function values(o: any) { return map(keys(o), (k) => o[k]) }
export function valuesIn(o: any) { return map(keysIn(o), (k) => o[k]) }
export function functions(o: any, inherited = false) {
	return !o ? [] : filter(_keys(o, inherited), (k) => (typeof o[k] === 'function'))
}
export function functionsIn(o: any) { return functions(o, true) }

export function pick(o: any, ...paths: string[]) {
	return reduce(pathArr(paths), (_o, p, i) => jsonPointer(_o, p, jsonPointer(o, p)) && _o, {})
}
export function pickBy(o: any, fn: keyCB, _o: any = {}) {
	return jsonPointer(o).walk((v, k) => !!fn(v) && jsonPointer(_o, k, v)) && _o
}
export function omit(o: any, ...paths: string[]) {
	return pick(o, ...Object.keys(jsonPointer(o).dict()).filter(noPath(paths)))
}
export function omitBy(o: any, fn: keyCB, _o = {}) {
	return jsonPointer(o).walk((v, k) => !fn(v) && jsonPointer(_o, k, v)) && _o
}
export function toPairs(o: any, inherited = false) {
	if (o instanceof Set || o instanceof Map) { return o.entries() }
	return map(_keys(o, inherited), (k) => [k, o[k]])
}
export function toPairsIn(o: any) { return toPairs(o, true) } // TODO
