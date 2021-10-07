import { eachCB } from '../core/interfaces';
import { each } from './each';
function _unique(a: any, iteratee?: any, comparator?: any, retSet = false): any {
	const { R, S } = { R: <any[]>[], S: new Set() };
  if (!iteratee && !comparator) { return each(a, (v) => S.add(v)) && [...S] }
  let rl = 0, _v;
  each(a, (v, i, _a, next, stop, j = -1) => {
  	_v = !iteratee ? v : iteratee(v);
    if (S.has(_v)) { return next } else { S.add(_v) }
    if (comparator) {
    	while (++j < rl) { if (comparator(v, R[j])) { return next } }
    }
    if (!retSet) { R.push(a[i]) }
    rl++
  });
  return !retSet ? R : S
}

export function makeUniq(a: any) { return _unique(a) }
// TODO FIXME CB types -->
export function uniqBy(a: any, iteratee: eachCB) { return _unique(a, iteratee) }
export function uniqWith(a: any, comparator: eachCB) { return _unique(a, comparator) }
