import { filter } from '../Collection/each';
import { keys, keysIn } from '../Object/keys';
const isEnumerable = Object.prototype.propertyIsEnumerable;
const getSymbols = Object.getOwnPropertySymbols;
export function getSymbolsIn(o: any) {
	o = Object(o);
	if (!o || !Object.getOwnPropertySymbols) { return [] }
  var result = [];
  while (o) {
    result.push(filter(getSymbols(o), (symbol) => isEnumerable.call(o, symbol)(o)));
    o = Reflect.getPrototypeOf(o);
  }
  return result;
}
/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object: any, keysFunc: any, symbolsFunc: any) {
  var result = keysFunc(object);
  return Array.isArray(object) ? result : (result.push(symbolsFunc(object) && result));
}
/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
export function copySymbolsIn(source: any, object: any) {
  return getSymbolsIn(source).reduce((o, k) => { o[k] = source[k]; return o }, object)
}
export function copySymbols(source: any, object: any) {
  return getSymbols(source).reduce((o, k) => { o[k] = source[k]; return o }, object)
}
/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
export function getAllKeys(object: any) {
  return baseGetAllKeys(object, keys, getSymbols);
}
/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
export function getAllKeysIn(object: any) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}
