import unpack from '../../../efrt/unpack';
import lexiconCompressed from './_compressed';
import { build, firstWords } from '../../lexicon/_build';
import abbreviations, { exclamations, periodPrefixes } from './abbreviation';
import contraction, {
  findContraction,silentTerms,split,contractionTags,contractionNeg,contractionPos
} from './contraction';
import number from './number';
import date, { dates } from './date';
import { noun, verb, adjective } from './irregular';
import { nGrams, notWords, ofWords, orgWords } from './misc';
import corrections from './corrections';
import possessive from './possessive';
import condition from './condition';
import convert from './convert';

/* TODO words without vowels

brr, brrr, bzzt, crwth, crwths, cwm, cwms, cwtch, grrr, hm, hmm, mm, mmm, mhmm,
ng, nth, pfft, phpht, pht, psst, rng, sh, shh, tsk, tsks, tsktsk, tsktsks, zzz


and
she's
*/

const zip: any = {
  noun: 'ave|blvd|uss|ss|arc|al|cl|ct|cres|exprd|st|dist|mt|fy|hwy|pd|pl|plz|tce|llb|'+
    'mdbl|ma|ba|lit|ala|ariz|ark|cal|calif|colo|conn|del|fed|fl|fla|ga|ida|ind|ia|'+
    'kan|kans|ken|ky|la|md|mich|minn|mont|neb|nebr|nev|okla|penna|penn|pa|dak|tenn|'+
    'tex|ut|vt|va|wash|wis|wisc|wy|wyo|usafa|alta|ont|que|sask|yuk|dept|univ|'+
    'assn|bros|inc|ltd|co|google|yahoo|joomla|jeopardy|no doubt',
  Singular: 'game|team|band|state|ocean|rate|show|medium|color|rum|flavor|flavour|'+
    'address|equivalent|religion|dummy|blush|work|way|approach|kind|animal',
  Plural: 'films|schools|chemicals|articles|countries|children|approaches',
  Comparative: 'better|earlier',
  Superlative: 'best|earliest|largest',
  PresentTense: 'sounds',
  Value: 'a few',
  Organization: '20th century fox|3m|7-eleven|g8|g12|g20|motel 6|'+
    'vh1|formula1|formule1|bad religion|nine inch nails',
  // TODO organizations TREE for worldwide most well known orgs !
  // organization
  // sport
  // religion
  // creative
  Copula: 'is|are|was|were|am',
  Date: 'eom|standard time|daylight time|today|tomorrow|yesterday',
  Condition: 'if|unless|notwithstanding',
  PastTense: 'said|had|been|began|came|did|meant|went|taken',
  Gerund: 'going|being|according|resulting|developing|staining',
  Negative: 'not|non|never|no',
  // questions are awkward pos. are clarified in question_pass
  QuestionWord: 'where|why|when|who|whom|whose|what|which'+"how's",
  abbreviations
}
const lexiconStd: any = {};
for (let k in zip) {
  const a: string[] = zip[k].split('|');
  for (let i = 0; i < a.length; i++) { lexiconStd[a[i]] = k }
}

let lexicon: any = { ...lexiconStd, ...unpack(lexiconCompressed) }

const addToLex = function(o: any) { // TODO what if not undefined ...
  for (let k in o) { if (lexicon[k] === void 0) { lexicon[k] = o[k] } }
} // (order matters) :
const ls = [noun.lexicon,verb.lexicon,adjective.lexicon,orgWords,number.lexicon];
ls.forEach((o: any) => addToLex(o));

/* TODO FIXME BUILD :: */
lexicon = build(lexicon);

lexicon.is = ['Copula', 'PresentTense'];
lexicon.are = ['Copula', 'PresentTense'];
lexicon.was = ['Copula', 'PastTense'];
lexicon['will be'] = ['Copula', 'FutureTense'];
lexicon['close'] = 'Adjective';
lexicon['can'] = 'Modal';

export default {
  lexicon, firstWords: firstWords(lexicon),
  periodSuffix: new RegExp(String.raw`\b(${abbreviations})[.] ?$`, 'i'),
  exclamation: new RegExp(String.raw`\b(${exclamations})[!] ?$`, 'i'),
  periodPrefix: new RegExp(String.raw`[.](${periodPrefixes})\b$`, 'i'),
  convert, contraction, findContraction, dates, abbreviations,
  noun, verb, adjective, number, date, notWords, ofWords, orgWords, nGrams,
  silentTerms, split, contractionTags, contractionNeg, contractionPos,
  corrections, possessive, condition
};
