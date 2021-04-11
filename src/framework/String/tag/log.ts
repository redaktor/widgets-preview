import has from '@dojo/framework/core/has';
import { endsWith } from '@dojo/framework/shim/string';

const R = [31, '#DC0005'];
const G = [32, '#95CC0D'];
const B = [34, '#0D7ECC'];
const C = [36, '#1397A3'];
const M = [35, '#CC0D5A'];
const Y = [33, '#FFAF00'];
const K = [30, '#1C191B'];
const W = [37, '#F5F5F5'];
const gray = [90, '#74757A'];
const colorCodes = {
  R, red: R, error: R,
  G, green: G, success: G,
  B, blue: B, info: B,
  C, cyan: C,
  M, magenta: M,
  Y, yellow: Y, warning: Y,
  K, black: K,
  W, white: W,
  gray, grey: G, muted: G,
  reset: ['','']
}
type Color = keyof typeof colorCodes;
const prefixes: any = {
  reset:  ' ',
  message:' ',
  success:'*',
  warning:'!',
  error:  '!',
  list:   '*',
  input:  '<',
  output: '>',
  neutral:'*',
  muted:  '*'
}
// type Prefix = keyof typeof prefixes;
const types: {[k: string]: Color} = {
  _string: 'G',
  _number: 'B',
  _function: 'Y',
  _key: 'M',
  _null: 'gray',
  _undefined: 'gray',
  _boolean: 'reset',
}
const prefixFns = Object.keys(prefixes).reduce((o: any, prefix: any) => {
  o[prefix] = (strings: TemplateStringsArray, ...values: any[]) => {
    const logArgs = _(strings, ...values);
  	logArgs[0] = coloredStr(`${prefixes[prefix]} ${logArgs[0]}`, <Color>prefix);
    console.log(...logArgs);
    return logArgs[0]
  }
  return o;
}, {});

export function _(strings: TemplateStringsArray, ...values: any[]) {
  const browserColors: string[] = [];
  const s = strings.reduce((result, s, i) => {
    let v = Array.isArray(values[i]) ? values[i].join(' ') : values[i];
    const color = Object.keys(colorCodes).filter(k => endsWith(s, `${k}`))[0];
    if (color) {
      s = s.slice(0, 0 - color.length);
      v = coloredStr(v, <Color>color, browserColors)
    }
    return `${result}${s}${v ? `${v}` : ''}`;
  }, '');
  return [s, ...browserColors]
}
export function log(strings: TemplateStringsArray, ...values: any[]) {
	const logArgs = _(strings, ...values);
  console.log(' ', ...logArgs);
  return logArgs[0]
}

export const {
  reset, message, success, warning, error, list, input, output, neutral, muted
} = prefixFns;
export function info(...strings: string[]) {
  // strings = strings.map(s => _`${s}`[0]);
  log`G${` ╚════╝`}`;
  log`G${` ╔════╗`}`;
  log`G${` ║    ║`}`;
  log`G${` ║    ║`} ${strings.join(' ')}`;
}

function coloredStr(v: any, color: Color, browserColors: string[] = []) {
  if (!colorCodes[color]) { return v }
  if (has('host-node')) {
    const code = colorCodes[color][0];
    v = `\u001b[${code}m${v}\u001b[${!!code ? '39' : ''}m`;
  } else {
    const hex = colorCodes[color][0];
    v = `%c${v}`;
    browserColors.push(`color: ${hex}`)
  }
  return v
}

export function syntaxLog(prefix: string, key: string, value: string, includeFn: boolean): void {
  if (typeof console === 'undefined') { return; }
  if ((prefix === '<' || prefix === '>') && typeof value === 'string' &&
      /^(http|\/|.\/|..\/)/i.test(value)) {
    console.log(prefix, key, syntaxColor(value, 'gray'));
  } else if (!!value && typeof value === 'object' && key.length && Object.keys(value).length) {
    console.log(prefix, key, syntaxColor('\u27C0', 'yellow'));
    console.log(syntaxHighlight(JSON.stringify(value, null, 2)));
    // console.log(' ');
  } else if (value === void 0 || value === null) {
    const strValue = (value === void 0) ? 'undefined' : 'null';
    console.log(prefix, key, syntaxColor(strValue, 'gray'));
  } else if (typeof value === 'function') {
    if (includeFn) {
      console.log(prefix, syntaxColor(key, 'yellow'), value)
    } else {
      return void 0;
    }
  } else {
    console.log(prefix, key, syntaxHighlight(JSON.stringify(value)));
  }
}

export function dumpError(err: any) {
  if (typeof err === 'object') {
    if (err.message) {
      console.log('\nERROR Message: ' + err.message)
    }
    if (err.stack) {
      console.log('\nStacktrace:')
      console.log('====================')
      console.log(err.stack);
    }
  } else {
    console.log('dumpError :: argument is not an object');
  }
}

export function syntaxColor(v: string, color?: string) {
  if (typeof color === 'string' && colorCodes.hasOwnProperty(color)) {
    return coloredStr(v, <Color>color);
  }
  let cType = types._number;
  if (/^"/.test(v)) {
    cType = /:$/.test(v) ? types._key : types._string;
  } else if (/true|false/.test(v)) {
    cType = types._boolean;
  } else if (/null|undefined/.test(v)) {
    cType = types._null;
  }
  return coloredStr(v, cType);
}
export function syntaxHighlight(value: string) {
  const fn: any = (v: string, color?: string) => syntaxColor(v, color);
  return value.replace(
/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, fn);

}
export function pwStr(str: string, padding: number = 1): string {
  str = `${str}`;
	if ((padding*2)>str.length-3) { padding = 1; }
  const secretStr = new Array(str.length+1-padding).join('*');
  return ([str.slice(0,padding),secretStr,str.slice(0-padding)].join(''));
}

export function _log(logArr: any, doPadding: boolean = false, includeFn: boolean = true) {
  if (typeof console === 'undefined') { return; }
  if (!(logArr instanceof Array)) { logArr = [logArr]; }
  logArr.forEach((o: any) => {
    const isPrefix = prefixes.hasOwnProperty(Object.keys(o)[0]);
    let prefix = ':';
    if (typeof o !== 'object' || Object.keys(o).length > 1 || !isPrefix) {
      console.log(':', o);
    } else {
      const key = Object.keys(o)[0];
      const isSyntax = !(colorCodes.hasOwnProperty(key));
      prefix = prefixes.hasOwnProperty(key) ? prefixes[key] : ' ';
      if (typeof o[key] !== 'object') {
        if (isSyntax) {
          syntaxLog(prefix, '', o[key], includeFn);
        } else {
          console.log(' ', o[key]);
        }
      } else if (Array.isArray(o[key])) {
        o[key].forEach((v: any) => {
          syntaxLog(prefix, '', v, includeFn);
        });
      } else {
        for (let logKey in o[key]) {
          let k: string = logKey;
          const v: any = o[key][k];
          if (typeof v !== 'function' && doPadding) {
            k = new Array(Object.keys(o[key]).reduce((a,b) => {
              return a.length > b.length ? a : b;
            }).length + 1).join(' ');
            k = ([k||' ',logKey].join(' ')).slice(-k.length-1);
          }
          syntaxLog(prefix, k+':', v, includeFn);
        }
      }
    }
    // if (prefix != '<' && prefix != '>') { console.log(' '); }
  });
}
