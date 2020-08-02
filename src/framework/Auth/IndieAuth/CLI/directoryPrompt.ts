/**
* `directory` type prompt
*/
const _pointer = process.platform === 'win32' ? '>' : '❯';
const cliCursor: any = require('cli-cursor');
import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import * as chalk from 'chalk';

import * as inquirer from 'inquirer';
const Base: any = require('inquirer/lib/prompts/base');
const observe: any = require('inquirer/lib/utils/events');
const Paginator: any = require('inquirer/lib/utils/paginator');
const Choices: any = require('inquirer/lib/objects/choices');
const Separator: any = require('inquirer/lib/objects/separator');
/**
* Constants
*/
const CHOOSE = 'Choose this directory';
const MAKE = 'Create a new directory here';
const MAKEPROMPT = 'Enter a name for the directory';
const BACK = '..';
const CURRENT = '.';



/**
* Function for rendering list choices
* @param  {Number} pointer Position of the pointer
* @return {String}         Rendered content
*/
function listRender(choices: any[], pointer: number) {
  var output = '';
  var separatorOffset = 0;

  choices.forEach(function(choice, index) {
    if (choice.type === 'separator') {
      separatorOffset++;
      output += '  ' + choice + '\n';
      return;
    }

    var isSelected = (index - separatorOffset === pointer);
    var line = (isSelected ? _pointer + ' ' : '  ') + choice.name;
    if (isSelected) {
      line = chalk.green(line);
    }
    output += line + ' \n';
  });

  return output.replace(/\n$/, '');
}

/**
* Function for getting list of folders in directory
* @param  {String} basePath the path the folder to get a list of containing folders
* @return {Array}           array of folder names inside of basePath
*/
function getDirectories(basePath: string) {
  return fs
    .readdirSync(basePath)
    .filter(function(file: any) {
      try {
        var stats = fs.lstatSync(path.join(basePath, file));
        if (stats.isSymbolicLink()) { return false; }
        var isDir = stats.isDirectory();
        var isNotDotFile = path.basename(file).indexOf('.') !== 0;
        return isDir && isNotDotFile;
      } catch (error) {
        return false;
      }
    })
    .sort();
}

/**
* Constructor
*/
export function Prompt() {
  Base.apply(this, arguments);
  if (!this.opt.basePath) {
    this.opt.basePath = '/';
  }
  this.currentPath = path.isAbsolute(this.opt.basePath) ? path.resolve(this.opt.basePath) : path.resolve(process.cwd(), this.opt.basePath);
  this.root = path.parse(this.currentPath).root;
  this.opt.choices = new Choices(this.createChoices(this.currentPath), this.answers);
  this.selected = 0;
  // Make sure no default is set (so it won't be printed)
  this.opt.default = null;
  this.searchTerm = '';
  this.paginator = new Paginator();
}
util.inherits(Prompt, Base);

/**
* Start the Inquiry session
* @param  {Function} callback      Callback when prompt is done
* @return {this}
*/

Prompt.prototype._run = function(callback: any) {
  var self = this;
  self.makeMode = false;
  this.done = callback;
  var alphaNumericRegex = /\w|\.|\-/i;
  var events = observe(this.rl);

  var keyUps = events.keypress.filter(function(evt: any) {
    return evt.key.name === 'up' || (evt.key.name === 'k');
  }).share();

  var keyDowns = events.keypress.filter(function(evt: any) {
    return evt.key.name === 'down' || (evt.key.name === 'j');
  }).share();

  var keySlash = events.keypress.filter(function(evt: any) {
    return (!self.makeMode && evt.value === '/');
  }).share();

  var keyMinus = events.keypress.filter(function(evt: any) {
    return (!self.makeMode && evt.value === '-');
  }).share();

  var alphaNumeric = events.keypress.filter(function(evt: any) {
    return evt.key.name === 'backspace' || alphaNumericRegex.test(evt.value);
  }).share();

  var outcome = this.handleSubmit(events.line);
  outcome.drill.forEach(this.handleDrill.bind(this));
  outcome.back.forEach(this.handleBack.bind(this));
  keyUps.takeUntil(outcome.done).forEach(this.onUpKey.bind(this));
  keyDowns.takeUntil(outcome.done).forEach(this.onDownKey.bind(this));
  keyMinus.takeUntil(outcome.done).forEach(this.handleBack.bind(this));
  events.keypress.takeUntil(outcome.done).forEach(this.hideKeyPress.bind(this));
  outcome.make.forEach(this.onSubmitMake.bind(this));
  outcome.done.forEach(this.onSubmitChoose.bind(this));

  // Init the prompt
  cliCursor.hide();
  this.render();

  return this;
};


/**
* Render the prompt to screen
* @return {Prompt} self
*/

