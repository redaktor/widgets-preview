import { tsx } from '@dojo/framework/core/vdom';
import * as unified from 'unified';
import * as parse from 'remark-parse';
import * as remarkRehype from 'remark-rehype';

import filter from './rehypeFilter';
import childrenToDojo from './astToDojo';
// @ts-ignore remove when typed
const html = require('property-information/html');
// const PropTypes = require('prop-types');
// const uriTransformer = require('./uri-transformer');

export default function DojoMarkdown(options: any) {

  const processor = unified()
    .use(parse)
    // TODO: deprecate `plugins` in v7.0.0.
    .use(options.remarkPlugins || options.plugins || [])
    .use(remarkRehype, {allowDangerousHtml: true})
    .use(options.rehypePlugins || [])
    .use(filter, options);

  // @ts-ignore we’ll throw if it isn’t a root next.
  const hastNode /*: Root*/ = processor.runSync(processor.parse(options.children || ''));

  if (hastNode.type !== 'root') {
    throw new TypeError('Expected a `root` node')
  }

console.log(hastNode, childrenToDojo({options: options, schema: html, listDepth: 0}, hastNode));

  return options.className ?
  <div classes={options.className}>
    {...childrenToDojo({options: options, schema: html, listDepth: 0}, hastNode)}
  </div> :
  <virtual>
    {...childrenToDojo({options: options, schema: html, listDepth: 0}, hastNode)}
  </virtual>
}
