type mapper = (v: any, i: number, a: any[]) => any;
export default function stringOrArray(pattern: string | string[], fn: mapper){
  let patterns: string[] = Array.isArray(pattern) ? pattern : [];
  if (typeof pattern === 'string') {
    if (pattern.indexOf(' ') !== -1){
      patterns = pattern.toLowerCase().split(' ')
    } else {
      patterns.push(pattern.toLowerCase())
    }
  }
  return patterns.map(fn)
}
