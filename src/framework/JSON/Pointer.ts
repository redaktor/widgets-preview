import { PatchOptions } from './interfaces';
import PatchError from './PatchError';
import { isIntegerString } from '../lang/isInteger';
import { toStr } from '../lang/to';
export type pointerCB = (v: any, pointer: string) => any;
export type _S = string | string[];

const POINTER_OPTIONS: PatchOptions = {
	validate: false,
	protectRoot: true,
	mutateDocument: false
}
//The pointer / doesn’t point to the root, it points to a key of '' on the root.
export class JSONpointer {
	constructor (
		protected root: any = {}, protected options: PatchOptions = POINTER_OPTIONS
	) {
		this.options = {...{}, ...POINTER_OPTIONS, ...options};
	}

	tokens(pointer: _S = ''): string[] {
		return typeof pointer === 'string' ? this.parse(pointer) :
			(Array.isArray(pointer) ? pointer : [toStr(`/${pointer}`)])
	}

	/**
	 * Tests if an object has a value for a json pointer
	 *
	 * @param pointer
	 * @returns {boolean}
	 */
	has(pointer: _S): boolean {
	  return typeof this.get(pointer) !== 'undefined'
	}

	/**
	* Lookup a json pointer in an object
	*
	* @param {String|Array} pointer
	* @returns {*}
	*/
	get(pointer?: _S) {
		const refTokens = this.tokens(pointer);
		if (!refTokens) { return void 0 }
		const L = refTokens.length;
		if (!L) { return this.root }

		let o = this.root;

		for (var i = 0; i < L; ++i) {
	    var tok = refTokens[i];
			if (tok === '#') { continue }
	    if (typeof o !== 'object' || !(tok in o)) { return o }
	    o = o[tok];
	  }
	  return o;
	}

	/**
	* Sets a value on an object
	*
	* @param {String|Array} pointer
	* @param value
	*/
	set(pointer: _S, value: any, replacing: boolean = true) {
		const refTokens = this.tokens(pointer);
		//console.log('refTokens',refTokens);
		if (!refTokens) { return void 0 }
		if (this.options.protectRoot && !refTokens.length) {
			throw Error('Cannot set the root object')
		}
		let key: number | string = refTokens[0];
		let o = this.root;
		for (var i = 0; i < refTokens.length - 1; ++i) {
			var tok = refTokens[i];
			if (tok === '-' && Array.isArray(o)) {
			  tok = `${o.length}`;
			}
			key = refTokens[i + 1];
			if (!(tok in o)) {
			  o[tok] = (key.match(/^(\d+|-)$/)) ? [] : {};
			}
			o = o[tok];
		}
		if (Array.isArray(o)) {
			const L = o.length;
			if (key === '-') {
				key = L;
			} else {
				if (this.options.validate && !isIntegerString(key)) {
					throw new PatchError('OPERATION_PATH_ILLEGAL_ARRAY_INDEX');
				} else if(isIntegerString(key)) { // only parse key when it's an integer for `arr.prop` to work
					if (this.options.validate && parseInt(key) > L) {
						throw new PatchError('OPERATION_VALUE_OUT_OF_BOUNDS');
					}
					key = ~~key;
				}
			}

			if (!replacing) {
				o.splice(~~key, 0, value)
				return this;
			}
		}

		o[key] = value;
		return this;
	}

	/**
	* Removes an attribute
	*
	* @param {String|Array} pointer
	*/
	remove(pointer: _S): any {
	  const refTokens = this.tokens(pointer);
	  var finalToken = refTokens[refTokens.length - 1];
	  if (finalToken === undefined) { return void 0 }
		const parent = this.get(refTokens.slice(0, -1));
    if (Array.isArray(parent)) {
      var index = +finalToken;
      if (index < parent.length) {
      	Array.prototype.splice.call(parent, index, 1);
			}
    } else {
      delete parent[finalToken];
    }
		return this
	}

	/**
	* Returns a (pointer -> value) dictionary for an object
	*
	* @param {function} descend
	* @returns {}
	*/
	dict(descend?: any) {
	  var results: any = {};
	  this.walk((value: any, pointer: string) => { results[pointer] = value }, descend);
	  return results;
	}

	/**
	* Iterates over an object
	* Iterator: function (value, pointer) {}
	*
	* @param obj
	* @param {function} iterator
	* @param {function} descend
	*/
	walk(iterator: pointerCB, descend: any = function (value: any) {
		var type = Object.prototype.toString.call(value);
		return type === '[object Object]' || type === '[object Array]';
	}) {
	  var refTokens: string[] = [];
		const next = (cur: any) => {
			for (var key in cur) {
				refTokens.push(String(key));
				if (descend(cur[key])) {
					next(cur[key]);
				} else {
					iterator(cur[key], this.compile(refTokens));
				}
				refTokens.pop();
			}
	  }
	  (next(this.root));
		return true
	}

	/**
	 * Builds a json pointer from an array of reference tokens
	 *
	 * @param refTokens
	 * @returns {string}
	 */
	compile(refTokens: string[]): string {
	  if (refTokens.length === 0) { return ''; }
	  return '/' + refTokens.map(this.escape).join('/');
	}
	/**
	 * Escapes a reference token
	 *
	 * @param str
	 * @returns {string}
	 */
	escape(str: string) { return escape(str) }
	/**
	 * Unescapes a reference token
	 *
	 * @param str
	 * @returns {string}
	 */
	unescape(str: string) { return unescape(str) }
	/**
	 * Converts a json pointer into an array of reference tokens
	 *
	 * @param pointer
	 * @returns {Array}
	 */
	parse(pointer: string): string[] { return parse(pointer) }
}


export function escape(str: string) {
	return str.toString().replace(/~/g, '~0').replace(/\//g, '~1');
}
export function unescape(str: string) {
	return str.replace(/~1/g, '/').replace(/~0/g, '~');
}
export function parse(pointer: string): string[] {
	if (typeof pointer !== 'string' || pointer === '') { return []; }
	if (pointer.charAt(0) !== '/') { pointer = `/${pointer}`}
	return pointer.substring(1).split(/\//).map(unescape);
}

/**
 * Convenience wrapper around the jsonPointer.
 * Calls `.get` when called with an `object` and a `pointer`.
 * Calls `.set` when also called with `value`.
 * If only supplied `object`, returns a partially applied function, mapped to `obj`
 *
 * @param {Object} obj
 * @param {String|Array} pointer
 * @param value
 * @returns {*}
 */
function jsonpointer(obj: any, pointer: _S, value: any): JSONpointer;
function jsonpointer(obj: any, pointer: _S): any;
function jsonpointer(obj: any): JSONpointer
function jsonpointer(obj?: any, pointer?: _S, value?: any): any {
 const P = new JSONpointer(obj);
 	if (typeof pointer === 'string') {
 		if (typeof value !== 'undefined') { // .set()
 			return P.set(pointer, value)
 		} else { // .get()
 			return P.get(pointer)
 		}
 	}
 	return P
}
export default jsonpointer;
