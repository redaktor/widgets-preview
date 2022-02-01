import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { AsActivity, AsObject, AsObjectNormalized } from '../common/interfaces';
import is from '../framework/is';
import { isAP, clampStrings } from '../common/activityPubUtil';
import i18nActivityPub from '../middleware/i18nActivityPub';
import id from '../middleware/id';
import { stdDateFormat } from '../middleware/minute';
import theme from '../middleware/theme';
import breakpoints from '../middleware/breakpoint';
import Reply, { getAggregateRating } from '../reply';
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
	closeColor: 'neutral' | 'warning' | 'error';
	closingSoon: false | Date;
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

/* TODO
custom icon? / image / location
map choices -> image, icon -> full
instrument

---
To support all implementations we somehow need to sync Like/Dislike ratio and aggregateRating
see didVote - did already vote …
ACCEPTS
If anything NOT-`Question` arrives in result, it is considered accepted.
Note, also authors can answer own questions (e.g. telling others, they figured out how) but this should
not add any metrics like achievements to prevent abuse
---
DUPLICATES
If a `Question` arrives in result it could mean a hint it is a duplicate (?)
It is considered a duplicate if `result` is a different question

The ACCEPTED answer (if no oneOf or anyOf) is another type than `Question` in `result`
with `inReplyTo` the `Question` …

AS oneOf | anyOf | closed

schema
https://schema.org/Answer
acceptedAnswer	Answer | ItemList
? answerCount			Integer
eduQuestionType	Text

For questions that are part of learning resources (e.g. Quiz), eduQuestionType indicates the format.
Example: "Multiple choice", "Open ended", "Flashcard".
suggestedAnswer	Answer | ItemList
An answer (possibly one of several, possibly incorrect) to a Question, e.g. on a Question/Answer site.
/
Properties from Comment
downvoteCount, upvoteCount
parentItem	Comment	The parent of a question, answer or item in general.

*/

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

PS result …
 audience Entities for which the object can considered to be relevant.
 context context within which the object exists or an activity was performed.
 relationship
*/

const icache = createICacheMiddleware<QuestionIcache>();
const factory = create({ icache, id, i18nActivityPub, theme, breakpoints })
	.properties<QuestionProperties>()
	.children<QuestionChildren | RenderResult | undefined>();

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
	getOrSet('closingSoon', false, false);
	getOrSet('closeColor', 'neutral', false);
	const checkClosing = () => {
		const jsNow = new Date();
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
				const closedTime = Date.parse(anyClosed as string);
				set('closed', closedTime < jsNow.getTime() && new Date(closedTime));
			break;
			default:
				getOrSet('closed', false)
		}

		if (!get('closed') || typeof get('closed') === 'boolean') {
			if (!!endTime && is(endTime, 'string')) {
				const ends = Date.parse(endTime);
				if (is(ends, 'number')) {
					if (ends < jsNow.getTime()) {
						set('closed', new Date(ends));
						return
					} else if (ends-3600000 < jsNow.getTime()) {
						console.log('ends',ends, (ends-300000 < jsNow.getTime()));
						if (ends-60000 < jsNow.getTime()) {
							set('closeColor', 'error', false)
						} else if (ends-300000 < jsNow.getTime()) {
							set('closeColor', 'warning', false)
						}
						set('closingSoon', new Date(ends))
					}
				}
			}
		}
	}
	checkClosing();
	!get('listens') && window.addEventListener('redaktorMinute', checkClosing);
	getOrSet('listens', true, false);

