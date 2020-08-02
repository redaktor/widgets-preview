import { eachCB, reduceCB, vCB } from '../core/interfaces';
import API from '../core';
const pathArr = (v: any): string[] => Array.isArray(v) && Array.isArray(v[0]) ? v[0] : v;

//@API.options({hello: 'world'})
const _C = 'Collection/';
const [C,E,S,W,I,IN]: any = ['cgk','each','shuffle','while','invoke','includes'].map((s) => `${_C}${s}`);

export default class Collection extends API {
  constructor (protected _input = {}, protected _options: any = {}) {
    super(_input);
    this.init({awaits: {
      count: C, countBy: C, each: E, every: E, filter: E, find: W, findLast: W,
      groupBy: C, includes: IN, invoke: I, keyBy: C, map: E, partition: E,
      reduce: E, reject: E, sample: S, sampleSize: S, shuffle: S, some: E
    }});
    /*if (typeof _options.baseUrl !== 'string') { _options.baseUrl = './' }
    //if (_options.baseUrl) { console.log('baseUrl', _options.baseUrl, Reflect.ownKeys(this)) }
    //this.count = this.fn([C,'count']);
    for (let k in Collection.awaits) {
      (<any>this)[k] = this.fn([Collection.awaits[k], k]); // TODO FIXME path join
    }
    */
  }
  at(...paths: string[]) { return pathArr(paths).map((p) => this.pointer(this.value, p)) }

	count: (start?: number, end?: number, step?: number) => any;
	countBy: (fn: vCB, start?: number, end?: number, step?: number) => any;
	each: (iteratee: eachCB, start?: number, end?: number, step?: number) => this;
	every: (iteratee: eachCB, start?: number, end?: number, step?: number) => this;
	filter: (iteratee: eachCB, start?: number, end?: number, step?: number) => this;
  find: (fn: eachCB, start?: number, end?: number) => this;
	findLast: (fn: eachCB, start?: number, end?: number) => this;
  groupBy: (fn: vCB, start?: number, end?: number, step?: number) => this;
  includes: (...b: any[]) => this;
  invoke: (path: string | string[], fnName: string, ...args: any[]) => this;
  /* TODO FIXME
  _.invokeMap -> invoke.ts
  _.flatMap
  _.flatMapDeep
  _.flatMapDepth
  */
  keyBy: (fn: vCB, start?: number, end?: number, step?: number) => this;
	map: (iteratee: eachCB, start?: number, end?: number, step?: number) => this;
	partition: (iteratee: eachCB, start?: number, end?: number, step?: number) => this;
	reduce: (iteratee: reduceCB, accumulator: any, start?: number, end?: number, step?: number) => this;
	reject: (iteratee: eachCB, start?: number, end?: number, step?: number) => this;
  sample: () => this;
	sampleSize = (size: number) => this;
	shuffle: () => this;
	some: (iteratee: eachCB, start?: number, end?: number, step?: number) => this;

}
