import { create, tsx } from '@dojo/framework/core/vdom';
import * as unified from 'unified';
import * as parse from 'remark-parse';
import * as remarkRehype from 'remark-rehype';
import * as remarkGFM from 'remark-gfm';

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
	/* Ignore HTML in Markdown completely */
	skipHtml?: boolean;
	/* Pass the index (number of elements before it) and siblingCount as props to all components */
	includeElementIndex?: boolean;
	/* Tag names to allow (can’t combine w/ disallowedElements). By default all elements are allowed */
	allowedElements?: string[];
	/* Tag names to disallow (can’t combine w/ allowedElements). By default no elements are disallowed */
	disallowedElements?: string[];
	/* Function called to check if an element is allowed (when truthy) or not.
	allowedElements / disallowedElements is used first! */
	allowElement?: (element: any, index: number, parent: any) => boolean;
	/* Extract (unwrap) the children of not allowed elements. By default, when strong is not allowed,
	it and it’s children is dropped,
	but with unwrapDisallowed the element itself is dropped but the children used */
	unwrapDisallowed?: boolean;
	/* Target to use on links (such as _blank for <a target="_blank"…) */
	linkTarget?: string | ((href: string, children: any, title: string) => string)
	/* URL to use for links. The default allows only http, https, mailto, and tel,
	and is available at ReactMarkdown.uriTransformer. Pass null to allow all URLs. … security */
	transformLinkUri?: ((href: string, children: any, title: string) => string);
	/* 	Same as transformLinkUri but for images */
	transformImageUri?: ((href: string, alt: string, title: string) => string);
	/* Object mapping tag names to Dojo modules */
	components?: any;
}

const factory = create({}).properties<MDProperties>();

export const MD = factory(function MD({ properties, id, children }) {
	const {
		content,
		classes = [],
		remarkPlugins = [remarkGFM],
		rehypePlugins = [],
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

  return classes ?
  <div classes={classes}>
    {...childrenToDojo({options, schema: html, listDepth: 0}, hastNode)}
  </div> :
  <virtual>
    {...childrenToDojo({options, schema: html, listDepth: 0}, hastNode)}
  </virtual>

});

export default MD;
