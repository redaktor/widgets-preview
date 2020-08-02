import isArgs from './isArgs';
export default function isFlattenable(v: any) {
  return Array.isArray(v) || isArgs(v) ||
  !!(Symbol.isConcatSpreadable && v && v[Symbol.isConcatSpreadable])
}
