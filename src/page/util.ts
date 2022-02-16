/*  some functions derive from https://github.com/ospfranco/link-preview-js
MIT License
Copyright (c) 2019 Oscar Franco
*/
import { AsObjectNormalized } from '../common/interfaces';
import { defaultContext } from '../_ld/as';
import { fetch } from 'cross-fetch';
import AbortController from 'abort-controller';
const cheerio = require('cheerio');
const urlObj = require('url');
const jsonld = require('jsonld');

interface BaseResponse {
  url: string;
  contentType: string;
  type: string[];
  icon: string[];
}
export interface ApplicationResponse extends BaseResponse { type: ['og:application']; }
export interface AudioResponse extends BaseResponse { type: ['og:audio']; }
export interface ImageResponse extends BaseResponse { type: ['og:image']; }
export interface VideoResponse extends BaseResponse { type: ['og:video'] }
export interface TextResponse extends AsObjectNormalized {
  ld: any[];
  contentType: string;
  siteName: string;
  videos: string[];
  'og:type': string;
  'twitter:card': 'summary'|'summary_large_image'|'app'|'player';
};
/* TODO

LINKS href | rel | mediaType | name | hreflang | height | width | preview
PLACE location: accuracy | altitude | latitude | longitude | radius | units
EVENT startTime | endTime | duration

attachment :
e.g. plus BreadcrumbList

attributedTo :
LD [Organization or Person]
author, creator, publisher, contributor, copyrightHolder, sponsor, funder, maintainer, producer, director, provider, publisher, sdPublisher, translator
OG [Profile]
profile:first_name - string - A name normally given to an individual by a parent or self-chosen.
profile:last_name - string - A name inherited from a family or marriage and by which the individual is commonly known.
profile:username - string - A short unique string to identify them.

// printEdition, printPage OR pageStart pageEnd OR pagination     wordCount
// TODO backstory in sub can be CreativeWork or Text !

// rel='author" and crawl rel="me"s
// mediaType https://ogp.me :
// image, audio, video, application, music, article, book, profile, website
*/
interface LinkPreviewOptions {
  headers?: Record<string, string>;
  imagesPropertyType?: string;
  proxyUrl?: string;
  timeout?: number;
  followRedirects?: boolean;
}
interface PreFetchedResource {
  headers: Record<string, string>;
  status?: number;
  imagesPropertyType?: string;
  proxyUrl?: string;
  url: string;
  data: string;
}

const REGEX_VALID_URL = new RegExp(
  "^" +
  // protocol identifier
  "(?:(?:https?|ftp)://)" +
  // user:pass authentication
  "(?:\\S+(?::\\S*)?@)?" +
  "(?:" +
  // IP address exclusion
  // private & local networks
  "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
  "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
  "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
  // IP address dotted notation octets
  // excludes loopback network 0.0.0.0
  // excludes reserved space >= 224.0.0.0
  // excludes network & broacast addresses
  // (first & last IP address of each class)
  "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
  "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
  "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
  "|" +
  // host name
  "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
  // domain name
  "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
  // TLD identifier
  "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
  // TLD may end with dot
  "\\.?" +
  ")" +
  // port number
  "(?::\\d{2,5})?" +
  // resource path
  "(?:[/?#]\\S*)?" +
  "$",
"i");

