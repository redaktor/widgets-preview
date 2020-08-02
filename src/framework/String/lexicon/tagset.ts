const C = {
  ADJ: 'Adjective',
  ADV: 'Adverb',
  EXP: 'Expression',
  INF: 'Infinitive',
  PR: 'PresentTense',
  SI: 'Singular',
  PA: 'PastTense',
  PL: 'Plural',
  AC: 'Actor',
  VB: 'Verb',
  NN: 'Noun',
  LN: 'LastName',
  MD: 'Modal',
  CP: 'Copula'
}
export const {ADJ,ADV,EXP,INF,PR,SI,PA,PL,AC,VB,NN,LN,MD,CP} = C;
// used for pretty-printing on the server-side TODO might go to options
const colors: any = {
  Noun: 'blue',
  Date: 'red', Value: 'red',
  Verb: 'green', Auxiliary: 'green', Negative: 'green', VerbPhrase: 'green',
  Preposition: 'cyan', Condition: 'cyan', Conjunction: 'cyan', Determiner: 'cyan',
  Adjective: 'magenta',
  Adverb: 'black'
};
// default tagset
const tags: any = {
  /* nouns */
  Noun: {},
  Singular: {is: "Noun"},
  Person: {is: "Singular"},
  FirstName: {is: "Person"},
  MaleName: {is: "FirstName"},
  FemaleName: {is: "FirstName"},
  LastName: {is: "Person"},
  Honorific: {is: "Person"},
  Place: {is: "Singular"},
  Country: {is: "Place"},
  City: {is: "Place"},
  Region: {is: "Place"},
  Address: {is: "Place"},
  Organization: {is: "Singular"},
  SportsTeam: {is: "Organization"},
  Company: {is: "Organization"},
  School: {is: "Organization"},
  Plural: {is: "Noun"},
  Uncountable: {is: "Noun"}, // (not plural or singular)
  Pronoun: {is: "Noun"},
  Actor: {is: "Noun"},
  Unit: {is: "Noun"},
  Demonym: {is: "Noun"},
  Possessive: {is: "Noun"},
  /* verbs */
  Verb: {is: 'VerbPhrase'},
  PresentTense: {is: 'Verb'},
  Infinitive: {is: 'PresentTense'},
  Gerund: {is: 'PresentTense'},
  PastTense: {is: 'Verb'},
  PerfectTense: {is: 'Verb'},
  FuturePerfect: {is: 'Verb'},
  Pluperfect: {is: 'Verb'},
  Copula: {is: 'Verb'},
  Modal: {is: 'Verb'},
  Participle: {is: 'Verb'},
  Particle: {is: 'Verb'},
  PhrasalVerb: {is: 'Verb'},
  /* values */
  Value: {},
  Money: {},
  Ordinal: {is: 'Value'},
  Cardinal: {is: 'Value'},
  RomanNumeral: {is: 'Cardinal'},
  Fraction: {is: 'Value'},
  TextValue: {is: 'Value'},
  NumericValue: {is: 'Value'},
  NiceNumber: {is: 'Value'},
  Percent: {is: 'Value'},
  /* dates */
  Date: {}, // not a noun, but usually is
  Month: {is: 'Date', also: 'Singular'},
  WeekDay: {is: 'Date', also: 'Noun'},
  RelativeDay: {is: 'Date'},
  Year: {is: 'Date'},
  Duration: {is: 'Date', also: 'Noun'},
  Time: {is: 'Date', also: 'Noun'},
  Holiday: {is: 'Date', also: 'Noun'},
  /* other */
  Adjective: {},
  Comparable: {is: 'Adjective'},
  Comparative: {is: 'Adjective'},
  Superlative: {is: 'Adjective'},
  NumberRange: {is: 'Contraction'},
  Adverb: {},
  Currency: {},
  Abbreviation: {}, // TODO expand, recheck ...
  CommonAbbreviation: {is: 'Abbreviation'},
  Chat: {is: 'Abbreviation'},
  IT: {is: 'Abbreviation'},
	Business: {is: 'Abbreviation'},
  Legal: {is: 'Abbreviation'},
	Photography: {is: 'Abbreviation'},
	Energy: {is: 'Abbreviation'},
  // glue
  AtMention: {is: 'Noun'},
  HashTag: {}, Determiner: {}, Conjunction: {}, Preposition: {}, QuestionWord: {},
  Expression: {}, Url: {}, PhoneNumber: {}, Emoji: {}, Email: {},
  // non-exclusive
  Condition: {}, VerbPhrase: {}, Auxiliary: {}, Negative: {}, Contraction: {},
  TitleCase: {}, CamelCase: {}, UpperCase: {}, Hyphenated: {}, Acronym: {},
  ClauseEnd: {}, Quotation: {}
}
const conflicts: any = [
  // top-level pos are all inconsistent
  ['Noun', 'Verb', 'Adjective', 'Adverb', 'Determiner', 'Conjunction', 'Preposition',
    'QuestionWord', 'Expression', 'Url', 'PhoneNumber', 'Email', 'Emoji'],
  // exlusive-nouns
  ['Person', 'Organization', 'Value', 'Place', 'Actor', 'Demonym', 'Pronoun'],
  // things that can't be plural
  ['Plural', 'Singular'],
  /* ['Plural', 'Pronoun'], ['Plural', 'Person'], ['Plural', 'Organization'],
  // ['Plural', 'Currency'], ['Plural', 'Ordinal'], */
  // exlusive-people
  ['MaleName', 'FemaleName'],
  ['FirstName', 'LastName', 'Honorific'],
  // adjectives
  ['Comparative', 'Superlative'],
  // values
  ['Value', 'Verb', 'Adjective'],
  // ['Value', 'Year'],
  ['Ordinal', 'Cardinal'],
  ['TextValue', 'NumericValue'],
  ['NiceNumber', 'TextValue'],
  ['Ordinal', 'Currency'], // $5.50th
  // verbs
  ['PastTense', 'PresentTense', 'FutureTense'],
  ['Pluperfect', 'Copula', 'Modal', 'Participle', 'Infinitive', 'Gerund', 'FuturePerfect', 'PerfectTense'],
  ['Auxiliary', 'Noun', 'Value'],
  // date
  ['Month', 'WeekDay', 'Year', 'Duration', 'Holiday'],
  ['Particle', 'Conjunction', 'Adverb', 'Preposition'],
  ['Date', 'Verb', 'Adjective', 'Person'],
  ['Date', 'Money', 'RomanNumeral', 'Fraction'],
  // a/an -> 1
  ['Value', 'Determiner'],
  ['Url', 'Value', 'HashTag', 'PhoneNumber', 'Emoji'],
  // roman numerals
  ['RomanNumeral', 'Fraction', 'NiceNumber'],
  ['RomanNumeral', 'Money'],
  // cases
  ['UpperCase', 'TitleCase', 'CamelCase'],
  // phrases
  ['VerbPhrase', 'Noun', 'Adjective']
];

