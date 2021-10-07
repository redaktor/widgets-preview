
export default class Thing {
  isA = 'Thing';
  constructor(protected _input: any[], protected _options: any = {}, ...args: any[]) {}
  get testThing() { return {'TEST':1,'THING':2} }
}