const metaTag = (doc: any, type: string, attr: string) => {
  const nodes = doc(`meta[${attr}='${type}']`);
  return nodes.length ? nodes : null;
};
const metaTagContent = (doc: any, type: string, attr: string, functional = false) => {
  const results = doc(`meta[${attr}='${type}']`).map((_: number, x: any) => doc(x).attr('content')).toArray();
  // OG says last one wins
  return !results.length ? void 0 : (!!functional ? results.reverse()[0] : results)
}
/* DC
rights, license, accessRights,

accrualMethod, accrualPeriodicity, accrualPolicy, alternative,
audience, available, bibliographicCitation, conformsTo, coverage,
educationLevel, extent, format, hasFormat, hasPart, hasVersion, identifier,
instructionalMethod, isFormatOf, isPartOf, isReferencedBy, isReplacedBy, isRequiredBy,
isVersionOf, language, medium, references, relation,
replaces, requires, spatial, tableOfContents, temporal, type, valid

Properties in the /elements/1.1/ namespace:
coverage, format, identifier, language, relation, rights, source
*/
function getTitles(doc: any) {
  let title = metaTagContent(doc, `og:title`, `property`) ||
    metaTagContent(doc, `og:title`, `name`) ||
    metaTagContent(doc, `twitter:title`, `name`) ||
    metaTagContent(doc, `DC.title`, `name`);
  if (!title) {
    title = toArray(doc(`title`).text()) || [];
  }
  return title;
}
function getSiteName(doc: any) {
  const siteName = metaTagContent(doc, `og:site_name`, `property`, true) ||
    metaTagContent(doc, `og:site_name`, `name`, true) ||
    metaTagContent(doc, `DC.source`, `name`, true) ||
    metaTagContent(doc, `DC.provenance`, `name`, true) || '';
  return siteName;
}
function getDescriptions(doc: any) {
  const description = metaTagContent(doc, `description`, `name`) ||
    metaTagContent(doc, `Description`, `name`) ||
    metaTagContent(doc, `og:description`, `property`) ||
    metaTagContent(doc, `DC.subject`, `property`) ||
    metaTagContent(doc, `DC.abstract`, `property`) ||
    metaTagContent(doc, `DC.description`, `property`) || [];
  return description;
}
function getTwitterCard(doc: any) {
  const twCard = metaTagContent(doc, `twitter:card`, `name`, true) ||
    metaTagContent(doc, `card`, `name`, true) || 'summary' || '';
  return twCard;
}
function getPublishedUpdated(doc: any) {
  // DC created, modified, date, dateAccepted, dateCopyrighted, dateSubmitted, issued
  const published = metaTagContent(doc, `date`, `name`, true) ||
    metaTagContent(doc, `Date`, `name`, true) ||
    metaTagContent(doc, `og:published_time`, `property`, true);
  const updated = metaTagContent(doc, `last-modified`, `name`, true) ||
    metaTagContent(doc, `og:modified_time`, `property`, true);
  return {published, updated};
}
function getAttributions(doc: any) {
  // OG metaTagContent(doc, `og:published_time`, `property`, true);
  const authors = metaTagContent(doc, `author`, `name`) ||
    metaTagContent(doc, `Author`, `name`) ||
    metaTagContent(doc, `DC.creator`, `name`) || [];
  const publishers = metaTagContent(doc, `publisher`, `name`) ||
    metaTagContent(doc, `Publisher`, `name`) ||
    metaTagContent(doc, `DC.publisher`, `name`) || [];
  const contributors = metaTagContent(doc, `contributor`, `name`) ||
    metaTagContent(doc, `DC.contributor`, `name`) || [];
  const rightsHolders = metaTagContent(doc, `copyright`, `name`) ||
    metaTagContent(doc, `Copyright`, `name`) ||
    metaTagContent(doc, `DC.rightsHolder`, `name`) ||
    metaTagContent(doc, `DC.rights`, `name`) || [];
  // (agency, parent, teacher or care-giver)
  const mediators = metaTagContent(doc, `mediator`, `name`) ||
    metaTagContent(doc, `DC.mediator`, `name`) || [];

  const attributedTo: any = [];
  [
    [authors,'http://purl.org/dc/elements/1.1/creator'],
    [publishers,'http://purl.org/dc/elements/1.1/publisher'],
    [contributors,'http://purl.org/dc/elements/1.1/contributor'],
    [rightsHolders,'http://purl.org/dc/terms/rightsHolder'],
    [mediators,'http://purl.org/dc/terms/mediator']
  ].forEach((a) => {
    const [attributions, rel] = a;
    if (!!attributions.length) {
      attributions.forEach((name: string) => attributedTo.push({type:['Object'],name,rel}))
    }
  });
  return attributedTo
}
function getTags(doc: any) {
  const keywords = (toArray(metaTagContent(doc, `keywords`, `name`)) || []).concat(
    toArray(metaTagContent(doc, `news_keywords`, `name`)) || []
  );
  return keywords;
}
function flat(a: any[]): any[] {
  return !!(Array.prototype as any).flat ?
    (a as any).flat() :
    a.reduce((acc, cur) => Array.isArray(cur) ? acc.concat(flat(cur)) : acc.concat(cur), []);
}
function getTypes(doc: any) {
  const node = metaTag(doc, `medium`, `name`);
  if (node) {
    const content = node.attr(`content`);
    return content === `image` ? `photo` : content;
  }
  const mapped: any = {article: ['og:article'], audio: ['Audio', 'og:audio'], video: ['Video', 'og:video'], image: ['Image', 'og:image'], music: ['Audio','og:music']};
  const value = metaTagContent(doc, `og:type`, `property`) || metaTagContent(doc, `og:type`, `name`);
  return (!value ? [] : flat(toArray(value).map((v: string) => mapped.hasOwnProperty(v) ? mapped[v] : `og:${v}`))) || ['Object'];
}

