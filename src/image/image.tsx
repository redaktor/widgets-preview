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
	/* focal point, see https://github.com/jonom/jquery-focuspoint#1-calculate-your-images-focus-point */
	focalPoint?: [number, number];
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
		sensitive, alt, title, aspectRatio: ratio, onMouseEnter, onMouseLeave, onLoad, onFullscreen,
		onBrightness, blurhash, focalPoint, mediaType, loading = 'lazy', crossorigin = 'anonymous',
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


	const {contentRect = {width: 1, height: 1}} = breakpoints.get('media')||{};
	const {width: cWidth, height: cHeight} = contentRect;
	/* Baselined to typo grid */
	const lineCount = !get('l') ? 0 : ((contentRect && cHeight)||0) / get('l');
	const mml = `--mml: ${!get('l') || !baselined ? 0 : (Math.max(0, Math.ceil(lineCount)) - lineCount)};`;
	/* Fixed Aspect Ratio */
	const aspectRatio = Array.isArray(ratio) && ratio.join('/') in AspectRatioNamed ? ratio.join('/') : ratio;
	const apt = !aspectRatio || typeof aspectRatio === 'string' ? '' : `--apt: ${100 / aspectRatio[0] * aspectRatio[1]}%;`;
	const ar = !aspectRatio || typeof aspectRatio === 'string' ? '' : `--ar: ${aspectRatio[0]} / ${aspectRatio[1]};`;
	/* Blurhash and CW */
	const maxInt = Math.max(width, height);
	const [blurWidth, blurHeight] = [Math.round(width / maxInt * 80), Math.round(height / maxInt * 80)];
	const cwId = !sensitive ? '' : uuid();
	/* Focal Point */
	let styles: Partial<CSSStyleDeclaration> = {};
	const hasFocalPoint = Array.isArray(focalPoint) &&
		focalPoint.filter((coord) => typeof coord === 'number' && !isNaN(coord)) &&
		cWidth > 1 && !!width && !!height;
	if (hasFocalPoint) {
		const calcShift = function(toRatio: number, containerSize: number, imageSize: number, focusSize: number, toMinus?: boolean) {
			const containerCenter = Math.floor(containerSize / 2); // Container center in px
			const focusFactor = (focusSize + 1) / 2; // Focus point of resize image in px
			const scaledImage = Math.floor(imageSize / toRatio); // Can't use width() as images may be display:none
			let focus =  Math.floor(focusFactor * scaledImage);
			if (toMinus) { focus = scaledImage - focus }
			let focusOffset = focus - containerCenter; // Calculate difference between focus point and center
			const remainder = scaledImage - focus; // Reduce offset if necessary so image remains filled
			const containerRemainder = containerSize - containerCenter;
			if (remainder < containerRemainder) { focusOffset -= containerRemainder - remainder }
			if (focusOffset < 0) { focusOffset = 0 }
			return `${(focusOffset * -100 / containerSize)}%`;
		};
		const [x, y] = focalPoint;
		const [wR, hR] = [(width/cWidth), (height/cHeight)];

		styles = { position: 'absolute', maxWidth: '', maxHeight: '' };
		if (wR > hR) {
			styles.left = calcShift(hR, cWidth, width, x);
			styles.maxHeight = '100%';
		} else if (wR < hR) {
			styles.top = calcShift(wR, cHeight, height, y, true);
			styles.maxWidth = '100%';
		}
	}

	const imgProps: any = {
		alt: alt || (!!APo.summary && !!APo.summary.length ? APo.summary[0]||'' : ''),
		title,
		loading,
		width,
		height,
		mediaType,
		src,
		styles,
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
				!!aspectRatio && aspectRatio in AspectRatioNamed && (themedCss as any)[`_${aspectRatio.replace('/','_')}`]
			]}
			style={`${mml}${apt}${ar}`}
		>
			{(!get('faded') || sensitive) && !!blurhash && <Blurhash
				key="blurhash"
				blurhash={blurhash}
				width={blurWidth}
				height={blurHeight}
				styles={styles}
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
