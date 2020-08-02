'use strict'
import { REQ, RES, NEXT, APP, ROUTER } from '../../Server/interfaces';

import has from '@dojo/framework/core/has';
import { lang } from '../../../dojo/core/main';
import Promise from '@dojo/framework/shim/Promise';
import Tv4async from './Tv4async';
import toRoutes from './ldo';
import jsonPointer from '../pointer/main';
import { is, to, log, truncate } from '../../util/main';
import * as path from 'path';

/* TODO - FIXME
- see comment in https://github.com/geraintluff/schema-org-gen/pull/4 array/coerce:
(schema.org): EVENTUAL deprecate generate changes and use coerce for schema.org

- tv4 - logic in coerce : ENUM schemas MUST NOT have `type` !!!
*/

class Schema extends Tv4async {
  static fixes: any = {}
  promise: Promise<any>;

  constructor(
    protected schema: any, protected language: string = 'en',
    protected baseUrl: string = undefined, protected fixes: any = {},
    protected dereference: boolean = false, protected checkRecursive: boolean = true,
    protected banUnknown: boolean = false, protected useDefault: boolean = true
  ) {
    super();
    this.isObject(schema) && schema.hasOwnProperty('schema') &&
    !('$schema' in schema) && lang.mixin(this, schema);

    if (!this.baseUrl) {
      this.baseUrl = process.cwd() || this._getCallerDir();
    }
    this.init();
  }
  protected init() {
    for (var code in this.fixes) {
      Schema.addFix(code, this.fixes[code]);
    }

    this.schemaUrl = this.schema;
    if (is(this.schema,'string')) {
      // check if this.schema is still a JSON schema
      try {
        this.schema = JSON.parse(this.schema);
        this.schemaUrl = this._getUrl(this.schema.id);
      } catch(err) {}
    }
    this.promise = new Promise((resolve: any, reject: any) => {
      const derefCB = (err: Error, fullSchema: any) => {
        if (err) { return reject(err); }
        this.schema = fullSchema;
        return resolve(fullSchema);
      }
      const returnSchema = (s?: any) => {
        if (is(s,'object')) {
          this.schema = s;
        }
        if (this.dereference) {
          try {
            var deref: any = require('json-schema-deref');
            deref(this.schema, derefCB);
          } catch (e) {}
        } else {
          return resolve(this.schema);
        }
      }
      if (is(this.schema,'object')) {
        returnSchema();
      } else if (is(this.schema,'string')) {
        // load ...
        this.schemaUrl = this._getUrl(this.schema);
        this.baseUrl = path.dirname(this.schemaUrl);
        this.get({url: this.schemaUrl, responseType: 'json'}).then(
          returnSchema,
          this.schemaErr('load', this.schema)
        );
      }
    });
  }
  private _getProperty(key: string, schema: any): any {
    if (schema.hasOwnProperty(key)) {
      return schema[key];
    } else if (schema.hasOwnProperty('$ref')) {
      return this._getProperty(key, this.tv4.getSchema(schema['$ref']));
    }
    return null;
  }
  protected _getCallerDir() {
    var originalFunc = (<any>Error).prepareStackTrace;
    var callerfile: any;
    try {
      var err = new Error();
      var currentfile: any;
      (<any>Error).prepareStackTrace = function (err: any, stack: any) {
        return stack;
      };
      currentfile = (<any>err.stack)['shift']().getFileName();

      while (err.stack.length) {
        callerfile = (<any>err.stack)['shift']().getFileName();
        if(currentfile !== callerfile) break;
      }
    } catch (e) {}
    (<any>Error).prepareStackTrace = originalFunc;
    return path.dirname(callerfile);
  }
  protected schemaErr(verb: string = 'process', url: string = '') {
    /* TODO - FIXME */
    return (err: Error) => {
      console.log(['Could not',verb,'Schema:', url].join(' '), err);
    }
  }
	protected fromPath(schema: any, path: string) {
		var parts = path.split('/').slice(1);
		while (parts.length) {
			if (is(schema['$ref'],'string')) {
				schema = this.tv4.getSchema(schema['$ref']);
			}
			var part = parts.shift().replace(/~1/g, '/').replace(/~0/g, '~');
			schema = schema[part];
		}
		return schema;
	}

