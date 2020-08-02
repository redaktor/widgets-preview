import { indieAuthProvider, indieAuthProviders } from './interfaces';
import has from '@dojo/framework/has/has';
import * as lang from '../../../dojo/core/util';
import * as uriTemplates from 'uri-templates';
import jwt from '../../JSON/webtoken';
import { log, pwLog } from '../../log';
import { start } from '../../String/startEnd';
import { displayUrl } from './widgets/microformats/util';
import nlsCLI from './nls/CLI';
//import providers from './providers';
const providers: any = {
  authorization_endpoint: 1,
  askubuntu: 1,
  flickr: 1,
  github: 1,
  /* google: google, */
  instagram: 1,
  mail: 1,
  pgpkey: 1,
  /* sms: sms, */
  stackexchange: 1,
  stackoverflow: 1,
  superuser: 1,
  twitter: 1,
  youtube: 1
};
/**
 * ...
 * ...
 */
 /*
 TODO FIXME
 "always exit" option
 if user enter password wrong >n times
 */

const _N = has('host-node');
const fs: any = (_N) ? require('fs') : {};
const path: any = (_N) ? require('path') : {};
//TODO const _auth: any = (_N) ? require('../authProviders/main') : {};
const messages = nlsCLI.messages;

export const OS = (_N) ? process.platform : navigator.platform;
export const userDir = (_N) ? process.env[(OS === 'win32') ? 'USERPROFILE' : 'HOME'] : '~';

function _providerWarnings(_providers: indieAuthProviders) {
  const status: any = { notFound: [], invalid: [], hasWarning: false }
  var key: string;
  for (key in _providers) {
    if (key === 'authorization_endpoint') { continue; }
    if (!(_providers[key].valid)) {
      const err = _providers[key].errors||[{}];
      const sKey = (err[0].code === 400) ? 'notFound' : 'invalid';
      status[sKey].push(key);
    }
  }
  status.hasWarning = (!!(status.notFound.length) || !!(status.invalid.length));
  if (status.hasWarning) { console.log(' '); console.log(messages.warning); }
  if (!!(status.notFound.length)) {
    doLog({ error: (messages.vNotFoundCred + ' : "' + status.notFound.join('", "') + '" !') });
  }
  if (!!(status.invalid.length)) {
    doLog({ error: (messages.vInvalidCred + ' : "' + status.invalid.join('", "') + '" !') });
  }
  if (status.hasWarning) { console.log('  ' + messages.vHintCred); console.log('  '); }
}
function providerLinkObj(my: any, url: string, userId: string, props: any) {
  let provider = {
    ...{originalUrl: url, url: url, userId: userId},
    ...(my['rel-urls'].hasOwnProperty(url) ? my['rel-urls'][url] : {text: url}),
    ...props
  };
  return provider;
}

export function getProviders( this: any,
  pw = '', doWarn = true, exclEndpoint = false, inclSetup = false
): indieAuthProviders {
  const _providers: any = {};
  const _hasPW = (pw !== '' && !!checkPW(pw));
  var key: string;
  for (key in providers) {
    if (!!(exclEndpoint) && key === 'authorization_endpoint') { continue; }
    const PROVIDER = providers[key].provider;
    const FAILED = lang.mixin({}, PROVIDER, {
      valid: false,
      errors: [{message: messages.vNoCred, code: 400}],
      client: null
    });
    if (!_hasPW) {
      /* no need for credentials, only config description */
      _providers[key] = {...{valid: true}, ...PROVIDER};
    } else if (!!(_N)) {
      const _token = (key === 'pgpkey') ? {} : readToken(pw, key, this.subDir);
      const _options: any = {debug: this.debug}
      if (!(_token.callbackUrl) && !!(this._url)) { _options.callbackUrl = this._url; }
      if (!!(_token) && (key === 'pgpkey' || _token.statusCode === 200)) {
        /* node.js: got credentials, return client TODO */
        //_providers[key] = _auth.providerClient(lang.mixin({}, PROVIDER, _token, _options));
      } else {
        /* got no credentials, error if not 'authorization_endpoint' or 'pgpkey' */
        _providers[key] = (key === 'authorization_endpoint') ? PROVIDER : FAILED;
      }
    } else {
      /* pw but not node, error */
      _providers[key] = FAILED;
    }
    if (!!_providers[key].setup && !inclSetup) { delete _providers[key].setup; }
  }
  (!!((_N)) && !!(doWarn) && _providerWarnings(_providers)); /* TODO make independent as in CLI */
  return Object.freeze(_providers);
}

