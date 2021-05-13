import { tsx, create, node } from '@dojo/framework/core/vdom';
import has from '@dojo/framework/core/has';
import { ActivityPubObject } from '../common/interfaces';
import { uuid } from '@dojo/framework/core/util';
import theme, { ViewportProperties} from '../middleware/theme';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { normalizeActivityPub } from '../common/activityPubUtil';
import Icon from '../icon';
import Image from '../image';
// import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/images.m.css';

export interface ImagesProperties extends ActivityPubObject, ViewportProperties {
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
	idBase: string;
	imageCount: number;
	imageLoaded: number;
	currentPage: number;
}
const icache = createICacheMiddleware<ImagesIcache>();

const factory = create({
	icache,
	node,
	theme
}).properties<ImagesProperties>();

export const Images = factory(function Images({
	middleware: { icache, node, theme },
	properties
}) {
	const { get, set, getOrSet } = icache;
	const themedCss = theme.classes(css);
	const {
		image = [], isRow = false, size = 'm', max = 1000, itemsPerPage = 8, onLoad, onClick
	} = normalizeActivityPub(properties());
	const maxImage = image.slice(0,max+1);
	const mLength = maxImage.length;
	const paginatedImage = [];
	for (let i = 0; i<mLength; i+=itemsPerPage) {
    paginatedImage.push(maxImage.slice(i,i+itemsPerPage));
	}
	getOrSet('idBase', uuid(), false);
	getOrSet('imageCount', Math.min(itemsPerPage, mLength), false);
	getOrSet('currentPage', 0, false);
	getOrSet('imageLoaded', 0);

	const loadedImg = () => {
		const count = get('imageCount')||0;
		const loaded = get('imageLoaded')||0;
		set('imageLoaded', loaded+1, (loaded >= count-1))
	}
	const resizeGridItem = (i: number) => {
		const [grid, item, img] = [node.get('root'), node.get(`image${i}`), node.get(`img${i}`)];
		if (!item || !grid || !img) { return }
		const getProp = (name: string) => parseInt(window.getComputedStyle(grid).getPropertyValue(name), 10);
		const [rowHeight, rowGap] = [getProp('grid-auto-rows'), getProp('grid-row-gap')];
		item.style.gridRowEnd = `span ${Math.floor(((img as any).height+rowGap)/(rowHeight+rowGap))}`;
	}
	const resizeAllGridItems = () => {
		const l = get('imageCount')||0;
		for(let n = 0; n < l; n++){
			resizeGridItem(n);
		}
	}
	if (get('imageCount') === get('imageLoaded')) {
		!CSS.supports('grid-template-rows', 'masonry') && !isRow && resizeAllGridItems();
		onLoad && onLoad()
	}

	return <virtual>
		<noscript><i /></noscript>
		<div
			key="root"
			classes={[
				themedCss.root,
				isRow && themedCss.row,
				(maxImage.length > itemsPerPage) && themedCss.hasPagination,
				themedCss[(size as keyof typeof themedCss)]
			]}
			aria-label="Images"
			role="region"
		>

		{paginatedImage.map((imagePage: any, i: number) => {
			return <virtual>
				<input
					type="radio"
					classes={themedCss.pageRadio}
					id={`${get('idBase')}_${i}`}
					name={`${get('idBase')}_images`}
					checked={i === get('currentPage')}
					onclick={() => { set('currentPage', i) }}
				/>
				{(maxImage.length > itemsPerPage) &&
					<div key={`controls${i}`} classes={[themedCss.controls]}>
						{<label
							for={!i ? `${get('idBase')}_${paginatedImage.length-1}` : `${get('idBase')}_${i-1}`}
							classes={[themedCss.prevControl, !i && themedCss.firstControl]}
							onclick={() => { set('currentPage', !i ? paginatedImage.length-1 : i-1) }}
						>
							<Icon size="xl" type="left" />
						</label>}
						{<label
							for={i === paginatedImage.length-1 ? `${get('idBase')}_0` : `${get('idBase')}_${i+1}`}
							classes={[themedCss.nextControl, i === paginatedImage.length-1 && themedCss.lastControl]}
							onclick={() => { set('currentPage', i === paginatedImage.length-1 ? 0 : i+1) }}
						>
							<Icon size="xl" type="right" />
						</label>}
					</div>
				}
				{(!!has('host-browser') && i !== get('currentPage')) ? '' : <div key={`page${i}`} classes={[themedCss.page]}>
					{imagePage.map((img: any, j: number) => {
						if (typeof img === 'string') { img = {type: 'Image', url: img} }
						return <Image
							key={`image${j}`}
							{...img}
							baselined={false}
							hasContent={false}
							hasAttachment={false}
							onLoad={loadedImg}
							onClick={onClick && onClick(img)}
						/>
					})}
				</div>}
			</virtual>
		})}
		</div>
	</virtual>
});

export default Images;
