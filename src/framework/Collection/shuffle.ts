import range from '../lang/range';
function _shuffle(a: any, size: number = 1) {
	let [i, end, s, L, R] = range(a, 0, size+1, 1);
  for (i = L-1; i > L-end; i -= 1) {
  	const randI = Math.floor(Math.random()*(i+1));
    const tmp = R[i];
    R[i] = R[randI];
    R[randI] = tmp;
  }
  return R.slice(0, size);
}
export function sample(a: any) { return _shuffle(a, 1) } // TODO FIXME doShuffle(a, 1)[0],
export function sampleSize(a: any, size: number = 1) { return _shuffle(a, size) }
export function shuffle(a: any) { return _shuffle(a) }
