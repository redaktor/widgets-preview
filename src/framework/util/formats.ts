import Symbol from '@dojo/framework/shim/Symbol';
import { toTree } from './array/main';
var toS = Object.prototype.toString;

/* TODO - ADD TYPE + check if not in list and if valid parent */
/* toString
null values SHOULD be replaced by the text "null"
boolean values SHOULD be replaced by their lower-case equivalents: "true" or "false"
numbers SHOULD be replaced with their original JSON representation.
*/

/*

	_.isArrayBuffer
	_.isArrayLike
	_.isArrayLikeObject
	_.isObjectLike

	_.isNil,_.isNull

_.isSymbol
_.isBuffer
_.isMap
_.isSet
_.isTypedArray
_.isWeakMap
_.isWeakSet

_.isNative
_.isArguments
_.isElement
_.isEmpty
_.isEqual
_.isEqualWith
_.isError
_.isLength

_.isMatch
_.isMatchWith
_.isFinite
_.isNaN
_.isSafeInteger
*/
const _SCHEMATYPES: any= {
  array: {description: 'A JSON array'},
  boolean: {description: 'A JSON boolean.'},
  integer: {description: 'A JSON number without a fraction or exponent part.'},
  number: {description: 'Any JSON number. Number includes integer.'},
  null: {description: 'The JSON null value.'},
  object: {description: 'A JSON object.'},
  string: {description: 'A JSON string.'}
}

