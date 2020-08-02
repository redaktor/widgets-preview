const numbers: any = {
  numericRegex: /^-?(\$|€|¥|£)?\.?[0-9]+[0-9,\.]*(st|nd|rd|th|rth|%)?$/,
  improperFraction: /^([0-9,\. ]+)\/([0-9,\. ]+)$/,
  cardinal: {
    ones: { /*'a': 1*/
      zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9
    },
    tens: {
      twenty:20,thirty:30,forty:40,fifty:50,
      sixty:60,seventy:70,eighty:80,ninety:90
    },
    teens: {
      ten:10,eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,
      sixteen:16,seventeen:17,eighteen:18,nineteen: 19
    },
    multiples: {
      hundred:1e2,thousand:1e3,grand:1e3,million:1e6,billion:1e9,trillion:1e12,
      quadrillion:1e15,quintillion:1e18,sextillion:1e21,septillion:1e24
    }
  },
  ordinal: {
    ones: {
      zeroth:0,first:1,second:2,third:3,fourth:4,fifth:5,
      sixth:6,seventh:7,eighth:8,ninth:9
    },
    teens: {
      tenth:10,eleventh:11,twelfth:12,thirteenth:13,fourteenth:14,fifteenth:15,
      sixteenth:16,seventeenth:17,eighteenth:18,nineteenth: 19
    },
    tens: {
      twentieth:20,thirtieth:30,fourtieth:40,fiftieth:50,sixtieth:60,
      seventieth:70,eightieth:80,ninetieth: 90
    },
    multiples: {
      hundredth:1e2,thousandth:1e3,millionth:1e6,billionth:1e9,trillionth:1e12,
      quadrillionth:1e15,quintillionth:1e18,sextillionth:1e21,septillionth:1e24
    }
  },
  // used for the units
  prefixes: {
    yotta:1,zetta:1,exa:1,peta:1,tera:1,giga:1,mega:1,kilo:1,hecto:1,deka:1,
    deci:1,centi:1,milli:1,micro:1,nano:1,pico:1,femto:1,atto:1,zepto:1,yocto:1,
    square:1,cubic:1,quartic:1
  },
  sequence: [
    [1000000000, 'million'],
    [100000000, 'hundred million'],
    [1000000, 'million'],
    [100000, 'hundred thousand'],
    [1000, 'thousand'],
    [100, 'hundred'],
    [1, 'one']
  ],
  // some numbers we know
  casualForms: { 'a couple': 2, 'a dozen': 12, 'two dozen': 24, zero: 0 },
  // support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5
  findModifiers: (s: string) => {
    const mults: any = [[/^(minus|negative)[\s\-]/i, -1], [/^(a\s)?half[\s\-](of\s)?/i, 0.5]];
    // [/^(a\s)?quarter[\s\-]/i, 0.25]
    for (let i = 0; i < mults.length; i++) {
      if (mults[i][0].test(s) === true) {
        return { amount: mults[i][1], str: s.replace(mults[i][0], '') };
      }
    }
    return { amount: 1, str: s };
  },
  toOrdinal: {},
  toCardinal: {},
  lexicon: {}
};

// create an easy mapping between ordinal-cardinal
for (let k in numbers.ordinal) {
  let ord = Object.keys(numbers.ordinal[k]);
  let card = Object.keys(numbers.cardinal[k]);
  for (let i = 0; i < ord.length; i++) {
    numbers.toOrdinal[card[i]] = ord[i];
    numbers.toCardinal[ord[i]] = card[i];
    numbers.lexicon[ord[i]] = ['Ordinal', 'TextValue'];
    numbers.lexicon[card[i]] = ['Cardinal', 'TextValue'];
  }
};
// default number mappings
numbers.cardinalMapping = Object.keys(numbers.cardinal)
numbers.onesMapping = Object.keys(numbers.cardinal.ones).concat(Object.keys(numbers.cardinal.teens));
numbers.tensMapping = Object.keys(numbers.cardinal.tens).map((k, i) => [k, (i+2)*10]).reverse();

export default numbers;
