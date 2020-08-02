import { Response } from 'dojo-core/request';
import { NodeRequestOptions } from '../../RequestMixin/request/node';
import { authRequest, authResponse } from '../../RequestMixin/interfaces';
export interface OAuthRequest<T> extends authRequest {}
export interface OAuthResponse<T> extends authResponse<any> {}
export interface polyURL extends URL {
  raw?: string;
  query?: any;
}
export interface ClientOptions extends NodeRequestOptions<any> {
  requestMethod?: string;
  accessMethod?: string;
  followRedirects?: boolean;
  allowHTTP?: boolean;
  useHeaders?: boolean;
  responseType?: string;
}
export interface OAuthOptions extends ClientOptions {
  _version?: string;
  debug?: boolean;
  id?: string;
  /* URL to exchange a user-authorized request token for an access token: */
  accessUrl?: string | polyURL;
  authUrl?: string | polyURL;
  /* URL to which the service provider redirects after authorization: */
  callbackUrl?: string;
  /* URL to use after succesful auth */
  verifyUrl?: string;
  /* If `true`, `req` is first argument to the callback (default: `false`): */
  passReqToCallback?: boolean;
  /* header mixin */
  customHeaders?: string;
  /* verify function */
  verify?: any;
}
export interface OAuth1Options extends OAuthOptions {
  /* Identifies client to service provider: */
  consumerKey: string;
  /* Confidential secret used to establish ownership of the consumer key: */
  consumerSecret: string;
  /* URL to obtain an unauthorized request token: */
  requestUrl?: string | polyURL;
  /* Method used to sign the request (default: `'HMAC-SHA1'`): */
  _signMethod?: string;
  /* Length of random nonce */
  _nonceSize?: number;
}
export interface OAuth2Options extends OAuthOptions {
  /* Identifies client to service provider: */
  clientId: string;
  /* Confidential secret used to establish ownership of the consumer key: */
  clientSecret: string;
  /* Scope TODO */
  scope?: string;
}
export interface OAuth1Params {
  oauth_timestamp: string;
  oauth_nonce: string;
  oauth_version: string;
  oauth_signature_method: string;
  oauth_consumer_key: string;
  oauth_token?: string;
  oauth_signature?: string;
}
export interface OAuthArgs {
  oauth?: any;
  url?: string;
  method?: string;
  headers?: any;
  query?: any;
  data?: any; /* post_body, NOT recommended in OAuth1 */
  responseType?: string;
  cacheBust?: boolean;
  followRedirects?: boolean;

  oauth_token?: string;
  oauth_token_secret?: string;
  oauth_verifier?: string;

  access_token?: string;
  token_type?: string;
  expires_in?: string;
  set?: any;
}
