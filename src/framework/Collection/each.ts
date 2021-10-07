import { eachFN, eachCB, reduceCB } from '../core/interfaces';
import { CONTINUE,BREAK, MAX_SAFE_INTEGER, TypedTypesReg } from '../core/constants';
import isFlattenable from '../lang/isFlattenable';
import range from '../lang/range';
// TODO FIXME reduceCB

export function pullAt(a: any, indexes: number[]) {
  const r = [];
  const _a = new Map(a.map((v: any, i: number) => [i,v]));
  for (let key of indexes) { r.push(_a.get(key)); _a.delete(key) }
  return ((a.length = 0) || a.push.apply(a, Array.from(_a.values()))) && r
}

function _each(
  a: any, fn: eachCB, start?: number, end?: number, step?: number, _is: any = {each:1},
  v?: any, R?: any[], T?: any, L?: number
) {
	[start, end, step, L, R] = range(a, start, end, step);
  const _end = !end ? L : end;
  const countFn: any = (start <= _end ? (i: number) => i < _end : (i: number) => i > _end);

  const isPlain = !!a && !isFlattenable(a) && typeof a === 'object';

  if (_is.reduce) {
  	if (typeof v === 'undefined') { v = R[0] }
    for (let i = start; countFn(i); i += step) {
    	v = fn(R[i], (isPlain ? <any>Object.keys(a)[i] : i), R, CONTINUE, BREAK);
      if (v === BREAK) { break }
    }
    return v
  } else if (_is.filter || _is.reject || _is.partition) {
//    console.log('FILTER', _is.filter, a, fn)
  	let OK = [];
    for (let i = start; countFn(i); i += step) {
    	v = fn(R[i], (isPlain ? <any>Object.keys(a)[i] : i), R, CONTINUE, BREAK);
      if ((_is.reject && !v) || (!_is.reject && !!v)) { OK.push(R[i]) }
      if (v === BREAK) { break } else if (!_is.partition || v === CONTINUE) { continue }
      pullAt(a, [i])
    }
  	return OK
  } // each, map, every, some :
  for (let i = start; countFn(i); i += step) {
    v = fn(R[i], (isPlain ? <any>Object.keys(a)[i] : i), R, CONTINUE, BREAK);
    if (v === CONTINUE || _is.each) { continue } else if (v === BREAK) { break }
    if (_is.every && !v) { return false } else if (_is.some && !!v) { return true }
   	if (_is.map) { R[i] = v }
  }
  return (_is.every || _is.some) ? !!_is.every : R
}
const eachFns = ['each','every','filter','map','partition','reject','some'];
export const [each,every,filter,map,partition,reject,some]: eachFN[] = eachFns.map((k: string) =>
  (a: any[], fn: eachCB, start: number = 0, end?: number, step?: number) =>
    _each(a, fn, start, end, step, {[k]:1})
);
export function reduce(a: any[], fn: reduceCB, accumulator: any, start: number = 0, end?: number, step?: number) {
  return _each(a, (<any>fn), start, end, step, {reduce:1}, accumulator)
}

export function remove(a: any, fn: number | eachCB) {
  // TODO get Iteratee - can be index:
  if (typeof fn === 'number') {
    const nr = fn;
    fn = (v, i) => (nr === i)
  }
  const R: any = [];
  pullAt(a, _each(a, (v, i) => { if ((<any>fn)(v,i)) { R.push(v); return i }},0,void 0,1,{map: 1}));
  return R
}
export function fromPairs(a: any[], r: any = {}) { return _each(a, (v) => { r[v[0]] = v[1] }) && r }
export function fill(a: any[], value: any, start?: number, end?: number) {
  return _each(a, (v: any) => value, start, end, 1, {map:1});
} // TODO FIXME fill: (a, value, start, end) => map(a, (v) => value, start, end), // value = void 0
export function excludeFalsy(a: any[], ...b: any[]) {
  return _each(a, (v: any) => v, 0, void 0, 1, {filter:1});
}
export function zipObject(a: any[], b: any[], o: any = {}) {
  return _each(a, (r: any, v: any, i: any) => { r[v] = b[i]; return r }, 0, void 0, 1, {reduce:1}, o)
}
