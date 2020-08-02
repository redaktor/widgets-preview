const locales = {
  de: () => import('./de'),
  es: () => import('./es'),
  fr: () => import('./fr'),
  zh: () => import('./zh')
};
const provider = {
  id: 'twitter',
  title: 'twitter',
  requestUrl: 'https://api.twitter.com/oauth/request_token',
  authUrl: 'https://api.twitter.com/oauth/authenticate',
  accessUrl: 'https://api.twitter.com/oauth/access_token',
  me: {
    templates: ['{protocol:5}://{www:3.*}twitter.com{/userId,path*}'],
    target: 'https://twitter.com{/userId}'
  },
  verify: {
    url: 'https://api.twitter.com/1.1/account/verify_credentials.json',
    meta: { userId: '/screen_name', userMe: '/entities/url/urls/0/expanded_url' }
  },
  setUrl: true,
  // i18n :
  description: 'Whats Happening. Our mission: To give everyone the power to create ' +
    'and share ideas and information instantly, without barriers.',
  setup: {
    instructions: 'Please note: Your twitter account must be connected with a mobile ' +
      'phone number (https://twitter.com/settings/devices). ' +
      'Then open the developer page and click "Create New App" ...',
    key: 'Consumer Key (API Key)',
    secret: 'Consumer Secret (API Secret)',
    url: 'https://apps.twitter.com'
  },
  svg: '<circle fill="#3E373C" cx="224" cy="224" r="224"/> <circle fill="#24A9E6" ' +
  'cx="224" cy="224" r="204"/> <path fill="#FFFFFF" d="M218.813,180.373l0.477,' +
  '7.857l-7.943-0.97c-28.929-3.684-54.208-16.208-75.659-37.232l-10.494-10.431l-2.704,' +
  '7.715c-5.719,17.171-2.062,35.301,9.853,47.5c6.357,6.748,4.926,7.709-6.037,' +
  '3.692c-3.816-1.286-7.15-2.249-7.469-1.768c-1.112,1.125,2.705,15.728,5.719,' +
  '21.512c4.128,8.026,12.562,15.892,21.778,20.543l7.788,3.684l-9.218,0.163c-8.9,0-9.217,' +
  '0.155-8.264,3.529c3.181,10.431,15.742,21.505,29.724,26.321l9.854,3.365l-8.581,' +
  '5.134c-12.717,7.391-27.656,11.555-42.604,11.881c-7.149,0.162-13.034,0.798-13.034,' +
  '1.279c0,1.605,19.39,10.594,30.678,14.122c33.858,10.431,74.075,5.94,104.284-' +
  '11.874c21.452-12.68,42.92-37.875,52.93-62.264c5.399-12.999,10.808-36.758,' +
  '10.808-48.145c0-7.383,0.48-8.344,9.382-17.169c5.235-5.143,10.167-10.756,' +
  '11.123-12.362c1.599-3.046,1.434-3.046-6.673-0.318c-13.507,4.817-15.422,' +
  '4.172-8.744-3.048c4.935-5.141,10.814-14.446,10.814-17.175c0-0.481-2.39,' +
  '0.325-5.089,1.759c-2.853,1.606-9.217,4.01-13.996,5.468l-8.579,2.715l-' +
  '7.784-5.289c-4.291-2.894-10.341-6.103-13.521-7.065c-8.101-2.249-20.507-' +
  '1.923-27.816,0.645C229.941,141.373,217.382,159.985,218.813,180.373z"/>'
};

export default { locales, provider };
