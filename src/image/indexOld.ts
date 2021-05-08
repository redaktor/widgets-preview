import {
	RedaktorWidgetBase, RedaktorDimensions, Dimensions, v, theme, customElement, DNode
} from '../common/Widget';
import { Size } from '../common/util';
import {
	RedaktorProperties, PointerEventProperties, KeyEventProperties,
	CustomAriaProperties, ImageEventProperties
} from '../common/interfaces';
import { VNodeProperties } from '@dojo/framework/core/interfaces';
import { formatAriaProperties } from '../common/util';
import MetaBase from '@dojo/framework/core/meta/Base';
import { Intersection } from '@dojo/framework/core/meta/Intersection';
import { Resize, ContentRect } from '@dojo/framework/core/meta/Resize';
import * as css from '../theme/material/image.m.css';

/* TODO demo :
// upload resize sizes
// placeholder: color or LQIP (shapes) SQIP (gradient) TRACE (silhouette) */
/* https://www.npmjs.com/package/sharp */
/* https://www.freecodecamp.org/news/using-svg-as-placeholders-more-image-loading-techniques-bed1b810ab2c/ */

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
interface ImageConstraints {
	ratio: number;
	style: Partial<CSSStyleDeclaration>;
	willFade: boolean;
	isIntersecting: boolean;
	isPortrait: boolean;
	isCover: boolean;
	isFade: boolean;
	isMax: boolean;
}

interface AspectRatio {
	width: number;
	height: number;
	position?: /* percent */number;
	cover?: /* default: true */ boolean;
}

class CurrentSrc extends MetaBase {
	get(key: string): string {
		const node = this.getNode(key);
		return node && (<any>node).currentSrc ? (<any>node).currentSrc :
		 	(node && (<any>node).src ? (<any>node).src : '');
	}
}

type ImageVProperties = Omit<VNodeProperties, 'key'|'innerHTML'|'action'|
	'encoding'|'enctype'|'method'|'name'|'target'|'type'|'autocomplete'|
	'checked'|'placeholder'|'readOnly'|'src'|'value'>
export interface ImageProperties extends ImageVProperties, RedaktorProperties,
ImageEventProperties, PointerEventProperties, KeyEventProperties, CustomAriaProperties {
	alt?: string;
	aspectRatio?: AspectRatio;
	background?: Partial<CSSStyleDeclaration>;
	baselined?: /* default: true */ boolean;
	crossorigin?: 'anonymous' | 'use-credentials';
	fade?: boolean;
	fadeDuration?: /* TODO ms */ number;
	load?: /* default: 'progressive' */ 'start' | 'progressive' | 'intersect';
	longdesc?: string;
	placeholder?: string;
	placeholderStyles?: Partial<CSSStyleDeclaration>;
	placeholderClasses?: string | string[];
	sizes?: string; // TODO sizes as noJS fallback or autosize option
	src: string;
	srcset?: string;
	styles?: Partial<CSSStyleDeclaration>;
	// TODO https://developer.mozilla.org/de/docs/Web/HTML/Element/img#attr-referrerpolicy
	usemap?: string;

}
// TODO maxSize (fixed size)
// loading indicator
// objectFit, objectPosition ?

/* NOSCRIPT STATIC, e.g. gatsby
// Show the original image during server-side rendering if JavaScript is disabled
{this.addNoScript && (
  <noscript
    dangerouslySetInnerHTML={{
      __html: noscriptImg({
        alt,
        title,
        loading,
        ...image,
        imageVariants,
      }),
    }}
  />
)}
*/


@customElement<ImageProperties>({
	tag: 'redaktor-image',
	properties: []
})
@theme(css)
class Image<P extends ImageProperties = ImageProperties> extends RedaktorWidgetBase<P> {
	private _boundIsLarger = this.isLarger.bind(this);
	private _faded = false;
	private _error = false;
	private _loaded = false;
	private _loading = false;
	private __w: number = 0.1;
	private _mb: number = 0;
	private _w: number;

	private _onHover(event: MouseEvent) {
		this.properties.onHover && this.properties.onHover(event);
	}
	private _onClick(event: MouseEvent) {
		event.stopPropagation();
		this.properties.onClick && this.properties.onClick(event);
	}
	private _onLoad(event: Event) {
		this._loaded = true;
		this.invalidate();
		this.properties.onLoad && this.properties.onLoad(event);
	}
	private _onError(event: Event) {
		this._error = true;
		this.invalidate();
		this.properties.onError && this.properties.onError(event);
	}
	private _onFadeEnd(event: AnimationEvent) {
		if(event.animationName.indexOf('_fadein_') > 0) {
			this._faded = true;
			this.invalidate();
		}
		this.properties.onFadeEnd && this.properties.onFadeEnd(event);
	}

	protected isLarger(contentRect: ContentRect) {
		const { baselined = true } = this.properties;
		const { marginBottom = 0 } = this.meta(RedaktorDimensions).getOffset('root');
    this.__w = Math.ceil((100 * contentRect.width) / window.innerWidth);
		const grew = typeof this._w === 'undefined' || this.__w > this._w;
		if (grew) { this._w = this.__w }
		if (baselined && this._mb !== marginBottom) {
			this._mb = marginBottom;
			this.invalidate();
		}
		return grew;
	}

