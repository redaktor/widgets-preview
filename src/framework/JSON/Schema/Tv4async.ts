'use strict'
import { REQ, RES, NEXT } from '../../Server/interfaces';
/* Sebastian Lasse, redaktor NOTE: see https://github.com/geraintluff/tv4 README
 * This file provides tv4 support for asynchronous validation (fetching schemas)
 * It is using redaktor.RequestMixin for web-URL, (TBA: ipfs-URL) OR local files
 * NOTE : tv4.asyncValidate returns Promise OR callback if provided ...
 */

import { lang } from '../../../dojo/core/main';
import Promise from '@dojo/framework/shim/Promise';
import RequestMixin from '../../Request/main';
import URL from '../../url/main';
import * as path from 'path';
import * as tv4 from 'tv4';

export interface TV4 extends tv4.TV4 {
  hasAsync: boolean;
  validate: any;
  syncValidate: any;
}

class Tv4async extends RequestMixin {
  static errorCodes: tv4.ErrorCodes = tv4.errorCodes;
  protected schemaUrl: string;
  protected baseUrl: string;
  protected schema: any = {};
  protected failed: any = {};
  tv4: TV4;
  constructor() {
    super();
    // Provides support for asynchronous validation (fetching schemas) using redaktor.RequestMixin
    // Callback is optional third argument to tv4.validate() - if not present, Promise
    //     callback(result, error);
    if (typeof (<TV4>tv4).hasAsync === 'undefined') {
      (<TV4>tv4).hasAsync = true;
      (<TV4>tv4).syncValidate = tv4.validate;

    	(<TV4>tv4).validate = (
        data: any, schema: any, callback: any,
        checkRecursive: boolean, banUnknown: boolean, multipleErr: boolean = true
      ) => {
        //const tv4V = tv4[['validate',((multipleErr)?'Multiple':'Result')].join('')];
        return new Promise((resolve: any, reject: any) => {
      		var result = (<TV4>tv4).syncValidate(data, schema, checkRecursive, banUnknown);
          var missingSchemas = this.tv4.missing.reduce( (a: any, s: string) => {
            if (a.indexOf(s) < 0 && !this.failed.hasOwnProperty(s)) {
              a.push(s);
            } else if (this.failed.hasOwnProperty(s)) {
              if (Date.now() - this.failed[s] > 30000) { a.push(s); }
            }
            return a;
          }, []);

      		if (!missingSchemas.length) {
            //console.log(tv4.validateMultiple(data, schema, checkRecursive, banUnknown));

            if (typeof callback != 'function') {
              resolve(tv4.validateMultiple(data, schema, checkRecursive, banUnknown));
            } else {
              callback(result);
            }

      		} else {
      			// Make a request for each missing schema
            missingSchemas = this.tv4.missing.map((schemaUri: string): Promise<any> => {
              const hasSchema = tv4.getSchema(schemaUri);

              //console.log('missing',hasSchema,schemaUri);
              if (hasSchema) {
                return Promise.resolve(hasSchema);
              }

              /* TODO - check if failed before - FIXME */
      				return this.get({url: this._getUrl(schemaUri), responseType: 'json'}).then((fetchedSchema: any) => {
                tv4.addSchema(schemaUri, fetchedSchema);
                return fetchedSchema;
              },
              (e: Error) => {
                this.failed[schemaUri] = Date.now();
                /* If there's an error, just use an empty schema */
                tv4.addSchema(schemaUri, {});
                return {};
              });

      			});

            Promise.all(missingSchemas).then((schemas: any[]) => {
              resolve( (<TV4>tv4).validate(data, schema, callback, checkRecursive, banUnknown) );
            },
            (e: Error) => {
              reject(e);
            });
      		}

        });
    	}
    }
    this.tv4 = (<TV4>tv4);
  }

  protected _getUrl(u: string) {
    const _url = URL.parse(u);
    if ((!(_url.host) || !_url.host.length) && _url.pathname.charAt(0) != path.sep) {
      /* TODO FIXME file:// protocol */
      return path.join(this.baseUrl, u);
    }
    return u;
  }

  static possibleSchemas(schema: any, dataPath: string) {
		var parts = dataPath.split('/').slice(1);
		var options = [schema];
		while (parts.length) {
			var part = parts.shift().replace(/~1/g, '/').replace(/~0/g, '~');
			// Expand all $refs, anyOf, allOf, oneOf
			var expandedOptions: any[] = [];
			while (options.length) {
				var option = options.shift();
				if (typeof option['$ref'] == 'string') {
					option = tv4.getSchema(option['$ref']);
				}
				if (expandedOptions.indexOf(option) !== -1) continue;
				if (option.allOf) {
					options = [].concat(option.allOf).concat(options);
				}
				if (option.anyOf) {
					options = [].concat(option.anyOf).concat(options);
				}
				if (option.oneOf) {
					options = [].concat(option.oneOf).concat(options);
				}
				expandedOptions.push(option);
			}

			var newOptions: any[] = [];
			while (expandedOptions.length) {
				var option = expandedOptions.shift();
				if (/^(0|[1-9][0-9]*)$/.test(part)) {
					if (Array.isArray(option.items)) {
						if (option.items[part]) {
							newOptions.push(option.items[part]);
						} else if (option.additionalItems) {
							newOptions.push(option.additionalItems);
						}
					} else if (option.items) {
						newOptions.push(option.items);
					}
				}
				if (option.properties && option.properties[part]) {
					newOptions.push(option.properties[part]);
				} else if (option.additionalProperties) {
					newOptions.push(option.additionalProperties);
				}
			}
			options = newOptions;
		}
		return options;
	}
}

export default Tv4async;
