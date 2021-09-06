import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { ActivityPubObject, ActivityPubObjectNormalized } from '../common/interfaces';
import i18nActivityPub from '../middleware/i18nActivityPub';
import theme from '../middleware/theme';
import breakpoints from '../middleware/breakpoint';
import Images from '../images';
// import * as ui from '../theme/material/_ui.m.css';
import * as viewCSS from '../theme/material/_view.m.css';
import * as css from '../theme/material/image.m.css';
/* TODO ISSUE in /images */
export interface ImageProperties extends ActivityPubObject {
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

export interface ImageIcache {
	currentLocale: {locale: string, rtl?: boolean};
	brightnessClass: string;
}
export interface ImageChildren {
	/** Optional Header */
	header?: RenderResult;
	/** Optional Footer */
	footer?: RenderResult;
}

const icache = createICacheMiddleware<ImageIcache>();
const factory = create({ icache, i18nActivityPub, theme, breakpoints })
	.properties<ImageProperties>()
	.children<ImageChildren | RenderResult | undefined>();

export const Image = factory(function Image({
	middleware: { icache, i18nActivityPub, theme, breakpoints /*, resource */ },
	properties
}) {

	const themedCss = theme.classes(css);
	const {
		fullscreen, widgetId, mediaType, onMouseEnter, onMouseLeave, onLoad, onFullscreen,
		fit = false, hasContent = true, hasAttachment = true, view = 'column', ..._rest
	} = i18nActivityPub.normalized();

	const APo: ActivityPubObjectNormalized = _rest;
	if (APo.type.indexOf('Image') < 0 && (!mediaType || mediaType.toLowerCase().indexOf('image') !== 0)) {
		return ''
	}
	if (view === 'tableRow') {
		return 'TODO'
	}
	const allImages = !hasAttachment ? APo.image :
		[{...(properties() as any), focalPoint: void 0, baselined: false}].concat(APo.image);

	/* TODO - all image variants/sizes
	const handleDownload = () => {

  }
	*/
	const viewDesktopCSS = theme.viewDesktopCSS();
	let vp = 'm' ;
	if (view === 'responsive') {
		const {breakpoint = 's'} = breakpoints.get('measure')||{};
		vp = breakpoint;
	}

console.log('IMAGE render');
	return <div
		key="root"
		classes={[
			theme.variant(),
			themedCss.root,
			// isColumn ? themedCss.column : themedCss.row,
			viewCSS.item,
			!!viewDesktopCSS && viewDesktopCSS.item,
			theme.shaped(themedCss),
			theme.uiSize(),
			theme.uiColor(),
			theme.uiElevation(),
			theme.animated(themedCss),
			themedCss[(vp as keyof typeof themedCss)],
			icache.get('brightnessClass'),
			// hasAttachment && !!APo.image && APo.image.length > 0 && themedCss.hasImages,
			!!APo.sensitive && themedCss.sensitive,
			!!fit && themedCss.fit
		]}
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
		aria-label="Image"
		role="region"
	>
		<div classes={themedCss.measure} key="measure" />

		{hasAttachment && APo.image &&
			<Images
				key="images"
				itemsPerPage={1}
				view={view}
				size={(vp as any)}
				image={allImages}
			/>
		}

	</div>

});

export default Image;
