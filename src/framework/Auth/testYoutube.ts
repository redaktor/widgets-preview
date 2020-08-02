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
  scope: 'https://www.googleapis.com/auth/youtube.readonly',
  authUrl: 'https://accounts.google.com/o/oauth2/auth',
  accessUrl: 'https://www.googleapis.com/oauth2/v4/token',
  verifyUrl: 'https://www.googleapis.com/oauth2/v1/userinfo',
  callbackUrl: 'https://redaktor.circinus.uberspace.de/redaktornode/auth',
  verify: (oauthRes: any) => {  console.log('oauthRes',oauthRes);
    return g.get({
      url: 'https://www.googleapis.com/youtube/v3/channels',
      query: {
        mine: true,
        part: 'id,snippet'
      },
      responseType: 'json',
      oauth: oauthRes
    });
  }
});


/* Easier to use redaktor.auth middlewares - testing OAuth1 here */
/* Basically app.get('/',twitter.getRequestToken.bind(twitter)); */
/*
app.get('/2', (req: any, res: any) => {
  twitter2.auth().then(function(v){
    console.log('-1',v);
  },
  function(e){
    console.log('-2',e);
  })
});
app.get('/testerror', function (req: any, res: any, next: any) {
  res.status((req.query.status) ? parseInt(req.query.status) : 400).end();
});
*/

var testState = 'redaktorABCDEFGHIJKLMNOPQRZ12345';
app.get('/', function (req: any, res: any, next: any) {
  //console.log('AUTH HEADERS', JSON.stringify(res.headers));
  g.auth(req, res, {state: testState});
});
app.get('/auth', function (req: any, res: any) {
  //console.log('ACCESS HEADERS', JSON.stringify(res.headers));
  // Obtaining access_token, verifying, logging
  g.access(req, res, {state: testState})
    .then(g.verify)
    .then(function (gRes: any) {
      console.log('googleData', gRes.data);

      if (gRes.data.meta.status === 200) {
        res.json(gRes.data);
      } else {
        res.status(gRes.data.meta.status||404).send('Sorry, we cannot find that!');
      }

    });
});
app.listen(5000);
