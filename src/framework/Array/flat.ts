import isFlattenable from '../lang/isFlattenable';
import { each } from '../Collection/each';
const IE_MAX = 20670;
function _flat(a: any[], depth: number = 1, iteratee?: any, R: any[] = []) {
	depth--;
  const hasIteratee = typeof iteratee === 'function';
  each(a, (v: any, i: number, _a: any[], goOn: any) => {
  	if (hasIteratee && !iteratee(v, i, a)) { return goOn }
    (depth > -1 && isFlattenable(v)) ? _flat(v, depth, iteratee, R) : R.push(v);
  });
  return R
}
export function flatten(a: any[], predicate?: any) { return _flat(a, 1, predicate) }
export function flattenDeep(a: any[], predicate?: any) { return _flat(a, IE_MAX, predicate) }
export function flattenDepth(a: any[], depth = IE_MAX, predicate?: any) {
  return _flat(a, depth, predicate)
}
