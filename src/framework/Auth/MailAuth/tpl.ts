import { _ } from '../../util/string/main';
const LB = ' \t\n<br />';
const BR = ' \t\n<br /><br />';
const HR = '___________________________________'

const tplCommon = {
  form: _`
  <form class="ui labeled action input mailAuth mailAuth_{expRaw}" method="POST" action="_{url}">
    <label class="mailMessage">_{messageForm}<br>
      <input class="mailCode" type="password" name="code" placeholder="_{codeName}" autofocus="autofocus">
    </label>
    <input type="hidden" name="state" value="_{state}">
    <button class="mailSubmit" type="submit" class="ui green button">OK</button>
    <label><br>
      <span class="status">_{messageFormValid}</span><br />
      <span class="timer" data-exp="_{expRaw}" id="timer"></span>
    </label>
  </form>
  <script>
  var mailToken = {
    form: document.querySelector('.mailAuth_{expRaw}'),
    input: document.querySelector('.mailAuth_{expRaw} .mailCode'),
    btn: document.querySelector('.mailAuth_{expRaw}>.mailSubmit'),
    init: function(){
      if (!!document.querySelector('.mailAuth_{expRaw}').mailProgress) { return; }
      var o = {
        warnPercent: 8,
        timer: mailToken.form.querySelector('label>.timer')
      };
      o.sec = Math.floor((parseInt(o.timer.dataset.exp, 10) - Date.now())/1000);
      mailToken.form.mailProgress = function(nowSec) {
        var myTimer = setInterval(function() {
          nowSec--;
          o.timer.textContent = nowSec.toString() + '_{messageFormRemain}';
          if (nowSec === Math.ceil(o.sec*(o.warnPercent/100))) {
            ['status','timer'].map(function(s){
              mailToken.form.querySelector('label>.'+s).className += ' warning';
            });
          }
          if ((nowSec < 2)) {
            mailToken.invalidate();
            clearInterval(myTimer);
          }
        }, 1000);
      };
      ((o.sec < 2) && mailToken.invalidate()) || mailToken.form.mailProgress(o.sec);
    },
    submit: function() {
      try {
        var parts = this.value.split('.');
        if (parts.length === 3) {
          var str = decodeURIComponent(atob(parts[1]).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          var res = JSON.parse(str);
          if (res.hasOwnProperty('code') && typeof res.code === 'string') {
            mailToken.invalidate(true);
          }
        }
      } catch(e) {}
    },
    invalidate: function(isSuccess) {
      mailToken.input.removeEventListener('focus', mailToken.init);
      mailToken.input.removeEventListener('input', mailToken.submit);
      mailToken.form.className += (isSuccess) ? 'submitted' : ' error';
      if (!isSuccess) {
        mailToken.form.setAttribute('action', ' ');
        mailToken.form.textContent = '_{messageFormExpired}';
        return false;
      }
      mailToken.btn.style.display = 'none';
      mailToken.form.querySelector('.mailMessage').style.display = 'none';
      mailToken.form.querySelector('label>.status').textContent = '_{messageFormSubmitted}';
      setTimeout(function() { mailToken.form.submit(); }, 1);
    }
  };
  mailToken.input.addEventListener('focus', mailToken.init, false);
  mailToken.input.addEventListener('input', mailToken.submit, false);
  mailToken.input.focus();
  </script>
  `,

  text: `* _{messageSubject} *${BR}

    _{messageBody} ${BR}
    ${HR} ${BR}
    _{code} ${LB}
    ${HR} ${LB}
    _{messageValid} _{exp} ${BR}${BR}

    _{info}${LB}

    _{/xkcd/title} "_{/xkcd/alt}" ${LB}
    _{/xkcd/img} ${BR}

    _{messageFooter}
  `,

  html: _`
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>IndieAuth</title>
      <style type="text/css">
        #outlook a { padding: 0; }
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span,
        .ExternalClass font, .ExternalClass td, .ExternalClass div {
          line-height: 100%;
        }
        body, table, td, p, a, li, blockquote {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        a {
          max-width: 480px;
          display: inline-block;
        }
        pre {
          max-width: 480px;
          white-space: -moz-pre-wrap;
          white-space: -hp-pre-wrap;
          white-space: -o-pre-wrap;
          white-space: -pre-wrap;
          white-space: pre-wrap;
          white-space: pre-line;
          word-wrap: break-word;
          word-break: break-all;
        }
        table, td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          max-width: 600px;
        }
        body {
          margin: 0;
          padding: 0;
        }
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
           -ms-interpolation-mode: bicubic;
        }
        table { border-collapse: collapse !important; }
        body,
        #bodyTable,
        #bodyCell {
          height: 100% !important;
          margin: 0;
          padding: 0;
          width: 100% !important
        }
        #bodyCell {
          padding: 20px;
        }
        #templateContainer {
          width: 600px;
        }
        body,
        #bodyTable {
          background-color: #E7E6E2;
        }
        #bodyCell {
          border-top: 4px solid #ADADAD;
        }
        #templateContainer {
          border: 1px solid #ADADAD;
        }
        h1, input {
          color: #1C191B !important;
          display: block;
          font-family: Helvetica;
          font-size: 26px;
          font-style: normal;
          font-weight: bold;
          line-height: 100%;
          letter-spacing: normal;
          margin-top: 0;
          margin-right: 0;
          margin-bottom: 10px;
          margin-left: 0;
          text-align: left;
        }
        input[type=text], textarea {
          outline: none;
          width: 98.5%;
          padding: 4px 0px 4px 4px;
          border: 1px solid #DDDDDD;
        }
        input[type=text]:focus, textarea:focus {
          box-shadow: 0 0 5px rgba(149, 204, 13, 1);
          border: 1px solid rgba(149, 204, 13, 1);
        }
        h2 {
          color: #404040 !important;
          display: block;
          font-family: Helvetica;
          font-size: 20px;
          font-style: normal;
          font-weight: bold;
          line-height: 100%;
          letter-spacing: normal;
          margin-top: 0;
          margin-right: 0;
          margin-bottom: 10px;
          margin-left: 0;
          text-align: left;
        }
        #templatePreheader {
          background-color: #F4F4F4;
          border-bottom: 1px solid #CCC;
        }
        .preheaderContent {
          color: #808080;
          font-family: Helvetica;
          font-size: 10px;
          line-height: 125%;
          text-align: left;
          padding-top: 10px;
          padding-right: 20px;
          padding-bottom: 10px;
          padding-left: 20px;
        }
        .preheaderContent a:link,
        .preheaderContent a:visited,
        .preheaderContent a .yshortcuts {
          color: #606060;
          font-weight: normal;
          text-decoration: underline;
        }
        .preheaderContent.spaced {
          padding-top:10px;
          padding-right:20px;
          padding-bottom:10px;
          padding-left:20px;
        }
        #templateHeader {
          background-color: #F4F4F4;
          border-top: 1px solid #FFF;
          border-bottom: 1px solid #CCC;
        }
        .headerContent {
          background-color: #1c191b;
          font-family: Helvetica;
          font-size: 20px;
          font-weight: bold;
          line-height: 100%;
          padding-top: 0;
          padding-right: 0;
          padding-bottom: 0;
          padding-left: 0;
          text-align: center;
          vertical-align: middle;
        }
        .headerContent a:link,
        .headerContent a:visited,
        .headerContent a .yshortcuts {
          color: #EB4102;
          font-weight: normal;
          text-decoration: underline;
        }
        #headerImage {
          height: auto;
          max-width: 300px;
        }
        #templateBody {
          background-color: #F4F4F4;
          border-top: 1px solid #FFF;
          border-bottom: 1px solid #CCC;
        }
        .bodyContent {
          color: #505050;
          font-family: Helvetica;
          font-size: 14px;
          line-height: 150%;
          padding-top: 20px;
          padding-right: 20px;
          padding-bottom: 20px;
          padding-left: 20px;
          text-align: left;
        }
        .red, .bodyContent .red {
          color: #DC0005;
        }
        .bodyContent a:link,
        .bodyContent a:visited,
        .bodyContent a .yshortcuts {
          color: #EB4102;
          font-weight: normal;
          text-decoration: underline;
        }
        .bodyContent img {
          display: inline;
          height: auto;
          width: 92%;
        }
        #templateFooter {
          background-color: #F4F4F4;
          border-top: 1px solid #FFF;
        }
        .footerContent {
          color: #808080;
          font-family: Helvetica;
          font-size: 10px;
          line-height: 150%;
          padding-top: 20px;
          padding-right: 20px;
          padding-bottom: 20px;
          padding-left: 20px;
          text-align: left;
        }
        .footerContent a:link,
        .footerContent a:visited,
        .footerContent a .yshortcuts,
        .footerContent a span {
          color: #606060;
          font-weight: normal;
          text-decoration: underline;
        }
        @media only screen and (max-width: 480px) {
          body,
          table,
          td,
          p,
          a,
          li,
          blockquote {
            -webkit-text-size-adjust: none !important;
          }
          body {
            width: 100% !important;
            min-width: 100% !important;
          }
          #bodyCell {
            padding: 10px !important;
          }
          #templateContainer {
            max-width: 600px !important;
            width: 100% !important;
          }
          h1 {
            font-size: 24px !important;
            line-height: 100% !important;
          }
          h2 {
            font-size: 20px !important;
            line-height: 100% !important;
          }
          #templatePreheader {
            display: none !important;
          }
          #headerImage {
            height: auto !important;
            max-width: 600px !important;
            width: 100% !important;
          }
          .headerContent {
            font-size: 20px !important;
            line-height: 125% !important;
          }
          .bodyContent {
            font-size: 18px !important;
            line-height: 125% !important;
          }
          .footerContent {
            font-size: 14px !important;
            line-height: 115% !important;
          }
          .footerContent a {
            display: block !important;
          }
        }
      </style>
    </head>
    <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">

    <center>
      <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
        <tr>
          <td align="center" valign="top" id="bodyCell">
            <table border="0" cellpadding="0" cellspacing="0" id="templateContainer">
              <tr>
                <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" id=
                  "templatePreheader">
                    <tr>
                      <td valign="top" class="preheaderContent spaced" mc:edit=
                      "preheader_content00">_{messageHeader}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" id=
                  "templateHeader">
                    <tr>
                      <td valign="top" class="headerContent">
                      <img src="data:image/gif;base64,
                      R0lGODlhWAKMALMAAOENA7HhAaUKC5G3BsmlANxkAE5cEq/OAqn/AHCJDCwtGEMVF7HzALXoAP8AAB0ZGyH5BAA
                      AAAAALAAAAABYAowAAAT/8MlJq7046827/2AojmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgsGo/IpHLJbDqf0K
                      h0Sq1ar9isdsvter/gsHhMLpvP6LR6zW673/C4fE6v2+/4vH7P7/v/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXm
                      Jmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBogEDwsbHTAoNDQrIzs9CA8sJ0NXWOAoI
                      ywHN197CAg4A4+Tl5ufo6eMF2tPf77/hDvP09fb3+PniDAzLDQfwAu6Sp6+gwXvs/C0zILChLYIHIxYM0M4fQIc
                      YY0GUyLFeQoUL/zOKbLWxY0eKIJcVG8kSVUmTET+mbMCwpc1RL2EaPFAx5cqbQD3l1JlP5kyaQZNuGkr0Hs+j/n
                      4qnUqJaVN6RqF2o8oVktWrDgj0hEqtq9lGX5uy6wdV4dazcA2lJSq2LciycfMOmgtzrV2F3PQKBsTXZN2/CvEOX
                      pynMEcADdgiXnaRsWU7jiUenuxP8eXPbzIfhCyZ8z/QqEODxbfZdMjUsNOINojSddTYuM3M1pfVds3cwL/szvfU
                      tkKpwZNnWSCgufPn0KNL7238t/LrcqQZ94m9OxwD24++9U7+jPbwd8urNwMe/czx6+NzOe8+sfz7XNrXBxkYv38
                      rCew3k/9n/xXYhDICptSfgQzKsMCDEEYo4YQQPpDAWAk2QGCDHKownDiRZQhSZR2WmMKH1GVonYksjvBhbSIqRG
                      KLNH4wXIoirljjjhkMB2OMx/EopAa74ThTAAkYYECAruk45JC7FYfYAW/pNxlyT0JJlJEp6cgkZ05mWeNsUv6F5
                      QMIcrahmDSKxiVIZyoQgGvwsdmiaK2ZeYGcrq1pZ4mZAYBAaXpawCedf+6YWZ6FVnCoaX4myqBjghLaKAWPcjaj
                      pB06xuilE2SqJqcsFgYAP7bFOadtm5JqYGFvzqTqdpG6Kh9fpBk3q662cshXrLLuuWp1vU7K0Y+m7cprsQXOBWz
                      /sIYOSyyz/s1VpmvKLkvtfWk9C62j0hpX57bepXUttsK6Vyu5yX3l7beYhisuu+t99Wmy6apLr3pW+YVettstuC
                      92Vt2Lb7T7rTtwaky9exTAAY+7cGxMGXwwuAIqPPFlQ51qqbbxCnjmxrANZfHFIQsYJsmg5eSxyPnuNzLLn+XkM
                      FQQo7cyzYzlhOy/McvMM8X43Ixz0PvtPLReL/0MNMIZzrw00whh6F7O7ik99VklnZwq0glvzbE9RreFNXoCi011
                      PefWdzZ6GqudFERlmw32fmnLzXU9XoMcqrwZ6732Ph+7ffd+rQpOFUF9+y2BqCoqDpc8lQLZwNvuJS55X1DyNO4
                      4moAnqPXmI4WTq+WYX006V+HUDerjoYu++uy012777bjnrvvuvPfu++/ABy/88MQXb/zxyCev/PLMN+/889BHL/
                      301Fdv/fXYZ6/99tx37/334Icv/vjkcxEBADs="
                      id="headerImage" mc:label="header_image" mc:edit="header_image"
                      mc:allowdesigner="" mc:allowtext="" />
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateBody">
                    <tr>
                      <td valign="top" class="bodyContent" mc:edit="body_content">
                        <h1>_{messageSubject}</h1>
                        <p>_{messageBody}</p>
                        <p><input type="text" value="_{code}" autofocus="autofocus" onfocus="this.select()" /></p>
                        <p>_{info}</p>
                        <h2>${HR}</h2>
                        <p>_{messageValid}</p>
                        <p>_{messageAsText}</p>
                        <pre>_{code}</pre><br /><br />
                        <center>_{/xkcd/$img}</center>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateFooter">
                    <tr>
                      <td valign="top" class="footerContent" mc:edit="footer_content00">
                      <a href="https://indieauth.com">IndieAuth</a>&nbsp;&nbsp;&nbsp;
                      <a href="https://indieweb.com">IndieWeb</a>&nbsp;</td>
                    </tr>
                    <tr>
                      <td valign="top" class="footerContent" style="padding-top:0;" mc:edit="footer_content01"><em>_{messageFooter}</em></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>
    </body>
  </html>`
}

export default tplCommon;
