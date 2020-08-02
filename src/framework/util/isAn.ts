import { lang } from '../../dojo/core/main';
import { SCHEMATYPES, TYPES } from './formats';
import { getDottedProperty } from './lang';

/* TODO : see ./formats */

function _getFormat(type: string, describe: any): any {
  if (describe !== true) { return type; }
  var o = {
    id: type,
    description: ['The JS',type,'type.'].join(' ')
  };
  if (SCHEMATYPES.hasOwnProperty(type)) {
    lang.mixin(o, SCHEMATYPES[type]||{description: ''});
  }
  TYPES.map((fO) => {
    if (fO.id === type) {
      o = lang.mixin(fO, SCHEMATYPES[type]||{description: ''});
    }
  });
  return o;
}
function _getChildren(data: any, rootArr: any[], formatO: any, describe: any) {
  if (!formatO.hasOwnProperty('children') || !Array.isArray(formatO.children)) {
    return rootArr;
  }
  formatO.children.map((format: any) => {
    if (format.is(data)) {
      rootArr.push(_getFormat(format.id, describe));
      if (format.hasOwnProperty('children') && Array.isArray(format.children)) {
        rootArr = _getChildren(data, rootArr, format, describe);
      }
    }
    return format;
  });
  return rootArr;
}
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
export function isAn(data: any, typeOrDescribe?: string|boolean): any {
  const type = is(data);
  if ((data === void 0 && typeof typeOrDescribe === 'string' && typeOrDescribe !== 'undefined') ||
      (data === null && typeof typeOrDescribe === 'string' && typeOrDescribe !== 'null')) {
    return false;
  }

  const root: any[] = [_getFormat(type, typeOrDescribe)];
  if (getDottedProperty(SCHEMATYPES, [type, 'format'])) {
    if (SCHEMATYPES[type].format.parent) {
      var pType = SCHEMATYPES[type].format.parent;
      if (typeOrDescribe === true) { root[0].parent = pType; }
      root.unshift(_getFormat(pType, typeOrDescribe));
    }
    return _getChildren(data, root, SCHEMATYPES[type].format, typeOrDescribe);
  }

  if (typeOrDescribe !== true) {
    root[0] = root[0].id;
  }
  if (typeof typeOrDescribe === 'string') {
    return (root.indexOf(typeOrDescribe) >= 0);
  }
  return root;
}

// string, non empty
function str(s: string) {
	return (typeof s === 'string' && s.trim() !== '');
}

/* TODO ?
export function ifIs(value: any, isType: string) {
  var type = isSync(value);
  if (!JSONTYPES.hasOwnProperty(isType) && (typeof value === 'number') && (isNaN(value))) {
      type = 'NaN';
  }
  (isType === type) ? ifIs.resolve(true) : ifIs.reject(false);
}
*/
