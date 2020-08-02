import { OAuthArgs, OAuth1Options } from './interfaces';
import OAuthOne from './one';
import { mixin } from '../../../dojo/core/util';

export class OAuthEcho extends OAuthOne {
  protected _type: any = 'Echo';
  protected _authKey: string = 'X-Verify-Credentials-Authorization';
  constructor(
    private realm: OAuth1Options | string, private verify_credentials?: string,
    ...args: any[]
  ) {
    super(<OAuth1Options>mixin({
      consumerKey: realm,
      consumerSecret: verify_credentials
    }, args));
  }
  get _headerPrefix(): string {
    return ['OAuth realm="',this.realm,'",'].join('');
  }
  protected _getOAuthParams(kwArgs: OAuthArgs) {
    var oauthParams = this.OAuthParams;
    if (kwArgs.oauth_token) {oauthParams['oauth_token'] = kwArgs.oauth_token;}
    mixin(kwArgs, {
      method: 'GET',
      url: this['verify_credentials']
    });
    oauthParams.oauth_signature = this._getSignature(kwArgs, oauthParams);
    return this._sortParams(oauthParams);
  }
}

export default OAuthEcho;
