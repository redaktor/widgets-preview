const locales = {
  de: () => import('./de')
};
const provider = {
  id: 'sms',
  title: 'SMS',
  authUrl: 'https://api.twilio.com/2010-04-01',
  /*
  var defaultHost = 'api.twilio.com';
  var defaultApiVersion = '2010-04-01';
   return 'https://' + this.accountSid + ':' + this.authToken + '@' + this.host + '/' + this.apiVersion;
  options.headers = {
          'Accept':'application/json',
          'Accept-Charset': 'utf-8',
          'User-Agent':'twilio-node/' + moduleinfo.version
      };
  this.accounts.sms.messages.post;

  /2010-04-01/Accounts/{AccountSid}/Messages
  to, from, body
  */
  // i18n :
  description: 'Sign In with SMS.',
  setup: {
    instructions: 'Please note:\nSMS Auth is not an independent mechanism simply based on protocols.\n' +
      'Since it involves many SILO gateways we use the Twilio API.\nOpen the developer page',
    key: 'AccountSid or API Key Sid',
    secret: 'AuthToken or API Key Secret',
    url: 'https://www.twilio.com/console'
  },
  verify: {
    meta: {userId: '/aud'}
  },
  svg: '<circle fill="#3E373C" cx="224" cy="224" r="224"/> <circle fill="#95cc0d" cx="224" cy="224" r="204"/>' +
  '<g><rect x="128.163" y="121.529" fill="#FF0000" width="191.674" height="53.65"/>' +
  '<rect x="128.163" y="194.753" fill="#FF0000" width="191.674" height="116.747"/></g>'
};

export default { locales, provider };
