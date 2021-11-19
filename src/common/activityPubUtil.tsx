import { tsx } from '@dojo/framework/core/vdom';
import { AsTypes } from './interfaces';
import { as, vocab } from '../_ld';
import { defaultContext } from '../_ld/as';
const jsonld = require('jsonld/dist/jsonld.esm.min.js');
/*
name	Text
The name of the item.
about	Thing
The subject matter of the content.
abstract	Text
An abstract is a short description that summarizes a CreativeWork.

---

disambiguatingDescription Text
A sub property of description.
A short description of the item used to disambiguate from other, similar items.

description	Text
A description of the item.

image
An image of the item. This can be a URL or a fully described ImageObject.

about / subjectOf

---

DOCUMENT

PLACE
'Accommodation'|'AdministrativeArea'|'CivicStructure'|'Landform'|
'LandmarksOrHistoricalBuildings'|'LocalBusiness'|'Residence'|
'TouristAttraction'|'TouristDestination'

logo ImageObject or URL
An associated logo.

photo ImageObject or Photograph
A photograph of this place. Supersedes photos

--- CreativeWork

ARTICLE


NOTE --> 'SocialMediaPosting'|'DiscussionForumPosting'
AUDIO --> AudioObject
IMAGE --> ImageObject / Barcode
VIDEO --> VideoObject / MusicVideoObject
PAGE --> SEE FULL WebPage


Object: `{gender, select,
	female {{host} invites {guest} to her party},
  male {{host} invites {guest} to his party},
	neutral {{host} invites {guest} to his party},
  gendered {{host} invites {guest} to their party}
}


{
	Object: [''],
	Link: [],
	Activity: [],
	IntransitiveActivity: [],
	Collection: [],
	OrderedCollection',
	'CollectionPage: [],
	OrderedCollectionPage: [],
	Relationship: [],
	Article: [],
	Document: [],
	Audio: [],
	Image: [],
	Video: [],
	Note: [],
	Page: [],
	Event: [],
	Place: [],
	Mention: [],
	Profile: [],
	Tombstone: [],
	Accept: [],
	TentativeAccept: [],
	Add: [],
	Arrive: [],
	Create: [],
	Delete: [],
	Follow: [],
	Ignore: [],
	Join: [],
	Leave: [],
	Like: [],
	Offer: [],
	Invite: [],
	Reject: [],
	TentativeReject: [],
	Remove: [],
	Undo: [],
	Update: [],
	View: [],
	Listen: [],
	Read: [],
	Move: [],
	Travel: [],
	Announce: [],
	Block: [],
	Flag: [],
	Dislike: [],
	Question: [],
	Application: [],
	Group: [],
	Organization: [],
	Person: [],
	Service: []
}

Person
die Person


Bild
NOM
das Bild
ein Bild
GEN
des Bilds
eines Bilds
DAT
dem Bild
einem Bild
AKK
das Bild
ein Bild

*/
type LDTypeSuggestions = {
	[K in AsTypes]?: {
		equivalent: string;
		subTypes: (string|{[subType: string]: string[]})[];
		related: (string|{[subType: string]: string[]})[];
	};
};
export const beSpecific: LDTypeSuggestions = {
	Object: {
		equivalent: 'schema:Thing',
		subTypes: [],
		related: []
	},
	Document: {
		equivalent: 'schema:Thing',
		subTypes: [],
		related: []
	},

	Article: {
		equivalent: 'schema:Article',
		subTypes: [
			'schema:AdvertiserContentArticle',
			'schema:NewsArticle',
			'schema:Report',
			'schema:SatiricalArticle',
			{'schema:ScholarlyArticle': ['schema:MedicalScholarlyArticle']},
			{'schema:TechArticle': ['schema:APIReference']},
		],
		related: []
	},
	Audio: {
		equivalent: 'schema:AudioObject',
		subTypes: [],
		related: [
			{'schema:Clip': ['schema:RadioClip']}
		]
	},
	Event: {
		equivalent: 'schema:Event',
		subTypes: [
			'schema:BusinessEvent',
			'schema:ChildrensEvent',
			'schema:ComedyEvent',
			'schema:CourseInstance',
			'schema:DanceEvent',
			'schema:DeliveryEvent',
			'schema:EducationEvent',
			'schema:EventSeries',
			'schema:ExhibitionEvent',
			'schema:Festival',
			'schema:FoodEvent',
			'schema:Hackathon',
			'schema:LiteraryEvent',
			'schema:MusicEvent',
			{'schema:PublicationEvent': ['schema:BroadcastEvent', 'schema:OnDemandEvent']},
			'schema:SaleEvent',
			'schema:ScreeningEvent',
			'schema:SocialEvent',
			'schema:SportsEvent',
			'schema:TheaterEvent',
			'schema:VisualArtsEvent'
			// TODO : schema:UserInteraction
		],
		related: []
	},
	Image: {
		equivalent: 'schema:ImageObject',
		subTypes: ['schema:Barcode'],
		related: []
	},
	Note: {
		equivalent: 'schema:SocialMediaPosting',
		subTypes: ['schema:BlogPosting', 'schema:DiscussionForumPosting'],
		related: []
	},
	Page: {
		equivalent: 'schema:WebPage',
		subTypes: [
			'schema:AboutPage','schema:CheckoutPage','schema:CollectionPage',
			'schema:ContactPage','schema:FAQPage','schema:ItemPage','schema:MedicalWebPage',
			'schema:ProfilePage','schema:QAPage','schema:RealEstateListing','schema:SearchResultsPage'
		],
		related: []
	},
	Video: {
		equivalent: 'schema:VideoObject',
		subTypes: [],
		related: [
			'schema:MusicVideoObject',
			{'schema:Clip': ['schema:MovieClip', 'schema:TVClip','schema:VideoGameClip']}

		]
	},
	Place: {
		equivalent: 'schema:Place',
		subTypes: [
			'schema:Accommodation','schema:AdministrativeArea','schema:CivicStructure',
			'schema:Landform','schema:LandmarksOrHistoricalBuildings','schema:LocalBusiness',
			'schema:Residence','schema:TouristAttraction','schema:TouristDestination'
		],
		related: []
	},
	Profile: {
		equivalent: 'schema:ProfilePage',
		subTypes: [],
		related: []
	},
	Relationship: {
		equivalent: 'schema:',
		subTypes: [],
		related: []
	},
	Link: {
		equivalent: 'schema:',
		subTypes: [],
		related: []
	},
	Mention: {
		equivalent: 'schema:',
		subTypes: [],
		related: []
	},
	// 'Collection': {}, 'OrderedCollection': {}, 'CollectionPage': {}, 'OrderedCollectionPage',


};

