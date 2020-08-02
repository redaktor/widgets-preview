import AuthBase from '../';
import Promise from '@dojo/framework/shim/Promise';
import { mixin } from '../../../dojo/core/util';
import nlsCommon from './nls';
import tplCommon from './tpl';
const kbpgp = require('kbpgp');

class GPGAuth extends AuthBase {
  debug: boolean = false;
  protected _protocol: string = 'GPGAuth';
  protected _version: string = '1.0';
  protected _type: string = 'JWT';
  constructor(private clientSecret?: string | any,
    protected validity: number = (5*60*1000), protected _nonceSize: number = 32,
    protected renderForm = false, protected iss = 'IndieAuth'
  ) {
    super();
    this.isObject(clientSecret) && mixin(this, clientSecret);
    if (!this.clientSecret) { this.clientSecret = this._getNonce(this._nonceSize); }
    this.initDebugLog(['password','secret','clientSecret'], ['setup', 'svg']);
    this.initGPGAuth();
  }
  /* public, overwritable : */
  public initGPGAuth() {}

  options(o: any = {}): any {
    const keyURL = ((!!o.req.query && o.req.query.authorize) || o.options.publicKey);
    if (!keyURL) { return Promise.reject(this.errLog(o.messages.missingKey)); }
    return o;
  }
  protected challenge(o: any = {}) {
    const keyURL = ((!!o.req.query && o.req.query.authorize) || o.options.publicKey);
    /* TODO FIXME PUB KEY error */
    return this.get({url: keyURL, responseType: 'text'}).then((res: any) => {
      const s = this.sessionOrCookie(o.req, { me: keyURL, pub: res.data });
      const token = this.setToken(o.req, {aud: keyURL, code: o.options.code});
      mixin(o.options.query, {pub: s.pub, code: token});
      return o;
    });
  }
  protected verify(o: any = {}) {
    return new Promise((resolve: any, reject: any) => {
      const s = this.sessionOrCookie(o.req);
      kbpgp.KeyManager.import_from_armored_pgp({armored: s.pub}, (err: any, myGPG: any) => {
        if (!!err) { /* TODO FIXME error i18n MESSAGES ... */
          return reject('Decrypt Problem with session: ' + err);
        }
  			var ring = new kbpgp.keyring.KeyRing();
  			ring.add_key_manager(myGPG);
  			kbpgp.unbox({keyfetch: ring, armored: o.req.body.code}, (err: any, myArr: any) => {
  			  if (!!err) {
            reject('Decrypt Problem: ' + err);
  			  } else {
            var km: any, fingerprint: any;
  			    var ds: any = myArr[0].get_data_signer();
  			    if (!!ds && !!ds.get_key_manager) { km = ds.get_key_manager(); }
            if (!!km && !!km.get_pgp_fingerprint) {
  			      fingerprint = km.get_pgp_fingerprint().toString('hex');
  			    }
            if (!fingerprint) {
              return reject('Decrypt Problem with fingerprint');
            }
            o.req.body.code = myArr[0].toString();
            // exchange for one time pass if decrypted token is valid
            const token = this.getToken(o.req, null, 'code');
            if (token.aud !== s.me || !token.code) {
              return reject('Decrypt Problem with token: ' + token);
            }
            o.req.body.code = token.code;
            o.result = {code: fingerprint};
            return resolve(o);
  			  }
  			});
      });
    });
  }

  success(o: any, cb = this.callbackUrl) {
    const _data = mixin({}, o.messages||{}, o.options.query||{}, {url: cb});
    mixin(o, {result: {
      form: this.msg(tplCommon.form, _data),
      formLabel: this.msg(_data.messageForm, _data)
    }});
    if (!!o.res.send && !!this.renderForm) {
      o.res.send(o.result.form);
    } else if (!!o.res.status) {
      o.res.status(200).json(o.result);
    }
    return o.result;
  }

  auth(req: any = {}, res: any = {}, kwArgs: any = {}) {
    return this.i18nOptions({req: req, res: res, options: kwArgs, nls: nlsCommon})
      .then(o => this.state(o))
      .then(o => this.oneTimePass(o))
      .then(o => this.challenge(o))
      .then(o => this.success(o));
  }
  access(req: any = {}, res: any = {}, kwArgs: any = {}) {
    return Promise.resolve({req: req, res: res})
      .then(o => this.verify(o))
      .then(o => this.oneTimePass(o, '/req/body/code'))
      .then(o => this.state(mixin(o, {finish: true})));
  }
}

export default GPGAuth;
