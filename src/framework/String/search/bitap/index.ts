import { regexString } from '../../regex/fromString';
import bitapSearch from './bitapSearch';
export interface BitapProperties {
  location?: number;
  distance?: number;
  threshold?: number;
  maxPatternLength?: number;
  caseSensitive?: boolean;
  tokenSeparator?: RegExp;
  findAllMatches?: boolean;
  minMatchCharLength?: number;
}
export interface BitapResult {
  isMatch?: boolean;
  score: number;
  matchedIndices: any[];
}
export const SPECIAL_CHARS_REGEX = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

export function regexSearch(text: string, pattern: string, tokenSeparator = / +/g) {
  let regex = new RegExp(regexString(pattern).replace(tokenSeparator, '|'));
  let matches = text.match(regex) || [];
  let isMatch = !!matches;
  let matchedIndices = [];
  if (isMatch) {
    for (let i = 0, matchesLen = matches.length; i <= matchesLen; i += 1) {
      let match = matches[i];
      matchedIndices.push([text.indexOf(match), match.length])
    }
  }
  // TODO: revisit this score ?
  return { score: isMatch ? 0.5 : 1, isMatch, matchedIndices }
}

export function patternAlphabet(pattern: string) {
  let mask: any = {};
  let len = pattern.length;
  for (let i = 0; i < len; i += 1) {
    mask[pattern.charAt(i)] = 0
  }
  for (let i = 0; i < len; i += 1) {
    mask[pattern.charAt(i)] |= 1 << (len - i - 1)
  }
  return mask
}


export default class Bitap {
  protected properties: BitapProperties;
  private pattern: string;
  private patternAlphabet: string = '';
  constructor (pattern: string, options: BitapProperties = {}) {
    const { maxPatternLength = 36 } = this.properties = {
      // Approximately where in the text is the pattern expected to be found?
      location: 0,
      // Determines how close the match must be to the fuzzy location (specified above).
      // An exact letter match which is 'distance' characters away from the fuzzy location
      // would score as a complete mismatch. A distance of '0' requires the match be at
      // the exact location specified, a threshold of '1000' would require a perfect match
      // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
      distance: 100,
      // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
      // (of both letters and location), a threshold of '1.0' would match anything.
      threshold: 0.75,
      // Machine word size
      maxPatternLength: 36,
      // Indicates whether comparisons should be case sensitive.
      caseSensitive: false,
      // Regex used to separate words when searching. Only applicable when `tokenize` is `true`.
      tokenSeparator: / +/g,
      // When true, the algorithm continues searching to the end of the input even if a perfect
      // match is found before the end of the same input.
      findAllMatches: false,
      // ...
      // weightLocation: false,
      // Minimum number of characters that must be matched before a result is considered a match
      minMatchCharLength: 1,
      ...options
    };

    this.pattern = this.properties.caseSensitive ? pattern : pattern.toLowerCase();
    if (this.pattern.length <= maxPatternLength) {
      this.patternAlphabet = patternAlphabet(this.pattern)
    }
  }

  search (text: string) {
    if (!this.properties.caseSensitive) {
      text = text.toLowerCase()
    }
    const searchBase = { needle: this.pattern, haystack: text };
    // Exact match
    if (this.pattern === text) {
      return {
        isMatch: true,
        score: 0,
        matchedIndices: [[0, text.length]],
        ...searchBase
      }
    }
    // When pattern length is greater than the machine word length, just do a a regex comparison
    const { maxPatternLength = 36, tokenSeparator } = this.properties;
    if (this.pattern.length > maxPatternLength) {
      return regexSearch(text, this.pattern, tokenSeparator)
    }
    // Otherwise, use Bitap algorithm
    const {
      location = 0, distance = 100, threshold = 0.75,
      findAllMatches = false, minMatchCharLength = 1
    } = this.properties;
    return {
      ...bitapSearch(text, this.pattern, this.patternAlphabet, {
        location,
        distance,
        threshold,
        findAllMatches,
        minMatchCharLength
      }),
      ...searchBase
    }
  }
}
// let x = new Bitap("od mn war", {})
// let result = x.search("Old Man's War")
// console.log(result)
