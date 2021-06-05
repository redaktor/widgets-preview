
// https://jsfiddle.net/kyev38ab/8/

const line = 21;
const marginLeft = 21;
const marginRight = 21;
const p = 21;
const minW = 400;
const maxW = 540;

const ratios = [
	[9,16],[2,3],[3,4],[4,5],[6,7],[1,1],[7,6],[5,4],[4,3],[3,2],[16,10],[16,9],
  [37,20],[16,7],[21,9],[8,3],[3,1],[16,5],[9,2]
];

let ars = [];
for (let cols = 1; cols < 7; cols++) {
	ars.push([]);
  const a = ars[ars.length-1];
  const ml = cols > 4 ? marginLeft * 2 : marginLeft;
  const mr = cols > 4 ? marginRight * 2 : marginRight;
  const plr = cols > 4 ? p * 2 : p;
	ratios.forEach((ratio) => {
		for (let lines = 1; lines < 99999; lines++) {
    	const h = lines * line;
      const w = Math.ceil(h / ratio[1] * ratio[0]);
      const _h = Math.ceil(lines * line - (line/2));
      const _w = Math.ceil(_h / ratio[1] * ratio[0]);
      const screenW = _w * cols + ml + mr + ((cols-1) * plr);
      if (w > minW && w < maxW) {
      	a.push({cols,ratio,lines,screenW,w,h});
      } else if (w > maxW) {
      	break;
      }
    }
  });
}
const columns = ars.map((ar,i) => {
	const minL = !i ? 0 : ars[i-1][ars[i-1].length-1].screenW;
	return ar.sort((a,b) => a.screenW>b.screenW).filter((o) => o.screenW > minL).reduceRight((o, cur) => {
	if (!o[cur.screenW]) { o[cur.screenW] = [] }
  o[cur.screenW].push(cur);
  return o
}, {})
});

console.log(columns);
/*
Array (6)
	{
  	414: [{
    cols: 1, h: 126, lines: 6, ratio: [16, 5], screenW: 414, w: 404
    }],
    ...
  }

  @media screen and (min-width: 1688px) {
	.m9by16 { --l: 36; }
*/
const rootRules = [
``,`
	.root { --cols: 2; }
	@supports not (grid-template-rows: masonry) {
		.item:nth-of-type(2n+1) { order: 1; }
		.item:nth-of-type(2n) { order: 2; }
    .col2 { display: block; }
  }`,`
	.root { --cols: 3; }
	@supports not (grid-template-rows: masonry) {
		.item:nth-of-type(3n+1) { order: 1; }
		.item:nth-of-type(3n+2) { order: 2; }
		.item:nth-of-type(3n) { order: 3; }
    .col2, .col3 { display: block; }
  }`,`
	.root { --cols: 4; }
	@supports not (grid-template-rows: masonry) {
		.item:nth-of-type(4n+1) { order: 1; }
		.item:nth-of-type(4n+2) { order: 2; }
		.item:nth-of-type(4n+3) { order: 3; }
		.item:nth-of-type(4n) { order: 4;tem:nth-of-type(4n) { order: 4; }
    .col2, .col3, .col4 { display: block; }
  }`,`
	.root { --cols: 5; --gap: var(--line2); --gapHalf: var(--line);  }
	@supports not (grid-template-rows: masonry) {
		.item:nth-of-type(5n+1) { order: 1; }
		.item:nth-of-type(5n+2) { order: 2; }
		.item:nth-of-type(5n+3) { order: 3; }
		.item:nth-of-type(5n+4) { order: 4; }
		.item:nth-of-type(5n) { order: 5; }
    .col2, .col3, .col4, .col5 { display: block; }
  }`,`
	.root { --cols: 6; }
	@supports not (grid-template-rows: masonry) {
		.item:nth-of-type(6n+1) { order: 1; }
		.item:nth-of-type(6n+2) { order: 2; }
		.item:nth-of-type(6n+3) { order: 3; }
		.item:nth-of-type(6n+4) { order: 4; }
		.item:nth-of-type(6n+5) { order: 5; }
		.item:nth-of-type(6n) { order: 6; }
    .col2, .col3, .col4, .col5, .col6 { display: block; }
  }`,

]
const queries = columns.map((o, i) => {
	let s = ``;
	Object.keys(o).map((k, j) => {
  	if (!j) { s += rootRules[i] }
    s += `@media screen and (min-width: ${k}px) { `
    o[k].forEach((q) => `.m${q.ratio[0]+'by'+q.ratio[1]} { --l: ${q.lines}; } `)
    s += ' }'
  });
  return s
});
console.log(queries);














