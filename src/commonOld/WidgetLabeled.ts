/*
import { MaterialSchema, Size, Sizes } from './util';
import { customElement as _cE } from '@dojo/framework/core/decorators/customElement';
import * as colorCss from '../themes/redaktor-default/_color.m.css';
*/
import { v, w, DNode, RedaktorWidgetBase } from './Widget';
import { RedaktorProperties, GenericInputProperties } from './interfaces';
import Label from '../label/index';
import Focus from '@dojo/framework/core/meta/Focus';
import * as uiCss from '../theme/material/_ui.m.css';

/**
 * @type LabeledProperties
 * @property labelAfter     If false, moves the label before the input
 * @property labelHidden    If true, the label will be accessible but visually hidden
 * @property label          String value for the label
 */
export interface LabeledProperties extends RedaktorProperties, GenericInputProperties {
	labelAfter?: boolean;
	labelHidden?: boolean;
	labelStatic?: boolean;
	label?: string;
	helperText?: string;
}

export class LabeledBase<P extends LabeledProperties = LabeledProperties>
extends RedaktorWidgetBase<P> {
  protected _uuid = '';

  protected _renderLabel(_size = true, _schema = true) {
		if (!this.properties.label) { return null }
		const {
			widgetId = this._uuid, size,
			disabled, valid, label, /*labelAfter = false,*/ labelHidden = false,
			readOnly, required, schema, theme
		} = this.properties;
		const focus = this.meta(Focus).get('root');

    const colorSchema = _schema ? { schema } : { muted: true };
		return w(Label, {
			...colorSchema,
			theme,
			// schema,
			size: _size ? size : undefined,
			disabled,
			valid: valid === true || undefined,
			readOnly,
			required,
			focused: focus.containsFocus,
			hidden: labelHidden,
			forId: widgetId
		}, [ label ])
	}
  protected renderLabel(_size = true, _schema = true) {
    return this._renderLabel(_size, _schema);
  }
  protected _renderHelperText(msg?: string, valid?: boolean, css = uiCss): DNode {
    const message = msg ? msg : this.properties.helperText;
    return message ? v('p', {
			key: 'helperText',
			classes: [
				css.helperText,
				typeof valid !== 'boolean' ? null : (valid ? css.valid : css.invalid)
			]
		}, [message]) : null
  }
  protected renderHelperText(msg?: string, valid?: boolean, css = uiCss) {
    return this._renderHelperText(msg, valid, css);
  }
}
