import {
  RedaktorProperties, RedaktorSizesCSS, RedaktorSchemaCSS, RedaktorDisabledCSS,
  RedaktorValidCSS, RedaktorStyleCSS
} from './interfaces';
import {
  ThemedMixin as _TM, ThemedProperties as _TP, theme as _t
} from '@dojo/framework/core/mixins/Themed';
import { DNode as _DN, WNode as _WN/*, WidgetProperties*/ } from '@dojo/framework/core/interfaces';
import { v as _v, w as _w } from '@dojo/framework/core/vdom';
import { WidgetBase as _W } from '@dojo/framework/core/WidgetBase';
import { Dimensions as _D } from '@dojo/framework/core/meta/Dimensions';
import { MaterialSchema, Size, Sizes } from './util';
import { customElement as _cE } from '@dojo/framework/core/decorators/customElement';
import * as colorCss from '../theme/material/_color.m.css';
import * as uiCss from '../theme/material/_ui.m.css';

export type DNode = _DN;
export type WNode = _WN;
export const v = _v;
export const w = _w;
export const WidgetBase = _W;
export const Dimensions = _D;
export const theme = _t;

export type ThemedProperties = _TP;
export const ThemedMixin = _TM;
export const ThemedBase = _TM(_W);
export const customElement = _cE;

export class RedaktorWidgetBase<P extends RedaktorProperties> extends ThemedBase<P> {
  protected _css: any;
  protected _value: string | number | undefined;

  constructor() {
		super();
  }

  readonlyProp(key: string, value: any, o: any = this) {
    const descriptor = Object.getOwnPropertyDescriptor(o, key);
    if (!descriptor || !!descriptor.configurable) {
      return Object.defineProperty(o, key, {value, writable:false});
    }
  }

  /*
  TODO
  FocusEvent
  MouseEvent | TouchEvent
  KeyboardEvent
  OLD:
  protected getEvtValue(event: Event): string | number {
		return (event.target as HTMLInputElement).value
	}
  protected getEvtArgs(event: Event): any[] {
		return []
	}
  protected _evt(evtType: string, event: Event, key?: number): string | number {
    const V = this.getEvtValue(event);
    const A = this.getEvtArgs(event);
    console.log(event, key)
    if (typeof (<any>this.properties)[evtType] === 'function') {
      if (key) {
        (<any>this.properties)[evtType](key, () => { event.preventDefault(); })
      } else {
        (<any>this.properties)[evtType](V, ...this.getEvtArgs(event))
      }
    }
    return V
  }
  */

  protected _defaultTypo: Sizes = 'default';
  protected getSizeClasses(ui: any = uiCss, typoSize?: Sizes, uiSize?: Sizes) {
    /* NOTE order matters: UI class, then Typo class
    TODO STRONG TYPE > TS 2.7
    */
    const { size = 'default', responsive = false } = this.properties;
    if (!uiSize || !(uiSize in Size)) { uiSize = size; }
    if (!typoSize || !(typoSize in Size)) { typoSize = size; }
    return [
      ui[`${uiSize}UI`], ui[`${typoSize}Typo`],
      responsive ? ui.responsive : null
    ]
  }

  protected getSchemaClasses(css: RedaktorSchemaCSS, isParent = false): string[] {
    const { schema } = this.properties;
    if (isParent) {
      return (schema && schema in MaterialSchema) ? [css.hasSchema] : []
    }

    if (schema && schema in MaterialSchema) { return [colorCss[schema], css[schema]] }
    return (schema && `${schema}_material` in colorCss) ?
      [(<any>colorCss)[`${schema}_material`], (schema in css) ? css[schema] : null] :
      [css.parentSchema]
  }

  protected getDisabledClass(css: RedaktorDisabledCSS): string {
    const { disabled, readOnly } = this.properties;
    if (disabled === true) { return css.disabled }
    if (css.readonly && readOnly === true) { return css.readonly }
    return css.enabled
  }

  protected getValidClass(css: RedaktorValidCSS): (string | null) {
    const { invalid } = this.properties;
    return invalid === true ? css.invalid : (invalid === false ? css.valid : null);
  }

  protected getStyleClasses(css: RedaktorStyleCSS): string[] {
    const { filled, outlined, shaped } = this.properties;
    const a = [];
    (filled === true) && a.push(css.filled);
    (outlined === true) && a.push(css.outlined);
    (shaped === true) && a.push(css.shaped);
    return a
  }
}

// TODO TS
export class RedaktorDimensions extends Dimensions {
  getOffset(key: string): any {
	  const node = this.getNode(key);
		if (node) {
			const _lh = window.getComputedStyle(node).lineHeight;
      const lh = _lh && parseInt(_lh.replace('px', ''), 10) || 0;
			const { /*scroll,*/ offset } = this.get(key);

// console.log( scroll, offset )

			const h = lh && Math.ceil(Math.ceil(offset.height / lh) * lh) || offset.height;
      const mOffset = {...offset, ...{marginBottom: 0}};
      if (typeof h === 'number') {
        mOffset.marginBottom = h - offset.height;
      }
      return mOffset
    }
    return {}
  }
}

export class CSSvar extends Dimensions {
  getVar(key: string, varKey: string): any {
    const node = this.getNode(key);
    return node ? getComputedStyle(node).getPropertyValue(`--${varKey}`) : null
  }
  setVar(key: string, varKey: string, value: string): any {
    const node = this.getNode(key);
    console.log(node);
    if (node) { (<any>node).style.setProperty(`--${varKey}`, value) }
  }
}
