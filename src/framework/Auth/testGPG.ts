import GPGAuth from './GPGAuth';

import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
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
app.use([bodyParser.json(), bodyParser.urlencoded({ extended: true })]);

const HOST = 'https://redaktor.circinus.uberspace.de/redaktornode/';

var m: any = new GPGAuth({
  debug: true,
  callbackUrl: HOST,
  renderForm: true // (default false)
});

var testState = 'redaktorABCDEFGHIJKLMNOPQRZ12345';
app.get('/', (req: any, res: any) => {
  m.auth(req, res, {state: testState, publicKey: process.env.PUB});
});
app.post('/', (req: any, res: any) => {
  m.access(req, res).then((o: any) => {console.log('FINAL', o)});
});
app.listen(5000);
