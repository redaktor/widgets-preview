import OAuthOne from './OAuth/one';
import OAuthTwo from './OAuth/two';
import { lang } from '../../dojo/core';
import { base64 } from '../../dojo/core/encoding';
import * as http from 'http';
import URL, { Parameters } from '../url';

import * as express from 'express';
import * as session from 'express-session';
import * as helmet from 'helmet';

var app = express();
app.use(session({
  secret: 'evtlEnterAnythingHER3_butSALTit:', //+ IndieAuth.salt,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // maxAge: 60000
    /* TODO FIXME in production : */
    /* secure: true */
  }
}));

const HOST = 'https://redaktor.circinus.uberspace.de/redaktornode/';

var twitter: any = new OAuthOne({
  debug: true,
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  requestUrl: 'https://api.twitter.com/oauth/request_token',
  authUrl: 'https://api.twitter.com/oauth/authenticate',
  accessUrl: 'https://api.twitter.com/oauth/access_token',
  callbackUrl: HOST + 'callback',
  //options: {request: {}, access: {}}
  verify: (oauthRes: any) => {
    console.log('oauthRes',oauthRes);
    return oauthRes;
  /*
  oauthRes { data:
   { oauth_token: '1767',
     oauth_token_secret: 'zM',
     user_id: '17674844',
     screen_name: 'sl007',
     x_auth_expires: '0',
     authUrl: 'https://api.twitter.com/oauth/authenticate?oauth_token=1767...' },
  */

  /*
    return twitter.get({
      url: 'https://api.twitter.com/1.1/account/verify_credentials.json',
      responseType: 'json',
      oauth: oauthRes
    });
  */
  }
});

/* Easier to use redaktor.auth middlewares - testing OAuth1 here */
/* Basically app.get('/',twitter.auth.bind(twitter)); */
var testState = 'redaktorABCDEFGHIJKLMNOPQRZ12345';
app.get('/', (req: any, res: any) => {
  twitter.auth(req, res, {state: testState});
});

app.get('/callback', (req: any, res: any) => {
  // Obtaining access_token, verifying, logging
  twitter.access(req, res).then(twitter.verify, (e: any) => { console.log('ERROR.', e)})
  .then((verifyRes: any) => {
    console.log('twitter verifyRes', verifyRes);
    res.json(verifyRes.screen_name);
  });

});
app.listen(5000);
