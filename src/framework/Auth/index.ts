//import { OAuthArgs, OAuth2Options } from './OAuth/interfaces';
import has from '@dojo/framework/has/has';
import { mixin, deepMixin } from '../../dojo/core/util';
import jsonPointer from '../JSON/Pointer';
import jwt from '../JSON/webtoken';
import uuid from '../uuid';
import crypto from '../crypto';
import URL from '../url';
import { getCachedI18n } from '../util/i18n';

import RequestBase from '../Request';
import nlsCommon from './nls/common';
/*
.options
.protocolStr
._getUUID
._getNonce
.isObject
.debugLog
.msg
*/

class Auth extends RequestBase {
  debug: boolean = false;
  protected _protocol = 'BasicAuth';
  protected _version = '';
  protected _headerPrefix = 'Basic';
  protected validity: number = (5*60);
  _sessionData: any = { date:(new Date()), pub: '' }
  _options: any /*OAuthArgs*/ = {
    followRedirects: true,
    method: 'POST',
    headers: {
      Accept : '*/*',
      Connection : 'close',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'User-Agent': 'redaktor.auth'
    },
    query: {},
    cacheBust: true
    /*
    data: null,
    responseType: // either set manual OR 'json' if ends in json, else 'text'
    */
  }

  constructor(protected authUrl?: any, protected callbackUrl?: string,
    protected kid?: string, protected key?: string, protected secret?: string,
    protected scope?: string | string[], protected scopeSeparator: string = ' ',
    protected _nonceSize: number = 32
  ) {
    super();
    this.isObject(authUrl) && mixin(this, authUrl);
    this.initAuth();
    /* e. g. IndieAuth has one constant kid per PW but others : */
    if (!this.kid) {
      this.kid = this._getUUID(`${this['authUrl']||''}#${Date.now()}`);
    }
  }
  /* public, overwritable : */
  public initAuth() {}

  /* i18n */
  i18nOptions(o: any = {req: {}, nls: nlsCommon}): Promise<any> {
    return getCachedI18n(o.req, o.nls).then((mO: any) => {
      return this.options(mixin(o, mO));
    });
  }

  /* Validation and Error Handling */
  success(requestRes: any) {
    return requestRes.data||{};
  }
  resJSON(data: any, res: any, returnFn?: any) {
    if (!!res) { res.status(200).json(data); }
    return !!(returnFn) ? returnFn(data) : data;
  }
  errJSON(errStr: string, res: any, status: number = 400) {
    this.resJSON(this.error('verifyInsecure', 400), res);
    return false;
  }
  /* default error handling */
  protected _reqError(e: any, id?: string) {
    if (!(id)) { id = !!(e.meta.id) ? e.meta.id : 'me'; }
    if (!(e.statusMessage)) { e.statusMessage = this.msg()+': '+id; }
    this.debugLog({ error: e });
    return e;
  }
  error(id: string, statusCode = 412, isPromise = false): any {
    if (id === 'me') { statusCode = -1; }
    const msg = this.msg(id);
    const e = {
      meta: { id: id }, statusCode: statusCode, statusMessage: msg,
      error: { code: statusCode, message: msg, id: id }
    };
    if (!!isPromise) {
      return (eRes: any) => {
        e.error = eRes;
        this.debugLog({ warning: statusCode || '!' });
        this.debugLog([{ error: msg }, { list: e }]);
        return e;
      }
    }
    this.debugLog({ error: msg });
    return e;
  }
  authError(id: string = 'eRequest', statusCode = 412) {
    return this.error(id, statusCode, true);
  }

  /* token expiration */
  protected expires(validitySec?: number) {
    return Math.floor(Date.now() + (((!!validitySec && validitySec) || this.validity) * 1000));
  }

