export default function isBuffer (v: any) {
  if (!v || typeof v !== 'object' || typeof v.length !== 'number' ||
    typeof v.copy !== 'function' || typeof v.slice !== 'function') { return false }
  return !(v.length > 0 && typeof v[0] !== 'number')
}
