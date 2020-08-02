/**
 * ...
 * ...
 */
 /*
 TODO FIXME
 "always exit" option
 if user enter password wrong >n times
 */
/* TODO FIXME i18n : */
import has from '@dojo/framework/has/has';
import { lang } from '../../../../dojo/core/main';
import i18n, { Bundle, Messages } from '@dojo/framework/i18n/main';
import { log, pwLog } from '../../../util/log';
import { startsWith } from '../../../util/string/main';
import { uuid, nonce } from '../../../util/unique';
import { OS, userDir, getTokenChoices, getProviders, checkPW,
        readToken, writeToken, doLog, logToken } from '../helper';
import * as inquirer from 'inquirer';
import * as fs from 'fs';
import * as path from 'path';
import * as net from 'net';
import * as crypto from 'crypto';
import chalk from 'chalk';
import bundle from '../nls/CLI';
//import * as directoryPrompt from './directoryPrompt';
const Socket = net.Socket;
const opn: any = require('opn');
const zxcvbn: any = require('zxcvbn');

const _bullet = (OS === 'win32') ? '*' : '●';
const pwBar1 = chalk.green('█') + chalk.red('███');
const pwBar2 = chalk.green('██') + chalk.red('██');
//inquirer.registerPrompt('directory', (<any>directoryPrompt));

export class CLI {
  quitting = false;