function getUrls(doc: any, relSelectors = ['canonical', 'alternate', 'manifest']): AsObjectNormalized[] {
  const url: AsObjectNormalized[] = [];
  let nodes = [];
  let href: string;
  relSelectors.forEach((rel) => {
    // look for all icon tags
    nodes = doc(`link[rel="${rel}"]`);
    // collect all images from icon tags
    if (nodes.length) {
      nodes.each((_: any, node: any) => {
        if (node.type === 'tag') {
          href = node.attribs.href;
        }
        if (href) {
          const o: AsObjectNormalized = { type: ['Link'], href, rel: [rel] };
          const type = node.attribs.type;
          if (type) {
            o.mediaType = type;
          }
          url.push(o);
        }
      });
    }
  });
  return url;
}

function getMediaType(doc: any) {
  const node = metaTag(doc, `medium`, `name`);
  if (node) {
    const content = node.attr(`content`);
    return content === `image` ? `photo` : content;
  }
  return (metaTagContent(doc, `og:type`, `property`) ||
    metaTagContent(doc, `og:type`, `name`));
}


function getVideos(doc: any, vocab: string = 'og', type = 'video') {
  const videos = [];
  let nodeType;
  let nodeSecureUrl;
  let video;
  let mediaType;
  let videoSecureUrl;
  let videoObj: AsObjectNormalized;
  let index;
  let nodes = metaTag(doc, `${vocab}:${type}`, `property`) || metaTag(doc, `${vocab}:${type}`, `name`);
  const getTag = (key: string) => metaTag(doc, `${vocab}:${type}:${key}`, `property`) ||
  metaTag(doc, `${vocab}:${type}:${key}`, `name`) || [];
  if (!!nodes && !!nodes.length) {
    const [nodeTypes, nodeSecureUrls, width, height] = [
      getTag('type'), getTag('secure_url'), getTag('width'), getTag('height')
    ];
    for (index = 0; index < nodes.length; index += 1) {
      const node = nodes[index];
      if (node.type === 'tag') {
        video = node.attribs.content;
      }
      nodeType = nodeTypes[index];
      if (!!nodeType && nodeType.type === 'tag') {
        mediaType = nodeType ? nodeType.attribs.content : null;
      }
      nodeSecureUrl = nodeSecureUrls[index];
      if (!!nodeSecureUrl && nodeSecureUrl.type === 'tag') {
        videoSecureUrl = nodeSecureUrl ? nodeSecureUrl.attribs.content : null;
      }
      const hrefs = [videoSecureUrl, video].filter((v) => !!v);
      if (!hrefs.length) { continue }
      videoObj = {
        type: ['Link'],
        href: hrefs[0]
      };

      if (!!mediaType && mediaType.length) {
        videoObj.mediaType = mediaType;
      }
      if (!!width && width.length) {
        videoObj.width = width[0];
      }
      if (!!height && height.length) {
        videoObj.height = height[0];
      }
      if (mediaType && mediaType.indexOf(`video/`) === 0) {
        videos.splice(0, 0, videoObj);
      } else {
        videos.push(videoObj);
      }
    }
  }
  return videos;
}
function getImages(doc: any, rootUrl: string, imagesPropertyType?: string) {
  let images = getVideos(doc, 'og', 'image');
  let nodes: any | null;
  let href: string | undefined;
  let dic: Record<string, boolean> = {};

  if (images.length <= 0 && !imagesPropertyType) {
    href = urlObj.resolve(rootUrl, doc(`link[rel=image_src]`).attr(`href`));
    if (!!href) {
      images.push({ type: ['Link'], href });
    } else {
      nodes = doc(`img`);
      if (!!nodes && !!nodes.length) {
        dic = {};
        nodes.each((_: any, node: any) => {
          if (node.type === 'tag') {
            href = node.attribs.src;
          }
          if (href && !dic[href]) {
            dic[href] = true;
            const o: AsObjectNormalized = { type: ['Link'], href }
            if (!!node.attribs.width) { o.width = node.attribs.width }
            if (!!node.attribs.height) { o.height = node.attribs.height }
            images.push(urlObj.resolve(rootUrl, href));
          }
        });
      }
    }
  }
  return images;
}
// returns default favicon (//hostname/favicon.ico) for a url
function getDefaultFavicon(rootUrl: string): AsObjectNormalized {
  return {
    type: ['Link'],
    href: urlObj.resolve(rootUrl, `/favicon.ico`),
    rel: ['favicon'],
    mediaType: 'image/x-icon'
  };
}
// returns an array of URLs to favicon images
function getFavicons(doc: any, rootUrl: string) {
  const relSelectors = ['icon', 'shortcut icon', 'apple-touch-icon'];
  const images: AsObjectNormalized[] = getUrls(doc, relSelectors).map((o) => ({...o, mediaType: 'image/png'}));
  // if no icon images, use default favicon location
  if (images.length <= 0) {
    images.push(getDefaultFavicon(rootUrl));
  }
  return images;
}

