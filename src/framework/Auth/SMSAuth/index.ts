import { mixin } from '../../../dojo/core/util';
import { baseUrl } from '../IndieAuth/config';
import AuthBase from '../';

class SMSAuth extends AuthBase {
  private _E: any = {
    AUTH: 'Missing recipient: No "to" or "req.query.authorize" found',
    PROP: 'Missing property:'
  }
  debug: boolean = false;
  protected _protocol: string = 'SMSAuth';
  protected _version: string = '1.0';
  protected _type: string = 'code';
  constructor(protected authUrl?: string | any, protected callbackUrl?: string,
  protected key?: string, protected secret?: string,
  protected scope?: string, public text = ''
  ) {
    super();
    this.isObject(authUrl) && mixin(this, authUrl);
    this.initSMSAuth();
  }
  /* public, overwritable : */
  public initSMSAuth() {}

  auth(req: any, res: any, kwArgs: any = {}) {

    if (!kwArgs.to && !req.query.authorize) { throw new TypeError(this.errLog(this._E.AUTH)); }
    const options: any = {}; //TODO FIXME this.getOptions(kwArgs, req);
    if (!!this.debug) {
      const debugOptions = mixin({}, options, {text:(options.text||'').slice(0, 128)+' ...'});
      this.debugLog([{neutral: 'Sending SMS ...'}, {list: debugOptions}]);
    }
  }
  access(req: any, res: any) { return this.verifyToken(req); }
}

export default SMSAuth;
