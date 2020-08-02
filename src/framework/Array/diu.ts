//import { diuFN, resultSet } from '../core';
import { each } from '../Collection/each';
import { makeUniq, uniqBy, uniqWith } from '../Collection/unique';
import { flatten } from './flat';

function _RS()/*: resultSet*/ {
	return { R: [], S: new Set() }
}
// Difference, Intersection, Union - Base
function _diuCheck(v: any, R: any[], S: any, _is: any = {}, iteratee?: any) {
	const computed = (!iteratee ? v : iteratee(v));
	(_is.intersection ? S.has(computed) : !S.has(computed)) && R.push(v);
}
function _diu(a: any[], b: any[], _is: any = {difference:1}) {
	if (_is.union) { return makeUniq(a.concat(flatten(b))) }
  const { R, S } = _RS();
  each(b, (v) => { S.add(v) });
  each(a, (v) => _diuCheck(v, R, S, _is));
  return R
}
function _diu_byWith(a: any[], b: any[], _is: any = {difference:1}) {
  const FN = b.pop(); // TODO FIXME get FN
  b = flatten(b);
	const { R, S } = _RS();
  if (!_is.with) {
  	if (_is.union) { return uniqBy(a.concat(b), FN) }
    each(b, (v) => S.add(FN(v)));
  	each(a, (v) => _diuCheck(v, R, S, Object.keys(_is)[0], FN));
	  return _is.difference ? R : uniqBy(R, FN)
  }
  if (_is.union) { return uniqWith(a.concat(b), FN) }
  const BL = b.length;
  each(a, (v, i, _a, next, stop, j = -1) => {
   	while (++j < BL) { if (FN(v, b[j])) { return next } }
    if (!S.has(v)) {
    	!_is.intersection && (<any>R).push(v);
     	S.add(v)
    }
  });
  if (_is.difference) { return R }
  each(a, (v) => !S.has(v) && (<any>R).push(v));
  return uniqWith(R, FN)
}
// Symmetric Difference
function _dx(a: any[], b: any[], byWith = '') {
  let r: any;
	const FN = !byWith ? void 0 : a.pop();
  each(a.concat(b), (v, i, _a, next, stop) => {
  	if (!Array.isArray(v)) { return next }
    if (!i) { r = v; return next }
    if (!byWith) {
      r = _diu(r, v, 'D').concat(_diu(v, r, 'D'));
    } else {
      const _is = {difference:1, with:(byWith === 'with')};
      const A = _diu_byWith(r, v.concat([FN]), _is);
      r = A.concat(_diu_byWith(v, r.concat([FN]), _is))
    }
  })
  return !byWith ? makeUniq(r) : ((byWith === 'by') ? uniqBy(r, FN) : uniqWith(r, FN))
}

export function pullAll(a: any[], values: any[]) { a.push.apply(a, _diu(a, values)) }
export function pull(a: any[], ...values: any[]) { a.push.apply(a, _diu(a, values)) }
export function pullAllBy(a: any[], b: any[], iteratee: any) {
  const _b = [...b, iteratee];
  return a.push.apply(a, _diu_byWith(a, _b, {difference:1, with:1}))
}
export function without(a: any[], ...values: any[]) { return _diu(a, values) }
export function xor(a: any[], ...values: any[]) { return _dx(a, values) }
export function xorBy(a: any[], ...values: any[]) { return _dx(a, values, 'by') }
export function xorWith(a: any[], ...values: any[]) { return _dx(a, values, 'with') }

const diuFns = ['difference','intersection','union'];
export const [ difference, intersection, union ]/*: diuFN[]*/ = diuFns.map((k: string) =>
  (a: any[], ...values: any[]) => _diu(a, values, {[k]:1}))
export const [
  differenceBy, differenceWith, intersectionBy, intersectionWith, unionBy, unionWith
]/*: diuFN[]*/ = diuFns.reduce((a: any, k: string) => a.concat([
  (a: any[], ...b: any[]) => _diu_byWith(a, b, {[k]:1}),
  (a: any[], ...b: any[]) => _diu_byWith(a, b, {[k]:1, with:1})
]), []);
