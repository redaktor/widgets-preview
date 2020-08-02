import { eachCB, vCB } from '../core';
import Collection from '../Collection';
import range from '../lang/range';

const [_C, _A] = ['Collection/', 'Array/'];
const [E,S,U,W]: any = [`${_C}each`, `${_C}slice`, `${_C}unique`, `${_C}while`];
const [D,F,Z]: any = [`${_A}diu`, `${_A}flat`, `${_A}zip`];
//@Collection.options({hello: 'world'})
export default class ARRAY extends Collection {
  constructor (protected _input: any[] = [], protected _options: any = {}) {
    super(_input);
    return this.init({proxyHandler: VIRTUAL_ARRAY, awaits: {
      chunk: S, drop: S, dropLast: S, take: S, takeLast: S,
      zip: Z, zipWith: Z, unzip: Z, unzipWith: Z, pullAt: E, slice: S,
      without: D, difference: D, differenceBy: D, differenceWith: D, intersection: D,
      intersectionBy: D, intersectionWith: D, union: D, unionBy: D, unionWith: D,
      xor: D, xorBy: D, xorWith: D, pull: D, pullAll: D, pullAllBy: D,
      makeUniq: U, uniqBy: U, uniqWith: U, flatten: F, flattenDeep: F, flattenDepth: F,
      findIndex: W, findLastIndex: W, dropWhile: W, dropLastWhile: W,
      takeWhile: W, takeLastWhile: W, fromPairs: E, fill: E
    }});
  }
//{ op: OperationType.ADD, path: new JsonPointer('/foo'), value: 'foo' },
  chunk: (size: number) => this;
  drop: (n: number) => this;
  dropLast: (n: number) => this;
  take: (n: number) => this;
  takeLast: (n: number) => this;
  zip: (...arrays: any[][]) => this;
  zipWith: (...arrays: any[] /* last: iteratee Fn */) => this;
  unzip: () => this;
  unzipWith: (iteratee: (...group: any[]) => any) => this;
  pullAt: (indexes: number[]) => this;
  slice: (start: number, end: number, step: number) => this;
	without: (...values: any[]) => this;
  difference: (...values: any[]) => this;
  differenceBy: (...values: any[] /* last: iteratee Fn */) => this;
  differenceWith: (...values: any[] /* last: comparator Fn */) => this;
  intersection: (...values: any[]) => this;
  intersectionBy: (...values: any[] /* last: iteratee Fn */) => this;
  intersectionWith: (...values: any[] /* last: comparator Fn */) => this;
  union: (...values: any[]) => this;
  unionBy: (...values: any[] /* last: iteratee Fn */) => this;
  unionWith: (...values: any[] /* last: comparator Fn */) => this;
  xor: (...values: any[]) => this;
  xorBy: (...values: any[] /* last: iteratee Fn */) => this;
  xorWith: (...values: any[] /* last: comparator Fn */) => this;
  pull: (...values: any[]) => this;
  pullAll: (values: any[]) => this;
  pullAllBy: (values: any[], iteratee: vCB) => this;
  makeUniq: () => this;
  uniqBy: (iteratee: eachCB) => this;
  uniqWith: (comparator: eachCB) => this;
  flatten: () => this;
  flattenDeep: (iteratee: eachCB) => this;
  flattenDepth:(iteratee: eachCB) => this;
  findIndex: (predicate: eachCB, start?: number, end?: number) => this;
  findLastIndex: (predicate: eachCB, start?: number, end?: number) => this;
  dropWhile: (predicate: eachCB, start?: number, end?: number) => this;
  dropLastWhile: (predicate: eachCB, start?: number, end?: number) => this;
  takeWhile: (predicate: eachCB, start?: number, end?: number) => this;
  takeLastWhile: (predicate: eachCB, start?: number, end?: number) => this;
  fromPairs: () => this;
  fill: (value: any, start?: number, end?: number) => this;
  excludeFalsy: (...values: any[]) => this;
  zipObject: (values: any[]) => this;
  remove: (predicate: number | eachCB) => this;
}

