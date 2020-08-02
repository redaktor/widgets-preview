import { MAX_SAFE_INTEGER } from '../core/constants';
export function isLength(v: any) {
  return typeof v == 'number' && v > -1 && v % 1 === 0 && v <= MAX_SAFE_INTEGER;
}
