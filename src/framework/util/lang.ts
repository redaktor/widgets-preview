import has from '@dojo/framework/core/has';
//import jsonPointer from '../JSON/Pointer';


/*
Based on sizeof.js by Stephen Morley
A function to calculate the approximate memory usage of objects
Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
the terms of the CC0 1.0 Universal legal code:
http://creativecommons.org/publicdomain/zero/1.0/legalcode
Returns the approximate memory usage, in bytes, of the specified object.
*/
export function getApproximateByteSize(object: any): number {
	let objects = [ object ];
	let size = 0;
	for (let index = 0; index < objects.length; index++) {
		switch (typeof objects[index]) {
			case 'boolean':
				size += 4;
				break;

			case 'number':
				size += 8;
				break;

			case 'string':
				size += 2 * objects[index].length;
				break;

			case 'object':
				// if the object is not an array, add the sizes of the keys
				if (Object.prototype.toString.call(objects[index]) !== '[object Array]') {
					for (let key in objects[index]) {
						size += 2 * key.length;
					}
				}
				// loop over the keys
				for (let key in objects[index]) {
					// determine whether the value has already been processed
					let processed = false;
					for (let j = 0; j < objects.length; j++) {
						if (objects[j] === objects[index][key]) {
							processed = true;
							break;
						}
					}
					// queue the value to be processed if appropriate
					if (!processed) {
						objects.push(objects[index][key]);
					}
				}
		}
	}
	return size;
}
//const _ = exports;
//export default _;
export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      if (name !== 'constructor') {
        derivedCtor.prototype[name] = baseCtor.prototype[name];
      }
    });
  });
}
/* TODO FIXME SHOULD be to('function') or toFunction as well */
export function functor(v: any) {
  return typeof v === "function" ? v : function() { return v; };
}

export function getDottedProperty(object: any, parts: any[], create: boolean = false) {
  var key: string;
  var i = 0;
  while (object && (key = parts[i++])) {
    if (typeof object !== 'object') {
      return undefined;
    }
    object = key in object ? object[key] : (create ? object[key] = {} : undefined);
  }
  return object;
}
export function getProperty(object: any, propertyName: string, create: boolean = false) {
  if (create === void 0) { create = false; }
  return getDottedProperty(object, propertyName.split('.'), create);
}

export function exists(name: string, obj: any): boolean {
	// derives from dojo 1.x lang
	// example:
	//	| // define an object
	//	| var foo = {
	//	|		bar: { }
	//	| };
	//	|
	//	| // search the global scope
	//	| lang.exists("foo.bar"); // true
	//	| lang.exists("foo.bar.baz"); // false
	//	|
	//	| // search from a particular scope
	//	| lang.exists("bar", foo); // true
	//	| lang.exists("bar.baz", foo); // false
  if (!obj || typeof obj !== 'object') { return false; }
	return (getProperty(obj, name, false) !== undefined);
}
/* Try to make a shallow copy */
export function copy(o: any) {
  try { return JSON.parse(JSON.stringify(o)); } catch (e) { return o; }
}
/* Std. reduce array to object */
export function arrToObjByKey(key: string) {
  return (o: any, aO: any) => { o[aO[key]] = aO; return o; };
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
export function eq(value: any, other: any) {
  return value === other || (value !== value && other !== other);
}


export function byteLength(v: any) {
  if (!!(Buffer) && Buffer.isBuffer(v)) {
    return v.length;
  } else if (!!(ArrayBuffer) && ArrayBuffer.isView(v)) {
    return (<any>v).length;
  } else if (typeof v === 'string') {
    if (has('host-node')) {
      return Buffer.byteLength(v);
    } else {
      // Buffer fallback, returns the byte length of an utf8 string
      var s = (<string>v).length;
      for (var i=v.length-1; i>=0; i--) {
        var code = v.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff) s++;
        else if (code > 0x7ff && code <= 0xffff) s+=2;
        if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
      }
      return s;
    }
  } else {
    // type fallback, other than string
    return getApproximateByteSize(v);
  }
}

/* TODO - FIXME - check: */
// user input for regex quotes (treat as literal string)
export function escapeRegExp(s: string){
	return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function hash(s: string) {
	if (typeof s != 'string') { s = JSON.stringify(s); }
	var hash = 0, i: number, chr: number, len: number;
	if (s.length == 0) return hash;
	for (i = 0, len = s.length; i < len; i++) {
		chr   = s.charCodeAt(i);
		hash  = ((hash << 5) - hash) + chr;
		hash |= 0;
	}
	return hash;
}
