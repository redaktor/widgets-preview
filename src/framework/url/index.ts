import has from '@dojo/framework/core/has';
import { isIdentical } from '../isIdentical';
import { UrlSearchParams } from './UrlSearchParams';
const _url: any = (has('host-node')) ? require('url') : (<any>window).URL;

/* TODO FIXME http://medialize.github.io/URI.js/ */

export class Parameters extends UrlSearchParams {
  constructor(input?: any) {
    super(input);
  }
  /**
	 * Returns a plain object with all first values OR
   * the first value associated with a key here!
	 * @param key The key to return the first value for
	 * @return The first string value for the key
	 */
	get(this: any, key: string = ''): any {
    if (!this.has(key)) {
      return Object.keys(this._list).reduce((_o: any, key: string): any => {
        if (key !== '') { _o[key] = this._list[key][0]; }
        return _o;
      }, {});
    }
    return this._list[key][0];
  }
}

class url {
  static protocolPattern = /^([a-z0-9.+-]+:)/i;
  static defaultProtocolPattern = /^(\/\/)/i;
  static hostlessProtocol = {
  'javascript': true,
  'javascript:': true
  };
  // protocols that always contain a // bit.
  static slashedProtocol = {
    'http': true,
    'https': true,
    'ftp': true,
    'gopher': true,
    'file': true
  }
  static format(urlAny: any|string) {
    if (has('host-node')) { return _url.format(urlAny); };
    return (new _url(urlAny)).toString();
  }
  static parse(urlStr: string, parseQuery: boolean = false, slashesDenoteHost: boolean = false) {
    urlStr = urlStr.trim();
    const proto: any = url.protocolPattern.exec(urlStr);
    const defProto: any = url.defaultProtocolPattern.exec(urlStr);
    if (!proto || defProto) {
      urlStr = `https:${defProto ? '' : '//'}${urlStr}`;
    }
    if (has('host-node')) {
      const parsed = _url.parse(urlStr, parseQuery, slashesDenoteHost);
      parsed.originalUrl = urlStr;
      return (!!(parseQuery) && !(parsed.host) && !Object.keys(parsed.query).length) ?
        {...parsed, ...{query: url.parameters(urlStr).get()}} : parsed;
    }
    var U: any;
    try {
      U = new _url(urlStr);
    } catch (e) {
      return {};
    }
    U.originalUrl = urlStr;
    U.path = [U.pathname||'', U.search||''].join('');
    // auth
    U.auth = (typeof U.username === 'string' && U.username.length) ?
      [U.username,U.password] : '';
    // query
    if (parseQuery) {
      U.query = (typeof U.searchParams === 'object' ) ?
        U.searchParams : new Parameters(U.search||'').get();
    } else {
      U.query = U.search;
    }
    // slashes
    if (proto) {
      var lowerProto = proto[0].toLowerCase();
      U.protocol = lowerProto;
      urlStr = urlStr.substr(proto[0].length);
    }
    if (slashesDenoteHost || proto || urlStr.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var slashes = (urlStr.substr(0, 2) === '//');
      var lowerProto = proto[0].toLowerCase();
      if (slashes && !(lowerProto && (<any>url).hostlessProtocol[lowerProto])) {
        urlStr = urlStr.substr(2);
        U.slashes = true;
      }
    }
    return U;
  }

  static parameters(input?: any): any {
    const U: any = (typeof input === 'string') ? url.parse(input) : input;
    if (!U.host && !U.search) { U.search = U.pathname; }
    return (new Parameters((!U.search) ? '' : U.search.replace('?','')));
  }
  static withParameters(baseUrl: string|any, queryObj: any) {
    const t = (typeof baseUrl);
    if (t !== 'string' && t !== 'object') { return ''; }
    let parsed = (t === 'string') ? url.parse(baseUrl,true,false) : baseUrl;
    parsed.query = {...(parsed.query||{}), ...(queryObj||{})};
    return url.format(parsed);
  }
  static concat(baseUrl: string, path: string) {
    return ((baseUrl.slice(-1) === '/') ? baseUrl.slice(0,-1) : baseUrl) +
      ((path.slice(0,1) !== '/') ? ('/'+path) : path);
  }
  static resolve(from: string, to: string) {
    if (has('host-node')) {
      return _url.resolve(from, to);
    };
    /* TODO FIXME browser */
  }
  static resolveRelative(mainUrl: string, u: string) {
    const _u = url.parse(u);
    if (!(_u.protocol) && !(_u.host) && (!!(_u.path) || _u.href.charAt(0) === '#')) {
      return url.resolve(mainUrl, u);
    }
    return u;
  }

  static normalizeUrl(
    u: any, inclQuery = true, defaultProtocol: string = 'https:', forceProtocol = false
  ): string {
    // parse url
    u = (typeof u === 'string') ? url.parse(u, true) : u;
    // exclude standard ports
    u.port = (!!u.port && ((u.protocol === 'http:' && u.port != '80') ||
                (u.protocol === 'https:' && u.port != '443'))) ?
                    [':',u.port].join('') : '';

    // Bare domains get parsed as just a relative path, so fix that here
    if (!(u.protocol) && !(u.host) && !!(u.pathname)) {
      const h = JSON.parse(JSON.stringify(u.pathname));
      if (!!(u.query)) { delete u.query[h]; }
      u = {...u, ...{ host: h, hostname: h, path: '/', pathname: '/' }};
    }
    if (!!forceProtocol) {
      u = {...u, ...{ protocol: defaultProtocol }}
    } else if (typeof defaultProtocol === 'string' && !u.protocol) {
      u = {...u, ...{ protocol: (defaultProtocol+':') }};
    }

    if (!inclQuery) { u.search = ''; }
    if (!u.pathname || u.pathname === '') { u.pathname = '/'; }
    if (!u.hostname) { return u.pathname; }
    return url.format(u);
  }
  static hasIdentical(urls: string|string[], myUrl: string) {
    if (typeof urls === 'string') { urls = [urls]; }
    if (Array.isArray(urls) && urls.length && typeof myUrl === 'string' && myUrl.trim().length) {
      var nUrl = url.normalizeUrl(myUrl);
      var i: number, u: string;
      for (i = 0; i < urls.length; i++) {
        u = url.resolveRelative(myUrl, urls[i]);
        u = url.normalizeUrl(u);
        if (typeof u === 'string' && u.trim().length && isIdentical(u, nUrl)) {
          return true;
        }
      }
    }
    return false;
  }
}
export default url;
