const cheerio = require("cheerio");
const { fetch } = require("cross-fetch");
const AbortController = require("abort-controller");
const urlObj = require("url");
const jsonld = require("jsonld");

function toArray(x) { return !Array.isArray(x) ? [x] : x }
function ldPartial(o, vocabulary  = 'schema', toArrays = false) {
  const res = {};
  for (let k in o) {
    const [prefix, key] = k.split(':');
    if (prefix === vocabulary) {
      res[key] = (!!toArrays && !Array.isArray(o[k])) ? [o[k]] : o[k];
    }
  }
  return res
}
const defaultContext = ["https://www.w3.org/ns/activitystreams",{
  "@version":1.1,
  "as":"https://www.w3.org/ns/activitystreams",
  "bibo":"http://purl.org/ontology/bibo/","dc":"http://purl.org/dc/elements/1.1/",
  "dcat":"http://www.w3.org/ns/dcat#","dct":"http://purl.org/dc/terms/",
  "dcterms":"http://purl.org/dc/terms/","dctype":"http://purl.org/dc/dcmitype/",
  "eli":"http://data.europa.eu/eli/ontology#","foaf":"http://xmlns.com/foaf/0.1/",
  "ldp":"http://www.w3.org/ns/ldp#","og":"http://ogp.me/ns#","org":"http://www.w3.org/ns/org#",
  "owl":"http://www.w3.org/2002/07/owl#","rdf":"http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  "rdfa":"http://www.w3.org/ns/rdfa#","rdfs":"http://www.w3.org/2000/01/rdf-schema#",
  "redaktor":"https://purl.org/redaktor/namespace","schema":"http://schema.org/",
  "skos":"http://www.w3.org/2004/02/skos/core#","snomed":"http://purl.bioontology.org/ontology/SNOMEDCT/",
  "vcard":"http://www.w3.org/2006/vcard/ns#","void":"http://rdfs.org/ns/void#",
  "xml":"http://www.w3.org/XML/1998/namespace","xsd":"http://www.w3.org/2001/XMLSchema#"
}];



const REGEX_VALID_URL = new RegExp("^" +
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
    "$", "i");
