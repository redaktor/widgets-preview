import isEqual from '../lang/isEqual';
import { toValues } from '../lang/to';
import { differenceBy } from '../Array/diu';
export function includes(a: any, ...b: any[]){
	return (differenceBy(toValues(a), b, isEqual).length === 0)
}
