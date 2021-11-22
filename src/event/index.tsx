import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { AsObject, AsObjectNormalized } from '../common/interfaces';
import { clampStrings } from '../common/activityPubUtil';
import i18nActivityPub from '../middleware/i18nActivityPub';
import theme from '../middleware/theme';
import breakpoints from '../middleware/breakpoint';
import Paginated from '../paginated';
import Caption from '../caption';
import Images from '../images';
import Img, { getWH } from '../image/image';
// import * as ui from '../theme/material/_ui.m.css';
import * as viewCSS from '../theme/material/_view.m.css';
import * as css from '../theme/material/event.m.css';
/* TODO ISSUE in /images */
export interface EventProperties extends AsObject {
	view?: 'responsive' | 'column' | 'row' | 'tableRow';
	fullscreen?: boolean;
	fit?: boolean;
	editable?: boolean;
	/** `id` set on the root DOM node */
	widgetId?: string;
	/* show summary and content, default true */
	hasContent?: boolean;
	/* show images and attachments, default true */
	hasAttachment?: boolean;
	/* when main image has loaded */
	onLoad?: () => any;
	/* when entering fullscreen */
	onFullscreen?: () => any;

	onMouseEnter?: (evt: MouseEvent) => any;
	onMouseLeave?: (evt: MouseEvent) => any;
}

export interface EventIcache {
	currentLocale: {locale: string, rtl?: boolean};
	brightnessClass: string;
}
export interface EventChildren {
	/** Optional Header */
	timeWrapper?: RenderResult;
	/** Optional Footer */
	footer?: RenderResult;
}

const icache = createICacheMiddleware<EventIcache>();
const factory = create({ icache, i18nActivityPub, theme, breakpoints })
	.properties<EventProperties>()
	.children<EventChildren | RenderResult | undefined>();

