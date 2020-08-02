import { eachCB, vCB } from '../core/interfaces';
import Collection from '../Collection';
const [_C, _O] = ['Collection/', 'Object/'];
const [K, M, W]: any = [`${_O}keys`, `${_O}merge`, `${_C}while`];
//@API.options({hello: 'world'})
export default class OBJECT extends Collection {
  constructor (protected _input = {}, ...args: any[]) {
    super(_input, ...args)
    return this.init({awaits: {
      keys: K, keysIn: K, forIn: K, forInRight: K, forOwn: K, forOwnRight: K, invert: K,
      invertBy: K, mapKeys: K, mapKeysIn: K, mapValues: K, pick: K, pickBy: K, omit: K,
      omitBy: K, unset: K, values: K, valuesIn: K, functions: K, functionsIn: K, toPairs: K,
      toPairsIn: K, merge: M, mergeWith: M, assignIn: M, assignWith: M, assignInWith: M,
      defaults: M, defaultsDeep: M, findKey: W, findLastKey: W
    }});
  }

  create(proto: any, keys: string[]){ return Object.assign(Object.create(proto), keys) }
  assign(o: any, ...sources: any[]){ return Object.assign(o, ...sources) }
  keys: () => this;
  keysIn: () => this;
  forIn: (iteratee: eachCB) => this;
  forInRight: (iteratee: eachCB) => this;
  forOwn: (iteratee: eachCB) => this;
  forOwnRight: (iteratee: eachCB) => this;
  invert: () => this;
  invertBy: (iteratee: vCB) => this;
  mapKeys: (iteratee: eachCB) => this;
  mapKeysIn: (iteratee: eachCB) => this;
  mapValues: (iteratee: eachCB) => this;
  pick: (...paths: string[]) => this;
  pickBy: (iteratee: eachCB) => this;
  omit: (...paths: string[]) => this;
  omitBy: (iteratee: eachCB) => this;
  unset: (...paths: string[]) => this;
  values: () => this;
  valuesIn: () => this;
  functions: () => this;
  functionsIn: () => this;
  toPairs: () => this;
 	toPairsIn: () => this;
  merge: (...sources: any[]) => this;
  mergeWith: (...sources: any[] /* last customizer: eachCB */) => this;
  assignIn: (...sources: any[]) => this;
  assignWith: (...sources: any[] /* last customizer: eachCB */) => this;
  assignInWith: (...sources: any[] /* last customizer: eachCB */) => this;
  defaults: (...sources: any[]) => this;
  defaultsDeep: (...sources: any[]) => this;
  findKey: (predicate: eachCB, start?: number, end?: number) => this;
  findLastKey: (predicate: eachCB, start?: number, end?: number) => this;
}