  /* these functions can easily be overwritten by subclasses to be more specific */
  protected sessionData(req: any = {}, kwArgs: any = {}) {
    const state = (!!req.requestOptions && req.requestOptions.state) ||
      this._getNonce(this._nonceSize);
    return mixin({}, this._sessionData, {state: state, client_state: state}, kwArgs);
  }
  protected sessionID() {
    return uuid(
      (<any>this).accessUrl || this.authUrl || (this.protocolStr+uuid(this.callbackUrl||' '))
    );
  }
  protected meID(req: any = {}) {
    return [((!!req && req.me) || (!!req && !!req.query && req.query.me) ||
      (!!req && !!req.body && req.body.me) || '/'),
      '#',
      (req.headers['x-forwarded-for'].replace(/ /g,'') || req.connection.remoteAddress)].join('');
  }
  protected meIP(meID: string) {
    const meIDarr = (typeof meID !== 'string' ? [] : meID.split('#'));
    return ((meIDarr.length === 2) && meIDarr[1]);
  }
  /* <--- */

  protected hasSession(req: any) {
    return (!!req.session && !!req.session.redaktor &&
      !!(req.session.redaktor[this.sessionID()]));
  }
  protected setSession(req: any, content: any) {
    const sId = this.sessionID();
    if (!req.session) {
      console.log([this._protocol, this._type, 'needs express-session!'].join(' '));
      this.debugLog({ error: 'See https://www.npmjs.com/package/express-session !' });
      return false;
    }
    if (!req.session.redaktor) { req.session.redaktor = {}; }
    if (!req.session.redaktor[sId]) { req.session.redaktor[sId] = {}; }
    req.session.redaktor[sId] = content;
    return req.session.redaktor[sId];
  }
  protected getSession(req: any) {
    const sId = this.sessionID();
    if (!req.session.redaktor || !req.session.redaktor[sId]) { return void 0; }
    return req.session.redaktor[sId];
  }
  protected session(req: any, content?: any) {
    let s = this.getSession(req);
    if (!s) { s = this.setSession(req, (content||this.sessionData(req))); }
    return (this.isObject(content)) ? deepMixin(s, content) : s;
  }

  protected setToken(req: any, content: any = {}, pw?: string) {
    if (!pw) { pw = this.sessionOrCookie(req).tokenSecret; }
    const payload: any = mixin({
      iss: this.protocolStr,
      exp: this.expires(),
      jti: this._getUUID()
    }, content);
    return jwt.encode(payload, pw||'');
  }
  protected getTokenStr(req: any, key = 'state') {
    return (!!(req.query) && req.query[key])
        || (!!(req.body) && req.body[key])
        || (!!(req.data) && req.data[key]);
  }
  protected getToken(req: any, pw?: string, key = 'state') {
    const s = this.sessionOrCookie(req);
    if (!pw) { pw = s.tokenSecret; }
    if (!pw || !s.state) { return void 0; }
    return jwt.decode(this.getTokenStr(req, key), pw);
  }

