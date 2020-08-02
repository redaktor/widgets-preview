import isFlattenable from './isFlattenable';
import { isObjectLike } from './isObjectTypes';
import { values } from '../Object/keys';
export function toStr(v: any, fn?: any): string {
	if (typeof fn === 'function') { v = fn(v) }
  return typeof v === 'string' ? v : JSON.stringify(v)
}
export function toValues(v: any) {
	const isF = isFlattenable(v);
	return !isF && isObjectLike(v) ? values(v) : (isF || typeof v === 'string' ? v : [...v]);
}
