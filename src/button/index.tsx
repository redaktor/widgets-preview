import { DimensionResults } from '@dojo/framework/core/meta/Dimensions';
import { dimensions } from '@dojo/framework/core/middleware/dimensions';
import { focus } from '@dojo/framework/core/middleware/focus';
import { create, tsx } from '@dojo/framework/core/vdom';
import { formatAriaProperties, PointerDevices } from '../common/util';
import { theme, ThemeProperties } from '../middleware/theme';
import * as css from '../theme/material/button.m.css';
/* TODO:
wide?: boolean;
popup?: { expanded?: boolean; id?: string; type?: string } | boolean;
--> aria-haspopup
*/
export interface ButtonProperties extends ThemeProperties {
	/** Custom aria attributes */
	aria?: { [key: string]: string | null };
	/** border-radius, not spaced */
	group?: boolean;
	/** Full width */
	responsive?: boolean;
	/** Whether the button is disabled or clickable */
	disabled?: boolean;
	/** The name of the button */
	name?: string;
	/** The title of the button */
	title?: string;
	/** Handler for events triggered by button losing focus */
	onBlur?(): void;
	/** Handler for events triggered by a button click */
	onClick?(e: MouseEvent, id: string): void;
	/** Handler for events triggered by "on down" */
	onDown?(e: PointerEvent): void;
	/** Handler for events triggered by "on focus" */
	onFocus?(): void;
	/** Handler for events triggered by "on out" */
	onOut?(): void;
	/** Handler for events triggered by "on over" */
	onOver?(): void;
	/** Handler for events triggered by "on up" */
	onUp?(): void;
	/** Indicates status of a toggle button */
	pressed?: boolean;
	/** Button type can be "submit", "reset", "button", or "menu" */
	type?: 'submit' | 'reset' | 'button' | 'menu';
	/**  Defines a value for the button submitted with form data */
	value?: string;
	/** `id` set on the root button DOM node */
	widgetId?: string;
	/** labelFor forces a label element with the for="" attribute and role="button" */
	labelFor?: string;
}
/* We make sure that the event has offsetX and offsetY
// (some Pointer Events polyfills do not)
evt. set the CSS variables if 'animated'
and return the event */
/* TODO FIXME : set only on root ! */
const devicesAll: PointerDevices = ['mouse','pen','touch'];
function setClickDimensions(e: PointerEvent, devices: string[], dim: DimensionResults) {
	const docStyle = document.documentElement.style;
	const elW = dim.offset.width;
	if (typeof e.offsetX !== 'number') {
		(e as any).offsetX = (e.clientX - dim.position.left)||-1
	}
	if (typeof e.offsetY !== 'number') {
		(e as any).offsetY = (e.clientY - dim.position.top)||-1
	}
	const doSet = devices.indexOf(e.pointerType) > -1;
	// console.log(doSet);
	if (!!doSet && !!elW && typeof e.offsetX === 'number' && e.offsetX > -1) {
		const btnW = elW / 2 + Math.abs(elW / 2 - e.offsetX);
		docStyle.setProperty('--redaktor-btn-w', `${btnW}px`);
		docStyle.setProperty('--redaktor-btn-x', `${e.offsetX}px`);
		docStyle.setProperty('--redaktor-btn-y', `${e.offsetY}px`);
		// console.log(btnW, e.offsetX, e.offsetY);
	}
	return e
}

const factory = create({ dimensions, focus, theme }).properties<ButtonProperties>();

export const Button = factory(function Button({
	children,
	id,
	middleware: { dimensions, focus, theme },
	properties
}) {

	const {
		aria = {},
		labelFor,
		animated = true,
		group,
		responsive,
		disabled,
		widgetId,
		name,
		title,
		pressed,
		type = 'button',
		value,
		onClick,
		onOut,
		onOver,
		onDown,
		onUp,
		onBlur,
		onFocus
	} = properties();
	const themedCss = theme.classes(css);
	const idBase = widgetId || `button-${id}`;

	aria.pressed = typeof pressed === 'boolean' ? (pressed ? 'true' : 'false') : null;
	const buttonProps = {
		classes: [
			theme.variant(),
			themedCss.root,
			theme.uiSize(),
			theme.uiColor(),
			theme.uiElevation(),
			theme.shaped(themedCss),
			theme.animated(themedCss),
			group ? themedCss.group : theme.uiSpace(),
			responsive || group ? themedCss.responsive : null,
			disabled ? themedCss.disabled : null,
			pressed ? themedCss.pressed : null
		],
		id: idBase, name, title, type, value, disabled,
		focus: focus.shouldFocus(),
		onblur: () => onBlur && onBlur(),
		onclick: (event: MouseEvent) => {
			console.log('CLICK');
			event.stopPropagation();
			onClick && onClick(event, idBase);
		},
		onfocus: () => onFocus && onFocus(),
		onpointerenter: () => onOver && onOver(),
		onpointerleave: () => onOut && onOut(),
		onpointerdown: (event: PointerEvent) => {
			// TODO: not fired in Safari 12
			event.stopPropagation();
			const devs: PointerDevices = !animated ? [] :
				(Array.isArray(animated) ? animated : devicesAll);
			const evt = setClickDimensions(event, devs, dimensions.get('root'));
			return onDown && onDown(evt)
		},
		onpointerup: () => onUp && onUp(),
		onanimationend: "this.blur()",
		...formatAriaProperties(aria)
	}

	return (labelFor ?
		<label role="button" for={labelFor} key="root" {...buttonProps}>{children()}</label> :
		<button key="root" {...buttonProps}>{children()}</button>
	);
});

export default Button;
