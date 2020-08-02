import { mixin, deepMixin } from '../../../dojo/core/util';
import { formatDate, getDateFormatter } from '@dojo/framework/i18n/date';
import * as nodemailer from 'nodemailer';
import nlsCommon from './nls/common';
import tplCommon from './tpl';
import AuthBase from '../';
/*
  TODO - FIXME
  - Sign all messages DKIM : https://nodemailer.com/dkim/
  - Allow custom verify (see IndieAuth)
*/
class MailAuth extends AuthBase {
  debug: boolean = false;
  protected _protocol: string = 'MailAuth';
  protected _version: string = '1.0';
  protected _type: string = 'JWT';
  protected authOptions: any = {
    responseType: 'query',
    headers: { Sensitivity: 'private', Expires: 0 },
    to: '', from: '', subject: '', text: '', html: ''
  };
  constructor(protected email: string|any /* string|MailOptions */ ,
    protected name?: string,
    protected host?: string, protected port?: string,
    protected user?: string, protected pass?: string,
    protected callbackUrl?: string, private clientSecret?: string,
    protected apiKey?: string, protected mailer: any = {}, protected xkcdCache: any = {},

    protected validity: number = (5*60), protected _nonceSize: number = 32,
    protected renderForm = false, protected iss = 'IndieAuth', protected info = '',
    protected text: string = tplCommon.text, protected html: string = tplCommon.html
  ) {
    super();
    this.isObject(email) && mixin(this, email);
    if (!this.name) { this.name = this.email; }
    if (!this.apiKey) {
      this.mailer = nodemailer.createTransport({
        host: this.host, port: this.port, auth: { user: this.user, pass: this.pass }
        //,logger: true, debug: this.debug
      });
    } else {
      /* TODO FIXME mailgun */
    }
    if (!this.clientSecret) { this.clientSecret = this._getNonce(this._nonceSize); }
    this.initDebugLog(
      ['password','secret','clientSecret'],
      ['setup', 'svg', 'text', 'html']
    );
    this.initMailAuth();
  }
  /* public, overwritable : */
  public initMailAuth() {}