const NATIVE_METHODS: any = Object.getOwnPropertyNames( Object.getPrototypeOf([]) );
const aGets: any = {
	rest: 'drop', tail: 'drop', initial: 'dropLast',
  compact: 'excludeFalsy', reversed: 'reverse', uniq: 'makeUniq', unique: 'makeUniq',
  flat: 'flatten', deepFlat: 'flattenDeep', sampled: 'sample', shuffled: 'shuffle'
};
const aAlias: any = {
  size: 'length', makeUnique: 'makeUniq', uniqueBy: 'uniqBy', uniqueWith: 'uniqWith'
};
function doIndex(a: any, s: string): number {
	if (s === 'first' || s === 'head') { return 0 }
  if (s === 'last') { return a.length - 1 }
  const nr = parseInt(s, 10);
  return nr < 0 ? a.length + nr : nr;
}

function pythonRange(target: any /* TODO FIXME */, prop: string, indices: boolean = false) {
  const PYTHON_INDEX_REG = /^[+-\d:]+$/;
  if (!PYTHON_INDEX_REG.test(prop)) { return void 0 }
  let [start, end, step] = prop.split(':').map(part => parseInt(part, 10));
  return !indices ? target.slice(start, end, step) : range(target.value, start, end, step)
}
const INDEX_REG = (/index(?:of|by)?$/gi);
const VIRTUAL_ARRAY = {
  has: function (target: any /* TODO FIXME */, prop: string | symbol) {
    return (typeof prop === 'string' && prop.charAt(0) !== '_')
  },

  get: function (target: any /* TODO FIXME */, prop: string | symbol) {
    const v = target.value;
    /*if (prop === 'inspect') {
      return v
    }*/
    if (aAlias[prop]) { prop = aAlias[prop] }
    if (aGets[prop]) { prop = aGets[prop] }
    console.log('pv',prop,v)
    // see https://github.com/nodejs/node/issues/10731 :
    if (typeof prop !== 'string') { return Reflect.get(v, prop) }
    if (prop === 'prototype') { return void 0 }
    if (prop === 'name') { return ARRAY }
    /* TODO FIXME LENGTH 0 :: push, concat etc. ...
    const L = a.length;
    if (!L) {
      if (INDEX_REG.test(prop)) { return -1 }
      return typeof doIndex(target, prop) === 'number' ? void 0 : this
    } */
    if (Reflect.has(target, prop)) {
      console.log('PROXY:', prop, Reflect.get(target, prop));
      return Reflect.get(target, prop);
    }
    if (prop === 'get'|| prop === 'nth') {
      return (p: any) => (typeof p === 'undefined' && target) || target[doIndex(target, p)]
    }
    // TODO prop === 'set' with default value to fill
    if (prop.indexOf(':') > -1) {
      return (prop === ':') ? [...v] : pythonRange(v, prop)
    }
    if (!!NATIVE_METHODS[prop]) { return Reflect.get(v, prop) }
    // TODO if string begins with '/' JSON Pointer TODO FIXME
    return v[doIndex(v, prop)]
  },
  set: function(target: any, prop: string, val: any) {
    const v = target.value;
    if (typeof prop !== 'string') { return Reflect.set(v, prop, val) }

    if (prop.indexOf(':') > -1) {
      if (!Array.isArray(val)) { val = Array.of(val) }
      let j = 0;
      target.each((_v: any, i: number) => {
        // Reflect does basically : 	this.get(target, 'remove')(i)
        if (j >= val.length) { return Reflect.deleteProperty(v, i) && j++ }
        v[i] = val[j];
        j++;
      }, ...pythonRange(v, prop, true));
    } else {
      v[doIndex(v, prop)] = val
    }
    // TODO if string begins with '/' JSON Pointer TODO FIXME
    return true
  }/*,
  apply: function(target: any, prop: string, args: any[]) {
    console.log('APPLY', prop)
  }*/
}
