import Doc, { JSDOM, CONSOLE } from '../../Template/dom';
import { ProjectorMixin } from '@dojo/framework/widget-core/mixins/Projector';
// then
import { indieAuthProvider, indieAuthProviders, indieAuthMeRes, indieAuthData } from './interfaces';
import { authResponse } from '../../Request/interfaces';
import has from '@dojo/framework/has';
import Promise from '@dojo/framework/shim/Promise';
import { lang } from '@dojo/framework/core';
import * as fs from 'fs';
import * as path from 'path';

import App from './App';
import AuthBase from '..';
import {objectPromiseAll,flatten,dumpError,exists,copy,arrToObjByKey} from '../../util';
import {OS,getProviders,providerLinks,endpointLinks,validFirst,checkPW,userDir} from './helper';
import { baseUrl, verifyTimeout as VT } from './config';
import Memory, { Options } from '../../dstore/src/Memory';
import { startsWith } from '../../util/string';
import jsonPointer from '../../JSON/Pointer';
import URL from '../../url';
import { CLI } from './CLI';

import Test from './AppMfTest';


type indieAuthCB = void;

/* TODO FIXME - BUG s :
 * CACHED will make warnings to errors ... (setUrl rewrite ...)
 * missing providers : sms, clef
 * CSS :
 - .gpgAuthForm --> .ui.labeled.action.input.gpgAuth
 - .ui.labeled.action.input.mailAuth
*/
/* TODO FIXME - add setUrl
// twitter POST /account/update_profile ['url']
// github PATCH /user ['blog']
+
  * DOC USAGE
  * REDIS support is NOT yet included, but it SHOULD be ...
  * SSL error handling and [insecure redirects, e.g. line 302] in https://goo.gl/5rof5T
*/
/*
* SHOULD fix following issues (! check) :
* #1, #31 (!), #48 (!), #72 (!), #85 and #104, #88, #103 (!), #109, #128
* #130, #134
* ;( #116
*/
/* TODO FIXME - allover
since redaktor.parser is near alpha, replace fixed date, time, place values w.
according dynamic types and parse e.g. to ms
*/
class IndieAuth extends AuthBase {
  debug = false;
  protected _protocol = 'IndieAuth';
  protected _version = '1.0.0'
  protected _type = 'node';
  protected _url: string = null;
  protected _hasClients = false;
  _sessionData = { date:(new Date()), urls:{}, locale:'en', me:{}, client_id:{}, redirect_uri:'' }
  _options: any = {
    followRedirects: true,
    method: 'GET',
    headers: {
      accept : 'text/html',
      connection: 'close',
      'Content-Type': 'text/html;charset=UTF-8',
      /* will change to users agent if available : */
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) ' +
      'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'
    },
    responseType: 'mf',
    /* NOTE -     'mf' all IndieAuth requests return microformats by default !
    > the OAuth request are handled by redaktor.auth.OAuth modules and return JSON.
    */
    query: {},
    timeout: 6000 /* NOTE : seeAlso config.ts ! */
    /*,cacheBust: true*/
  }
  constructor( kwArgs: any = {}, protected kid?: string,
    private directory = '', protected user = '', protected salt?: string,
    protected verifyTimeout: number = VT, protected verifyStore: any = {},
    protected providers: indieAuthProviders = {}, protected subDir: string = '.IndieAuth'
  ) {
    super();
    this.user = path.basename(userDir);
    if (this.directory !== '') { this.subDir = this.directory; }
    this.directory = path.resolve(userDir,this.subDir);
    if (!has('host-node')) {
      throw new Error('This module requires node.js');
    } else if (!fs.existsSync(this.directory) ||
        typeof process.env.PW !== 'string' || !(process.env.PW.length)) {
      new CLI({directory: this.subDir});
      return;
    }
    if (process.env.NODE_ENV === 'development') { this.debug = true; }

    const secrets = checkPW(process.env.PW);
    if ((!secrets || secrets.statusCode !== 200) && lang.mixin(this, {debug: true})) {
      throw this.error('vWrongPw', 400).statusCode;
    } else {
      lang.mixin(this, secrets);
      this.isObject(kwArgs) && lang.mixin(this, kwArgs);
      this.verifyStore = new Memory({data: [], idProperty: 'url'});
      this.providers = getProviders();
      this.initDebugLog([],['salt', 'providers', 'verifyStore']);
      this.initIndieAuth();
    }
  }
  /* public, overwritable : */
  public initIndieAuth() {}

  test(data: any, res: any, returnFn?: any) {
    //'/Users/sebi/Desktop/redaktorTS2/_build/webcomponents/Widgets/dist/index.html'

    const root = Doc.createElement('div');
    const appNode = root.appendChild(Doc.createElement('my-app'));
    const Projector = ProjectorMixin((<any>Test));
    const projector = new Projector();
    //projector.sandbox(Doc);
    projector.setProperties(data);
    (<any>projector).append(appNode);
    /*
    //Doc.write(html);
    JSDOM.fromFile('/Users/sebi/Desktop/redaktorTS2/_build/webcomponents/Widgets/dist/index.html', {
      CONSOLE,
      resources: 'usable',
      runScripts: 'dangerously'
    }).then((dom: any) => {
    setTimeout(function() {
      res.locals.messages = JSON.stringify(res.locals);
      res.locals.IndieAuth = dom.serialize();
      res.locals.icon = (!!data.me && !!data.me.data.best && data.me.data.best.icon);
      res.locals.providerCount = data.me.data.best.providerCount;
      if (!!res) { res.render('auth.html', res.locals) }
      //console.log(dom.serialize());
      return !!(returnFn) ? returnFn(data) : data;
    }, 400);
    });
    */
  }

  render(data: any, res: any, returnFn?: any) {
    const root = Doc.createElement('div');
    const appNode = root.appendChild(Doc.createElement('my-app'));
    const Projector = ProjectorMixin(App);
    const projector = new Projector();
    //console.log('PROJECTOR DATA', JSON.stringify(data))
    projector.setProperties(data);
    (<any>projector).append(appNode);
/* TODO - when turning to components : */
    res.locals.messages = JSON.stringify(res.locals);
    res.locals.IndieAuth = root.innerHTML; /* TODO FIXME */
    res.locals.icon = (!!data.me && !!data.me.data.best && data.me.data.best.icon);
    res.locals.providerCount = data.me.data.best.providerCount;
/* <--- */
    if (!!res) { res.render('auth.html', res.locals) }
    return !!(returnFn) ? returnFn(data) : data;
  }

  meData(me: indieAuthMeRes): indieAuthMeRes {
    if (typeof me !== 'object') { return me; }
    const my = me.data;
    my.best.providers = {};

    if (!!(my['rel-urls'])) {
      const isValid = (k: string) => {
        return (!!(my.best.providers[k].valid) && !!(my.best.providers[k].key));
      }
      /* check authorization_endpoints and pgpkey */
      let myEndpoints: any[] = endpointLinks(my);
      /* check OAuth providers */
      let myProviders: any[] = [];
      if (my.rels.hasOwnProperty('me')) {
        myProviders = my.rels.me.map(providerLinks(my, this.providers)).sort(validFirst);
      }
      //console.log('.KEY myProviders',myProviders);
      my.best.providers = myEndpoints.concat(myProviders).reduce(arrToObjByKey('url'), {});
      my.best.providerCount = Object.keys(my.best.providers).length;
      my.best.verifyCount = Object.keys(my.best.providers).filter(isValid).length;
    }
    return me;
  }

  getCachedParameters(req: any, res: any, urls: any, cacheBust: boolean): indieAuthData {
    let cache: any = { client_id: false, me: false };
    let rState: string = ((exists('query.state', req) && req.query.state));
    let state = (rState || `${urls.me[0]}#${res.locals.csrf}`);
    const session = this.sessionData(req, {urls: urls, state: state});
    if (!this.session(req, session)) { return (<any>{}); }
    if (!(cacheBust)) {
      const s = this.session(req);
      if (s.state !== state) { s.state = state; }
      const _has = (k: string) => (s.urls[k].indexOf(urls[k][0]) > -1);
      for (var key in cache) {
        if (!_has(key) || !s[key].hasOwnProperty(urls[key][0])) { continue; }
        cache[key] = Promise.resolve(s[key][urls[key][0]]);
      }
      cache.date = s.date;
    }
    return cache;
  }
  getCachedRequestOptions(type: string, urls: any, cache: any) {
    return (cache[type]||this.get({ url: urls[type][0], meta: {id:type} }));
  }

  auth(req: any, res: any, cacheBust = false): Promise<indieAuthData|indieAuthCB> {
    if (!this._hasClients) {
      this._url = URL.concat((baseUrl||'/'), req.route.path);
      this.providers = getProviders.call(this, process.env.PW);
      this._hasClients = true;
    }
    const isCallback =  (!!(req.query.state) || !!(req.body.state)) &&
        (!!(req.query.oauth_token) || !!(req.query.code) || !!(req.body.code));
    if (!isCallback) {
      // Tell clients this is an indieauth endpoint :
      res.set('IndieAuth', 'authorization_endpoint');
    }
    if (!!(req.query.authorize)) { /* Authorize provider ? */
      return this.providerAuth(req, res);
    } else if (isCallback) { /* Handle Callback provider ? */
      console.log('isCallback');
      return (<any>this.providerAccess(req, res));
    }
    if (!req || typeof req !== 'object' ||
        !(req.query) || typeof req.query.client_id !== 'string') {
      return this.render(this.error('client_id', 400), res);
    }
    if (typeof req.query.me !== 'string') {
      return this.render(this.error('me'), res); /* TODO - FIXME in view */
    }
    if (!!(req.query.verify)) { /* Verify provider ? */
      return this.verify(req, res);
    }
    /* TODO if (!!(req.query.error)) fall short */
    const urls: any = {
      me: [this.normalizeMe(this._decode(req.query.me))],
      client_id: [this._normalizeUrl(this._decode(req.query.client_id))]
    }
    if (typeof urls.me[0] !== 'string' || urls.me[0] === '/') {
      return this.render(this.error('meInvalid'), res);
    }
    /* Cache ? */
    let cache: any = this.getCachedParameters(req, res, urls, cacheBust);
    /* console.log('cache', cache); */
    objectPromiseAll({
      client_id: this.getCachedRequestOptions('client_id', urls, cache),
      me: this.getCachedRequestOptions('me', urls, cache)
    }).then((results: any) => {
      /* if no cache, get me / my providers */
      if (!(cache.me)) { results.me = this.meData(results.me); }
      /* TODO make meData async */
      /* TODO FIXME render me error if NO results.me.data.items [] */
      let s = this.session(req);
      if (s.redirect_uri === '') { s.redirect_uri = (req.query.redirect_uri||req.query.client_id); }
      const me = results.me; const cl = results.client_id;
      const data: indieAuthData = {
        date: (!!(cache.date) ? cache.date : (new Date())),
        client_id: { statusCode: cl.statusCode, data: { best: cl.data.best, url: cl.data.url } },
        me: { statusCode: me.statusCode, data: { best: me.data.best, url: me.data.url } }
      }
      const toSession = (type: string) => {
        return (u: string) => {
          (s.urls[type].indexOf(u) < 0 && s.urls[type].push(u));
          s[type][u] = data[type];
        }
      }
      var key: string;
      for (key in urls) {
        if (!!cache[key]) { continue; }
        (urls[key][0] !== data[key].data.url && urls[key].push(data[key].data.url));
        if (key === 'me' && !!(me.requestOptions.redirects)) {
          me.requestOptions.redirects.forEach((rU: string) => {
            (urls.me.indexOf(rU) === -1 && urls.me.push(rU));
          })
        }
        urls[key].forEach(toSession(key));
      }
      this.session(req, s)
      /* some provider parameters are added finally to keep sessions small */
      const d = copy(data);
      for (key in d.me.data.best.providers) {
        if (!!d.me.data.best.providers[key].key) {
          let p = this.providers[d.me.data.best.providers[key].key];
          lang.mixin(d.me.data.best.providers[key], {id:p.id, svg:p.svg, title:(!!p.title) ? p.title : ''});
        }
      }

      //console.log('!AUTHDATA', JSON.stringify(d));
      return this.render(d, res);
    },
    (errRes: any) => {
      let _id: string = null; // console.log('ERROR',errRes);
      if (!(errRes.meta.id)||(errRes['code'] && errRes['code'] === 'ENOTFOUND')) {
        const meHost = URL.parse(urls.me[0]).host;
        _id = (meHost === errRes['host']) ? 'me' : 'client_id';
      }
      return this.render(this._reqError(errRes, _id), res);
    });
  }

  reqOptions(provider: indieAuthProvider, verifyUrl: string, req?: any) {
    const myData = (this.providers[provider.key].me||(<any>{}));
    const _agent = (!!myData.agent) ? myData.agent : /* e.g. google needs curl */
      (!!req && req.get('User-Agent') || this._options.headers['User-Agent']);
    const headers = lang.mixin(this._options.headers, {Accept: '*/*', 'User-Agent': _agent});
    const options = lang.mixin({
      url: verifyUrl, headers: headers, timeout: this.verifyTimeout,
      meta: {id: 'verify', provider: provider.key}
    }, myData);
    if (!!myData.set && typeof myData.set.options === 'function') {
      lang.mixin(options, myData.set.options(provider));
    }
    return options;
  }

  verify(req: any, res: any) {
    const me = this.normalizeMe(this._decode(req.query.me));
    const verifyUrl = this._normalizeUrl(this._decode(req.query.verify));

    let s = this.session(req);
    if (!this.hasMe(req, me)) { return this.errJSON('verifyInsecure', res); }

    try { this.verifyStore.addSync({
      url: req.query.me, me: 'self', count: s.me[me].data.best.verifyCount,
      urls: [req.query.me], done: 0
    }); } catch(e) {}
    const sProvider = s.me[me].data.best.providers[req.query.verify];
    // console.log('v, verify', v, verifyUrl, sProvider.key);
    const is: any = { authorization_endpoint: false, mail: false, sms: false, pgpkey: false };
    for (var key in is) { is[key] = (sProvider.key === key); }

    const options = this.reqOptions(sProvider, verifyUrl, req);

    const finish = (err?: string) => {
      let s = this.session(req);
      const meObj = this.verifyStore.getSync(req.query.me);
      var i: number;
      for (i = 0; i < meObj.urls.length; i++) {
        if (s.urls.me.indexOf(meObj.urls[i]) === -1) { s.urls.me.push(meObj.urls[i]); }
      }
      this.verifyStore.filter({me: req.query.me}).forEach((_o: any) => {
        if (_o.verified === true) {
          s.me[me].data.best.providers[_o.url].verified = true;
          s.me[me].data.best.providers[_o.url].order = 2;
        } else if (!!(_o.key && this.providers[_o.key].setUrl)) {
          s.me[me].data.best.providers[_o.url].order = 3;
        }
        this.verifyStore.remove(_o.url);
      }).then(() => {
        return this.resJSON(((!!err) ? this.error(err) : {verified:true}), res);
      });
    }
    const status = (err?: string) => {
      if (!!err) {console.log(sProvider.key, 'RETURNED E', JSON.stringify(err))}
      let R: any = {key:sProvider.key, url:req.query.verify, me:req.query.me, verified:!(err)};
      return this.verifyStore.add(R).then(() => {
        this.verifyStore.get(req.query.me).then((_me: any) => {
          _me.done++; console.log('COUNT', _me.done,_me.count, sProvider.key, err);
          if (_me.done === _me.count) {
            finish(err);
          } else {
            this.verifyStore.putSync(_me);
            return this.resJSON(((!!err) ? this.error(err) : {verified:true}), res);
          }
        });
      });
    }
    if (!(is.authorization_endpoint) && !(sProvider.valid)) { return status('verifyNoCred'); }
    if (is.mail || is.sms || is.pgpkey) { return status(); }

    /* Compare rel="me" links to check if they link back */
    const provider = (mfRes: authResponse<any>) => {
      let key: string;
      if (!(mfRes.data.rels) || !Array.isArray(mfRes.data.rels.me)) {
        return status('verifyNoMe');
      }
      /* twitter stores the real URL in title, let's evt. omit one request : */
      if (startsWith(mfRes.requestOptions['url'], 'https://twitter.com')) {
        for (key in mfRes.data['rel-urls']) {
          const o = mfRes.data['rel-urls'][key];
          if (typeof o === 'object' && !!(o.title) && (o.rels.indexOf('me') > -1)) {
            mfRes.data.rels.me.push(o.title);
            break;
          }
        };
      }
      if (this.hasMe(req, mfRes)) { return status(); }
      // if they don't link back follow all urls for the redirects
      const rM = mfRes.requestOptions['meta'];
      const rP = (rM && rM.provider && this.providers[rM.provider]);
      const e = (!!rP && !!(rP.setUrl)) ? 'verifyTmpInvalidMe' : 'verifyInvalidMe';
      let hasN = 0;
      mfRes.data.rels.me.forEach((meUrl: string) => {
        const redirectOptions = this.reqOptions(sProvider, meUrl, req);
        this.get(redirectOptions).then((redirectRes: authResponse<any>) => {
          hasN++;
          if (URL.hasIdentical(s.urls.me, redirectRes.data.url) &&
            !!(redirectRes.requestOptions.meta.url)) {
            const redirected = redirectRes.requestOptions.meta.url;
            const meObj = this.verifyStore.getSync(req.query.me);
            if (meObj.urls.indexOf(redirected) === -1) {
              meObj.urls.push(redirected);
            }
            return status();
          }
          if (hasN === mfRes.data.rels.me.length) { status(e); }
        }, (e: any) => {
          hasN++;
          if (hasN === mfRes.data.rels.me.length) { status(e); }
        });

      });
    }
    /* <-- provider [OAuth provider] */

    /* Make an HTTP request to the auth server and check that it responds
     * with an "IndieAuth: authorization_endpoint" header,
     * but return false if it's actually this server
    */
    const endpoint = (epRes: any) => {
      const h = epRes.getHeader('indieauth');
      if (!(h) || h !== 'authorization_endpoint') { return status('verifyNoHeader'); }
      const _v = this._decode(req.query.verify);
      const _urls = ((!!(epRes.url) && _v !== epRes.url) ? [epRes.url, _v] : [_v]);
      /* TODO redirects ? */
      if (URL.hasIdentical(_urls, this._url)) { return status('verifyNotSelf'); }
      /*
       * If only one profile is set, and it's an indieauth authorization endpoint,
       * then skip directly to it
      */
      if (s.me[me].data.best.verifyCount === 1) {
        res.redirect(epRes.url)
      }
      return status();
    }
    /* <-- endpoint [Authorization endpoint] */

    const method = (!!(is.authorization_endpoint)) ? 'head' : 'get';
    return (<any>this)[method](options).then(
      ((!!(is.authorization_endpoint)) ? endpoint : provider),
      res.status(200).json
    );
  }

  getProvider(req: any, res: any): any {
    let s = this.session(req);
    const hasUrl = (!!s && !!URL.hasIdentical(s.urls.me, s.login.me));
    const _state = (!!(req.query) && req.query.state) || (!!(req.body) && req.body.state);
    /* TODO FIXME urgent : _state !== s.state */

    if (!hasUrl || !_state /*|| _state !== s.state*/) { return this.errJSON('accessInsecure', res); }
    let sProvider: any, authProvider: any;
    try {
      sProvider = s.me[s.login.me].data.best.providers[s.login.url];
      authProvider = this.providers[sProvider.key];
    } catch (e) { /* JS client kiddies (wrong "key") ... */
      return this.errJSON('accessInvalid', res);
    }
    if (!authProvider || !authProvider.valid || (!sProvider.verified && !authProvider.setUrl)) {
      return this.errJSON('accessInvalid', res);
    }
    return authProvider;
  }
  providerAuth(req: any, res: any) {
    const me = this.normalizeMe(this._decode(req.query.me));
    let s = this.session(req);
    s.login = { me: me, url: req.query.authorize, created: (new Date()) };
    const provider = this.getProvider(req, res);
    /* TODO FIXME error handling [should not happen ;)] */
    if (!provider.valid) { throw('no client found for ' + req.query.authorize) }
    return provider.auth(req, res, {state: s.state});
  }
  providerAccess(req: any, res: any) {
    const provider = this.getProvider(req, res);
    /* TODO FIXME error handling [should not happen ;)] */
    //if (!provider.valid) { throw('no client found for' + req.url) }

    let s = this.session(req);
    provider.access(req, res, {state: s.state}).then((accessRes: any) => {
      const sProvider = s.me[s.login.me].data.best.providers[s.login.url];
      const v = provider.verify;
      // verifiers can return
      // options: (provider,oauth) => {}, set: (o) => {}, verify: {userId:'/', userMe:'/'}
      const verify = (o: any) => {
        req.data = (o.data||{});
        s = this.session(req);
        let VERIFIED = {
          userId: false,
          userMe: (provider._protocol === 'MailAuth' || provider._protocol === 'GPGAuth')
        };
        //VERIFIED { userId: false, userMe: true }
        if (typeof v.meta === 'object') {
          if (!!v.meta.userId) {
            const userId = jsonPointer(req.data, v.meta.userId);
            if (!!userId && sProvider.userId === userId) { VERIFIED.userId = true; }
          }
          if (!!v.meta.userMe) {
            const userMe = jsonPointer(req.data, v.meta.userMe);
            if (!!userMe && URL.hasIdentical(s.urls.me, userMe)) { VERIFIED.userMe = true; }
            //console.log('verify userMe', v.meta.userMe, ' :: ', userMe, ' : ', s.urls.me);
          }
        }
        console.log('VERIFIED',VERIFIED)
        if (VERIFIED.userId === true && VERIFIED.userMe === true) {
          this.access(req, res);
        } else if (VERIFIED.userMe !== true && !!(req.data.profileUrl)) {
          const options = this.reqOptions(sProvider, req.data.profileUrl, req);
          this.get(options).then((mfRes: any) => {
            if (!(mfRes.data.rels) || !Array.isArray(mfRes.data.rels.me)) {
              this.render(this.error('accessUserId'), res);
            }
            if (this.hasMe(req, mfRes)) {
              console.log('OK');
              this.access(req, res);
            } else {
              console.log('ERR');
              this.render(this.error('accessUserId'), res);
            }
          }, () => { this.render(this.error('accessUserId'), res); });

        } else if (VERIFIED.userMe !== true && !!(provider.setUrl)) {
            // TODO FIXME setUrl
        } else {
          console.log('Not VERIFIED');
          console.log(this.error(!(VERIFIED.userId) ? 'accessUserId' : 'accessUserMe'));
          this.render(this.error(!(VERIFIED.userId) ? 'accessUserId' : 'accessUserMe'), res);
        }
        return o;
      }

      const setData = (!!v.set && typeof v.set.result === 'function') ?
        v.set.result(sProvider, accessRes) : ((res: any) => {return res;});

      let myOptions = lang.mixin({responseType:'json', oauth:accessRes}, v);
      if (!!v.set && typeof v.set.options === 'function') {
        lang.mixin(myOptions, v.set.options(provider, accessRes));
      }
      if (!!myOptions.url && typeof myOptions.url === 'string') {
        return provider.get(myOptions).then(setData).then(verify);
      }
      return Promise.resolve(setData({data: accessRes})).then(verify);
    });
  }

  access(req: any, res: any) {
    // SEND REDIRECT URI
    let s = this.session(req);
    const ACCESSCODE = 'TODO'; // TODO FIXME
    const redirect_uri = URL.withParameters(s.redirect_uri, {
      code: ACCESSCODE, me: s.login.me, state: s.state
     });
    console.log('OK !!! data', req.data);
    console.log('OK !!! redirecting to redirect_uri', redirect_uri)
//    res.redirect(redirect_uri);
    return req.data;
  }

}


export default IndieAuth;
