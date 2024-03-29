import { RenderResult } from '@dojo/framework/core/interfaces';
import { tsx, create } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import focus from '@dojo/framework/core/middleware/focus';
import has from '@dojo/framework/core/has';
import { AsObject, AsObjectNormalized } from '../common/interfaces';
import id from '../middleware/id';
import i18nActivityPub from '../middleware/i18nActivityPub';
import theme, { ViewportProperties } from '../middleware/theme';
import { getLdDates } from '../date/util';
import Icon from '../icon';
import Calendar from '../calendar';
import Map from '../map';
import Caption from '../caption';
import Img, { getWH } from '../image/image';
import ldBundle from '../_ld/redaktor/nls/redaktor';
import bundle from './nls/Image';
import * as viewCSS from '../theme/material/_view.m.css';
// import * as uiCSS from '../theme/material/_ui.m.css';
import * as css from '../theme/material/images.m.css';

export interface ImageChildren {
	/** Optional Header */
	header?: RenderResult;
	/** Optional Footer */
	footer?: RenderResult;
}

export { ImgProperties } from '../image/image';
export interface ImagesProperties extends AsObject, ViewportProperties {
	baselined?: boolean;
	editable?: boolean;
	view?: 'responsive' | 'column' | 'row' | 'tableRow' | 'full';
	/* navigation position, top or bottom, default top */
	navPosition?: 'top' | 'bottom';
	/* maximum number of items, default 1000 */
	max?: number;
	/* max. manual items per “page”, normally calculated */
	itemsPerPage?: number;
	/* hover animation for scroller, grayscale -> colors, default 'column' */
	desaturateScroll?: boolean | 'column' | 'row';
	/* show summary and content for itemsPerPage=1, default true */
	hasContent?: boolean;
	/* show attachments, default true */
	hasAttachment?: boolean;
	/* open caption details, default false */
	captionsOpen?: boolean;
	/* when all images have loaded */
	onLoad?: () => any;
	/* when clicking an image */
	onClick?: (img: AsObjectNormalized) => any;
	/* elevated, default false */
	isAProot?: boolean;
}

export interface ImagesIcache {
	l: any;
	paginated: any[];
	lightImages: boolean[];
	loaded: number[];
	currentPage: number;
	brightnessClass: string;
	focusKey: string;

	captionsOpen: boolean;
	calendarOpen: false | Date;
	mapOpen: false | AsObjectNormalized;
	mapWasOpen: boolean;
	map: any;
	mapView: any;
	dateOpenIndex?: number | false;
	locationOpenIndex?: number | false;
}

const icache = createICacheMiddleware<ImagesIcache>();
const factory = create({ icache, id, theme, focus, i18nActivityPub }).properties<ImagesProperties>();

/* TODO
	blurhash output image if noJS and CSS accordingly

	<Icon type="link" spaced="right" />{!!imagePage[0].name ? imagePage[0].name : ''}</p>
	--> NAME from href ???
*/