  protected cbUrl(o: any = {}, ks = ['redirect_uri', 'callbackUrl']) {
    return (o.query && o.query[ks[0]]) || o[ks[1]] || (<any>this)[ks[1]] || '';
  }
  protected getCookie() {
    const sId = this.sessionID();
    var cRegex = new RegExp('(?:(?:^|.*;\\s*)' + sId + '\\s*\\=\\s*([^;]*).*$)|^.*$');
    return JSON.parse(document.cookie.replace(cRegex, '$1'));
  }
  protected setCookie(content: any = {}) {
    const sId = this.sessionID();
    document.cookie = [sId, JSON.stringify(content)].join('=');
    return content;
  }
  protected isStateful(req: any = {}) {
    /* TODO implement stateless server check HERE for: !req.session */
    return !has('host-browser');
  }
  protected sessionOrCookie(req: any = {}, content?: any) {
    /* TODO implement stateless server get/set HERE for: !req.session */
    if (this.isStateful(req)) {
      return (!!req.session && this.session(req, content));
    }
    let c = this.getCookie();
    if (!c) {
      return this.setCookie(content||this.sessionData(req));
    } else {
      return (this.isObject(content)) ? this.setCookie(mixin(c, content)) : c;
    }
  }
  protected oneTimePass(o: any = {}, lengthOrPointer?: number|string): string {
    if (typeof lengthOrPointer === 'string') {
      return this.verifyOneTimePass(o, lengthOrPointer);
    }
    if (typeof o.options.code !== 'string') {
      const l = (typeof lengthOrPointer === 'number' && lengthOrPointer > 1 && lengthOrPointer);
      o.options.code = this._getNonce(l||12);
    }
    this.sessionOrCookie(o.req, { oneTimeSecret: uuid(o.options.code + this.kid) });
    return o;
  }
  protected verifyOneTimePass(o: any = {}, pointer?: string, code?: string) {
    const pass = (!code && typeof pointer === 'string') ?
      jsonPointer(o, pointer) :
      (code || o.req.code || o.req.body.code);
    const validation = {
      valid: (this.sessionOrCookie(o.req).oneTimeSecret === uuid(pass + this.kid))
    };
    this.sessionOrCookie(o.req, {oneTimeSecret: ''});
    if (validation.valid !== true) { return Promise.reject(validation); }
    return mixin(o, {data: {code: uuid()}});
  }