	protected getConstraints(): ImageConstraints {
		const {
			placeholder, background, fade = false, fadeDuration = 320,
			load = 'progressive', aspectRatio: _r = { width: 0, height: 0 }
		} = this.properties;
		const { width = 0, height = 0, position: _p = 50, cover: isCover = true } = _r;
		const isPositive = (n: number) => (typeof n === 'number' && n > 0);
		const ratio = (!isPositive(width) || !isPositive(height)) ? 0 :
			(Math.min(width, height) / Math.max(width, height) * 100);
		const { offset } = this.meta(Dimensions).get('media');
		const { offset: rootOffset } = this.meta(Dimensions).get('root');
		const { isIntersecting } = this.meta(Intersection).get('media');
		const isMax = offset.width >= rootOffset.width;
		const isPortrait = !!ratio && width < height;
		const isToFade = this._loaded && !this._faded && fade;
		const isFade = load === 'start' ? true :
			(isToFade && load === 'progressive' && isIntersecting);
		const willFade = !this._loaded && !this._faded && placeholder && fade;
		let style = `--img-mb: ${this._mb}px;${ratio > 0 ? `--ratio: ${ratio}%;` : ''}`;
		if (ratio > 0) {
			let a: ['width'|'height','x'|'y'][] = [['width','x'], ['height','y']];
			const [key, coord] = (!!isCover ? a : a.reverse())[isMax ? 0 : 1];
			const maxPos = (offset[key] - rootOffset[key]) / rootOffset[key] * 100;
			const pos = (_p / 100) * maxPos * -1;
			style += `--img-${coord}: ${pos}%;`;
			if (!isCover) {
				const hPerc = (rootOffset[key] - offset[key]) / rootOffset[key] * 100;
				const remaining = 100 - hPerc;
				style += `--img-${key.charAt(0)}: ${remaining}%;`;
			}
		}
		if (placeholder && !this._faded) {
			style += `--img-ph: ${offset.height}px;`;
		}
		if (typeof background === 'string' && (!this._loaded || ratio > 0)) {
			style += `--img-bg: ${background};`;
		}
		if (isFade && typeof fadeDuration === 'number' && fadeDuration > 0) {
			style += `--img-fd: ${fadeDuration}ms;`;
		}
		return { ratio, style, isIntersecting, isMax, isCover, isPortrait, isFade, willFade }
	}

	protected renderPlaceholder(isIntersecting = true) {
		const {
			size, placeholder, placeholderStyles, /*placeholderClasses,*/
			fade = false, load = 'progressive'
		} = this.properties;
		const hasPlaceholder = !!placeholder && typeof placeholder === 'string';
		const loadPlaceholder = load !== 'intersect' || (load === 'intersect' && isIntersecting);

		return (fade && !this._faded && loadPlaceholder && hasPlaceholder) ? v('img', {
			key: 'placeholder',
			src: placeholder,
			styles: placeholderStyles,
			classes: this.theme([
				css.media, css.placeholder,
				size in Size ? (<any>css)[size] : css.noSize
			]),
			// extraClasses: placeholderClasses // TODO
		}) : null
	}
	protected renderImage(isIntersecting = true, isLarger = false) {
		let imgProperties: Partial<ImageVProperties> = this.properties;
		const {
			src: _src, srcset: _set, alt, longdesc, crossorigin, usemap, size, placeholder,
			aria = {}, styles = {}, sizes = `${this._w}vw`, load = 'progressive',
			onLoadStart, onError
		} = this.properties;

		const hasSrcset = Image.prototype.hasOwnProperty('srcset');
		this._loading = load === 'start' || isIntersecting || this._loaded;
		// TODO load 'progressive' or load 'intersect' + fade placeholder bg
		if (this._loading && onLoadStart) {
			const currentSrc = this.meta(CurrentSrc).get('media');
			onLoadStart(currentSrc, isLarger)
		}
		if (this._error && placeholder && !onError) {
			return null
		}
		const src = this._loading ? _src :
			(!hasSrcset && typeof placeholder === 'string') ? placeholder : '';
		const srcset = this._loading ? _set :
			(hasSrcset && typeof placeholder === 'string') ? placeholder : void 0;

		return v('img', {
			key: 'media',
			...imgProperties,
			alt, longdesc, crossorigin, usemap, styles, src, srcset, sizes,
			...formatAriaProperties(aria),
			classes: this.theme([
				css.media,
				css.img,
				size in Size ? (<any>css)[size] : css.noSize
			]),
			placeholder: void 0,
			onhover: this._onHover,
			onclick: this._onClick,
			onload: this._loading ? this._onLoad : void 0,
			onerror: this._loading ? this._onError : void 0,
			onanimationend: this._onFadeEnd,
		})
	}
	protected renderChildren() {
		return !this.children ? null : v('figurecaption', {key: 'wrapper'}, this.children)
	}

	protected render(): DNode {
		const {
			ratio, style, isMax, isPortrait, isCover, isIntersecting, isFade, willFade
		} = this.getConstraints();
		const isRatio = ratio > 0;
		const { baselined = true } = this.properties;
		const { isLarger = false } = this.meta(Resize).get('root', {
			isLarger: this._boundIsLarger
		});

		return v(!this.children ? 'span' : 'figure', {
			key: 'root',
			classes: this.theme([
				css.root,
				isRatio ? css.ratio : null,
				isRatio ? (isCover === false ? css.contain : css.cover) : null,
				isPortrait ? css.portrait : css.landscape,
				isLarger ? css.grew : null,
				isMax ? css.max : null,
				isFade ? css.fade : (willFade ? css.toFade : null),
				baselined === true ? css.baselined : null
			]),
			style
		}, [
			this.renderImage(isIntersecting, isLarger),
			this.renderPlaceholder(isIntersecting),
			this.renderChildren()
		])
	}

}

export default Image;