export const Images = factory(function Images({
	middleware: { icache, id, theme, focus, i18nActivityPub },
	properties
}) {
	const { get, set, getOrSet } = icache;
	const themedCss = theme.classes(css);
	const viewDesktopCSS = theme.viewDesktopCSS();
	const { messages } = i18nActivityPub.localize(bundle); /* TODO click to enlarge ... */

	const {
		itemsPerPage: ipp, view = 'column', size = 'm', navPosition = 'top',
		desaturateScroll = 'column', max = 1000, hasContent = true, hasAttachment = true,
		captionsOpen = false, isAProot = false, onLoad, onClick,
		onMouseEnter, onMouseLeave, onFullscreen, omitProperties
		// fit = false, width = 80, height = 80
	} = properties();
	const { image = [], ...ld } = i18nActivityPub.normalized<ImagesProperties>();
	const omit = i18nActivityPub.omit();

	const itemsPerPage = image.length === 1 ? 1 : ipp;

	if (!image.length) {
		return ''
	}
	const handleDownload = () => {
		/* TODO - all image variants/sizes */
	}

	const [isColumn, isResponsive, isRow] = [(view === 'column'), (view === 'responsive'), (view === 'row')];
	const idBase = id.getId('images');
	const maxImages = image.slice(0,max+1);
	const mLength = maxImages.length;

	let itemCount = itemsPerPage || (isRow ? 12 : 8);
	if (!!mLength && !itemsPerPage && !isRow) {
		if (mLength < 7) { itemCount = mLength }
		const a = (mLength < 81) ? [6,7,8,9] : (mLength < 101 ? [8,9,10,11] : [10,11,12,13,14]);
		itemCount = a.sort((a, b) => (mLength % a) > (mLength % b) ? 1 : 0)[0];
	}

	if (!get('paginated')) {
		const paginatedImages: any[] = [];
		for (let i = 0; i<mLength; i+=itemCount) {
	    paginatedImages.push(maxImages.slice(i,i+itemCount));
		}
		getOrSet('paginated', paginatedImages, false);
		getOrSet('loaded', paginatedImages.map(() => 0), false);
	}
	getOrSet('currentPage', 0, false);
	getOrSet('mapWasOpen', false, false);
	getOrSet('calendarOpen', false, false);
	getOrSet('captionsOpen', captionsOpen, false);
	getOrSet('dateOpenIndex', false, false);
	getOrSet('locationOpenIndex', false, false);

	const scrollWrapperId = id.getId('scrollWrapper');
	const loadedImg = () => {
		const current = get('currentPage') || 0;
		const paginated = get('paginated') || [];
		const count = paginated.length && paginated[current].length || 0;
		const loaded = get('loaded') || [];
		loaded[current]++;
		set('loaded', loaded, (loaded[current] >= count))
	}

	const setCalendar = (date: Date|false, dateOpenIndex: number|false) => {
		date !== false && set('mapOpen', false, false);
		date !== false && set('locationOpenIndex', false);
		set('dateOpenIndex', dateOpenIndex, false);
		set('calendarOpen', date);
	}
	const setMap = (location: AsObjectNormalized|false,	locationOpenIndex: number|false) => {
		location !== false && set('calendarOpen', false, false);
		location !== false && set('dateOpenIndex', false);
		set('locationOpenIndex', locationOpenIndex, false);
		set('mapWasOpen', true, false);
		set('mapOpen', location);
		const view = get('mapView');
		if (view) {
			view.setActivityPub(location);
		}
	}
	const setPage = (i: number, setLocation = true, focusPrefix?: 'prev'|'next') => {
		set('currentPage', i);
		if (focusPrefix) {
			set('focusKey', `${focusPrefix}_${i}`);
    	focus.focus();
		}
		if (setLocation && get('mapOpen') && paginated[i][0].location) {
			setMap({...paginated[i][0].location[0], apType: paginated[i][0].type[0], geoMeta: `location of image ${i}`}, 0); /* TODO i18n */
		}
	}
	const handleKeydown = (i: number, keyTrigger?: 'prev'|'next'|'stack', max?: number) => {
		return (e: KeyboardEvent) => {
			const cur = get('currentPage');
			switch (e.key) {
				case 'Enter':
					if (keyTrigger === 'stack') {
						!!document.activeElement && document.activeElement.getAttribute('for') === scrollWrapperId &&
							(document.activeElement as any).click()
					} else {
						setPage(i, true, keyTrigger)
					}
				break;
				case 'ArrowLeft':
					setPage(!cur ? (max ? max-1 : 0) : cur-1, true, 'prev')
				break;
				case 'ArrowRight':
					setPage(cur === (max ? max-1 : 0) ? 0 : (cur||0)+1, true, 'next')
				break;
				case 'ArrowUp':
					setPage(0)
				break;
			}
		}
	}
	const ratios: [number, any][] = [
		[0.5625,'m9by16'], [0.6666,'m2by3'], [0.75,'m3by4'],
		[0.8,'m4by5'], [0.8571,'m6by7'], [1,'m1by1'],
		[1.1666,'m7by6'], [1.25,'m5by4'], [1.3333,'m4by3'],
		[1.5,'m3by2'], [1.6,'m16by10'], [1.7777,'m16by9'],
		[1.85,'m37by20'], [2.2857,'m16by7'], [2.3333,'m21by9'],
		[2.6666,'m8by3'], [3,'m3by1'], [3.2,'m16by5'], [4.5,'m9by2']
	];
	const ratioClasses = (quotient: number, isMultiRow = false) => !quotient ? [] :
		(quotient < 1 && isMultiRow ?
			[ themedCss.m1by1, themedCss.fix1by1 ] :
			[ ratios.reduce((a, b) => Math.abs(b[0] - quotient) < Math.abs(a[0] - quotient) ? b : a)[1] ].reduce((a, s) => {
				if (itemCount === 1 && isColumn && !isMultiRow) {
					a.push(viewCSS && (viewCSS as any)[s]);
					a.push(viewDesktopCSS && viewDesktopCSS[s]);
				} else {
					a.push((themedCss as any)[s]);
				}
				return a
			}, []));

	const current = get('currentPage') || 0;
	const paginated = get('paginated') || [];
	const count = paginated.length && paginated[current].length || 0;
	const allLoaded = count === (get('loaded') as any)[current];
	if (!!allLoaded) { onLoad && onLoad() }
	const paginationInputsVisible = !(paginated.length > 9 || size === 's' && paginated.length > 8 ||
		size === 'xs' && paginated.length > 7 || (size as any) === 'micro' && paginated.length > 6);

	const isLight = (i: number) => {
		const lights = get('lightImages');
		return !!lights && !!lights[i] ? themedCss.lightImage : themedCss.darkImage;
	}

	const dates = getLdDates(ld, i18nActivityPub.localize(ldBundle).messages);
	const localizedDateShort = new Intl.DateTimeFormat([i18nActivityPub.get().locale, 'en']);

	return <virtual>
		{itemsPerPage === 1 && !omit.has('date') && <div
			role="region"
			aria-label={messages.calendar}
			classes={[themedCss.calendarWrapper, !get('calendarOpen') && themedCss.closed]}
		>
			<div>
				{dates.map((dArray) => {
					const [d, title, x, type] = dArray;
					const date = global.Date.parse(d);
					if (isNaN(date)) { return '' }
					return <virtual>
						<Icon size="xl" title={title} type={type} />
						<br />
						<time classes={themedCss.time} datetime={date}>{localizedDateShort.format(date)}</time>
						<br />
					</virtual>
				})}
			</div>
			<Calendar
				classes={{ '@redaktor/widgets/calendar': { root: [themedCss.calendar] } }}
				weekendDivider={true}
				start={get('calendarOpen') || new Date()}
				onValue={(start, end) => {
					console.log(start, end);
					// icache.set('start', start);
					// icache.set('end', end);
				}}
			/>
		</div>}
		{itemsPerPage === 1 && !omit.has('location') && ld.location && ld.location.length && <div
			role="region"
			aria-label={messages.locationmap}
			classes={[themedCss.mapWrapper, get('mapWasOpen') && !get('mapOpen') && themedCss.closed]}
		>
			{(get('mapWasOpen') || get('mapOpen')) && getOrSet('map', <Map
				key="map"
				{...{type: 'Image', id: image[0].id, image}}
				hasCenterMarker
				hasSearch
				center={get('mapOpen')||void 0}
				zoom={15}
				onView={(view) => {
					set('mapView', view, false);
					setMap(paginated[0][0].location[0], 0);
				}}
				onActivityPubLocation={({pointer}) => {
					const [slash, property, indexStr = '0', ...rest] = pointer.split('/');
					console.log(pointer.split('/'), property, indexStr)
					const index = parseInt(indexStr, 10);
					if (property && !rest.length) {
						switch (property) {
							case 'image':
								setPage(index)
							break;
							/* TODO : attachment */
						}
					}
				}}
				onActivityPubLocationOpen={({id, pointer}) => {
					console.log('onActivityPubLocationOpen', {id, pointer});
					/* TODO : Open as Place */
				}}
			/>)}
		</div>}

		<noscript><i classes={themedCss.noscript} /></noscript>
		<div
			key="root"
			classes={[
				themedCss.root,
				theme.uiColor(),
				theme.uiSize(),
				isAProot && theme.uiElevation(),
				// isColumn ? themedCss.column : themedCss.row,
				navPosition === 'bottom' && themedCss.navBottom,
				(itemCount === 1 || paginated.length > 6 || !paginationInputsVisible) && themedCss.hasCounter,
				(!!has('host-node') || allLoaded) && themedCss.loaded,
				(maxImages.length > itemCount) && themedCss.hasPagination,
				itemCount === 1 ? themedCss.singleItem : themedCss.multiItem,
				image.length === 1 && themedCss.singleImage,
				(itemCount === 2 || itemCount === 3) && view !== 'full' && themedCss.singleRow,
				themedCss[(size as keyof typeof themedCss)]
			]}
			style={`--count: ${itemCount}; --pagecount: ${paginated.length}`}
			aria-label="Images"
			aria-live="polite"
			role="region"
		>
		{hasAttachment && itemsPerPage === 1 && paginated.length > 1 && <virtual>
			<input key={`input_${scrollWrapperId}`}
				tabIndex={-1}
				type="checkbox"
				classes={themedCss.pageRadio}
				id={scrollWrapperId}
			/>
			<label
				tabIndex={0}
				for={scrollWrapperId}
				classes={[themedCss.scrollWrapperLabel]}
				onkeydown={handleKeydown(get('currentPage')||0, 'stack', paginated.length)}
			>
				<Icon type="stack" />
			</label>
			<div key="scrollWrapper" classes={[
				themedCss.scrollWrapper,
				themedCss.snap,
				desaturateScroll && themedCss.desaturateScroll
			]}>
				{maxImages.map((img: any, i: number) => {
					/*
						Note: img.url is an Array (e.g. srcset), but the ratio class will be the same.
						If width or height would be needed for max-width/max-height it must be reduced.
					*/
					if (typeof img === 'string') { img = {type: ['Image'], url: img} }
					const {width, height} = getWH(img);
					return <label key={`to_${i}`}
						for={`${idBase}_${i}`}
						classes={[
							themedCss.media,
							...(ratioClasses(!width || !height ? 0 : width/height, true))
						]}
					>
						<Img {...img} hasSensitiveSwitch={false} onClick={() => {}} />
					</label>
				})}
			</div>
		</virtual>}

		{paginated.map((imagePage: any, i: number, a: any[]) => {
			const count = paginated.length && paginated[i].length || 0;
			const wasLoaded = count === (get('loaded') as any)[i];
			const {width, height} = getWH(imagePage[0]);
			const hasMeta = itemCount === 1 && hasContent && !(omit.has('date') && omit.has('location'));

			return <figure classes={[
				themedCss.figure,
				hasMeta && themedCss.hasMeta,
				navPosition === 'bottom' && themedCss.hasMeta,
				itemCount === 1 && viewCSS.gridItem
			]}>
				{(maxImages.length > itemCount) &&
					<virtual>
						<input key={`input_${i}`}
							tabIndex={-1}
							type="radio"
							classes={themedCss.pageRadio}
							id={`${idBase}_${i}`}
							name={`${idBase}_images`}
							data-i={`${i+1}`}
							checked={i === get('currentPage')}
							onclick={() => { itemCount !== 1 && setPage(i) }}
						/>
						{<label key={`prev_${i}`}
							aria-label={messages.prev}
							focus={get('focusKey') === `prev_${i}` ? focus.shouldFocus : void 0}
							tabIndex={0}
							for={`${idBase}_${!i ? (a.length-1) : (i-1)}`}
							classes={[themedCss.prev, themedCss.control, !i && themedCss.firstControl, isLight(i)]}
							onclick={() => { setPage(!i ? a.length-1 : i-1, true, 'prev') }}
							onkeydown={handleKeydown(!i ? a.length-1 : i-1, 'prev', a.length)}
						>
							<Icon size="xl" type="left" />
						</label>}
						{<label key={`next_${i}`}
							aria-label={messages.next}
							focus={get('focusKey') === `next_${i}` && focus.shouldFocus}
							tabIndex={0}
							for={`${idBase}_${i === a.length-1 ? 0 : (i+1)}`}
							classes={[themedCss.next, themedCss.control, i === a.length-1 && themedCss.lastControl, isLight(i)]}
							onclick={() => { setPage(i === a.length-1 ? 0 : i+1, true, 'next') }}
							onkeydown={handleKeydown(i === a.length-1 ? 0 : i+1, 'next', a.length)}
						>
							<Icon size="xl" type="right" />
						</label>}
					</virtual>}

					<div
						key={`page${i}`}
						data-count={paginated.length > 1 ? `${i+1} / ${paginated.length}` : ''}
						aria-hidden={i !== get('currentPage') ? 'true' : 'false'}
						classes={[
							themedCss.page,
							viewCSS.page,
							!i && themedCss.firstPage,
							imagePage.length === 2 && themedCss.twoItems,
							isLight(i),
							...(itemCount !== 1 ? [] : ratioClasses(!width || !height ? 0 : width/height, false))
						]}
					>
						{imagePage.map((img: any, j: number) => {
							if (typeof img === 'string') { img = {type: ['Image'], url: img} }
							const {width, height} = getWH(img);
							return <div classes={[
									themedCss.media,
									viewCSS.gridMedia,
									...(ratioClasses(!width || !height ? 0 : width/height, isRow && itemCount > 1))
								]}
								key={`imageWrapper${i}_${j}`}
								style={itemCount !== 1 ? void 0 :
									`--maxl: ${Math.max(5, Math.min(
											(Math.floor(window.screen.height / theme.line()) - 5),
											Math.floor((height||4800) / theme.line())
									))}`
								}
							>
								<Img
									{...img}
									key={`image${i}_${j}`}
									baselined={imagePage.length === 2}
									classes={{ '@redaktor/widgets/image': { sensitiveSummary: [themedCss.sensitiveSummary] } }}
									fit={itemCount === 1 ? 'cover' : false}
									focalPoint={void 0}
									onLoad={loadedImg}
									onClick={onClick && onClick(img)}
									onBrightness={(o) => {
										const lightImages = icache.get('lightImages') || paginated.map(() => false);
										lightImages[i] = o.brightness > 120;
										set('lightImages', lightImages);
									}}
								/>
							</div>
						})}
					</div>

					{ itemCount === 1 && hasContent && <Caption isImageCaption {...(imagePage[0])}
						compact
						omitProperties={omitProperties}
						key={`imageCaption${i}`}
						isOpen={ get('captionsOpen') }
						onFocusPrevious={() => { set('focusKey', `next_${current}`); focus.focus(); }}
						onToggle={(isOpen) => { set('captionsOpen', isOpen) }}
						onDate={setCalendar}
						onLocation={setMap}
						dateOpenIndex={get('dateOpenIndex')}
						locationOpenIndex={get('locationOpenIndex')}
					/>}
			</figure> })}
		</div>
	</virtual>
});
/*
<label key="homelabel"
	aria-label={messages.home}
	tabIndex={0}
	for={`${idBase}_0`}
	classes={[themedCss.control, themedCss.homeControl]}
	onclick={() => { setPage(0) }}
	onkeydown={handleKeydown(0)}
>
	<Icon size="xl" type="up" />
</label>

created
	startTime, endTime
published
updated
deleted
*/

export default Images;
