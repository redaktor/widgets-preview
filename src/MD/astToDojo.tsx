import { tsx, v } from '@dojo/framework/core/vdom';
import { MDProperties } from './';
const svg = require('property-information/svg');
const find = require('property-information/find');
const spaces = require('space-separated-tokens');
const commas = require('comma-separated-tokens');
import * as style from 'style-to-object';
const hASTtoDojo = {
  "classId": "classId",
  "dataType": "datatype",
  "itemId": "itemId",
  "strokeDashArray": "strokeDasharray",
  "strokeDashOffset": "strokeDashoffset",
  "strokeLineCap": "strokeLinecap",
  "strokeLineJoin": "strokeLinejoin",
  "strokeMiterLimit": "strokeMiterlimit",
  "typeOf": "typeof",
  "xLinkActuate": "xlinkActuate",
  "xLinkArcRole": "xlinkArcrole",
  "xLinkHref": "xlinkHref",
  "xLinkRole": "xlinkRole",
  "xLinkShow": "xlinkShow",
  "xLinkTitle": "xlinkTitle",
  "xLinkType": "xlinkType",
  "xmlnsXLink": "xmlnsXlink"
}

interface Info {
  space?: string;
  attribute: string;
  property: string;
  boolean?: boolean;
  booleanish?: boolean;
  overloadedBoolean?: boolean;
  number?: boolean;
  commaSeparated?: boolean;
  spaceSeparated?: boolean;
  commaOrSpaceSeparated?: boolean;
  mustUseProperty?: boolean;
  defined?: boolean;
}
interface Schema {
  property: {[key:string]: Info};
  normal: {[key:string]: string};
  space?: string;
}
interface Context {
  options: MDProperties;
  schema: Schema;
  listDepth: number;
}

/**
 * @typedef {Object} Raw
 * @property {'raw'} type
 * @property {string} value
 *
 *
 * @callback TransformLink
 * @param {string} href
 * @param {Array.<Comment|Element|Text>} children
 * @param {string?} title
 * @returns {string}
 *
 * @callback TransformImage
 * @param {string} src
 * @param {string} alt
 * @param {string?} title
 * @returns {string}
 *
 * @callback TransformLinkTarget
 * @param {string} href
 * @param {Array.<Comment|Element|Text>} children
 * @param {string?} title
 * @returns {string}
 *
 * @typedef {keyof IntrinsicElements} ReactMarkdownNames
 *
 * @typedef {Object.<string, unknown>} ReactBaseProps
 *
 * To do: is `data-sourcepos` typeable?
 *
 * @typedef {Object} ReactMarkdownProps
 * @property {Element} node
 * @property {string} key
 * @property {ReactNode[]} children
 * @property {number} [index] Passed when `options.includeElementIndex` is given
 * @property {number} [siblingCount] Passed when `options.includeElementIndex` is given
 *
 * @callback NormalComponent
 * @param {ReactBaseProps & ReactMarkdownProps} props
 * @returns {ReactNode}
 *
 * @callback CodeComponent
 * @param {ReactBaseProps & ReactMarkdownProps & {inline?: boolean}} props
 * @returns {ReactNode}
 *
 * @callback HeadingComponent
 * @param {ReactBaseProps & ReactMarkdownProps & {level: number}} props
 * @returns {ReactNode}
 *
 * @callback LiComponent
 * @param {ReactBaseProps & ReactMarkdownProps & {checked: boolean|null, index: number, ordered: boolean}} props
 * @returns {ReactNode}
 *
 * @callback OrderedListComponent
 * @param {ReactBaseProps & ReactMarkdownProps & {depth: number, ordered: true}} props
 * @returns {ReactNode}
 *
 * @callback TableCellComponent
 * @param {ReactBaseProps & ReactMarkdownProps & {style?: Object.<string, unknown>, isHeader: boolean}} props
 * @returns {ReactNode}
 *
 * @callback TableRowComponent
 * @param {ReactBaseProps & ReactMarkdownProps & {isHeader: boolean}} props
 * @returns {ReactNode}
 *
 * @callback UnorderedListComponent
 * @param {ReactBaseProps & ReactMarkdownProps & {depth: number, ordered: false}} props
 * @returns {ReactNode}
 *
 * @typedef {Object} SpecialComponents
 * @property {CodeComponent|ReactMarkdownNames} code
 * @property {HeadingComponent|ReactMarkdownNames} h1
 * @property {HeadingComponent|ReactMarkdownNames} h2
 * @property {HeadingComponent|ReactMarkdownNames} h3
 * @property {HeadingComponent|ReactMarkdownNames} h4
 * @property {HeadingComponent|ReactMarkdownNames} h5
 * @property {HeadingComponent|ReactMarkdownNames} h6
 * @property {LiComponent|ReactMarkdownNames} li
 * @property {OrderedListComponent|ReactMarkdownNames} ol
 * @property {TableCellComponent|ReactMarkdownNames} td
 * @property {TableCellComponent|ReactMarkdownNames} th
 * @property {TableRowComponent|ReactMarkdownNames} tr
 * @property {UnorderedListComponent|ReactMarkdownNames} ul
 *
 * @typedef {Record<Exclude<ReactMarkdownNames, keyof SpecialComponents>, NormalComponent|ReactMarkdownNames>} NormalComponents
 * @typedef {Partial<NormalComponents & SpecialComponents>} Components
 */

