import { create, tsx } from '@dojo/framework/core/vdom';
import theme, { ThemeProperties } from '../middleware/theme';
import { formatAriaProperties } from '../common/util';
import { ActivityPubObject, ActivityPubImage, ActivityPubLink } from '../common/interfaces';
import { normalizeActivityPub } from '../common/activityPubUtil';
import Img, { ImgProperties } from '../image/image';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/icon.m.css';
import * as baseCss from '../common/styles/base.m.css';

export type IconType = keyof typeof css;
export type ApIconType = (ActivityPubImage | ActivityPubLink);

export interface IconProperties extends ThemeProperties {
	/** An optional, visually hidden label for the icon */
	altText?: string;
	/** Custom aria attributes */
	aria?: { [key: string]: string | null };
	icon?: ApIconType[];
	/** Icon type if no ActivityPub `icon` property, e.g. Place, downIcon, searchIcon, etc. */
	type: IconType | ActivityPubObject['type'];

	maxWidth?: string | number;
	maxHeight?: string | number;
}

const factory = create({ theme }).properties<IconProperties>();

export const Icon = factory(function Icon({ properties, middleware: { theme } }) {
	const {
		aria = { hidden: 'true' },
		type: t,
		altText,
		maxWidth,
		maxHeight
	} = properties();
	const { icon } = normalizeActivityPub(properties() as any);

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
		type = types.map((_type) => {
			if (typeof _type !== 'string') { return 'object' as CssKey }
			const lowT = _type.toLowerCase();
			return themedCss.hasOwnProperty(_type) ? (_type as CssKey) :
				(themedCss.hasOwnProperty(lowT) ? (lowT as CssKey) : 'object' as CssKey)
		});
	}

	const getIconByType = (_type: CssKey) => (<span classes={themedCss.root}>
			<i
				classes={[
					theme.variant(),
					theme.sized(ui, 'l'),
					theme.spaced(ui),
					theme.colored(colors),
					themedCss.icon,
					themedCss[_type]
				]}
				{...formatAriaProperties(aria)}
			>
			{_type === 'mapOSM' && [1,2,3,4,5,6,7,8,9,10].map(() => <span />)}
			{_type === 'redaktorLogo' && [1,2,3].map(() => <span />)}
		</i>
		{altText ? <span classes={baseCss.visuallyHidden}>{altText}</span> : null}
	</span>);

	const getIcon = (_icon: ApIconType) => (
		<span classes={[themedCss.root, themedCss.img, theme.sized(ui, 'l')]}>
			<Img
				aspectRatio="square"
				fit="contain"
				{..._icon}
				{..._img}
			/>
		</span>);

	/* 1 icon||type OR up to 9 icon||type (animated = crossfading) OR more w. indicator */
	return <virtual>
		{(!!icon ? (icon.length === 1 || icon.length > 9 ? getIcon(icon[0]) :
			<div classes={themedCss.slide}>
				{icon.map(getIcon)}
			</div>
		) : (type.length === 1 || type.length > 9 ? getIconByType(type[0]) :
			<div classes={themedCss.slide}>
				{type.map(getIconByType)}
			</div>
		))}

	</virtual>
});

export default Icon;
