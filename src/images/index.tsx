import { tsx, create, node } from '@dojo/framework/core/vdom';
import { ActivityPubObject } from '../common/interfaces';
import theme, { ThemeProperties} from '../middleware/theme';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { normalizeActivityPub } from '../common/activityPubUtil';
import Image from '../image';
// import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/images.m.css';

export interface ImagesProperties extends ActivityPubObject, ThemeProperties {
	isRow?: boolean;
	/* when all images have loaded */
	onLoad?: () => any;
	/* when clicking an image */
	onClick?: (img: ActivityPubObject) => any;
}

export interface ImagesIcache {
	imageCount: number;
	imageLoaded: number;
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
	const { image = [], isRow = false, size = 'm', onLoad, onClick } = normalizeActivityPub(properties());
console.log(image);
	getOrSet('imageCount', 7); /* TODO : children.length when it becomes a module !!! */
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
		console.log('Yay, loaded images',get('imageLoaded'));
		!CSS.supports('grid-template-rows', 'masonry') && resizeAllGridItems();
		onLoad && onLoad()
	}

	return <div
		key="root"
		classes={[
			themedCss.root,
			isRow && themedCss.row,
			themedCss[(size as keyof typeof themedCss)]
		]}
		aria-label="Images"
		role="region"
	>
		{image.map((img: any, i: number) => {
			console.log(img);
			if (typeof img === 'string') { img = {type: 'Image', url: img} }
			return <Image key={`image${i}`} {...img} hasContent={false} hasControls={false} hasAttachment={false} />
		})}
	</div>

});

export default Images;
