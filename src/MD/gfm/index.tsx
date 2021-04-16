const fromMarkdown = require('mdast-util-gfm/from-markdown');
const toMarkdown = require('mdast-util-gfm/to-markdown');
let warningIssued: boolean;

// import * as autolink from './autolink';
const autolink = require('./autolink');
const combine = require('micromark/dist/util/combine-extensions');
const strikethrough = require('micromark-extension-gfm-strikethrough');
const table = require('micromark-extension-gfm-table');
const tasklist = require('micromark-extension-gfm-task-list-item');

function create(options: any) {
  return combine([autolink, strikethrough(options), table, tasklist])
}

export default function gfm(this: any, options: any) {
  let data = this.data();

  add('micromarkExtensions', create(options));
  add('fromMarkdownExtensions', fromMarkdown);
  add('toMarkdownExtensions', toMarkdown(options));

  function add(field: string, value: any) {
    /* istanbul ignore if - other extensions. */
    if (data[field]) {
			data[field].push(value)
		} else {
			data[field] = [value]
		}
  }
}
