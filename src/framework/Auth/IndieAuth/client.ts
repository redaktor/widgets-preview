import Request from '../../Request';
import { mixin } from '../../../dojo/core/util';
import URL from '../../url';
import { verifyTimeout as VT } from './config';

class IndieAuthClient extends Request {
  debug = false;
  protected _protocol = 'IndieAuth';
  protected _version = '1.0.0';
  protected _type = 'client';
  _options: any = {
    followRedirects: true,
    method: 'GET',
    headers: {},
    responseType: 'json',
    query: {},
    timeout: 8000 /* NOTE : STUB, set this in config.ts ! */
    //,cacheBust: true
  }

  protected s:any = {
    grid:     '.indieauth.grid',
    pGrid:    '.authProgress.grid',
    divider:  '.ui.statusdivider',
    p:        '.ui.progress',
    links:    'output.indieauth.link[data-order]',
    linkInfo: 'output.indieauth.link .meta.blue.text',
    providers:'output.indieauth.provider[data-order]',
    ref:      'output[data-ref]',
    done:     'output[data-done]',
    success: ('output.indieauth.provider[data-order="1"], ' +
              'output.indieauth.provider[data-order="2"], ' +
              'output.indieauth.provider[data-order="3"]'),
    rescan:   '.rescan.button'
  }
  _each = Array.prototype.slice;

  constructor(
    protected _url: any = '', protected _params: any = {},
    protected verifyTimeout: number = VT+400, protected el: any = {},
    protected colors: string[], protected sentProgress: any = {}, protected messages = {}
  ) {
    super();
    this.isObject(_url) && mixin(this, _url);
    this._url = this._normalizeUrl(window.location.href, false);
    this._params = URL.parameters(window.location.href);
    this._options.timeout = this.verifyTimeout;
    /* ui order: 1 authorization_endpoint, 2 success, 3 warning (sets "me" link),
    // 4 error, 5 not supported */
    this.colors = ['','green','green','orange','red','blue'];
    this.el = {
      /* TODO - make provider grid and progress grid selectors variables */
      grid: document.querySelector(this.s.grid),
      pGrid: document.querySelector(this.s.pGrid),
      divider: document.querySelector(this.s.divider),
      rescan: document.querySelectorAll(this.s.rescan)
    }
    this.el.providers = this.el.grid.querySelectorAll(this.s.providers);
    if (!document.querySelector('.authStatus')) { this.initProgress(); }
    this.initDebugLog();
    this.init();
    this.verify();
  };
  /* overwritable : */
  init() { }

  /* ProgressBar is optional :
  // if Semantic UI progress.js is loaded and there is a progressbar container
  // support ProgressBar (e.g. see view auth.html) ...
  // NOTE : TODO this could become a core dojo widget
  */
  hasProgress() {
    return (!!((<any>window)['jQuery']) && this.el.pGrid && !!$(this.s.p)['progress']);
  }
  /* set initial order, progressbar status and provider status text */
  initProgress() {
    if (!this.hasProgress()) { return; }
    const ps = document.querySelector(this.s.pGrid).querySelectorAll(this.s.ref);
    this._each.call(ps).map((el: any) => {
      el.dataset.order = (el.dataset.ref === 'link') ? 5 : 4;
    });
    $(this.s.pGrid+' '+this.s.p)['progress']({percent: 10, autoSuccess: false});
    $(this.s.pGrid).after('<div class="ui grey inverted vertical masthead center aligned segment">' +
        '<div class="ui inverted horizontal bulleted list strong authStatus"></div></div>');
  }
  reorderProgress() {
    const ps = '.authProgress output[data-ref]';
    this._each.call(document.querySelectorAll(ps)).map((el: any, i: number) => {
      const order = el.dataset.order;
      if (i > 0 && order < el.previousElementSibling.dataset.order) {
        const target = this.el.pGrid.querySelector('[data-order="'+(order)+'"]');
        this.el.pGrid.insertBefore(el, target);
      }
    });
  }
  /* set progressbar changes */
  setProgress(percent: number, sel: any = '.ui.progress', barColor = '') {
    if (!this.hasProgress()) { return; }
    const el = (typeof sel === 'string') ? $(sel) : sel;
    el['progress']('set percent', percent);
    if (barColor !== '') { barColor = ' '+barColor; }
    (barColor !== '' && el.attr('class', 'ui small' + barColor + ' progress'));
    if (percent === 100) {
      el['progress']('complete');
    }
    return el;
  }
  /* set summary text under progress when finished */
  setStatusText() {
    /* TODO FIXME - i18n, pluralize etc. */
    const status = ['','endpoint ok','ok','warning','error'];
    $('.authStatus').empty();
    var i: number;
    for (i = 1; i < 5; i++) {
      $('.authStatus').append([ '<div class="item ' + this.colors[i] + ' text">',
        $('.authProgress output[data-order="'+(i)+'"]').length, ' ', status[i],
      '</div>'].join(''));
    }
    $('.ui.dimmer').removeClass('active inverted');
    this.setProgress(100, '.ui.progress.active', 'red');
    document.querySelector(this.s.linkInfo).classList.add('first');
    $(this.s.linkInfo+':not(.first)').remove();
  }
  /* set error divider, text summary above providers */
  setDividerError() {
    this.el.divider.classList.remove('green', 'divider');
    this.el.divider.classList.add('red', 'divider');
    var msg = document.createDocumentFragment();
    var msgEl = document.createElement('small');
    msgEl.innerText = this.msg('verifyNoProvider');
    msg.appendChild(msgEl);
    while (this.el.divider.firstChild) {
      this.el.divider.removeChild(this.el.divider.firstChild);
    }
    this.el.divider.appendChild(msg);
  }

