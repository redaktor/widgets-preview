import URL from '../../../url';
import stackNetworkAPI from '../_stacknetwork';
const provider = {...{}, ...stackNetworkAPI, ...{
  id: 'stackexchange',
  title: 'StackExchange',
  me: {
    templates: [
      '{protocol:5}://{www:3.*}stackexchange.com/users{/userId,aliasName,path*}{?tab}'
    ],
    target: 'https://{www}stackexchange.com/users{/userId}{/aliasName}',
    query: { tab: 'profile' }
  },
  verify: {
    set: {
      options: stackNetworkAPI._verifyOptions,
      result: (provider: any, oauth: any): any => {
        return ((res: any) => {
          const u = URL.parse(provider.originalUrl, true)
          res.data.userId = ((u.host.toLowerCase().replace('www.','') === 'stackexchange.com') ?
            res.data.items[0].account_id : res.data.items[0].user_id).toString();
          return res;
        });
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
        when: function(o: any) { return (o.providerID === 'stackexchange') }
      }
    ],
    /* TODO - API KEY is "key" - unusual but NEEDED - NOTE */
    url: 'http://stackapps.com/apps/oauth/register'
  },
  // i18n :
  description: 'Stack Exchange is a network of 161 communities that are created and run by experts and enthusiasts ' +
    'like you who are passionate about a specific topic. We build libraries of high-quality questions and answers, ' +
    'focused on each community\'s area of expertise.'
  // mixed in by stackExchange : setup: {}, svg: ''
}};

export default { provider };
