import TLDs from '../lexicon/abbreviations/TLD';

export const urlCheap:RegExp = /^(https?:\/\/|www\.)\w+\.[a-z]{2,3}/;
export const urlTLD:RegExp = new RegExp(`^[\w\.\/]+\.(${TLDs})`);
export const TLD:RegExp = new RegExp(`^(${TLDs})`);
export default function isUrl(s: string) {
  return !![urlCheap, urlTLD].filter((r) => r.test(s)).length
}
