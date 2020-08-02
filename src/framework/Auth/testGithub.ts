import OAuthTwo from './OAuth/two';
//import IndieAuth from './IndieAuth';
import * as http from 'http';

import * as express from 'express';
import * as session from 'express-session';
import * as helmet from 'helmet';

import URL from '../url';

var app = express();
app.use(helmet());

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


var g = new OAuthTwo({
  debug: true,
  clientId: process.env.CLIENT_KEY,
  clientSecret: process.env.CLIENT_SECRET,
  authUrl: 'https://github.com/login/oauth/authorize',
  accessUrl: 'https://github.com/login/oauth/access_token',
  callbackUrl: 'https://redaktor.circinus.uberspace.de/redaktornode/auth?state=redaktorABCDEFGHIJKLMNOPQRZ12345',
  scope: 'user',
  //Accept: application/vnd.github.v3+json
  verify: (oauthRes: any) => {  console.log('oauthRes',oauthRes);
    return g.get({
      url: 'https://api.github.com/user',
      responseType: 'json',
      oauth: oauthRes
    });
    // userId = data.login
  }
});


var testState = 'redaktorABCDEFGHIJKLMNOPQRZ12345';
app.get('/', function (req: any, res: any, next: any) {
  //console.log('AUTH HEADERS', JSON.stringify(res.headers));
  g.auth(req, res, {state: testState});
});
app.get('/auth', function (req: any, res: any) {
  //console.log('ACCESS HEADERS', JSON.stringify(res.headers));
  // Obtaining access_token, verifying, logging
  g.access(req, res, {state: testState})
    .then(g.verify, (e: any) => {console.log('ACCESS ERR',e)})
    .then(function (gRes: any) {
      console.log('githubData', gRes.data);

      if (gRes.data.meta.status === 200) {
        res.status(200).send('OK! ' + gRes.data.name);
      } else {
        res.status(gRes.data.meta.status||404).send('Sorry, we cannot find that!');
      }

    });
});
app.listen(5000);