const metaTag = (doc, type, attr) => {
    const nodes = doc(`meta[${attr}='${type}']`);
    return nodes.length ? nodes : null;
};
const metaTagContent = (doc, type, attr, functional = false) => {
    const results = doc(`meta[${attr}='${type}']`).map((_, x) => doc(x).attr('content')).toArray();
    // OG says last one wins
    return !results.length ? void 0 : (!!functional ? results.reverse()[0] : results);
};
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
function getTitles(doc) {
    let title = metaTagContent(doc, `og:title`, `property`) ||
        metaTagContent(doc, `og:title`, `name`) ||
        metaTagContent(doc, `twitter:title`, `name`) ||
        metaTagContent(doc, `DC.title`, `name`);
    if (!title) {
        title = toArray(doc(`title`).text()) || [];
    }
    return title;
}
function getSiteName(doc) {
    const siteName = metaTagContent(doc, `og:site_name`, `property`, true) ||
        metaTagContent(doc, `og:site_name`, `name`, true) ||
        metaTagContent(doc, `DC.source`, `name`, true) ||
        metaTagContent(doc, `DC.provenance`, `name`, true) || '';
    return siteName;
}
function getDescriptions(doc) {
    const description = metaTagContent(doc, `description`, `name`) ||
        metaTagContent(doc, `Description`, `name`) ||
        metaTagContent(doc, `og:description`, `property`) ||
        metaTagContent(doc, `DC.subject`, `property`) ||
        metaTagContent(doc, `DC.abstract`, `property`) ||
        metaTagContent(doc, `DC.description`, `property`) || [];
    return description;
}
function getTwitterCard(doc) {
    const twCard = metaTagContent(doc, `twitter:card`, `name`, true) ||
        metaTagContent(doc, `card`, `name`, true) || 'summary' || '';
    return twCard;
}
function getPublishedUpdated(doc) {
    // DC created, modified, date, dateAccepted, dateCopyrighted, dateSubmitted, issued
    const published = metaTagContent(doc, `date`, `name`, true) ||
        metaTagContent(doc, `Date`, `name`, true) ||
        metaTagContent(doc, `og:published_time`, `property`, true);
    const updated = metaTagContent(doc, `last-modified`, `name`, true) ||
        metaTagContent(doc, `og:modified_time`, `property`, true);
    return { published, updated };
}
function getAttributions(doc) {
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
    const attributedTo = [];
    [
        [authors, 'http://purl.org/dc/elements/1.1/creator'],
        [publishers, 'http://purl.org/dc/elements/1.1/publisher'],
        [contributors, 'http://purl.org/dc/elements/1.1/contributor'],
        [rightsHolders, 'http://purl.org/dc/terms/rightsHolder'],
        [mediators, 'http://purl.org/dc/terms/mediator']
    ].forEach((a) => {
        const [attributions, rel] = a;
        if (!!attributions.length) {
            attributions.forEach((name) => attributedTo.push({ "type": ["Object"], name, rel }));
        }
    });
    return attributedTo;
}
function getTags(doc) {
    const keywords = (toArray(metaTagContent(doc, `keywords`, `name`)) || []).concat(toArray(metaTagContent(doc, `news_keywords`, `name`)) || []);
    return keywords;
}
function flat(a) {
    return !!Array.prototype.flat ?
        a.flat() :
        a.reduce((acc, cur) => Array.isArray(cur) ? acc.concat(flat(cur)) : acc.concat(cur), []);
}
function getTypes(doc) {
    const node = metaTag(doc, `medium`, `name`);
    if (node) {
        const content = node.attr(`content`);
        return content === `image` ? `photo` : content;
    }
    const mapped = { article: ['og:article'], audio: ['Audio', 'og:audio'], video: ['Video', 'og:video'], image: ['Image', 'og:image'], music: ['Audio', 'og:music'] };
    const value = metaTagContent(doc, `og:type`, `property`) || metaTagContent(doc, `og:type`, `name`);
    return (!value ? [] : flat(toArray(value).map((v) => mapped.hasOwnProperty(v) ? mapped[v] : `og:${v}`))) || ['Object'];
}
function getUrls(doc, relSelectors = ['canonical', 'alternate', 'manifest']) {
    const url = [];
    let nodes = [];
    let href;
    relSelectors.forEach((rel) => {
        // look for all icon tags
        nodes = doc(`link[rel="${rel}"]`);
        // collect all images from icon tags
        if (nodes.length) {
            nodes.each((_, node) => {
                if (node.type === "tag") {
                    href = node.attribs.href;
                }
                if (href) {
                    const o = { type: ['Link'], href, rel: [rel] };
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
function getMediaType(doc) {
    const node = metaTag(doc, `medium`, `name`);
    if (node) {
        const content = node.attr(`content`);
        return content === `image` ? `photo` : content;
    }
    return (metaTagContent(doc, `og:type`, `property`) ||
        metaTagContent(doc, `og:type`, `name`));
}
function getVideos(doc, vocab = 'og', type = 'video') {
    const videos = [];
    let nodeType;
    let nodeSecureUrl;
    let video;
    let mediaType;
    let videoSecureUrl;
    let videoObj;
    let index;
    let nodes = metaTag(doc, `${vocab}:${type}`, `property`) || metaTag(doc, `${vocab}:${type}`, `name`);
    const getTag = (key) => metaTag(doc, `${vocab}:${type}:${key}`, `property`) ||
        metaTag(doc, `${vocab}:${type}:${key}`, `name`) || [];
    if (!!nodes && !!nodes.length) {
        const [nodeTypes, nodeSecureUrls, width, height] = [
            getTag('type'), getTag('secure_url'), getTag('width'), getTag('height')
        ];
        for (index = 0; index < nodes.length; index += 1) {
            const node = nodes[index];
            if (node.type === "tag") {
                video = node.attribs.content;
            }
            nodeType = nodeTypes[index];
            if (!!nodeType && nodeType.type === "tag") {
                mediaType = nodeType ? nodeType.attribs.content : null;
            }
            nodeSecureUrl = nodeSecureUrls[index];
            if (!!nodeSecureUrl && nodeSecureUrl.type === "tag") {
                videoSecureUrl = nodeSecureUrl ? nodeSecureUrl.attribs.content : null;
            }
            const hrefs = [videoSecureUrl, video].filter((v) => !!v);
            if (!hrefs.length) {
                continue;
            }
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
            }
            else {
                videos.push(videoObj);
            }
        }
    }
    return videos;
}
function getImages(doc, rootUrl, imagesPropertyType) {
    let images = getVideos(doc, 'og', 'image');
    let nodes;
    let href;
    let dic = {};
    if (images.length <= 0 && !imagesPropertyType) {
        href = urlObj.resolve(rootUrl, doc(`link[rel=image_src]`).attr(`href`));
        if (!!href) {
            images.push({ type: ['Link'], href });
        }
        else {
            nodes = doc(`img`);
            if (!!nodes && !!nodes.length) {
                dic = {};
                nodes.each((_, node) => {
                    if (node.type === "tag") {
                        href = node.attribs.src;
                    }
                    if (href && !dic[href]) {
                        dic[href] = true;
                        const o = { type: ['Link'], href };
                        if (!!node.attribs.width) {
                            o.width = node.attribs.width;
                        }
                        if (!!node.attribs.height) {
                            o.height = node.attribs.height;
                        }
                        images.push(urlObj.resolve(rootUrl, href));
                    }
                });
            }
        }
    }
    return images;
}
// returns default favicon (//hostname/favicon.ico) for a url
function getDefaultFavicon(rootUrl) {
    return {
        type: ['Link'],
        href: urlObj.resolve(rootUrl, `/favicon.ico`),
        rel: ['favicon'],
        mediaType: 'image/x-icon'
    };
}
// returns an array of URLs to favicon images
function getFavicons(doc, rootUrl) {
    const relSelectors = ['icon', 'shortcut icon', 'apple-touch-icon'];
    const images = getUrls(doc, relSelectors).map((o) => (Object.assign(Object.assign({}, o), { mediaType: 'image/png' })));
    // if no icon images, use default favicon location
    if (images.length <= 0) {
        images.push(getDefaultFavicon(rootUrl));
    }
    return images;
}
function parseTextResponse(body, url, options = {}, contentType) {
    const doc = cheerio.load(body);
    // news_keywords copyright
    const ldContentType = 'application/ld+json';
    const jsonLD = doc(`script[type='${ldContentType}']`);
    let ld = [];
    if (!!jsonLD.length) {
        jsonLD.each((_, node) => {
            if (!!node.children && !!node.children.length) {
                try {
                    const ldData = node.children[0].data;
                    const ldObj = JSON.parse(ldData);
                    if (typeof ldObj === 'object') {
                        if (Array.isArray(ldObj)) {
                            ld = ld.concat(ldObj);
                        }
                        else {
                            ld.push(ldObj);
                        }
                    }
                }
                catch (e) { }
            }
        });
    }
    const type = ['Page'].concat(getTypes(doc) || ['og:website']);
    const { published, updated } = getPublishedUpdated(doc);
    const asUrl = [{ type: ["Link"], href: url, mediaType: contentType }]
        .concat((getUrls(doc) || []).map((l) => !l.rel || l.rel[0] !== 'canonical' ? l : Object.assign(Object.assign({}, l), { mediaType: contentType })));
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
function parseMediaResponse(url, contentType, type) {
    return { url, contentType, type, icon: [getDefaultFavicon(url)] };
}
function parseResponse(response, options) {
    try {
        let contentType = response.headers[`content-type`];
        if (!!contentType && contentType.indexOf(`;`)) {
            // eslint-disable-next-line prefer-destructuring
            contentType = contentType.split(`;`)[0];
            if (Array.isArray(contentType)) {
                contentType = contentType[0];
            }
        }
        if (!contentType) {
            return parseTextResponse(response.data, response.url, options);
        }
        let mainType = contentType.split(`/`)[0];
        if (!mainType) {
            return parseTextResponse(response.data, response.url, options);
        }
        mainType = mainType.trim().toUpperCase();
        // parse response depending on content type
        const mediaType = { IMAGE: 'Image', AUDIO: 'Audio', VIDEO: 'Video', APPLICATION: 'Application' };
        if (mediaType.hasOwnProperty(mainType)) {
            return parseMediaResponse(response.url, contentType, [mediaType[mainType]]);
        }
        else {
            const htmlString = response.data;
            return parseTextResponse(htmlString, response.url, options, contentType);
        }
    }
    catch (e) {
        return null;
    }
}
async function handleFetch(text, options) {
    const detectedUrl = text.replace(/\n/g, ` `).split(` `)
        .find((token) => REGEX_VALID_URL.test(token));
    if (!detectedUrl) {
        throw new Error(`link-preview-js did not receive a valid a url or text`);
    }
    const timeout = (!!options && options.timeout) || 3000; // 3 second timeout default
    const controller = new AbortController();
    const timeoutCounter = setTimeout(() => controller.abort(), timeout);
    const fetchOptions = {
        headers: (!!options && options.headers) || {},
        redirect: (!!options && options.followRedirects) ? `follow` : `error`,
        signal: controller.signal,
    };
    const fetchUrl = (!!options && options.proxyUrl) ? options.proxyUrl.concat(detectedUrl) : detectedUrl;
    const response = await fetch(fetchUrl, fetchOptions).catch((e) => {
        if (e.name === "AbortError") {
            throw new Error("Request timeout");
        }
        throw e;
    });
    clearTimeout(timeoutCounter);
    return response;
}
async function parseLD(parsed, response, options) {
    const { ld } = parsed;
    const ldMain = [];
    const ldAdditional = [];
    if (!ld || !ld.length) {
        return parsed;
    }
    const LD = await jsonld.compact(ld, defaultContext);
    if (!LD || !LD['@graph']) {
        return parsed;
    }
    for (const item of LD['@graph']) {
        const main = item['schema:mainEntityOfPage'];
        const target = !!main && !!(toArray(main)).filter((u) => u.id === response.url).length ?
            ldMain : ldAdditional;
        target.push(item);
    }
    parsed.ld = ldAdditional;
    /*
      console.log(JSON.stringify(ldMain));
      console.log('//');
      console.log(ldAdditional);
    */
    parsed = Object.assign(Object.assign(Object.assign({}, parsed), (!!ldMain.length ? (ldMain[0] || {}) : {})), { type: parsed.type });
    for (const item of ldMain) {
        if (typeof item !== 'object') {
            continue;
        }
        const _ = (key, cur = item) => {
            if (cur.hasOwnProperty(`schema:${key}`)) {
                const o = cur[`schema:${key}`];
                if (typeof o === 'string' || o.hasOwnProperty('@type')) {
                    return o;
                }
                return o.hasOwnProperty('@value') ?
                    cur[`schema:${key}`]['@value'] : (cur[`schema:${key}`].hasOwnProperty('id') ?
                    cur[`schema:${key}`]['id'] : cur[`schema:${key}`]);
            }
        };
        const types = toArray(item.type);
        parsed.type = Array.from(new Set(parsed.type.concat(types).filter((v) => !!v)));
        if (!!item.image) {
            parsed.image = toArray(item.image);
        }
        else {
            const toLink = (type) => ((image) => {
                if (typeof image === 'string') {
                    return { type: ['Link'], href: image, rel: [`schema:${type}`] };
                }
                else if (typeof image === 'object') {
                    const href = _('contentUrl', image) || _('url', image) || image.href;
                    const o = !!href && { type: ['Link'], href: image, rel: [`schema:${type}`] };
                    if (!!o && _('width', image)) {
                        o.height = _('width', image);
                    }
                    if (!!o && _('height', image)) {
                        o.height = _('height', image);
                    }
                    if (!!o && _('encodingFormat', image)) {
                        o.mediaType = _('encodingFormat', image);
                    }
                    return Object.assign(Object.assign({}, image), o);
                }
            });
            const [img, thumb] = [_('image').map(toLink('image')), _('thumbnailUrl').map(toLink('thumbnailUrl'))];
            const images = (!!img && !!img.length ? img : []).concat(!!thumb && !!thumb.length ? thumb : []);
            parsed.image = Array.from(new Set((parsed.image || []).concat(images)));
        }
        if (!!item.name) {
            parsed.name = toArray(item.name);
        }
        else if (!!_('headline')) {
            parsed.name = toArray(_('headline'));
        }
        if (!!_('alternativeHeadline')) {
            parsed.name = (parsed.name || []).concat(toArray(_('headline')));
        }
        if (!!_('dateline')) {
            parsed.name = (parsed.name || []).concat(toArray(_('dateline')));
        }
        const backstory = _('backstory');
        if (!!backstory && typeof backstory === 'string') {
            parsed.name = (parsed.name || []).concat(toArray(`backstory: ${backstory}`));
        }
        // TODO backstory in sub can be CreativeWork or Text !
        if (!!item.summary) {
            parsed.summary = toArray(item.summary);
        }
        else if (!parsed.summary) {
            parsed.summary = _('abstract') || _('description') || _('text') || '';
        }
        if (!!item.content) {
            parsed.content = toArray(item.content);
        }
        else if (!!_('articleBody')) {
            item.content = _('articleBody');
            types.push('Article');
        }
        if (Array.isArray(_('keywords'))) {
            parsed.tag = (parsed.tag || []).concat(_('keywords')).filter((v) => !!v && typeof v === 'string');
        }
        // as: well known, functional corresponding
        const toAP = (asProperty, schemaProperty) => {
            const schemaValue = _(schemaProperty);
            if (!item[asProperty] && !schemaValue) {
                return;
            }
            parsed[asProperty] = !!item[asProperty] ? item[asProperty] : _(schemaProperty);
        };
        const convert = [
            ['published', 'datePublished'], ['updated', 'dateModified'],
            ['startTime', 'startDate'], ['endTime', 'endDate'], ['duration', 'duration']
        ];
        convert.forEach((a) => toAP(...a));
        const geo = _('geo');
        ['latitude', 'longitude', ['elevation', 'altitude']].forEach((key) => {
            const [schemaKey, asKey] = typeof key === 'string' ? [key, key] : key;
            if (!!item[asKey]) {
                parsed[asKey] = toArray(item[asKey]);
            }
            else if (!!geo) {
                const geoValue = _(schemaKey, geo);
                if (!!geoValue) {
                    parsed[asKey] = toArray(geoValue);
                }
            }
            if (!parsed[asKey] && !!_(schemaKey)) {
                parsed[asKey] = _(schemaKey);
            }
        });
        const lastUrl = !!parsed.url && !!parsed.url.length && parsed.url[parsed.url.length - 1];
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
function toArray(x) { return !Array.isArray(x) ? [x] : x; }
/**
 * Parses the text, extracts the first link it finds and does a HTTP request
 * to fetch the website content, afterwards it tries to parse the internal HTML
 * and extract the information via meta tags
 * @param text string, text to be parsed
 * @param options LinkPreviewOptions
 */
async function getLinkPreview(text, options) {
    if (!text || typeof text !== `string`) {
        return null;
    }
    const response = await handleFetch(text, options);
    const headers = {};
    response.headers.forEach((header, key) => {
        headers[key] = header;
    });
    const normalizedResponse = {
        url: (!!options && options.proxyUrl)
            ? response.url.replace(options.proxyUrl, ``)
            : response.url,
        headers,
        data: await response.text(),
    };
    const parsed = await getPreviewFromResponse(normalizedResponse, options);
    return parsed;
}
/**
 * Skip the library fetching the website for you, instead pass a response object
 * from whatever source you get and use the internal parsing of the HTML to return
 * the necessary information
 * @param response Preview Response
 * @param options IPreviewLinkOptions
 */
async function getPreviewFromResponse(response, options) {
    if (!response || typeof response !== `object` || !response.url) {
        return null;
    }
    const parsedResponse = parseResponse(response, options);
    if (!parsedResponse || !parsedResponse.hasOwnProperty('ld')) {
        return parsedResponse;
    }
    const parsed = await parseLD(parsedResponse, response, options);
    return parsed;
}





const test = 'https://www.spiegel.de/ausland/republikaner-mitch-mcconell-kritisiert-eigene'+
'-partei-fuer-umgang-mit-kapitol-attacke-a-6cd2b361-aa97-4f42-9e67-4df3397f5036';

getLinkPreview(test).then((t) => console.log( JSON.stringify(t) ));