  iconMessage(msg: string, iconCl = '', colorCl = '', isMeta = true) {
    if (iconCl !== '') { iconCl = iconCl+' icon'; }
    const icon = (iconCl === '') ? '' : '<i class="' + iconCl + '></i>&nbsp;';
    const cl = (!!isMeta) ? 'meta' : '';
    const cCl = (colorCl === '') ? cl : (cl+' '+colorCl+' text');
    return '<p class="' + cCl + '>' + (icon+msg) + '</p>';
  }

  /* verify response : set errors and/or order change */
  verifyUI(el: any, error: any = null, readyCount = 0) {
    if (error) {console.log('ERROR',error)}
    if (readyCount === 0) { readyCount = this.el.providers.length; }
    const progressSel = 'output[data-ref="'+el.dataset.url+'"]';
    const meUrl = (<any>document.querySelector('.me.site.title'))['dataset']['ref'];
    let order: number = 4;
    let _end: any = false;
    if (this.hasProgress()) {
      _end = setTimeout(this.setStatusText.bind(this), this.verifyTimeout);
    }
    el.dataset.done = '1';

    if (!!(el.dataset.provider)) {
      if (!!(error)) {
        el.dataset.error = (typeof error === 'object' && (!!(error.id)) ? error.id : 'unknown');
        if (el.dataset.error === 'verifyTmpInvalidMe') { order = 3; }
      } else {
        order = ((el.dataset.provider === 'authorization_endpoint') ? 1 : 2);
      }
    }
    const status = (!!(el.dataset.error)) ? el.dataset.error : 'verifySuccess';
    el.dataset.order = order;
    const p: any = {
      icon: ((order === 1) ? 'privacy' : 'exchange'),
      color: (this.colors[order]||'red'),
      btn: el.querySelector('.ui.button'),
      dimmer: el.querySelector('.ui.dimmer'),
      progress: this.el.pGrid.querySelector(progressSel),
      target: null,
      progressTarget: null
    };

    // provider status: color and message ...
    if (!!(p.dimmer)) {
      const _color = ((!!(order < 3)) ? 'grey' : p.color);
      const _icon = (status === 'verifyNoCred') ? 'terminal' : p.icon;
      p.dimmer.innerHTML = this.iconMessage(this.msg(status, el), _icon, _color);
      if (status === 'verifyNoMe' || status === 'verifyInvalidMe') {
        var uEl = document.createElement('small');
        uEl.innerHTML = '<input type="url"' +
          ' onClick="this.setSelectionRange(0,this.value.length)" value="'+meUrl+'" /> ' +
          this.msg('missing') +
          ' <a href="'+el.dataset.url+'" target="_blank">'+el.dataset.title+'</a>';
        p.dimmer.appendChild(uEl);
      }
      p.dimmer.classList.remove('active', 'inverted');
    }
    // provider button: color and state ...
    if (!!(p.btn)) {
      p.btn.classList.remove('disabled','green','red','orange','blue','button');
      if (order < 4) {
        p.btn.parentNode.addEventListener('click', this.signIn(p.btn.parentNode));
      } else {
        p.btn.classList.add('disabled');
      }
      p.btn.classList.add(p.color, 'button');
    }
    // set progress ...
    if (this.hasProgress()) {
      p.progress.dataset.order = el.dataset.order;
      this.setProgress(100, (progressSel+' .ui.progress'), p.color);
      if(!!(_end) && $(this.s.done).length === readyCount) {
        clearTimeout(_end); _end = null;
        this.setStatusText();
      }
    }
    // sort links and providers and progress after change ...
    var i: number;
    for (i = order+1; i < 6; i++) {
      p.target = this.el.grid.querySelector('output[data-order="'+(i)+'"]');
      if (!!(p.target)) { break; }
    }
    if (order === 1) {
      this.el.pGrid.insertBefore(p.progress, this.el.pGrid.firstChild);
      return this.el.grid.insertBefore(el, this.el.grid.firstChild);
    }
    if (!(p.target)) {
      this.el.pGrid.appendChild(p.progress);
      return this.el.grid.appendChild(el);
    }
    p.progressTarget = this.el.pGrid.querySelector('[data-order="'+(p.target.dataset.order)+'"]');
    this.el.pGrid.insertBefore(p.progress, p.progressTarget);
    this.el.grid.insertBefore(el, p.target);
    // evtl. set error text in divider
    if (this.el.grid.querySelectorAll(this.s.done).length === readyCount) {
      if (this.el.grid.querySelectorAll(this.s.success).length < 1) {
        this.setDividerError();
      }
      this._each.call(this.el.rescan).map((r: any) => {
        r.addEventListener('click', this.verifyFresh.bind(this));
      });
    }
    return el;
    /* TODO - if there is an unsupported IndieAuth provider with a domain
    // matching "me" : EXPLAIN how to set up authorization_endpoint ...
    */
  }