export async function compact(doc: any) {
	if (typeof doc === 'string') {
		try {
			doc = JSON.parse(doc);
		} catch(e) {
			return {}
		}
	}
	let context: any;
	if (typeof doc === 'object' && !Array.isArray(doc)) {
		let { '@context': c = defaultContext } = doc;
		if (Array.isArray(c)) {
			c.push(vocab);
		} else if (!!c && typeof c === 'object') {
			c = {...c, ...vocab};
		} else if (!!c && typeof c === 'string') {
			if (c !== as) {
				c = [c, ...defaultContext]
			} else {
				c = defaultContext
			}
		}
		context = c;
	}
	const compacted = await jsonld.compact(doc, context);
	// console.log(compacted);
	return compacted
}

import {
	AsActors, AsActivities, AsObjects, AsLinks
} from './activityPub';
import {
	RedaktorActor, AsActor, AsActivity, AsObject,
	AsObjectNormalized, AsLinkObject, LangMap
} from './interfaces';
import global from '@dojo/framework/shim/global';
import is from '../framework/is';
import realCharacters from '../framework/String/split';
import dateTimeR from '../framework/String/regex/regexXSDdateTime';
import durationR from '../framework/String/regex/regexXSDduration';
import * as asCSS from '../theme/material/_as.m.css';

export const isAP = (o:any, type?:string) => {
	const hasType = (typeof o === 'object' && o.type && (typeof o.type === 'string' || Array.isArray(o.type)));
	if (!type) {
		return hasType
	} else {
		return (Array.isArray(o.type) && !!o.type.filter((t: string) => t === type).length ||
		o.type === type)
	}
}
export const isIn = (o: any, apTypes: any) => {
	// console.log(o);
	return ((Array.isArray(o.type) && !!o.type.filter((t: string) => apTypes.hasOwnProperty(t)).length) ||
		apTypes.hasOwnProperty(o.type));
}

