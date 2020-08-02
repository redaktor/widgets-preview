
/* TODO -
aspect : before / around / after

ary   Creates a function that invokes func, with up to n arguments, ignoring any additional arguments.

bind  Creates a function that invokes func with the this binding of thisArg and partials prepended to the arguments it receives.
The _.bind.placeholder value, which defaults to _ in monolithic builds, may be used as a placeholder for partially applied arguments.

bindKey Creates a function that invokes the method at object[key] with partials prepended to the arguments it receives.
This method differs from _.bind by allowing bound functions to reference methods that may be redefined or don’t yet exist.
The _.bindKey.placeholder value, which defaults to _ in monolithic builds, may be used as a placeholder for partially applied arguments.

curry   Creates a function that accepts arguments of func and either invokes func returning its result, if at least arity number of arguments
have been provided, or returns a function that accepts the remaining func arguments, and so on. The arity of func may be specified if func.length
is not sufficient.
The _.curry.placeholder value, which defaults to _ in monolithic builds, may be used as a placeholder for provided arguments.

curryRight This method is like _.curry except that arguments are applied to func in the manner of _.partialRight instead of _.partial.

debounce Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time
the debounced function was invoked. The debounced function comes with a cancel method to cancel delayed func invocations and a flush method
to immediately invoke them. Provide options to indicate whether func should be invoked on the leading and/or trailing edge of the wait timeout.
The func is invoked with the last arguments provided to the debounced function. Subsequent calls to the debounced function return the result
of the last func invocation.

defer Defers invoking the func until the current call stack has cleared. Any additional arguments are provided to func when it’s invoked.

delay Invokes func after wait milliseconds. Any additional arguments are provided to func when it’s invoked.

flip  Creates a function that invokes func with arguments reversed.

memoize   Creates a function that memoizes the result of func. If resolver is provided, it determines the cache key for storing the result based
on the arguments provided to the memoized function. By default, the first argument provided to the memoized function is used as the map cache key.
The func is invoked with the this binding of the memoized function.
Note: The cache is exposed as the cache property on the memoized function. Its creation may be customized by replacing the
_.memoize.Cache constructor with one whose instances implement the Map method interface of delete, get, has, and set.

negate    Creates a function that negates the result of the predicate func. The func predicate is invoked with the this binding and arguments
of the created function.

once      Creates a function that is restricted to invoking func once. Repeat calls to the function return the value of the first invocation.
The func is invoked with the this binding and arguments of the created function.

overArgs  Creates a function that invokes func with its arguments transformed.
function doubled(n) { return n * 2; }
function square(n) { return n * n; }
var func = _.overArgs(function(x, y) {
  return [x, y];
}, [square, doubled]);

partial / partialRight

rearg   Creates a function that invokes func with arguments arranged according to the specified indexes where the argument value
at the first index is provided as the first argument, the argument value at the second index is provided as the second argument, and so on.

throttle Creates a throttled function that only invokes func at most once per every wait milliseconds.
The throttled function comes with a cancel method to cancel delayed func invocations and a flush method to immediately invoke them.
Provide options to indicate whether func should be invoked on the leading and/or trailing edge of the wait timeout. The func is invoked with
the last arguments provided to the throttled function. Subsequent calls to the throttled function return the result of the last func invocation.

unary   Creates a function that accepts up to one argument, ignoring any additional arguments.

wrap    Creates a function that provides value to wrapper as its first argument. Any additional arguments provided to the function are appended
to those provided to the wrapper. The wrapper is invoked with the this binding of the created function.
*/