  query(mix: any) {
    return lang.mixin({
      state: this._params.get('state'),
      me: this._params.get('me'),
      client_id: this._params.get('client_id')
    }, mix);
  }
  progressSel(ref: string) {
    return ['.authProgress.grid output[data-ref="',ref,'"] .ui.progress'].join('');
  }

  /* verify request ... */
  verify(cacheBust = false) {
    this.setProgress(20);
    /* TODO FIXME - CACHE and
    if provider === 'sms' || 'email' || 'clef' || 'pgpkey'
         verified = true;
    */
    // verify rel="me"
    const successLength = this.el.grid.querySelectorAll(this.s.success).length;
    console.log('verify2', successLength);
    let hasCache = false;
    this._each.call(this.el.providers).map((el: any) => {
      if (!!(el.dataset.order) && parseInt(el.dataset.order, 10) < 4) {
        // cached ...
        if (!hasCache) { hasCache = (!cacheBust); }
        const e = (el.dataset.order === '3') ? {id:'verifyTmpInvalidMe'} : null;
        this.verifyUI(el, e, (!cacheBust) ? successLength : 0);
      }
      return el;
    });
    console.log('hasCache', hasCache);
    if (!!(hasCache)) {
      document.body.classList.add('cached');
      this.reorderProgress();
    } else {
      (!!(cacheBust) && document.body.classList.remove('cached'));
      this._each.call(this.el.providers).map((el: any) => {
        if (!(el.dataset.order) || el.dataset.order > 3) {
          this.setProgress(50, this.progressSel(el.dataset.url), 'orange');

          console.log('verify', this._url);

          this.get({
            url: this._url,
            headers: {},
            query: this.query({verify: el.dataset.url})
          }).then((res: any) => {
            //console.log('res', el.dataset.provider, res);
            const v = (res.data.verified === true);
            const e = ((v && !(res.data.error)) ? null : res.data.error);
            this.verifyUI(el, e);
          }, (e: any) => { this.verifyUI(el, e); });
        }
      });
    }
    this.setProgress(100, this.progressSel('link'), 'blue');
  }
  verifyFresh() { return this.verify(true); }

