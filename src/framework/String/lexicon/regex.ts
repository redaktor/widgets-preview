interface RegExps { [id: string]: RegExp; }
interface SpecRegExp {reg: RegExp, str: string, tag: string|string[]};
interface RegExpGroups { [id: string]: string[]; }
import { tld } from './abbreviations';

export const notRealWord: any = { '-': 1, '–': 1, '--': 1, '...': 1 };

const _ = String.raw;
export const regexps: RegExps = {
  default: /\S/,
  punctuation: /(\S)\s*?$/,
	punctuations: /(\S.+?[.!?])(?=\s+|$)/g,
  endPunctuation: /([a-z])([,:;\/.(\.\.\.)\!\?]+)$/i,
  beforePunctuation: /^(\s|-+|\.\.+)+/,
  afterPunctuation: /(\s+|-+|\.\.+)$/,
  oneLetter: /(^|\s|\.)[a-z][.]\s*?$/i,
  noVowel: /(^|\s|\.)[^aeiouy]+[.]\s*?$/i,
  periodDigit: /\d[.]\s*?$/,
  acronym: /[ |.][A-Z].?( *)?$/i,
  periodAcronym: /([A-Z]\.)+[A-Z]?$/,
  oneLetterAcronym: /^[A-Z]\.$/,
  noPeriodAcronym: /[A-Z]{3}$/,
  hashAt: /^[#@]/,
  singleQuote: /[\u2018\u2019\u201A\u201B\u2032\u2035]+/g,
  doubleQuote: /[\u201C\u201D\u201E\u201F\u2033\u2036"]+/g,
  enDash: /\u2013/g,
  unicodeEllipsis: /\u2026/g,
  ellipsis: /[.]\.+( +)?$/,
  hyphen: /^([a-z]+)(-)([a-z0-9].*)/i,
  line: /(\n+)/,
  hasText: /^[a-z]/i,
  hasVowel: /[aeiouy]/i,
  hasLetter: /[a-z]/i,
  hasNumber: /[0-9]/,
  hasLetterOrNumber: /[a-z|A-Z|0-9]/,
  hasLetterValue: /[a-z][0-9][a-z]/,
  hasDigitValue: /^([$-])*?([0-9,\.])*?([s\$%])*?$/,
  range: /\{[0-9,]+\}$/,
  titleCase: /^[A-Z][a-z']/,
  romanNumber: /^[IVXCM]+$/,
  minusNumber: /^( *)-(\$|€|¥|£)?([0-9])/,
  email: /^\w+@\w+\.[a-z]{2,3}$/, // TODO not fancy
  hashTag: /^#[a-z0-9_]{2,}$/,
  atMention: /^@\w{2,}$/,
  urlCheap: /^(https?:\/\/|www\.)\w+\.[a-z]{2,3}/, // with http/www
  urlTld: new RegExp(_`^[\w\.\/]+\.(${tld})`),
  startQuote: /^["'\u201B\u201C\u2033\u201F\u2018]/,
  endQuote: /.["'\u201D\u2036\u2019]([;:,.])?$/,
  cardinal: /^[0-9]([0-9]+,)*?(\.[0-9])$/,
  contraction: /^([a-z]+)'([a-z][a-z]?)$/i
}
export const regexpGroups: RegExpGroups = {
  abbreviation: ['oneLetter','noVowel','acronym','ellipsis'],
  acronymCompact: ['periodAcronym','oneLetterAcronym','noPeriodAcronym'],
  url: ['urlCheap','urlTld']
}

export function itIs(s: string, rName: string = 'default') {
  if (rName === 'default' && (!s || typeof s !== 'string')) { return false }
  if (Array.isArray(regexpGroups[rName])) {
    return !!regexpGroups[rName].filter((k) => !!regexps[k] && regexps[k].test(s)).length
  }
  return (!regexps[rName]) ? false : !!regexps[rName].test(s)
}
export function splitBy(s: string, rName: string = 'default') {
  if (!regexps[rName]) { return [s] }
  return s.split(regexps[rName])
}

export const replacers: any = {
  pre: [
    [/\+/g, '<plus>'],
    [/\t/g, ' '],
    [/\s+/g, ' '],
    [/(’|‘)/g, "'"],
    [/(“|”)/g, '"'],
    [/(–|—)/g, '—'],
    [/[\u00A1-\u1EF3]/g, ' '] /*, [/``/g, '"'], [/''/g, '"']*/
  ],
  post: [
    [/[+]{1}/g, ' '],
    [/<plus>/g, '+'],
    [/\d,\d/g, '']
  ]
}

const punctuationRegs = [
  // #funtime
  ['^#[a-z]+', 'HashTag'],
  // chillin'
  ['[a-z]+n\'', 'Gerund'],
  // spencers'
  ['[a-z]+s\'', 'Possessive'],
  // 589-3809
  ['[0-9]{3}-[0-9]{4}', 'PhoneNumber'],
  // 632-589-3809
  ['\\(?[0-9]{3}\\)?[ -]?[0-9]{3}-[0-9]{4}', 'PhoneNumber'],
  // dates/times
  ['[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])', 'Time'], // 4:32:32
  ['[012]?[0-9](:[0-5][0-9])?(:[0-5][0-9])? ?(am|pm)', 'Time'], // 4pm
  ['[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])? ?(am|pm)?', 'Time'], // 4:00pm
  ['[PMCE]ST', 'Time'], // PST, time zone abbrevs
  ['utc ?[\+\-]?[0-9]\+?', 'Time'], // UTC 8+
  ['[a-z0-9]*? o\'?clock', 'Time'], // 3 oclock
  ['[0-9]{1,4}[/\\-\\.][0-9]{1,2}[/\\-\\.][0-9]{1,4}', 'Date'], // 03/02/89, 03-02-89
  // money
  ['^[\-\+]?[$€¥£][0-9]+(\.[0-9]{1,2})?$', ['Money', 'Value']], // like $5.30
  ['^[\-\+]?[$€¥£][0-9]{1,3}(,[0-9]{3})+(\.[0-9]{1,2})?$', ['Money', 'Value']], // like $5,231.30
  // values
  ['[0-9]{1,4}(st|nd|rd|th)?-[0-9]{1,4}(st|nd|rd|th)?', 'NumberRange'], // 5-7
  ['^[\-\+]?[0-9]{1,3}(,[0-9]{3})+(\.[0-9]+)?$', 'NiceNumber'], // like 5,999.0
  ['^[\-\+]?[0-9]+(\.[0-9]+)?$', 'NumericValue'], // like +5.0
  ['^\.?[0-9]+([0-9,\.]+)?%$', ['Percent', 'Cardinal', 'NumericValue']], // 7%
  ['[0-9]{1,4}/[0-9]{1,4}', 'Fraction'], // 3/2ths
  ['[0-9]{1,2}-[0-9]{1,2}', 'Value'], // 7-8
  // mc'adams
  ['ma?c\'.*', 'LastName'],
  // o'douggan
  ['o\'[drlkn].*', 'LastName']
]
export const punctuationRegexps: SpecRegExp[] = punctuationRegs.map((a: any[]) => ({
  reg: new RegExp('^' + a[0] + '$', 'i'),
  tag: a[1],
  str: a[0]
}));
export const suffixRegexps: any[] = [
  // slang things
  [/^(lol)+[sz]$/, 'Expression'], // lol
  [/^ma?cd[aeiou]/, 'LastName'], // macdonell - Last patterns https://en.wikipedia.org/wiki/List_of_family_name_affixes
  // starting-ones
  [/^[0-9][0-9,]*(\.[0-9]+)?$/, 'Cardinal'], // like 5
  [/^(un|de|re)\\-[a-z]../, 'Verb'],
  [/^[\-\+]?[0-9]+(\.[0-9]+)?$/, 'NumericValue'],
  [/^https?\:?\/\/[a-z0-9]/, 'Url'], // the colon is removed in normalisation
  [/^www\.[a-z0-9]/, 'Url'],
  [/^(over|under)[a-z]{2,}/, 'Adjective'],
  // ending-ones
  [/^[0-9]+([a-z]{1,2})$/, 'Value'], // like 5kg
  [/^([0-9][,\.0-9]?)+(st|nd|rd|r?th)$/, ['NumericValue', 'Ordinal']], // like 5th
  // middle (anywhere)
  [/[a-z]*\\-[a-z]*\\-/, 'Adjective']
];
//https://github.com/mathiasbynens/emoji-regex/blob/master/index.js
export const emojiRegexp: RegExp = /(?:0\u20E3\n1\u20E3|2\u20E3|3\u20E3|4\u20E3|5\u20E3|6\u20E3|7\u20E3|8\u20E3|9\u20E3|#\u20E3|\*\u20E3|\uD83C(?:\uDDE6\uD83C(?:\uDDE8|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDEE|\uDDF1|\uDDF2|\uDDF4|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFC|\uDDFD|\uDDFF)|\uDDE7\uD83C(?:\uDDE6|\uDDE7|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDEE|\uDDEF|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFB|\uDDFC|\uDDFE|\uDDFF)|\uDDE8\uD83C(?:\uDDE6|\uDDE8|\uDDE9|\uDDEB|\uDDEC|\uDDED|\uDDEE|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF5|\uDDF7|\uDDFA|\uDDFB|\uDDFC|\uDDFD|\uDDFE|\uDDFF)|\uDDE9\uD83C(?:\uDDEA|\uDDEC|\uDDEF|\uDDF0|\uDDF2|\uDDF4|\uDDFF)|\uDDEA\uD83C(?:\uDDE6|\uDDE8|\uDDEA|\uDDEC|\uDDED|\uDDF7|\uDDF8|\uDDF9|\uDDFA)|\uDDEB\uD83C(?:\uDDEE|\uDDEF|\uDDF0|\uDDF2|\uDDF4|\uDDF7)|\uDDEC\uD83C(?:\uDDE6|\uDDE7|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDEE|\uDDF1|\uDDF2|\uDDF3|\uDDF5|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFC|\uDDFE)|\uDDED\uD83C(?:\uDDF0|\uDDF2|\uDDF3|\uDDF7|\uDDF9|\uDDFA)|\uDDEE\uD83C(?:\uDDE8|\uDDE9|\uDDEA|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF6|\uDDF7|\uDDF8|\uDDF9)|\uDDEF\uD83C(?:\uDDEA|\uDDF2|\uDDF4|\uDDF5)|\uDDF0\uD83C(?:\uDDEA|\uDDEC|\uDDED|\uDDEE|\uDDF2|\uDDF3|\uDDF5|\uDDF7|\uDDFC|\uDDFE|\uDDFF)|\uDDF1\uD83C(?:\uDDE6|\uDDE7|\uDDE8|\uDDEE|\uDDF0|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFB|\uDDFE)|\uDDF2\uD83C(?:\uDDE6|\uDDE8|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF5|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFB|\uDDFC|\uDDFD|\uDDFE|\uDDFF)|\uDDF3\uD83C(?:\uDDE6|\uDDE8|\uDDEA|\uDDEB|\uDDEC|\uDDEE|\uDDF1|\uDDF4|\uDDF5|\uDDF7|\uDDFA|\uDDFF)|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C(?:\uDDE6|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF7|\uDDF8|\uDDF9|\uDDFC|\uDDFE)|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C(?:\uDDEA|\uDDF4|\uDDF8|\uDDFA|\uDDFC)|\uDDF8\uD83C(?:\uDDE6|\uDDE7|\uDDE8|\uDDE9|\uDDEA|\uDDEC|\uDDED|\uDDEE|\uDDEF|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF7|\uDDF8|\uDDF9|\uDDFB|\uDDFD|\uDDFE|\uDDFF)|\uDDF9\uD83C(?:\uDDE6|\uDDE8|\uDDE9|\uDDEB|\uDDEC|\uDDED|\uDDEF|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF7|\uDDF9|\uDDFB|\uDDFC|\uDDFF)|\uDDFA\uD83C(?:\uDDE6|\uDDEC|\uDDF2|\uDDF8|\uDDFE|\uDDFF)|\uDDFB\uD83C(?:\uDDE6|\uDDE8|\uDDEA|\uDDEC|\uDDEE|\uDDF3|\uDDFA)|\uDDFC\uD83C(?:\uDDEB|\uDDF8)|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C(?:\uDDEA|\uDDF9)|\uDDFF\uD83C(?:\uDDE6|\uDDF2|\uDDFC)))|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD79\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED0\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3]|\uD83E[\uDD10-\uDD18\uDD80-\uDD84\uDDC0]/g;
