import jsonPointer from '../JSON/Pointer';
import wrap from './wrap';

interface anyO { [key: string]: any; }
interface strO { [key: string]: string; }
type CB = (err?: Error) => any;
interface DECORATOR {
  target: Object;
  key: string;
  desc: TypedPropertyDescriptor<any>;
}
interface APIINIT {
  readonly self?: strO;
  awaits?: strO;
  proxyHandler?: any;
}
interface APISTATE {
  parent: any;
  result: any;
  proxy?: any;
  _last: string;
}
/* TODO
https://jsfiddle.net/h9q5osgh/
traps
mutate = ADD, /value, r
const operations = [
	{ op: OperationType.ADD, path: new JsonPointer('/foo'), value: 'foo' },
	{ op: OperationType.REPLACE, path: new JsonPointer('/bar'), value: 'bar' },
	{ op: OperationType.REMOVE, path: new JsonPointer('/qux') },
];
*/

/* TODO FIXME https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag */
let _proxy: any;
let _state: WeakMap<any, APISTATE> = new WeakMap();
export default class API {
  pointer = jsonPointer;
  // changes in subClasses ...
  isA: string = 'API'; // TODO JSON API self

  constructor (
    protected readonly _input: any = {}, protected _options: any = {},
    ...args: any[] /* parent */
  ) {
    _state.set(this, { parent: args[0], result: { value: _input }, _last: 'value' });
    console.log('API input', _input)
    //this.value = _input;
  }
  init(o: APIINIT) {
    if (!!o.awaits && typeof o.awaits === 'object') {
      for (let k in o.awaits) { (<any>this)[k] = this.fn([o.awaits[k], k]) } // TODO FIXME path join
    }

    _proxy = (!!o.proxyHandler && typeof o.proxyHandler === 'object') ?
      new (<any>global).Proxy(this, o.proxyHandler) : false;
    return _proxy || this
  }

  get options() { return this._options }
  set options(o: any) { this._options = o }
  /*
  get parent(): any { return _state.get(this).parent || this } // just a handy wrap
  set parent(p: any){ _state.set(this, parent = p }
  //get list(): any[] { return this.state.list || [] }
  //set list(a: any[]){ this.state.list = a }
  get value(): any { return this._state.result.value }
  set value(v: any){ this._state.result = {value: v} } // TODO array(), object() etc.
*/
  get value(): any {
    const o: any = _state.get(this);
    return o.result[o._last]
  }
  get parent(): any { return (_state.get(this)||{parent:{}}).parent }
  protected async $load(m: string) { return (await import(`./base/${m}`)) }
  protected async $fn(m: string | string[], ...args: any[]) {
    const [M, F] = typeof m === 'string' ? [m, 'default'] : m;
    //console.log('!', M, F, this.value, ...args);
		const fns: any = await this.$load(M);
    const o: any = _state.get(this);
    o.result[F] = fns[F](o.result[o._last], ...args);
    o._last = F;
    _state.set(this, o)
//		this._state.result[F] = fns[F](this.value, ...args);
//    this.value = this._state.result[F];
//		console.log('!!', this._state.result);
		return _proxy || this
	}
	protected fn(m: string | string[]) {
		return (...args: any[]) => API._(this.$fn(m, ...args))
	}

  static options(defaultOptions: any = {}) {
    return function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
      /*
      const proto = Object.getPrototypeOf(new constructor());
      for (let p of Object.getOwnPropertyNames(proto)) {
        if (p.charAt(0) === '_' || p === 'constructor') { continue }
        console.log(Object.getOwnPropertyDescriptor(proto, p))
      }*/
      console.log('::', Object.getOwnPropertyNames(constructor), constructor);
      return class extends constructor {
        isA: string = (<any>constructor).name;
        constructor (...args: any[]) {
          super(...args);
          (<any>this).options = { ...defaultOptions, ...args[0] }
        }
      }
    }
  }

  static _ = wrap;
}


/*
export class ARRAY extends COLLECTION {
  get flat() { return this.flatten() }
  flatten(...args: any[]) { doFlat(this.value, 1, ...args); return this }
  //(a, predicate, r = []) => doFlat(a, 1, predicate, r),
}
*/
