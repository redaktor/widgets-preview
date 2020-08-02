/* WRAP PROMISE */
let handlers: any;

// TODO FIXME NOT IN PACKAGE.json yet !!! Check if needed w. TS > 2.5 :
if (typeof Reflect === 'undefined') { require('harmony-reflect') }

export default function wrap(target: any) {
  if (typeof target === 'object' && target && typeof target.then === 'function') {
    // The target needs to be stored internally as a function, so that it can use
    // the `apply` and `construct` handlers.
    var targetFunc: any = function () { return target };
    targetFunc._promiseChainCache = Object.create(null);
    return new Proxy(targetFunc, handlers);
  }
  return target;
};

handlers = {
  get: function (target: any, prop: string | symbol) {
    console.log('1 get function', prop);
    if (prop === 'inspect') {
      return function () { return '[chainable Promise]' };
    }
    if (prop === '_raw') { return target() }
    if (typeof prop === 'symbol') { return target()[prop] }
    // If the Promise itself has the property ('then', 'catch', etc.), return the
    // property itself, bound to the target.
    // However, wrap the result of calling this function.
    // This allows wrappedPromise.then(something) to also be wrapped.
    if (prop in target()) {
      const isFn = typeof target()[prop] === 'function';
      if (prop !== 'constructor' && !prop.startsWith('_') && isFn) {
        return function () {
          return wrap(target()[prop].apply(target(), arguments));
        };
      }
      return target()[prop];
    }
    // If the property has a value in the cache, use that value.
    if (Object.prototype.hasOwnProperty.call(target._promiseChainCache, prop)) {
      return target._promiseChainCache[prop];
    }
    // If the Promise library allows synchronous inspection (bluebird, etc.),
    // ensure that properties of resolved
    // Promises are also resolved immediately.
    const isValueFn = typeof target().value === 'function';
    if (target().isFulfilled && target().isFulfilled() && isValueFn) {
      return wrap(target().constructor.resolve(target().value()[prop]));
    }
    // Otherwise, return a promise for that property.
    // Store it in the cache so that subsequent references to that property
    // will return the same promise.
    target._promiseChainCache[prop] = wrap(target().then(function (result: any) {
      if (result && (typeof result === 'object' || typeof result === 'function')) {
        return wrap(result[prop]);
      }
      const _p = `"${prop}" of "${result}".`;
      throw new TypeError(`Promise chain rejection: Cannot read property ${_p}`);
    }));
    return target._promiseChainCache[prop];
  },
  apply: function (target: any, thisArg: any, args: any) {
    console.log('2 call function', target());
    // If the wrapped Promise is called, return a Promise that calls the result
    return wrap(target().constructor.all([target(), thisArg]).then(function (results: any[]) {
      if (typeof results[0] === 'function') {
        return wrap(Reflect.apply(results[0], results[1], args));
      }
      throw new TypeError(`Promise chain rejection: Attempted to call ${results[0]}` +
        ' which is not a function.');
    }));
  },
  construct: function (target: any, args: any) {
    return wrap(target().then(function (result: any) {
      return wrap(Reflect.construct(result, args));
    }));
  }
};
// Make sure all other references to the proxied object refer to the promise itself,
// not the function wrapping it
Object.getOwnPropertyNames(Reflect).forEach(function (handler) {
  handlers[handler] = handlers[handler] || function (target: any, ...args: any[]) {
    return (<any>Reflect)[handler](target(), ...args);
  };
});
