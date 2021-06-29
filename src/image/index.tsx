import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import i18nActivityPub from '../middleware/i18nActivityPub';
import theme from '../middleware/theme';
import breakpoints from '../middleware/breakpoint';
import { clampStrings } from '../common/activityPubUtil';
import { ActivityPubObjectNormalized } from '../common/interfaces';
import Paginated from '../paginated';
import Collapsed from '../collapsed';
import Name from '../name';
import AttributedTo from '../attributedTo';
import Img, { ImgProperties } from './image';
// import Icon from '../icon';
import MD from '../MD/';
import bundle from './nls/Image';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as columns from '../theme/material/_columns.m.css';
import * as css from '../theme/material/image.m.css';

export interface ImageProperties extends ImgProperties {
	view?: 'responsive' | 'column' | 'row' | 'tableRow';
	editable?: boolean;
	/** `id` set on the root DOM node */
	widgetId?: string;
	/* show summary and content, default true */
	hasContent?: boolean;
	/* show images and attachments, default true */
	hasAttachment?: boolean;
}

export interface ImageIcache {
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

/* TODO
	blurhash output image if noJS and CSS accordingly
*/

export const Image = factory(function Image({
	middleware: { icache, i18nActivityPub, theme, breakpoints /*, resource */ },
	properties,
	children
}) {
	const themedCss = theme.classes(css);
	const { messages } = i18nActivityPub.localize(bundle); /* TODO click to enlarge ... */
	const {
		alt, title, editable, fullscreen, onMouseEnter, onMouseLeave, onLoad, onFullscreen,
		blurhash, widgetId, mediaType, loading = 'lazy', crossorigin = 'anonymous', baselined = false,
		fit = false, width = 80, height = 80, hasContent = true, hasAttachment = true, view = 'column', ..._rest
	} = i18nActivityPub.normalized();

	const APo: ActivityPubObjectNormalized = _rest;
	if (APo.type.indexOf('Image') < 0 && (!mediaType || mediaType.toLowerCase().indexOf('image') !== 0)) {
		return ''
	}

	const handleDownload = () => {
		/* TODO - all variants */
  }

	const [isColumn, isResponsive, isRow] = [(view === 'column'), (view === 'responsive'), (view === 'row')];
	let [isMini, vp, typoClass] = [false, 'm', isRow ? themedCss.rowTypo : themedCss.columnTypo];
	if (isResponsive) {
		const {breakpoint: vp = 's'} = breakpoints.get('measure')||{};
		isMini = (isRow && (vp === 'micro' || vp === 'xs' || vp === 's')) || (!isRow && (vp === 'micro' || vp === 'xs'));
		typoClass = isMini ? ui.s : (vp === 'l' || vp === 'xl' ? ui.l : ui.m);
	}
	const viewCSS = theme.viewCSS();
	const viewDesktopCSS = theme.viewDesktopCSS();

	const namesNode = (<div classes={themedCss.name}>
			<Name name={APo.name} isRow={isRow} size={!vp || vp === 'micro' ? 'xs' : (vp as any)} />
	</div>);
	const summaryNode = (APo.summary && <Paginated key="summary" property="summary" classes={{
			'@redaktor/widgets/paginated': { root: [themedCss.summaryPaginated] }
		}}
	>
		{clampStrings(APo.summary, 500).map((_summary, i) =>
			<MD classes={[themedCss.summary, isResponsive ? typoClass : columns.typo]} key={`summary${i}`} content={_summary} />
		)}
	</Paginated>);

	return <div
		key="root"
		classes={[
			theme.variant(),
			themedCss.root,
			isColumn ? themedCss.column : themedCss.row,
			!!viewCSS && viewCSS.item,
			!!viewCSS && viewCSS.baselined,
			!!viewDesktopCSS && viewDesktopCSS.item,
			!!viewDesktopCSS && viewDesktopCSS.baselined,
			theme.shaped(themedCss),
			theme.sized(ui),
			theme.colored(colors),
			theme.elevated(ui),
			theme.animated(themedCss),
			themedCss[(vp as keyof typeof themedCss)],
			icache.get('brightnessClass'),
			!!APo.sensitive && themedCss.sensitive,
			!!fit && themedCss.fit
		]}
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
		aria-label="Image"
		role="region"
	>
		<div classes={themedCss.measure} key="measure" />
		<Img {...properties()} onBrightness={(o) => {
			icache.getOrSet('brightnessClass', o.brightness > 120 ? themedCss.lightImage : themedCss.darkImage)
		}} />
		{APo.sensitive && summaryNode}
		{hasAttachment && <div key="images" classes={themedCss.images}>
			... images
		</div>}
		{hasContent && <virtual>
			{!isRow && namesNode}
			<div classes={themedCss.attributions}>
				<AttributedTo {...APo} max={39} />
			</div>
			<div classes={themedCss.contentWrapper}>
				{!!isRow && namesNode}
				{summaryNode}
				{
					APo.content && <Collapsed responsive={!isRow} lines={isRow ? 2 : 12} classes={{
							'@redaktor/widgets/collapsed': { root: [themedCss.contentCollapsed] }
						}}>
						{APo.content.map((_content, i) => <virtual>
							<MD classes={[themedCss.content, isResponsive ? typoClass : columns.typo]} key={`content${i}`} content={_content} /><hr />
						</virtual>)}
					</Collapsed>
				}
			</div>
		</virtual>}

		{hasAttachment && <p key="attachment" classes={themedCss.attachment}>
				... attachment
			</p>}
	</div>

});

export default Image;