function parseTextResponse(
  body: string,
  url: string,
  options: LinkPreviewOptions = {},
  contentType?: string
) {
  const doc = cheerio.load(body);
  // news_keywords copyright
  const ldContentType = 'application/ld+json';
  const jsonLD = doc(`script[type='${ldContentType}']`);
  let ld: any[] = [];
  if (!!jsonLD.length) {
    jsonLD.each((_: any, node: any) => {
      if (!!node.children && !!node.children.length) {
        try {
          const ldData = node.children[0].data;
          const ldObj = JSON.parse(ldData);
          if (typeof ldObj === 'object') {
            if (Array.isArray(ldObj)) {
              ld = ld.concat(ldObj);
            } else {
              ld.push(ldObj)
            }
          }
        } catch(e) { }
      }
    });
  }

  const type = ['Page'].concat(getTypes(doc) || ['og:website']);
  const { published, updated } = getPublishedUpdated(doc);
  const asUrl = [{type: ['Link'], href: url, mediaType: contentType}]
    .concat((getUrls(doc) || []).map((l) => !l.rel || l.rel[0] !== 'canonical' ? l : {...l, mediaType: contentType}) as any);
  return {
      ld,
      contentType,
      type,
      published,
      updated,
      url: asUrl,
      attributedTo: getAttributions(doc),
      siteName: getSiteName(doc),
      name: getTitles(doc),
      summary: getDescriptions(doc),
      tag: getTags(doc),
      icon: getFavicons(doc, url),
      image: getImages(doc, url, options.imagesPropertyType),
      attachment: getVideos(doc),
      'og:type': getMediaType(doc) || `website`,
      'twitter:card': getTwitterCard(doc)
  };
}

function parseMediaResponse(url: string, contentType: string, type: string[]) {
  return { url, contentType, type, icon: [getDefaultFavicon(url)] };
}

function parseResponse(response: PreFetchedResource, options?: LinkPreviewOptions) {
  try {
    let contentType = response.headers[`content-type`];
    if (!!contentType && contentType.indexOf(`;`)) {
      // eslint-disable-next-line prefer-destructuring
      contentType = contentType.split(`;`)[0];
      if (Array.isArray(contentType)) { contentType = contentType[0] }
    }
    if (!contentType) { return parseTextResponse(response.data, response.url, options) }
    let mainType = contentType.split(`/`)[0];
    if (!mainType) { return parseTextResponse(response.data, response.url, options) }
    mainType = mainType.trim().toUpperCase();
    // parse response depending on content type
    const mediaType = {IMAGE: 'Image', AUDIO: 'Audio', VIDEO: 'Video', APPLICATION: 'Application'}
    if (mediaType.hasOwnProperty(mainType)) {
      return parseMediaResponse(response.url, contentType, [mediaType[mainType as keyof typeof mediaType]])
    } else {
      const htmlString = response.data;
      return parseTextResponse(htmlString, response.url, options, contentType);
    }
  } catch (e) {
    return null
  }
}

