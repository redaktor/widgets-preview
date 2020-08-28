import { tsx, create } from '@dojo/framework/core/vdom';
import global from '@dojo/framework/shim/global';
import { RenderResult } from '@dojo/framework/core/interfaces';
import Icon, { IconType as IType } from '../icon';
import Details from '../details';
import Button from '../button';
// import * as ui from '../theme/material/_ui.m.css';
// import * as colors from '../theme/material/_color.m.css';

// import * as iconCss from '../theme/material/icon.m.css';
import * as css from '../theme/material/card.m.css';
import theme from '../middleware/theme';

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
interface ColoredItem {
	name?: string;
	color?: string;
}
interface LangMap {
	[iso: string]: string;
}
const ApTypes = {
	note: 1,
	article: 1,
	image: 1,
	audio: 1,
	video: 1,
	event: 1,
	place: 1,
	chat: 1,
	page: 1,
	redaktor: 1,
	terminal: 1,
	map: 1
};
const IconTypes = {
	private: 1,
	group: 1,
	public: 1
};
type IconType = (keyof typeof ApTypes | keyof typeof IconTypes) & IType;

export interface CardProperties {
	onAction?: () => void;
	responsiveTypo?: boolean;

	language?: string;
	aspectRatio?: '1:1' | '3:2' | '16:9' | '4:1';
	mediaBaselined?: boolean /* true */;
	mediaSrc?: string /* TODO mediaSrcset */;
	mediaName?: string;
	mediaNameMap?: LangMap;
	kicker?: string;
	byline?: string;
	name?: string;
	nameMap?: LangMap;
	summary?: string;
	summaryMap?: LangMap;
	bookmark?: boolean | ColoredItem;
	topic?: boolean | ColoredItem;
	type?: IconType | IconType[];
	privacy?: IconType;
	petName?: string;
	actorName?: string;
	handle?: string;
	activity?: string;
	time?: string;

	content?: string;
	contentMap?: LangMap;
}
export interface CardChildren {
	header?: RenderResult;
	avatar?: RenderResult;
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
	const userLang =
		global.navigator.language ||
		new Intl.DateTimeFormat().resolvedOptions().locale ||
		global.navigator.userLanguage ||
		'en';
	const themedCss = theme.classes(css);

	let {
		type = 'note',
		name: n = '',
		summary: s,
		content: c,
		bookmark: b = false,
		topic: t = false,
		privacy,
		mediaName
	} = properties();
	const {
		onAction,
		aspectRatio = '16:9',
		responsiveTypo = true,
		mediaBaselined = true,
		mediaSrc,
		mediaNameMap,
		kicker,
		byline,
		nameMap,
		summaryMap,
		contentMap,
		actorName,
		petName,
		handle,
		activity,
		time
	} = properties();
	let { header, avatar, content, actionButtons, actionIcons } =
		children()[0] || ({} as CardChildren);

