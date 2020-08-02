import OAuthOne from './OAuth/one';
import OAuthTwo from './OAuth/two';
import * as http from 'http';
import * as URL from 'url';

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

var flickr: any = new OAuthOne({
  debug: true,
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  requestUrl: 'https://www.flickr.com/services/oauth/request_token',
  authUrl: 'https://www.flickr.com/services/oauth/authorize?perms=read',
  accessUrl: 'https://www.flickr.com/services/oauth/access_token',
  callbackUrl: HOST + 'callback',
  //options: {request: {}, access: {}}
  verify: (oauthRes: any) => { console.log('oauthRes',oauthRes);

  return {fullname: oauthRes.data.fullname}
   /*
  oauthRes { data:
   { oauth_token: '1767',
     oauth_token_secret: 'zM',
     user_id: '17674844',
     screen_name: 'sl007',
     x_auth_expires: '0',
     authUrl: 'https://api.flickr.com/oauth/authenticate?oauth_token=1767...' },

    return flickr.get({
      url: 'https://api.flickr.com/1.1/account/verify_credentials.json',
      responseType: 'json',
      oauth: oauthRes.data
    });*/
  }
});
//console.log(flickr.callback.path);

/* Easier to use redaktor.auth middlewares - testing OAuth1 here */
/* Basically app.get('/',flickr.auth.bind(flickr)); */
var testState = 'redaktorABCDEFGHIJKLMNOPQRZ12345';
app.get('/', (req: any, res: any) => {
  flickr.auth(req, res, {state: testState}).then((authRes: any) => {
    console.log('flickr authRes', authRes);
  })
});
app.get('/callback', (req: any, res: any) => {
  // Obtaining access_token, verifying, logging
  flickr.access(req, res)
  .then(flickr.verify)

  .then((verifyRes: any) => {
    console.log('flickr verifyRes', verifyRes);
    res.json(verifyRes);
  });

});
app.listen(5000);
