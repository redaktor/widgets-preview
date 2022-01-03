import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { AsActivity, AsObjectNormalized } from '../common/interfaces';
import { ldPartial, toIntStr, toBooleanStr } from '../_ld';
import { clampStrings } from '../common/activityPubUtil';
import i18nActivityPub from '../middleware/i18nActivityPub';
import id from '../middleware/id';
import theme from '../middleware/theme';
import breakpoints from '../middleware/breakpoint';
import Chip from '../chip';
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
	closed: boolean;
}
export interface QuestionChildren {
	/** Optional Header */
	header?: RenderResult;
	/** Optional Footer */
	footer?: RenderResult;
}

/* TODO

Problem:
In https://www.w3.org/TR/activitystreams-vocabulary/#dfn-question `name` is the Question
but In https://www.w3.org/TR/activitystreams-vocabulary/#questions `content` is the Question …

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
		published, updated, duration, 'dc:created': contentCreated = [],
		oneOf = [], anyOf = [], closed = false, ...ld
	} = i18nActivityPub.normalized<QuestionProperties>();
	const omit = i18nActivityPub.omit();
	const idBase = id.getId('question');
	if (view === 'tableRow') {
		return 'TODO'
	}

	const viewDesktopCSS = theme.viewDesktopCSS();
	let vp = 'm' ;
	if (view === 'responsive') {
		const {breakpoint = 's'} = breakpoints.get('measure')||{};
		vp = breakpoint;
	}
	const { name, image = [] } = ld;
	const {
		aggregateRating: rating
	} = ldPartial(ld);
	const aggregateRating = Array.isArray(rating) ? rating[0] : rating;

	getOrSet('closed',!!closed,false);
	/* TODO did already vote + closed = canVote */
	getOrSet('value','');

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
	const isPoll = oneOf.length + anyOf.length > 0;
	const answerInput = get('closed') ? '' : !isPoll ?
		<TextArea
			required responsive color={color} design="flat" expandNoscriptRows={5}
			onValue={(v) => set('value',v||'')}
		>{messages.answer}</TextArea> :
		<virtual>
			{!!oneOf.length && <RadioGroup color={color} vertical options={oneOf.map(toOptions).filter((o: any) => !!o)} />}
			{!!anyOf.length && <CheckboxGroup color={color} vertical options={anyOf.map(toOptions).filter((o: any) => !!o)} />}
		</virtual>;
	const moreInfoNode = <Structure omitProperties={coveredLD} value={ld} />;

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
					<p classes={themedCss.questionStatus}>#IoT #robot</p>
					{!!name && !omit.has('name') && <Paginated key="name" property="name" spaced="right">
						{clampStrings(name, 250).map((s) => <h5>{boldQmark(s)}</h5>)}
					</Paginated>}
				</div>
				<i classes={themedCss.teaserIcon} />
			</div>
			<div key="questionWrapper" classes={themedCss.questionWrapper}>
				<Caption {...(ld)}
					classes={{
						'@redaktor/widgets/images': { captionWrapper: [themedCss.captionWrapper] }
					}}
					colored
					contentPaginated
					transformContent={boldQmark}
					color={color}
					contentLines={3}
					omitProperties={['name','date','location']}
					onLocale={(l) => i18nActivityPub.setLocale(l)}
				/>
			</div>
		</div>
		{!omit.has('image') && <div key="images" classes={themedCss.images}>
			<Images view={view} image={image} itemsPerPage={4} size={(vp as any)} />
		</div>}
		<form key="answerWrapper" classes={themedCss.answerWrapper}>
			{!isPoll && <p>TODO accepted||top answer</p>}
			{!isPoll && <Details size="xl">{{
				summary: <span><Chip color={color}>99</Chip> {format('readAnswers',{count: 99})}</span>,
				content: '...'
			}}</Details>}
			{answerInput}
			<Button responsive type="submit" labelFor={idBase} color={color}>
				{isPoll ? messages.doVote : messages.doAnswer}
			</Button>
		</form>
		{!!aggregateRating && <div key="rateWrapper" classes={themedCss.rateWrapper}>
			<Rate readOnly {...ldPartial(aggregateRating)} />
		</div>}

		<Structure omitProperties={coveredLD} value={ld}>
			{{ detailsSummary: <span>{messages.moreInfo}</span> }}
		</Structure>
	</div>
});
export default Question;