  msg(_id = 'unknown', el?: any, fallback = '') {
    var m = (!!(this.messages) && this.messages[_id]);
    if (!m) { m = _id; }
    if (!!el && typeof el === 'object') {
      const rawData = !!(el.dataset) ? el.dataset : el;
      (m.match(/[_]\{([^}]+)\}/gi)||[]).map((tplStr: string) => {
        const pointer = tplStr.slice(2, -1);
        var data = rawData[pointer];
        if (typeof data !== 'string' && tplStr.slice(2, 3) === '/') { data = m; }
        m = m.replace(tplStr, (typeof data === 'string') ? data : fallback);
      });
    }
    return m;
  }
  /* TODO - SHOULD go to util/net - used for SMTP check for "providers.mail" */
  scanPort(port: number|string, host: string) {
    if (typeof port === 'string') { port = parseInt(port); }
    var socket = new Socket();
    var status = 'closed';
    return new Promise(function(resolve, reject) {
      socket.on('connect', function () { status = 'open'; socket.destroy(); });
      socket.setTimeout(500);
      socket.on('timeout', function () { status = 'closed'; socket.destroy(); });
      socket.on('error', function () { status = 'closed'; });
      socket.on('close', function () { resolve(status); });
      socket.connect((<number>port), host);
    });
  }
  /* shorthand function for setup ... */
  iksu(key: string) {
    return [
      (this.providers[key].setup.instructions || ' '),
      (this.providers[key].setup.key || 'key'),
      (this.providers[key].setup.secret || 'secret'),
      (this.providers[key].setup.url || 'https://indieauth.com')
    ];
  }
  /* TODO - many things of this CLI inquirer questions could come from JSON schemas */
  /* CLI FLOW - " questions " : */
  q = (pw: string = '', providerID?: string) => {

  const qKey = {
    type: 'input',
    name: 'provider_key',
    message: (o: any) => {
      const iksu: string[] = this.iksu(o.providerID);
      if (o.helpAction === 'open') { opn(iksu[3]); }
      return this.msg('qWhat') + iksu[1] + ' ?';
    },
    validate: (value: string) => {
      return (value.length < 3) ?
        this.msg('vLength', {key:'key', length:3}) : true;
    }
  };
  const qSecret = {
    type: 'password',
    name: 'provider_secret',
    message: (o: any) => {
      const iksu: string[] = this.iksu(o.providerID);
      return this.msg('qWhat') + iksu[2] + ' ?'
    },
    validate: (value: string, o: any) => {
      return (!(o.providerID) && value.length < 3) ?
        this.msg('vLength', {key:'secret', length:3}) : true;
    }
  };

  return {
    actions: [{
      type: 'list',
      name: 'action',
      message: this.msg('qAction'),
      choices: [
        { name: this.msg('qaCreate'), value: 'create', short: this.msg('qsCreate') },
        { name: this.msg('qaEdit'), value: 'edit', short: this.msg('qsEdit') },
        { name: this.msg('qaQuit'), value: 'quit', short: this.msg('qaQuit') }
      ]
    }],
    password: [{
      type: 'password',
      name: 'pw',
      message: this.msg('qPw'),
      filter: zxcvbn,
      validate: (pw: any) => {
        const o = checkPW(pw.password);
        return (!o || typeof o !== 'object' || !(o.salt)) ? this.msg('vWrongPw') : true;
      }
    }],
    passwordSet: [
      {
        type: 'password',
        name: 'pw',
        message: this.msg('qPw'),
        filter: zxcvbn,
        validate: (strength: any): boolean|string => {
          if (strength.score < 2) {
            return pwBar1 + chalk.red(' '+this.msg('vPW1')+' ('+this.msg('vSc')+' 1/4):\n') +
              strength.feedback.warning + '\n' + _bullet + ' ' +
              strength.feedback.suggestions.join('\n'+_bullet+' ');
          } else if (strength.score < 3) {
            return pwBar2 + chalk.yellow(' '+this.msg('vPW2')+' ('+this.msg('vSc')+' 2/4):\n') +
              strength.feedback.warning + '\n' + _bullet + ' ' +
              strength.feedback.suggestions.join('\n'+_bullet+' ');
          }
          return true;
        }
      },
      {
        type: 'password',
        name: 'pwConfirmed',
        message: this.msg('qPwConfirmed'),
        filter: zxcvbn
      }
    ],

    create: [
      {
        type: 'list',
        name: 'providerID',
        message: this.msg('qProviderID'),
        choices: () => {
          return this.providersLeft.map((_p: string) => ({
            name: _p, value: _p, short: _p
          })).concat([{name: this.msg('qaNewP'), value: 'unknown', short: this.msg('_new')}])
        }
      },
      {
        type: 'input',
        name: 'providerID',
        message: this.msg('qProviderIDtba') + '\n' + chalk.dim('> 3 '+this.msg('chars')),
        validate: (value: string) => {
          if (value.length < 3) {
            return this.msg('vLength', {key:'name', length:3});
          } else if (this.providersOK.indexOf(value) > -1) {
            return this.msg('vExistsP');
          } else if (this.providersLeft.indexOf(value) > -1) {
            return this.msg('vPrimaryP');
          } else {
            return true;
          }
        },
        when: (o: any) => (o.providerID === 'unknown')
      },
      {
        type: 'list',
        name: 'doHelp',
        message: (o: any) => {
          const key: string = o.providerID;
          let msg = chalk.dim(this.providers[key].description) + '\n';
          msg += chalk.reset('  ') +
            chalk.bold(this.msg('qCanHelp') + ' ' + this.providers[key].title + ' ?');
          return msg;
        },
        choices: [this.msg('qcHelp'), this.msg('qcNoHelp')],
        when: (o: any) => (o.providerID !== 'unknown'),
        filter: (value: string) => (value === this.msg('qcHelp'))
      },
      {
        type: 'list',
        name: 'helpAction',
        message: (o: any) => {
          const iksu: string[] = this.iksu(o.providerID);
          return (chalk.reset(iksu[0]||' ') + '\n' +
          chalk.green([this.msg('need'),iksu[1],this.msg('_and'),iksu[2]+'.'].join(' ')) +
          '\n' + chalk.dim(this.msg('qcHelpGet') + ' ' + iksu[3]));
        },
        choices: [
          {
            name: this.msg('qcOpenPage'),
            value: 'open',
            short: this.msg('qsOpenPage')
          },
          {
            name: this.msg('qcGoOn'),
            value: 'go',
            short: '...'
          }],
        when: (o: any) => (o.doHelp === true && o.providerID !== 'unknown')
      },
      qKey,
      qSecret,
      /* <--- */
      /* additionalProperties from any provider goes HERE ... */
      /* <--- */
      {
        type: 'input',
        name: 'provider_note',
        message: this.msg('qNote'),
        default: this.msg('qNoNote'),
        filter: (value: string) => ((value === this.msg('qNoNote')) ? '' : value.trim())
      }
    ],

    /* Change provider ... */
    edit: [
      {
        type: 'list',
        name: 'providerID',
        message: this.msg('qeProviderID'),
        choices: getTokenChoices.bind(this)
      },
      {
        type: 'list',
        name: 'providerEdit',
        message: (o: any) => {
          logToken(readToken(pw, o.providerID));
          return this.msg('qProviderEdit');
        },
        choices: [
          {name: this.msg('qeKS'), value: 'editShort', short: this.msg('qsKS')},
          {name: this.msg('qeAll'), value: 'editFull', short: this.msg('qsAll')},
          {name: this.msg('qeAdd'), value: 'editAdd', short: this.msg('qsAdd')},
          {name: this.msg('qeNo'), value: 'start', short: 'OK!'},
        ]
      },
      lang.mixin({
        when: (o: any) => (o.providerEdit === 'editShort'),
        default: (o: any): any => ((readToken(pw, o.providerID).key) || '')
      }, qKey),
      lang.mixin({
        when: (o: any) => (o.providerEdit === 'editShort'),
        default: (o: any): any => ((readToken(pw, o.providerID).secret) || '')
      }, qSecret)
    ],
    editAdd: [
      {
        type: 'input',
        name: 'providerAddKey',
        message: (o: any) => {
          const msg = chalk.red('Read Only: "'+this.readonlyKeys.join('", "')+'".');
          return (msg + '\n' + this.msg('qProviderAddKey'));
        },
        validate: (value: string) => {
          return (value === '' || this.readonlyKeys.indexOf(value) > -1) ?
            this.msg('vAddKey') : true;
        }
      },
      {
        type: 'input',
        name: 'providerAddValue',
        message: (o: any) => (this.msg('qProviderAddValue') + o.providerAddKey + ' ?')
      },
      {
        type: 'list',
        name: 'providerAddAnother',
        message: this.msg('qProviderAddAnother'),
        choices: [this.msg('yes'), this.msg('no')]
      }
    ]}
  }

  constructor(
    private kwArgs?: any, private directory = '', protected providers: any = {},
    protected providersOK: string[] = [], protected providersLeft: string[] = [],
    protected providerKeys: string[] = [], protected readonlyKeys: string[] = [
      'provider', 'statusCode', 'iat', 'uat'
    ],
    protected user = '', protected helpPW = false, protected messages: any = {}
  ) {
    if (!has('host-node')) { throw new Error('requires node.js'); }
    /*
    if (!!this.helpPW) { this.helpWithPW(); return; }
    if (typeof kwArgs === 'object' && !!(kwArgs) && !(kwArgs instanceof Array)) {
      lang.mixin(this, kwArgs);
    }*/
    i18n(<any>bundle, i18n.locale).then(this._init.bind(this));
  }

  protected _init(messages: Messages) {
    this.messages = messages;
    const subDir: string = (this.directory === '') ? '.IndieAuth' : this.directory;
    this.directory = path.resolve(userDir||'./',subDir);
    this.user = path.basename(userDir||'./');
    console.log(chalk.reset(' '));
    console.log(chalk.red(' ╔════╗ ') + chalk.green('   __   '));
    console.log(chalk.red(' ╚════╝ ') + chalk.green('  /__\\ '));
    console.log(chalk.red(' ╔════╗ ') + chalk.green(' / || \\'));
    console.log(chalk.red(' ║    ║ ') + chalk.green('(__||__)'));
    console.log(chalk.red(' ║    ║ '));
    console.log(chalk.red(' ╚════╝ ') + 'Hi ' + this.user + ', ' + this.msg('welcome'));
    doLog({success: '      IndieAuth Command Line Utility !'});
    this.providers = getProviders('', true, true, true);
    this.updateProviders();
    this.prerequisites();
  }

  protected updateProviders(pw?: string) {
    this.providerKeys = Object.keys(this.providers);
    this.providersLeft = []; this.providersOK = [];
    let q = this.q(pw);
    this.providerKeys.forEach((key) => {
      let a = (!!this.providers[key].setup && this.providers[key].setup.additionalProperties);
      if (!!pw && !!a) {
        let secretIndex = (q.create.map((action: any) => {
          return action.name;
        }).indexOf('provider_secret') || (q.create.length-1));
        q.create.splice.apply(q.create, [secretIndex+1, 0].concat(a));
      }
      if (!fs.existsSync(path.resolve(this.directory, key+'.jwt'))) {
        this.providersLeft.push(key);
      } else {
        this.providersOK.push(key);
      }
    });
    if (!!pw) {
      q.create = q.create.map((action: any) => {
        var key: string;
        for (key in action) {
          if (typeof action[key] === 'function') { action[key] = action[key].bind(this); }
        }
        return action;
      });
      return q;
    }
  }