/* TODO did already vote + closed = canVote */
const didVote = false;
	set('canVote', !(get('closed')||false) && !didVote);
	getOrSet('value','');

	const viewDesktopCSS = theme.viewDesktopCSS();
	let vp = 'm' ;
	if (view === 'responsive') {
		const {breakpoint = 's'} = breakpoints.get('measure')||{};
		vp = breakpoint;
	}
	const { name, image = [], result = [], replies = {totalItems: 0, items: []} } = (ld as AsObjectNormalized);
	const isPoll = oneOf.length + anyOf.length > 0;
	let replyCount = (typeof replies.totalItems === 'string' ? parseInt(replies.totalItems,10) : replies.totalItems) || 0;

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
	let replyItems = [...(new Set(replies.items||[]))].filter((o) => {
		if (dupIDs.has(o.id) || resIDs.has(o.id)) { replyCount-- }
		return !dupIDs.has(o.id) && !resIDs.has(o.id)
	}).map(normRating).sort(sortRating);

	const topReplies = !results.length ? (!duplicates.length ? [replyItems.shift()] : []) : [results.shift()];
	const topReactions: AsObject[] = duplicates.concat(topReplies);
	// only the best rated is initially visible
	if (!!results.length) { replyItems = results.concat(replyItems) }

	const boldQmark = (s: RenderResult): RenderResult => Array.isArray(s) ? s.map(boldQmark) :
		typeof s === 'string' ? s.split(/[?]/g).map((s,i,a) => !s ? '' :
			(i === a.length-1 ? s : <span classes={viewCSS.typo}>{s}<b classes={themedCss.questionMark}>?</b></span>)) : (s as any);

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

	const answerInput = !isPoll ?
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
		caption: { '@redaktor/widgets/images': { locales: [themedCss.locales] } },
		chip: { '@redaktor/widgets/chip': { root: [themedCss.answerChip] } }
	}

	const localizedDate = new Intl.DateTimeFormat([i18nActivityPub.get().locale, 'en'], stdDateFormat);
	const [isClosed, isClosingSoon] = [get('closed'), get('closingSoon')];
	const getPrefixSuffix = (d: string|Date, tense = 'past') => {
		const date = localizedDate.format(typeof d === 'string' ? Date.parse(d) : d);
		return format('close', {tense, date}).split(date);
	}
	const getCloseNode = (d?: boolean|string|Date, tense?: string) => {
		if (typeof d === 'boolean' || !d) { return '' }
		const [prefix, suffix] = getPrefixSuffix(d, tense);
		return <virtual>
			{prefix} <TimeRelative hasTitle date={d} /> {suffix}
		</virtual>
	}
	const [closedNode, closingSoonNode]: RenderResult[] = [getCloseNode(isClosed), getCloseNode(isClosingSoon, 'future')];
	const closedAbs = typeof isClosed === 'boolean' ? '' : localizedDate.format(typeof isClosed === 'string' ? Date.parse(isClosed) : isClosed);

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
						<span classes={themedCss.meta}>{`${messages.wasAsked} `}<TimeRelative hasTitle date={published||''} /></span>
					</p>
					<p>
						<Icon type="update" color="grey" size="s" spaced="right" />
						<span classes={themedCss.meta}>{`${messages.wasActive} `}<TimeRelative hasTitle date={updated||''} /></span>
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
					locale={i18nActivityPub.get().locale}
					onLocale={(l) => i18nActivityPub.setLocale(l)}
				/>
			</div>
		</div>
		{!omit.has('image') && <div key="images" classes={themedCss.images}>
			<Images view={view} image={image} itemsPerPage={4} size={(vp as any)} />
		</div>}

		{<div key="answerWrapper" classes={themedCss.answerWrapper}>
			{!isPoll && !!topReactions.length && <div classes={themedCss.topAnswers}>
				{topReactions.map((o: any) => <Reply {...o} mode="answer"
					summaryLines={topReactions.length < 2 && !image.length ? 4 : 3}
					contentLines={topReactions.length < 2 && !image.length ?
						(!duplicates.length && !image.length ? 8 : 5) : (!duplicates.length ? 5 : 3)}
					summaryLength={duplicates.length > 2 || !!image.length ? 56 : (duplicates.length > 1 ? 112 : 168)}
				/>)}
			</div>}

			{!isPoll &&
				(!replyItems || !replyItems.length ? <span classes={themedCss.noAnswer}>
					<Icon type="edit" color="grey" size="s" spaced="right" />
					{format('readAnswers', {hasAccepted: !!topReactions.length ? 'yes' : 'no', count: 0})}
				</span> :
					<Details size="l" color={color}>{{
						summary: <span>
							<Chip size={replyCount < 10 ? 's' : 'm'} color={color} spaced="right" classes={classes.chip}>{replyCount}</Chip>
							{format('readAnswers', {hasAccepted: !!topReactions.length ? 'yes' : 'no', count: replyCount})}
						</span>,
						content: replyItems.map((o: any) => <Reply {...o}
							mode="answer"
							summaryLines={3}
							contentLines={!o.summary.length ? 15 : 10}
							summaryLength={280}
						/>)
					}}</Details>)
			}
			{!isClosed && !!isClosingSoon && <p classes={[themedCss.alert, theme.uiSize('l')]}>
				<Icon type="timing" color={get('closeColor')||"grey"} spaced="right" />
				{closingSoonNode}
			</p>}
			{!!isClosed && <p title={closedAbs} classes={[themedCss.alert, theme.uiSize('l')]}>
				<Icon type="closed" color={get('closeColor')||"grey"} spaced="right" />
				{closedNode}
			</p>}
			{(isPoll && get('canVote')) || (!isPoll && !get('closed')) &&
				<form classes={[themedCss.answerForm, !isClosed && get('closeColor') === 'error' && themedCss.closing]}>
					{answerInput}
					<Button responsive type="submit" color={color}>
						<span classes={themedCss.answerLabel}>{isPoll ? messages.doVote : messages.doAnswer}</span>
					</Button>
				</form>
			}
		</div>}

		<Structure omitProperties={coveredLD} value={ld}>
			{{ detailsSummary: <span>{messages.moreInfo}</span> }}
		</Structure>
	</div>
});
export default Question;
