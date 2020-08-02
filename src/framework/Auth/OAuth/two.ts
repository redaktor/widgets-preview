import { OAuthArgs, OAuth2Options, OAuthResponse } from './interfaces';
import has from '@dojo/framework/has/has';
import { mixin, deepMixin } from '../../../dojo/core/util';
import { capitalize, base64Encode } from '../../util/string';
import URL from '../../url';
import AuthBase from '..';

/* TODO FIXME
  * DOC USAGE
  * Clock skew - five minutes in seconds
  * @const
  * @private
  */ //OAuth2Client.CLOCK_SKEW_SECS_ = 300;
  /**
  * Max Token Lifetime is one day in seconds
  * @const
  * @private
  */ //OAuth2Client.MAX_TOKEN_LIFETIME_SECS_ = 86400;

/* see https://aaronparecki.com/2012/07/29/2/oauth2-simplified
 * seeAlso Aaron Parecki at your indiewebcamp nearby
 * TYPES :
 * clientCredentials for application access
 * implicit for browser-based or mobile apps
 * password for logging in with a username and password
 * authorizationCode (3legged) for apps running on a web server
 * seeAlso https://alexbilbie.com/guide-to-oauth-2-grants/
*/
type TYPES = 'authorization_code'|'password'|'client_credentials'|'implicit'|'refresh_token';
class OAuthTwoClient extends AuthBase {
  protected _protocol: string = 'OAuth';
  protected _version: string = '2';
  protected _headerPrefix: string = 'Bearer';
  protected authOptions: any = {
    responseType: 'query',
    query: { client_id: '', response_type: 'code' }
  };
  protected accessOptions: any = {
    responseType: 'json',
    query: { client_id: '', grant_type: 'authorization_code' }
  };
  /* _originURL, client, headers, data ... */
  protected accessTokenName: string = 'access_token';

  /* Resource Owner Password flow (grant_type = password) */
  get user() { return this.key; }
  set user(user: string) { this.key = user; }
  get password() { return this.secret; }
  set password(pw: string) { this.secret = pw; }

