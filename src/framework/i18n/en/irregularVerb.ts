/* VERBS */
const conjugations: any = {
  Participle: [[/own$/i, 'ow'], [/(.)un([g|k])$/i, '$1in$2']],
  Actor: [[/(er)er$/i, '$1']],
  PresentTense: [[/(..)(ies)$/i, '$1y'], [/(tch|sh)es$/i,'$1'], [/(ss|zz)es$/i,'$1'],
    [/([tzlshicgrvdnkmu])es$/i,'$1e'], [/(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$/i,'$1'],
    [/(ow)s$/i,'$1'], [/(op)s$/i,'$1'], [/([eirs])ts$/i,'$1t'], [/(ll)s$/i,'$1'],
    [/(el)s$/i,'$1'], [/(ip)es$/i,'$1e'], [/ss$/i,'ss'], [/s$/i,'']],
  Gerund: [[/pping$/i,'p'], [/lling$/i,'ll'], [/tting$/i,'t'], [/dding$/i,'d'],
    [/ssing$/i,'ss'], [/(..)gging$/i,'$1g'], [/([^aeiou])ying$/i,'$1y'],
    [/([^ae]i.)ing$/i,'$1e'], [/(ea.)ing$/i,'$1'],
    [/(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$/i,'$1e'],
    [/(ch|sh)ing$/i,'$1'], [/(..)ing$/i,'$1']],
  PastTense: [[/(ued)$/i,'ue'], [/a([^aeiouy])ed$/i,'a$1e'], [/([aeiou]zz)ed$/i,'$1'],
    [/(e|i)lled$/i,'$1ll'], [/(.)(sh|ch)ed$/i,'$1$2'], [/(tl|gl)ed$/i,'$1e'],
    [/(um?pt?)ed$/i,'$1'], [/(ss)ed$/i,'$1'], [/pped$/i,'p'], [/tted$/i,'t'],
    [/(..)gged$/i,'$1g'], [/(..)lked$/i,'$1lk'], [/([^aeiouy][aeiou])ked$/i,'$1ke'],
    [/(.[aeiou])led$/i,'$1l'],
    [/(..)(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$/i,'$1$2'],
    [/(.ut)ed$/i,'$1e'], [/(us)ed$/i,'$1e'], [/(..[^aeiouy])ed$/i,'$1e'],
    [/(..)ied$/i,'$1y'], [/(.o)ed$/i,'$1o'], [/(..i)ed$/i,'$1'], [/(.a[^aeiou])ed$/i,'$1'],
    [/([rl])ew$/i,'$1ow'], [/([pl])t$/i,'$1t']]
}
const suffixes: any = [
  [/(eave)$/i, { pr: '$1s', ps: '$1d', g: 'eaving', ar: '$1r' }],
  [/(ink)$/i, { pr: '$1s', ps: 'unk', g: '$1ing', ar: '$1er' }],
  [/(end)$/i, { pr: '$1s', ps: 'ent', g: '$1ing', ar: '$1er' }],
  [/(ide)$/i, { pr: '$1s', ps: 'ode', g: 'iding', ar: 'ider' }],
  [/(ake)$/i, { pr: '$1s', ps: 'ook', g: 'aking', ar: '$1r' }],
  [/(eed)$/i, { pr: '$1s', ps: '$1ed', g: '$1ing', ar: '$1er' }],
  [/(e)(ep)$/i, { pr: '$1$2s', ps: '$1pt', g: '$1$2ing', ar: '$1$2er' }],
  [/(a[tg]|i[zn]|ur|nc|gl|is)e$/i, {pr:'$1es', ps:'$1ed', g:'$1ing', pa:'$1en'}],
  [/([i|f|rr])y$/i, { pr: '$1ies', ps: '$1ied', g: '$1ying' }],
  [/([td]er)$/i, { pr: '$1s', ps: '$1ed', g: '$1ing' }],
  [/([bd]l)e$/i, { pr: '$1es', ps: '$1ed', g: '$1ing' }],
  [/(ish|tch|ess)$/i, { pr: '$1es', ps: '$1ed', g: '$1ing' }],
  [/(ion|end|e[nc]t)$/i, { pr: '$1s', ps: '$1ed', g: '$1ing' }],
  [/(om)e$/i, { pr: '$1es', ps: 'ame', g: '$1ing' }],
  [/([aeiu])([pt])$/i, { pr: '$1$2s', ps: '$1$2', g: '$1$2$2ing' }],
  [/(er)$/i, { pr: '$1s', ps: '$1ed', g: '$1ing' }],
  [/(en)$/i, { pr: '$1s', ps: '$1ed', g: '$1ing' }],
  [/(ed)$/i, { pr: '$1s', ps: '$1ded', ar: '$1der', g: '$1ding' }],
  [/(..)(ow)$/i, { pr: '$1$2s', ps: '$1ew', g: '$1$2ing', pa: '$1$2n' }],
  [/(..)([cs]h)$/i, { pr: '$1$2es', ps: '$1$2ed', g: '$1$2ing' }],
  [/([^aeiou][ou])(g|d)$/i, { pr: '$1$2s', ps: '$1$2$2ed', g: '$1$2$2ing' }],
  [/([^aeiou][aeiou])(b|t|p|m)$/i, {pr:'$1$2s', ps:'$1$2$2ed', g:'$1$2$2ing'}],
  [/([aeiou]zz)$/i, { pr: '$1es', ps: '$1ed', g: '$1ing' }]
];

const Verb: any = {
  conjugations, suffixes,
  aux: (ts: any) => {
    if (!ts.auxiliary.found) { return null }
    if (ts.match('will have #PastTense').found) { return 'Past' }
    if (ts.auxiliary.match('will').found) { return 'Future' }
    if (ts.auxiliary.match('was').found) { return 'Past' }
  },
  // been walked by..
  isPassive: (ts: any) => {
    if (ts.match('is being #PastTense').found ||
      ts.match('(had|has) been #PastTense').found) { return true }
    return ts.match('will have been #PastTense').found;
  },
  // had walked
  isPerfect: (ts: any) => ts.match('^(had|have) #PastTense'),
  /* TODO FIXME */
  isImperative: (ts: any) => ts,
  isConditional: (ts: any) => ts,
  toBe: (isPlural: boolean = false, isNegative: boolean = false) => {
    let o: any = {
      Infinitive:(isPlural ? 'are' : 'is'), PastTense:(isPlural ? 'were' : 'was'),
      PresentTense:(isPlural ? 'are' : 'is'), FutureTense:'will be',
      Gerund:'being', Actor:'', PerfectTense:'been', Pluperfect:'been'
    };
    if (isNegative) {
      ['PastTense','PresentTense','Infinitive'].forEach((k) => {o[k] += ' not'});
      ['PerfectTense','Pluperfect'].forEach((k) => {o[k] = `not ${o[k]}`});
      o.FutureTense = 'will not be';
    }
    return o;
  },
  findBe: (vb: any) => {
    return (vb.verb.tags.Copula||(vb.verb.normal === 'be' && vb.auxiliary.match('will').found))
  },
  correctConjugate: (o: any, isNegative: boolean = false) => {
    // apply negative
    if (isNegative) {
      o.PastTense = `did not ${o.Infinitive}`;
      o.PresentTense = `does not ${o.Infinitive}`;
    }
    // future tense is pretty straightforward
    if (!o.FutureTense) {
      const n = isNegative ? 'not ' : '';
      o.FutureTense = `will ${n}${o.Infinitive}`;
    }
  },
  be: ['be','is','was','will'],
  auxiliary: {
    "do":1, "don't":1, "does":1, "doesn't":1, "will":1, "wont":1, "won't": 1,
    "have":1, "haven't":1, "had":1, "hadn't":1, "not": 1
  },
  toAdjective: {
    eat:'edible',hear:'audible',see:'visible',defend:'defensible',write:'legible',
    move:'movable',divide:'divisible',perceive:'perceptible'
  },
  toActor: {
    tie:'tier', dream:'dreamer', sail:'sailer', run:'runner', rub:'rubber',
    begin:'beginner', win:'winner', claim:'claimant', deal:'dealer', spin:'spinner'
  },
  suffix: {
    collect:1,exhaust:1,convert:1,digest:1,discern:1,dismiss:1,reverse:1,
    access:1,collapse:1,express:1
  },
  conjugate: {
    take: { pe: 'have taken', pl: 'had taken', ft: 'will have taken' },
    can: { g:'', pr:'can', ps:'could', pe:'could', pl:'could', ft:'can', ac:'' },
    free: { g: 'freeing', ac: '' },
    puke: { g: 'puking' },
    arise: { ps: 'arose', pa: 'arisen' },
    babysit: { ps: 'babysat', ac: 'babysitter' },
    be: { ps: 'was', pa: 'been', pr: 'is', ac: '', g: 'am' },
    is: { ps: 'was', pr: 'is', ac: '', g: 'being' },
    beat: { g: 'beating', ac: 'beater', pa: 'beaten' },
    begin: { g: 'beginning', ps: 'began', pa: 'begun' },
    ban: { ps: 'banned', g: 'banning', ac: '' },
    bet: { ac: 'better', pa: 'bet' },
    bite: { g: 'biting', ps: 'bit', pa: 'bitten' },
    bleed: { ps: 'bled', pa: 'bled' },
    breed: { ps: 'bred' },
    bring: { ps: 'brought', pa: 'brought' },
    broadcast: { ps: 'broadcast' },
    build: { ps: 'built', pa: 'built' },
    buy: { ps: 'bought', pa: 'bought' },
    choose: { g: 'choosing', ps: 'chose', pa: 'chosen' },
    cost: { ps: 'cost' },
    deal: { ps: 'dealt', pa: 'dealt' },
    die: { ps: 'died', g: 'dying' },
    dig: { g: 'digging', ps: 'dug', pa: 'dug' },
    draw: { ps: 'drew', pa: 'drawn' },
    drink: { ps: 'drank', pa: 'drunk' },
    drive: { g: 'driving', ps: 'drove', pa: 'driven' },
    eat: { g: 'eating', ps: 'ate', ac: 'eater', pa: 'eaten' },
    edit: { g: 'editing' },
    fall: { ps: 'fell', pa: 'fallen' },
    feed: { ps: 'fed', pa: 'fed' },
    feel: { ps: 'felt', ac: 'feeler' },
    fight: { ps: 'fought', pa: 'fought' },
    find: { ps: 'found' },
    fly: { ps: 'flew', pa: 'flown' },
    blow: { ps: 'blew', pa: 'blown' },
    forbid: { ps: 'forbade' },
    forget: { g: 'forgeting', ps: 'forgot', pa: 'forgotten' },
    forgive: { g: 'forgiving', ps: 'forgave', pa: 'forgiven' },
    freeze: { g: 'freezing', ps: 'froze', pa: 'frozen' },
    get: { ps: 'got' },
    give: { g: 'giving', ps: 'gave', pa: 'given' },
    go: { ps: 'went', pr: 'goes', pa: 'gone' },
    hang: { ps: 'hung', pa: 'hung' },
    have: { g: 'having', ps: 'had', pr: 'has', pa: 'had' },
    hear: { ps: 'heard', pa: 'heard' },
    hide: { ps: 'hid', pa: 'hidden' },
    hold: { ps: 'held', pa: 'held' },
    hurt: { ps: 'hurt', pa: 'hurt' },
    lay: { ps: 'laid', pa: 'laid' },
    lead: { ps: 'led', pa: 'led' },
    leave: { ps: 'left', pa: 'left' },
    lie: { g: 'lying', ps: 'lay' },
    light: { ps: 'lit', pa: 'lit' },
    lose: { g: 'losing', ps: 'lost' },
    make: { ps: 'made', pa: 'made' },
    mean: { ps: 'meant', pa: 'meant' },
    meet: { g: 'meeting', ps: 'met', ac: 'meeter', pa: 'met' },
    pay: { ps: 'paid', pa: 'paid' },
    read: { ps: 'read', pa: 'read' },
    ring: { ps: 'rang', pa: 'rung' },
    rise: { ps:'rose', g:'rising', pl:'had risen', ft:'will have risen', pa:'risen' },
    run: { g: 'running', ps: 'ran', pa: 'run' },
    say: { ps: 'said', pa: 'said', pr: 'says' },
    see: { ps: 'saw', pa: 'seen' },
    sell: { ps: 'sold', pa: 'sold' },
    shine: { ps: 'shone', pa: 'shone' },
    shoot: { ps: 'shot', pa: 'shot' },
    show: { ps: 'showed' },
    sing: { ps: 'sang', pa: 'sung' },
    sink: { ps: 'sank', pl: 'had sunk' },
    sit: { ps: 'sat' },
    slide: { ps: 'slid', pa: 'slid' },
    speak: {ps:'spoke',pe:'have spoken',pl:'had spoken',ft:'will have spoken',pa:'spoken'},
    spin: { g: 'spinning', ps: 'spun', pa: 'spun' },
    stand: { ps: 'stood' },
    steal: { ps: 'stole', ac: 'stealer' },
    stick: { ps: 'stuck' },
    sting: { ps: 'stung' },
    stream: { ac: 'streamer' },
    strike: { g: 'striking', ps: 'struck' },
    swear: { ps: 'swore' },
    swim: { ps: 'swam', g: 'swimming' },
    swing: { ps: 'swung' },
    teach: { ps: 'taught', pr: 'teaches' },
    tear: { ps: 'tore' },
    tell: { ps: 'told' },
    think: { ps: 'thought' },
    understand: { ps: 'understood' },
    wake: { ps: 'woke' },
    wear: { ps: 'wore' },
    win: { g: 'winning', ps: 'won' },
    withdraw: { ps: 'withdrew' },
    write: { g: 'writing', ps: 'wrote', pa: 'written' },
    tie: { g: 'tying', ps: 'tied' },
    ski: { ps: 'skiied' },
    boil: { ac: 'boiler' },
    miss: { pr: 'miss' },
    act: { ac: 'ac' },
    compete: { g: 'competing', ps: 'competed', ac: 'competitor' },
    being: { g: 'are', ps: 'were', pr: 'are' },
    imply: { ps: 'implied', pr: 'implies' },
    ice: { g: 'icing', ps: 'iced' },
    develop: { ps: 'developed', ac: 'developer', g: 'developing' },
    wait: { g: 'waiting', ps: 'waited', ac: 'waiter' },
    aim: { ac: 'aimer', g: 'aiming', ps: 'aimed' },
    spill: { ps: 'spilt', pa: 'spilled' },
    drop: { g: 'dropping', ps: 'dropped' },
    log: { g: 'logging', ps: 'logged' },
    rub: { g: 'rubbing', ps: 'rubbed' },
    smash: { pr: 'smashes' },
    egg: { ps: 'egged' },
    suit: { g: 'suiting', ps: 'suited', ac: 'suiter' },
    age: { pr: 'ages', ps: 'aged', g: 'ageing' },
    shed: { pr: 'sheds', ps: 'shed', g: 'shedding' },
    break: { ps: 'broke' },
    catch: { ps: 'caught' },
    do: { ps: 'did', pr: 'does' },
    bind: { ps: 'bound' },
    spread: { ps: 'spread' },
    become: { pa: 'become' },
    bend: { pa: 'bent' },
    brake: { pa: 'broken' },
    burn: { pa: 'burned' },
    burst: { pa: 'burst' },
    cling: { pa: 'clung' },
    come: { pa: 'come' },
    creep: { pa: 'crept' },
    cut: { pa: 'cut' },
    dive: { pa: 'dived' },
    dream: { pa: 'dreamt' },
    flee: { pa: 'fled' },
    fling: { pa: 'flung' },
    got: { pa: 'gotten' },
    grow: { pa: 'grown' },
    hit: { pa: 'hit' },
    keep: { pa: 'kept' },
    kneel: { pa: 'knelt' },
    know: { pa: 'known' },
    leap: { pa: 'leapt' },
    lend: { pa: 'lent' },
    loose: { pa: 'lost' },
    prove: { pa: 'proven' },
    put: { pa: 'put' },
    quit: { pa: 'quit' },
    ride: { pa: 'ridden' },
    seek: { pa: 'sought' },
    send: { pa: 'sent' },
    set: { pa: 'set' },
    sew: { pa: 'sewn' },
    shake: { pa: 'shaken' },
    shave: { pa: 'shaved' },
    shut: { pa: 'shut' },
    seat: { pa: 'sat' },
    slay: { pa: 'slain' },
    sleep: { pa: 'slept' },
    sneak: { pa: 'snuck' },
    speed: { pa: 'sped' },
    spend: { pa: 'spent' },
    spit: { pa: 'spat' },
    split: { pa: 'split' },
    spring: { pa: 'sprung' },
    stink: { pa: 'stunk' },
    strew: { pa: 'strewn' },
    sware: { pa: 'sworn' },
    sweep: { pa: 'swept' },
    thrive: { pa: 'thrived' },
    undergo: { pa: 'undergone' },
    upset: { pa: 'upset' },
    weave: { pa: 'woven' },
    weep: { pa: 'wept' },
    wind: { pa: 'wound' },
    wring: { pa: 'wrung'}
  },

  irregulars: {},
  lexicon: {},
  mapping: {},
  suffixRules: {},
  tenseMap: {
    ps: 'PastTense', pr: 'PresentTense', pe: 'PerfectTense', pa: 'Participle',
    pl: 'PluPerfectTense', ft: 'FuturePerfect', ac: 'Actor', g: 'Gerund'
  }
}

for (let inf in Verb.conjugate) {
  let o: any = {};
  for (let k in Verb.conjugate[inf]) {
    if (!!Verb.conjugate[inf][k].length) {
      let newTag = Verb.tenseMap[k];
      o[newTag] = Verb.conjugate[inf][k];
      Verb.lexicon[o[newTag]] = newTag;
      Verb.mapping[o[newTag]] = inf;
    }
  }
  Verb.irregulars[inf] = o;
  Verb.lexicon[inf] = 'Infinitive';
}

// suffix signals for verb tense, generated from test data
const compact: any = {
  Gerund: ['ing'],
  Actor: ['erer'],
  Infinitive: ['ate','ize','tion','rify','then','ress','ify','age','nce','ect',
    'ise','ine','ish','ace','ash','ure','tch','end','ack','and','ute','ade',
    'ock','ite','ase','ose','use','ive','int','nge','lay','est','ain',
    'ant','ent','eed','er','le','own','unk','ung','en'],
  PastTense: [ 'ed','lt','nt','pt','ew','ld' ],
  PresentTense: ['rks','cks','nks','ngs','mps','tes','zes','ers','les','acks',
    'ends','ands','ocks','lays','eads','lls','els','ils','ows','nds','ays',
    'ams','ars','ops','ffs','als','urs','lds','ews','ips','es','ts','ns','s']
};
const keys = Object.keys(compact);
for (let k in compact) {
  for (let i = 0; i < compact[k].length; i++) { Verb.suffixRules[compact[k][i]] = k }
}

const hasY = /[bcdfghjklmnpqrstvwxz]y$/;
Verb.generic = {
  Gerund: (s: string) => (s.charAt(s.length - 1) === 'e' ? s.replace(/e$/, 'ing') : `${s}ing`),
  PresentTense: (s: string) => {
    if (s.charAt(s.length - 1) === 's') { return `${s}es`; }
    return (hasY.test(s) === true) ? `${s.slice(0, -1)}ies` : `${s}s`;
  },
  PastTense: (s: string) => {
    if (s.charAt(s.length - 1) === 'e') { return `${s}d`; }
    if (s.substr(-2) === 'ed') { return s; }
    return (hasY.test(s) === true) ? `${s.slice(0, -1)}ied` : `${s}ed`;
  }
}
export default Verb;
