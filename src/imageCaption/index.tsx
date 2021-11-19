import { tsx, create } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import focus from '@dojo/framework/core/middleware/focus';
import { AsObject, AsObjectNormalized } from '../common/interfaces';
import i18nActivityPub from '../middleware/i18nActivityPub';
import theme, { ViewportProperties } from '../middleware/theme';
import { clampStrings } from '../common/activityPubUtil';
import Locales from '../locales';
import MD from '../MD/';
import Dates from '../date';
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

export interface ImageCaptionProperties extends AsObject, ViewportProperties {
	baselined?: boolean;
	editable?: boolean;
	view?: 'responsive' | 'column' | 'row' | 'tableRow';
	/* small typo, media captions */
	compact?: boolean;
	/* is in a details tag */
	hasDetails?: boolean;
	/* details are opened */
	isOpen?: boolean;
	/* navigation position, top or bottom, default top */
	navPosition?: 'top' | 'bottom';
	/* maximum number of items, default 1000 */
	max?: number;
	/* max. manual items per “page”, normally calculated */
	itemsPerPage?: number;
	/* hover animation for scroller, grayscale -> colors, default true */
	desaturateScroll?: boolean;
	/* show summary and content for itemsPerPage=1, default true */
	hasContent?: boolean;
	/* show attachments, default true */
	hasAttachment?: boolean;
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
	dateOpenIndex?: number | false;
	locationOpenIndex?: number | false;
}

export interface ImageCaptionIcache {
	focusKey: string;
	currentLocale: {locale: string, rtl?: boolean};
}

const icache = createICacheMiddleware<ImageCaptionIcache>();
const factory = create({ theme, focus, icache, i18nActivityPub }).properties<ImageCaptionProperties>().children();

export const ImageCaption = factory(function ImageCaption({
	middleware: { theme, focus, icache, i18nActivityPub },
	properties,
	children
}) {
	const { get, set, getOrSet } = icache;
	const themedCss = theme.classes(css);
	const viewDesktopCSS = theme.viewDesktopCSS();

	const {
		locale: currentLocale, compact = false, hasDetails = false, isOpen = false,
		dateOpenIndex = false, locationOpenIndex = false, size = 'm', view = 'column',
		onToggle, onFocusPrevious, onDate, onLocation
	} = properties();
	const {
		href = '', name: n, summary, content, sensitive, attachment, ...rest
	} = i18nActivityPub.normalized();

	const [locale, locales] = [i18nActivityPub.get(), i18nActivityPub.getLocales()];
	getOrSet('currentLocale', currentLocale ? {locale: currentLocale} : locale);
	const name = n || [href];

	const [isColumn, isResponsive, isRow] = [(view === 'column'), (view === 'responsive'), (view === 'row')];
	let [vp, isMini, typoClass] = [size, false, viewCss.typo];
	if (isResponsive) {
		isMini = (isRow && (vp === 'micro' || vp === 'xs' || vp === 's')) || (!isRow && (vp === 'micro' || vp === 'xs'));
		typoClass = isMini ? ui.s : (vp === 'l' || vp === 'xl' ? ui.l : ui.m);
	} else if (!!compact) {
		typoClass = ui.s
	}

	const nameNode = <Name compact={compact} name={name} isRow={isRow} size={!vp || vp === 'micro' ? 'xs' : (vp as any)} />;
	const hasContent = (summary && summary.length) || (content && content.length);
	const summaryLength = (!!n && !!n.length && !!n[0].length && !!content && !!content.length && !!content[0].length) ? 500 :
		((!!n && !!n.length && !!n[0].length) || (!!content && !!content.length && !!content[0].length) ? 750 : 1000);

	const attributionsClasses = [
		themedCss.attributions,
		!!rest.attributedTo && rest.attributedTo.length === 1 ? themedCss.singleAttributions : void 0
	];
	const nodes = <div classes={themedCss.captionWrapper}>
		{!!locales && locales.length > 1 &&
			<Locales locale={get('currentLocale')||{locale:'en'}} locales={locales} onValue={(l) => {
				i18nActivityPub.setLocale(l)
			}} />
		}
		<div classes={themedCss.columnName}>{nameNode}</div>
		<div classes={[themedCss.contentWrapper, viewCss.content, !!viewDesktopCSS && viewDesktopCSS.content]}>
			<div classes={themedCss.rowName}>{nameNode}</div>
			{!sensitive && (summary && <Paginated compact={compact} key="summary" property="summary">
				{clampStrings(summary, summaryLength).map((_summaries, i) => <span>
					{_summaries.map((s: any) => <MD classes={[themedCss.summary, typoClass]} key={`summary${i}`} content={s} />)}
				</span>)}
			</Paginated>)}
			{
				content && <Collapsed responsive={!isRow} lines={compact || isRow ? 2 : 12} classes={
					{ '@redaktor/widgets/collapsed': { root: [themedCss.contentCollapsed] } }
				}>
					{content.map((_content: string, i: number) => <virtual>
						<MD classes={[themedCss.content, typoClass]} key={`content${i}`} content={_content} />
						<hr />
					</virtual>)}
				</Collapsed>
			}
		</div>
	</div>
// location -> 	() => { set('focusKey', 'date'); focus.focus(); }
	return <figcaption key="root" classes={[themedCss.pageCaption, viewCss.pageCaption]}>
		{children()}

		<span key="meta" classes={[themedCss.meta]}>
			<Dates key="date" {...rest}
				focus={get('focusKey') === 'date' ? focus.shouldFocus : void 0}
				classes={{ '@redaktor/widgets/locationsDates': { root: [themedCss.dates] } }}
				hasCalendar={true}
				dateOpenIndex={dateOpenIndex}
				onFocusPrevious={onFocusPrevious}
				onDate={(date, i) => { onDate && onDate(date, i) }}
			/>
			<Location key="location" {...rest}
				classes={{ '@redaktor/widgets/locationsDates': { root: [themedCss.location] } }}
				hasMap={true}
				locationOpenIndex={locationOpenIndex}
				onFocusPrevious={onFocusPrevious}
				onLocation={(location, i) => { onLocation && onLocation(location, i) }}
			/>
		</span>

		<AttributedTo key="attributions" {...rest}
			classes={{ '@redaktor/widgets/actors': { root: attributionsClasses } }}
			max={39}
		/>

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

		{attachment && <hr classes={viewCss.hrAttachment} />}
		{attachment && <Attachment attachment={attachment} isRow={isRow} />}
	</figcaption>

});

export default ImageCaption;
