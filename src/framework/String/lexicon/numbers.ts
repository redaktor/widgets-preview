export const data = {
  plus: [ 'plus', 'and' ],
  minus: [ 'minus', 'negative' ],
  factors: [ 'half', 'quarter' ],
  decimal: [ 'point', 'decimal' ],

  ones: {
    zero: 0,
    null: 0,
    nil: 0,
    one: 1,
    first: 1,
    two: 2,
    '\Dsecond': 2,
    three: 3,
    third: 3,
    four: 4,
    fourth: 4,
    five: 5,
    fifth: 5,
    six: 6,
    sixth: 6,
    seven: 7,
    seventh: 7,
    eight: 8,
    eighth: 8,
    nine: 9,
    ninth: 9
  },
  teens: {
    ten: 10,
    teenth: 10,
    eleven: 11,
    eleventh: 11,
    twelve: 12,
    twelfth: 12,
    thirteen: 13,
    thirteenth: 13,
    fourteen: 14,
    fourteenth: 14,
    fifteen: 15,
    fifteenth: 15,
    sixteen: 16,
    sixteenth: 16,
    seventeen: 17,
    seventeenth: 17,
    eighteen: 18,
    eighteenth: 18,
    nineteen: 19,
    nineteenth: 19
  },
  tens: {
    twenty: 20,
    twentieth: 20,
    thirty: 30,
    thirtieth: 30,
    forty: 40,
    fortieth: 40,
    fifty: 50,
    fiftieth: 50,
    sixty: 60,
    sixtieth: 60,
    seventy: 70,
    seventieth: 70,
    eighty: 80,
    eightieth: 80,
    ninety: 90,
    ninetieth: 90
  },
  multiple: {
    hundred: 100,
    grand: 1000,
    thousand: 1000,
    million: 1000000,
    billion: 1000000000,
    trillion: 1000000000000,
    quadrillion: 1000000000000000,
    quintillion: 1000000000000000000,
    sextillion: 1e+21,
    septillion: 1e+24,
    octillion: 1e+27,
    nonillion: 1e+30,
    decillion: 1.0000000000000001e+33
  }
};

export const numbers = Object.keys(data.multiple).concat(Object.keys(data.tens),Object.keys(data.teens),Object.keys(data.ones));
const nrRegex = new RegExp(['((?:(?:',numbers.concat(data.plus,data.minus,data.factors,data.decimal,'\\d+').join('|'),')(?: ?))+)'].join(''), 'i');

export default nrRegex;
// --> http://jsfiddle.net/s76sg1rh/
