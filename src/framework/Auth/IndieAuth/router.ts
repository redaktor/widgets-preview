import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as csrf from 'csurf';
import { lang } from '../../../dojo/core/main';
import Promise from '@dojo/framework/shim/Promise';
import { objectPromiseAll } from '../../util/promise';
import { getLocaleObj, getLocalLangName, getCachedI18n } from '../../util/i18n';
import nlsBundles from './nls/_i18n';
import IA from './main';

/* Please NOTE that any console log before here is deleted now */
//console.log('\x1Bc');
const IndieAuth: any = new IA({debug: true});

/* INDIEAUTH : */
/* ROUTER FUNCTIONS : */
function localizedRoute(routeStr: string) {
  /* TODO FIXME */
  if (routeStr === 'test') {
    const data = require('./test.json');
    // TODO if languages is undefined it will be an empty string causing a fn with objects an error :
    return ((req: any, res: any) => { res.locals.languages = {}; IndieAuth.test(data, res)})
  }

  const view = (!routeStr.length || routeStr === 'home') ? 'index' : routeStr;
  return ((req: any, res: any) => {
    const _lang = (IndieAuth.session(req).locale || getLocaleObj(req).locale);
    const _locales = ['en'].concat(nlsBundles[view].locales||[]);
    const _languages = _locales.reduce((o: any, locale: string) => {
      o[locale] = getLocalLangName(locale);
      return o;
    }, {});
    objectPromiseAll({
      common: getCachedI18n(_lang, nlsBundles.common),
      page:   getCachedI18n(_lang, nlsBundles[view])
    }).then((results: any) => {
      lang.mixin(res.locals, results.common.messages, results.page.messages, {
        language: _lang,
        languages: _languages,
        locales: _locales
      });
      (view === 'auth') ? IndieAuth.auth(req, res) : res.render(view+'.html');
    });
  });
}

function switchLanguage(req: any, res: any) {
  if (req.params.locale.match(/^[a-z]{2,3}(?:-[a-zA-Z]{4})?(?:-[A-Z]{2,3})?$/)) {
    const s = IndieAuth.session(req);
    /* TODO should hasSesssion directly return session instead of true ? */
    IndieAuth.session(req, lang.mixin({}, s, getLocaleObj(req.params.locale, nlsBundles.common)||{}));
  }
  res.redirect('back');
}
/* Initial language : */
const doInitialLanguage = (req: any, res: any, next: any) => {
  if (req.xhr || req.headers.accept.indexOf('json') > -1) { return next() }
  console.log(req.method, req.url, req.path);
  if (!IndieAuth.hasSession(req)) {
    const s = IndieAuth.session(req);
    /* TODO should hasSesssion directly return session instead of true ? */
    IndieAuth.session(req, lang.mixin({}, s, getLocaleObj(req, nlsBundles.common)||{}));
  }
  console.log('initial lang session', IndieAuth.session(req));
  next();
}

const IndieAuthRouter = express.Router();
/* POST bodies */
const doParseBody = [bodyParser.json(), bodyParser.urlencoded({ extended: true })];
/* Sessions: IndieAuth gives you one constant salt per server password */
const doSession = session({
  name: 'sessionId',
  secret: 'evtlEnterAnythingHER3_butSALTit:' + IndieAuth.salt,
  resave: false,
  saveUninitialized: false,
  cookie: {
    //secure: true,
    httpOnly: true
    /* TODO - FIXME from config :
    domain: 'example.com',
    path: 'foo/bar',
    expires: expiryDate
    */
  }
});
/* CSRF */
const doCSRF = csrf({
  value: (req: any) => {
    const _state = (!!(req.query) && req.query.state) || (!!(req.body) && req.body.state);
    if (!!_state) {
      try {
        const _o = JSON.parse(_state);
        if (typeof _o === 'object' && _o._csrf) { return _o._csrf; }
      } catch(e) {}
      return _state;
    } else {
      // std:
      return (req.body && req.body._csrf) ||
      (req.query && req.query._csrf) ||
      (req.headers['csrf-token']) ||
      (req.headers['xsrf-token']) ||
      (req.headers['x-csrf-token']) ||
      (req.headers['x-xsrf-token']);
    }
  }
});
/* Mix CSRF in locals for client */
const doLocalsCSRF = (req: any, res: any, next: any) => {
  res.locals.csrf = req.csrfToken();
  next();
};
/* Handle CSRF errors specifically */
const doErrorCSRF = (err: any, req: any, res: any, next: any) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  res.status(403).json({"error": "Session has expired or tampered with"});
};

IndieAuthRouter.use(
  doParseBody,
  /* Std. security related headers */
  helmet(),
  doSession,
  doCSRF,
  doLocalsCSRF,
  doErrorCSRF,
  doInitialLanguage
);


const autoauth = (req: any) => {
  console.log(req);
}
/* ROUTES : */
// Language Handling
IndieAuthRouter.get('/language/:locale', switchLanguage);
// GET routes
['', 'home', 'setup', 'developers', 'faq', 'history', 'auth', 'test'].map((s: string) => {
  IndieAuthRouter.get('/'+s, localizedRoute(s));
});
// POST access routes (e. g. Mail and GPG auth)
IndieAuthRouter.post('/auth', localizedRoute('auth'));

// TEST FOR https://indieweb.org/2018/Nuremberg/autoauth
IndieAuthRouter.get('/autoauth', autoauth);


/* TEST FOR BasicAuth */
/*
function unauthorized(res: any, realm: string) {
  var realm = realm || 'Authorization Required';
  res.set('WWW-Authenticate', 'Basic realm=' + realm);

  return res.sendStatus(401);
};

function isPromiseLike(obj: any) {
  return obj && typeof obj.then === 'function';
}

function decodeBase64 (str: string) {
  return new Buffer(str, 'base64').toString('utf8')
}

var CREDENTIALS_REGEXP = /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9._~+/-]+=*) *$/;
var USER_PASS_REGEXP = /^([^:]*):(.*)$/;
IndieAuthRouter.get('/basic', (req: any, res: any, next: any) => {
  var match = CREDENTIALS_REGEXP.exec(req.headers.authorization);
  if (!match || match.length < 2) { return unauthorized(res, realm); }
  var u = USER_PASS_REGEXP.exec(decodeBase64(match[1]));
  //userPass[1], userPass[2]
  var realm = '';
  if (!u) {
    console.log('e1');
    return unauthorized(res, realm);
  }
  var user = {name:'sebi', pass:'sebi'};
  console.log('1',u);
  var authorized = !(!user || user.name !== u[1] || user.pass !== u[2]);
  if (!authorized) { return unauthorized(res, realm); }
  return res.status(200).json({status: 200, ok: 'OK'});
});
*/
/* */
export default IndieAuthRouter;