  localOptions(o: any = {}) {
    const TO = ((!!o.req.query && o.req.query.authorize) || o.options.to);
    return deepMixin({}, this.authOptions, {
      headers: { Expires: this.expires() },
      to: (this._decode(TO).replace(/^((?:\s)*mailto[:])/i, '') || void 0),
      from: { name: (this.name || this.email), address: this.email },
      subject: this.iss,
      text: this.text, html: (this.html||this.text)
    }, o.options);
  }
  mailgunOptions(o: any = {}) { return {};  /* TODO FIXME */ }
  options(o: any = {}) {
    if (o.options.to === '') {
      o.options.to = (!!o.req.query && o.req.query.authorize);
    }
    if (!o.options.to) { return Promise.reject(this.errLog(o.messages.missingTo)); }
    o.options = (!this.apiKey) ? this.localOptions(o) : this.mailgunOptions(o);
    if (typeof o.options.iss !== 'string') { o.options.iss = this.iss; }
    if (typeof o.options.info !== 'string') { o.options.info = this.info; }
    return o;
  }
  protected _xkcd(o: any, xkcdData?: any) {
    if (!!xkcdData) { this.xkcdCache = xkcdData; }
    o.options.xkcd = this.xkcdCache;
    return o;
  }
  protected xkcd(o: any) {
    if (!o.options || !o.options.xkcd) { return this._xkcd(o); }
    const c = this.xkcdCache;
    const d = new Date();
    return (`${d.getUTCMonth()}_${d.getUTCDate()}` === `${c.month||''}_${c.day||''}`) ?
      this._xkcd(o) :
      this.get('https://xkcd.com/info.0.json').then((xO: any) => {
        if (typeof xO.data === 'object' && !!(xO.data.img)) {
          const x: any = {img: xO.data.img, a: xO.data.alt||'', ext: '.png'};
          mixin(x, {base: x.img.slice(0,0-x.ext.length), l: x.img.lastIndexOf(x.ext)});
          xO.data.srcset = (x.l+x.ext.length === x.img.length) ? (`${x.base}_2x.png 2x`) : '';
          xO.data.$img = (!xO.data.srcset.length) ? (`<img src="${x.img}" title="${x.a}" />`) :
            (`<img src="${x.img}" srcset="${xO.data.srcset}" title="${x.a}" />`);
          return this._xkcd(o, xO.data);
        }
        return this._xkcd(o);
      }, (e: any) => this._xkcd(o));
  }
  protected challenge(o: any = {}) {
    const s = this.sessionOrCookie(o.req, { me: o.options.to });
    const token = this.setToken(o.req, {aud: o.options.to, code: o.options.code});
    o.options.code = token;
    return o;
  }
  protected verify(o: any = {}) {
    const s = this.sessionOrCookie(o.req);
    const token = this.getToken(o.req, null, 'code');
    if (token.aud !== s.me || !token.code) {
      return Promise.reject('Decrypt Problem with token: ' + token);
    }
    o.req.body.code = token.code;
    return o;
  }
  protected makeMessage(o: any) {
    const df = getDateFormatter({ datetime: 'medium' }, o.locale);
    const expO = {
      expRaw: (o.options.exp.toString() || ''),
      exp: !!(o.options.exp) ? df(new Date(o.options.exp)) : ''
    };
    const _html = (!!(o.options.html) && o.options.html) || o.options.text;
    const _data = mixin({}, o.options, o.messages||{}, expO);
    mixin(o.options.query, expO);
    mixin(o.options, {
      subject: this.msg(_data.messageSubject, _data),
      text: this.msg(o.options.text, _data),
      html: this.msg(_html, _data)
    });
    if (!!this.debug) {
      const debugOptions = mixin({}, o, { req: {}, res: {} });
      debugOptions.text = (o.text)||''.slice(0,128)+' ...';
      debugOptions.html = (o.html)||''.slice(0,128)+' ...';
      this.debugLog([{neutral: 'Sending mail ...'}, {list: debugOptions}]);
    }
    return o;
  }
  protected sendMessage(o: any) {
    if (!this.apiKey) {
      return this.mailer.sendMail(o.options)
        .then((status: any) => mixin(o, {result: status}));
    }
    /* TODO FIXME mailgun ... */
  }
  success(o: any, cb = this.callbackUrl) {
    const _data = mixin({}, o.messages||{}, o.options.query||{}, {url: cb});
    console.log('b', _data)
    o.result.form = this.msg(tplCommon.form, _data)
    o.result.formLabel = this.msg(_data.messageForm, _data);
    if (!!o.res.send && !!this.renderForm) {
      o.res.send(o.result.form);
    } else if (!!o.res.status) {
      o.res.status(200).json(o.result);
    }
    return o.result;
  }

  auth(req: any = {}, res: any = {}, kwArgs: any = {}) {
    /* TODO - should have 'state' in kwArgs */
    if (!!req.body && !!req.body.code) { return this.access(req, res); }
    if (kwArgs.html === true) { delete kwArgs.html; }
    return this.i18nOptions({req: req, res: res, options: kwArgs, nls: nlsCommon})
      .then(o => this.xkcd(o))
      .then(o => this.state(o))
      .then(o => this.oneTimePass(o))
      .then(o => this.challenge(o))
      .then(o => this.makeMessage(o))
      .then(o => this.sendMessage(o))
      .then(o => this.success(o));
  }

  access(req: any, res: any) {
    /* TODO - precheck req.body.state, req.body.code and method === 'POST' */
    return Promise.resolve({req: req, res: res})
      .then(o => this.verify(o))
      .then(o => this.oneTimePass(o, '/req/body/code'))
      .then(o => this.state(mixin(o, {finish: true})));
  }
}

export default MailAuth;
