import stackNetworkAPI from '../_stacknetwork';

const provider = {...{}, ...stackNetworkAPI, ...{
  id: 'superuser',
  title: 'superuser',
  me: {
    templates: [
      '{protocol:5}://{www:3.*}superuser.com/users{/userId,aliasName,path*}{?tab}'
    ],
    target: 'https://superuser.com/users{/userId}{/aliasName}',
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
        when: function(o: any) { return (o.providerID === 'superuser') }
      }
    ],
    /* TODO - API KEY is "key" - unusual but NEEDED - NOTE */
    url: 'http://stackapps.com/apps/oauth/register'
  },
  // i18n :
  description: 'Super User is a question and answer site for computer enthusiasts ' +
    'and power users. A StackExchange network site.',
  // mixed in by stackExchange : setup: {}, svg: ''
}};

export default { provider };