	const majorType = Array.isArray(type) ? type[0] : type;
	const langMap = (o: LangMap): string =>
		o.hasOwnProperty(userLang)
			? o[userLang]
			: o.hasOwnProperty(userLang.split('-')[0])
			? o[userLang.split('-')[0]]
			: o[Object.keys(o)[0]];
	const multiline = (s?: string, isSummary = false) =>
		!s ? (
			void 0
		) : (
			<p
				classes={
					responsiveTypo
						? majorType === 'note' && isSummary
							? themedCss.responsiveTypoSmall
							: themedCss.responsiveTypo
						: themedCss.defaultTypo
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

	const name = nameMap ? langMap(nameMap) : n || '';
	const summary = multiline(summaryMap ? langMap(summaryMap) : s, true) || '';
	const bookmark =
		b === true
			? { name: '', color: 'var(--orange)' }
			: typeof b === 'object'
			? { ...{ name: '', color: 'var(--orange)' }, b }
			: false;
	const topic =
		t === true
			? { name: '', color: 'var(--orange)' }
			: typeof t === 'object'
			? { ...{ name: '', color: 'var(--orange)' }, t }
			: false;
	if (!content && c) {
		content = multiline(contentMap ? langMap(contentMap) : c) || '';
	}

	if (mediaNameMap) {
		mediaName = langMap(mediaNameMap);
	}

	const privacies: string | null =
		typeof privacy === 'string' && IconTypes.hasOwnProperty(privacy)
			? `${privacy as IconType}`
			: null;

	const titleClass = { note: 1, image: 1, audio: 1, video: 1, chat: 1 }.hasOwnProperty(majorType)
		? themedCss.smallTitle
		: themedCss.largeTitle;

	return (
		<div
			key="root"
			classes={[
				themedCss.root,
				theme.variant(),
				ApTypes.hasOwnProperty(majorType) ? (themedCss as any)[majorType] : null,
				!privacies
					? null
					: privacies === 'public'
					? themedCss.publicPost
					: privacies === 'group'
					? themedCss.groupPost
					: themedCss.privatePost,
				avatar ? themedCss.hasAvatar : null,
				summary && content ? themedCss.hasMore : null,
				mediaSrc ? themedCss.hasMedia : null,
				bookmark ? themedCss.hasBookmark : null,
				topic ? themedCss.hasTopics : null
			]}
		>
			{mediaSrc && (
				<div
					title={mediaName}
					classes={[
						themedCss.media,
						mediaBaselined ? themedCss.baselined : null,
						aspectRatio === '16:9'
							? themedCss.m16by9
							: aspectRatio === '3:2'
							? themedCss.m3by2
							: aspectRatio === '4:1'
							? themedCss.m4by1
							: aspectRatio === '1:1'
							? themedCss.m1by1
							: themedCss.m16by9
					]}
					styles={{
						backgroundImage: `url("${mediaSrc}")`
					}}
				/>
			)}
			{bookmark && (
				<div classes={themedCss.bookmark} style={`--c:${bookmark.color};`}>
					{bookmark.name}
				</div>
			)}
			{topic && (
				<div classes={themedCss.topic} style={`--c:${topic.color};`}>
					{topic.name || '.'}
				</div>
			)}
			{header && (
				<div key="header" classes={themedCss.header}>
					{header}
				</div>
			)}

			{(avatar || privacies || actorName || handle || activity || time) && (
				<div classes={[themedCss.statusWrapper, petName ? themedCss.wellKnown : null]}>
					{avatar && <span classes={themedCss.avatar}>{avatar}</span>}
					<div classes={themedCss.metaWrapper}>
						{petName && <h2 classes={themedCss.petname}>{petName}</h2>}
						{!petName && actorName && <h3 classes={themedCss.name}>{actorName}</h3>}
						{(handle || activity || time) && (
							<h3 classes={themedCss.time}>
								{activity ? ` ${activity} ` : ''}
								{activity && handle ? ' • ' : ' '}
								{handle ? ` ${handle} ` : ''}
								{handle && time ? ' • ' : ' '}
								{time ? time : ''}
							</h3>
						)}
					</div>
					{privacies && <Icon size="xxl" type={privacies as IconType} />}
				</div>
			)}

			{(kicker || byline) && (
				<header classes={themedCss.titleWrapper}>
					{kicker && <p classes={themedCss.kicker}>{kicker}</p>}
					{name && <h2 classes={titleClass}>{name}</h2>}
					{byline && <p classes={themedCss.byline}>{byline}</p>}
				</header>
			)}
			{!kicker && !byline && name && (
				<div classes={themedCss.titleWrapper}>
					{name && <h2 classes={titleClass}>{name}</h2>}
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
							majorType === 'article' ? themedCss.serif : null
						]}
					>
						{summary}
					</div>
				)}
				{!summary && content && <div classes={themedCss.content}>{content}</div>}
			</div>
			{majorType !== 'article' && summary && content && (
				<Details summary="read more">
					<div classes={[themedCss.contentWrapper]}>{content}</div>
				</Details>
			)}

			{majorType === 'article' && summary && content && (
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
		</div>
	);
});

export default Card;
/*
<div classes={themedCss.bookmark} />
<div classes={themedCss.topic}>topic</div>
*/
