export default function omit(obj: any, ...keysToOmit: string[]): Object {
	return Object.keys(obj).reduce((acc: any, key) => {
		if (keysToOmit.indexOf(key) === -1) {
			acc[key] = obj[key];
		}
		return acc;
	}, {});
}
