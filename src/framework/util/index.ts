export {
  TYPES,
  TYPEMAP,
  TYPETREE,
  SCHEMATYPES
} from './formats';
export {
  is,
  isAn
} from './is';
export {
  to
} from './to';
export {
  log,
  pwLog,
  dumpError,
  syntaxLog,
  syntaxHighlight,
  strColor
} from './log';
export {
  applyMixins,
  functor,
  getDottedProperty,
  getProperty,
  exists,
  copy,
  arrToObjByKey,
  byteLength,
  escapeRegExp,
  hash
} from './lang';
export {
  flatten,
  toTree,
  hasL /* TODO FIXME - naming */
} from './array/main';
export {
  truncate
} from './string/main';
export {
  objectPromiseAll
} from './promise';
