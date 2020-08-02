import range from '../lang/range';

const hasMin = (n: number, min = 2) => (typeof n === 'number' && n >= min);
export function slice(start: number = 0, end?: number, step = 1, length?: number) {
	[start, end, step, length] = range(this.value, start, end, step);
	let r: any = new Array(length);
	let j = 0;
	for (let i = start; start <= end ? i < end : i > end; i += step) { r[j] = this.value[i]; j++ }
	return r
}
export function chunk(size = 2, i = 0, rI = 0) {
  size = Math.max(size, 0);
  const L = this.value.length;
  const R: any = new Array(Math.ceil(L / size));
  while (i < L) { R[rI++] = this.value.slice(i, (i += size)) }
  return R
}
export function drop(n = 1) { return hasMin(n) ? this.value.slice(n) : this.value.slice(1) }
export function dropLast(n = 1) { return hasMin(n) ? this.value.slice(0, 0-n) : this.value.slice(0, 1) }
export function take(n = 1) { return hasMin(n) ? this.value.slice(0,n) : this.value[0] }
export function takeLast(n = 1) {
  return hasMin(n) ? this.value.slice(this.value.length - n) : this.value[this.value.length - 1]
}
