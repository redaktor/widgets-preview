import { lang } from '../../dojo/core/main';

/* Detect or check a type */
/**
 * is
 * Determines a Json Schema type or JS type or the equality of data-type/type
 *
 * @name is
 * @function
 *
 * @param {Array} data - Any data
 * @param {Object} evtType - Any Json Schema type or JS type
 *
 * @return {String|Boolean}
 * The SCHEMATYPE (JSON Schema) OR if not available JS type OR
 * if `evtType` is supplied the equality of data's type and `evtType`
 */
type TOF = 'undefined'|'null'|'NaN'|'number'|'integer'|'string'|'boolean'|'symbol'|'function'|'object'|'array';
export function is(data: any, evtType?: TOF): any {
  let type: string = (typeof data);
  if (data === void 0) {
    type = 'undefined';
  } else if (data === null) {
    type = 'null';
  } else if (typeof data === 'number') {
    if (isNaN(data)) {
      type = 'NaN';
    } else {
      type = ((isFinite(data) && Math.floor(data) === data)) ? 'integer' : 'number';
    }
  } else if (typeof data === 'object') {
    type = (data instanceof Array) ? 'array' : 'object';
  } else {
    type = (typeof data);
  }
  if (typeof evtType === 'string') {
    return (evtType === 'number' && type === 'integer') ? true : (evtType === type);
  }
  return type;
}
