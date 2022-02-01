import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { AsObject } from '../common/interfaces';
import i18nActivityPub from '../middleware/i18nActivityPub';
import theme from '../middleware/theme';
import breakpoints from '../middleware/breakpoint';
import Caption, { coveredLD as captionCoveredLD } from '../caption';
import Images from '../images';
// import * as ui from '../theme/material/_ui.m.css';
import * as viewCSS from '../theme/material/_view.m.css';
import * as css from '../theme/material/image.m.css';

export interface NoteProperties extends AsObject {
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

export interface NoteIcache {
	currentLocale: {locale: string, rtl?: boolean};
	brightnessClass: string;
}
export interface NoteChildren {
	/** Optional Header */
	header?: RenderResult;
	/** Optional Footer */
	footer?: RenderResult;
}

/* ? location, date, generator, icon,
url -> to full
context within which the object exists - e.g. all activities relating to a common project or event // stack
preview Identifies an entity that provides a preview of this object.

tag
schema further
*/

const icache = createICacheMiddleware<NoteIcache>();
const factory = create({ icache, i18nActivityPub, theme, breakpoints })
	.properties<NoteProperties>()
	.children<NoteChildren | RenderResult | undefined>();

export const Note = factory(function note({
	middleware: { icache, i18nActivityPub, theme, breakpoints /*, resource */ },
	properties
}) {
	const themedCss = theme.classes(css);

	const {
		fullscreen, widgetId, mediaType, onMouseEnter, onMouseLeave, onLoad, onFullscreen,
		fit = false, hasAttachment = true, view = 'column'
	} = properties();
	const ld = i18nActivityPub.normalized<NoteProperties>();
	const { type, image = [] } = ld;
	if (type.indexOf('Note') < 0 && (!mediaType || mediaType.toLowerCase().indexOf('image') !== 0)) {
		return ''
	}
	if (view === 'tableRow') {
		return 'TODO'
	}
	const allImages = !hasAttachment ? image :
		[{...(ld as any), focalPoint: void 0, baselined: false}].concat(image);

	// console.log('Image all', allImages);
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

console.log('NOTE render');
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
			// hasAttachment && !!image && image.length > 0 && themedCss.hasImages,
			!!ld.sensitive && themedCss.sensitive,
			!!fit && themedCss.fit
		]}
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
		role="region"
	>
		<div key="measure" classes={themedCss.measure} />
		<Caption {...(ld)}
			compact colored
			contentLines={(!ld.name || !ld.name.length) && (!ld.summary || !ld.summary.length) ? 12 :
				(!ld.name || !ld.name.length || !ld.summary || !ld.summary.length ? 10 : 8)}
			omitProperties={['date','location','attachment']}
			attributedToPosition="bottom"
			classes={{
				'@redaktor/widgets/images': {
					captionWrapper: [themedCss.nomargin],
					columnName: [themedCss.negativemargin],
					attributions: [themedCss.negativemargin]
				}
			}}
			onLocale={(l) => i18nActivityPub.setLocale(l)}
		/>
		{hasAttachment && !!allImages.length &&
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

export default Note;
