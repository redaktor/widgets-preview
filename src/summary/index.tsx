import { formatAriaProperties, Variants, PointerDevices } from '../common/util';
import { DimensionResults } from '@dojo/framework/core/meta/Dimensions';
import { dimensions } from '@dojo/framework/core/middleware/dimensions';
import { create, tsx } from '@dojo/framework/core/vdom';
import { theme, ThemeProperties } from '../middleware/theme';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/button.m.css';
import * as summaryFixed from '../theme/material/summary.m.css';
/* TODO:
responsive?: boolean;
wide?: boolean;
popup?: { expanded?: boolean; id?: string; type?: string } | boolean;
--> aria-haspopup
*/
export interface SummaryProperties extends ThemeProperties {
	/** Custom aria attributes */
	aria?: { [key: string]: string | null };
	/** The variant for the summary: 'flat', 'outlined', 'raised', 'shaped'
	 * 'flat' by default
	 */
	variant?: Variants;
	/** Whether the summary is disabled or clickable */
	disabled?: boolean;
	/** The name of the summary */
	name?: string;
	/** Handler for events triggered by summary losing focus */
	onBlur?(): void;
	/** Handler for events triggered by a summary click */
	onClick?(): void;
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
	/** Indicates status of a toggle summary */
	pressed?: boolean;
	/** Summary type can be "submit", "reset", "summary", or "menu" */
	type?: 'submit' | 'reset' | 'summary' | 'menu';
	/**  Defines a value for the summary submitted with form data */
	value?: string;
	/** `id` set on the root summary DOM node */
	widgetId?: string;

	isCard?: boolean;
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
	if (!!doSet && !!elW && typeof e.offsetX === 'number' && e.offsetX > -1) {
		const btnW = elW / 2 + Math.abs(elW / 2 - e.offsetX);
		docStyle.setProperty('--redaktor-btn-w', `${btnW}px`);
		docStyle.setProperty('--redaktor-btn-x', `${e.offsetX}px`);
		docStyle.setProperty('--redaktor-btn-y', `${e.offsetY}px`);
	}
	return e
}

const factory = create({ dimensions, theme }).properties<SummaryProperties>();

export const Summary = factory(function Summary({
	children,
	id,
	middleware: { dimensions, theme },
	properties
}) {

	const {
		aria = {},
		animated = true,
		variant = 'outlined' as (keyof typeof themedCss),
		disabled,
		widgetId,
		name,
		pressed,
		type = 'summary',
		value,
		isCard = false
	} = properties();
	const themedCss = theme.classes(css);
	const idBase = widgetId || `summary-${id}`;

	return (
		<summary
			key="root"
			classes={[
				theme.variant(),
				themedCss.root,
				summaryFixed.root,
				isCard ? summaryFixed.cardSummary : null,
				themedCss[variant],
				theme.sized(ui),
				theme.colored(colors),
				theme.animated(themedCss),
				disabled ? themedCss.disabled : null,
				pressed ? themedCss.pressed : null
			]}
			disabled={disabled}
			id={idBase}
			name={name}
			type={type}
			value={value}
			onpointerdown={(event: PointerEvent) => {
				event.stopPropagation();
				const devs: PointerDevices = !animated ? [] :
					(Array.isArray(animated) ? animated : devicesAll);
				setClickDimensions(event, devs, dimensions.get('root'));
			}}
			{...formatAriaProperties(aria)}
			onanimationend="this.blur()"
			aria-pressed={typeof pressed === 'boolean' ? pressed.toString() : null}
		>
			{children()}
		</summary>
	);
});

export default Summary;
