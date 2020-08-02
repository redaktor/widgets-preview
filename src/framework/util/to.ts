import { TYPEMAP, TYPES } from './formats';
import { is, isAn } from './is';

export function to(data: any, type: string) {
  var toO: any = TYPES[TYPEMAP[type]];
  /* Exit early to avoid a performance hit in some environments */
  if (!is(toO,'object') || is(data,type)) { return data; }
  /* Complex types before schema types */
  const formats = isAn(data).reverse();
  var coerced: any;
  for (var f = 0; f < formats.length; f++) {
    var key = formats[f];
    if (toO.from && typeof toO.from[key] === 'function') {
      coerced = toO.from[key](data);
    } else if (toO.from && typeof toO.from.any === 'function') {
      coerced = toO.from.any(data);
    }
    if (isAn(coerced, type)) {
      data = coerced;
      break;
    }
  }
  return data;
  /* Coerce / convert datatypes */
  /*
  // TODO expose toFunctions : toArray (w camelCase())...  - mention here in DOC
  Object.keys(TO).forEach(function(key) {
  	exports[['to', TO.titlecase(key)].join('')] = TO[key];
  });
  */
}
