import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { AsActivity, AsObject } from '../common/interfaces';
import { ldPartial } from '../_ld';
import i18nActivityPub from '../middleware/i18nActivityPub';
import id from '../middleware/id';
import theme from '../middleware/theme';
import breakpoints from '../middleware/breakpoint';
import TimeRelative from '../timeRelative';
import Caption, { coveredLD as captionCoveredLD } from '../caption';
import Rate from '../rate';
import Button from '../button';
import Icon from '../icon';
// import * as ui from '../theme/material/_ui.m.css';
import bundle from './nls/Question';
import * as css from '../theme/material/question.m.css';

export interface ReplyProperties extends AsActivity {
	widgetId?: string;
	view?: 'responsive' | 'column' | 'row' | 'tableRow';
	mode?: 'reply' | 'answer' | 'comment';
	replyLevel?: number;
	summaryLength?: number;
	contentLines?: number;
	isAccepted?: boolean;
	isDuplicate?: boolean;
}
export interface ReplyChildren {
	/** Optional Header */
	header?: RenderResult;
	/** Optional Footer */
	footer?: RenderResult;
}
/* Let us normalize the ratings in .result and .replies
- AS: .likes.totalItems are the preferred AS way
- schema: .downvoteCount and .upvoteCount
- schema can also have .aggregateRating
we need a value 1-5 and the total votes …
*/
export const getAggregateRating = (o: AsObject) => {
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

/* TODO
reply can have replyLevel
selecting comment or reply could highlight mentioned people posts
Emphasize Author Comments -
Answers by the author of the question should be marked as author comment …
Comments of accepted authors should be marked 
*/
const factory = create({ id, i18nActivityPub, theme, breakpoints })
	.properties<ReplyProperties>()
	.children<ReplyChildren | RenderResult | undefined>();

export const coveredLD = captionCoveredLD.concat([

]);
export const schemaSubTypes = [];
export const Reply = factory(function reply({
	middleware: { id, i18nActivityPub, theme, breakpoints /*, resource */ },
	properties
}) {
	const { messages, format } = i18nActivityPub.localize(bundle);
	const {
		fullscreen, onMouseEnter, onMouseLeave, onLoad, onFullscreen, widgetId = id.getId(),
		summaryLength = 168, contentLines = 5, summaryLines = 3, color = 'pink', view = 'column', mode = 'reply'
	} = properties();
	const themedCss = theme.classes(css);

	const omit = i18nActivityPub.omit();
	// const idBase = id.getId('reply');
	if (view === 'tableRow') {
		return 'TODO'
	}

	// TODO isAccepted
	const { isDuplicate = false, isAccepted = false, summary: s = [], content = [], replies = [], ...ld } = i18nActivityPub.normalized<ReplyProperties>();
	const aggregateRating = getAggregateRating(ld);
	let overwrites = {};
	if (!!isDuplicate || mode === 'comment') {
		const summary = `${!Array.isArray(s) ? s : s.join(' - ')}: ${!Array.isArray(content) ? content : content.join(' - ')}`
			.replace(/\r?\n/g, ' ')
			.substring(0, summaryLength);
		overwrites = {summary, content: ''};
	}
	const { answered } = messages;
	return <div classes={[themedCss.answer, !!isAccepted && themedCss.hasAccepted, !!isDuplicate && themedCss.hasDuplicate]}>
		{!!isAccepted && <span classes={themedCss.accepted}><Icon color="success" size="xxl" type="check" /></span>}
		{!!isDuplicate && <span classes={themedCss.duplicate}>
			<Icon color={color} size="xxl" type="move" spaced="right" />
		</span>}
		<div key={`rateWrapper${widgetId}`} classes={themedCss.rateWrapper}>
			<div classes={themedCss.topCaption}>
				{!!isAccepted && <span classes={[themedCss.meta, themedCss.success, theme.variant()]}>
					{messages.accepted}
				</span>}
				{!!isDuplicate && <span classes={themedCss.meta}>{messages.duplicate}</span>}
			</div>
			{!!aggregateRating && <Rate {...aggregateRating} readOnly={isDuplicate} hasActions={!isDuplicate} />}
		</div>
		<Caption {...{summary: s, content, ...ld}} {...overwrites}
			compact
			attributionsByline={<virtual>{answered} <TimeRelative hasTitle date={ld.published||''} /></virtual>}
			colored={!isDuplicate && mode !== 'comment'}
			summaryLines={summaryLines}
			contentLines={contentLines}
			omitProperties={['date','locales','location',isDuplicate && 'attributedTo']}
			locale={i18nActivityPub.get().locale}
			onLocale={(l) => i18nActivityPub.setLocale(l)}
			classes={{
				'@redaktor/widgets/images': {
					pageCaption: [themedCss.replyCaption],
					summary: [themedCss.replySummary],
					attributions: [themedCss.replyAttributions]
				}
			}}
		/>

		{!!isDuplicate && !!replies.totalItems &&
			<p classes={themedCss.duplicateReplyCount}>{replies.totalItems} {format('answers', {count: replies.totalItems})}</p>}

		{!isDuplicate && mode !== 'comment' && <div classes={themedCss.replyButtons}>
			<Button classes={{ '@redaktor/widgets/button': {root: [themedCss.replyButton, themedCss.openButton]} }} design="flat" color={color}>
				<Icon spaced="right" type={["Note", "Place"]} />Open
			</Button>
			<Button classes={{ '@redaktor/widgets/button': {root: [themedCss.replyButton]} }} design="flat" color={color}>
				<Icon spaced="right" type="bookmark" />Bookmark
			</Button>
			<Button classes={{ '@redaktor/widgets/button': {root: [themedCss.replyButton]} }} design="flat" color={color}>
				<Icon spaced="right" type="announce" />Share
			</Button>
			<Button classes={{ '@redaktor/widgets/button': {root: [themedCss.replyButton]} }} design="flat" color={color}>
				<Icon spaced="right" type="edit" />Edit
			</Button>
		</div>}
	</div>
});
export default Reply;
