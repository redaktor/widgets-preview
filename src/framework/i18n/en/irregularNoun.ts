/* NOUNS
 nouns with irregular plural/singular forms
*/
const irregulars: any = {
  addendum:'addenda',alga:'algae',alumna:'alumnae',alumnus:'alumni',
  appendix:'appendices',avocado:'avocados',bacillus:'bacilli',barracks:'barracks',
  beau:'beaux',cactus:'cacti',chateau:'chateaux',child:'children',château:'châteaux',
  corpus:'corpora',criterion:'criteria',curriculum:'curricula',database:'databases',
  deer:'deer',echo:'echoes',embargo:'embargoes',epoch:'epochs',foot:'feet',
  genus:'genera',goose:'geese',halo:'halos',hippopotamus:'hippopotami',index:'indices',
  larva:'larvae',leaf:'leaves',libretto:'libretti',loaf:'loaves',man:'men',
  matrix:'matrices',memorandum:'memoranda',modulus:'moduli',mosquito:'mosquitoes',
  move:'moves',opus:'opera',ovum:'ova',ox:'oxen',person:'people',phenomenon:'phenomena',
  quiz:'quizzes',radius:'radii',referendum:'referenda',rodeo:'rodeos',sex:'sexes',
  shoe:'shoes',sombrero:'sombreros',stomach:'stomachs',syllabus:'syllabi',
  tableau:'tableaux',thief:'thieves',tooth:'teeth',tornado:'tornados',tuxedo:'tuxedos',
  zero:'zeros'
}
// patterns for turning 'bus' to 'buses'
const pluralRules = [
  [/(ax|test)is$/i, '$1es'], [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, '$1i'],
  [/(octop|vir)i$/i, '$1i'], [/(alias|status)$/i, '$1es'], [/(bu)s$/i, '$1ses'],
  [/(al|ad|at|er|et|ed|ad)o$/i, '$1oes'], [/([ti])um$/i, '$1a'], [/([ti])a$/i, '$1a'],
  [/sis$/i, 'ses'], [/(hive)$/i, '$1s'], [/([^aeiouy]|qu)y$/i, '$1ies'],
  [/(x|ch|ss|sh|s|z)$/i, '$1es'], [/(matr|vert|ind|cort)(ix|ex)$/i, '$1ices'],
  [/([ml])ouse$/i, '$1ice'], [/([ml])ice$/i, '$1ice'],
  [/(antenn|formul|nebul|vertebr|vit)a$/i, '$1ae'],
  [/(sis)$/i, 'ses'], [/^(?!talis|.*hu)(.*)man$/i, '$1men'], [/(kn|l|w)ife$/i, '$1ives'],
  [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)f$/i, '$1ves'],
  [/^(dwar|handkerchie|hoo|scar|whar)f$/i, '$1ves'], [/^(ox)$/i, '$1en'],
  [/^(oxen)$/i, '$1'], [/(quiz)$/i, '$1zes'], [/(.*)/i, '$1s']
];
// patterns for turning 'dwarves' to 'dwarf'
const singularRules = [
  [/(^v)ies$/i, '$1y'], [/ises$/i, 'isis'], [/(kn|[^o]l|w)ives$/i, '$1ife'],
  [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)ves$/i, '$1f'],
  [/^(dwar|handkerchie|hoo|scar|whar)ves$/i, '$1f'],
  [/(antenn|formul|nebul|vertebr|vit)ae$/i, '$1a'],
  [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, '$1us'],
  [/(buffal|tomat|tornad)(oes)$/i, '$1o'],
  [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1sis'],
  [/(vert|ind|cort)(ices)$/i, '$1ex'], [/(matr|append)(ices)$/i, '$1ix'],
  [/(x|ch|ss|sh|s|z|o)es$/i, '$1'], [/men$/i, 'man'], [/(n)ews$/i, '$1ews'],
  [/([ti])a$/i, '$1um'], [/([^aeiouy]|qu)ies$/i, '$1y'], [/(s)eries$/i, '$1eries'],
  [/(m)ovies$/i, '$1ovie'], [/([m|l])ice$/i, '$1ouse'], [/(cris|ax|test)es$/i, '$1is'],
  [/(alias|status)es$/i, '$1'], [/(ss)$/i, '$1'], [/(ics)$/i, '$1'], [/s$/i, '']
];

const Noun: any = {
  irregulars, singularRules, pluralRules,
  pluralIndicators: singularRules.map((a) => a[0]).concat([
    /ives$/i, /(^f)ves$/i, /(lr)ves$/i
  ]),
  singularIndicators: pluralRules.map((a) => a[0]).concat([
    /(rl)f$/i, /(?:(^f)fe|(lr)f)$/i
  ]),
  knownPlural: { i:1, he:1, she:1, we:1, they:1 },
  prep: /([a-z]*) (of|in|by|for) [a-z]/,
  prepStart: /^([a-z]*) (of|in|by|for) [a-z]/,
  isPluralFallback: (s: string) => (s.length > 3 && !/s$/.test(s) === true && /ss$/.test(s)),
  makeArticle: (t: any) => {
    // chooses an indefinite aricle 'a/an' for a word
    const irregArticle: any = {
      hour:'an', heir:'an', heirloom:'an', honest:'an', honour:'an', honor:'an', uber:'an'
    };
    // pronounced letters of acronyms that get a 'an'
    const anAcronyms = { a:1, e:1, f:1, h:1, i:1, l:1, m:1, n:1, o:1, r:1, s:1, x:1 };
    //'a' regexes
    const aRegexps = [ /^onc?e/i, /^u[bcfhjkqrstn][aeiou]/i, /^eul/i ];
    let s = t.normal;
    // explicit irregular forms
    if (irregArticle.hasOwnProperty(s)) { return irregArticle[s] }
    // spelled-out acronyms
    if (t.isAcronym && anAcronyms.hasOwnProperty(s.substr(0, 1))) { return 'an' }
    //'a' regexes
    for (let i = 0; i < aRegexps.length; i++) { if (aRegexps[i].test(s)) { return 'a' } }
    // basic vowel-startings
    return /^[aeiou]/i.test(s) ? 'an' : 'a';
  },
  lexicon: {},
  toSingle: {},
  toPlural: {}
};
for (let k in Noun.irregulars) {
  Noun.lexicon[k] = 'Singular';
  Noun.lexicon[Noun.irregulars[k]] = 'Plural';
  Noun.toSingle[Noun.irregulars[k]] = k;
  Noun.toPlural[k] = Noun.irregulars[k];
}

export default Noun;