  constructor (
    protected authUrl: OAuth2Options | string, protected accessUrl?: string,
    protected callbackUrl?: string, protected scope?: string,
    protected clientId?: string, protected clientSecret?: string,
    protected _nonceSize: number = 32, protected implicit = false,
    public verify: any = ((o: any) => { return o; })
  ) {
    super();
    this.isObject(authUrl) && mixin(this, authUrl);
    this._init();
  }
  _init() {
    if (this._type === '3legged') { this.implicit = false; }
    this.clientId = this._encode(this.clientId);
    this.authOptions.query.client_id = this.clientId;
    this.accessOptions.query.client_id = this.clientId;
    if (this.clientSecret && this._type === '3legged') {
      this.clientSecret = this._encode(this.clientSecret);
      this.accessOptions.query.client_secret = this.clientSecret;
    } else {
      this.clientSecret = void 0;
    }
    if (this.callbackUrl) {
      this.authOptions.query.redirect_uri = this.callbackUrl;
      this.accessOptions.query.redirect_uri = this.callbackUrl;
    }
    this.initDebugLog(['clientSecret'], ['setup', 'svg']);
    this.initOAuthTwo();
  }
  /* public, overwritable : */
  public initOAuthTwo() {}
  type(t?: string) { return (!t) ? this._type : mixin(this, {_type: t}); }
  // Builds the OAuth2 authorization header. In particular, the part after the colon,
  // e.g. Authorization: Bearer <token> -> Build "Bearer <token>"
  protected getAuthHeader(kwArgs: OAuthArgs|string): string {
    if (typeof kwArgs === 'object' && kwArgs.hasOwnProperty(this.accessTokenName)){
      const TOKEN = (<any>kwArgs)[this.accessTokenName];
      if (typeof kwArgs.token_type === 'string' && kwArgs.token_type.length) {
        this._headerPrefix = capitalize(kwArgs.token_type);
      }
      return [this._headerPrefix, TOKEN].join(' ');
    } else {
      const TOKEN = (typeof kwArgs != 'string') ?
        [this.clientId, this.clientSecret].join(':') : kwArgs;
      return `${this._headerPrefix} ${base64Encode(TOKEN)}`;
    }
  }
  /* TODO FIXME check URLS : (!!hasCode && !this.accessUrl && !has('host-browser')) ?
        { error: 'No "accessUrl" was found for 3legged OAuth2 ...' } :
        { error: 'No "authUrl" was found for OAuth2 ' + this._type + '...' } ); */
  initOAuth2(o: any = {}) {
    if (!o.options.user && !this.user && !this.implicit && !!this.callbackUrl) {
      return o; /* grant_type: 'authorization_code' */
    }
    let _query = {};
    let _responseType = 'query';
    if ((typeof o.options.user === 'string' || typeof this.user === 'string') &&
    (typeof o.options.password === 'string' || typeof this.password === 'string')) {
      _query = {
        grant_type: 'password',
        user: (typeof o.options.user === 'string' && o.options.user) || this.user,
        password: (typeof o.options.password === 'string' && o.options.password) || this.password
      }
      _responseType = 'json';
    } else if (!this.callbackUrl && has('host-node')) {
      _query = { grant_type: 'client_credentials', client_secret: this.clientSecret };
      _responseType = 'json';
    } else if (this.implicit) {
      /* NOTE grant_type = 'implicit' (browser) : "Implicit was previously recommended
       * for clients without a secret, but has been superceded by using the Authorization Code
       * grant with no secret." :: Set {implicit: true} in the options (explicitly) to use it !
       */
      _query = { grant_type: 'implicit', response_type: 'token' };
      this.clientSecret = void 0;
    }
    deepMixin(o.options, { query: _query, responseType: _responseType });
    return o;
  }
  rewrite(o: any = {}) {
    const kw = o.options;
    /* e.g. Facebook and Github use(d) rev05 of the spec, correct it unobstrusive : */
    if (!kw.set) { kw.set = {}; }
    kw.set.json = (data: any, res = {}) => {
      try { res = JSON.parse(data) } catch(e){ res = URL.parse(data, true).query; }
      return JSON.stringify(res);
    };
    /* for POST/PUT send query as key-value pairs in the request body (URL parameter string) : */
    if (this.isPutPost(kw) && !(kw.data)) {
      kw.data = this._fixEncode(URL.parameters(URL.withParameters('',kw.query)).toString());
      kw.query = {};
    }
    return o;
  }
  react(o: any) {
    if (!!(o.options.query.grant_type)) {
      this.debugLog({ neutral: 'Directly getting an accessToken ...' });
      return this.request(o);
    }
    this.debugLog({ neutral: `Redirecting to authUrl: ${this.authUrl}` });
    return this.redirect(o);
  }
  /* Validation and Error Handling */
  success(o: any = {}, req: any = {}, res: any = {}, finish = false) {
    mixin(o, {req: req, res: res, finish: finish});
    const tokenStr = finish ? 'access token' : 'code';
    /* auth FIXME TODO :
    // Client credentials and password MUST have JSON access_token w token_type Bearer
    // !finish MUST HAVE code, state ELSE access_token, expires_in,
    refresh_token, refresh METHOD, see http://oauthbible.com/#oauth-2-three-legged
    */
    if (this.debug) {
      const urlStr = finish ? '!' : ('and authUrl: ' + this.authUrl);
      this.debugLog([ {success: `Valid ${tokenStr} ${urlStr}`}, {list: o.data} ]);
    }
    return this.state(o);
  }

  /**
   * Send user to OAuth provider for granting access or getting the code.
  **/
  auth(req: any = {}, res: any = {}, kwArgs: any = {}) {
    return this.options({id: 'auth', req: req, res: res, options: kwArgs})
      .then(o => this.initOAuth2(o))
      .then(o => this.forceHTTPS(o))
      .then(o => this.state(o))
      .then(o => this.react(o))
      .then(o => this.success(o, req, res), this.authError());
  }
  /**
	 * Exchange the given code from the OAuth provider for an access token.
	**/
  access(req: any = {url: window.location.href}, res: any = {}, kwArgs: any = {}) {
    this.debugLog([ {neutral: 'Getting an access token ...'} ]);
    const optionArgs = {id: 'access', req: req, res: res, options: kwArgs};
    const accessArgs = { query: (req.url && URL.parse(req.url, true).query) || {} };
    return this.options(optionArgs, accessArgs)
      .then(o => this.forceHTTPS(o))
      .then(o => this.state(o))
      .then(o => this.rewrite(o))
      .then(o => this.request(o))
      .then(o => this.success(o, req, res, true), this.authError('eAccess'));
  }
}

export default OAuthTwoClient;
