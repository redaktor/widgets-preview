export default function isObject(v: any): boolean {
  if (!!(v) && typeof v === 'object') {
    return (!(v instanceof RegExp) && !(v instanceof Array));
  }
  return false;
}
