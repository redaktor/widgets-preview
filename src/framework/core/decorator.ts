import jsonpointer from '../JSON/Pointer';
import * as AJV from "ajv";
const ajv = new AJV({useDefaults: true, jsonPointers: true, verbose: true});
/*
const a: [string,number,number] = ['a',1,2];
const s: any = {"type":"array","items":[{"type":"string"},{"type":"number"},{"type":"number"}]};
console.log(ajv.validate(s, a));
console.log('---');
*/

/**
 * Parameterized decorators are treated like decorator factories and are expected to return a decorator to be
 * applied.
 * @param args an argument for the decorator factory
 * @return the decorator to be applied
 */
export default function API(SCHEMA: any = {}, INITIALIZERS: any = {}): any {
  const vFn = ajv.compile(SCHEMA);
  const toObj = (o:any, c:any, i:number) => { o[i.toString()] = c; return o }
  const fullErr = (err: any) => {
    const name = (err.parentSchema && typeof err.parentSchema.title === 'string') ?
      err.parentSchema.title : err.dataPath;
    return {
      ...err,
      name,
      text: `There was an error with the request. Parameter "${name}" ${err.message}`
    }
  }

  /**
   * The class decorator can be used to override the constructor function of a class.
   *
   * @param target the class being decorated
   * @return A new constructor producing an identical structure
   */
  return function validate<T extends {new(...args:any[]):{}}>(target:T) {
    for (const k of Object.getOwnPropertyNames(Object.getPrototypeOf(new target()))) {
      const descriptor: any = Object.getOwnPropertyDescriptor(target.prototype, k);
      const isMethod = descriptor.value instanceof Function;
      if (!isMethod) continue;
      const originalMethod = descriptor.value;
      // console.log('key:', k);

      /* TODO ASYNC, INITIALIZERS */
      descriptor.value = function(...args: any[]) {
        if (typeof INITIALIZERS[k] === 'function') {
          const INITS = INITIALIZERS[k].apply(this);
          args = args.map((arg, i) => (arg === void 0) ? INITS[i] : arg)
        }
        const o = {[k]: args.reduce(toObj, {})};
        const VALID = vFn(o);

        console.log(`!The method args are: ${JSON.stringify(args)}`);
// IF DEBUG
/*
        console.log(`The method args are: ${JSON.stringify(args)}`);
        console.log(`The method args are: ${
         VALID ? 'VALID!' : `INVALID: ${JSON.stringify(originalMethod.errors)}`
        }`);
*/
// <--
        this.errors = (!VALID && vFn.errors) ? vFn.errors.map(fullErr) : void 0;
        return originalMethod.apply(this, args);
      };
      Object.defineProperty(target.prototype, k, descriptor);
    }
    return class extends target {
      constructor(...args: any[]){
        super(...args);
        const o = {_constructor: args.reduce(toObj, {})};
        const VALID = vFn(o);
        console.log(`cThe method args are: ${
          VALID ? 'VALID!' : `INVALID: ${JSON.stringify(vFn.errors)}`
        }`);
      }
    }
  }
}

/* --------------------------------
 // Example:
 -------------------------------- */
/*
@API({ hello: 'world'})
export class C {
    constructor() {
        console.log('I am the original constructor!')
    }
    b(x:any){ return ' ' }
}

@API({ hello: 'world'})
export class D {

}
*/
