import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { AsActivity, AsObject, AsObjectNormalized } from '../common/interfaces';
import { ldPartial } from '../_ld';
import is from '../framework/is';
import { isAP, clampStrings } from '../common/activityPubUtil';
import i18nActivityPub from '../middleware/i18nActivityPub';
import id from '../middleware/id';
import theme from '../middleware/theme';
import breakpoints from '../middleware/breakpoint';
import Chip from '../chip';
import Accessory from '../accessory';
import Details from '../details';
import Paginated from '../paginated';
import TimeRelative from '../timeRelative';
import Caption, { coveredLD as captionCoveredLD } from '../caption';
import Rate from '../rate';
import Structure from '../structure';
import RadioGroup from '../radioGroup';
import CheckboxGroup from '../checkboxGroup';
import TextArea from '../textArea';
import Images from '../images';
import Button from '../button';
import Icon from '../icon';
// import * as ui from '../theme/material/_ui.m.css';
import bundle from './nls/Question';
import * as viewCSS from '../theme/material/_view.m.css';
import * as nameCss from '../theme/material/name.m.css';
import * as css from '../theme/material/question.m.css';

export interface QuestionProperties extends AsActivity {
	view?: 'responsive' | 'column' | 'row' | 'tableRow';
	fullscreen?: boolean;
	fit?: boolean;
	editable?: boolean;
	/** `id` set on the root DOM node */
	widgetId?: string;
	/* when main image has loaded */
	onLoad?: () => any;
	/* when entering fullscreen */
	onFullscreen?: () => any;

	onMouseEnter?: (evt: MouseEvent) => any;
	onMouseLeave?: (evt: MouseEvent) => any;
}

export interface QuestionIcache {
	value: string;
	closed: boolean | Date;
	canVote: boolean;
	listens: boolean;
}
export interface QuestionChildren {
	/** Optional Header */
	header?: RenderResult;
	/** Optional Footer */
	footer?: RenderResult;
}

/* Problems:
In https://www.w3.org/TR/activitystreams-vocabulary/#dfn-question `name` is the Question
but In https://www.w3.org/TR/activitystreams-vocabulary/#questions `content` is the Question …

Note - Client :
USE `result`
Describes the result of the activity.
For instance, if a particular action results in the creation of a new resource,
the result property can be used to describe that new resource.
---
`endTime` answers "when will this question close"
while
`close` answers "did and/or when did this question close"
(so if a question will close 2 seconds after user opened page, the onMinute SHOULD be attached)
UI :
Question has NO visual attributedTo cause it is an IntransitiveActivity and so the author is
the questioner - "asking for a friend" :)

TODO
To support all implementations we somehow need to sync Like/Dislike ratio and aggregateRating
see didVote - did already vote …
---
DUPLICATES
If a `Question` arrives as answer it could mean a hint it is a duplicate (?)
It is considered a duplicate if `result` is a different question

The ACCEPTED answer (if no oneOf or anyOf) is another type than `Question` in `result`
with `inReplyTo` the `Question` …
---
image, icon
map choices -> image, icon -> full
instrument
tag
startTime / endTime VS closed Object | Link | xsd:dateTime | xsd:boolean
result


AS oneOf | anyOf | closed

schema
https://schema.org/Answer
acceptedAnswer	Answer | ItemList
answerCount			Integer
eduQuestionType	Text

For questions that are part of learning resources (e.g. Quiz), eduQuestionType indicates the format.
Example: "Multiple choice", "Open ended", "Flashcard".
suggestedAnswer	Answer | ItemList
An answer (possibly one of several, possibly incorrect) to a Question, e.g. on a Question/Answer site.
/
Properties from Comment
downvoteCount	Integer	The number of downvotes this question, answer or comment has received from the community.
parentItem	Comment	The parent of a question, answer or item in general.
upvoteCount	Integer
*/
/* PS result …
 audience Entities for which the object can considered to be relevant.
 context context within which the object exists or an activity was performed.
 relationship
*/

const icache = createICacheMiddleware<QuestionIcache>();
const factory = create({ icache, id, i18nActivityPub, theme, breakpoints })
	.properties<QuestionProperties>()
	.children<QuestionChildren | RenderResult | undefined>();