or
// https://jsfiddle.net/ok5p6x29/1/
// test https://jsfiddle.net/2fk5p9vL/

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

// -->

const line = 21;
const marginLeft = 0;
const marginRight = 0;
const p = 1.11111111;
const minW = 400;
const maxW = 560;
const ratios = [
	[9,16],[1,1],[3,2],[9,2]
];

const x = ratios.map((ar) => {
	const name = `.m${ar[0]}by${ar[1]}`;
	const a = [];
	let w;
	for (let l = 1; l < 999; l++) {
  	if (w > maxW) {break}
    const h = l * line;
    w = Math.ceil(h / ar[1] * ar[0]);
    if (w < maxW) { a.push({l, w, h, name}) }
  }
  return a
});
console.log(x);

let qa = [];
for (let cols = 1; cols < 7; cols++) {
  const queries = x.flat(2).map((o) => {

    if (o.w > minW) {
    	const minWidth = (o.w * cols) + (line * cols) + (line * 2);
			qa.push([minWidth,`@media screen and (min-width: ${minWidth}px) { ${o.name} { --l: ${o.l}; } }`]);
    }
  });
}

const mediaQueries = qa.sort((a,b) => a[0] > b[0]).map((a) => a[1]).join('\n');
console.log(mediaQueries);
// -->

let r = [];
for (let cols = 2; cols < 7; cols++) {
  const min = minW * cols;
  const max = maxW * cols;
  const gapPercent = (cols+1) * p + marginLeft + marginRight;
  r.push({
  	minVP: Math.floor(min + gapPercent*min/100),
    maxVP: Math.floor(max + gapPercent*max/100),
    cols: cols,
    gapPercent: gapPercent,
    steps: {}
  });
}

r.forEach((o) => {

	ratios.map((ar) => {
    const steps = [];
    const maxLines = Math.ceil(maxW / line);
    for (let lines = Math.ceil(minW / line); lines < maxLines; lines++) {
    	const lineCount = Math.ceil(lines / ar[0] * ar[1]);
      if (!steps[steps.length-1] || lineCount !== steps[steps.length-1][1]) {
        steps.push([
          Math.min(
            Math.max(
              Math.ceil((lines * line * o.cols) + (o.gapPercent * (lines * line * o.cols) / 100)),
              o.minVP
            ),
            o.maxVP-1
          ),
          lineCount
        ])
      }
    }
    const key = `m${ar[0]}by${ar[1]}`;
    if (!o.steps[key]) { o.steps[key] = [] }
    o.steps[key] = steps
  });

});


r = r.map((o) => {
	o.lines = {};
  Object.keys(o.steps).forEach((k) => {
  	o.lines[k] = o.steps[k].shift()[1];
  });
  const _steps = {};
  Object.keys(o.steps).forEach((s) => {
  	o.steps[s].forEach((a) => {
    	if (!_steps[a[0]]) { _steps[a[0]] = [] }
      _steps[a[0]].push([s, a[1]])
    });
  })
  o.stepsOrdered = _steps;
  return o
});

// console.log( JSON.stringify(r) );
const w = {2: '50%', 3: '33.33333333%', 4: '25%', 5: '20%', 6: '16.666666%', };
const cols = (colcount) => {
		let s = '';
		for (let i = 0; i < colcount-1; i++) {
    	s += `
		.item:nth-of-type(${colcount}n + ${i+1}) {
			order: ${i+1};
		}`
    }
    return `${s}
		.item:nth-of-type(${colcount}n) {
			order: ${colcount};
	  }`;
}
const colsVisible = (colcount) => {
let s = '';
for (let i = 2; i <= colcount; i++) {
	s += `.col${i}, `
}
return s.slice(0,-2) + ` { display: block; }`
}
const rules = `.root { --gap: ${p}vw; }\n` + r.map((o) => {
	const a = [
  `@media screen and (min-width: ${o.minVP}px) {
	.root { --cols: ${o.cols}; }
	@supports not (grid-template-rows: masonry) {
  		.item { width: ${w[o.cols]}; }
    ${cols(o.cols)}
    ${colsVisible(o.cols)}
  }
${Object.keys(o.lines).map((l) =>
`	.${l} { --l: ${o.lines[l]}; }`).join('\n')}
}`].concat(Object.keys(o.stepsOrdered).map((k) => {
  	// "stepsOrdered":{"868":[{"m9by16":36},{"m2by3":30}
    return `@media screen and (min-width: ${k}px) {
${o.stepsOrdered[k].map((_a) => `	.${_a[0]} { --l: ${_a[1]}; }`).join('\n')}
}`
  }))
	return a.join('\n')

}).join('\n');

console.log( rules );
