import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { AsObject, AsActivity } from '../common/interfaces';
import { ldPartial, toIntStr, toBooleanStr } from '../_ld';
import { clampStrings } from '../common/activityPubUtil';
import i18nActivityPub from '../middleware/i18nActivityPub';
import id from '../middleware/id';
import theme from '../middleware/theme';
import breakpoints from '../middleware/breakpoint';
// import Button from '../button';
import Paginated from '../paginated';
import Caption, { coveredLD as captionCoveredLD } from '../caption';
import Rate from '../rate';
import Details from '../details';
import Structure from '../structure';
import Icon from '../icon';
import Images from '../images';
import Button from '../button';
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

	const { messages } = i18nActivityPub.localize(bundle);
	const {
		fullscreen, widgetId, mediaType, onMouseEnter, onMouseLeave, onLoad, onFullscreen,
		addressExpanded = false, fit = false, color = 'pink', view = 'column'
	} = properties();
	// const { get, set, getOrSet } = icache;
	const themedCss = theme.classes(css);
	const {
		published, updated, duration, 'dc:created': contentCreated = [],
		oneOf = [], anyOf = [], closed, ...ld
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

	const boldQmark = (s: RenderResult) => typeof s === 'string' ? s.split(/[?]/g).map((s) => <span>{s}<b>?</b></span>) : s;
	// if (!!ld.summary && !!ld.summary.length) { (ld.summary as any) = ld.summary.map(boldQmark) }
	// if (!!ld.content && !!ld.content.length) { (ld.content as any) = ld.content.map(boldQmark) }
	console.log(boldQmark('Id like to build a robot to feed my cat. Should I use Arduino or Raspberry Pi?'))

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
					<p classes={themedCss.meta}>Lorem Ipsum</p>
				</div>
				<div key="nameWrapper" classes={[nameCss.root, themedCss.nameWrapper]}>
					<p classes={themedCss.questionStatus}>Lorem Ipsum</p>
					{!!name && !omit.has('name') && <Paginated key="name" property="name" spaced="right" transformNodes={boldQmark}>
						{clampStrings(name, 250).map((s) => <h5>{s}</h5>)}
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
					transformPaginated={boldQmark}
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
		<div key="answerWrapper" classes={themedCss.answerWrapper}>
			answers

			<Button labelFor={idBase} {...{color, responsive: true}}>
				{messages.readAnswers}
			</Button>
		</div>
		{!!aggregateRating && <div key="rateWrapper" classes={themedCss.rateWrapper}>
			<Rate readOnly {...ldPartial(aggregateRating)} />
		</div>}
		<Details>
			{{
				summary: <span>{messages.moreInfo}</span>,
				content: <Structure omitProperties={coveredLD} value={ld} />
			}}
		</Details>
	</div>
});

export default Question;
