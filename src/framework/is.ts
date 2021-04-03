/* Detect or check a type */
/**
 * is
 * Determines a Json Schema type or JS type or the equality of data-type/type
 *
 * @name is
 * @function
 *
 * @param {Array} data - Any data
 * @param {String} evtType - Any Json Schema type or JS type
 *
 * @return {String|Boolean}
 * The SCHEMATYPE (JSON Schema) OR if not available JS type OR
 * if `evtType` is supplied the equality of data's type and `evtType`
 */
export type TOF = 'undefined'|'null'|'NaN'|'number'|'integer'|'string'|'boolean'|'symbol'|'function'|'object'|'array'|'bigint';
export default function is(data: any, evtType?: TOF): any {
  let type: string = (typeof data);
  if (data === void 0) {
    type = 'undefined';
  } else if (data === null) {
    type = 'null';
  } else if (type === 'number') {
    if (isNaN(data)) {
      type = 'NaN';
    } else if ((isFinite(data) && Math.floor(data) === data)) {
      type = 'integer';
    }
  } else if (type === 'object') {
    type = (data instanceof Array) ? 'array' : 'object';
  }
  if (typeof evtType === 'string') {
    return (evtType === 'number' && type === 'integer') ? true : (evtType === type);
  }
  return type;
}