export function providerLinks(my: any, providers: indieAuthProviders) {
  return (url: string) => {
    let i: number, key: string, o: any;
    let props: any = { key: false, url: url };
    let uId: string = '';
    providerLoop:
    for (key in providers) {
      const _provider = providers[key];
      if (!(_provider.me) || !(_provider.me.templates)) { continue; }
      for (i = 0; i < _provider.me.templates.length; i++) {
        uId = '';
        o = uriTemplates(_provider.me.templates[i]).fromUri(decodeURIComponent(url));
        if (!!o && typeof o.userId === 'string' && o.userId.length) {
          uId = o.userId;
        } else if (!!o && Array.isArray(o.userId) && o.userId.length === 1) {
          uId = o.userId[0];
        }
        if (uId !== '') {
          props = { key: key, valid: _provider.valid, me: _provider.me, display: uId };
          props.url = uriTemplates(props.me.target).fillFromObject({...o, ...{userId: uId}});
          break providerLoop;
        } else {
          props.display = displayUrl(props.url);
        }
      }
    }
    return providerLinkObj(my, url, uId, props);
  }
}
export function endpointLinks(my: any, endpoints: any[] = []) {
  ['authorization_endpoint', 'pgpkey'].forEach((key) => {
    if (my.rels.hasOwnProperty(key) && !!(my['rel-urls'])) {
      endpoints = my.rels[key].map((url: string) => {
        const _o = { key: key, valid: true, display: displayUrl(url), url: url };
        return providerLinkObj(my, url, url, _o);
      });
    }
  });
  return endpoints;
}
// sort providers
export function validFirst(a: indieAuthProvider, b: indieAuthProvider) {
  var isP = [(!!(a.valid) && !!(a.key)), (!!(b.valid) && !!(b.key))];
  if (!!isP[0] && !isP[1]) { return -1; }
  if (!!isP[1] && !isP[0]) { return 1; }
  return 0;
}

export function getTokenChoices(subDir = '.IndieAuth') { /* CLI */
  if (!(_N)) { throw new Error('requires node.js'); }
  const dir = path.resolve(userDir,subDir);
  return fs.readdirSync(dir)
  .filter((file: string) => {
    try {
      const stats = fs.lstatSync(path.join(dir, file));
      if (stats.isSymbolicLink()) { return false; }
      const isDir = stats.isDirectory();
      const isDotFile = (path.basename(file).indexOf('.') === 0);
      const hasJWT = (file !== 'IndieAuth.jwt' && path.extname(file) === '.jwt');
      return (!(isDir) && !(isDotFile) && hasJWT);
    } catch (error) {
      return false;
    }
  })
  .map((file: string) => ({ name: file, value: path.basename(file, '.jwt') }))
  .sort();
}

export function readToken(pw: string, fileBaseName = 'IndieAuth', subDir = '.IndieAuth') {
  if (!(_N)) { throw new Error('requires node.js'); }
  const dir = path.resolve(userDir,subDir);
  const fileName = [fileBaseName,'jwt'].join('.');
  try {
    const jwTokenR = fs.readFileSync(path.resolve(dir, fileName), 'utf8');
    return (jwt.decode(jwTokenR, pw)||{});
   } catch(e) {
     if (fileBaseName === 'IndieAuth') {
       /* TODO FIXME password recovery ? */
       /* NO password token, delete folder ??? - unexpected error */
     }
     return {};
   }
}
export function writeToken(o: any, pw: string, subDir = '.IndieAuth'): boolean|string {
  if (!(_N)) { throw new Error('requires node.js'); }
  const dir = path.resolve(userDir,subDir);
  const tokenRes = (!!(o.providerID) ? { provider: o.providerID } : o);
  const fileName = [(!!(o.providerID) ? o.providerID : 'IndieAuth'),'jwt'].join('.');
  let stats: any = {};
  if (fileName !== 'IndieAuth.jwt') {
    try { stats = fs.lstatSync(path.join(dir, fileName)); } catch (e){}
    var key: string;
    for (key in o) {
      if (start(key, 'provider_')) {
        tokenRes[key.replace('provider_', '')] = o[key];
      }
    }
    /* TODO - error handling */
  }
  const cDate = (!!(stats.birthtime)) ? stats.birthtime : (new Date());
  const uDate = (!!(stats.birthtime)) ? (new Date()) : null;
  const content = {...{statusCode: 200, iat: cDate, uat: uDate}, ...tokenRes};
  const jwTokenW = jwt.encode(content, pw, 'sha256');
  try { fs.writeFileSync(path.resolve(dir, fileName), jwTokenW, 'utf8'); } catch(e) {
    return false;
  }
  return jwTokenW;
}

export function checkPW(pw: string): any {
  if (!(_N)) { throw new Error('requires node.js'); }
  const jwToken = (typeof pw === 'string') ? readToken(pw) : void 0;
  if (typeof jwToken !== 'object' || !(jwToken.salt) || jwToken.statusCode !== 200) {
    return void 0;
  }
  return jwToken;
}

export function doLog(logArr: any, doPadding: boolean = false, inclFn: boolean = false) {
 if (!Array.isArray(logArr)) { logArr = [logArr]; }
 log(logArr, doPadding, inclFn);
}
export function logToken(token: any, title = '') {
  // log a shallow copy with readable dates etc.
  const o = lang.mixin({}, token);
  const dateOptions = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short'
  };
  Object.keys(o).forEach((key) => {
    if ((key === 'iat' || key === 'uat') && !!(token[key])) {
      o[key] = (<any>new Date(o[key])).toLocaleDateString(['en','de'], dateOptions);
    }
    if (key.indexOf('secret') > -1) { o[key] = pwLog(o[key], 2); }
  });
  doLog([
    { success: ['JWT credentials for ' + ((title === '') ? token.provider : title) + ' :'] },
    { list: o }
  ], true);
}
