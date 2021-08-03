import { tsx, create } from '@dojo/framework/core/vdom';
import has from '@dojo/framework/core/has';
import { ActivityPubObject } from '../common/interfaces';
import id from '../middleware/id';
import theme, { ViewportProperties } from '../middleware/theme';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { normalizeActivityPub } from '../common/activityPubUtil';
import Icon from '../icon';
import Img from '../image/image';
// import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/images.m.css';

export { ImgProperties } from '../image/image';
export interface ImagesProperties extends ActivityPubObject, ViewportProperties {
	baselined?: boolean;
	view?: 'column' | 'row' | 'full'
	/* navigation position, top or bottom, default top */
	navPosition?: 'top' | 'bottom';
	/* maximum number of items, default 1000 */
	max?: number;
	/* max. manual items per “page”, normally calculated */
	itemsPerPage?: number;
	/* when all images have loaded */
	onLoad?: () => any;
	/* when clicking an image */
	onClick?: (img: ActivityPubObject) => any;
}

export interface ImagesIcache {
	l: any;
	paginated: any[];
	lightImages: boolean[];
	loaded: number[];
	currentPage: number;
}
const icache = createICacheMiddleware<ImagesIcache>();
const factory = create({ icache, id, theme }).properties<ImagesProperties>();

export const Images = factory(function Images({
	middleware: { icache, id, theme },
	properties
}) {
	const { get, set, getOrSet } = icache;
	const themedCss = theme.classes(css);
	const viewCSS = theme.viewCSS();
	const viewDesktopCSS = theme.viewDesktopCSS();
	const {
		image = [], view = 'column', size = 'm', navPosition = 'top',
		max = 1000, baselined = true, itemsPerPage, onLoad, onClick
	} = normalizeActivityPub(properties());
	if (!image.length) { return '' }
	const [isColumn, isRow, isFull] = [(view === 'column'), (view === 'row'), (view === 'full')];
	const idBase = id.getId('images');
	const maxImages = image.slice(0,max+1);
	const mLength = maxImages.length;


	let itemCount = itemsPerPage || (isRow ? 12 : 8);
	if (!!mLength && !itemsPerPage && !isRow) {
		if (mLength < 7) { itemCount = mLength }
		const a = (mLength < 81) ? [6,7,8,9] : (mLength < 101 ? [8,9,10,11] : [10,11,12,13,14]);
		itemCount = a.sort((a, b) => (mLength % a) > (mLength % b) ? 1 : 0)[0];
	}
	// console.log(window.screen.width)
	// console.log(isRow ? 'row':'column', itemCount);

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
	const ratioClasses = (quotient: number, isManualRow = false) => !quotient ? [] :
		(quotient < 1 && (isRow || isManualRow) ?
			[ themedCss.m1by1, themedCss.fix1by1 ] :
			[ ratios.reduce((a, b) => Math.abs(b[0] - quotient) < Math.abs(a[0] - quotient) ? b : a)[1] ].reduce((a, s) => {
				if (itemCount === 1 && isColumn && !isManualRow) {
					a.push(viewCSS && viewCSS[s]);
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
		const lights = icache.get('lightImages');
		return !!lights && !!lights[i] ? themedCss.lightImage : themedCss.darkImage;
	}

	return <virtual>
		<noscript><i classes={themedCss.noscript} /></noscript>
		<div
			key="root"
			classes={[
				themedCss.root,
				isColumn ? themedCss.column : themedCss.row,
				navPosition === 'bottom' && themedCss.navBottom,
				(!!has('host-node') || allLoaded) && themedCss.loaded,
				(maxImages.length > itemCount) && themedCss.hasPagination,
				itemCount === 1 ? themedCss.singleItem : themedCss.multiItem,
				(itemCount === 2 || itemCount === 3) && view !== 'full' && themedCss.singleRow,
				themedCss[(size as keyof typeof themedCss)]
			]}
			style={`--count: ${itemCount};`}
			aria-label="Images"
			role="region"
		>

		{paginated.map((imagePage: any, i: number, a: any[]) => {
			const count = paginated.length && paginated[i].length || 0;
			const wasLoaded = count === (get('loaded') as any)[i];

			return <virtual>
				{(maxImages.length > itemCount) &&
					<virtual>
						<input
							type="radio"
							classes={[themedCss.pageRadio, !paginationInputsVisible && themedCss.hidden]}
							id={`${idBase}_${i}`}
							name={`${idBase}_images`}
							data-i={`${i+1}`}
							checked={i === get('currentPage')}
							onclick={() => { setPage(i) }}
						/>
						{<label key={`prev_${i}`}
							for={!i ? `${idBase}_${a.length-1}` : `${idBase}_${i-1}`}
							classes={[themedCss.prevControl, !i && themedCss.firstControl, isLight(i)]}
							onclick={() => { setPage(!i ? a.length-1 : i-1) }}
						>
							<Icon size="xl" type="left" />
						</label>}
						{<label key={`next_${i}`}
							for={i === a.length-1 ? `${idBase}_0` : `${idBase}_${i+1}`}
							classes={[themedCss.nextControl, i === a.length-1 && themedCss.lastControl, isLight(i)]}
							onclick={() => { setPage(i === a.length-1 ? 0 : i+1) }}
						>
							<Icon size="xl" type="right" />
						</label>}
					</virtual>
				}
				{(!has('host-node') && i !== get('currentPage') && !wasLoaded) ? '' :
					<div key={`page${i}`} classes={[ themedCss.page, isLight(i) ]}>
						{imagePage.map((img: any, j: number) => {
							if (typeof img === 'string') { img = {type: ['Image'], url: img} }
							return <div classes={[
								themedCss.media,
								...(ratioClasses(!img.width || !img.height ? 0 : img.width/img.height))
							]} key={`image${j}`}>
								<Img
									{...img}
									focalPoint={void 0}
									onLoad={loadedImg}
									onClick={onClick && onClick(img)}
									onBrightness={(o) => {
										const lightImages = icache.get('lightImages') || paginated.map(() => false);
										lightImages[i] = o.brightness > 120;
										icache.set('lightImages', lightImages);
									}}
								/>
							</div>
						})}
					</div>
				}
			</virtual>
		})}
		{view !== 'row' && itemsPerPage === 1 && <div key="scrollWrapper" classes={[themedCss.scrollWrapper, themedCss.snap]}>
			{maxImages.map((img: any, i: number) => {
				if (typeof img === 'string') { img = {type: ['Image'], url: img} }
				return <label key={`to_${i}`}
					for={`${idBase}_${i}`}
					classes={[themedCss.media, ...(ratioClasses(!img.width || !img.height ? 0 : img.width/img.height, true))]}
				>
					<Img {...img} onClick={() => {}} />
				</label>
			})}
		</div>}
		{!paginationInputsVisible &&
			<p classes={themedCss.pageInfo}>{(get('currentPage')||0)+1} / {paginated.length}</p>
		}
		</div>
	</virtual>
});

export default Images;
