// import latin from './regex/regexLatin';
import comboMark from './regex/regexComboMark';
import notUrlSafe from './regex/regexNotUrlSafe';
import unicodeReplace from './lexicon/unicode';
import * as trim from './trim';
interface CustomReplace {
  [replaceMeByValue: string]: string;
}
interface DeburrOptions {
  unicode?: boolean;
  customReplace?: CustomReplace;
}
interface SlugOptions {
  separator?: string;
  lowercase?: boolean;
  leading?: boolean;
  trailing?: boolean;
  decamelize?: boolean;
  customReplace?: CustomReplace;
}

export function deburr(str: string, options: DeburrOptions = {
  unicode: true,
  customReplace: {}
}) {
  str = `${str}`.replace(comboMark, '');
  const r = {...unicodeReplace, ...options.customReplace};
  for (let k in r) { str = str.replace(new RegExp(`[${k}]`, 'gu'), r[k]) }
  return str;
}
export default function slug(str: string, optionsOrSeparatorStr: SlugOptions | string = {
  separator: '-',
  lowercase: true,
  leading: false,
  trailing: false,
  decamelize: true,
  customReplace: {}
}) {
  const options = typeof optionsOrSeparatorStr === 'string' ?
    { separator: optionsOrSeparatorStr } : optionsOrSeparatorStr;
  options.separator = `${options.separator}`;
  const separator = notUrlSafe.test(options.separator) ? '-' : options.separator;
  const { decamelize, leading, trailing } = options;
  if (options.decamelize) { str = str.replace(/([a-z\d])([A-Z])/g, '$1 $2') }
  str = deburr(str.trim(), options).normalize('NFKD')
    .replace(notUrlSafe, separator).replace(/\\/g, '');
  if (options.lowercase) { str = str.toLowerCase() }
  if (leading && trailing) { return str }
  const trimKey = !leading && !trailing ? 'trim' : (!leading?'trimStart':'trimEnd');
	return trim[trimKey](str, separator)
}
