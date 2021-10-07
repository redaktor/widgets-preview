// https://jsfiddle.net/2scf4v9d/1/

const line = 21;
const marginLeft = 0;
const marginRight = 0;
const p = 1.11111111;
const minW = 400;
const maxW = 560;
const ratios = [
	[9,16],[2,3],[3,4],[4,5],[6,7],[1,1],[7,6],[5,4],[4,3],[3,2],[16,10],[16,9],
  [37,20],[16,7],[21,9],[8,3],[3,1],[16,5],[9,2]
];

const bps = [
	[2,42,821], [3,63,1221], [4,84,1621], [5,105,2021]
];
const a = [];
ratios.forEach((r) => {
  bps.forEach((o, i) => {
	const [cols,step1,bp] = o;
    const step = step1/r[1]*r[0];
    let l = Math.floor(bp / cols / r[0] * r[1] / 21);
    a.push([bp,...r,l]);
    const maxW = (i === bps.length-1 ? 3320 : bps[i+1][2]);
    let w = 0;
    for (let s = 0; s < 9999; s++) {
    	l = l+1
    	const w = Math.ceil(bp+(!s ? step/2 : (s*step+(step/2))));
      if (w > maxW) {
      	break;
      }
      a.push([w,...r,l])
    }
  });
});
const o = {}
a.sort((a,b) => a[0]>b[0]).map((a) => {
	const k = `_${a[0]}px`;
  if (!o[k]) { o[k] = [] }
	o[k].push(`	.m${a[1]}by${a[2]} { --l: ${a[3]}; }
`);
  // `@media screen and (min-width: ${a[0]}px) { .m${a[1]}by${a[2]} { --l: ${a[3]}; } }`
})
let s = '';
Object.keys(o).forEach((k) => {
	s += `@media screen and (min-width: ${k.replace('_','')}) {
`;
	o[k].forEach((r) => { s += r })
  s += `}
`;
});
console.log(s);
