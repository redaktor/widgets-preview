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
  authUrl: 'https://api.instagram.com/oauth/authorize/',
  accessUrl: 'https://api.instagram.com/oauth/access_token',
  callbackUrl: 'https://redaktor.circinus.uberspace.de/redaktornode/auth',
  scope: 'basic',
  verify: (oauthRes: any) => {  console.log('oauthRes',oauthRes);

  }
});


/*
{ access_token: '430xxx',
  user:
   { username: 'sebastianlasse',
     bio: '',
     website: '',
     profile_picture: 'https://scontent.cdninstagram.com/t51.2885-19/s150x150/13827479_1167675740013158_207377041278894080_a.jpg',
     full_name: 'Sebastian Lasse',
     id: '4304863848' },
  meta: { status: 200 } }
*/

var testState = 'redaktorABCDEFGHIJKLMNOPQRZ12345';
app.get('/', function (req: any, res: any, next: any) {
  //console.log('AUTH HEADERS', JSON.stringify(res.headers));
  g.auth(req, res, {state: testState});
});
app.get('/auth', function (req: any, res: any) {
  //console.log('ACCESS HEADERS', JSON.stringify(res.headers));
  // Obtaining access_token, verifying, logging
  g.access(req, res, {state: testState}).then(g.verify)
});
app.listen(5000);
