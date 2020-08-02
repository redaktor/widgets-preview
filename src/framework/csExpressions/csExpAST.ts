import is, { TOF } from '../is';
type MapFn = (x: any, i?: number, a?: any[]) => any;
class Generic<T> {
	type: TOF;
	value: T;
	constructor(value: T) {
		this.type = is(value);
		this.value = value
	}
	isAtom = false;
	isCons = false;
	isList = false;
	isAlistFn() { return false }
}
class Abstract<T> extends Generic<T> {
	visit(f?: MapFn) { throw `Not implemented!` }
	toJS() { throw `Not implemented!` }
}
class AbstractAtom<T> extends Abstract<T> {
	isAtom = true;
	toJS(): any { return this.value }
	toString(): any { return `${this.value}` }
}
class AbstractCons<T> extends Abstract<T> {
	isCons = true;
}
// Atoms
export class cNull extends AbstractAtom<null> {
	isList = true;
	visit() { }
	toJS() { return null }
	toString() { return `nil` }
}
export class cSymbol extends AbstractAtom<string> { }
export class cString extends AbstractAtom<string> {
	toString() { return JSON.stringify(this.value) }
}
export class cNumber extends AbstractAtom<string> {
	isAtom = true;
	toInt() { return parseInt(this.value, 10) }
	toFloat() { return parseFloat(this.value) }
	toJS() {
		if (this.type === 'integer') {
			return this.toInt();
		} else if (this.type === 'number') {
			return this.toFloat();
		}
		throw `Unknown SExpNumber type: ${this.type} for ${this.value}`;
	}
}
// List
export class cList extends AbstractCons<any[]> {
	isList = true;
	getCar() {return this.value[0];};
	getCdr() {
		if (this.value.length < 2) return null;
		return new cList(this.value.slice(1));
	};
	toStr() {
		if (this.value.length == 0) return 'nil';
		return `(${this.value.map((i) => i.toString()).join(' ')})`
	};
	visit(f: MapFn) {
		this.value = this.value.map(f);
	};
	isAlistFn() {
		let L = this.value.length;
		for (var i = 0; i < L; i++) {
			if (!this.value[i].isCons()) return false;
		}
		return true;
	};
	toJS() {
		return this.value.map((i) => i.toJS());
	};
	toObject() {
		const ret: any = {};
		this.value.forEach((item) => {
			if (!item.isCons()) {
				throw `"${item.toStr()}" is not alist form in [${this.toStr()}]`
			}
			ret[item.getCar().toJS()] = item.getCdr().toJS();
		}, this);
		return ret
	}
}
// Cons
export class cCons extends AbstractCons<any> {
	cdr: any;
	isCons = true;
	constructor(value: string, cdr: any) {
		super(value);
		this.cdr = cdr;
	}
	getCar() { return this.value }
	getCdr() { return this.cdr }
	toStr() {
		if (this.cdr.isList() && this.cdr.list.length == 0) {
			return "("+this.value.toString()+")";
		}
		if (this.cdr.isList() && this.cdr.list.length > 0) {
			return `(${this.value.toString()} `+
				`${this.cdr.list.map((i: any) => i.toString()).join(' ')})`;
		}
		return `(${this.value.toString()} . ${this.cdr.toString()})`;
	}
	visit(f: MapFn) {
		this.value = f(this.value);
		this.cdr = f(this.cdr);
	}
	toJS() {
		return [this.value.toJS(), this.cdr.toJS()];
	}
}
// ListDot
export class cListDot extends AbstractCons<any[]> {
	last: any;
	constructor(value: any[], last: any) {
		super(value);
		this.last = last;
	}
	get car() { return this.value[0] }
	get cdr() {
		const L = this.value.length;
		return L == 2 ?
			new cCons(this.value[1],this.last) :
			new cListDot(this.value.slice(1),this.last);
	}
	//
	toStr() {
		return `(${this.value.map((i) => i.toString()).join(' ')})` +
		` . ${this.last.toStr()})`;
	};
	visit(f: MapFn) {
		this.value = this.value.map(f);
		this.last = f(this.last);
	};
	toJS() {
		return this.value.map((i) => i.toJS()).concat([this.last.toJS()]);
	};
}
// Quoted
export class cQuoted extends Abstract<Abstract<string>> {
	toStr() {
		return `'`+this.value.toString();
	}
	visit(f: any) {
		this.value.visit(f);
	}
	toJS() {
		return [this.value.toJS()];
	}
}
export default class AST {
	static Abstract(v: any) { return new Abstract(v) }

	static Null(v: any) { return new cNull(v) }
	static Symbol(v: any) { return new cSymbol(v) }
	static String(v: any) { return new cString(v) }
	static Number(v: any) { return new cNumber(v) }

	static List(v: any) { return new cList(v) }
	static ListDot(v: any, last: any) { return new cListDot(v, last) }
	static Cons(v: any, cdr: any) { return new cCons(v, cdr) }
	static Quoted(v: any) { return new cQuoted(v) }
}

export class SerializationError extends Error {
	constructor(message: string /*SerializationError details*/) {
		super(message)
	}
}
export class UInt8Array extends Uint8Array {
  __add__(aBytes: any): UInt8Array {
      let result = new UInt8Array(this.length + aBytes.length);
      result.set (this);
      result.set (aBytes, this.length);
      return result;
  }
  __mul__(scalar: number) {
      let result = new UInt8Array(scalar * this.length);
      for (let i = 0; i < scalar; i++) {
          result.set (this, i * this.length);
      }
      return result;
  }
  __rmul__(scalar: number) { return this.__mul__(scalar) }
}

export function bytes(bytable: any/*, encoding?: string*/) {
  if (bytable == undefined) {
    return new UInt8Array(0);
  } else {
    switch (is(bytable)) {
      case 'array':
        return new UInt8Array(bytable);
      case 'integer':
        return new UInt8Array(bytable);
      case 'string':
        const L = bytable.length;
        let aBytes = new UInt8Array(L);
        for (let i = 0; i < L; i++) {
          aBytes[i] = bytable.charCodeAt(i);
        }
        return aBytes;
      /* TODO
      case 'tuple':

      break;

      case 'object':

      break;
      */
      default:
        throw new TypeError()
    }
  }
}
