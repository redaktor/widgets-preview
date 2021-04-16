import { create, tsx } from '@dojo/framework/core/vdom';
import * as unified from 'unified';
import * as parse from 'remark-parse';
import * as remarkRehype from 'remark-rehype';

import filter from './rehypeFilter';
import childrenToDojo from './astToDojo';
// @ts-ignore remove when typed
const html = require('property-information/html');
// const PropTypes = require('prop-types');
// const uriTransformer = require('./uri-transformer');


export interface MDProperties {
	content: string;
	classes?: string;
	rehypePlugins?: unified.PluggableList;
	remarkPlugins?: unified.PluggableList;
}

const factory = create({}).properties<MDProperties>();

export const MD = factory(function MD({ properties, id, children }) {
	const {
		content,
		remarkPlugins = [],
		rehypePlugins = [],
		classes = []
	} = properties();

  const processor = unified().use(parse)
    .use(remarkPlugins)
    .use(remarkRehype, {allowDangerousHtml: true})
    .use(rehypePlugins)
    .use(filter, properties());

  // @ts-ignore we’ll throw if it isn’t a root next.
  const hastNode /*: Root*/ = processor.runSync(processor.parse(content || ''));

  if (hastNode.type !== 'root') {
    throw new TypeError('Expected a `root` node')
  }

	const options = { ...properties(), children: content };
// console.log(hastNode, childrenToDojo({options: options, schema: html, listDepth: 0}, hastNode));
  return classes ?
  <div classes={classes}>
    {...childrenToDojo({options, schema: html, listDepth: 0}, hastNode)}
  </div> :
  <virtual>
    {...childrenToDojo({options, schema: html, listDepth: 0}, hastNode)}
  </virtual>

});

export default MD;