/**
 * @typedef {Object} TransformOptions
 * @property {boolean} [skipHtml=false]
 * @property {boolean} [includeElementIndex=false]
 * @property {false|TransformLink} [transformLinkUri]
 * @property {TransformImage} [transformImageUri]
 * @property {string|TransformLinkTarget} [linkTarget]
 * @property {Components} [components]
 */

const own = {}.hasOwnProperty

/**
 * @param {Context} context
 * @param {Element|Root} node
 */
export default function childrenToDojo(context: Context, node: any): any[] {
  const children: any[] = [];
  let childIndex = -1;
  let child;

  const isHandle = (c: any, i: number) =>
    (c.tagName === 'a' && !!i && node.children[i-1] && node.children[i-1].type === 'text' &&
      node.children[i-1].value && node.children[i-1].value.slice(-1) === '@');

  while (++childIndex < node.children.length) {
    child = node.children[childIndex];

    if (child.type === 'element') {
      if (child.tagName === 'a') {
        child.properties.title = !!child.properties.title ? child.properties.title :
          child.properties.href;
        child.properties.rel = 'noopener noreferrer';
        /* Mentions: ActivityPub like handles (inline) */
        if (isHandle(child, childIndex)) {
          child.properties.rel += ' contact';
          if (!!children[childIndex-1]) {
            children[childIndex-1] = children[childIndex-1].slice(0, -1);
          }
          if (typeof child.children[0].value === 'string') {
            child.children[0].value = `@${child.children[0].value}`;
          }
          if (typeof child.properties.href === 'string' && child.properties.href.indexOf('mailto:') === 0) {
            // TODO WEBFINGER for client and replace by propper URL
            child.properties.href = child.properties.href.replace('mailto:','https://');
          }
          // console.log(child, children[childIndex-1]);
        }
      }
      children.push(toDojo(context, child, childIndex, node))
    } else if (child.type === 'text') {
      children.push(child.value)
    } else if (child.type === 'raw' && !context.options.skipHtml) {
      children.push(child.value)
    }
  }

  return children
}

/**
 * @param {Context} context
 * @param {Element} node
 * @param {number} index
 * @param {Element|Root} parent
 */
