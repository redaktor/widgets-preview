import { each, map } from '../Collection/each';

export function zip(a: any[], ...b: any[]) {
  const r: any = [];
  each(a, (v, i) => r.push([v]) && each(b, (_v) => { r[i].push(_v[i]) }) );
  return r
}
export function zipWith(a: any[], ...b: any[]) {
  const FN = b.pop(); // TODO FIXME get FN
  return map(a, (v, i) => FN(v, ...map(b, (_v) => _v[i])) )
}
export function unzip(a: any[]) {
  const L = Math.max(...a.map(_a => _a.length));
  return map(new Array(L), (v, i) => map(a, (o) => o == null ? void 0 : o[i]), L)
}
export function unzipWith(...a: any[]) {
  return zipWith(a[0][0], ...[...a[0].slice(1), ...a.slice(1)])
}