// add 'downward' tags (that immediately depend on this one)
const addChildren = function(tags: any) {
  const keys = Object.keys(tags);
  keys.forEach((k) => {
    tags[k].downward = [];
    // look for tags with this as parent
    for(let i = 0; i < keys.length; i++) {
      if (tags[keys[i]].is && tags[keys[i]].is === k) {
        tags[k].downward.push(keys[i]);
      }
    }
  });
};
// add tags to remove when tagging this one
function addConflicts(tags: any) {
  Object.keys(tags).forEach((k) => {
    tags[k].enemy = {};
    for(let i = 0; i < conflicts.length; i++) {
      let arr = conflicts[i];
      if (arr.indexOf(k) !== -1) {
        arr = arr.filter((a: any) => a !== k).forEach((e: any) => { tags[k].enemy[e] = true });
      }
    }
    tags[k].enemy = Object.keys(tags[k].enemy);
  });
};
// add colors to tags
function addColors(tags: any) {
  Object.keys(tags).forEach((k) => {
    if (colors[k]) {
      tags[k].color = colors[k];
      return;
    }
    if (tags[k].is && colors[tags[k].is]) {
      tags[k].color = colors[tags[k].is];
      return;
    }
    if (tags[k].is && tags[tags[k].is].color) {
      tags[k].color = tags[tags[k].is].color;
    }
  });
};

// downstream
addChildren(tags);
// add enemies
addConflicts(tags);
// for nice-logging
addColors(tags);
export default tags;
