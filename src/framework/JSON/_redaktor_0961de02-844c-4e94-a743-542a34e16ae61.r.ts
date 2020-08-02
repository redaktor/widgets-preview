import { PatchOptions } from './interfaces';
import PatchError from './PatchError';
import { isIntegerString } from '../lang/isInteger';
import { toStr } from '../lang/to';
export interface constructor1 {
}

export type _constructor = constructor1;


export interface tokens {
/**
 * @title pointer
*/
0?: _S;
}
/**
	 * Tests if an object has a value for a json pointer
	 *
	 * @param pointer
	 * @returns {boolean}
	 */
export interface has {
/**
 * @title pointer
*/
0: _S;
}
/**
	* Lookup a json pointer in an object
	*
	* @param {String|Array} pointer
	* @returns {*}
	*/
export interface get {
/**
 * @title pointer
*/
0?: _S;
}
/**
	* Sets a value on an object
	*
	* @param {String|Array} pointer
	* @param value
	*/
export interface set {
/**
 * @title pointer
*/
0: _S;
/**
 * @title value
*/
1: any;
/**
 * @title replacing
*/
2?: boolean;
}
/**
	* Removes an attribute
	*
	* @param {String|Array} pointer
	*/
export interface remove {
/**
 * @title pointer
*/
0: _S;
}
/**
	* Returns a (pointer -> value) dictionary for an object
	*
	* @param {function} descend
	* @returns {}
	*/
export interface dict {
/**
 * @title descend
*/
0?: any;
}
/**
	* Iterates over an object
	* Iterator: function (value, pointer) {}
	*
	* @param obj
	* @param {function} iterator
	* @param {function} descend
	*/
export interface walk {
/**
 * @title iterator
*/
0: pointerCB;
/**
 * @title descend
*/
1?: any;
}
/**
	 * Builds a json pointer from an array of reference tokens
	 *
	 * @param refTokens
	 * @returns {string}
	 */
export interface compile {
/**
 * @title refTokens
*/
0: string[];
}
/**
	 * Escapes a reference token
	 *
	 * @param str
	 * @returns {string}
	 */
export interface escape {
/**
 * @title str
*/
0: string;
}
/**
	 * Unescapes a reference token
	 *
	 * @param str
	 * @returns {string}
	 */
export interface unescape {
/**
 * @title str
*/
0: string;
}
/**
	 * Converts a json pointer into an array of reference tokens
	 *
	 * @param pointer
	 * @returns {Array}
	 */
export interface parse {
/**
 * @title pointer
*/
0: string;
}


export interface _JSONpointer{
/** new JSONpointer(root: any, options: PatchOptions)
 * @returns instance of JSONpointer
 */
_constructor?: _constructor;

tokens?: tokens;
/**
	 * Tests if an object has a value for a json pointer
	 *
	 * @param pointer
	 * @returns {boolean}
	 */
has?: has;
/**
	* Lookup a json pointer in an object
	*
	* @param {String|Array} pointer
	* @returns {*}
	*/
get?: get;
/**
	* Sets a value on an object
	*
	* @param {String|Array} pointer
	* @param value
	*/
set?: set;
/**
	* Removes an attribute
	*
	* @param {String|Array} pointer
	*/
remove?: remove;
/**
	* Returns a (pointer -> value) dictionary for an object
	*
	* @param {function} descend
	* @returns {}
	*/
dict?: dict;
/**
	* Iterates over an object
	* Iterator: function (value, pointer) {}
	*
	* @param obj
	* @param {function} iterator
	* @param {function} descend
	*/
walk?: walk;
/**
	 * Builds a json pointer from an array of reference tokens
	 *
	 * @param refTokens
	 * @returns {string}
	 */
compile?: compile;
/**
	 * Escapes a reference token
	 *
	 * @param str
	 * @returns {string}
	 */
escape?: escape;
/**
	 * Unescapes a reference token
	 *
	 * @param str
	 * @returns {string}
	 */
unescape?: unescape;
/**
	 * Converts a json pointer into an array of reference tokens
	 *
	 * @param pointer
	 * @returns {Array}
	 */
parse?: parse;
}
export default _JSONpointer;

