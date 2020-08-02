import stackNetworkAPI from '../_stacknetwork';

const provider = {...{}, ...stackNetworkAPI, ...{
  id: 'stackoverflow',
  title: 'Stack Overflow',
  me: {
    templates: [
      '{protocol:5}://{www:3.*}stackoverflow.com/users{/userId,aliasName,path*}{?tab}'
    ],
    target: 'https://stackoverflow.com/users{/userId}{/aliasName}',
    query: { tab: 'profile' }
  },
  verify: {
    set: {
      options: stackNetworkAPI._verifyOptions,
      result: (provider: any, oauth: any): any => {
        return ((res: any) => { res.data.userId = res.data.items[0].user_id.toString(); return res; });
      }
    },
    meta: { userId: '/userId', userMe: '/items/0/website_url' }
  },
  setup: {
    instructions: 'StackExchange maintains a unified API for all network pages.' +
      'Please note: Open the developer page and "Register Your V2.0 Application"',
    key: 'Client Id',
    secret: 'Client Secret',
    additionalProperties: [
      {
        type: 'input',
        name: 'provider_apiKey',
        message: function(this: any) { return this.msg('qApiKey') },
        when: function(o: any) { return (o.providerID === 'stackoverflow') }
      }
    ],
    /* TODO - API KEY is "key" - unusual but NEEDED - NOTE */
    url: 'http://stackapps.com/apps/oauth/register'
  },
  // i18n :
  description: 'Stack Overflow is the largest online community for programmers to learn, ' +
    'share their knowledge and advance their careers. A StackExchange network site.',
  svg: '<circle fill="#3E373C" cx="224" cy="224" r="224"/><circle fill="#FCF9F2" cx="224" cy="224" r="204"/>' +
  '<g><polygon fill="#BCBBBB" points="298.108,329.733 298.108,261.644 320.707,261.644 320.707,352.334 ' +
  '116.727,352.334 116.727,261.644 139.327,261.644 139.327,329.733"/><path fill="#F48023" d="M164.274,' +
  '255.187l110.941,23.187l4.694-22.306l-110.94-23.188L164.274,255.187z M178.948,202.357l102.724,' +
  '47.84l9.393-20.545L188.34,181.52L178.948,202.357z M207.418,151.876l87.169,72.493l14.38-17.315l-87.169-72.494'+
  'L207.418,151.876z M263.769,98.167l-18.198,13.501l67.506,90.984l18.195-13.501L263.769,98.167z M161.926,'+
  '306.841h113.29v-22.599h-113.29V306.841z"/></g>'
  // mixed in by stackExchange : setup: {}
}};

export default { provider };
