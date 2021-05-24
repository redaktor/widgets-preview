import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { uuid } from '@dojo/framework/core/util';
import { clampStrings } from '../common/activityPubUtil';
import { ActivityPubObjectNormalized } from '../common/interfaces';
import theme from '../middleware/theme';
import breakpoints from '../middleware/breakpoint';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import i18n from '@dojo/framework/core/middleware/i18n';
import { normalizeActivityPub } from '../common/activityPubUtil';
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
import * as css from '../theme/material/image.m.css';

export interface ImageProperties extends ImgProperties {
	isRow?: boolean;
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
const factory = create({
	icache,
	i18n,
	theme,
	breakpoints
})
	.properties<ImageProperties>()
	.children<ImageChildren | RenderResult | undefined>();

/* TODO
	blurhash output image if noJS and CSS accordingly
*/

export const Image = factory(function Image({
	middleware: { icache, i18n, theme, breakpoints /*, resource */ },
	properties,
	children
}) {
	const themedCss = theme.classes(css);
	const { messages } = i18n.localize(bundle);
	const {
		alt, title, editable, fullscreen, onMouseEnter, onMouseLeave, onLoad, onFullscreen,
		blurhash, loading = 'lazy', crossorigin = 'anonymous', widgetId = uuid(), mediaType, baselined = true,
		fit = false, width = 80, height = 80, hasContent = true, hasAttachment = true, isRow = false, ..._rest
	} = normalizeActivityPub(properties());

	const APo: ActivityPubObjectNormalized = _rest;
	if (APo.type.indexOf('Image') < 0 && (!mediaType || mediaType.toLowerCase().indexOf('image') !== 0)) {
		return ''
	}

	const handleDownload = () => {
		/* TODO - all variants */
  }
	const {breakpoint: vp = 's'} = breakpoints.get('measure')||{};
	const isMini = (isRow && (vp === 'micro' || vp === 'xs' || vp === 's')) || (!isRow && (vp === 'micro' || vp === 'xs'));
	const typoClass = isMini ? ui.s : (vp === 'l' || vp === 'xl' ? ui.l : ui.m);

	const namesNode = (<div classes={themedCss.name}>
			<Name name={APo.name} isRow={isRow} size={!vp || vp === 'micro' ? 'xs' : (vp as any)} />
	</div>);
	const summaryNode = (APo.summary && <Paginated key="summary" property="summary" classes={{
			'@dojo/widgets/paginated': { root: [themedCss.summaryPaginated] }
		}}
	>
		{clampStrings(APo.summary, 500).map((_summary, i) =>
			<MD classes={[themedCss.summary, typoClass]} key={`summary${i}`} content={_summary} />
		)}
	</Paginated>);

	return <div
		key="root"
		classes={[
			theme.variant(),
			themedCss.root,
			isRow && themedCss.row,
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
							'@dojo/widgets/collapsed': { root: [themedCss.contentCollapsed] }
						}}>
						{APo.content.map((_content, i) => <virtual>
							<MD classes={[themedCss.content, typoClass]} key={`content${i}`} content={_content} /><hr />
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
