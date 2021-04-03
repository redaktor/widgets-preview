import { RedaktorWidgetBase, Dimensions, v, theme, customElement, DNode } from '../common/Widget';
import { RedaktorPositionCSS, RedaktorProperties } from '../common/interfaces';
import { Intersection } from '@dojo/framework/core/meta/Intersection';
import * as css from '../themes/redaktor-default/image.m.css';

type Pos = Partial<keyof RedaktorPositionCSS>;
export enum HPos { 'left' = 'left', 'center' = 'center', 'right' = 'right' }
export enum VPos { 'top' = 'top', 'center' = 'center', 'bottom' = 'bottom' }
export interface ImageContentProperties extends RedaktorProperties {
	horizontal?: HPos | keyof typeof HPos;
	vertical?: VPos | keyof typeof VPos;
	background?: boolean | number | [number, number, number] | [number, number, number, number];
	gradient?: boolean;
}

@customElement<ImageContentProperties>({
	tag: 'redaktor-image',
	properties: []
})
@theme(css)
class ImageContent<P extends ImageContentProperties = ImageContentProperties>
extends RedaktorWidgetBase<P> {
	private _element = 'div';

	protected getRootClasses(): any[] {
		return []
	}
	protected getPositionClasses(ui: RedaktorPositionCSS = css) {
		const { horizontal, vertical } = this.properties;
		return [
			horizontal || vertical ? css.flex : null,
			(horizontal && horizontal in HPos) ? this.theme(ui[<Pos>horizontal]) : null,
			(vertical && vertical in VPos) ?
				(vertical === VPos.center ? css.middle : this.theme(ui[<Pos>vertical])) : null
		]
	}
	protected getGradient() {
		// TODO :  gradient = false
		const { background = false, horizontal: h, vertical: v } = this.properties;
		if (!background) {
			return { style: null, gradientClass: null }
		} else if ((v === VPos.center && h === HPos.center)) {
			return { style: null, gradientClass: 'toCenter' }
		}
		const { offset } = this.meta(Dimensions).get('root');
		const { offset: wrapperOffset } = this.meta(Dimensions).get('wrapper');
		const a = offset.height >= offset.width ? [h, v] : [v, h];
		const pos = (a[0] === HPos.center || a[0] === VPos.center) ? a[1] : a[0];

		let bg: number[] = [];
		if (typeof background === 'number') {
			bg = [0, 0, background, background];
		} else if (Array.isArray(background)) {
			if (background.length === 4) {
				bg = background;
			} else if (background.length === 3) {
				bg = [0].concat(background);
			}
		}
		return {
			style: `--content-pos: to ${pos};
--content-h: ${Math.min((100 * wrapperOffset.height) / offset.height, 64)}%;
--content-w: ${Math.min((100 * wrapperOffset.width) / offset.width, 80)}%;
${bg.reduce((s, v, i) => `${s} --img-a${i}: ${v};`, '')}`,
			gradientClass: `to${pos}` };
	}

	protected render(): DNode {
		const { style, gradientClass } = this.getGradient();
		return v(this._element, {
			key: 'root',
			style,
			classes: [
				this.theme(css.mediaContent),

				gradientClass ? this.theme(css.gradient) : null,
				gradientClass ? this.theme((<any>css)[gradientClass]) : null,

				...this.getSchemaClasses(css),
				...this.getPositionClasses(),
				...this.getRootClasses()
			]
		},
		[v('div', {key: 'wrapper'}, this.children)]) //this.children)
	}
}

export default ImageContent;
