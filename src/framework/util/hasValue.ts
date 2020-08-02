function sortObj(o: any) {
  if (Array.isArray(o) /*!isObject*/) { return o; }
  return Object.keys(o).sort().reduce((_o:any, k: string) => {
    _o[k] = o[k];
    return _o;
  }, {})
}
function inArr(a: any[], s: any, i?: number|true): any {
  /* opinionated compromise TODO */
  if (Array.isArray(s)) {
    return !!s.filter((w: string) => !!inArr(a,w)).length
  }
  if (s !== s) {
    s = 0;
    a = a.map((_s: any) => ((_s !== _s) ? 0 : _s))
  }
  if (typeof s === 'object') {
    s = sortObj(s);
    s = JSON.stringify([s]).slice(1,-1);
    a = a.map((_s: any) => (typeof _s === 'object') ? JSON.stringify([s]).slice(1,-1) : s)
  }
  if (typeof i === 'number') { return a.indexOf(s) === i }
  return (i === true) ? a.indexOf(s) : a.indexOf(s) > -1
}
function inObj(o: any, s: any, i?: any) {
  const keys = Object.keys(o);
  const a = keys.map((k: string) => o[k]);
  const index = inArr(a, s, true);
  return (index > -1) ? keys[index] : void 0;
}
export default function hasValue(x: any, s: any, i?: number) {
  if (typeof x !== 'object') { return void 0 }
  return (Array.isArray(x) ? inArr(x, s, i) : inObj(x, s, i))
}