export const Event = factory(function Event({
	middleware: { icache, i18nActivityPub, theme, breakpoints /*, resource */ },
	properties
}) {
	const themedCss = theme.classes(css);

	const {
		fullscreen, widgetId, mediaType, onMouseEnter, onMouseLeave, onLoad, onFullscreen,
		fit = false, hasContent = true, hasAttachment = true, view = 'column'
	} = properties();

	const {
		startTime, endTime, published, updated, duration,
		'dc:created': contentCreated = [],
		'schema:dateCreated': dateCreated = [],
		'schema:contentReferenceTime': contentReferenceTime = [],
		'schema:expires': expires = [],
		...ld
	} = i18nActivityPub.normalized<EventProperties>();
/*
	if (ld.type.indexOf('Event') < 0) {
		return ''
	}
*/
	const { name, image = [] } = ld;

	if (view === 'tableRow') {
		return 'TODO'
	}

	const viewDesktopCSS = theme.viewDesktopCSS();
	let vp = 'm' ;
	if (view === 'responsive') {
		const {breakpoint = 's'} = breakpoints.get('measure')||{};
		vp = breakpoint;
	}

	const hasImage = !!image.length;
	let img;
	let fitContain = true;
	let aspectRatio = 1;
	if (!!hasImage) {
		img = image[0];
		if (typeof img === 'string') { img = {type: ['Image'], url: img} }
		const {width = 0, height = 0} = getWH(img as AsObjectNormalized);
		aspectRatio = (!width || !height ? 0 : width/height)
		fitContain = aspectRatio < 1.16;
	}
	const addLines = [
		1.25, 1.3333, 1.5, 1.6, 1.7777, 2.2857, 2.6666, 3, 4.5
	].reduce((n, ar, i) => aspectRatio > ar ? i+1 : n, 0);
	/*
	m9by2 10
	.m16by5 8
	.m3by1 8
	.m8by3 7
	.m21by9 6
	.m16by7 6
	.m37by20 5
	.m16by9 5
	.m16by10 4
	.m3by2 3
	.m4by3 2
	.m5by4 1
	*/

	const getTimeNode = (xsdDate: string, isEndTime = false) => {
		const key = isEndTime ? 'endTime' : 'startTime';
		const jsNow = new Date();
		const jsDate = xsdDate ? new Date(xsdDate) : void 0;
		if (!jsDate) { return '' }
		const locShortMonth = new Intl.DateTimeFormat([i18nActivityPub.get().locale, 'en'], {
			month: 'short'
		}).format(jsDate);
		const [curYear, curMonth, curDate] = [jsNow.getFullYear(), jsNow.getMonth(), jsNow.getDate()];
		const [year = 0, month = 0, date = 0] = [jsDate.getFullYear(), jsDate.getMonth(), jsDate.getDate()];
		const isSameYear = curYear === year;
		const isSameMonth = !!isSameYear && curMonth === month;
		const isSameDate = !!isSameYear && !!isSameMonth && curDate === date;
		const isPast = Date.parse(xsdDate) < jsNow.getTime();
		const timeNode = <time key={key} classes={themedCss.time} datetime={xsdDate}>
			<h1 classes={[themedCss.day, isSameDate && themedCss.sameDate, isPast && themedCss.pastDate]}>
				{date}
			</h1>
			<span>
				<br />
				<h4 classes={[themedCss.month, isSameMonth && themedCss.sameMonthYear, isPast && themedCss.pastDate]}>
					{locShortMonth}
				</h4>
				<br />
				<p classes={[themedCss.year, isSameYear && themedCss.sameMonthYear, isPast && themedCss.pastDate]}>
					{year}
				</p>
			</span>
		</time>;
		return !isEndTime ? timeNode : <virtual>
			<hr classes={[themedCss.until, isPast && themedCss.pastDate]} />
			{timeNode}
		</virtual>
	}

	const isEndSameDateThanStart = !!startTime && !!endTime && startTime.split('T')[0] === endTime.split('T')[0];
	const isWideDate = !!startTime && !!endTime && !![startTime.split('-'),endTime.split('-')]
		.filter((splits) => splits.length > 2 && splits[2].length === 2).length;
console.log('Event render', addLines);
	return <div
		key="root"
		classes={[
			themedCss.root,
			isWideDate && themedCss.wideDate,
			theme.variant(),
			// isColumn ? themedCss.column : themedCss.row,
			viewCSS.item,
			!!viewDesktopCSS && viewDesktopCSS.item,
			theme.shaped(themedCss),
			theme.uiSize(),
			theme.uiColor("red"),
			theme.uiElevation(),
			theme.animated(themedCss)
		]}
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
		aria-label="Image"
		role="region"
	>
		<div classes={themedCss.header}>
			<div classes={themedCss.timeWrapper}>
				{!!startTime && getTimeNode(startTime)}
				{!!endTime && !isEndSameDateThanStart && getTimeNode(endTime, true)}
			</div>
			<div classes={themedCss.nameWrapper}>
				<small classes={themedCss.timeRelative}>in 3 Tagen</small>
				{name && <Paginated key="name" property="name" spaced={false}>
					{clampStrings(name, 124).map((s) => <h3>{s}</h3>)}
				</Paginated>}
			</div>
		</div>
		{img && <div classes={[
			themedCss.imageWrapper,
			aspectRatio < 0.75 && themedCss.left,
			!!fitContain && themedCss.max,
			!!fitContain && viewCSS.m7by6,
			!!fitContain && !!viewDesktopCSS && viewDesktopCSS.item,
			!!fitContain && !!viewDesktopCSS && viewDesktopCSS.m7by6
		]}>
			<Img {...img}
				baselined={!fitContain}
				fit={fitContain ? 'contain' : false}
				align={aspectRatio < 0.75 ? 'left' : 'right'}
			/>
		</div>}
		<Caption {...(ld)} colored contentLines={3+addLines} omitProperties={['name']} />
		{hasAttachment && image &&
			<Images
				key="images"
				itemsPerPage={1}
				view={view}
				size={(vp as any)}
				{...ld}
				image={image}
			/>
		}
	</div>
});

export default Event;
