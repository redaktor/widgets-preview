import jsonPointer from '../JSON/Pointer';
export function invoke(o: any, path: string | string[], fnName: string, ...args: any[]) {
	const fn = jsonPointer(o, path)[fnName];
	return (typeof fn !== 'function') ? void 0 : fn(...args)
}
/* COLLECTION
invokeMap(collection: any, path: Function | string[] | string, ...args) => (Array): Returns the array of results.
Invokes the method at path of each element in collection, returning an array of the results
of each invoked method. Any additional arguments are provided to each invoked method.
If path is a function, it's invoked for, and this bound to, each element in collection.

OBJECT
invoke(object: any, path: string[] | string, ...args) => Returns the result of the invoked method.
Invokes the method at path of object. args: The arguments to invoke the method with.
*/
