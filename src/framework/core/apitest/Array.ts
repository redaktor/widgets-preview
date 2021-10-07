import wrap from '../base/wrap';
export default class ARRAY {
  static test = 'test';
  isA = 'Array';
  value: any;
  constructor(protected _input: any[], protected _options: any = {}, ...args: any[]) {
    this.value = _input;
  }
  filter(fn: any) { return this._input.filter(fn) }
  pushIt = wrap((pushIt: any) => {
    this._input.push(pushIt);
    return this._input
  })
  //(pushIt: any) { this._input.push(pushIt) }
  get count() { return {'TEST':1,'2':2} }
}
