import fromStringOrArray from './fromStringOrArray';
const replacements: any = {'ä': 'a', 'ö': 'o', 'ü': 'u', 'ß': 'ss', 'ph': 'f'};
const replaceRegex = new RegExp(`[${Object.keys(replacements).join(']|[')}]`, 'g');
const codes: any = { aeijouy:0, bp:1, dt:2, fvw:3, cgkq:4, x:48, l:5, mn:6, r:7, csz:8 };
const exceptions: any = {
  prefix: {
    ca:4, ch:4, ck:4, cl:4, co:4, cq:4, cu:4, cx:4,
    dc:8, ds:8, dz:8, tc:8, ts:8, tz:8
  },
  suffix: {
    sc:8, zc:8, cx:8, kx:8, qx:8
  }
}
function colognePhonetic(word: string, index?: number, arr?: any[]){
  if (typeof word !== 'string') { return '' }
  const values: string[] = [];
  word = word.replace(replaceRegex, (s) => replacements[s]);
  const l = word.length;
	for (var i = 0; i < l; i++) {
    const char = word.charAt(i);
    const patterns = [`${char}${word.charAt(i+1)}`,`${word.charAt(i-1)}${char}`];
		values.push((i === 0 && l > 1 && patterns[0] === 'cr') ? '4' : '');
    ['prefix','suffix'].forEach((key: any, i: number) => {
      const code = exceptions[key][patterns[i]];
      if (code) { values[i] = `${code}` }
    });
		if (values[i] === '') {
			for (var chars in codes) {
				if (chars.indexOf(char) > -1) {
					values[i] = `${codes[chars]}`;
					break;
				}
			}
		}
    if (!!i && (values[i] === values[i-1] || values[i] === '0')) {
			values[i] = '';
		}
	}
	return values.join('');
}

export default function colognePhonetics(pattern: string | string[]){
  return fromStringOrArray(pattern, colognePhonetic)
}
