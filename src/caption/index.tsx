import { RenderResult } from '@dojo/framework/core/interfaces';
import { tsx, create } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import focus from '@dojo/framework/core/middleware/focus';
import { AsObject, AsObjectNormalized } from '../common/interfaces';
import i18nActivityPub from '../middleware/i18nActivityPub';
import theme, { ViewportProperties } from '../middleware/theme';
import { clampStrings } from '../common/activityPubUtil';
import Locales from '../locales';
import MD from '../MD/';
import Dates, { getLdDates } from '../date';
import Location from '../location';
import Paginated from '../paginated';
import Collapsed from '../collapsed';
import Name from '../name';
import AttributedTo from '../attributedTo';
import Attachment from '../attachment';
import Icon from '../icon';
import * as css from '../theme/material/images.m.css';
import * as ui from '../theme/material/_ui.m.css';
import * as viewCss from '../theme/material/_view.m.css';

export interface CaptionProperties extends AsObject, ViewportProperties {
	baselined?: boolean;
	editable?: boolean;
	view?: 'responsive' | 'column' | 'row' | 'tableRow';
	/* small typo, media captions */
	compact?: boolean;
	/* small typo, no avatar attributedTo */
	compactAttributedTo?: boolean;
	/* content is paginated, not collapsed */
	contentPaginated?: boolean;
	/* if not compact, visible lines of collapsed content */
	contentLines?: number;
	/* if not compact, visible lines of collapsed content */
	summaryLines?: number;
	/* is in a details tag */
	hasDetails?: boolean;
	/* details are opened */
	isOpen?: boolean;
	/* attributions position, top or bottom, default top */
	attributedToPosition?: 'top' | 'bottom';
	/* maximum number of items, default 1000 */
	max?: number;
	/* max. manual items per “page”, normally calculated */
	itemsPerPage?: number;
	/* hover animation for scroller, grayscale -> colors, default true */
	desaturateScroll?: boolean;
	/* location options */
	locationIsDetails?: boolean;
	locationHasMap?: boolean;
	locationHasOnline?: boolean;
	/* larger location font */
	largeLocation?: boolean;
	/* larger date font */
	largeDate?: boolean;
	/** label for read more content */
	moreLabel?: 'read'|'readMore'|'view'|'viewMore'|string;
	/* when details are opened */
	onToggle?: (isOpen: boolean) => any;
	/* when all images have loaded */
	onLoad?: () => any;
	/* when clicking an image */
	onClick?: (img: AsObjectNormalized) => any;
	/** onClick for dates */
	onDate?: (date: Date | false, index: number|false) => any;
	/** onClick for locations */
	onLocation?: (location: AsObjectNormalized | false, index: number|false) => any;
	onFocusPrevious?: () => any;
	onLocale?: (locale: string) => any;

	isImageCaption?: boolean;
	colored?: boolean;
	dateOpenIndex?: number | false;
	locationOpenIndex?: number | false;
	attributionsByline?: RenderResult;

	transformContent?: (node: RenderResult) => RenderResult;
}

export interface CaptionIcache {
	focusKey: string;
	currentLocale: {locale: string, rtl?: boolean};
}

const icache = createICacheMiddleware<CaptionIcache>();
const factory = create({ theme, focus, icache, i18nActivityPub })
	.properties<CaptionProperties>()
	.children<RenderResult | undefined>();

