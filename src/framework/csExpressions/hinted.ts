export default class TypeHinted {
  hint: string;
  data: ArrayBuffer;
  constructor(_hint: string, _data: ArrayBuffer) {
    this.hint = `${_hint}`;
    this.data = _data;
  }
}
