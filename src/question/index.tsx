import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { AsActivity, AsObject, AsObjectNormalized } from '../common/interfaces';
import { ldPartial } from '../_ld';
import is from '../framework/is';
import { clampStrings } from '../common/activityPubUtil';
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

/* Problem:
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
see didVote
image, icon
map choices -> image, icon -> full
instrument
tag
startTime / endTime VS closed Object | Link | xsd:dateTime | xsd:boolean
result


AS oneOf | anyOf | closed

schema
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
		fullscreen, widgetId, mediaType, onMouseEnter, onMouseLeave, onLoad, onFullscreen,
		addressExpanded = false, fit = false, color = 'pink', view = 'column'
	} = properties();
	const themedCss = theme.classes(css);
	const {
		published, updated, duration, startTime, endTime,
		'dc:created': contentCreated = [], oneOf = [], anyOf = [],
		tag = [], closed: anyClosed = false, ...ld
	} = i18nActivityPub.normalized<QuestionProperties>();

	console.log(properties(), tag);
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
	const { name, image = [], replies = { totalItems: 0 } } = ld;
	const { aggregateRating: rating } = ldPartial(ld);
	const replyCount = (typeof replies.totalItems === 'string' ? parseInt(replies.totalItems,10) : replies.totalItems) || 0
	const aggregateRating = Array.isArray(rating) ? rating[0] : rating;
	const isPoll = oneOf.length + anyOf.length > 0;

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

	const answerInput = get('closed') ? '' : !isPoll ?
		<TextArea
			required responsive color={color} design="flat" expandNoscriptRows={5}
			onValue={(v) => set('value',v||'')}
		>{messages.answer}</TextArea> :
		<virtual>
			{!!oneOf.length && <RadioGroup color={color} vertical options={oneOf.map(toOptions).filter((o: any) => !!o)} />}
			{!!anyOf.length && <CheckboxGroup color={color} vertical options={anyOf.map(toOptions).filter((o: any) => !!o)} />}
		</virtual>;
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
					<p classes={themedCss.questionStatus}></p>
					{!!name && !omit.has('name') && <Paginated key="name" property="name" spaced="right">
						{clampStrings(name, 250).map((s) => <h5>{boldQmark(s)}</h5>)}
					</Paginated>}
				</div>
				<i classes={themedCss.teaserIcon} />
			</div>
			<div key="questionWrapper" classes={themedCss.questionWrapper}>
				<Caption {...(ld)}
					classes={{
						'@redaktor/widgets/images': { captionWrapper: [themedCss.captionWrapper], locales: [themedCss.locales] }
					}}
					colored
					contentPaginated
					transformContent={boldQmark}
					color={color}
					contentLines={3}
					omitProperties={['name','date','location','attributedTo']}
					onLocale={(l) => i18nActivityPub.setLocale(l)}
				/>
			</div>
		</div>
		{!omit.has('image') && <div key="images" classes={themedCss.images}>
			<Images view={view} image={image} itemsPerPage={4} size={(vp as any)} />
		</div>}

		{!!get('canVote') && <form key="answerWrapper" classes={themedCss.answerWrapper}>
			{!isPoll && replyCount > 0 && <p>TODO accepted||top answer</p>}
			{!isPoll &&
				(!replyCount ? <span classes={themedCss.noAnswer}>
					<Icon type="edit" color="grey" size="s" spaced="right" />
					{format('readAnswers',{count: 0})}
				</span> :
					<Details size="xl">{{
						summary: <span>
							<Chip size={replyCount < 10 ? 's' : 'm'} color={color} spaced="right" classes={{
								'@redaktor/widgets/chip': { root: [themedCss.answerChip] }
							}}>
								{replyCount}
							</Chip>
							{format('readAnswers',{count: replyCount})}
						</span>,
						content: '...'
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

		{!!aggregateRating && <div key="rateWrapper" classes={themedCss.rateWrapper}>
			<Rate readOnly {...ldPartial(aggregateRating)} />
		</div>}

		<Structure omitProperties={coveredLD} value={ld}>
			{{ detailsSummary: <span>{messages.moreInfo}</span> }}
		</Structure>
	</div>
});
export default Question;