export const isActivity = (o: any): o is AsActivity => !!o && isIn(o, AsActivities);
export const isObject = (o: any): o is AsObject => !!o && isIn(o, AsObjects);
export const isActor = (o: any): o is RedaktorActor => !!o && isIn(o, AsActors);
export const isLink = (o: any): o is AsLinkObject => typeof o === 'string' || (!!o && isIn(o, AsLinks));
export const isLinkOrImage = (o: any) => !!o && (isLink(o) || (isAP(o, 'Image') && o.url));
export const isCollection = (o: any) => !!o && (isAP(o, 'Collection') || isAP(o, 'OrderedCollection'));
export const isCollectionPage = (o: any) => !!o && (isAP(o, 'CollectionPage') || isAP(o, 'OrderedCollectionPage'));
export const isCaption = (s:any, o:any) => (!!s && (typeof s === 'string'||Array.isArray(s))) || typeof o === 'object';
export const isDatetime = (s: any) => (!!s && typeof s === 'string') && dateTimeR.test(s);
export const isDuration = (s: any) => (!!s && typeof s === 'string') && durationR.test(s);
export const isPosInteger = (n: any) => (typeof n === 'number' && is(n, 'integer') && n >= 0);

type APall = Partial<AsActivity|AsActor|AsObject|AsLinkObject>;
export function getActorName({ petName: pet, preferredUsername: p, name: n, id }: RedaktorActor): string[] {
	if (pet && typeof pet === 'string') { return [pet] }
	if (p && typeof p === 'string') { return [p] }
	return Array.isArray(n) ? n : (typeof n === 'string' ? [n] : (id ? [id] : ['']));
}

function toArray(v: any) {
	return Array.isArray(v) ? JSON.parse(JSON.stringify(v)) : [v];
}

export function clampStrings(s: string | string[], length: number, isWordLike = true) {
  if (typeof s === 'string') { s = [s] }
  const splitEvery = (n: number, xs: any[], y: any[] = []): any[] =>
    xs.length===0 ? y : splitEvery(n, xs.slice(n), y.concat([xs.slice(0, n)]));

  return s.reduce((a: any[], _s) => {
		_s = _s.trim();
    const _a = realCharacters(_s);
		if (!_a.length) { return a }
    if (_a.length <= length) { return a.concat([[_s]]) }

		let splitted = splitEvery(length, _a);
		if (isWordLike) {
			splitted = splitted.reduce((a, splits, i) => {
				if (splits[splits.length-1] !== ' ' && i < splitted.length-1) {
			  	const j = splitted[i+1].indexOf(' ');
			    splits = splits.concat(splitted[i+1].splice(j < 0 ? splitted[i+1].length-1 : j));
			  }
			  return a.concat([splits])
			}, []).filter((a: any[]) => !!a.length)
		}

    return a.concat(splitted.map((r, i) => {
			const ellipsis = [
				!!i ? <pre classes={asCSS.ellipsis}>[…] </pre> : '',
				!!i || splitted.length === 1 ? '' : <pre classes={asCSS.ellipsis}> […]</pre>
			];
			return [ellipsis[0], r.join(''), ellipsis[1]]
		}));
  }, [])
}

