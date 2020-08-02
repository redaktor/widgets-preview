import { OAuthArgs, OAuth1Options, OAuth1Params, OAuthResponse } from './interfaces';
import { mixin } from '../../../dojo/core/util';
import URL from '../../url';
import crypto from '../../crypto';
import AuthBase from '..';

enum SIGNATURES {'HMAC-SHA1', 'RSA-SHA1', PLAINTEXT};

class OAuthOneClient extends AuthBase {
  protected _protocol: string = 'OAuth';
  protected _version: string = '1.0';
  protected _headerPrefix: string = 'OAuth';
  protected requestOptions: any = {responseType: 'query'};
  protected accessOptions: any = {responseType: 'query'};

  protected _E: any = {
    STATELESS: 'Stateless OAuth1 (e.g. only in the Browser) is not supported. ' +
      'Use OAuth2 !',
    SIGN: 'Unsupported signature method:',
    PROP: 'Missing property:'
  }
  private _privateKey: string;

  get OAuthParams(): OAuth1Params {
    return {
      oauth_timestamp:        this._getTimestamp(),
      oauth_nonce:            this._getNonce(this._nonceSize),
      oauth_version:          this._version,
      oauth_signature_method: this._signMethod,
      oauth_consumer_key:     this.consumerKey
    }
  }
  /* NOTE : Please use kwArgs like { consumerKey: '', ... }
   * Ordered Arguments fallback for minimal compatibility with node-oauth ...
  */
  constructor (
    protected authUrl: any, protected accessUrl?: string,
    protected requestUrl?: string, protected callbackUrl?: string,
    protected consumerKey?: string, protected consumerSecret?: string,
    protected _signMethod = 'HMAC-SHA1', protected _nonceSize = 32,
    public verify: any = ((o: any) => { return o; })
  ) {
    super();
    this.isObject(authUrl) && mixin(this, authUrl);
    /* TODO - simple this.validate (JSON SCHEMA) HERE ... */
    if (!SIGNATURES.hasOwnProperty(this._signMethod)) {
      throw new TypeError( this.errLog(`${this._E.SIGN} ${this._signMethod}`) );
    } else if (this._signMethod === 'RSA-SHA1') {
      this._privateKey = this.consumerSecret;
    }
    this.consumerSecret = this._encode(this.consumerSecret);
    if (!this.callbackUrl) { this._type = '1legged'; }
    this.initDebugLog(['consumerSecret'],['setup', 'svg']);
    this.initOAuthOne();
  }
  /* public, overwritable : */
  public initOAuthOne() {}
  /* Sorts the encoded key value pairs by encoded key */
  protected _sortParams(o: any): any {
    const ordered: any = {};
    Object.keys(o).sort().forEach((key) => { ordered[key] = o[key]; });
    return ordered;
  }
  protected _normalizeParams(o: any): any {
    const argStrings: string[] = [];
    const orderedKeys = Object.keys(o).map((k) => {
      return this._encode(k);
    }).sort().forEach((k) => {
      argStrings.push([k,'=',this._encode(o[k])].join(''));
    });
    return argStrings.join('&');
  }
  protected _getSignature(kwArgs: OAuthArgs, oauthParams: any): any {
    const _url = this._encode(this._normalizeUrl(kwArgs.url, false));
    const _params = this._encode(this._normalizeParams(oauthParams));
    const _secret = this._encode(kwArgs.oauth_token_secret);
    const _base = [kwArgs.method.toUpperCase(), _url, _params].join('&');
    if (this._signMethod === 'RSA-SHA1') {
      let key = this._privateKey || '';
      return crypto.sign(_base, key, 'RSA-SHA1');
    } else {
      let key = [this.consumerSecret, _secret].join('&');
      return (this._signMethod === 'PLAINTEXT') ? key : crypto.hmac(_base, key, 'base64', 'sha1');
    }
  }
  protected _getOAuthParams(kwArgs: any) {
    const newParams: any = this.OAuthParams;
    ['oauth_callback','oauth_token','oauth_verifier'].forEach((k) => {
      if (typeof kwArgs[k] === 'string') {
        newParams[k] = kwArgs[k];
        delete kwArgs[k];
      }
    });
    mixin(newParams, (URL.parse(kwArgs.url, true).query || {}));
    newParams.oauth_signature = this._getSignature(kwArgs, newParams);
    return this._sortParams(newParams);
  }
  /* Builds the OAuth request authorization header */
  protected getAuthHeader(kwArgs: OAuthArgs) {
    const oauthParams = this._getOAuthParams(mixin({}, kwArgs));
    // Only 1.0 "oauth_" arguments should appear within the authorization header
    const header: string = Object.keys(oauthParams).map((key) => {
      return (key.slice(0,6) === 'oauth_') ?
        [this._encode(key),'="',this._encode(oauthParams[key]),'"'].join(''):'';
    }).join(',');
    return [this._headerPrefix, header].join(' ');
  }
  /* Validation and Error Handling */
  success(o: any = {}, req: any = {}, res: any = {}, finish = false): any {
    mixin(o, {req:req, res:res, options:{url: this.authUrl}, finish:finish});
    const key = 'oauth_token';
    const tokenStr = finish ? 'access token' : 'request token';
    const token = (this.isObject(o.data) && o.data[key]);
    if (typeof token !== 'string') {
      const eMsg = `${this._E.PROP} "${key}" in ${tokenStr} result!`;
      return Promise.reject(this.error(eMsg, 412));
    }
    if (this.debug) {
      const uStr = finish ? '!' : ('& authUrl: ' + this.authUrl);
      this.debugLog({ success: `Valid ${tokenStr} ${uStr} ` });
      (!finish && this.debugLog({ neutral: 'Redirecting to authUrl ...' }));
    }
    return (!finish) ? this.redirect(o, {oauth_token: token}) : this.state(o);
  }
	/**
	 * Gets a request token from the OAuth provider and passes that information
	 * back to the calling code.
	 * Depending on the arguments it either
	 * 1) Returns a Promise for {oauth_token:'', oauth_verifier:'', authUrl:''}
   * 2) Redirects the User to it's .authUrl (with oauth_ arguments)
	 * This method has optional parameters and can be called in two ways:
	 *
	 * 1) Does a basic request with no extra parameters
	 *  auth().then
	 *
	 * 2) Allows for provision of middleware arguments and extra parameters to be
        sent as part of the query to the server.
	 *  auth(req, res) ---> res.redirect
	 *
	 * NOTE - This method will HTTP POST by default, if you wish to override
   * this behaviour you will need to provide {method: ''} in requestOptions
   * when creating the client.
	 *
	 **/ /* TYPESCRIPT TODO any = express.req / express.res : */
  auth(req: any = {}, res: any = {}, kwArgs: any = {}) {
    if (!this.isStateful(req)) { return Promise.reject(this.errLog(this._E.STATELESS)); }
    this.debugLog({ neutral: 'Getting a request token ...' });

    return this.options({id: 'request', req: req, res: res, options: kwArgs})
      .then(o => this.state(o, '/oauth_callback'))
      .then(o => this.request(o))
      .then(o => this.success(o, req, res), this.authError())
  }

	/**
	 * Exchange the request token and verifier from the OAuth provider
	 * for an access token.
   * As above but for 1) needs at least {oauth_token: '', oauth_verifier?: ''}
   * and oauth_token_secret in either url parameters or session from requestUrl ...
	 **/
  access(req: any = {url: window.location.href}, res: any = {}, kwArgs: any = {}) {
    this.debugLog({ neutral: 'Getting an access token ...' });

    const accessArgs = (req && req.url && URL.parse(req.url, true).query) || {};
    return this.options({id: 'access', req: req, res: res, options: kwArgs}, accessArgs)
      .then(o => this.state(o))
      .then(o => this.request(o))
      .then(o => this.success(o, req, res, true), this.authError('eAccess'));
  }
}

export default OAuthOneClient;