  deref() {
    /*LEGACY, if you want do defer deref and created schema w. {deref: false} */
    if (this.dereference === true) { return this.promise; }
    this.dereference = true;
    this.init();
    return this.promise;
  }

  getProperty(key: string, schemas?: any) {
    if (typeof schemas !== 'object') {
      schemas = [this.schema];
    } else if (!is('array', schemas)) {
      schemas = [schemas];
    }
    for (var i = 0; i < schemas.length; i++) {
  		var schema = schemas[i];
      const prop = this._getProperty(key, schema);
      if (prop !== null) return prop;
  	}
    return null;
  }

	coerce(data: any, customSchema: any) {
    const _coerce = (schema: any) => {
      var seenErrors: any = {};
      return this.tv4.validate(data, schema).then((result: any) => {
    		var changes = 1;
    		while (changes) {
    			changes = 0;
    			result.data = data;
          result.schema = schema;
          // console.log('result.errors',result.errors);
    			for (var i = 0; i < result.errors.length; i++) {
    				var e = result.errors[i];
    				var signature = JSON.stringify([e.code, e.dataPath, e.schemaPath]);
    				if (seenErrors[signature]) continue;

    				changes++;
    				seenErrors[signature] = true;
    				var subData = jsonPointer(data, e.dataPath);

    				var schemaValue = this.fromPath(schema, e.schemaPath);
    				var fixes = Schema.fixes[e.code] || [];

    				for (var j = 0; j < fixes.length; j++) {
    					var fixFunction = fixes[j].bind(this);
    					var fixedValue = fixFunction(subData, schemaValue, e, schema, data);
    					if (typeof fixedValue !== 'undefined') {
    						if (e.dataPath) {
    							jsonPointer(data, e.dataPath, fixedValue);
    						} else {
    							data = fixedValue;
    						}
    						break;
    					}
    				}
    			}
    		}
    		return this.tv4.validate(result.data, schema).then((vO: any) => {
          return lang.mixin(vO, {
            data: result.data,
            schema: result.schema
          });
        });
      });
    }
    return (customSchema) ? _coerce(customSchema) : this.promise.then(_coerce, this.schemaErr());
	}

  validate(data: any, multipleErr: boolean = true) {
    return this.promise.then((schema: any) => {
      return this.tv4.validate(data, schema, this.checkRecursive, this.banUnknown);
    });
  }

  /* EXTENSION FUNCTIONS FOR express w. Schema */
  validateRoute(req: REQ, res: RES, next: NEXT) {
    const trailingRegex = new RegExp('\\' + path.sep + '+$', 'g');
    const allParams = req.ldo.fromUri(req.url.replace(trailingRegex, ""));
    const body = req.body||{};
    /* TODO support (unspecified) URL-params validation of heroku
    // /{(%23%2Fdefinitions%2Faddon%2Fdefinitions%2Fidentity)} */

    const data = lang.mixin(allParams, body);

    if (!is(req.linkId,'integer') || !(Object.keys(data).length)) {
      // nothing to validate ...
      next();
      return Promise.resolve({
        errors: [],
        missing: [],
        valid: true,
        data: (data || {}),
        schema: {}
      });
    }

    const urlToLDO = [this.schemaUrl,'#/links/',req.linkId,'/schema'].join('');
    const schema = {'$ref': urlToLDO};
    const option: any = {params: {}, query: {}, body: {}};
    return this.coerce(data, schema).then(
      (coerceResult: any) => {
        var type = '';
        for (var key in data) {
          if (typeof req.body === 'object' && req.body.hasOwnProperty(key)) {
            type = 'body';
          } else {
            type = (req.query.hasOwnProperty(key)) ? 'query' : 'params';
          }
          option[type][key] = data[key];
        }
        console.log('data', option.query);
        Object.defineProperty(req, 'params', {
          enumerable: true,
          writable: true,
          value: option.params
        });
        Object.defineProperty(req, 'query', {
          enumerable: true,
          writable: true,
          value: option.query
        });
        Object.defineProperty(req, 'body', {
          enumerable: true,
          writable: true,
          value: option.body
        });

        next();
        return req; //coerceResult;
      },
      (e: Error) => {
        /* TODO FIXME !!!!!! - error handling and REJECT ROUTE */
        next(e);
        return e;
      }
    );
  }
  route(router: any) {
  	this.promise.then((schema: any) => {
      if (schema.links && Array.isArray(schema.links)) {
        schema.links.map(toRoutes.bind(router));
      }
  		return schema;
  	}, (err: Error) => {
  		return err;
  	});
    return this;
  }