export const coveredLD = [
	'@context', '@type', 'id', 'key', 'hasAttachment', 'type', 'name', 'nameMap',
	'summary', 'summaryMap', 'content', 'contentMap', 'location', 'attributedTo',
	'attachment', 'sensitive', 'locale', 'locales'
];
export const Caption = factory(function Caption({
	middleware: { theme, focus, icache, i18nActivityPub },
	properties,
	children
}) {
	const { get, set, getOrSet } = icache;
	const themedCss = theme.classes(css);
	const viewDesktopCSS = theme.viewDesktopCSS();

	const {
		attributionsByline, locale: currentLocale, compact = false, compactAttributedTo = false, hasDetails = false,
		isOpen = false, dateOpenIndex = false, locationOpenIndex = false, size = 'm', view = 'column', colored = false,
		largeLocation = false, locationIsDetails = false, locationHasOnline = false, locationHasMap = true,
		largeDate = false, isImageCaption = false, contentPaginated = false, color,
		moreLabel, transformContent, attributedToPosition = 'top', contentLines: cl, summaryLines: sl,
		onToggle, onFocusPrevious, onDate, onLocation, onLocale
	} = properties();
	const {
		href = '', name: n = ([] as string[]), summary: s = ([] as string[]), content, sensitive, attachment, ...ld
	} = i18nActivityPub.normalized();
	const omit = i18nActivityPub.omit();
	const [locale, locales] = [i18nActivityPub.get(), i18nActivityPub.getLocales()];
	getOrSet('currentLocale', currentLocale ? {locale: currentLocale} : locale);
	const name = n || [href];
	if (ld.type.indexOf('Place') > -1) {console.log('locales',locales)}

	const [isColumn, isResponsive, isRow] = [(view === 'column'), (view === 'responsive'), (view === 'row')];
	let [vp, isMini, typoClass] = [size, false, viewCss.typo];
	if (isResponsive) {
		isMini = (isRow && ((vp as any) === 'micro' || vp === 'xs' || vp === 's')) || (!isRow && ((vp as any) === 'micro' || vp === 'xs'));
		typoClass = isMini ? ui.s : (vp === 'l' || vp === 'xl' ? ui.l : ui.m);
	} else if (!!compact) {
		typoClass = ui.s
	}

	const contentLines = compact || isRow ? cl||2 : cl||12;
	const nameNode = <Name compact={compact} name={name} isRow={isRow} size={!vp || (vp as any) === 'micro' ? 'xs' : (vp as any)} />;
	const hasContent = (s && s.length) || (content && content.length);

	const dates = getLdDates(ld);
	const hasDate = (!omit.has('date') && !!dates.length && !!dates[0]);
	const hasLocation = (!omit.has('location') && !!ld.location && !!ld.location.length);
	const has1Meta = hasDate !== hasLocation;

	const summaryLength = (!!n && !!n.length && !!n[0].length && !!content && !!content.length && !!content[0].length) ? 500 :
		((!!n && !!n.length && !!n[0].length) || (!!content && !!content.length && !!content[0].length) ? 750 : 1000);


	// const clampedSummary = s.map((_s) => {console.log(_s); return clampStrings(_s, summaryLength) });
	// console.log('clampedSummary',clampedSummary)
	const summaries = s.reduce((a: string[], _s: string) => {
		clampStrings(_s, summaryLength).forEach((_a) => {a = a.concat(_a)});
		return a
	}, []);
	const summaryLines = compact || isRow ? sl||4 : sl||8;
	const summary: string[] = [];
	!!summaries && Array.isArray(summaries) && summaries.map((s: string) => {
		if (typeof s !== 'string' || !s.length) { return [] }
		const lines = s.split(/\r?\n/);
		lines.reduce((a: any[],l,i) => {
			if (!i || a[a.length-1].length === summaryLines) { a.push([]) }
			a[a.length-1].push(l);
			return a
		}, [])
		.map((a) => summary.push(a.join('\n')))
	});

	const attributionsClasses = [
		themedCss.attributions,
		!!ld.attributedTo && ld.attributedTo.length === 1 ? themedCss.singleAttributions : void 0
	];

	const nodes = <div classes={[themedCss.captionWrapper, !!(children().length) && themedCss.hasChildren]}>
		{children()}
		{!!locales && locales.length > 1 && !omit.has('locales') && !has1Meta &&
			<div classes={themedCss.locales}>
				<Locales size="s" key="locales" locale={get('currentLocale')||{locale:'en'}} locales={locales} onValue={(l) => {
					i18nActivityPub.setLocale(l);
					onLocale && onLocale(l)
				}} />
			</div>
		}
		{!omit.has('name') && <div key="name" classes={themedCss.columnName}>{nameNode}</div>}
		<div key="contentWrapper" classes={[themedCss.contentWrapper, viewCss.content, !!viewDesktopCSS && viewDesktopCSS.content]}>
			{!omit.has('name') && <div classes={themedCss.rowName}>{nameNode}</div>}

			{summary && !omit.has('summary') && !sensitive && <div classes={themedCss.summary}>
				<Paginated key="paginatedsummary" colored={colored} compact={compact} property="summary" spaced={summary.length>1 ? 'left' : true}>
					{summary.map((s, i) => <span><MD classes={[themedCss.summary, typoClass]} key={`summary${i}`} content={s} /></span>)}
				</Paginated>
			</div>}
			{!omit.has('attributedTo') && attributedToPosition === 'bottom' && <AttributedTo key="attributions" {...ld}
				compact={compactAttributedTo}
				byline={attributionsByline}
				classes={{ '@redaktor/widgets/actors': { root: attributionsClasses } }}
				max={39}
			/>}
			{!!content && !omit.has('content') && !contentPaginated &&
				<Collapsed color={color} responsive={!isRow} lines={contentLines} label={moreLabel} classes={
					{ '@redaktor/widgets/collapsed': { root: [themedCss.contentCollapsed] } }
				}>
					{content.map((_content: string, i: number) => <virtual>
						<MD classes={[themedCss.content, typoClass]} key={`content${i}`} content={_content} />
						<hr />
					</virtual>)}
				</Collapsed>
			}
			{!!content && !omit.has('content') && !!contentPaginated &&
				<Paginated key="paginatedcontent" solid colored={colored} compact={compact} property="content">
					{clampStrings(content, 9999).map((s) => <p>{content.map((s: string, i: number) =>
						<MD classes={[themedCss.summary, typoClass]} key={`content${i}`} content={transformContent ? transformContent(s) : s} />)}
					</p>)}
				</Paginated>
			}
		</div>
	</div>
// location -> 	() => { set('focusKey', 'date'); focus.focus(); } / date focus={get('focusKey') === 'date' ? focus.shouldFocus : void 0}
	const localesClasses = !has1Meta ? void 0 : { '@redaktor/widgets/details': { summary: [themedCss.dense] } };
	const allNodes = <virtual>
		<span key="meta" classes={[themedCss.meta, !!has1Meta && themedCss.meta1]}>
			{!!locales && locales.length > 1 && !omit.has('locales') && !!has1Meta &&
				<div classes={themedCss.locales}>
					<Locales key="locales"
						size="s"
						classes={localesClasses}
						locale={get('currentLocale')||{locale:'en'}}
						locales={locales} onValue={(l) => {
							i18nActivityPub.setLocale(l);
							onLocale && onLocale(l)
						}}
					/>
				</div>
			}
			{!omit.has('date') && <Dates key="date" {...ld}
				classes={{ '@redaktor/widgets/locationsDates': { root: [themedCss.dates] } }}
				large={largeDate}
				hasCalendar={true}
				dateOpenIndex={dateOpenIndex}
				onFocusPrevious={onFocusPrevious}
				onDate={(date, i) => { onDate && onDate(date, i) }}
			/>}
			{!omit.has('location') && <Location key="location" {...ld}
				classes={{ '@redaktor/widgets/locationsDates': {
					root: [themedCss.location],
					moreCount: [themedCss.moreCount]
				} }}
				large={largeLocation}
				isDetails={locationIsDetails}
				hasOnline={locationHasOnline}
				hasMap={locationHasMap}
				locationOpenIndex={locationOpenIndex}
				onFocusPrevious={onFocusPrevious}
				onLocation={(location, i) => { onLocation && onLocation(location, i) }}
			/>}
		</span>

		{!omit.has('attributedTo') && attributedToPosition === 'top' && <AttributedTo key="attributions" {...ld}
			compact={compactAttributedTo}
			byline={attributionsByline}
			classes={{ '@redaktor/widgets/actors': { root: attributionsClasses } }}
			max={39}
		/>}

		{ !hasDetails ? nodes : (
				!hasContent ? <div classes={[themedCss.contentDetailsSummary, themedCss.muted]}>{name ? name[0] : ''}</div> :
				<details key="details" classes={themedCss.contentDetails} open={isOpen} ontoggle={
					(evt: MouseEvent<HTMLDetailsElement>) => {
						onToggle && onToggle(evt.target.open)
					}
				}>
					<summary key="summary" classes={themedCss.contentDetailsSummary}>
						<Icon type="info" spaced="right" /> {name ? name[0] : 'info'}
					</summary>
					{nodes}
				</details>
		)}

		{attachment && !omit.has('attachment') && <virtual>
			<Attachment attachment={attachment} isRow={isRow} />
		</virtual>}
	</virtual>

	const rootClasses = [themedCss.pageCaption, viewCss.pageCaption, attributedToPosition === 'bottom' && themedCss.attributedToBottom];
	return isImageCaption ? <figcaption key="root" classes={rootClasses}>
		{allNodes}
	</figcaption> : <div key="divroot" classes={rootClasses}>
		{allNodes}
	</div>
});

export default Caption;