  gpgForm(res: any) {
    if (!(res.data) || !(res.data.code) || !(res.data.state)) {
      return 'GPG AUTH ERR'; // TODO FIXME
    }
    return [ '<br><form class="gpgAuthForm" action="',this._url,'" method="post">',
        '<textarea name="code" rows="10" onfocus="this.select()" autofocus=true>',
          res.data.code,
        '</textarea>',
        '<input name="state" type="hidden" value="',res.data.state,'">',
        '<button type="submit" class="ui green button">OK</button>',
        '</form>'
      ].join('');
  }
  authUI(el: any) {
    el.removeEventListener('click', this.signIn(el));
    /* remove old forms : */
    [].forEach.call(document.querySelectorAll('.gpgAuthForm'), (fEl: any) => {
      fEl.parentNode.removeChild(fEl);
    });
    /* */
    const dimmer = el.querySelector('.ui.dimmer');
    dimmer.innerHTML = this.iconMessage(this.msg('msgPrepare'), 'exchange', 'black');
    el.querySelector('.ui.button').classList.add('disabled');
    /* TODO FIXME from config : */ const mailTimeout = (4*60*1000);
    const _second = 100;
    const _aniDur = 1000;
    this.get({
      url: this._url,
      query: this.query({ authorize: el.dataset.url })
    }).then((res: any) => {
      el.querySelector('.ui.button').classList.remove('disabled');
      if (!!this.hasProgress() && !!dimmer) {
        if (!!this.sentProgress[el.dataset.provider]) {
          clearInterval(this.sentProgress[el.dataset.provider]);
        }
        var _o = {m: 'sent', c: ''};
        if (el.dataset.provider === 'pgpkey') {
          _o = {m: 'sign', c: this.gpgForm(res)};
        };
        dimmer.innerHTML = [
          this.iconMessage(this.msg(_o.m, el)+':', 'exchange', 'black'), _o.c,
          '<div class="ui small green progress"><div class="bar">',
          '<i class="clock inverted icon"></i>',
          '<div class="progress"></div></div></div>'
        ].join('');
        const pEl = $('.ui.progress', dimmer);
        const cEl = $('.clock', dimmer);
        if (!pEl['progress'].total) {
          pEl['progress']({
            duration:_aniDur, total:(mailTimeout/_second),
            autoSuccess: false, label: ''
          });
        }
        pEl['progress']('reset');
        this.sentProgress[el.dataset.provider] = setInterval(() => {
          pEl['progress']('increment');
          let per = pEl['progress']('get percent');
          if (per < 75 && !pEl.hasClass('green')) { pEl.addClass('green'); }
          if (per > 99 && pEl.hasClass('yellow')) {
            console.log('TIMEOUT',el.dataset.provider)
            pEl.removeClass('yellow').addClass('red');
            pEl['progress']('set bar label', 'timed out');
            el.querySelector('.ui.button').classList.remove('disabled');
            clearInterval(this.sentProgress[el.dataset.provider]);
            if (el.dataset.provider === 'pgpkey') {
              [].forEach.call(document.querySelectorAll('.gpgAuthForm'), (fEl: any) => {
                fEl.parentNode.removeChild(fEl);
              });
            }
          } else if (per > 75 && pEl.hasClass('green')) {
            pEl.removeClass('green').addClass('yellow');
          } else if (per > 35) {
            const left = parseInt(pEl['progress']('get text','{left}'));
            const sec = Math.round(left/(_aniDur/_second));
            if (cEl.hasClass('icon')) { cEl.removeClass('icon'); }
            pEl['progress']('set bar label', this.msg('secLeft', {seconds: sec}));
          }
        }, _second);
      }
    })
  }

  signIn(el: any) {
    const p = el.dataset.provider;
    if (p === 'mail' || p === 'sms' || p === 'pgpkey') {
      return () => { this.authUI(el); }
    }
    return () => {
      window.location.href += ('&authorize=' + this._encode(el.dataset.url));
    };
  }
};

export default IndieAuthClient;
