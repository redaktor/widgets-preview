import { tsx, create } from '@dojo/framework/core/vdom';
import {
	ActivityPubActors, ActivityPubActivities, ActivityPubObjects, ActivityPubLinks
} from '../common/activityPub';
import {
	ActivityPubActivity, RedaktorActor, ActivityPubObject, LangMap
} from '../common/interfaces';
import { normalizeActivityPub } from '../common/activityPubUtil';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { lowerCase } from '../framework/String/case';
import { RGB, bestTextColor } from '../framework/color';
import Profile from './profile';
import Icon from '../icon';
import Details from '../details';
import Button from '../button';
// import * as ui from '../theme/material/_ui.m.css';
// import * as colors from '../theme/material/_color.m.css';
// import * as iconCss from '../theme/material/icon.m.css';
import * as css from '../theme/material/card.m.css';
import theme from '../middleware/theme';

/*
TODO
image
https://codepen.io/marlenesco/pen/NqOozj

activities card
- announced
- ignored


READ Button as ALTERNATIVE to actionButtons [has read Article ?]

event shows summary of published and places
	can show Offers / 'tickets' or Questions / 'are you going?'

place shows map btn as 'byline' and evtl. publisheds (opening hours)
	check in ???

lazy load +
video, audio
question, poll

// TODO buttons:
was it shared/liked by me ?
shared/liked by anyone ?
*/

/* Limits

Mastodon
post 500
profile desc 500
profile name 30

Pixelfed
post 500
profile desc 125
profile name 30

Peertube
profile desc 120
tags 30

FB
Facebook post character limit: 63,206 characters
Facebook username character limit: 50 characters
Facebook Page Description: 155 Characters
Facebook Comments: 8,000 Characters
TW
Twitter tweet character limit: 280 characters
Twitter DMs: 10,000 characters
Twitter Handle maximum length: 15 characters
Twitter profile name maximum length: 20
IN
Instagram caption character limit: 2,200 characters - 125/read more
Instagram hashtag limit: 30 hashtags
Instagram bio character limit: 150 characters
Instagram username character limit: 30 characters
LI
LinkedIn Company update: 700 characters
Company name: 100 characters
About us/Summary: 2,000 characters
Page name: 50 characters
Company leaders headline: 150 characters
Company leaders description: 150 characters
Employee testimonials: 400 characters
Custom module title: 150 characters
Custom module body: 500 characters
Custom module URL label: 70 characters
First name: 20 characters
Last name: 40 characters
Recommendation: 3,000 characters
LinkedIn Publishing post headline: 150 characters
LinkedIn Publishing content length: ~120,000 characters *
PI
Pinterest Pin description: 500 characters
Pinterest Bio	160 Characters
YT
Video title: 70 characters
YouTube description: 5,000 characters
Playlist titles: 60 characters
YouTube tags: 30 characters per tag, 500 characters total
*/


/* ACTIVITY
actor, object, instrument, origin, result, target


instrument
Identifies one or more objects used (or to be used) in the completion of an Activity.

result
Describes the result of the activity. For instance, if a particular action results in the creation
of a new resource, the result property can be used to describe that new resource.

*/

interface ColoredItem {
	name?: string;
	color?: RGB;
}
const IconTypes = {
	private: 1,
	group: 1,
	public: 1
};
type IconType = (keyof typeof ActivityPubActivities | keyof typeof IconTypes);


export interface CardProperties extends ActivityPubActivity {
	onAction?: () => void;
	responsiveTypo?: boolean /* default true */;
	mediaBaselined?: boolean /* default true */;
	mediaSrc?: string; /* TODO mediaSrcset */
	mediaType?: string;
	mediaName?: string;
	mediaNameMap?: LangMap;
	aspectRatio?: '1:1' | '3:2' | '16:9' | '4:1';

	language?: string;
	kicker?: string;
	byline?: string;
	bookmark?: boolean | ColoredItem;
	topic?: boolean | ColoredItem;
	privacy?: IconType;

	actor?: RedaktorActor;

	activity?: string;


}
export interface CardChildren {
	header?: RenderResult;
	content?: RenderResult;
	actionButtons?: RenderResult;
	actionIcons?: RenderResult;
}

