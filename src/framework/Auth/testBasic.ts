import Auth from '.';

var basic: any = new Auth({
  debug: true,
  authUrl: 'https://redaktor.circinus.uberspace.de/redaktornode/basic',
  test: 'https://redaktor.circinus.uberspace.de/redaktornode{/key}',
  key: 'sebi',
  secret: 'sebi'
});

basic.auth().then((verifyRes: any) => { console.log('auth verifyRes', verifyRes); });
