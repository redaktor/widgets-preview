import { some } from '../Collection/each';
/**
* Recursively checks whether an object has any undefined values inside.
*/
export default function hasUndefined(o: any): boolean {
  if (o === undefined) { return true }
  if (!!o && typeof o === 'object' && some(o, hasUndefined)) { return true }
  return false
}
