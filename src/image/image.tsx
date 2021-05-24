import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { ActivityPubObject, ActivityPubObjectNormalized, ActivityPubLinkObject } from '../common/interfaces';
import { AspectRatioNamed }from '../common/util';
import theme from '../middleware/theme';
import breakpoints from '../middleware/breakpoint';
import { uuid } from '@dojo/framework/core/util';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { normalizeActivityPub } from '../common/activityPubUtil';
import Srcset from '../srcset';
import Blurhash, { Brightness } from '../blurhash/';
import * as css from '../theme/material/image.m.css';

export interface ImgProperties extends ActivityPubObject {
	alt?: string;
	title?: string;
	/* fixed aspect ratio, e.g. ratio={16/9} */
	aspectRatio?: AspectRatioNamed | keyof typeof AspectRatioNamed | [number, number];
	/* object-fit logic */
	fit?: boolean;
	/* crossorigin parameter, default 'anonymous' */
	crossorigin?: 'anonymous' | 'use-credentials';
	/* snap to baseline, default true */
	baselined?: boolean;
	/* blurhash to render as background or as CW-onclick */
	blurhash?: string;
	/* load 'lazy' / when intersecting or 'eager' / directly, default 'lazy' */
	loading?: 'lazy' | 'eager';
	/* when entering fullscreen */
	onFullscreen?: () => any;
	/* when blurhash has loaded and delivers brightness */
	onBrightness?: (o: Brightness) => any;
	/* when main image has loaded */
	onLoad?: () => any;
	onMouseEnter?: (evt: MouseEvent) => any;
	onMouseLeave?: (evt: MouseEvent) => any;
}

export interface ImgIcache {
	l: any;
	loaded: boolean;
	faded: boolean;
}
export interface ImgChildren {
	/** Optional Header */
	header?: RenderResult;
	/** Optional Footer */
	footer?: RenderResult;
}

const icache = createICacheMiddleware<ImgIcache>();
const factory = create({
	icache,
	theme,
	breakpoints
})
	.properties<ImgProperties>()
	.children<ImgChildren | RenderResult | undefined>();



/* TODO
	blurhash output image if noJS and CSS accordingly
	alternative placeholders to blurhash :
	// color or LQIP (shapes) SQIP (gradient) TRACE (silhouette) - see priv repo
*/

export const Img = factory(function Img({
	middleware: { icache, theme, breakpoints},
	properties
}) {
	const { get, set, getOrSet } = icache;
	const themedCss = theme.classes(css);
	const {
		sensitive, alt, title, aspectRatio, onMouseEnter, onMouseLeave, onLoad, onFullscreen,
		onBrightness, blurhash, mediaType, loading = 'lazy', crossorigin = 'anonymous',
		baselined = true, fit = false, width = 80, height = 80, ..._rest
	} = normalizeActivityPub(properties());

	const APo: ActivityPubObjectNormalized = _rest;
	const src = (!APo.url ? (!APo.href ? '' : APo.href) :
	(typeof APo.url[0] === 'object' && !!(APo.url[0] as ActivityPubLinkObject).href) ?
		(APo.url[0] as ActivityPubLinkObject).href : (APo.url[0] as string))||'';

	if (!src) { return '' }

	getOrSet('l', theme.line(), false);
	getOrSet('loaded', false, false);
	getOrSet('faded', false, false);

	const {contentRect: dim = {height: 0}} = breakpoints.get('media')||{};
	const lineCount = !get('l') ? 0 : ((dim && dim.height)||0) / get('l');
	const mml = `--mml: ${!get('l') || !baselined ? 0 : (Math.max(0, Math.ceil(lineCount)) - lineCount)};`;
	const apt = !aspectRatio || typeof aspectRatio === 'string' ? '' : `--apt: ${100 / aspectRatio[0] * aspectRatio[1]}%;`;
	const ar = !aspectRatio || typeof aspectRatio === 'string' ? '' : `--ar: ${aspectRatio[0]} / ${aspectRatio[1]};`;
	const maxInt = Math.max(width, height);
	const [blurWidth, blurHeight] = [Math.round(width / maxInt * 80), Math.round(height / maxInt * 80)];
	const cwId = !sensitive ? '' : uuid();

	const imgProps: any = {
		alt: alt || (!!APo.summary && !!APo.summary.length ? APo.summary[0]||'' : ''),
		title,
		loading,
		width,
		height,
		mediaType,
		src,
		classes: [ themedCss.image ],
		onload: (evt: Event) => {
			set('loaded',true);
			evt.target && evt.target.addEventListener('animationend', () => {
			  getOrSet('faded',true);
			});
			onLoad && onLoad()
		},
		crossOrigin: 'anonymous'
	};

	const img = <figure
			key="media"
			classes={[
				themedCss.media,
				!!sensitive && themedCss.sensitive,
				!!get('loaded') && themedCss.loaded,
				!!get('faded') && themedCss.faded,
				!!fit && themedCss.fit,
				!!aspectRatio && themedCss.ratio,
				!!aspectRatio && typeof aspectRatio === 'string' && (themedCss as any)[`_${aspectRatio.replace('/','_')}`]
			]}
			style={`${mml}${apt}${ar}`}
		>
			{(!get('faded') || sensitive) && !!blurhash && <Blurhash
				key="blurhash"
				blurhash={blurhash}
				width={blurWidth}
				height={blurHeight}
				onBrightness={(o) => {
					onBrightness && onBrightness(o)
				}}
			/>}
			<noscript><i /></noscript>

			<picture classes={themedCss.picture}>
				{!!APo.url && <Srcset url={APo.url} isPicture={true} />}
				{<img {...imgProps} key="image" />}
			</picture>
			{sensitive && <label classes={themedCss.sensitiveLabel} for={cwId} />}
		</figure>
	return !sensitive ? img : <virtual>
		<input
			type="checkbox"
			classes={themedCss.sensitiveCheckbox}
			id={cwId}
			key="sensitive"
			checked={true}
		/>
		{img}
	</virtual>;
})

export default Img;