async function handleFetch(text: string, options?: LinkPreviewOptions) {
  const detectedUrl = text.replace(/\n/g, ` `).split(` `)
      .find((token) => REGEX_VALID_URL.test(token));
  if (!detectedUrl) {
      throw new Error(`link-preview-js did not receive a valid a url or text`);
  }
  const timeout = (!!options && options.timeout) || 3000; // 3 second timeout default
  const controller = new AbortController();
  const timeoutCounter = setTimeout(() => controller.abort(), timeout);
  const fetchOptions: any = {
      headers: (!!options && options.headers) || {},
      redirect: (!!options && options.followRedirects) ? `follow` : `error`,
      signal: controller.signal,
  };
  const fetchUrl = (!!options && options.proxyUrl) ? options.proxyUrl.concat(detectedUrl) : detectedUrl;
  const response = await fetch(fetchUrl, fetchOptions).catch((e) => {
      if (e.name === 'AbortError') {
          throw new Error('Request timeout');
      }
      throw e;
  });
  clearTimeout(timeoutCounter);
  return response
}

async function parseLD(
  parsed: TextResponse,
  response: PreFetchedResource,
  options?: LinkPreviewOptions
) {
  const {ld} = parsed;
  const ldMain: any = [];
  const ldAdditional: any = [];
  if (!ld || !ld.length) { return parsed }
  const LD = await jsonld.compact(ld, defaultContext);
  if (!LD || !LD['@graph']) { return parsed }
  for (const item of LD['@graph']) {
    const main = item['schema:mainEntityOfPage'];
    const target: any = !!main && !!(toArray(main)).filter((u) => u.id === response.url).length ?
      ldMain : ldAdditional;
    target.push(item);
  }
  (parsed as TextResponse).ld = ldAdditional;
/*
  console.log(JSON.stringify(ldMain));
  console.log('//');
  console.log(ldAdditional);
*/
  parsed = {...parsed, ...(!!ldMain.length ? (ldMain[0]||{}) : {}), type: parsed.type}
  for (const item of ldMain) {
    if (typeof item !== 'object') { continue }
    const _ = (key: string, cur = item) => {
      if (cur.hasOwnProperty(`schema:${key}`)) {
        const o = cur[`schema:${key}`];
        if (typeof o === 'string' || o.hasOwnProperty('@type')) {
          return o
        }
        return o.hasOwnProperty('@value') ?
          cur[`schema:${key}`]['@value'] : (cur[`schema:${key}`].hasOwnProperty('id') ?
            cur[`schema:${key}`]['id'] : cur[`schema:${key}`])
      }
    }
    const types = toArray(item.type);
    parsed.type = Array.from(new Set(parsed.type.concat(types).filter((v) => !!v)));

    if (!!item.image) {
      parsed.image = toArray(item.image)
    } else {
      const toLink = (type: string) => ((image: any) => {
        if (typeof image === 'string') {
          return {type: ['Link'], href: image, rel: [`schema:${type}`] }
        } else if (typeof image === 'object') {
          const href = _('contentUrl', image) || _('url', image) || image.href;
          const o: AsObjectNormalized | false = !!href && {type: ['Link'], href: image, rel: [`schema:${type}`] }
          if (!!o && _('width', image)) { o.height = _('width', image) }
          if (!!o && _('height', image)) { o.height = _('height', image) }
          if (!!o && _('encodingFormat', image)) { o.mediaType = _('encodingFormat', image) }
          return {...image, ...o}
        }
      });
      const [img, thumb] = [_('image').map(toLink('image')), _('thumbnailUrl').map(toLink('thumbnailUrl'))];
      const images = (!!img && !!img.length ? img : []).concat(!!thumb && !!thumb.length ? thumb : []);
      parsed.image = Array.from(new Set((parsed.image || []).concat(images)));
    }

    if (!!item.name) {
      parsed.name = toArray(item.name)
    } else if (!!_('headline')) {
      parsed.name = toArray(_('headline'))
    }
    if (!!_('alternativeHeadline')) { parsed.name = (parsed.name || []).concat(toArray(_('headline'))) }
    if (!!_('dateline')) { parsed.name = (parsed.name || []).concat(toArray(_('dateline'))) }
    const backstory = _('backstory');
    if (!!backstory && typeof backstory === 'string') {
      parsed.name = (parsed.name || []).concat(toArray(`backstory: ${backstory}`))
    }
    // TODO backstory in sub can be CreativeWork or Text !

    if (!!item.summary) {
      parsed.summary = toArray(item.summary)
    } else if (!parsed.summary) {
      parsed.summary = _('abstract') || _('description') || _('text') || '';
    }
    if (!!item.content) {
      parsed.content = toArray(item.content)
    } else if (!!_('articleBody')) {
      item.content = _('articleBody');
      types.push('Article')
    }
    if (Array.isArray(_('keywords'))) {
      parsed.tag = (parsed.tag || []).concat(_('keywords')).filter((v) => !!v && typeof v === 'string')
    }
    // well known, functional corresponding as:
    const toAP = (asProperty: keyof AsObjectNormalized, schemaProperty: string) => {
      const schemaValue = _(schemaProperty);
      if (!item[asProperty] && !schemaValue) { return }
      parsed[asProperty] = !!item[asProperty] ? item[asProperty] : _(schemaProperty)
    }
    const convert: [(keyof AsObjectNormalized), string][] = [
      ['published','datePublished'], ['updated','dateModified'],
      ['startTime','startDate'], ['endTime','endDate'], ['duration','duration']
    ];
    convert.forEach((a) => toAP(...a));


    ['latitude','longitude'].forEach((key) => {
      if (!item[key] && !(!parsed[key] && !!_(key as string))) { return }
      parsed[key] = !!item[key] ? toArray(item[key]) :_(key as string);
    });


    const lastUrl = !!parsed.url && !!parsed.url.length && parsed.url[parsed.url.length-1];
    const manifest = !!lastUrl && typeof lastUrl === 'object' && lastUrl.rel &&
      lastUrl.rel.length && lastUrl.rel[0] === 'manifest' && lastUrl.href;
    if (!parsed.siteName && !!manifest) {
      const manifestRes = await handleFetch(manifest, options);
      const manifestO = await manifestRes.json();
      parsed.siteName = (manifestO.name || manifestO.short_name).trim() || '';
    }
  }

  return parsed;
}

