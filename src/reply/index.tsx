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
import AttributedTo from '../attributedTo';
import Rate from '../rate';
import Button from '../button';
import Icon from '../icon';
// import * as ui from '../theme/material/_ui.m.css';
import bundle from './nls/Reply';
import * as css from '../theme/material/reply.m.css';

export interface ReplyProperties extends AsObject {
	widgetId?: string;
	view?: 'responsive' | 'column' | 'row' | 'tableRow';
	mode?: keyof typeof css & ('reply' | 'answer' | 'comment');
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

For Q&A logic having `answer` and `comments`, the comments should be flattened
but point to the parent
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
		summaryLength: sLength = 168, contentLines = 5, summaryLines = 3, color: c, view = 'column', mode = 'reply'
	} = properties();
	const themedCss = theme.classes(css);

	const omit = i18nActivityPub.omit();
	// const idBase = id.getId('reply');
	if (view === 'tableRow') {
		return 'TODO'
	}
	const color = !c ? (mode === 'answer' ? 'pink' : 'primary') : c;
	const summaryLength = mode === 'comment' ? 220 : 168;
	// TODO isAccepted
	const {
		isDuplicate = false, isAccepted = false,
		summary: s = [], content = [], replies = {totalItems: 0, items: []}, ...ld
	} = i18nActivityPub.normalized<ReplyProperties>();
	const aggregateRating = getAggregateRating(ld);
	const replyItems = [...(new Set(replies.items||[]))];
	let overwrites = {};
	if (!!isDuplicate || mode === 'comment') {
		const summary = `${!Array.isArray(s) ? s : s.join(' - ')}: ${!Array.isArray(content) ? content : content.join(' - ')}`
			.replace(/\r?\n/g, ' ')
			.substring(0, summaryLength);
		overwrites = {summary, content: ''};
	}
	const { answered } = messages;
	const attributionsByline = <span classes={[theme.uiColor('primary'), themedCss.meta]}>
		{mode === 'comment' ? '' : answered} <TimeRelative short={mode === 'comment'} hasTitle date={ld.published||''} />
	</span>;

	// TODO
	const authorOfQuestion = true;
	const authorOfAccepted = false;
	// empty span for flex behaviour
	const attributionsHint = !authorOfQuestion && !authorOfAccepted ? <span /> :
		<span classes={[themedCss.muted, themedCss.hintIcon]}>
			<Icon
				spaced={true}
				type="bullhorn"
				color={authorOfQuestion ? color : 'neutral'}
				title={`${(mode === 'comment' ? messages.comment : messages.answer)} ${authorOfQuestion ? messages.ofQuestioner : messages.ofAccepted}`}
			/>
		</span>;

	return <div classes={[
		themedCss.root,
		themedCss[mode],
		theme.variant(),
		theme.uiColor(color),
		!!isAccepted && themedCss.hasAccepted, !!isDuplicate && themedCss.hasDuplicate
	]}>
		{!!isAccepted && <span classes={themedCss.accepted}><Icon color="success" size="xxl" type="check" /></span>}
		{!!isDuplicate && <span classes={themedCss.duplicate}><Icon color={color} size="xxl" type="move" spaced="right" /></span>}
		<div key={`rateWrapper${widgetId}`} classes={themedCss.rateWrapper}>
			<div classes={themedCss.topCaption}>
				{!!isAccepted && mode !== 'comment' && <span classes={[themedCss.meta, themedCss.success, theme.variant()]}>
					{messages.accepted}
				</span>}
				{!!isDuplicate && mode !== 'comment' && <span classes={themedCss.meta}>
					{messages.duplicate}
				</span>}
				{mode !== 'comment' && attributionsHint}
			</div>
			{!!aggregateRating && <Rate {...aggregateRating} color={color} readOnly={isDuplicate} hasActions={!isDuplicate} />}
		</div>
		<Caption {...{summary: s, content, ...ld}} {...overwrites}
			compact
			key="caption"
			attributionsByline={attributionsByline}
			colored={!isDuplicate && mode !== 'comment'}
			summaryLines={summaryLines}
			contentLines={contentLines}
			omitProperties={['date','locales','location',(isDuplicate||mode === 'comment') && 'attributedTo']}
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
		{mode === 'comment' && <small classes={themedCss.replyAttributions}>
			{attributionsHint}
			<AttributedTo compact key="attributions" {...ld}
				byline={<virtual><Icon color="primary" size="xs" type="comment" spaced="left" />{attributionsByline}</virtual>}
				max={9}
			/>
		</small>}

		{mode !== 'comment' && !!isDuplicate && !!replies.totalItems &&
			<p classes={themedCss.duplicateReplyCount}>{replies.totalItems} {format('answers', {count: replies.totalItems})}</p>}

		{mode !== 'comment' && !isDuplicate && replyItems.map((o: any) => <Reply {...o} mode="comment" />)}

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
