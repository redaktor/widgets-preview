/* import { global, lang } from '@dojo/core/main'; */
import Promise from '@dojo/framework/shim/Promise';
import { toObject } from './array/main';
/**
 * objectPromiseAll
 * Use Promise.all with an object as argument and result ...
 *
 * @name objectPromiseAll
 * @function
 *
 * @param {Object} obj An object of Promises
 * @param {Function} mapFn A custom .map function
 *
 * @return {Object} An object of resolved Promises
 */
interface PromiseObject {
  [key:string] : Promise<any>;
}
type PromiseFn = (x: Promise<any>, y: string) => Promise<any>;

export function objectPromiseAll(obj: PromiseObject, mapFn?: PromiseFn) {
  const _keys = Object.keys(obj);
  return Promise.all(_keys.map(k => mapFn ? mapFn(obj[k], k) : obj[k]))
    .then(result => result.reduce(toObject(_keys), {}));
};
