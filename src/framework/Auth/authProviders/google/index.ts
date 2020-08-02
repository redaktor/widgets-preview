const locales = {
  de: () => import('./de'),
  es: () => import('./es'),
  fr: () => import('./fr'),
  zh: () => import('./zh')
};
const provider = {
  id: 'google',
  title: 'google+',
  scope: 'https://www.googleapis.com/auth/plus.me',
  authUrl: 'https://accounts.google.com/o/oauth2/auth',
  accessUrl: 'https://www.googleapis.com/oauth2/v4/token',
  me: {
    templates: [
      '{protocol:5}://{www:3.*}profiles.google.com{/userId,path*}',
      '{protocol:5}://{www:3.*}plus.google.com{/userId,path*}',
      '{protocol:5}://{www:3.*}google.com{/userId*}'
    ],
    target: 'https://plus.google.com/{+userId}/about/?gmbpt=true&fd=2',
    agent: 'curl/7.51.0'
  },
  verify: { /* please note : google deprecated original google plus idea on 24th Jan 2017 */ },
  // i18n :
  description: 'Get way into what you love. Real-life sharing rethought for the web.',
  setup: {
    instructions: 'Please note: Open the developer page and create your credentials...',
    key: 'Client-ID',
    secret: 'Clientkey',
    url: 'https://console.developers.google.com/apis/credentials'
  },
  svg: '<circle fill="#3E373C" cx="224" cy="224" r="224"/> <circle fill="#FFFFFF" ' +
  'cx="224" cy="224" r="203"/> <path fill="#D34836" d="M224.003,20C111.333,20,20,' +
  '111.202,20,223.705c0,112.501,91.333,203.704,204.003,203.704c3.023,0,6.028-0.079,' +
  '9.02-0.209c19.362-8.839,29.387-24.637,29.387-43.568c0-24.238-15.544-37.034-51.776-' +
  '62.803c-3.759-0.338-6.153-0.338-10.937-0.338c-4.274,0-29.909,0.854-49.902,7.506c-10.424,' +
  '3.754-40.844,15.192-40.844,48.978c0,3.674,0.391,7.234,1.153,10.662c-33.61-24.898-34.909-' +
  '30.739-33.843-31.887c-0.08,0.003-0.165,0.005-0.26,0.005c5.702-9.575,14.548-18.991,27.651-' +
  '26.729c29.565-18.091,69.384-20.484,90.914-21.843c-6.663-8.534-14.352-17.58-14.352-32.427c0-' +
  '8.023,2.391-12.797,4.785-18.428c-5.299,0.51-10.425,1.021-15.212,1.021c-50.412,0-78.953-37.545-' +
  '78.953-74.571c0-21.843,10.083-46.112,30.42-63.671C148.424,96.806,180.724,93,206.359,93h97.922l-' +
  '30.416,17.082h-29.402c10.94,9.025,33.673,28.016,33.673,64.162c0,35.157-19.998,51.708-39.818,' +
  '67.404c-6.326,6.146-13.334,12.805-13.334,23.208c0,10.41,7.008,16.213,12.307,20.483l17.095,' +
  '13.309c21.019,17.406,39.985,33.619,39.986,66.384c0,20.703-9.28,41.483-27.37,57.828C359.013,403.144,' +
  '428,321.474,428,223.705C428,111.202,336.664,20,224.003,20z M373.371,230.56h-22.729v-53.524h-53.063v-' +
  '22.28h53.062v-53.055h22.73v53.055h40.51c2.99,7.228,5.577,14.661,7.738,22.28h-48.247V230.56z M176.453,' +
  '108.662c-12.308,0-25.636,6.181-33.325,15.683c-8.032,9.968-10.427,22.765-10.427,35.053c0,31.916,18.458,' +
  '84.645,59.474,84.645c11.79,0,24.608-5.802,32.303-13.315c10.93-10.922,11.791-26.106,11.791-34.641C236.269,' +
  '161.784,215.927,108.662,176.453,108.662z"/>'
};

export default { locales, provider };