  /* STATIC FUNCTIONS */
  static addFix(code: any /*string|string[]*/, fixFunction: any) {
    if (Array.isArray(code)) {
      code.map((c: string) => {
        Schema.addFix(c, fixFunction);
      });
      return Schema;
    }
    if (typeof Schema.errorCodes[code] === 'undefined') {
      code = ['"',code,'"'].join('');
      var keys = JSON.stringify(Object.keys(Schema.errorCodes));
      log([{
        error: ['Could not add Fix: Code', code, 'is not an Error Code.'].join(' ')
      }, {warning: 'MUST be one of:'}, {warning: keys}]);
      return Schema;
    }
    code = Schema.errorCodes[code].toString();
    Schema.fixes[code] = Schema.fixes[code] || [];
    Schema.fixes[code].push(fixFunction);
    return Schema;
  }
}

/* OUR FIXES for .coerce - they run in the scope of Schema's instance */
const DEFAULT_FALLBACK = [
  'ENUM_MISMATCH','NUMBER_MULTIPLE_OF','NUMBER_MINIMUM','NUMBER_MINIMUM_EXCLUSIVE',
  'NUMBER_MAXIMUM_EXCLUSIVE','NUMBER_NOT_A_NUMBER',
  'STRING_LENGTH_LONG','STRING_LENGTH_SHORT','STRING_PATTERN',
  'ARRAY_LENGTH_SHORT','ARRAY_LENGTH_LONG','ARRAY_UNIQUE',
  'OBJECT_PROPERTIES_MINIMUM','OBJECT_PROPERTIES_MAXIMUM'
];

function truncateArray(data: any, p: string) {
  return data.slice(0,p);
}
function removeAdditional(d: any, p: string, e: any, s: any, baseData: any) {
  if (e.hasOwnProperty('dataPath')) { jsonPointer(baseData).remove(e.dataPath); }
  return;
}
function useDefaultProperty(data: any, property: string, error: any, baseSchema: any) {
  if (!this.useDefault || !property || !baseSchema) { return data; }
	var missingPath = error.dataPath + '/' + property.replace(/~/g, '~0').replace(/\//g, '~1'); // as JSON Pointer
	var possibleSchemas = Schema.possibleSchemas(baseSchema, missingPath);
  data[property] = this.getProperty('default', possibleSchemas);
  return data;
}
function useDefault(data: any, property: string, error: any, baseSchema: any) {
  if (!this.useDefault || !baseSchema) { return data; }
  var missingPath = error.dataPath;
	var possibleSchemas = Schema.possibleSchemas(baseSchema, missingPath);
  data = this.getProperty('default', possibleSchemas);
  return data;
}

/** Coerce Fix: Basic type-juggling */
Schema.addFix('INVALID_TYPE', to);
/** Coerce Fix: x */
Schema.addFix('STRING_LENGTH_LONG', truncate);
/** Coerce Fix: x */
Schema.addFix('ARRAY_LENGTH_LONG', truncateArray);
/** Coerce Fix: x */
Schema.addFix('ARRAY_ADDITIONAL_ITEMS', removeAdditional); /* TODO : test it */
/** Coerce Fix: x */
Schema.addFix('OBJECT_ADDITIONAL_PROPERTIES', removeAdditional);
/** Coerce Fix: Required properties in objects, fill with `default` */
Schema.addFix('OBJECT_REQUIRED', useDefaultProperty);
/** Coerce Fix: Schema having `default`, fill with `default` */
Schema.addFix(DEFAULT_FALLBACK, useDefault);


/* Coerce Fix: TODO FIXME : Schema.addFormat incl. coerce :
Schema.addFix('FORMAT_CUSTOM', (data: any, property: string, error: any, baseSchema: any) => {
  console.log(data,property,error,baseSchema)
});
// and KEYWORD_CUSTOM ? */
export default Schema;
