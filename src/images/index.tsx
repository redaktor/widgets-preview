import { RenderResult } from '@dojo/framework/core/interfaces';
import { tsx, create } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import has from '@dojo/framework/core/has';
import { ActivityPubObject, ActivityPubObjectNormalized } from '../common/interfaces';
import id from '../middleware/id';
import i18nActivityPub from '../middleware/i18nActivityPub';
import theme, { ViewportProperties } from '../middleware/theme';
import Icon from '../icon';
import ImageCaption from '../imageCaption';
import Img from '../image/image';
import bundle from './nls/Image';
import * as viewCSS from '../theme/material/_view.m.css';
import * as css from '../theme/material/images.m.css';

export interface ImageChildren {
	/** Optional Header */
	header?: RenderResult;
	/** Optional Footer */
	footer?: RenderResult;
}

export { ImgProperties } from '../image/image';
export interface ImagesProperties extends ActivityPubObject, ViewportProperties {
	baselined?: boolean;
	editable?: boolean;
	view?: 'responsive' | 'column' | 'row' | 'tableRow';
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
	/* when all images have loaded */
	onLoad?: () => any;
	/* when clicking an image */
	onClick?: (img: ActivityPubObjectNormalized) => any;
}

export interface ImagesIcache {
	l: any;
	paginated: any[];
	lightImages: boolean[];
	loaded: number[];
	currentPage: number;
	brightnessClass: string;
}

const icache = createICacheMiddleware<ImagesIcache>();
const factory = create({ icache, id, theme, i18nActivityPub }).properties<ImagesProperties>();

/* TODO
	blurhash output image if noJS and CSS accordingly

	<Icon type="link" spaced="right" />{!!imagePage[0].name ? imagePage[0].name : ''}</p>
	--> NAME from href ???
*/

