export default function exportReduce(o: any, isComma = true, hasWhitespace = false) {
  const result: any = {};
  for (let v in o) {
    const k = hasWhitespace ? o[v] : o[v].replace(/(?:\n\s*)/g, ``);
    const a = isComma ? k.split(',') : Array.isArray(k) ? k : [k];
    const l = a.length;
    for(let i = 0; i < l; i++) { result[a[i]] = v }
  }
  return result
}