  /* auth STATE
   * see https://www.ietf.org/id/draft-bradley-oauth-jwt-encoded-state-06.pdf
   */
  protected rfpToken(o: any = {}) {
    //o.req, mixin(o.options||{}, o.req.body||{})
    const meId = this.meID(o.req);
    const rfp = JSON.stringify({ me: meId, id: this._getNonce(32) });
    const tokenSecret = this._getNonce(64);
    this.sessionOrCookie(o.req, {
      rfp: (!this.isStateful(o.req) ? uuid(rfp) : rfp),
      tokenSecret: tokenSecret
    });
    return {
      kid: this.kid,
      exp: this.expires(),
      rfp: rfp,
      as: this.cbUrl(o.options)
    };
  }
  protected rfpTokenInvalidate(req: any = {}, token: any = {}) {
    this.sessionOrCookie(req, { rfp: false, accessed: false, tokenSecret: false });
    if (!!token.rfp) { delete token.rfp; }
    return token;
  }
  private stateHashObj(o: any, tokenLength: number = 256, hashObj: any = {}) {
    const ks: any = {c_hash:'code', at_hash:'access_token', ot_hash:'oauth_token'};
    let keys: any[] = [];
    let k: string;
    for (k in ks) { if (!!o.data[ks[k]]) { keys = [k, ks[k]]; break; } }
    if (!keys) { return void 0; }
    const tokenStr = this.getTokenStr(o.req);
    const hashLength = (!tokenStr) ? tokenLength : jwt.algLength(tokenStr);
    const hash = crypto.hash(o.data[keys[1]], ('sha'+hashLength), 'base64'); // TODO had no out param before
    hashObj[keys[0]] = this._base64UrlEncode(hash.slice(0, (hash.length/2)));
    return hashObj;
  }
  protected stateError(req: any, messageId = 'unknown', statusCode = 403) {
    this.rfpTokenInvalidate(req);
    return this.error(messageId, statusCode);
  }
  protected state(o: any = {}, cbPointer?: string, cbUrl = this.callbackUrl) {
    return new Promise((resolve: any, reject: any) => {
      const kwArgs = mixin((o.options||{}), (o.req.body||{}));
      let s = this.sessionOrCookie(o.req);
      if (!s) { return reject(this.error('eSession', 500)); }
      let token: any;
      const codeResult = (!!(kwArgs.data) && kwArgs.data.code) || (!!(kwArgs.query) && kwArgs.query.code);
      if (!(o.finish) && !(kwArgs.oauth_token) && !(codeResult)) {
        const scope = (kwArgs.scope || this.scope);
        if ((typeof scope === 'string' || Array.isArray(scope)) && scope.length) {
          kwArgs.query.scope = Array.isArray(scope) ? scope.join(this.scopeSeparator) : scope;
        };
        token = this.rfpToken(o);
        this.debugLog({ neutral: 'initial state, generated rfp token' });
      } else if (!s.tokenSecret) {
        this.rfpTokenInvalidate(o.req);
        return reject(this.error('eSessionSec', 500));
      } else {
        token = this.getToken(o.req);
        if (!(token.iss) || token.iss !== this.protocolStr) {
          /* TODO FIXME 'ERROR : unsafe, issuer error' */
          console.log('ERROR state 1');
          return reject(this.stateError(o.req, ''));
        }
        const checkRFP = (!this.isStateful(o.req)) ? uuid(token.rfp) : token.rfp;
        if (!s.rfp || checkRFP !== s.rfp || token.as !== this.cbUrl(kwArgs)) {
          /* TODO FIXME 'ERROR : unsafe, rfp error' */
          console.log('ERROR state 2');
          return reject(this.stateError(o.req, ''));
        }
        const tokenMe = JSON.parse(token.rfp).me;
        const subMe = this.meID(o.req);
        if (this.meIP(tokenMe) !== this.meIP(subMe)) {
          /* TODO FIXME 'ERROR : unsafe me, rfp error' */
          console.log('ERROR state 3', this.meIP(tokenMe), this.meIP(subMe));
          return reject(this.stateError(o.req, ''));
        }
        if (!(s.accessed) && !(o.finish)) {
          this.debugLog({ success: ['state token is valid,',
            Math.floor((token.exp-Date.now())/1000), 'seconds were left ...'].join(' ') });
          this.sessionOrCookie(o.req, {accessed: Date.now(), exp: this.expires(30)});
        } else {
          this.debugLog({ success: ['final state token is valid,', subMe, ':',
             Math.floor((token.exp-Date.now())/1000), 'seconds were left ...'].join(' ') });
          const hashObj = this.stateHashObj(o);
          if (!hashObj) {
            /* TODO FIXME 'ERROR : missing param error' */
            console.log('ERROR state 4');
            return reject(this.stateError(o.req, '', 412));
          }
          mixin(token, {exp: this.expires(), sub: subMe}, hashObj);
          token = this.rfpTokenInvalidate(o.req, token);
          token.state = s.state;
          console.log ('FINAL TOKEN', token);
          console.log ('FINAL RES', o.data);
          console.log ('FINAL S', s);
          return resolve(token);
        }
      }
      const stateToken = this.setToken(o.req, token);
      const stateOptions: any = mixin({exp: token.exp}, kwArgs);
      if (cbPointer) {
        if (cbPointer.charAt(0) !== '/') { cbPointer = '/' + cbPointer; }
        let u = URL.withParameters(cbUrl, {state: stateToken});
        jsonPointer(stateOptions, cbPointer, u);
      } else {
        jsonPointer(stateOptions, '/query/state', stateToken);
      }
      o.options = stateOptions;
      resolve(o);
    });
  }

  hasMe(req: any, meArr: any) {
    let s = this.session(req);
    if (!(s) || !(s.urls.me) || !(s.urls.me.length)) { return false; }
    if (typeof meArr === 'string') { meArr = [meArr]; }
    let urls = Array.isArray(meArr) ? meArr : meArr.data.rels.me;
    let i: number;
    for (i = 0; i < s.urls.me.length; i++) {
      if (URL.hasIdentical(urls, s.urls.me[i])) { return true; }
    }
    return false;
  }
  normalizeMe(u: any) { return this._normalizeUrl(u, true, 'http'); }

  /**
   * Basic Auth the user (many other Auth modules overwrite it)
  **/
  auth(req: any, res: any, kwArgs: any = {}) {
    /* TODO FIXME if (this.realm) {} */
    const options = this.options(kwArgs);
    return this.request(options)
      .then((o: any) => this.success(o), this.authError());
  }
}

export default Auth;
