import { tsx, create, node } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { uuid } from '@dojo/framework/core/util';
import { clampStrings } from '../common/activityPubUtil';
import { ActivityPubObject, ActivityPubObjectNormalized, ActivityPubLinkObject } from '../common/interfaces';
import theme from '../middleware/theme';
import breakpoints from '../middleware/breakpoint';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import i18n from '@dojo/framework/core/middleware/i18n';
import { normalizeActivityPub } from '../common/activityPubUtil';
import Paginated from '../paginated';
import Collapsed from '../collapsed';
import Srcset from '../srcset';
import AttributedTo from '../attributedTo';
import Blurhash from '../blurhash/';
import Icon from '../icon';
import MD from '../MD/';
import bundle from './nls/Image';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/image.m.css';

export interface ImageProperties extends ActivityPubObject {
	isRow?: boolean;
	editable?: boolean;
	alt?: string;
	title?: string;
	/* crossorigin parameter, default 'anonymous' */
	crossorigin?: 'anonymous' | 'use-credentials';
	/* is Fullscreen */
	fullscreen?: boolean;
	/* snap to baseline, default false */
	baselined?: boolean;
	/** `id` set on the root DOM node */
	widgetId?: string;
	/* blurhash to render as background or as CW-onclick */
	blurhash?: string;
	/* load 'lazy' / when intersecting or 'eager' / directly, default 'lazy' */
	loading?: 'lazy' | 'eager';
	/* when main image has loaded */
	onLoad?: () => any;
	/* when entering fullscreen */
	onFullscreen?: () => any;
	onMouseEnter?: (evt: MouseEvent) => any;
	onMouseLeave?: (evt: MouseEvent) => any;
	/* show audio controls, default true */
	hasControls?: boolean;
	/* show summary and content, default true */
	hasContent?: boolean;
	/* show images and attachments, default true */
	hasAttachment?: boolean;
}

export interface ImageIcache {
	l: any;
	loaded: boolean;
	faded: boolean;
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
	node,
	i18n,
	theme,
	breakpoints
})
	.properties<ImageProperties>()
	.children<ImageChildren | RenderResult | undefined>();

