import { VerbTerms, NounTerms } from '../main';
import convert from '../lang/en/convert';

// inflect 'Singulars', conjugate 'Infinitives', and convert 'Comparables'
export function build(lex: any, options: any = {}) {
  // handle default options
  options = options || {};
  lexiLoop: /* loops through each word in lexicon */
  for (let s in lex) {
    // conjugate infinitive Verbs
    if (!!options.conjugate && lex[s] === 'Infinitive') {
      const V = VerbTerms.fromString(s);
      const o = V.fastConjugate(s);
      for (let t in o) {
        if (lex[o[t]] === void 0) {
          lex[o[t]] = t;
          continue lexiLoop;
        }
      }
    }
    // inflect singular nouns
    if (!!options.inflect && lex[s] === 'Singular') {
      const N = NounTerms.fromString(s);
      let plural = N.toPlural(s).out();
      lex[plural] = 'Plural';
      continue lexiLoop;
    }
    // conjugate comparable adjectives
    if (lex[s] === 'Comparable') {
      ['Comparative', 'Superlative', 'Noun', 'Adverb'].forEach((type: string) => {
        let w = convert(s, 'Adjective', type);
        if (lex[w] === void 0) { lex[w] = type }
      });
      // lex[adj.toVerb(s)] = 'Verb';
      continue lexiLoop;
    }
    /* conjugate phrasal verbs too
    if (lex[s] === 'PhrasalVerb') {
      let parts = s.split(/ /); const obj = fastConjugate(parts[0]);
      for (let tag in obj) { lex[obj[tag] + ' ' + parts[1]] = 'PhrasalVerb' }
      continue;
    } */
  }
  // ..just in case
  delete lex[''];
  return lex;
};
// collect the first-words of multiple-word-terms, for quicker lookup
export function firstWords(lex: any) {
  let firstWords: any = {};
  let keys = Object.keys(lex);
  const hasSpace = / /;
  for (let i = 0; i < keys.length; i++) {
    if (hasSpace.test(keys[i]) === true) {
      let words = keys[i].split(/ /g);
      firstWords[words[0]] = firstWords[words[0]] || [];
      let str = words.slice(1).join(' ');
      firstWords[words[0]][str] = true;
    }
  }
  return firstWords;
};
