import { create, tsx } from '@dojo/framework/core/vdom';
import theme, { ThemeProperties } from '../middleware/theme';
import { formatAriaProperties } from '../common/util';
import { AsObject, AsImage, AsLink } from '../common/interfaces';
import { normalizeAs } from '../common/activityPubUtil';
import Img, { ImgProperties } from '../image/image';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/icon.m.css';
import * as baseCss from '../common/styles/base.m.css';

export type IconType = keyof typeof css;
export type ApIconType = (AsImage | AsLink);

interface BaseIconProperties extends ThemeProperties {
	/** An optional, visually hidden label for the icon */
	altText?: string;
	/** Custom aria attributes */
	aria?: { [key: string]: string | null };
	/** html title attribute */
	title?: string;
	/** if multiple icons, make a slideshow if count >= value; default = 0 */
	slideshowMin?: number;
	/** maximum width */
	maxWidth?: string | number;
	/** maximum height */
	maxHeight?: string | number;
	/** half width */
	half?: boolean;
}
export interface TypeIconProperties extends BaseIconProperties {
	/** Icon type if no custom as:`icon` property, e.g. Place, downIcon, searchIcon, etc. */
	type: IconType | AsObject['type'];
	icon?: ApIconType[];
}
export interface ApIconProperties extends BaseIconProperties {
	/** Custom as:icon property */
	icon: ApIconType[];
	type?: IconType | AsObject['type'];
}
export type IconProperties = TypeIconProperties | ApIconProperties;

const factory = create({ theme }).properties<IconProperties>();

export const Icon = factory(function Icon({ properties, middleware: { theme } }) {
	const {
		aria = { hidden: 'true' },
		type: t,
		half = false,
		slideshowMin = 0,
		title,
		altText,
		maxWidth,
		maxHeight,
		color
	} = properties();
	const { icon } = normalizeAs(properties() as any);
	const themedCss = theme.classes(css);
	type CssKey = (keyof typeof themedCss);

	let _img: Partial<ImgProperties> = {};
	if (!!maxWidth) { _img = {..._img, maxWidth: `${maxWidth}${typeof maxWidth === 'number' ? 'px' : ''}`} }
	if (!!maxHeight) { _img = {..._img, maxHeight: `${maxHeight}${typeof maxHeight === 'number' ? 'px' : ''}`} }

	let type: (keyof typeof themedCss)[] = [];
	if (!icon || !icon.length) {
		if ((!Array.isArray(t) && typeof t !== 'string') || !t.length) {
			return ''
		}
		const types: string[] = Array.isArray(t) ? t : [t];
		type = [...(new Set(types.map((_type) => {
			if (typeof _type !== 'string') { return 'object' as CssKey }
			const lowT = _type.toLowerCase();
			return themedCss.hasOwnProperty(_type) ? (_type as CssKey) :
				(themedCss.hasOwnProperty(lowT) ? (lowT as CssKey) : 'object' as CssKey)
		})))];
	}

	// TODO
	const slide = true;

	const titleO = !title ? {} : {title};
	const getIconByType = (_type: CssKey, i: number, a: any = []) => {
		const slideClass = slide && !!a.length && (themedCss as any)[`slide${a.length}`];
		return <span {...titleO} classes={[themedCss.root, slideClass]} >
				<i
					classes={[
						theme.variant(),
						theme.sized(ui, 'l'),
						theme.spaced(ui),
						theme.colored(colors),
						!!color && themedCss.colored,
						!!half && themedCss.half,
						themedCss.icon,
						themedCss[_type]
					]}
					{...formatAriaProperties(aria)}
				>
				{_type === 'mapOSM' && [1,2,3,4,5,6,7,8,9,10].map(() => <span />)}
				{_type === 'redaktorLogo' && [1,2,3].map(() => <span />)}
			</i>
			{altText ? <span classes={baseCss.visuallyHidden}>{altText}</span> : null}
		</span>
	}

	const getIcon = (_icon: ApIconType, i: number, a: any = []) => {
		const slideClass = slide && !!a.length && (themedCss as any)[`slide${a.length}`];
		return <span {...titleO} classes={[themedCss.root, slideClass, themedCss.img, theme.sized(ui, 'l')]}>
			<Img
				aspectRatio="square"
				fit="contain"
				{..._icon}
				{..._img}
			/>
		</span>
	}

	/* 1 icon||type OR up to 9 icon||type (animated = crossfading) OR more w. indicator */
	return !!icon ? (icon.length === 1 || icon.length > 9 ? getIcon(icon[0], -1) :
		<div classes={[themedCss.slide, theme.sized(ui, 'l')]}>{icon.map(getIcon)}</div>
	) : (type.length === 1 || type.length > 9 ? getIconByType(type[0], -1) :
		<div classes={[themedCss.slide, theme.sized(ui, 'l')]}>{type.map(getIconByType)}</div>
	)
});

export default Icon;
