const SPECIAL_CHARS_REGEX = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
export function regexString(str: string) {
  return str.replace(SPECIAL_CHARS_REGEX, '\\$&')
}
export default function regexFromString(str: string) {
  return new RegExp(regexString(str))
}
