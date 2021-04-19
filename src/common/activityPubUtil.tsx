import { tsx } from '@dojo/framework/core/vdom';
import {
	ActivityPubActors, ActivityPubActivities, ActivityPubObjects, ActivityPubLinks
} from './activityPub';
import {
	RedaktorActor, ActivityPubActor, ActivityPubActivity, ActivityPubObject,
	ActivityPubObjectNormalized, ActivityPubLinkObject, LangMap
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

export const isActivity = (o: any): o is ActivityPubActivity => !!o && isIn(o, ActivityPubActivities);
export const isObject = (o: any): o is ActivityPubObject => !!o && isIn(o, ActivityPubObjects);
export const isActor = (o: any): o is RedaktorActor => !!o && isIn(o, ActivityPubActors);
export const isLink = (o: any): o is ActivityPubLinkObject => typeof o === 'string' || (!!o && isIn(o, ActivityPubLinks));
export const isLinkOrImage = (o: any) => !!o && (isLink(o) || (isAP(o, 'Image') && o.url));
export const isCollection = (o: any) => !!o && (isAP(o, 'Collection') || isAP(o, 'OrderedCollection'));
export const isCollectionPage = (o: any) => !!o && (isAP(o, 'CollectionPage') || isAP(o, 'OrderedCollectionPage'));
export const isCaption = (s:any, o:any) => (!!s && (typeof s === 'string'||Array.isArray(s))) || typeof o === 'object';
export const isDatetime = (s: any) => (!!s && typeof s === 'string') && dateTimeR.test(s);
export const isDuration = (s: any) => (!!s && typeof s === 'string') && durationR.test(s);
export const isPosInteger = (n: any) => (typeof n === 'number' && is(n, 'integer') && n >= 0);

type APall = ActivityPubActivity|ActivityPubActor|ActivityPubObject|ActivityPubLinkObject;
export function getActorName({ petName: pet, preferredUsername: p, name: n, id }: RedaktorActor): string[] {
	if (pet && typeof pet === 'string') { return [pet] }
	if (p && typeof p === 'string') { return [p] }
	return Array.isArray(n) ? n : (typeof n === 'string' ? [n] : (id ? [id] : ['']));
}

function toArray(v: any) {
	return Array.isArray(v) ? JSON.parse(JSON.stringify(v)) : [v];
}

export function clampStrings(s: string | string[], length: number) {
  if (typeof s === 'string') { s = [s] }
  const splitEvery = (n: number, xs: any[], y: any[] = []): any[] =>
    xs.length===0 ? y : splitEvery(n, xs.slice(n), y.concat([xs.slice(0, n)]));
  return s.reduce((a: any[], _s) => {
    const _a = realCharacters(_s);
    if (_a.length <= length) { return a.concat([_s]) }
    return a.concat(splitEvery(length, _a).map((r, i) => {
			const ellipsis = [
				!!i ? <pre classes={asCSS.ellipsis}>[…] </pre> : '',
				!!i ? '' : <pre classes={asCSS.ellipsis}> […]</pre>
			];
			return <virtual>
				{ellipsis[0]}
				{r.join('')}
				{ellipsis[1]}
			</virtual>
		}));
/*
		<virtual>
			{`${!!i ? {<pre classes={asCSS.ellipsis}>[…] </pre>} : ''}${r.join('')}${!!i ? '' : <pre classes={asCSS.ellipsis}> […]</pre>}`}
		</virtual>))
		*/
  }, [])
}

export function normalizeActivityPub(ap: APall, language?: string, includeBcc: boolean = false): ActivityPubObjectNormalized {
	/* TODO

  "@context": "https://www.w3.org/ns/activitystreams"

	hreflang Value must be a [BCP47] Language-Tag.
	*/

	if (typeof ap === 'string') { return ap }
	if (typeof ap === 'object' && !ap.type) { ap.type = 'Create' }
	const userLang = typeof language === 'string' ? language :
		(new Intl.DateTimeFormat().resolvedOptions().locale ||
			global.navigator.language ||
			global.navigator.userLanguage ||
			false
		);

	const langMap = (langMap: LangMap | LangMap[]): string[] => {
		const a = toArray(langMap);
		return a.map((_o: any) => {
			let uLang = userLang;
			if (!uLang) {
				/* The special language tag "und" can be used within the object form to
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

	// TODO id
	/*
		inbox?: ActivityPubOrderedCollection;
		outbox?: ActivityPubOrderedCollection;

		href?: string;
		hreflang?: string;
	}
	*/
	if (Array.isArray(url)) {
		o.url = url.filter(isLink)
	} else if (isLink(url)) {
		o.url = toArray(url)
	}
	if (Array.isArray(icon)) {
		o.icon = icon.filter(isLinkOrImage)
	} else if (isLinkOrImage(icon)) {
		o.icon = toArray(icon)
	}
	if (Array.isArray(image)) {
		o.image = image.filter(isLinkOrImage)
	} else if (isLinkOrImage(image)) {
		o.image = toArray(image)
	}
	if (typeof mediaType === 'string') { o.mediaType = mediaType }

	if (isCaption(name, nameMap)) { o.name = !!nameMap ? toArray(langMap(nameMap)) : toArray(name) }
	if (isCaption(summary, summaryMap)) { o.summary = toArray(summaryMap ? langMap(summaryMap) : summary) }
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
		(o as ActivityPubObject).replies = replies
	}

	if (isObject(ap)) {
		if (isAP(ap, 'Place')) {
			if (typeof accuracy === 'number' && accuracy >= 0 && accuracy <= 100) {
				(o as ActivityPubObject).accuracy = accuracy
			}
			if (typeof radius === 'number' && radius >= 0) {
				(o as ActivityPubObject).radius = radius
			}
			if (typeof altitude === 'number') { (o as ActivityPubObject).altitude = altitude }
			if (typeof latitude === 'number') { (o as ActivityPubObject).latitude = latitude }
			if (typeof longitude === 'number') { (o as ActivityPubObject).longitude = longitude }
			if (isLink(units) /* string too */ ) { (o as any).units = units }
		}

		if (isCollection(ap) || isCollectionPage(ap)) {
			if (isCollectionPage(current) || isLink(current)) {
				(o as ActivityPubObject).current = current
			}
			if (isCollectionPage(first) || isLink(first)) {
				(o as ActivityPubObject).first = first
			}
			if (isCollectionPage(last) || isLink(last)) {
				(o as ActivityPubObject).last = last
			}
			if (isCollection(items)) { (o as ActivityPubObject).items = items }
			if (isPosInteger(totalItems)) { (o as ActivityPubObject).totalItems = totalItems }
			if (isAP(ap, 'OrderedCollection') && isPosInteger(startIndex)) {
				(o as ActivityPubObject).startIndex = startIndex
			}
		}

		if (isCollectionPage(ap)) {
			if (isCollectionPage(next) || isLink(next)) {
				(o as ActivityPubObject).next = next
			}
			if (isCollectionPage(prev) || isLink(prev)) {
				(o as ActivityPubObject).prev = prev
			}
			if (isCollection(partOf) || isLink(partOf)) {
				(o as ActivityPubObject).partOf = partOf
			}
		}
	}
	if (isLink(ap)) {
		if (!!href && typeof href === 'string') {
			(o as ActivityPubLinkObject).href = href
		}
		if (!!hreflang && typeof hreflang === 'string') {
			(o as ActivityPubLinkObject).hreflang = hreflang
		}
		if (!!rel && typeof rel === 'string') {
			(o as ActivityPubLinkObject).rel = toArray(rel);
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
					_Aap[key].map((_o:any) => normalizeActivityPub(_o, language)) :
					toArray(normalizeActivityPub(_Aap[key], language));
			} else if (key === 'actor' && isLink(_Aap[key])) {
				(o as ActivityPubActivity).actor = toArray(_Aap[key]);
			} else if (key === 'closed' && (typeof _Aap[key] === 'boolean' || isDatetime(_Aap[key]))) {
				(o as ActivityPubActivity).closed = _Aap[key]
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
				_ap[key].map((o:any) => normalizeActivityPub(o, language)) :
				toArray(normalizeActivityPub(_ap[key], language));
		}
	}
	return o
}
