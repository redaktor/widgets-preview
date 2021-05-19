import { tsx, create, node } from '@dojo/framework/core/vdom';
import has from '@dojo/framework/core/has';
import { ActivityPubObject } from '../common/interfaces';
import { uuid } from '@dojo/framework/core/util';
import theme, { ViewportProperties} from '../middleware/theme';
import breakpoints from '../middleware/breakpoint';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { normalizeActivityPub } from '../common/activityPubUtil';
import Icon from '../icon';
import Image from '../image';
// import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/images.m.css';

export interface ImagesProperties extends ActivityPubObject, ViewportProperties {
	baselined?: boolean;
	isRow?: boolean;
	/* maximum number of items, default 1000 */
	max?: number;
	/* max. items per “page”, default 10 */
	itemsPerPage?: number;
	/* when all images have loaded */
	onLoad?: () => any;
	/* when clicking an image */
	onClick?: (img: ActivityPubObject) => any;
}

export interface ImagesIcache {
	l: any;
	idBase: string;
	paginated: any[];
	loaded: number[];
	currentPage: number;
}
const icache = createICacheMiddleware<ImagesIcache>();

const factory = create({
	icache,
	node,
	breakpoints,
	theme
}).properties<ImagesProperties>();

export const Images = factory(function Images({
	middleware: { icache, node, breakpoints, theme },
	properties
}) {
	const { get, set, getOrSet } = icache;
	const themedCss = theme.classes(css);
	const {
		image = [], isRow = false, size = 'm', max = 1000, itemsPerPage = 8, baselined = true,
		onLoad, onClick
	} = normalizeActivityPub(properties());
	if (!image.length) { return '' }

	const maxImage = image.slice(0,max+1);
	const mLength = maxImage.length;
	if (!get('paginated')) {
		const paginatedImage: any[] = [];
		for (let i = 0; i<mLength; i+=itemsPerPage) {
	    paginatedImage.push(maxImage.slice(i,i+itemsPerPage));
		}
		getOrSet('paginated', paginatedImage, false);
		getOrSet('loaded', paginatedImage.map(() => 0), false);
	}
	getOrSet('idBase', uuid(), false);
	getOrSet('currentPage', 0, false);
	getOrSet('l', theme.line(), false);

	const {contentRect: dim = {height: 0}} = breakpoints.get('root')||{};
	const lineCount = !get('l') ? 0 : ((dim && dim.height)||0) / get('l');
	const mml = !get('l') || !baselined ? 0 : (Math.max(0, Math.ceil(lineCount)) - lineCount);

	const loadedImg = () => {
		const current = get('currentPage') || 0;
		const paginated = get('paginated') || [];
		const count = paginated.length && paginated[current].length || 0;
		const loaded = get('loaded') || [];
		loaded[current]++;
		set('loaded', loaded, (loaded[current] >= count))
	}
	const resizeGridItem = (page: number, i: number) => {
		const [grid, item] = [node.get(`page${page}`), node.get(`image${i}`)];
		if (!grid || !item || !item.firstChild) { return }
		const getProp = (name: string) => parseInt(window.getComputedStyle(grid).getPropertyValue(name), 10);
		const [rowHeight, rowGap] = [getProp('grid-auto-rows'), getProp('grid-row-gap')];
		item.style.gridRowEnd = `span ${Math.ceil(((item.firstChild as any).offsetHeight||0+rowGap)/(rowHeight+rowGap))}`;
	}
	const resizeAllGridItems = () => {
		const current = get('currentPage') || 0;
		const paginated = get('paginated') || [];
		const l = paginated[current].length || 0;
		console.log(current, paginated, l);
		for(let n = 0; n < l; n++){
			resizeGridItem(current, n);
		}
	}
	const setPage = (i: number) => {
		set('currentPage', i);
	}

	const current = get('currentPage') || 0;
	const paginated = get('paginated') || [];
	const count = paginated.length && paginated[current].length || 0;
	const allLoaded = count === (get('loaded') as any)[current];
	if (!(get('loaded') as any)[current]) {
		!CSS.supports('grid-template-rows', 'masonry') && !isRow && resizeAllGridItems();
		onLoad && onLoad()
	}

	const paginationInputsVisible = !(paginated.length > 9 || size === 's' && paginated.length > 8 ||
		size === 'xs' && paginated.length > 7 || size === 'micro' && paginated.length > 6);

	return <virtual>
		<noscript><i /></noscript>
		<div
			key="root"
			classes={[
				themedCss.root,
				isRow && themedCss.row,
				(!!has('host-node') || allLoaded) && themedCss.loaded,
				(maxImage.length > itemsPerPage) && themedCss.hasPagination,
				themedCss[(size as keyof typeof themedCss)]
			]}
			aria-label="Images"
			role="region"
			style={`--mml: ${mml};`}
		>

		{paginated.map((imagePage: any, i: number, a: any[]) => {
			const count = paginated.length && paginated[i].length || 0;
			const wasLoaded = count === (get('loaded') as any)[i];

			return <virtual>
				{(maxImage.length > itemsPerPage) &&
					<virtual>
						<input
							type="radio"
							classes={[themedCss.pageRadio, !paginationInputsVisible && themedCss.hidden]}
							id={`${get('idBase')}_${i}`}
							name={`${get('idBase')}_images`}
							data-i={`${i+1}`}
							checked={i === get('currentPage')}
							onclick={() => { setPage(i) }}
						/>
						{<label key={`prev_${i}`}
							for={!i ? `${get('idBase')}_${a.length-1}` : `${get('idBase')}_${i-1}`}
							classes={[themedCss.prevControl, !i && themedCss.firstControl]}
							onclick={() => { setPage(!i ? a.length-1 : i-1) }}
						>
							<Icon size="xl" type="left" />
						</label>}
						{<label key={`next_${i}`}
							for={i === a.length-1 ? `${get('idBase')}_0` : `${get('idBase')}_${i+1}`}
							classes={[themedCss.nextControl, i === a.length-1 && themedCss.lastControl]}
							onclick={() => { setPage(i === a.length-1 ? 0 : i+1) }}
						>
							<Icon size="xl" type="right" />
						</label>}
					</virtual>
				}
				{(!has('host-node') && i !== get('currentPage') && !wasLoaded) ? '' :
					<div key={`page${i}`} classes={[themedCss.page]} style={`--count: ${itemsPerPage};`}>
						{imagePage.map((img: any, j: number) => {
							if (typeof img === 'string') { img = {type: ['Image'], url: img} }
							return <div key={`image${j}`}><Image
								{...img}
								baselined={false}
								hasContent={false}
								hasAttachment={false}
								onLoad={loadedImg}
								onClick={onClick && onClick(img)}
							/></div>
						})}
					</div>
				}
			</virtual>
		})}
		{!paginationInputsVisible &&
			<p classes={themedCss.pageInfo}>{(get('currentPage')||0)+1} / {paginated.length}</p>
		}
		</div>
	</virtual>
});

export default Images;
