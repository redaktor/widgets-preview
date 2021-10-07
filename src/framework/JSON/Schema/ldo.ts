import { REQ, RES, NEXT } from '../../Server/interfaces';
/* Contributor: Sebastian Lasse, redaktor NOTE:
 * This modified file adds JSON hyper-schema routing / RFC 6570
 * see file ./index, '-mod' comments for usage in an Express Router
 */

import { lang } from '../../../dojo/core/main';
import { getProperty } from '../../util/main';
import * as minimatch from 'minimatch';
import * as uriTemplates from 'uri-templates';
/* SCHEMA related */
function expressSyntax(arg: string, ldo: any, customCat?: string) {
  // ...* = explode = array
  // ...: = maxLength
  var explode = (arg.slice(-1) === '*') ? '*' : '';
  var key = ((explode === '*') ? arg.slice(0,-1) : arg).split(':')[0];
  var cat = (customCat) ? customCat : 'params'; // becomes default of customCat in TS
  if (typeof ldo === 'object' && ldo.hasOwnProperty('schema')) {
    var res = getProperty(ldo.schema, ['properties',cat,'properties',key,'pattern'].join('.'));
    if (res) {
      return [key,'(',res,')',explode].join('');
    }
  }
  return [key,explode].join('');
}
function expressPath(_: any, op: string, args: string) {
  // path seperator '.' OR '/'
  // runs in scope of ldo
  return args.split(',').map(function(arg){
    return [op,':',expressSyntax(arg,this)].join('');
  }).join('');
}
function expressAnchor(_: any, arg: string) {
  // crosshatch anchor
  // runs in scope of ldo
  return ['(?:[/]*)?#:',expressSyntax(arg,this,'anchor')].join('');
}

export default function toRoutes(ldo: any = {}, i: number) {
	if (!this._if) { this._if = {}; }
  const ID = (typeof ldo.id === 'string' && ldo.id.length) ? ldo.id.replace(/(^[#]*)/, '') : 'link'+i;

	/* TODO - see https://github.com/geraintluff/uri-templates/issues/19 */
	var ldoTpl = Object.create(uriTemplates(ldo.href));
	ldo = lang.mixin(ldoTpl, ldo);

	for (var glob in this._if) {
		if (ID != glob && minimatch(ID, glob)) {
			if(!this._if.hasOwnProperty(ID)) { this._if[ID] = new Array(); }
			Array.prototype.push.apply(this._if[ID], this._if[glob]);
		}
	}

  var o = {
    linkId: i, /* don't use "private" pathes in here, will be in "public" REQ */
    ldo: ldo,
    method: (ldo.method || 'GET').toLowerCase(),
    path: ldo.href.replace(/(\{\+)/g, '{') // '+' encoding
          .replace(/(\{[?&].*\})/g, '') // query
          .replace(/\{([./])?([^}]*)\}/g, expressPath.bind(ldo))
          .replace(/\{[#]([^}]*)\}/g, expressAnchor.bind(ldo))
  };
	/* 'ldo: '
	{ fill: [Function], fromUri: [Function],
  varNames: [ 'id', 'x', 'y' ], template: '/person{/id}{?x,y}' }
	*/
	if (this._if.hasOwnProperty(ID)) {
    this._if[ID].unshift(o);
		this[o.method].apply(this, this._if[ID]);
	}

  return o;
}
/**/
