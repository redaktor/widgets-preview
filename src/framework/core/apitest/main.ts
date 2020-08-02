import deepClone from '../../JSON/clone';
import JSONpatch from '../../JSON/Patch';
//import wrap from './base/wrap';
//https://github.com/mdvorscak/cloakjs

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

/*
{ op: OP.REPLACE, path: new JsonPointer('/bar'), value: 'bar' }
*/
export enum OP {
	ADD = 'add',
	REMOVE = 'remove',
	REPLACE = 'replace',
	TEST = 'test'
}
export function JSONvalue(v: any) { return typeof v === 'undefined' ? null : v }

function exec(parts: any[], modules: any[]) {
  let targetIndex: number;
  const patches = parts.reduce((a, p, i) => {
    if (!!p.basePath) {
      const args = !!p.args ? p.args :
        (!!i && parts[i-1].patch.hasOwnProperty('value') ? [parts[i-1].patch.value] : []);
      p.target = Reflect.construct(modules[i].default, args);
      targetIndex = i;
      if (!!p.target) {
        p.patch.value = {value: p.target.value}
      }
      //console.log('!', p.target );
      //console.log(Reflect.get(p.target, parts[i+1].prop))
    } else {
      let fn: any, fnTarget: any;
      if (!p.patch.path) {
        p.patch.path = `${parts[targetIndex].patch.path}/${p.path}`;
      }
      if (Reflect.has(parts[targetIndex].target, p.prop)) {
        //Reflect.apply(modules[i].default, args);
        fnTarget = parts[targetIndex].target;
        fn = Reflect.get(fnTarget, p.prop);
        console.log('__',fn)
        p.targetIndex = targetIndex;
      } else {
        for (var j = targetIndex-1; j > -1; j--) {
          if (parts[j].hasOwnProperty('target') && Reflect.has(parts[j].target, p.prop)) {
            fnTarget = parts[j].target;
            fn = Reflect.get(fnTarget, p.prop);
            p.targetIndex = j;
            break;
          }
        }
      }
      if (!!fn) {
        p.patch.value = deepClone(p.args ? Reflect.apply(fn, fnTarget, p.args) : fn, true)
      }
    }
    if (p.patch.hasOwnProperty('value') && typeof p.patch.value !== 'undefined') {
      a.push(p.patch);
    }
    return a
  }, []);
  console.log('PATCHES', patches);
  const o = new JSONpatch({});
  console.log('RESULT:::', o.apply(patches) );
  // TODO FINAL RESULT FIXME
  return patches
}

function fluent(registry: any, terminators: any = {}, executor: any = exec, ctx: any = null) {
  let parts: any[] = [];
  let cur: any = {};
  const proxy: any = new Proxy(function (...args: any[]) {
    if (typeof terminators[cur.action] === 'function') {
      const basePath = terminators[cur.action].call(ctx, parts, cur, args);
      if (typeof basePath === 'string') {
        cur.basePath = basePath;
      }
      return proxy;
    } else if (!!args.length) {
      console.log('args', cur.action, args)
    	parts[parts.length - 1].args = args;
      return proxy
    }
// LOAD + EXEC
    const LOAD = parts.reduce((a, p, i) => {
      if (!!p.basePath) {
        a.push( import(`.${p.basePath}`) );
        parts[i].targetIndex = i;
      }
      return a;
    }, []);
    console.log('loading', LOAD);
    return Promise.all(LOAD).then((modules: any[]) => {
      const returnVal = executor.call(ctx, parts, modules);
      parts = [];
      console.log('returnVal', returnVal, returnVal.then);
      return returnVal;
    })
// <--
  }, {
  	// proxy traps
    has() { return true },
    get(target: any, prop: string) {
    	console.log(prop, typeof prop);
      const part: any = {prop, patch: {}};
      cur.action = prop;

      if (!!terminators[prop]) { return proxy }
      if (!!registry[prop]) {
	      cur = registry[prop];
        part.patch.op = OP.ADD;
        part.basePath = cur.basePath;
        console.log('evt. LOAD // new', part);
      } else {
      	const isSpec = (!!cur.specOps && cur.specOps[prop]);
	      part.patch.op = isSpec ? cur.specOps[prop] : OP.ADD;
				part.path = `${isSpec ? prop : 'value'}`;
        console.log('op', part)
      }


      parts.push(part);
      return proxy;
    }
  });
  return proxy;
}

const testRegistry = {
  array: {
    basePath: '/Array',
    specOps: {count: OP.ADD}
  },
  thing: {
		basePath: '/Thing'
  }
}

const JSON_PATCH_TERMINATORS = {
  as: (parts: any[], current: any, args: any[]) => {
    const L = parts.length;
    const LAST = !!L && parts[L-1];
    if (!!LAST && !!args.length) {
      if (LAST.hasOwnProperty('basePath')) {
        LAST.patch.path = (args[0].charAt(0) === '/') ? args[0] : `/${args[0]}`;
        return LAST.patch.path;
      }
      LAST.patch.path = (args[0].charAt(0) === '/') ? args[0] : `${current.basePath}/${args[0]}`;
    }
  }

}

const r = fluent(testRegistry, JSON_PATCH_TERMINATORS, exec);

r.array([1,false,2]).as('Users').pushIt(3).as('allCurrentUsers').filter((v: any) => !!v).count.do().then((x: any) => {
  console.log(''); console.log(':::')
  console.log(x)
});