export function toDojo(context: Context, node: any, index: number, parent: any) {
  const options = context.options;
  const parentSchema = context.schema;
  const name = node.tagName;
  const properties: any = {};
  let schema = parentSchema;
  let property: string;

  if (parentSchema.space === 'html' && name === 'svg') {
    schema = svg
    context.schema = schema
  }

  for (property in node.properties) {
    /* istanbul ignore else - prototype polution. */
    if (own.call(node.properties, property)) {
      addProperty(properties, property, node.properties[property], context)
    }
  }

  if (name === 'ol' || name === 'ul') {
    context.listDepth++
  }

  const children = childrenToDojo(context, node)

  if (name === 'ol' || name === 'ul') {
    context.listDepth--
  }

  // Restore parent schema.
  context.schema = parentSchema

  // Nodes created by plugins do not have positional info, in which case we use
  // an object that matches the positon interface.
  const position = node.position || {
    start: {line: null, column: null, offset: null},
    end: {line: null, column: null, offset: null}
  }
  const component: any =
    options.components && own.call(options.components, name)
      ? options.components[name]
      : name
  const basic = typeof component === 'string' || component === <virtual />

  properties.key = [
    name,
    position.start.line,
    position.start.column,
    index
  ].join('-')

  if (name === 'a' && options.linkTarget) {
    properties.target =
      typeof options.linkTarget === 'function'
        ? // @ts-ignore assume `href` is a string
          options.linkTarget(properties.href, node.children, properties.title)
        : options.linkTarget
  }

  if (name === 'a' && options.transformLinkUri) {
    properties.href = options.transformLinkUri(
      // @ts-ignore assume `href` is a string
      properties.href,
      node.children,
      properties.title
    )
  }

  if (!basic && name === 'code' && parent.tagName !== 'pre') {
    properties.inline = true
  }

  if (
    !basic &&
    (name === 'h1' ||
      name === 'h2' ||
      name === 'h3' ||
      name === 'h4' ||
      name === 'h5' ||
      name === 'h6')
  ) {
    properties.level = parseInt(name.charAt(1), 10)
  }

  if (name === 'img' && options.transformImageUri) {
    properties.src = options.transformImageUri(
      // @ts-ignore assume `src` is a string
      properties.src,
      properties.alt,
      properties.title
    )
  }

  if (!basic && name === 'li') {
    const input = getInputElement(node)
    properties.checked = input ? Boolean(input.properties.checked) : null
    properties.index = getElementsBeforeCount(parent, node)
    properties.ordered = parent.tagName === 'ol'
  }

  if (!basic && (name === 'ol' || name === 'ul')) {
    properties.ordered = name === 'ol'
    properties.depth = context.listDepth
  }

  if (name === 'td' || name === 'th') {
    if (properties.align) {
      if (!properties.style) { properties.style = {} }
      // @ts-ignore assume `style` is an object
      properties.style.textAlign = properties.align
      delete properties.align
    }

    if (!basic) {
      properties.isHeader = name === 'th'
    }
  }

  if (!basic && name === 'tr') {
    properties.isHeader = Boolean(parent.tagName === 'thead')
  }


  // If `includeElementIndex` is given, pass node index info to components.
  if (!basic && options.includeElementIndex) {
    properties.index = getElementsBeforeCount(parent, node)
    properties.siblingCount = getElementsBeforeCount(parent)
  }

  if (!basic) {
    properties.node = node
  }

  // Ensure no warnings are emitted for void elements w/ children.
  return children.length > 0 ? v(component, properties, children) : v(component, properties)
}

function getInputElement(node: any /*node*/ ) {
  let index = -1

  while (++index < node.children.length) {
    const child = node.children[index]

    if (child.type === 'element' && child.tagName === 'input') {
      return child
    }
  }

  return null
}

function getElementsBeforeCount(parent: any, node?: any /*[node]*/ ) {
  let index = -1
  let count = 0

  while (++index < parent.children.length) {
    if (parent.children[index] === node) { break }
    if (parent.children[index].type === 'element') { count++ }
  }

  return count
}

/**
 * @param {Object.<string, unknown>} props
 * @param {string} prop
 * @param {unknown} value
 * @param {Context} ctx
 */
function addProperty(props: any, prop: string, value: any, ctx: any) {
  const info: Info = find(ctx.schema, prop)
  let result = value

  // Ignore nullish and `NaN` values.
  // eslint-disable-next-line no-self-compare
  if (result === null || result === undefined || result !== result) {
    return
  }

  // Accept `array`.
  // Most props are space-separated.
  if (result && typeof result === 'object' && 'length' in result) {
    // type-coverage:ignore-next-line remove when typed.
    result = (info.commaSeparated ? commas : spaces).stringify(result)
  }

  if (info.property === 'style' && typeof result === 'string') {
    result = parseStyle(result)
  }

  if (info.space) {
    props[
      own.call(hASTtoDojo, info.property) ? (hASTtoDojo as any)[info.property] : info.property
    ] = result
  } else {
    props[info.attribute] = result
  }
}

function parseStyle(value: string) {
  const result: {[key: string]: string} = {}

  try {
    style(value, iterator)
  } catch (/** @type {Error} */ _) {
    // Silent.
  }

  return result

  function iterator(name: string, v: string) {
    const k = name.slice(0, 4) === '-ms-' ? `ms-${name.slice(4)}` : name
    result[k.replace(/-([a-z])/g, styleReplacer)] = v
  }
}

function styleReplacer(_: any, $1: string) {
  return $1.toUpperCase()
}
