import { toValues } from './to';
export default function startEndStepLength(
  a: any, start = 0, end?: number, step = 1, L: number = 0
): [number, number, number, number, any[]] {
  const R = toValues(a);
	L = !L ? R.length : L;
  end = typeof end === 'undefined' || !end ? L : end;
  const parse = (v: number, defaultValue: number, resolveNegative = true) => {
    if (typeof v === 'undefined' || isNaN(v)) { return defaultValue }
    if (resolveNegative && v < 0) { v += L }
    return v;
  }
  step = parse(step, 1, false);
  if (step === 0) {
    return [start, end||L, step, L, R]
  } else if (step > 1 && L !== 0) {
    L = L / step
  }
  [start, end] = (step > 0) ? [parse(start, 0), parse(end, (start < 0) ? 0 : L)] : [parse(start, L-1), parse(end, -1)];
  return <[number, number, number, number, any[]]>[start, end, step, L, R]
}
