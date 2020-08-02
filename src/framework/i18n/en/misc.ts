import {ADJ,ADV,EXP,INF,PR,SI,PA,PL,AC,VB,NN,LN,MD,CP} from '../../lexicon/tagset';

/* TODO what is NOT "rule" might go elsewhere OR RENAME */

export const notWords: any = {'not':1};
export const ofWords: any = {'of':1};

// nouns that also signal the title of an unknown organization
// todo remove/normalize plural forms
export const orgWords: string[] = [
  'administration', 'agence', 'agences', 'agencies', 'agency', 'aircraft', 'airlines',
  'airways', 'army', 'assoc', 'associates', 'association', 'assurance', 'authority',
  'autorite', 'aviation', 'bank', 'banque', 'board', 'boys', 'brands', 'brewery',
  'brotherhood', 'brothers', 'building society', 'bureau', 'cafe', 'caisse', 'capital',
  'care', 'cathedral', 'center', 'central bank', 'centre', 'chemicals', 'choir',
  'chronicle', 'church', 'circus', 'clinic', 'clinique', 'club', 'co', 'coalition',
  'coffee', 'collective', 'college', 'commission', 'committee', 'communications',
  'community', 'company', 'comprehensive', 'computers', 'confederation', 'conference',
  'conseil', 'consulting', 'containers', 'corporation', 'corps', 'council', 'crew',
  'daily news', 'data', 'departement', 'department', 'department store', 'departments',
  'design', 'development', 'directorate', 'division', 'drilling', 'education', 'eglise',
  'electric', 'electricity', 'energy', 'ensemble', 'enterprise', 'enterprises',
  'entertainment', 'estate', 'etat', 'evening news', 'faculty', 'federation', 'financial',
  'fm', 'foundation', 'fund', 'gas', 'gazette', 'girls', 'government', 'group', 'guild',
  'health authority', 'herald', 'holdings', 'hospital', 'hotel', 'hotels', 'inc',
  'industries', 'institut', 'institute', 'institute of technology', 'institutes',
  'insurance', 'international', 'interstate', 'investment', 'investments', 'investors',
  'journal', 'laboratory', 'labs', /* 'law',*/'liberation army', 'limited',
  'local authority', 'local health authority', 'machines', 'magazine', 'management',
  'marine', 'marketing', 'markets', 'media', 'memorial', 'mercantile exchange', 'ministere',
  'ministry', 'military', 'mobile', 'motor', 'motors', 'musee', 'museum', /* 'network',*/
  'news', 'news service', 'observatory', 'office', 'oil', 'optical', 'orchestra',
  'organization', 'partners', 'partnership', /* 'party',*/"people's party", 'petrol',
  'petroleum', 'pharmacare', 'pharmaceutical', 'pharmaceuticals', 'pizza', 'plc',
  'police', 'polytechnic', 'post', 'power', 'press', 'productions', 'quartet', 'radio',
  'regional authority', 'regional health authority', 'reserve', 'resources', 'restaurant',
  'restaurants', 'savings', 'school', 'securities', 'service', 'services', 'social club',
  'societe', 'society', 'sons', 'standard', 'state police', 'state university',
  'stock exchange', 'subcommittee', 'syndicat', 'systems', 'telecommunications',
  'telegraph', 'television', 'times', 'tribunal', 'tv', 'union', 'university',
  'utilities', 'workers'
].reduce(function(h: any, k: string) { h[k] = 'Noun'; return h; }, {});

/* markov-like stats about co-occurance, for hints about unknown terms
// basically, a little-bit better than the noun-fallback
// just top n-grams from nlp tags, generated from nlp-corpus, usually : */
export const nGrams: any = {
  afterWord: {
    i: VB, first: NN, it: VB, there: VB, not: VB, because: NN, if: NN, but: NN, who: VB,
    this: NN, his: NN, when: NN, you: VB, very: ADJ, old: NN, never: VB, before: NN // to: VB,
  },
  beforeWord: {
    there: VB, me: VB, man: ADJ, only: VB, him: VB, were: NN, what: VB, took: NN,
    himself: VB, went: NN, who: NN, jr: 'Person'
  },
  afterPOS: {
    Adjective: NN, Possessive: NN, Determiner: NN, Adverb: VB, Pronoun: VB, Value: NN,
    Ordinal: NN, Modal: VB, Superlative: NN, Demonym: NN, Organization: VB,
    Honorific: 'Person' // Person: VB, FirstName: 'Person'
  },
  beforePOS: {
    Copula: NN, PastTense: NN, Conjunction: NN, Modal: NN, PluperfectTense: NN,
    PerfectTense: VB // LastName: 'FirstName'
  }
}

// Questions - unterminated / informal
const blabla = '(#Conjunction|#Preposition|#Adverb)?';
const allQW = (qw?: string | boolean) => {
  return (typeof qw === 'string') ? `${qw}${qw}'s|${qw}'re|${qw}'d|${qw}'ll` :
    (`#QuestionWord #Contraction${(qw === true) ? '' : '?'}`);
}
export const informalQuestions = [
  // very primitive (chats)
  (`${allQW('who')} (#Person+|#Organization+|#AtMention+)`),
  (`${allQW('where')} (#Person+|#Place+|#Organization+)$`),
  (`${allQW('when')} (#Date|#Pronoun+|#Noun+|#Singular+|#Plural+)$`),
  // which
  (`^${blabla} (what|which) #Noun`),
  // how
  (`^${blabla} ${allQW('how')} (#Adjective|#Copula|#Modal|#PastTense)`),
  // all WH
  (`${allQW()} #Modal`),
  (`${allQW()} (#Pronoun|#Noun|#Singular|#Plural|#Gerund)$`),
  (`${allQW()} (#Copula|#Gerund) * !#Infinitive`),
  // other
  (`^${blabla} ${allQW(true)} #Modal? #Pronoun #Verb+`),
  (`^${blabla} (#Modal|#PresentTense|#PastTense) #Determiner? #Adjective?
    (#Copula|#Pronoun|#Noun|#Singular|#Plural|#Gerund) * !#Infinitive$`),
  (`^${blabla} ${allQW()} #VerbPhrase #Determiner? #Adjective?
    #Noun+? #VerbPhrase * !#Infinitive$`),
  (`^${blabla} (#Adverb|#Pronoun) (#Modal|#PresentTense|#PastTense) * !#Infinitive$`)
];
