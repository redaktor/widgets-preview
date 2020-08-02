/**
 * redaktor/auth/jwt
 *
 * JSON Web Token encode and decode module for browsers and node.js
 *
 */

/* TODO for jwt auth client : header: { 'Access-Control-Allow-Origin': '*' }
 * https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication
 * TODO exp nbf https://github.com/zeit/ms
 */

/**
 * module dependencies
 */
import has from '@dojo/framework/core/has';
import { log, warning } from '../../String/tag/log';
import { urlEncode, urlDecode, escape, unescape } from '../../String/base64';
import crypto, { hmacAlgorithm } from '../../crypto';
const JWT = 'JSON webtoken: ';
/**
 * support algorithm mapping JWT / redaktor.crypto
 */
const algorithmMap: any = {
  HS256: 'sha256',
  HS384: 'sha384',
  HS512: 'sha512',
  RS256: 'RSA-SHA256' /* only node.js */
};
function getAlgos(method: string): any {
  const uMethod = method.toUpperCase();
  if (algorithmMap.hasOwnProperty(uMethod)) {
    return {method: algorithmMap[uMethod], alg: uMethod};
  } else {
    return hmacAlgorithm(method, true);
  }
}

class jwt {
  static version: string = '0.5.0';
  static debug: boolean = false;
  /**
   * Encode jwt
   *
   * @param {Object} payload
   * @param {String} key
   * @param {String} method
   * @param {Object} options
   * @return {String} token
   * @api public
   */
  static encode(payload: any, key: string, method: string = 'HS256', options: any = {}): string {
    // Check key and make header
    if (typeof key != 'string') {
      if (jwt.debug) { log`${JWT}Encoding a JWT requires a "key" string.` }
      throw new Error(`${JWT}Encoding a JWT requires a "key" string.`)
    }
    const m = getAlgos(method);
    let header = { typ: 'JWT', alg: m.alg };
    if (options.header) { header ={...header, ...options.header}; }
    // create segments, all segments should be base64Url string
    var segments: string[] = [];
    segments.push(urlEncode(JSON.stringify(header)));
    segments.push(urlEncode(JSON.stringify(payload)));
    segments.push(this.sign(segments.join('.'), key, m.method));
    return segments.join('.');
  };
  /**
   * Decode jwt
   *
   * @param {Object} token
   * @param {String} key
   * @param {String} method
   * @param {Boolean} doVerify
   * @return {Object} payload
   * @api public
   */
  static decode(token: string, key: string, method: string = 'HS256', doVerify: boolean = true): any {
    // check token and segments
    if (!token) {
      if (jwt.debug) { log`${JWT}No token supplied.` }
      throw new Error(`${JWT}No token supplied.`)
    }
    const m = getAlgos(method);
    const segments = token.split('.');
    if (segments.length !== 3) {
      if (jwt.debug) { log`${JWT}Not enough or too many segments.`; }
      throw new Error(`${JWT}Not enough or too many segments.`)
    }
    // all segment should be base64
    const s = {
      header: segments[0],
      payload: segments[1],
      signature: segments[2]
    }
    // base64 decode and parse JSON
    const header = JSON.parse(urlDecode(s.header));
    const payload = JSON.parse(urlDecode(s.payload));

    if (doVerify) {
      // Support for nbf and exp claims.
      if (jwt.validTime(payload.nbf) && Date.now() < payload.nbf) {
        if (jwt.debug) { log`${JWT}Token not yet active.` }
        throw new Error(`${JWT}Token not yet active.`)
      }
      if (jwt.validTime(payload.exp) && Date.now() > payload.exp) {
        if (jwt.debug) { log`${JWT}Token expired.` }
        throw new Error(`${JWT}Token expired.`)
      }

      // verify signature. `sign` will return base64 string.
      var signingInput = [s.header, s.payload].join('.');
      if ( !jwt.verify(signingInput, key, s.signature, m.method) ) {
        if (jwt.debug) { log`${JWT}Signature verification failed.` }
        throw new Error(`${JWT}Signature verification failed.`)
      }
    }
    return payload;
  };


  static sign(text: string, key: string, method: string = 'HS256'): string {
    const signMethod = (method === 'RSA-SHA256') ? method : null;
    let base64str: string = '';
    if (signMethod) {
      base64str = crypto.sign(text, key, signMethod);
    } else {
      base64str = crypto.hmac(text, key, 'base64', method);
    }
    return escape(base64str);
  }


  static verify(text: string, key: string, signature: string, method: string = 'HS256'): boolean {
    var signMethod = (method === 'RSA-SHA256') ? method : null;
    if (signMethod) {
      if (!has('host-node')) {
        warning('Signature RS verification only available in node.js');
        return false;
      }
      return crypto.verify(text, key, method, unescape(signature));
    } else {
      return (signature === this.sign(text, key, method));
    }
  }

  static header(token:string) {
    if (typeof token !== 'string') { return void 0; }
    const o = JSON.parse(urlDecode(token.split('.')[0]));
    if (!o || typeof o !== 'object' || !o.alg || !o.typ) {
      return void 0;
    }
    return o;
  }
  static payload(token:string) {
    if (typeof token !== 'string') { return void 0; }
    return token.split('.')[1];
  }
  static alg(token: string) {
    const header = jwt.header(token);
    if (!header) { return void 0; }
    return header.alg;
  }
  static algLength(token: string) {
    const alg = jwt.alg(token);
    if (!alg || !algorithmMap[alg]) { return void 0; }
    return parseInt(alg.replace(/^(RS)|(HS)/, ''), 10);
  }
  static validTime(timeNr: number) {
    return (timeNr && !isNaN(timeNr) && typeof timeNr === 'number');
  }
}
export default jwt;