/**/
  protected prerequisites() {
    return new Promise((resolve: any, reject: any) => {
      if (!fs.existsSync(path.join(this.directory, '/IndieAuth.jwt'))) {
        try {
          doLog({warning: this.msg('cInstalled') + ' :'});
          if (!fs.existsSync(this.directory)) { fs.mkdirSync(this.directory); }
          doLog({
            success: this.msg('cCredDir') + '\n' + this.directory
          });
          doLog({
            neutral: this.msg('cPWnote1') + '\n' + this.msg('cPWnote2') +
            '\n> ' + chalk.green(this.msg('cPWnote3'))
          });
          this.setPassword();
        } catch (e) {
          this.directory = '';
          reject(false);
        }
      } else {
        if (!!(process.env.PW) && checkPW(process.env.PW||'')) {
          this.start({pw: zxcvbn(process.env.PW)});
        } else {
          // check password
          inquirer.prompt(this.q().password).then(this.start.bind(this));
        }
      }
    });
  }

  private setPassword(saltMinLength: number = 100, saltMaxLength: number = 260): any {
    return inquirer.prompt(this.q().passwordSet).then((o: any) => {
      if (!!this.quitting) { return; }
      if (o.pwConfirmed.password !== o.pw.password) {
        doLog({error: this.msg('cPWerr')});
        this.setPassword(saltMinLength, saltMaxLength);
      } else {
        /* e.g. used for session secret ... */
        const kid = uuid();
        const salt = nonce(saltMinLength, saltMaxLength);
        if (typeof kid !== 'string' || typeof salt !== 'string' ||
          salt.length < saltMinLength || salt.length > saltMaxLength) {
          doLog({error: this.msg('cWriteErr') }); /* TODO better error for nonce err. */
          doLog({error: this.msg('cPWerr')});
          this.setPassword(100, 260);
        }
        writeToken({salt: salt, kid: kid}, o.pw.password);
        if (!checkPW(o.pw.password)) {
          // should not happen: we can't write in our created directory ...
          doLog({error: this.msg('cWriteErr') });
          doLog({neutral:this.msg('cWriteHint',{directory:this.directory,user:this.user})});
          return this.setPassword(saltMinLength, saltMaxLength);
        }
        this.start(o, true);
      }
    });
  }

  protected helpWithPW() {
    doLog({error: this.msg('cNoPWerr')}); doLog({error: this.msg('cNoPWerr2')});
    const __q = [{
      type: 'list',
      name: 'startCLI',
      message: this.msg('cCLI'),
      choices: [
        { name: this.msg('yes'), value: 'yes', short: 'CLI' },
        { name: this.msg('noAgain'), value: 'no', short: this.msg('qaQuit')}
      ]
    }];
    return (<any>inquirer).prompt(__q).then((hO: any): any => {
      if (hO.startCLI === 'yes') {
        return Promise.resolve(new CLI({directory: this.directory}));
      } else {
        return Promise.reject(false);
      }
    });
  }
  protected editFull(o: any, id: string, pw: string) {
    const _token = readToken(pw, id);
    const qEditFull = Object.keys(_token)
    .filter((key: string) => (this.readonlyKeys.indexOf(key) < 0))
    .map((key: string) => ({
      type: 'input',
      name: ('provider_'+key),
      message: this.msg('qProviderNewValue') + ' "' + key + '" ?',
      default: _token[key]
    }));
    return inquirer.prompt(qEditFull).then((eO: any) => {
      eO.providerID = id;
      writeToken(eO, pw);
      this.start(o, false, true);
    });
  }

  protected editAdd(o: any, id: string, pw: string, _o?: any) {
    const _token = (_o||{providerID: id});
    if (!_o) {
      _o = readToken(pw, id);
      var key: string;
      for (key in _o) {
        if (this.readonlyKeys.indexOf(key) === -1) {
          _token['provider_'+key] = _o[key];
        }
      }
    }
    const qEditAdd = this.q(pw, id).editAdd;
    return inquirer.prompt(qEditAdd).then((eO: any) => {
      if (eO.providerAddAnother === this.msg('yes')){
        _token['provider_'+eO.providerAddKey] = eO.providerAddValue;
        this.editAdd(o, id, pw, _token);
      } else {
        _token['provider_'+eO.providerAddKey] = eO.providerAddValue;
        writeToken(_token, pw);
        this.start(o, false, true);
      }
    });
  }

  protected start(o: any, isNew = false, isRepeat = false): any {
    if (!o.pw.password) { return false; }
    const pwBar = chalk.green('███') + (<any>chalk)[(o.pw.score === 4) ? 'green':'red']('█');
    const pwStatus = [pwBar,this.msg('vPW'),this.msg('vSc'),(o.pw.score+'/4')].join(' ');
    if (isNew) {
      doLog({success: pwStatus}); doLog({success: this.msg('cWorks')});
    } else {
      doLog({success: (isRepeat) ? 'OK!' : pwStatus});
    }

    const q: any = this.updateProviders(o.pw.password);
    //const q = this.q(o.pw.password);

    if (this.providersOK.length > 0) {
      doLog({success: this.msg('cFoundCred') + ': \n' + this.providersOK.join(', ')});
    }
    doLog( (this.providersLeft.length > 0) ?
      {error: this.msg('cFoundNot') + ': \n' + this.providersLeft.join(', ')} :
      {success: this.msg('cFoundAll')}
    );
    const rootPrompt: any = inquirer.prompt(q.actions);
    return rootPrompt.then((aO: any) => {
      if (aO.action !== 'quit') {
        return inquirer.prompt(q[aO.action]).then((rO: any) => {
          if (!!(rO.providerEdit) && rO.providerEdit !== 'editShort') {
            return (<any>this)[rO.providerEdit](o, rO.providerID, o.pw.password);
          } else {
            writeToken(rO, o.pw.password);
            return this.start(o, false, true);
          }
        });
      }
      this.quitting = true;
      doLog({
        out: [
          this.msg('thanks'), this.msg('_and'),
          ((this.providersLeft.length > 1) ? this.msg('comeback') : this.msg('bye'))
        ].join(' ')
      });
      console.log(chalk.reset(' '));
      if (!!(o.pw)) { delete o.pw; }
      if (!!(o.pwConfirmed)) { delete o.pwConfirmed; }
      process.exit(1);
    });
  }
}
