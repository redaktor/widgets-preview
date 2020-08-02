/**
* Deeply conform to JSON spec (e.g. no undefined)
* @param  {any} value value to clone
* @return {any} cloned obj
*/
export default function deepClone(value: any, forceObject: boolean = false) {
	//if (forceObject && Array.isArray(value)) { value = {value} }
	switch (typeof value) {
		case "string":
			return forceObject ? JSON.parse(value) : value;
		case "object":
			return JSON.parse(JSON.stringify(value));
		case "undefined":
			return null;
		default:
			return forceObject ? JSON.parse(JSON.stringify({value})) : value;
	}
}
