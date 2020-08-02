import URL from '../../url';
const provider = {
  scope: '', /* empty scope = only "me" */
  authUrl: 'https://stackexchange.com/oauth',
  accessUrl: 'https://stackexchange.com/oauth/access_token',
  _verifyOptions: (provider: any, oauth: any) => {
    const _u = URL.parse(provider.url);
    const hostSite = _u.host.replace(/[.]com/g, '').replace(/[.]stackexchange/g, '');
    return {
      url: 'https://api.stackexchange.com/2.2/me',
      responseType: 'json',
      oauth: oauth,
      query: {
        order: 'desc',
        filter: 'withbody',
        site: (hostSite === '') ? 'stackoverflow' : hostSite,
        access_token: oauth.access_token,
        key: provider.apiKey
      }
    }
  },
  /* NOTE site = host.replace(/[.]com/g, '').replace(/[.]stackexchange/g, '') */
  svg: '<circle fill="#3E373C" cx="224" cy="224" r="224"/> <circle fill="#F2F9FC" cx="224" cy="224" r="204"/> ' +
'<g><path fill="#4068BB" d="M131.32,260.602h185.429v-38.137H131.32V260.602z"/><path fill="#5CA3DE" d="M131.32,' +
'211.483h185.429v-38.146H131.32V211.483z"/><path fill="#9ADFF7" d="M287.323,122H160.715c-16.24,' +
'0-29.396,13.65-29.396,30.468v9.905h185.429v-9.905C316.749,135.65,303.573,122,287.323,122"/><path fill="#2D4E9B" ' +
'd="M131.32,271.35v9.904c0,16.816,13.156,30.469,29.396,30.469h79.192V352l38.867-40.277h8.549c16.25,' +
'0,29.426-13.652,29.426-30.469v-9.904H131.32"/><path fill="#455CA6" d="M166.103,311.723h-5.388c-16.24,' +
'0-29.396-13.652-29.396-30.469v-9.904h73.74L166.103,311.723"/><path fill="#73AEE2" d="M262.822,211.483H131.32v-' +
'38.146h168.304L262.822,211.483"/><path fill="#5877C4" d="M215.43,260.602h-84.11v-38.137h120.912L215.43,260.602"/></g>'

};

export default provider;
