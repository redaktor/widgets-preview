// much faster than cached /^\d+$/.test(str)
export function isIntegerString(s: string): boolean {
  if (typeof s === 'number') { s = `${s}` }
  var i = 0;
  var len = s.length;
  var charCode;
  while (i < len) {
    charCode = s.charCodeAt(i);
    if (charCode >= 48 && charCode <= 57) {
      i++;
      continue;
    }
    return false;
  }
  return true;
}
export default function isInteger(n: number): boolean {
  return typeof n === 'number' && isIntegerString(`${n}`)
}
