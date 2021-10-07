/* TODO - naming ?
Coercion = "Implicit conversion, is automatically done."
Casting = "Explicit conversion."
*/

(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== void 0) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", "dojo/lang", "./schemasaurus.min"], function(require, exports) {

  const lang = require('dojo/lang');
  const saur = require('./schemasaurus.min');
  const _SANITIZE = {
    string: {
      '\\s{64,}': ''
    }
  };
  const JSONTYPES = {
    array: 'A JSON array',
    boolean: 'A JSON boolean.',
    integer: 'A JSON number without a fraction or exponent part.',
    number: 'Any JSON number. Number includes integer.',
    null: 'The JSON null value.',
    object: 'A JSON object.',
    string: 'A JSON string.'
  }
  /* Make a shallow copy */
  function shallowCopy(o) {
    if (is(o, 'object')) {
      try { return JSON.parse(JSON.stringify(o)); } catch (e) {}
    }
    return o;
  }
  exports.shallowCopy = shallowCopy;
  /* Detect or check a type */
  // TODO always check void 0 first
  const TYPES = {
    array: {
      parent: 'object',
      is: v => (v instanceof Array),
      from: {
        array: v => v,
        string: v => {
          if (v.substring(0,1) === '[' && v.slice(-1) === ']') {
            try { var n = JSON.parse(v); } catch (e) {}
            if (exports.is(n, 'array')) { return n; }
          }
          return v.split(String(',')).map(Function.prototype.call, String.prototype.trim);
        },
        any: v => [v]
      }
    },
    boolean: {
      parent: null,
      is: function(v) { return (typeof v === 'boolean'); },
      to: function(v, schema) {
        const t = exports.is(v);
        if (t === 'undefined') {
          return v;
        } else if (t === 'string' && v.toLowerCase() === 'false') {
          return false;
        }
        return !!v;
      }
    },
    isodate: {
      parent: 'string',
      is: function(v) {
        if (typeof v === 'string') {
          var re = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
          if (re.test(v)) {

          }
        }
        return false;
      },
      to: function(v){
        // four-digit year
        var d = '0000'.substr(0,4-v.length)+v;
        // pattern for partial dates
        d += '0000-01-01T00:00:00Z'.substring(date.length);
        return exports.to(d, 'date');
      }
    },
    date: {
      parent: 'object',
      is: function(v) { return (v instanceof Date); },
      to: function(v, schema) {
        /* isoDate (string) or unixEpoch (integer or string) to date */
        const t = exports.is(v);
        var d;
        if (t != 'string' && t != 'integer' && t != 'number' && !(v instanceof Date)) {
          return void 0;
        } else if (v instanceof Date) {
          return v;
        } else if (t === 'string') {
          var isoDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?Z$/.exec(v);
          if (isoDate) {
            d = new Date(Date.UTC(+isoDate[1], +isoDate[2] - 1, +isoDate[3],
                      +isoDate[4], +isoDate[5], +isoDate[6], +isoDate[7] || 0));
          } else {
            d = new Date(+v);
          }
        } else {
    			d = new Date(v);
        }
  			if (isNaN(d.getTime())) { return void 0; }
  			return d;
  		}
    },
    integer: {
      parent: 'number',
      is: function(v) { return (((isFinite(v) && Math.floor(v) === v))); },
      to: function(v, schema) {
        const t = exports.is(v);
  			var n;
        if (t === 'integer' || t === 'undefined') {
  				return v;
  			} else if (t === 'number') {
          return parseInt(v, 10);
        } else if (t === 'string') {
          if (v.trim() === '') { return void 0; }
  				n = Number(String(v.replace(/ /g, '')));
  				if (exports.is(n, 'integer')) { return (isNaN(n)) ? void 0 : n; }
  			} else if (t === 'boolean') {
  				if (v) { return 1; }
  				return 0;
  			} else if (v instanceof Date) {
  				return +v;
  			}
        return void 0;
  		}
    },
    number: {
      parent: null,
      is: function(v) { return (typeof v === 'number'); },
      to: function(v, schema) {
        const t = exports.is(v);
  			var n;
  			if (t === 'number' || t === 'integer' || t === 'undefined') {
  				return v;
  			} else if (t === 'string') {
          if (v.trim() === '') { return void 0; }
  				n = Number(String(v.replace(/,/g, '.').replace(/ /g, '')));
  				return ((isNaN(n) === true) ? void 0 : n);
  			} else if (v instanceof Date) {
  				return +v;
  			}
  			return void 0;
  		},
    },
    null: {
      parent: null,
      is: function(v) { return (v === null); },
      to: function(v, schema) { return null; }
    },
    object: {
      parent: null,
      is: function(v) { return (typeof v === 'object'); },
      to: function(v, schema) {
        const t = exports.is(v);
  			var o;
        if (t === 'undefined') {
          return v;
        } else if (t === 'string') {
    			try { o = JSON.parse(v); } catch (e) { return void 0; }
          if (exports.is(o, 'object')) { return o; }
  			}
        return void 0;
  		}
    },
    string: {
      parent: null,
      is: function(v) { return (typeof v === 'string'); },
      to: function(v, schema) {
        const t = exports.is(v);
        if (t === 'string' || t === 'undefined') {
  				return v;
  			} else if (t === 'boolean' || t === 'number' || t === 'integer' || v instanceof Date) {
  				return v.toString();
  			} /* else if (t === 'array') {
  				// If user authorize array and strings...
  				if (schema.items || schema.properties)
  					return v;
  				return v.join(String(schema.joinWith || ','));
  			} else if (t === 'object') {
  				// If user authorize objects ans strings...
  				if (schema.items || schema.properties)
  					return v;
  				return JSON.stringify(v);
  			}
        */
  			return void 0;
  		}
    },
    /*
    var flags = {
      global: 'g',
      ignoreCase: 'i',
      multiline: 'm',
      unicode: 'u',
      sticky: 'y'
    };
    */
    regex: {
      parent: 'object',
      is: function(v) { return ((v instanceof RegExp) && v.ignoreCase); },
      to: function(v) {
        if (exports.is(v, 'string')) { return new RegExp(v, 'i'); }
  			return void 0;
      }
    },
    REGEX: {
      parent: 'object',
      is: function(v) { return ((v instanceof RegExp)); },
      to: function(v) {
        if (exports.is(v, 'string')) { return new RegExp(v); }
      }
    },
    glob: {
      parent: 'object',
      is: function(v) { return ((v instanceof RegExp) && v.ignoreCase); },
      to: function(v){
        var s = v.replace(/([\\|\||\(|\)|\[|\{|\^|\$|\*|\+|\?|\.|\<|\>])/g,
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
      }
    },

    // string transformation
    titlecase: function(str) {
    	return (!str) ? '' : str.charAt(0).toUpperCase() + str.slice(1);
    },
    camelCase: function(str) {
    	return (!str) ? '' : str.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
    },
    readable: function(str) {
    	return (!str) ? '' : str.replace(/([A-Z])/g, function($1){return [' ', $1.toLowerCase()].join('');});
    }
  }
  function is(value, evtType) {
    var type = typeof value;
    if (value === void 0) {
      type = 'undefined';
    } else if (value === null) {
      type = 'null';
    } else if (typeof value === 'number') {
      type = ((isFinite(value) && Math.floor(value) === value)) ? 'integer' : 'number';
    } else if (typeof value === 'object') {
      type = (value instanceof RegExp) ? 'regex' : ((value instanceof Array) ? 'array' : 'object');
    } else {
      type = (typeof value);
    }
    if (typeof evtType === 'string' && !JSONTYPES.hasOwnProperty(evtType)) {
      if ((typeof value === 'number') && (isNaN(value))) {
        type = 'NaN';
      }
    }
    return (evtType) ? (evtType === type) : type;
  }
  exports.is = is;

  /* Convert value to type or JSON Schema */
  // TODO - options : nonEmpty and strict
  const TO = {
    array: function(v, schema) {
      const t = is(v);
      if (t === 'array' || t === 'undefined') {
        return v;
      } else if (t === 'string') {
        if (v.substring(0,1) === '[' && v.slice(-1) === ']') {
          try { return JSON.parse(v); } catch (e) { return void 0; }
          if (is(n, 'array')) { return n; }
        }
        return v.split(String(',')).map(Function.prototype.call, String.prototype.trim);
      }
      if (!is(v, 'array')) { return [ v ]; }
      return void 0;
    },
    boolean: function(v, schema) {
      const t = is(v);
      if (t === 'undefined') {
        return v;
      } else if (t === 'string' && v.toLowerCase() === 'false') {
        return false;
      }
      return !!v;
    },
    /*
    // NOTE : DATE conversions does not cover (localized) parsing -
    // use redaktor.nlp TODO - explain natural language processing
    */
    isodate: function(v){
      // four-digit year
      var date = '0000'.substr(0,4-v.length)+v;
      // pattern for partial dates
      date += '0000-01-01T00:00:00Z'.substring(date.length);
      return TO.date(date);
    },
		date: function(v, schema) {
      /* isoDate (string) or unixEpoch (integer or string) to date */
      const t = is(v);
      var d;
      if (t != 'string' && t != 'integer' && t != 'number' && !(v instanceof Date)) {
        return void 0;
      } else if (v instanceof Date) {
        return v;
      } else if (t === 'string') {
        var isoDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?Z$/.exec(v);
        if (isoDate) {
          d = new Date(Date.UTC(+isoDate[1], +isoDate[2] - 1, +isoDate[3],
                    +isoDate[4], +isoDate[5], +isoDate[6], +isoDate[7] || 0));
        } else {
          d = new Date(+v);
        }
      } else {
  			d = new Date(v);
      }
			if (isNaN(d.getTime())) { return void 0; }
			return d;
		},
		integer: function(v, schema) {
      const t = is(v);
			var n;
      if (t === 'integer' || t === 'undefined') {
				return v;
			} else if (t === 'number') {
        return parseInt(v, 10);
      } else if (t === 'string') {
        if (v.trim() === '') { return void 0; }
				n = Number(String(v.replace(/ /g, '')));
				if (is(n, 'integer')) { return (isNaN(n)) ? void 0 : n; }
			} else if (t === 'boolean') {
				if (v) { return 1; }
				return 0;
			} else if (v instanceof Date) {
				return +v;
			}
      return void 0;
		},
		number: function(v, schema) {
      const t = is(v);
			var n;
			if (t === 'number' || t === 'integer' || t === 'undefined') {
				return v;
			} else if (t === 'string') {
        if (v.trim() === '') { return void 0; }
				n = Number(String(v.replace(/,/g, '.').replace(/ /g, '')));
				return ((isNaN(n) === true) ? void 0 : n);
			} else if (v instanceof Date) {
				return +v;
			}
			return void 0;
		},
    null: function(v, schema) {
      if ((t === 'string' && v.toLowerCase() === 'null') || isNaN(v)){
        return null;
      }
			return void 0;
    },
		object: function(v, schema) {
      const t = is(v);
			var n;
      if (t === 'undefined') {
        return v;
      } else if (t === 'string') {
  			try { n = JSON.parse(v); } catch (e) { return void 0; }
        if (is(n, 'object')) { return n; }
			}
      return void 0;
		},
		string: function(v, schema) {
      const t = is(v);
      if (t === 'string' || t === 'undefined') {
				return v;
			} else if (t === 'boolean' || t === 'number' || t === 'integer' || v instanceof Date) {
				return v.toString();
			} /* else if (t === 'array') {
				// If user authorize array and strings...
				if (schema.items || schema.properties)
					return v;
				return v.join(String(schema.joinWith || ','));
			} else if (t === 'object') {
				// If user authorize objects ans strings...
				if (schema.items || schema.properties)
					return v;
				return JSON.stringify(v);
			}
      */
			return void 0;
		},
    regex: function(v) {
      if (is(v, 'string')) { return new RegExp(v, 'i'); }
    },
    REGEX: function(v) {
      if (is(v, 'string')) { return new RegExp(v); }
    },
    glob: function(v){
      var s = v.replace(/([\\|\||\(|\)|\[|\{|\^|\$|\*|\+|\?|\.|\<|\>])/g,
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

    // string transformation
    titlecase: function(str) {
    	return (!str) ? '' : str.charAt(0).toUpperCase() + str.slice(1);
    },
    camelCase: function(str) {
    	return (!str) ? '' : str.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
    },
    readable: function(str) {
    	return (!str) ? '' : str.replace(/([A-Z])/g, function($1){return [' ', $1.toLowerCase()].join('');});
    }
  }
  // expose toFunctions : toArray ...  - TODO mention here in doc
  Object.keys(TO).forEach(function(key) {
    exports[['to', TO.titlecase(key)].join('')] = TO[key];
  });
  function convert(value, typeOrSchema, evtFailValue /* default: undefined */) {
    this.res = void 0;
    if (typeof typeOrSchema === 'string') {
      if (!(TO.hasOwnProperty(typeOrSchema))) {
        debug('Conversion does not support', typeOrSchema);
        return evtFailValue;
      }
      this.res = _convert(value, typeOrSchema);
    } else {
      this.res = _convertSchema(value, typeOrSchema);
    }
    /* TODO - defaults ?
    if ((n === null && !opt) || (!n && isNaN(n)) || (n === null && schema.type === 'string')) {
			n = schema.def;
		} */
    return (this.res === void 0) ? evtFailValue : this.res;
  }
  function _convert(v, to, schema) {
    if (!!(schema) && !(JSONTYPES.hasOwnProperty(to))) {
      debug('JSON Schema does not support', to);
      return evtFailValue;
    }
    return TO[to.toLowerCase()](v, schema);
  }
  function _convertSchema(v, schema) {
    var vRes = shallowCopy(v);
    var coerce = saur.compile(schema, function () {
      return {
        "[type]": function (schema, v, ctx) {
          if (ctx.path.length) {
            var coerced = _convert(v, schema.type, schema);
            lang.setProperty(vRes, ctx.path.join('.'), coerced);
          }
        }
      }
    });
    coerce(v);
    return vRes;
  }
  exports.convert = convert;
  /*  */
  function x() {

  }
  //exports.x = x;
  /*  */
  function x() {

  }
  //exports.x = x;
  /*  */
  function x() {

  }
  //exports.x = x;
});
// TODO # sourceMappingURL=
