import { eachCB } from '../core/interfaces';
import { MAX_SAFE_INTEGER } from '../core/constants';
import isArgs from '../lang/isArgs';
import isPrototype from '../lang/isPrototype';
import { isObject } from '../lang/isObjectTypes';
import { isArrayLike, isTypedArray } from '../lang/isArrayTypes';
import { each, eachKeys } from './keys';

function _merge(a: any, b: any[], fnOrDefaults = false, inherited = true, assign = false, stack?: any) { // mutating ...
	if (!isObject(a)) { return a }
  each(b, (source) => {
    if (isObject(a) && isObject(source)) {
    	return eachKeys(source, inherited, 0, (k, _i, _o, goOn) => {
        stack || (stack = new Map());
      	let v = source[k];
        if (typeof fnOrDefaults === 'function') {
          const CV = fnOrDefaults(a[k], v, k, _o, stack);
          if (assign || typeof CV !== 'undefined') { Object.assign(a, { [k]: CV }) }
          return goOn
        }
        if (assign || (!!a[k] && typeof v === 'undefined')) {
        	if (assign) { Object.assign(a, { [k]: v }) }
        	return goOn
        }
        if (Array.isArray(v)) {
        	if (fnOrDefaults && typeof a[k] === 'undefined') { a[k] = v }
          if (Array.isArray(a[k]) && !!a[k].length) {
          	each(source[k], (_v, i, _a, next, stop) => {
            	if (i === a[k].length) { return stop }
              if (typeof _v !== 'undefined') { a[k][i] = _v }
            })
          }
        } else if (isObject(v)) {
          if (!a[k]) { Object.assign(a, { [k]: {} }) }
          return _merge(v, a[k], fnOrDefaults, inherited, assign, stack);
        } else {
          return Object.assign(a, { [k]: v });
        }
      })
    }
  })
  return a;
}

export function merge(o: any, ...sources: any[]) { return _merge(o, sources) }
export function mergeWith(o: any, ...sources: any[]) { return _merge(o, sources, sources.pop(), true) }
export function assignIn(o: any, ...sources: any[]) { return _merge(o, sources, false, true, true) }
export function assignWith(o: any, ...sources: any[]) { return _merge(o, sources, sources.pop(), false, true) }
export function assignInWith(o: any, ...sources: any[]) { return _merge(o, sources, sources.pop(), true, true) }
export function defaults(o: any, ...sources: any[]) { return _merge(o, sources, true, true, true) }
export function defaultsDeep(o: any, ...sources: any[]) { return _merge(o, sources, true, true) }
