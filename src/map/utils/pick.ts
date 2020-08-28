// @flow

export default function pick(object: any, keys: string[]): Object {
	return keys.reduce((obj: any, key) => {
		if (typeof object[key] !== 'undefined') {
			obj[key] = object[key];
		}
		return obj;
	}, {});
}