const factory = create({ theme })
	.properties<CardProperties>()
	.children<CardChildren | undefined>();

/*
TODO popup
	{handle ? <span classes={themedCss.handle}>{handle}</span> : ''}
*/

export const Card = factory(function Card({ children, properties, middleware: { theme } }) {
	const themedCss = theme.classes(css);
	const aspectRatios: any = {
		'16:9': themedCss.m16by9,
		'3:2': themedCss.m3by2,
		'4:1': themedCss.m4by1,
		'1:1': themedCss.m1by1
	}
// console.log(properties(), normalizeActivityPub(properties()));
	const {
		actor = ({} as RedaktorActor),
		object: o = ({} as ActivityPubObject),
		/* ... UI */
		bookmark: b = false,
		topic: t = false,
		mediaName: mn,
		aspectRatio: ar = '16:9',
		privacy = 'private',
		onAction,
		responsiveTypo = true,
		mediaBaselined = true,
		mediaSrc,
		mediaNameMap,
		kicker,
		byline,
		/* ActivityPub generic properties */
		...activity
	} = normalizeActivityPub(properties());

	// TODO i18n
	/* Activity */
	const { type: verb = 'Announce', published = 'just now' } = activity;
	const _irreg: any = {leave:'left', read:'read', activity:'did', question:'asked'};
	const _verb = lowerCase(Array.isArray(verb) ? verb[0] : verb);
	const cssVerb = _verb === 'delete' ? '_delete' : _verb;
	const past = !_verb ? '•' : _irreg.hasOwnProperty(_verb) ? _irreg[_verb] : (
		_verb.charAt(_verb.length-1) === 'e' ? `${_verb}d` : `${_verb}ed`
	);
	/* Object */
	let {
		type = 'Note',
		source,
		location,
		name,
		summary: s,
		content: c,
		...objectRest
	} = o as ActivityPubObject;

	let { header, content: cContent, actionButtons, actionIcons } =
		children()[0] || ({} as CardChildren);
console.log(name, s, c, cContent, objectRest);
/* TODO MULTIPLE ALLOVER FIXME */
	const majorType = Array.isArray(type) ? type[0] : type;
	const cssType = lowerCase(majorType);
	const typeArticle = ({a:1,e:1,i:1,u:1}).hasOwnProperty(cssType.charAt(0)) ? 'an' : 'a';

	const multiline = (s?: string, isSummary = false) => !s ? (void 0) : (
		<p
			classes={
				!responsiveTypo ? themedCss.defaultTypo : (
					cssType === 'note' && isSummary ?
						themedCss.responsiveTypoSmall : themedCss.responsiveTypo
				)
			}
		>
			{s.split('\n').map((item) => (
				<virtual>
					{item}
					<br />
				</virtual>
			))}
		</p>
	);


	const summary = multiline(Array.isArray(s) ? s[0] : s, true) || '';
	const content = !cContent && c ? (multiline(Array.isArray(c) ? c[0] : c) || '') : cContent;

	/* TODO e.g. Document -> Note */
	const bookmark: ColoredItem|null = b === true ? { name: '', color: [255,122,0] } :
		(typeof b === 'object' 	? { ...{ name: '', color: [255,122,0] }, ...b } : null);
	const topic: ColoredItem|null = t === true ? { name: '', color: [109,167,209] } :
		(typeof t === 'object' ? { ...{ name: '', color: [109,167,209] }, ...t } : null);


	const mediaName = ''; // TODO was: mediaNameMap ? langMap(mediaNameMap) : mn;


	const privClass = !privacy || typeof privacy !== 'string' ? null :
		(privacy === 'public' ? themedCss.publicPost :
		(privacy === 'group' ? themedCss.groupPost : themedCss.privatePost));

	const aspectRatioClass = cssType === 'audio' ? themedCss.m1by1 :
		(aspectRatios[ar] ? aspectRatios[ar] : themedCss.m16by9);

	const titleClass = { image: 1, audio: 1, video: 1, chat: 1 }.hasOwnProperty(cssType) ?
		(!responsiveTypo ? themedCss.defaultTypo : themedCss.responsiveTypo) :
			(cssType === 'note' ? themedCss.smallTitle : themedCss.largeTitle);


	const renderObject = () => {
		console.log(summary, cContent, content)
		return <div classes={[
		themedCss.object,
		(themedCss as any)[cssType],
		// TODO
		// ActivityPubActivities.hasOwnProperty(majorType) ? (themedCss as any)[cssType] : null,
		summary && (cContent || content) ? themedCss.hasMore : null,
		mediaSrc ? themedCss.hasMedia : null,
		bookmark ? themedCss.hasBookmark : null,
		topic ? themedCss.hasTopics : null
	]}>
		{mediaSrc && (
			<div
				title={mediaName}
				classes={[
					themedCss.media,
					mediaBaselined ? themedCss.baselined : null,
					aspectRatioClass
				]}
				styles={{
					backgroundImage: `url("${mediaSrc}")`
				}}
			/>
		)}
		{bookmark && bookmark.color && (
			<div
				classes={themedCss.bookmark}
				style={`--bg: rgb(${bookmark.color.join(',')}); --c:${bestTextColor(bookmark.color)};`}
			>
				{bookmark.name}
			</div>
		)}
		{topic && topic.color && (
			<div
				classes={themedCss.topic}
				style={`--bg: rgb(${topic.color.join(',')}); --c:${bestTextColor(topic.color)};`}
			>
				{topic.name || '•'}
			</div>
		)}
		{header && (
			<div key="header" classes={themedCss.header}>
				{header}
			</div>
		)}

		{o.attributedTo && <Profile { ...{...o.attributedTo} } /> }
		{o.published && <h3 classes={themedCss.acted}>{o.published}</h3>}

		{(kicker || byline) && (
			<header classes={themedCss.titleWrapper}>
				{kicker && <p classes={themedCss.kicker}>{kicker}</p>}
				{name && <h2 classes={[themedCss.title, titleClass]}>{name}</h2>}
				{byline && <p classes={themedCss.byline}>{byline}</p>}
			</header>
		)}
		{!kicker && !byline && name && (
			<div classes={themedCss.titleWrapper}>
				{name && <h2 classes={[themedCss.title, titleClass]}>{name}</h2>}
			</div>
		)}
		<div
			key="content"
			classes={[themedCss.contentWrapper /*, onAction ? themedCss.primary : null*/]}
			onClick={() => onAction && onAction()}
		>
			{summary && (
				<div
					classes={[
						themedCss.content,
						cssType === 'article' ? themedCss.serif : null
					]}
				>
					{summary}
				</div>
			)}
			{!summary && (cContent || content) && <div classes={themedCss.content}>
				{(cContent || content)}
			</div>}
		</div>
		{cssType !== 'article' && summary && (cContent || content) && (
			<Details summary="read more">
				<div classes={[themedCss.contentWrapper]}>{(cContent || content)}</div>
			</Details>
		)}

		{cssType === 'article' && summary && content && (
			<Button
				classes={{
					'@dojo/widgets/button': { root: [themedCss.activityBtn] }
				}}
				size="xl"
				spaced={false}
				variant="flat"
				depth={2}
			>
				Read
			</Button>
		)}

		{(actionButtons || actionIcons) && (
			<div key="actions" classes={themedCss.actionWrapper}>
				{actionButtons && <div classes={themedCss.actionButtons}>{actionButtons}</div>}
				{actionIcons && <div classes={themedCss.actionIcons}>{actionIcons}</div>}
			</div>
		)}
	</div>}



	return (
		<div
			key="root"
			classes={[
				themedCss.root,
				theme.variant(),
				privClass
			]}
		>
			<div classes={[
				themedCss.activity,
				(themedCss as any)[cssVerb]
			]}>
				{actor && <Profile { ...{...actor, published} } />}
				{published &&
					<h3 classes={themedCss.acted}>
						{past} {typeArticle} {majorType} {'•'} {published} {' '}
						<span classes={themedCss.verbIcon}><Icon size="xxl" type={cssVerb as any} /></span>

					</h3>
				}
				{privacy &&
					<span classes={themedCss.privacyIcon}><Icon size="xxl" type={privacy as any} /></span>
				}
			</div>
			{renderObject()}
		</div>
	);
});

export default Card;
/*
<div classes={themedCss.bookmark} />
<div classes={themedCss.topic}>topic</div>
*/