export const Images = factory(function Images({
	middleware: { icache, id, theme, i18nActivityPub }
}) {
	const { get, set, getOrSet } = icache;
	const themedCss = theme.classes(css);
	const viewDesktopCSS = theme.viewDesktopCSS();
	const { messages } = i18nActivityPub.localize(bundle); /* TODO click to enlarge ... */

	const {
		itemsPerPage,	image = [], view = 'column', size = 'm', navPosition = 'top',
		desaturateScroll = 'column', max = 1000, hasContent = true, hasAttachment = true,
		onLoad, onClick, onMouseEnter, onMouseLeave, onFullscreen, ..._rest
		// fit = false, width = 80, height = 80,

	} = i18nActivityPub.normalized();
	// const APo: ActivityPubObjectNormalized = _rest;

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

	const loadedImg = () => {
		const current = get('currentPage') || 0;
		const paginated = get('paginated') || [];
		const count = paginated.length && paginated[current].length || 0;
		const loaded = get('loaded') || [];
		loaded[current]++;
		set('loaded', loaded, (loaded[current] >= count))
	}
	const setPage = (i: number) => {
		set('currentPage', i);
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
		size === 'xs' && paginated.length > 7 || size === 'micro' && paginated.length > 6);

	const isLight = (i: number) => {
		const lights = get('lightImages');
		return !!lights && !!lights[i] ? themedCss.lightImage : themedCss.darkImage;
	}

/*.row .hasPagination.singleItem */
	return <virtual>
		<noscript><i classes={themedCss.noscript} /></noscript>
		<div
			key="root"
			classes={[
				themedCss.root,
				theme.uiSize(),
				theme.uiColor(),
				theme.uiElevation(),
				// isColumn ? themedCss.column : themedCss.row,
				navPosition === 'bottom' && themedCss.navBottom,
				!paginationInputsVisible && themedCss.hasCounter,
				(!!has('host-node') || allLoaded) && themedCss.loaded,
				(maxImages.length > itemCount) && themedCss.hasPagination,
				itemCount === 1 ? themedCss.singleItem : themedCss.multiItem,
				(itemCount === 2 || itemCount === 3) && view !== 'full' && themedCss.singleRow,
				themedCss[(size as keyof typeof themedCss)],

				itemCount === 1 && viewCSS.gridItem
			]}
			style={`--count: ${itemCount};`}
			aria-label="Images"
			role="region"
		>
		{hasAttachment && itemsPerPage === 1 &&
			<div key="scrollWrapper" classes={[
				themedCss.scrollWrapper,
				themedCss.snap,
				desaturateScroll && themedCss.desaturateScroll
			]}>
				{maxImages.map((img: any, i: number) => {
					if (typeof img === 'string') { img = {type: ['Image'], url: img} }
					return <label key={`to_${i}`}
						for={`${idBase}_${i}`}
						classes={[themedCss.media, ...(ratioClasses(!img.width || !img.height ? 0 : img.width/img.height, true))]}
					>
						<Img {...img} hasSensitiveSwitch={false} onClick={() => {}} />
					</label>
				})}
			</div>
		}

		{paginated.map((imagePage: any, i: number, a: any[]) => {
			const count = paginated.length && paginated[i].length || 0;
			const wasLoaded = count === (get('loaded') as any)[i];
			return <virtual>
				{(maxImages.length > itemCount) &&
					<virtual>
						<input
							type="radio"
							classes={themedCss.pageRadio}
							id={`${idBase}_${i}`}
							name={`${idBase}_images`}
							data-i={`${i+1}`}
							checked={i === get('currentPage')}
							onclick={() => { setPage(i) }}
						/>
						{<label key={`prev_${i}`}
							for={`${idBase}_${!i ? (a.length-1) : (i-1)}`}
							classes={[themedCss.prev, themedCss.control, !i && themedCss.firstControl, isLight(i)]}
							onclick={() => { setPage(!i ? a.length-1 : i-1) }}
						>
							<Icon size="xl" type="left" />
						</label>}
						{<label key={`next_${i}`}
							for={`${idBase}_${i === a.length-1 ? 0 : (i+1)}`}
							classes={[themedCss.next, themedCss.control, i === a.length-1 && themedCss.lastControl, isLight(i)]}
							onclick={() => { setPage(i === a.length-1 ? 0 : i+1) }}
						>
							<Icon size="xl" type="right" />
						</label>}
					</virtual>
				}
				{/* (!has('host-node') && i !== get('currentPage') && !wasLoaded) ? '' : */
					<virtual>
						<div
							key={`page${i}`}
							data-count={`${i+1} / ${paginated.length}`}
							classes={[
								themedCss.page,
								viewCSS.page,
								!i && themedCss.firstPage,
								isLight(i),
								...(itemCount !== 1 ? [] : ratioClasses(!imagePage[0].width || !imagePage[0].height ? 0 : imagePage[0].width/imagePage[0].height, false))
							]}
						>
							{imagePage.map((img: any, j: number) => {
								if (typeof img === 'string') { img = {type: ['Image'], url: img} }
								return <div classes={[
										themedCss.media,
										viewCSS.gridMedia,
										...(ratioClasses(!img.width || !img.height ? 0 : img.width/img.height, isRow && itemCount > 1))
									]}
									key={`image${j}`}
									style={itemCount !== 1 ? void 0 :
										`--maxl: ${Math.max(5, Math.min(
												(Math.floor(window.screen.height / theme.line()) - 5),
												Math.floor((img.height||4800) / theme.line())
										))}`
									}
								>
									<Img
										{...img}
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
						{
							itemCount === 1 && hasContent && <ImageCaption {...(imagePage[0])} />
						}

						{	!!i && itemCount === 1 && hasContent &&
							<label key="homelabel"
								for={`${idBase}_0`}
								classes={[themedCss.control, themedCss.homeControl]}
								onclick={() => { setPage(0) }}
							>
								<Icon size="xl" type="up" />
							</label>
						}
					</virtual>
				}
			</virtual>
		})}
		</div>
	</virtual>
});

export default Images;