export const Image = factory(function Image({
	middleware: { icache, node, i18n, theme, breakpoints /*, resource */ },
	properties,
	children
}) {
	const { get, set, getOrSet } = icache;
	const themedCss = theme.classes(css);
	const { messages } = i18n.localize(bundle);
	const {
		alt, title, editable, fullscreen, onMouseEnter, onMouseLeave, onLoad, onFullscreen,
		blurhash, loading = 'lazy', crossorigin = 'anonymous', widgetId = uuid(), width = 80, height,
		hasControls = true, hasContent = true, hasAttachment = true, isRow = false, ..._rest
	} = normalizeActivityPub(properties());

	const APo: ActivityPubObjectNormalized = _rest;
	getOrSet('l', theme.line(), false);
	getOrSet('loaded', false, false);
	getOrSet('faded', false, false);

	const handleDownload = () => {
		/* TODO - transkripts / WebVTT
  	fetch(url).then(res => res.blob()).then(blob => {
    	const element   = document.createElement('a');
    	const objectURL = URL.createObjectURL(blob);

    	element.setAttribute('href', objectURL);
    	// element.setAttribute('download', fileNameFromURL(url));
    	document.body.appendChild(element);
    	element.click();
    	document.body.removeChild(element);

    	URL.revokeObjectURL(objectURL);
  	}).catch(err => {
    	console.error(err);
  	});
		*/
  }
	const {breakpoint: vp = 's'} = breakpoints.get('measure')||{};
	const {contentRect: dim = {height: 0}} = breakpoints.get('media')||{};
	// const imagesWH = Math.floor(!get('l') ? 0 : ((measureDim && measureDim.width)||0) / get('l'));

	const lh = !get('l') ? 0 : ((dim && dim.height)||0) / get('l');
	const mml = !get('l') ? 0 : (Math.max(0, Math.ceil(lh)) - lh);
	const isMini = (isRow && (vp === 'micro' || vp === 'xs' || vp === 's')) || (!isRow && (vp === 'micro' || vp === 'xs'));
	const headlineClass = isMini ? ui.h5 : ui.h4;
	const typoClass = isMini ? ui.s : (vp === 'l' || vp === 'xl' ? ui.l : ui.m);
	const audioAvatarSize = vp === 'micro' || vp === 'xs' || vp === 's' ? 'l' : 'xl';

	const imgProps: any = {
		alt: alt || (!!APo.summary && !!APo.summary.length ? APo.summary[0]||'' : ''),
		title,
		loading,
		width,
		height,
		src: (!APo.url ? '' :
		(typeof APo.url[0] === 'object' && !!(APo.url[0] as ActivityPubLinkObject).href) ?
			(APo.url[0] as ActivityPubLinkObject).href : (APo.url[0] as string))||'',
		classes: [
			themedCss.image,
			typoClass
		],
		onload: () => {
			set('loaded',true);
			onLoad && onLoad()
		},
		crossOrigin: 'anonymous'
	};

	const namesPaginated = !APo.name || (!isRow && APo.name.length < 4) ? '' :
		<Paginated property="name">
			{clampStrings(APo.name, 100).map((_name, i) =>
				<h5 key={`name${i}`} classes={[themedCss.name, typoClass]}>{_name}</h5>)}
		</Paginated>;
	const namesNode = <div classes={themedCss.names}>
		{isRow ?
			namesPaginated :
			(APo.name && APo.name.length < 4 ? <header classes={ui.hgroup}>
				{APo.name.length > 1 && <p key={`name1`} classes={[themedCss.kicker, typoClass]}>{APo.name[1]}</p>}
				<h2 key={`name0`} classes={[themedCss.name, headlineClass]}>{APo.name[0]}</h2>
				{APo.name.length > 2 && <p key={`name2`} classes={[themedCss.byline, typoClass]}>{APo.name[2]}</p>}
			</header> : namesPaginated)
		}
	</div>
	const blurHeight = !height ? 80 : Math.round(height / (width / 80));
console.log(blurhash, blurHeight);
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
			themedCss[(vp as keyof typeof themedCss)]
		]}
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
		aria-label="Image"
		role="region"
	>
		<div classes={themedCss.measure} key="measure" />
		{!!APo.url && <figure
			key="media"
			classes={[
				themedCss.media,
				!!get('loaded') && themedCss.loaded
			]}
			style={`--mml: ${mml};`}
		>
			{!!blurhash && <Blurhash blurhash={blurhash} width={80} height={blurHeight} />}
			<noscript><i /></noscript>
			<picture classes={themedCss.image} key="image" onload={() => set('loaded',true)} >
				<Srcset url={APo.url} isPicture={true} />
				<img classes={themedCss.image} key="image" {...imgProps} />
			</picture>
		</figure>}

		{hasControls && <div classes={themedCss.controls}>

		</div>}

		{!isRow && namesNode}

		<div classes={themedCss.attributions}>
			<AttributedTo {...APo} max={39} />
		</div>

		{hasContent && <div classes={themedCss.contentWrapper}>
			{!!isRow && namesNode}
			{
				APo.summary && <Paginated key="summary" property="summary" classes={{
						'@dojo/widgets/paginated': { root: [themedCss.summaryPaginated] }
					}}
				>
					{clampStrings(APo.summary, 500).map((_summary, i) =>
						<MD classes={[themedCss.summary, typoClass]} key={`summary${i}`} content={_summary} />
					)}
				</Paginated>
			}
			{
				APo.content && <Collapsed responsive={!isRow} lines={isRow ? 2 : 12} classes={{
						'@dojo/widgets/collapsed': { root: [themedCss.contentCollapsed] }
					}}>
					{APo.content.map((_content, i) => <virtual>
						<MD classes={[themedCss.content, typoClass]} key={`content${i}`} content={_content} /><hr />
					</virtual>)}
				</Collapsed>
			}
		</div>}

		{hasAttachment && <virtual>
			<div key="images" classes={themedCss.images}>
				... images
			</div>
			<p key="attachments" classes={themedCss.attachments}>
				... attachments
			</p>
		</virtual>}
	</div>

});

export default Image;
