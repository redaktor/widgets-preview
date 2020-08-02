import { hasUnicodeWord, unicodeWords, asciiWords } from './checks';
export default function words(str: string, pattern?: RegExp|string, guard?: any): RegExpMatchArray {
  str = `${str}`;
  pattern = guard ? void 0 : pattern;
  if (pattern === void 0) {
    return hasUnicodeWord(str) ? unicodeWords(str) : asciiWords(str);
  }
  return str.match(<RegExp>pattern) || [];
}
export function wordsAndBreaks(str: string): RegExpMatchArray {
  str = `${str}`;
  return asciiWords(str, true) || [];
}
