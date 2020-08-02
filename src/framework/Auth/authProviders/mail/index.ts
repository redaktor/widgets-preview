import { _ } from '../../../String/tag/log';

const locales = {
  de: () => import('./de')
};
const provider = {
  id: 'mail',
  title: 'eMail',
  me: {
    templates: [ 'mailto:{userId}' ],
    target: 'mailto:{userId}'
  },
  verify: {
    meta: {userId: '/aud'}
  },
  description: 'We will send you a link to authenticate.',
  setup: {
    instructions: 'Please note: You need your SMTP credentials (address, user ' +
      'and password).\nThe SMTP server should run on port 587.\n' +
      'More infos can be found at the nodemailer developer page ...',
    key: 'SMTP user',
    secret: 'SMTP password',

    url: 'https://nodemailer.com',
    additionalProperties: [
      {
        type: 'input',
        name: 'provider_email',
        message: function(this: any) {
          return _`${this.msg('qMail')}\nmuted${this.msg('eg')} "foo@example.com"`
        },
        validate: function(this: any, value: string) {
          // further validation is useless here ...
          const atIndex = value.indexOf('@');
          return (atIndex < 1 || atIndex > value.length - 4 || value.length > 256) ?
            this.msg('vEmail') : true;
        },
        when: function(o: any){ return (o.providerID === 'mail'); }
      },
      {
        type: 'input',
        name: 'provider_name',
        message: function(this: any) {
          return _`${this.msg('qName')} muted${' < 64 '} ${this.msg('chars')}`
        },
        default: 'IndieAuth',
        validate: function(this: any, value: string) {
          return (value.length > 64) ?
            this.msg('vMaxLength', {key:'value', length:64}) : true;
        },
        when: function(o: any){ return (o.providerID === 'mail'); }
      },
      {
        type: 'input',
        name: 'provider_host',
        message: function(this: any) {
          return _`${this.msg('qHost')}\nmuted${this.msg('qHostNote')}`
        },
        default: function(o: any) { return (o.provider_email.split('@')[1]); },
        when: function(o: any){ return (o.providerID === 'mail'); }
      },
      {
        type: 'list',
        name: 'provider_port',
        message: function(this: any, o: any) {
          return (this.msg('qPort') + o.provider_host + ' ?');
        },
        choices: function(this: any, o: any) {
          const host = o.provider_host;
          const ports = [587,465,25];
          return new Promise((resolve, reject) => {
            if (!this || !this.scanPort) { return; }
            Promise.all(ports.map((_p) => this.scanPort(_p, host))).then((pr: any) => {
              resolve(pr.map((status: string, i: number) => {
                const __p = ports[i].toString();
                const msg = __p + ' (seems to be ' + status + ')';
                return {
                  name: status === 'open' ? _`G{msg}` : _`R{msg}`,
                  value: __p,
                  short: 'port ' + __p
                }
              }));
            });
          });
        },
        default: '587',
        when: function(o: any){ return (o.providerID === 'mail'); }
      }
    ]
  },
  svg: '<circle fill="#3E373C" cx="224" cy="224" r="224"/>' +
  '<circle fill="#E7E6E2" cx="224" cy="224" r="204"/>' +
  '<g><rect x="88.5" y="266.614" fill="#CBBB9D" width="271" height="44.979"/>' +
  '<polygon fill="#FFAF00" points="223.65,232.333 105.893,121.551 342.084,121.551"/>' +
  '<g><polygon fill="#CBBB9D" points="356.778,133.081 224.354,258.505 91.226,' +
  '133.081 88.5,133.081 88.5,297.127 359.481,297.127 359.481,133.081"/></g>' +
  '<g><polygon fill="#FF7A00" points="344.101,163.161 223.745,276.654 103.884,' +
  '163.161 101.42,163.161 101.42,311.593 346.556,311.593 346.556,163.161 "/></g></g>',

  subject: 'Your IndieAuth Verification Code',

  text: 'IndieAuth Verification Code \n\n' +
  'if you just wanted to sign in with IndieAuth, click the following link : \n\n{url}\n\n\n' +
  '_______________________________\nThis URL is valid until {exp}\n{iss}',
//<time title="{expDate}" datetime="{expDate}">{expDate}</time>
  html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title>IndieAuth</title><style type="text/css">#outlook a{padding:0}.ReadMsgBody{width:100%}.ExternalClass{width:100%}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height:100%}body,table,td,p,a,li,blockquote{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}a{max-width:480px;display:inline-block;}table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;max-width:600px;}img{-ms-interpolation-mode:bicubic}body{margin:0;padding:0}img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none}table{border-collapse:collapse !important}body,#bodyTable,#bodyCell{height:100% !important;margin:0;padding:0;width:100% !important}#bodyCell{padding:20px}#templateContainer{width:600px}body,#bodyTable{background-color:#E7E6E2}#bodyCell{border-top:4px solid #ADADAD}#templateContainer{border:1px solid #ADADAD}h1{color:#1C191B !important;display:block;font-family:Helvetica;font-size:26px;font-style:normal;font-weight:bold;line-height:100%;letter-spacing:normal;margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-align:left}h2{color:#404040 !important;display:block;font-family:Helvetica;font-size:20px;font-style:normal;font-weight:bold;line-height:100%;letter-spacing:normal;margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-align:left}h3{color:#0D7ECC !important;display:block;font-family:Helvetica;font-size:16px;font-style:italic;font-weight:normal;line-height:100%;letter-spacing:normal;margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-align:left}h4{color:#808080 !important;display:block;font-family:Helvetica;font-size:14px;font-style:italic;font-weight:normal;line-height:100%;letter-spacing:normal;margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-align:left}#templatePreheader{background-color:#F4F4F4;border-bottom:1px solid #CCC}.preheaderContent{color:#808080;font-family:Helvetica;font-size:10px;line-height:125%;text-align:left}.preheaderContent a:link, .preheaderContent a:visited, .preheaderContent a .yshortcuts{color:#606060;font-weight:normal;text-decoration:underline}#templateHeader{background-color:#F4F4F4;border-top:1px solid #FFF;border-bottom:1px solid #CCC}.headerContent{color:#505050;font-family:Helvetica;font-size:20px;font-weight:bold;line-height:100%;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;text-align:left;vertical-align:middle}.headerContent a:link, .headerContent a:visited, .headerContent a .yshortcuts{color:#EB4102;font-weight:normal;text-decoration:underline}#headerImage{height:auto;max-width:600px}#templateBody{background-color:#F4F4F4;border-top:1px solid #FFF;border-bottom:1px solid #CCC}.bodyContent{color:#505050;font-family:Helvetica;font-size:14px;line-height:150%;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px;text-align:left}.bodyContent a:link, .bodyContent a:visited, .bodyContent a .yshortcuts{color:#EB4102;font-weight:normal;text-decoration:underline}.bodyContent img{display:inline;height:auto;max-width:560px}#templateFooter{background-color:#F4F4F4;border-top:1px solid #FFF}.footerContent{color:#808080;font-family:Helvetica;font-size:10px;line-height:150%;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px;text-align:left}.footerContent a:link, .footerContent a:visited, .footerContent a .yshortcuts, .footerContent a span{color:#606060;font-weight:normal;text-decoration:underline}@media only screen and (max-width: 480px){body,table,td,p,a,li,blockquote{-webkit-text-size-adjust:none !important}body{width:100% !important;min-width:100% !important}#bodyCell{padding:10px !important}#templateContainer{max-width:600px !important;width:100% !important}h1{font-size:24px !important;line-height:100% !important}h2{font-size:20px !important;line-height:100% !important}h3{font-size:18px !important;line-height:100% !important}h4{font-size:16px !important;line-height:100% !important}#templatePreheader{display:none !important}#headerImage{height:auto !important;max-width:600px !important;width:100% !important}.headerContent{font-size:20px !important;line-height:125% !important}.bodyContent{font-size:18px !important;line-height:125% !important}.footerContent{font-size:14px !important;line-height:115% !important}.footerContent a{display:block !important}}</style></head><body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"><center><table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable"><tr><td align="center" valign="top" id="bodyCell"><table border="0" cellpadding="0" cellspacing="0" id="templateContainer"><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" id="templatePreheader"><tr><td valign="top" class="preheaderContent" style="padding-top:10px; padding-right:20px; padding-bottom:10px; padding-left:20px;" mc:edit="preheader_content00"> ' +
  'Did you want to sign in with IndieAuth ?</td></tr></table></td></tr><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateHeader"><tr><td valign="top" class="headerContent"> <img src="data:image/gif;base64,R0lGODlhWAKMALMAAOENA7HhAaUKC5G3BsmlANxkAE5cEq/OAqn/AHCJDCwtGEMVF7HzALXoAP8AAB0ZGyH5BAAAAAAALAAAAABYAowAAAT/8MlJq7046827/2AojmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHhMLpvP6LR6zW673/C4fE6v2+/4vH7P7/v/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBogEDwsbHTAoNDQrIzs9CA8sJ0NXWOAoIywHN197CAg4A4+Tl5ufo6eMF2tPf77/hDvP09fb3+PniDAzLDQfwAu6Sp6+gwXvs/C0zILChLYIHIxYM0M4fQIcYY0GUyLFeQoUL/zOKbLWxY0eKIJcVG8kSVUmTET+mbMCwpc1RL2EaPFAx5cqbQD3l1JlP5kyaQZNuGkr0Hs+j/n4qnUqJaVN6RqF2o8oVktWrDgj0hEqtq9lGX5uy6wdV4dazcA2lJSq2LciycfMOmgtzrV2F3PQKBsTXZN2/CvEOXpynMEcADdgiXnaRsWU7jiUenuxP8eXPbzIfhCyZ8z/QqEODxbfZdMjUsNOINojSddTYuM3M1pfVds3cwL/szvfUtkKpwZNnWSCgufPn0KNL7238t/LrcqQZ94m9OxwD24++9U7+jPbwd8urNwMe/czx6+NzOe8+sfz7XNrXBxkYv38rCew3k/9n/xXYhDICptSfgQzKsMCDEEYo4YQQPpDAWAk2QGCDHKownDiRZQhSZR2WmMKH1GVonYksjvBhbSIqRGKLNH4wXIoirljjjhkMB2OMx/EopAa74ThTAAkYYECAruk45JC7FYfYAW/pNxlyT0JJlJEp6cgkZ05mWeNsUv6F5QMIcrahmDSKxiVIZyoQgGvwsdmiaK2ZeYGcrq1pZ4mZAYBAaXpawCedf+6YWZ6FVnCoaX4myqBjghLaKAWPcjajpB06xuilE2SqJqcsFgYAP7bFOadtm5JqYGFvzqTqdpG6Kh9fpBk3q662cshXrLLuuWp1vU7K0Y+m7cprsQXOBWz/sIYOSyyz/s1VpmvKLkvtfWk9C62j0hpX57bepXUttsK6Vyu5yX3l7beYhisuu+t99Wmy6apLr3pW+YVettstuC92Vt2Lb7T7rTtwaky9exTAAY+7cGxMGXwwuAIqPPFlQ51qqbbxCnjmxrANZfHFIQsYJsmg5eSxyPnuNzLLn+XkMFQQo7cyzYzlhOy/McvMM8X43Ixz0PvtPLReL/0MNMIZzrw00whh6F7O7ik99VklnZwq0glvzbE9RreFNXoCi011PefWdzZ6GqudFERlmw32fmnLzXU9XoMcqrwZ6732Ph+7ffd+rQpOFUF9+y2BqCoqDpc8lQLZwNvuJS55X1DyNO44moAnqPXmI4WTq+WYX006V+HUDerjoYu++uy012777bjnrvvuvPfu++/ABy/88MQXb/zxyCev/PLMN+/889BHL/301Fdv/fXYZ6/99tx37/334Icv/vjkcxEBADs=" style="max-width:600px;" id="headerImage" mc:label="header_image" mc:edit="header_image" mc:allowdesigner mc:allowtext /></td></tr></table></td></tr><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateBody"><tr><td valign="top" class="bodyContent" mc:edit="body_content">' +
  '<h1>IndieAuth Verification Code</h1>' +
  '<h3>if you just wanted to sign in with IndieAuth, click the following link :</h3> {url} <br /> <br />' +
  '<h2>_______________________________</h2><h3>This URL is valid until {exp}</h3><pre>{iss}</pre>' +
  '</td></tr></table></td></tr><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateFooter"><tr><td valign="top" class="footerContent" mc:edit="footer_content00"> <a href="https://indieauth.com">IndieAuth</a>&nbsp;&nbsp;&nbsp;<a href="https://indieweb.com">IndieWeb</a>&nbsp;</td></tr><tr><td valign="top" class="footerContent" style="padding-top:0;" mc:edit="footer_content01"> ' +
  '<em>Copyright &copy; people of the IndieWeb.</em></td></tr></table></td></tr></table></td></tr></table></center></body></html>'
};

export default { locales, provider };
