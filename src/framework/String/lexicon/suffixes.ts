import {ADJ,ADV,EXP,INF,PR,SI,PA,PL,AC,VB,NN,LN,MD,CP} from './tagset';

// just a foolish lookup of known suffixes
export const suffixes: any[] = [
  null, // 0
  null, // 1
  // 2-letter
  { ea: SI, ia: NN, ic: ADJ, "'n": VB, "'t": VB },
  // 3-letter
  { que: ADJ, lar: ADJ, ike: ADJ, ffy: ADJ, rmy: ADJ, azy: ADJ, oid: ADJ, mum: ADJ,
    ean: ADJ, ous: ADJ, end: VB, sis: SI, rol: SI, ize: INF, ify: INF, zes: PR,
    nes: PR, ing: 'Gerund', /* likely to be converted to ADJ after lexicon pass */
    ' so': ADV, "'ll": MD, "'re": CP },
  // 4-letter
  { teen: 'Value', tors: NN, ends: VB, oses: PR, fies: PR, ects: PR, nded: PA,
    cede: INF, tage: INF, gate: INF, vice: SI, tion: SI, ette: SI, some: ADJ,
    llen: ADJ, ried: ADJ, gone: ADJ, made: ADJ, fore: ADV, less: ADV, ices: PL,
    ions: PL, ints: PL, aped: PA, lked: PA, ould: MD, tive: AC,
    /* swedish male, polish male, east-europe, greek, norway etc. */
    sson: LN, czyk: LN, chuk: LN, enko: LN, akis: LN, nsen: LN },
  // 5-letter
  { fully: ADV, where: ADV, wards: ADV, urned: PA, tized: PA, eased: PA, ances: PL,
    tures: PL, ports: PL, ettes: PL, ities: PL, rough: ADJ, bound: ADJ,
    tieth: 'Ordinal', ishes: PR, tches: PR, /*norway, polish male:*/ nssen: LN, marek: LN },
  // 6-letter
  { keeper: AC, logist: AC, /* lithuania: */ auskas: LN, teenth: 'Value' },
  // 7-letter
  { /* swedish female, greek: */ sdottir: LN, opoulos: LN }
]
// regexes indexed by mandated last-character
export const suffixPOS: any = {
  a: [ [/.[aeiou]na$/, NN], [/.[oau][wvl]ska$/, LN/*polish (female)*/], [/.[^aeiou]ica$/, SI],
    [/^([hyj]a)+$/, EXP/*hahah*/] ],
  c: [ [/.[^aeiou]ic$/, ADJ] ],
  d: [ [/.[ia]sed$/, ADJ], [/.[gt]led$/, ADJ], [/.[aeiou][td]ed$/, PA], [/[^aeiou]ard$/, SI],
    [/[aeiou][^aeiou]id$/, ADJ], [/[aeiou]c?ked$/, PA/*hooked*/], [/.[vrl]id$/, ADJ] ],
  e: [ [/.[lnr]ize$/, INF], [/.[^aeiou]ise$/, INF], [/.[aeiou]te$/, INF],
    [/.[^aeiou][ai]ble$/, ADJ], [/.[^aeiou]eable$/, ADJ], [/.[^aeiou]ive$/, ADJ] ],
  h: [ [/.[^aeiouf]ish$/, ADJ], [/.v[iy]ch$/, LN/*east-europe*/],  [/^ug?h+$/, EXP/*uhh*/],
    [/^uh[ -]?oh$/, EXP/*uhoh*/] ],
  i: [ [/.[oau][wvl]ski$/, LN/*polish (male)*/] ],
  k: [ [/^(k)+$/, EXP] ],
  l: [ [/.[nrtumcd]al$/, ADJ], [/.[gl]ial$/, ADJ], [/.[^aeiou]eal$/, ADJ],
    [/.[^aeiou][ei]al$/, ADJ], [/.[^aeiou]ful$/, ADJ] ],
  m: [ [/.[^aeiou]ium$/, SI], [/[^aeiou]ism$/, SI], [/.[^aeiou]ium$/, SI],
    [/^mmm+$/, EXP/*mmmm*/], [/^[hu]m+$/, EXP/*ummm*/], [/^[0-9]+ ?(am|pm)$/, 'Date'] ],
  n: [ [/.[lsrnpb]ian$/, ADJ], [/[^aeiou]ician$/, AC] ],
  o: [ [/^no+$/, EXP/*noooo*/], [/^(yo)+$/, EXP/*yoyo*/], [/^woo+[pt]?$/, EXP/*woo*/] ],
  r: [ [/.[ilk]er$/, 'Comparative'], [/[aeiou][pns]er$/, SI], [/[^i]fer$/, INF],
    [/.[^aeiou][ao]pher$/, AC] ],
  t: [ [/.[di]est$/, 'Superlative'], [/.[icldtgrv]ent$/, ADJ], [/[aeiou].*ist$/, ADJ],
    [/^[a-z]et$/, VB] ],
  s: [ [/.[rln]ates$/, PR], [/.[^z]ens$/, VB], [/.[lstrn]us$/, SI],
    [/[aeiou][^aeiou]is$/, SI], [/[a-z]\'s$/, NN], [/^yes+$/, EXP] ],
  v: [ [/.[^aeiou][ai][kln]ov$/, LN/*east-europe*/] ],
  y: [ [/.[cts]hy$/, ADJ], [/.[st]ty$/, ADJ], [/.[gk]y$/, ADJ], [/.[tnl]ary$/, ADJ],
    [/.[oe]ry$/, SI], [/[rdntkbhs]ly$/, ADV], [/[bszmp]{2}y$/, ADJ],
    [/.(gg|bb|zz)ly$/, ADJ], [/.[aeiou]my$/, ADJ], [/.[^aeiou]ity$/, SI],
    [/[ea]{2}zy$/, ADJ], [/.[^aeiou]ity$/, SI] ]
};
