import Collection from '../Collection';

//const [K, M]: any = ['keys','merge'];
//@API.options({hello: 'world'})
export default class STRING extends Collection {
  constructor (protected _input: string = '', ...args: any[]) {
    super(_input, ...args);
    return this.init({awaits: {}});
  }

  async $splitSentences() {

  }

/*
_.words
? sentences

_.camelCase
_.capitalize
_.kebabCase
_.snakeCase
_.startCase

_.lowerCase
_.lowerFirst
_.toLower
_.upperCase
_.upperFirst
_.toUpper

_.deburr
_.endsWith
_.escape
_.escapeRegExp
_.pad
_.padEnd
_.padStart
_.parseInt
_.repeat
_.replace
_.split
_.startsWith
_.template
_.trim
_.trimEnd
_.trimStart
_.truncate
_.unescape

*/
}