export const TYPES = [
  {
    id: 'null',
		parent: null as string,
    is: (v: any) => (v === null),
		from: {
			any: (v: any) => null as string,
		}
  },
  {
    id: 'array',
    parent: 'object',
    is: (v: any) => (v instanceof Array),
    from: {
      string: (s: any) => {
        if (s.substring(0,1) === '[' && s.slice(-1) === ']') {
          try { var n = JSON.parse(s); } catch (e) {}
          if (Array.isArray(n)) { return n; }
        }
        return s.split(String(',')).map(Function.prototype.call, String.prototype.trim);
      },
      any: (v: any) => [v]
    }
  },
  {
    id: 'boolean',
    parent: null as string,
    is: (v: any) => (typeof v === 'boolean'),
    from: {
      string: (s: any) => (s.toLowerCase() === 'false') ? false : (!!s),
      any: (v: any) => (!!v)
    }
  },
  {
    id: 'isodate',
    parent: 'string',
    is: function(v: any) {
      if (typeof v === 'string') {
        var re = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
        return re.test(v);
      }
      return false;
    },
		from: {
			string: function(v : string) {
        // four-digit year
        var d = '0000'.substr(0,4-v.length)+v;
        // pattern for partial dates
        d += '0000-01-01T00:00:00Z'.substring(v.length);
        return exports.to(d, 'date');
			}
			/* TODO number etc. */
		}
  },
  {
    id: 'date',
    parent: 'object',
    is: (v: any) => (v instanceof Date),
		from: {
			integer: function(v : number) {
				const d = new Date(v);
				return (isNaN(d.getTime())) ? void 0 : d;
			},
			number: function(v : number) {
				const d = new Date(v);
				return (isNaN(d.getTime())) ? void 0 : d;
			},
			string: function(v : string) {
				var d : any;
				var isoDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?Z$/.exec(v);
        if (isoDate) {
          d = new Date(Date.UTC(+isoDate[1], +isoDate[2] - 1, +isoDate[3],
                    +isoDate[4], +isoDate[5], +isoDate[6], +isoDate[7] || 0));
        } else {
          d = new Date(+v);
        }
				return (isNaN(d.getTime())) ? void 0 : d;
			}
		}
  },
  {
    id: 'integer',
    parent: 'number',
    is: (v: any) => (((isFinite(v) && Math.floor(v) === v))),
    from: {
      string: (s: string) => {
        if (!s.trim().length) { return s; }
        var n = Number(String(s.replace(/ /g, '')));
        /* TODO - if NaN : .nlp */
        if (typeof n === 'number') { return (isNaN(n)) ? s : n; }
      },
      number: (n: number) => Math.round(n),
      boolean: (b: boolean) => (b === true) ? 1 : 0,
      date: (d: Date) => +d
    }
  },
  {
    id: 'number',
    parent: null as string,
    is: (v: any) => (typeof v === 'number'),
    from: {
      string: (s: any) => {
        if (!s.trim().length) { return s; }
        var n = Number(String(s.replace(/,/g, '.').replace(/ /g, '')));
        return ((isNaN(n) === true) ? void 0 : n);
        /* TODO - if NaN : .nlp */
      },
      boolean: (b: boolean) => (b === true) ? 1 : 0,
      date: (d: Date) => +d
    }
  },
  {
    id: 'object',
		parent: null as string,
    is: (v: any) => (typeof v === 'object'),
    from: {
      array: (a: any[]) => {
        return a.reduce(function(o: any, v: any, i: number) {
          o[i.toString()] = v;
          return o;
        }, {});
      },
      string: (s: any) => {
        var o = s;
        try { o = JSON.parse(s); } catch (e) { return void 0; }
        return (typeof o === 'object') ? o : s;
      }
    }
  },
  {
    id: 'string',
		parent: null as string,
    is: (v: any) => (typeof v === 'string'),
		from: {
      symbol: (v: any) => (Symbol && Symbol.prototype.toString) ? Symbol.prototype.toString.call(v) : '',
      boolean: (b: boolean) => b.toString(),
			date: (d: any) => d.toString(),
      any: (v: any) => {
        var result = (v + '');
        return (result == '0' && (1 / v) === -(1 / 0)) ? '-0' : result;
      }
		}
		/* else if (t === 'array') {
			// If user authorize array and strings...
			if (schema.items || schema.properties)
				return v;
			return v.join(String(schema.joinWith || ','));
		} else if (t === 'object') {
			// If user authorize objects and strings...
			if (schema.items || schema.properties)
				return v;
			return JSON.stringify(v);
		}
    */
  },
  {
    id: 'symbol',
    parent: null as string,
    is: (v : any) => (typeof v === 'symbol' || (v && typeof v === 'object' && toS.call(v) === '[object Symbol]')),
    from: {

    }
  },
  {
    id: 'regex',
    parent: 'object',
    is: (v: any) => ((v instanceof RegExp) && v.ignoreCase),
    from: {
      /* TODO - FIXME .regex */
      glob: (s: string) => {
        s = s.replace(/([\\|\||\(|\)|\[|\{|\^|\$|\*|\+|\?|\.|\<|\>])/g,
          function(x){return '\\'+x;}).replace(/\\\*/g,'.*').replace(/\\\?/g,'.?');
        if (s.substring(0,2) !== '.*') {
          s = '^'+s;
        } else {
          s = s.substring(2);
        }
        if (s.substring(s.length-2) !== '.*') {
          s = s+'$';
        } else {
          s = s.substring(0, s.length-2);
        }
        return new RegExp(s, 'i');
      },
      string: (s: string) => new RegExp(s, 'i')
    }
  },
  {
    id: 'REGEX',
    parent: 'object',
    is: (v: any) => ((v instanceof RegExp)),
    from: {
      /* TODO - FIXME .regex */
      string: (s: string) => new RegExp(s)
    }
  },
  {
    id: 'glob',
    parent: 'string',
    is: function(v: any) {
      /* TODO - FIXME */
      if(typeof v === 'string' && v.indexOf('*') > -1) {
        return true;
      }
      return false;
    },
    from: {
      /* TODO - FIXME */
      //string: (s: string) =>
    }
  },
  {
    id: 'TEST',
    parent: 'glob',
    is: function(v: any) {
      /* TODO - FIXME */
      if(typeof v === 'string' && v.indexOf('**') > -1) {
        return true;
      }
      return false;
    },
    from: {}
  }
  /*, //TODO FIXME // string transformation // case */
];

export const TYPEMAP: any = {};
export const TYPETREE = toTree(TYPES);
TYPES.map((rootO: any, i: number) => {
  if (typeof rootO.id === 'string') {
    TYPEMAP[rootO.id] = i;
    if (_SCHEMATYPES.hasOwnProperty(rootO.id)) {
      _SCHEMATYPES[rootO.id].format = rootO;
    }
  }
});
export const SCHEMATYPES = _SCHEMATYPES;