/* TODO osm and wikidata ID per API e.g. https://api.openstreetmap.org/api/0.6/node/6171146490.json */
export const coveredLD = captionCoveredLD.concat([

]);
export const schemaSubTypes = [];
export const Question = factory(function question({
	middleware: { icache, id, i18nActivityPub, theme, breakpoints /*, resource */ },
	properties
}) {

	const { messages, format } = i18nActivityPub.localize(bundle);
	const { get, set, getOrSet } = icache;
	const {
		fullscreen, onMouseEnter, onMouseLeave, onLoad, onFullscreen, color = 'pink', view = 'column'
	} = properties();
	const themedCss = theme.classes(css);
	const {
		published, updated, duration, startTime, endTime,
		'dc:created': contentCreated = [], oneOf = [], anyOf = [],
		tag = [], closed: anyClosed = false, ...ld
	} = i18nActivityPub.normalized<QuestionProperties>();

	const omit = i18nActivityPub.omit();
	// const idBase = id.getId('question');
	if (view === 'tableRow') {
		return 'TODO'
	}

	getOrSet('closed', false, false);
	const checkClosed = () => {
		const jsNow = new Date();
		if (!!endTime && is(endTime, 'string')) {
			const ends = Date.parse(endTime);
			if (ends < jsNow.getTime()) {
				set('closed', new Date(ends));
			}
		}
		switch (is(anyClosed)) {
			// TODO - it can be `Link`, what would it mean ???
			// ... ???
			case 'boolean':
				// it can be `boolean`
				set('closed', (anyClosed as boolean))
			break;
			case 'object':
				const closed: AsObject = anyClosed as AsObject;
				// it can be `Object`	???
				if (!!closed.endTime && is(endTime, 'string')) {
					const ends = Date.parse(closed.endTime);
					if (ends < jsNow.getTime()) {
						set('closed', new Date(ends));
					}
				}
			break;
			case 'string':
				// it can be `xsd:dateTime`
				const ends = Date.parse(anyClosed as string);
				set('closed', ends < jsNow.getTime() && new Date(ends));
			break;
			default:
				getOrSet('closed', false)
		}
	}
	checkClosed();
	!get('listens') && window.addEventListener('redaktorMinute', checkClosed);
	getOrSet('listens', true, false);
/* TODO did already vote + closed = canVote */
const didVote = false;
console.log(!(get('closed')||false), !didVote, (!(get('closed')||false) && !didVote))
	set('canVote', !(get('closed')||false) && !didVote);
	getOrSet('value','');

	const viewDesktopCSS = theme.viewDesktopCSS();
	let vp = 'm' ;
	if (view === 'responsive') {
		const {breakpoint = 's'} = breakpoints.get('measure')||{};
		vp = breakpoint;
	}
	const { name, image = [], result = [], replies = {totalItems: 0, items: [] } } = (ld as AsObjectNormalized);
	const isPoll = oneOf.length + anyOf.length > 0;
	let replyCount = (typeof replies.totalItems === 'string' ? parseInt(replies.totalItems,10) : replies.totalItems) || 0;

	/* Let us normalize the ratings in .result and .replies
	- AS: .likes.totalItems are the preferred AS way
	- schema: .downvoteCount and .upvoteCount
	- schema can also have .aggregateRating
	we need a value 1-5 and the total votes …
	*/
	const getAggregateRating = (o: AsObject) => {
		const { aggregateRating: ar, upvoteCount = 0, downvoteCount = 0 } = ldPartial(o);
		const aggregateRating = ldPartial(ar);
		const toStarValue = (v: number, min: number = 1, max: number = 5) => {
			return Math.max(1, ((v - min)/(max - min)) * 4 + 1)
		}
		const [up, down] = [
			(Array.isArray(upvoteCount) ? upvoteCount[0] : upvoteCount) || 0,
			(Array.isArray(downvoteCount) ? downvoteCount[0] : downvoteCount) || 0
		];
		const updown = !up+down ? [3, 0] : [toStarValue(up, 0-up+down, up+down), up+down];
		let aRating = [3, 0];
		let {
			ratingValue: v = null, worstRating: w = 1, bestRating: b = 5, ratingCount = up+down || 1
		} = (Array.isArray(aggregateRating) ? aggregateRating[0] : aggregateRating) || {};
		const [ratingValue, worstRating, bestRating] = [v, w, b].map((nr) => typeof nr === 'string' ? parseInt(nr, 10) : nr);

		if (([ratingValue, worstRating, bestRating].filter((nr) => (typeof nr === 'number' && !isNaN(nr)))).length === 3) {
			aRating = [toStarValue(ratingValue, worstRating, bestRating), ratingCount]
		}
		return {
			ratingValue: (updown[0]*updown[1] + aRating[0]*aRating[1]) / (updown[1]+aRating[1]),
			ratingCount: (updown[1]+aRating[1]),
			worstRating: 1,
			bestRating: 5
		}
	}

	// NOTE - if `result` contains another question, we consider it a duplicate …
	// NOTE - if your implementation does use ratings with `Question` AND `replies` is paged,
	// then your `replies` SHOULD be an `OrderedCollection` sorted best rating first
	// to assure at least the best are in the first CollectionPage
	const mapId = (o:any) => is(o, 'object') && o.hasOwnProperty('id') ? o.id : '';
	const normRating = (o: AsObject) => { o.aggregateRating = getAggregateRating(o); return o };
	const sortRating = (a: any, b: any) => b.aggregateRating.ratingValue - a.aggregateRating.ratingValue;
	const duplicates = result.filter((o:any) => isAP(o, 'Question'))
		.map((o: AsObject) => { o.isDuplicate = true; return o });
	const results: AsObject[] = result.filter((o:any) => !isAP(o, 'Question'))
		.map(normRating).map((o: AsObject) => { o.isAccepted = true; return o }).sort(sortRating);
	const [dupIDs, resIDs] = [new Set(duplicates.map(mapId)), new Set(results.map(mapId))];
	let replyItems = [...(new Set(replies.items))].filter((o) => {
		if (dupIDs.has(o.id) || resIDs.has(o.id)) { replyCount-- }
		return !dupIDs.has(o.id) && !resIDs.has(o.id)
	})
		.map(normRating).sort(sortRating);

	const topReplies = !results.length ? (!duplicates.length ? [replyItems.shift()] : []) : [results.shift()];
	const topReactions: AsObject[] = duplicates.concat(topReplies);
	// only the best rated is initially visible
	if (!!results.length) { replyItems = results.concat(replyItems) }

	const boldQmark = (s: RenderResult): RenderResult => Array.isArray(s) ? s.map(boldQmark) :
		typeof s === 'string' ? s.split(/[?]/g).map((s,i,a) => !s ? '' :
			(i === a.length-1 ? s : <span>{s}<b classes={themedCss.questionMark}>?</b></span>)) : (s as any);

	const toOptions = (o: AsObjectNormalized) => {
		let {name:n = [], summary:s = [], content:c} = o;
		const [value, title] = [n.join(' '), s.join(' ')];
		const name = value.length < 42 ? value : `${value.substr(0,42)}…`;
		const summary = title.length < 84 ? title : `${title.substr(0,84)}…`;
		const titleO = title.length < 84 ? {} : {title}
		if (!!n) {
			return !s && !c ? {value} : {value, label:<span {...titleO}>{name}<br /><small>{summary}</small></span>}
		}
		return false;
	}

// TODO - own widget
	const REPLY = ((o: AsObject|null|undefined, id: number|string) => {
		// TODO isAccepted
		if (!o) { return '' }
		const { aggregateRating } = o;
		let overwrites = {};
		if (!!o.isDuplicate) {
			const {summary: s = [], content = []} = o;
			const summary = `${!Array.isArray(s) ? s : s.join(' - ')}:
${!Array.isArray(content) ? content : content.join(' - ')}`.replace(/\r?\n/g, ' ').substring(0, 250);
			overwrites = {summary, content: ''};
		}
		return <virtual>
			{!!o.isAccepted && <span classes={themedCss.accepted}><Icon color="success" size="xxl" type="check" /></span>}
			{!!o.isDuplicate && <virtual>
				<span classes={themedCss.duplicate}>
					<Icon color={color} size="xxl" type="move" spaced="right" />
				</span>
				<span classes={themedCss.meta}>considered a duplicate of</span>
			</virtual>}
			{!!aggregateRating && <div key={`rateWrapper${id}`} classes={themedCss.rateWrapper}>
				<Rate {...aggregateRating} />
			</div>}
			<Caption {...o} {...overwrites}
				compact
				summaryLines={3}
				contentLines={5}
				omitProperties={['date','locales','location','attributedTo']}
				classes={{ '@redaktor/widgets/images': { pageCaption: [themedCss.replyCaption] } }}
			/>
		</virtual>
	});
// <--

	const answerInput = get('closed') ? '' : !isPoll ?
		<TextArea
			required responsive color={color} design="flat" expandNoscriptRows={5}
			onValue={(v) => set('value',v||'')}
		>{messages.answer}</TextArea> :
		<virtual>
			{!!oneOf.length && <RadioGroup color={color} vertical options={oneOf.map(toOptions).filter((o: any) => !!o)} />}
			{!!anyOf.length && <CheckboxGroup color={color} vertical options={anyOf.map(toOptions).filter((o: any) => !!o)} />}
		</virtual>;

	const aggregateRating = getAggregateRating(ld);
	const classes = {
		caption: {
			'@redaktor/widgets/images': {
				captionWrapper: [themedCss.captionWrapper],
				locales: [themedCss.locales]
			}
		},
		chip: { '@redaktor/widgets/chip': { root: [themedCss.answerChip] } }
	}

	// icons: closed, comment, edit
	return <div
		key="root"
		classes={[
			themedCss.root,
			theme.variant(),
			// !!get('loadedImages') && themedCss.imagesOpen,
			// isColumn ? themedCss.column : themedCss.row,
			viewCSS.item,
			!!viewDesktopCSS && viewDesktopCSS.item,
			theme.shaped(themedCss),
			theme.uiSize(),
			theme.uiColor(color),
			theme.uiElevation(),
			theme.animated(themedCss)
		]}
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
		aria-label="Image"
		role="region"
	>
		<div classes={themedCss.header}>
			<Accessory color={color} items={(tag.slice(0,10) as AsObjectNormalized[])} />
			<div classes={themedCss.topWrapper}>
				<div key="meta" classes={themedCss.metaWrapper}>
					<p>
						<Icon type="published" color="grey" size="s" spaced="right" />
						<span classes={themedCss.meta}>{messages.asked} <TimeRelative date={published||''} /></span>
					</p>
					<p classes={themedCss.meta}>
						<Icon type="update" color="grey" size="s" spaced="right" />
						<span classes={themedCss.meta}>{messages.active} <TimeRelative date={updated||''} /></span>
					</p>
				</div>
				<div key="nameWrapper" classes={[nameCss.root, themedCss.nameWrapper]}>
					{!aggregateRating && <p classes={themedCss.questionStatus}></p>}
					{!!aggregateRating && <div key="rateWrapper" classes={themedCss.rateWrapper}>
						<Rate {...aggregateRating} />
					</div>}
					{!!name && !omit.has('name') && <Paginated key="name" property="name" spaced="right">
						{clampStrings(name, 250).map((s) => <h5>{boldQmark(s)}</h5>)}
					</Paginated>}
				</div>
				<i classes={themedCss.teaserIcon} />
			</div>
			<div key="questionWrapper" classes={themedCss.questionWrapper}>
				<Caption {...(ld)} classes={classes.caption} colored contentPaginated
					color={color} transformContent={boldQmark} contentLines={10}
					omitProperties={['name','date','location','attributedTo']}
					onLocale={(l) => i18nActivityPub.setLocale(l)}
				/>
			</div>
		</div>
		{!omit.has('image') && <div key="images" classes={themedCss.images}>
			<Images view={view} image={image} itemsPerPage={4} size={(vp as any)} />
		</div>}

		{!!get('canVote') && <form key="answerWrapper" classes={themedCss.answerWrapper}>
			{!isPoll && !!topReactions.length && <div classes={themedCss.topAnswers}>
				{topReactions.map((o,i) => REPLY(o,`top${i}`))}
			</div>}

			{!isPoll &&
				(!replyItems || !replyItems.length ? <span classes={themedCss.noAnswer}>
					<Icon type="edit" color="grey" size="s" spaced="right" />
					{format('readAnswers',{count: !!topReactions.length ? 1 : 0})}
				</span> :
					<Details size="xl">{{
						summary: <span>
							<Chip size={replyCount < 10 ? 's' : 'm'} color={color} spaced="right" classes={classes.chip}>{replyCount}</Chip>
							{format('readAnswers',{count: replyCount+1})}
						</span>,
						content: replyItems.map(REPLY)
					}}</Details>)
			}
			{answerInput}
			<Button responsive type="submit" color={color}>
				<span classes={themedCss.answerLabel}>{isPoll ? messages.doVote : messages.doAnswer}</span>
			</Button>
		</form>}
		{!!get('closed') && <span classes={themedCss.noAnswer}>
			<Icon type="closed" color="grey" size="s" spaced="right" />
			{format('readAnswers',{count: 0})}
		</span>}

		<Structure omitProperties={coveredLD} value={ld}>
			{{ detailsSummary: <span>{messages.moreInfo}</span> }}
		</Structure>
	</div>
});
export default Question;
