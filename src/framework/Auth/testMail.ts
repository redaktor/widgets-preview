import MailAuth from './MailAuth';

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

var m: any = new MailAuth({
  debug: true,
  callbackUrl: HOST,
  user: 'redaktor-mail',
  pass: process.env.SECRET,
  email: 'mail@redaktor.circinus.uberspace.de',
  name: 'IndieAuth',
  host: 'circinus.uberspace.de',
  port: 587,
  renderForm: true // (default false)
});

/* Easier to use redaktor.auth middlewares - testing OAuth1 here */
/* Basically app.get('/',twitter.auth.bind(twitter)); */
var testState = 'redaktorABCDEFGHIJKLMNOPQRZ12345';
app.get('/', (req: any, res: any) => {
  m.auth(req, res, {state: testState, to: process.env.TO, html: true, xkcd: true});
});
app.post('/', (req: any, res: any) => {
  m.access(req, res).then((o: any) => {console.log('FINAL', o)});
});
app.listen(5000);