Prompt.prototype.render = function() {
  // Render question
  var message = this.getQuestion();

  // Render choices or answer depending on the state
  if (this.status === 'answered') {
    message += chalk.green(this.currentPath);
  } else {
    message += chalk.bold('\n Current directory: ') + chalk.green(path.resolve(this.opt.basePath, this.currentPath));
    message += chalk.bold('\n');
    var choicesStr = listRender(this.opt.choices, this.selected);
    message += '\n' + (this.paginator.paginate(choicesStr, this.selected, this.opt.pageSize)||'');
    message += chalk.dim('\n(use "-" key to navigate to the parent folder');
    message += chalk.dim('\n(use arrow keys)');
  }
  this.screen.render(message);
};


/**
* When user press `enter` key
*
* @param {any} e
* @returns
*/
Prompt.prototype.handleSubmit = function(e: any) {
  var self = this;
  var obx = e.map(function() {
    return self.opt.choices.getChoice(self.selected).value;
  }).share();
  var make = obx.filter(function(choice: string) {
    return choice === MAKE;
  }).take(1);
  var done = obx.filter(function(choice: string) {
    return choice === CHOOSE || choice === CURRENT;
  }).take(1);
  var back = obx.filter(function(choice: string) {
    return choice === BACK;
  }).takeUntil(done);
  var drill = obx.filter(function(choice: string) {
    return choice !== BACK && choice !== CHOOSE && choice !== MAKE && choice !== CURRENT;
  }).takeUntil(done);

  return {
    make: make,
    done: done,
    back: back,
    drill: drill
  };
};

/**
*  when user selects to drill into a folder (by selecting folder name)
*/
Prompt.prototype.handleDrill = function() {
  var choice = this.opt.choices.getChoice(this.selected);
  this.currentPath = path.join(this.currentPath, choice.value);
  this.opt.choices = new Choices(this.createChoices(this.currentPath), this.answers);
  this.selected = 0;
  this.render();
};

/**
* when user selects '.. back'
*/
Prompt.prototype.handleBack = function() {
  this.currentPath = path.dirname(this.currentPath);
  this.opt.choices = new Choices(this.createChoices(this.currentPath), this.answers);
  this.selected = 0;
  this.render();
};

/**
* when user selects 'choose this folder'
*/
Prompt.prototype.onSubmitChoose = function(/*value*/) {
  this.status = 'answered';

  // Rerender prompt
  this.render();

  this.screen.done();
  cliCursor.show();
  this.done(path.resolve(this.opt.basePath, this.currentPath));
};

Prompt.prototype.onSubmitMake = function(/*value*/) {
  this.makeMode = true;
  console.log(' ');
  cliCursor.show();
//  return new Promise(function (resolve, reject) {
    inquirer.prompt([{
      type: 'input',
      name: 'dirname',
      message: MAKEPROMPT,
      default: '_IndieAuthSecrets',
      validate: function(dirname: string): any {
        var dir = path.resolve(this.opt.basePath, this.currentPath, dirname);
        if (!fs.existsSync(dir)) {
          try {
            if (!!this.makeMode) { fs.mkdirSync(dir); }
          } catch (e) {
            this.makeMode = false;
            return 'Access Denied!';
          }

          return true;
        }
        return true;
      }.bind(this)
    }]).then(function (o: any) {
      this.makeMode = false;
      if (!!o.dirname) {
        var dir = path.resolve(this.opt.basePath, this.currentPath, o.dirname);
        if (!!fs.existsSync(dir)){
          //console.log('MAKE DIR!',dir);
          this.status = 'answered';
          // Rerender prompt
          this.render();
          this.screen.done();
          cliCursor.show();
          this.done(dir);
        }
      }

    }.bind(this));
//  });
}

/**
* When user press a key
*/
Prompt.prototype.hideKeyPress = function() {
  this.render();
};

Prompt.prototype.onUpKey = function() {
  var len = this.opt.choices.realLength;
  this.selected = (this.selected > 0) ? this.selected - 1 : len - 1;
  this.render();
};

Prompt.prototype.onDownKey = function() {
  var len = this.opt.choices.realLength;
  this.selected = (this.selected < len - 1) ? this.selected + 1 : 0;
  this.render();
};

Prompt.prototype.onSlashKey = function(/*e*/) {
  this.render();
};

Prompt.prototype.onKeyPress = function(/*e*/) {
  var item: any;
  for (var index = 0; index < this.opt.choices.realLength; index++) {
    item = this.opt.choices.realChoices[index].name.toLowerCase();
    if (item.indexOf(this.searchTerm) === 0) {
      this.selected = index;
      break;
    }
  }
  this.render();
};

/**
* Helper to create new choices based on previous selection.
*/
Prompt.prototype.createChoices = function(basePath: string) {
  var choices = getDirectories(basePath);
  if (basePath !== this.root) {
    choices.unshift(BACK);
  }
  choices.unshift(CURRENT);
  if (choices.length > 0) {
    choices.push(new Separator());
  }
  choices.push(CHOOSE);
  choices.push(MAKE);

  choices.push(new Separator());
  return choices;
};