function toArray(x: any) { return !Array.isArray(x) ? [x] : x }
/**
 * Parses the text, extracts the first link it finds and does a HTTP request
 * to fetch the website content, afterwards it tries to parse the internal HTML
 * and extract the information via meta tags
 * @param text string, text to be parsed
 * @param options LinkPreviewOptions
 */
export async function getLinkPreview(
  text: string,
  options?: LinkPreviewOptions
) {
  if (!text || typeof text !== `string`) { return null }
  const response: Response = await handleFetch(text, options);
  const headers: Record<string, string> = {};
  response.headers.forEach((header, key) => {
      headers[key] = header;
  });
  const normalizedResponse: PreFetchedResource = {
      url: (!!options && options.proxyUrl)
          ? response.url.replace(options.proxyUrl, ``)
          : response.url,
      headers,
      data: await response.text(),
  };
  const parsed = await getPreviewFromResponse(normalizedResponse, options);
  return parsed
}

/**
 * Skip the library fetching the website for you, instead pass a response object
 * from whatever source you get and use the internal parsing of the HTML to return
 * the necessary information
 * @param response Preview Response
 * @param options IPreviewLinkOptions
 */
export async function getPreviewFromResponse(
  response: PreFetchedResource,
  options?: LinkPreviewOptions
) {
  if (!response || typeof response !== `object` || !response.url) { return null }
  const parsedResponse = parseResponse(response, options);
  if (!parsedResponse || !parsedResponse.hasOwnProperty('ld')) { return parsedResponse }
  const parsed = await parseLD((parsedResponse as any), response, options);
  return parsed
}
