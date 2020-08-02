import { eachCB } from '../core/interfaces';
import { CONTINUE, BREAK } from '../core/constants';
import isFlattenable from '../lang/isFlattenable';
import range from '../lang/range';

function _while(
  a: any, fn: any, i: number = 0, end?: number, _is: any = {key:1},
  st?: number, L?: number, R?: any
) {
  [i, end, st, L, R] = range(a, i, end);
  if (i > end) { i++ } else { i-- }
  const countFn = i > end ? (() => (--i > (end||0))) : (() => (++i < (end||a.length)));
  const isPlain = !!a && !isFlattenable(a) && typeof a === 'object';
  const kArgs = (k: any) => [R[k], (isPlain ? Object.keys(a)[k] : k), R, CONTINUE, BREAK];
  if (_is.key) {
  	let _args;
  	while (countFn()) {
    	_args = kArgs(i);
    	if (fn(..._args)) { return _args[1] }
    }
    return -1
  } else if (_is.value) {
  	while (countFn()) { if (fn(...kArgs(i))) { return R[i] } }
    return void 0
  }
  while (countFn() && fn(...kArgs(i))) {}
  return R.slice(...(i > end ? (_is.drop ? [0, i+1] : [i+1, L]) : (_is.drop ? [i, L] : [0, i])))
}

// TODO FIXME CB type
export function find(a: any, fn: eachCB, start: number = 0, end?: number) {
  return _while(a, fn, start, end, {value:1})
}
export function findLast(a: any, fn: eachCB, start: number = -1, end?: number) {
  return _while(a, fn, start, end, {value:1})
}

export function findIndex(a: any, predicate: eachCB, start: number = 0, end?: number) {
  return _while(a, predicate, start, end, {key:1})
}
export function findLastIndex(a: any, predicate: eachCB, start: number = -1, end?: number) {
  return _while(a, predicate, start, end, {key:1})
}
export function dropWhile(a: any, predicate: eachCB, start: number = 0, end?: number) {
  return _while(a, predicate, start, end, {drop:1})
}
export function dropLastWhile(a: any, predicate: eachCB, start: number = -1, end?: number) {
  return _while(a, predicate, start, end, {drop:1})
}
export function takeWhile(a: any, predicate: eachCB, start: number = 0, end?: number) {
  return _while(a, predicate, start, end)
}
export function takeLastWhile(a: any, predicate: eachCB, start: number = -1, end?: number) {
  return _while(a, predicate, start, end)
}