export function normalizeAs(ap: APall, language?: string, includeBcc: boolean = false): AsObjectNormalized {
	/* TODO

  default '@context'
	'https://www.w3.org/ns/activitystreams'

	hreflang Value must be a [BCP47] Language-Tag.
	*/

	if (typeof ap === 'string') { return ap }
	if (typeof ap === 'object' && !ap.type) { (ap as AsActivity).type = 'Create' }
	if (typeof ap !== 'object') { return {type: []} }
	const locales: string[] = [];
	const userLang = typeof language === 'string' ? language :
		(new Intl.DateTimeFormat().resolvedOptions().locale ||
			global.navigator.language ||
			global.navigator.userLanguage ||
			false
		);

	const langMap = (langMap: LangMap | LangMap[]): string[] => {
		const a = toArray(langMap);
		return a.map((_o: any) => {
			locales.push(...Object.keys(_o));
			let uLang = userLang;
			if (!uLang) {
				/* The special language tag 'und' can be used within the object form to
				explicitly identify a value whose language is unknown or undetermined. */
				uLang = _o.und ? 'und' : 'en';
			}
			return _o.hasOwnProperty(uLang) ? _o[uLang] :
				(_o.hasOwnProperty(uLang.split('-')[0]) ? _o[uLang.split('-')[0]] : _o[Object.keys(o)[0]]);
		})
	}

	const {
		id,
		type = 'Create',
		name = '',
		summary,
		source,
		content,
		nameMap,
		summaryMap,
		contentMap,
		sourceMap,
		url,
		// generic
		icon, image, mediaType,
		published, updated, attributedTo, generator, location,
		inReplyTo, audience, bcc, bto, cc, to,
		attachment, tag, preview, replies,
		// time based
		duration, startTime, endTime, height, width,
		// Place
		accuracy, altitude, latitude, longitude, radius, units,
		// Activity
		actor, object, instrument, origin, target, result,
		// Question
		oneOf, anyOf, closed,
		// Collection + OrderedCollection + CollectionPage + OrderedCollectionPage
		current, first, last, items, totalItems, startIndex,
		// CollectionPage + OrderedCollectionPage
		next, prev, partOf,
		// Link + Mention
		href, hreflang, rel,
		// Actor
		inbox, outbox, following, followers, liked, streams, preferredUsername, endpoints,
		// ... other properties
		...notAP
	} = ap;
 	let o: any = { id, type, ...notAP };

	/* TODO
	id
	HOW MANY multiple max. ?
	WHAT IF e.g. [' ', ' ' (repeat 20 times), 'A real text'] ?
	*/
	/*
		inbox?: AsOrderedCollection;
		outbox?: AsOrderedCollection;

		href?: string;
		hreflang?: string;
	}
	*/
	if (Array.isArray(type)) {
		o.type = type.filter((s: any) => typeof s === 'string' && !!s)
	} else if (typeof type === 'string' && !!type) {
		o.type = toArray(type)
	} else {
		o.type = ['Create']
	}

	if (Array.isArray(url)) {
		o.url = url.filter(isLink).map((_o:any) => normalizeAs(_o, language))
	} else if (isLink(url)) {
		o.url = toArray(url).map((_o:any) => normalizeAs(_o, language))
	}
	if (Array.isArray(icon)) {
		o.icon = icon.filter(isLinkOrImage).map((_o:any) => normalizeAs(_o, language))
	} else if (isLinkOrImage(icon)) {
		o.icon = toArray(icon).map((_o:any) => normalizeAs(_o, language))
	}
	if (Array.isArray(image)) {
		o.image = image.filter(isLinkOrImage).map((_o:any) => normalizeAs(_o, language))
	} else if (isLinkOrImage(image)) {
		o.image = toArray(image).map((_o:any) => normalizeAs(_o, language))
	}

	if (typeof mediaType === 'string') { o.mediaType = mediaType }

	if (isCaption(name, nameMap)) {
		if (!!nameMap) {
			o.name = toArray(langMap(nameMap));
			o.nameMap = nameMap;
		} else {
			o.name = toArray(name);
		}
	}
	if (isCaption(summary, summaryMap)) {
		o.summary = toArray(summaryMap ? langMap(summaryMap) : summary) }
	if (isCaption(content, contentMap)) { o.content = toArray(contentMap ? langMap(contentMap) : content) }
	if (isCaption(source, sourceMap)) { o.source = toArray(sourceMap ? langMap(sourceMap) : source) }
	if (isDatetime(published)) { o.published = published }
	if (isDatetime(updated)) { o.updated = updated }

	if (isDuration(duration)) { o.duration = duration }
	if (isDatetime(startTime)) { o.startTime = startTime }
	if (isDatetime(endTime)) { o.endTime = endTime }
	if (isPosInteger(height)) { o.height = height }
	if (isPosInteger(width)) { o.width = width }

	if (isCollection(replies)) {
		(o as AsObject).replies = replies
	}

	if (isObject(ap)) {
		if (isAP(ap, 'Place')) {
			if (typeof accuracy === 'number' && accuracy >= 0 && accuracy <= 100) {
				(o as AsObject).accuracy = accuracy
			}
			if (typeof radius === 'number' && radius >= 0) {
				(o as AsObject).radius = radius
			}
			if (typeof altitude === 'number') { (o as AsObject).altitude = altitude }
			if (typeof latitude === 'number') { (o as AsObject).latitude = latitude }
			if (typeof longitude === 'number') { (o as AsObject).longitude = longitude }
			if (isLink(units) /* string too */ ) { (o as any).units = units }
		}

		if (isCollection(ap) || isCollectionPage(ap)) {
			if (isCollectionPage(current) || isLink(current)) {
				(o as AsObject).current = current
			}
			if (isCollectionPage(first) || isLink(first)) {
				(o as AsObject).first = first
			}
			if (isCollectionPage(last) || isLink(last)) {
				(o as AsObject).last = last
			}
			if (isCollection(items)) { (o as AsObject).items = items }
			if (isPosInteger(totalItems)) { (o as AsObject).totalItems = totalItems }
			if (isAP(ap, 'OrderedCollection') && isPosInteger(startIndex)) {
				(o as AsObject).startIndex = startIndex
			}
		}

		if (isCollectionPage(ap)) {
			if (isCollectionPage(next) || isLink(next)) {
				(o as AsObject).next = next
			}
			if (isCollectionPage(prev) || isLink(prev)) {
				(o as AsObject).prev = prev
			}
			if (isCollection(partOf) || isLink(partOf)) {
				(o as AsObject).partOf = partOf
			}
		}
	}
	if (isLink(ap)) {
		if (!!href && typeof href === 'string') {
			(o as AsLinkObject).href = href
		}
		if (!!hreflang && typeof hreflang === 'string') {
			(o as AsLinkObject).hreflang = hreflang
		}
		if (!!rel && typeof rel === 'string') {
			(o as AsLinkObject).rel = toArray(rel);
		}
	}
	if (isActor(ap)) {
		if (isCollection(inbox)) { (o as any).inbox = inbox }
		if (isCollection(outbox)) { (o as any).outbox = outbox }
		if (isCollection(streams)) { (o as any).streams = streams }
		if (isLink(following)) { (o as any).following = following }
		if (isLink(followers)) { (o as any).followers = followers }
		if (isLink(liked)) { (o as any).liked = liked }
		if (typeof preferredUsername === 'string') { (o as any).preferredUsername = preferredUsername }
		if (typeof endpoints === 'object') {
			for (let key in endpoints) {
				if (isLink(endpoints[key])) {
					if (!(o as any).endpoints) { (o as any).endpoints = {} }
					(o as any).endpoints[key] = endpoints[key];
				}
			}
		}
	}
	if (isActivity(ap)) {
		const _Aap: any = {
			actor, object, instrument, origin, target, result, oneOf, anyOf, closed
		}
		/* TODO / NOTE origin and target are NOT marked Functional (can be multiple) [?] */
		const force: any = {
			object: {Add:1,Remove:1,Create:1,Update:1,Delete:1,Follow:1,Like:1,Block:1,Undo:1},
			target: {Add:1,Remove:1}
		}
		const intransitive: any = {Question:1,Travel:1,Arrive:1};

		for (let key in _Aap) {
			if (key === 'object') {
				const doForbid = typeof ap.type === 'string' ? !!intransitive[ap.type] :
					(Array.isArray(ap.type) ? !!ap.type.filter((t) => !!intransitive[t]).length : false);
				if (doForbid) { continue }
			}
			if (!!force[key]) {
				const doForceForType = typeof ap.type === 'string' ? !!force[key][ap.type] :
					(Array.isArray(ap.type) ? !!ap.type.filter((t) => !!force[key][t]).length : false);
				if (doForceForType && typeof ap[key] !== 'object' && typeof ap[key] !== 'string') {
					o[key] = [];
					continue;
				}
			}
			if (typeof _Aap[key] === 'object' || typeof _Aap[key] === 'string') {
				o[key] = Array.isArray(_Aap[key]) ?
					_Aap[key].map((_o:any) => normalizeAs(_o, language)) :
					toArray(normalizeAs(_Aap[key], language));
			} else if (key === 'actor' && isLink(_Aap[key])) {
				(o as AsActivity).actor = toArray(_Aap[key]);
			} else if (key === 'closed' && (typeof _Aap[key] === 'boolean' || isDatetime(_Aap[key]))) {
				(o as AsActivity).closed = _Aap[key]
			}
		}
		// console.log('ACTIVITY o', o);
	}


	const _ap: any = {
		attributedTo, generator, location,
		inReplyTo, audience, cc, to,
		attachment, tag, preview
	};
	if (includeBcc === true) {
		_ap.bcc = bcc;
		_ap.bto = bto;
	}
	for (let key in _ap) {
		if (typeof _ap[key] === 'object' || typeof _ap[key] === 'string') {
			o[key] = Array.isArray(_ap[key]) ?
				_ap[key].map((o:any) => normalizeAs(o, language)) :
				toArray(normalizeAs(_ap[key], language));
		}
	}
	o.locales = locales.filter((l,i) => (i === locales.indexOf(l))).map((value) => {
		const label = !!(Intl as any).DisplayNames && (
			new (Intl as any).DisplayNames([value], {type: 'language'}).of(value) ||
			new (Intl as any).DisplayNames(['en'], {type: 'language'}).of(value)
		) || value;
		return {label, value}
	})
	if (!!userLang && typeof userLang === 'string') {
		o.locale = userLang.split('-')[0];
	}
	return o
}
