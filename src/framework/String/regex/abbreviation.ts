export const oneLetter:RegExp = /(^|\s|\.)[a-z][.]\s*?$/i;
export const ellipsis:RegExp = /[.]\.+( +)?$/;
export const acronym:RegExp = /[ |.][A-Z].?( *)?$/i;
export const noVowel:RegExp = /(^|\s|\.)[^aeiouy]+[.]\s*?$/i;
export default function isAbbreviation(s: string) {
  return !![oneLetter, ellipsis, acronym].filter((r) => r.test(s)).length
}
