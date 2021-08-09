import { RenderResult } from '@dojo/framework/core/interfaces';
import { FocusProperties } from '@dojo/framework/core/mixins/Focus';
import { tsx, create } from '@dojo/framework/core/vdom';
import focus from '@dojo/framework/core/middleware/focus';
import id from '../middleware/id';
import { theme, formatAriaProperties, ThemeProperties } from '../middleware/theme';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/checkbox.m.css';
/* TODO
onChange?(evt: Toggle): void;
responsive?: boolean;
customIcon or customIcon-design
*/

export interface CheckboxBaseProperties extends ThemeProperties, FocusProperties {
	/** Custom aria attributes */
	aria?: { [key: string]: string | null };
	/** Full width */
	responsive?: boolean;
	/**  Checked/unchecked property of the control */
	checked?: boolean;
	/** Set the disabled property of the control */
	disabled?: boolean;
	/** Can receive focus, default true */
	focusable?: boolean;
	/** Hides the label from view while still remaining accessible for screen readers */
	labelHidden?: boolean;
	/** The name of the checkbox */
	name?: string;
	/** Handler for when the element is blurred */
	onBlur?(): void;
	/** Handler for when the element is focused */
	onFocus?(): void;
	/** Handler for when the pointer moves over the element */
	onEnter?(): void;
	/** Handler for when the pointer moves out of the element */
	onOut?(): void;
	/** Handler for when the value of the widget changes */
	onValue?(checked: boolean): void;
	/** Makes the checkbox readonly (it may be focused but not changed) */
	readOnly?: boolean;
	/** Sets the checkbox input as required to complete the form */
	required?: boolean;
	/** Toggles the invalid/valid states of the Checkbox affecting how it is displayed */
	valid?: boolean;
	/** The current value */
	value?: string;
	/** The id used for the form input element */
	widgetId?: string;
	/** Serif typo options, default false */
	isSerif?: boolean;
}

export interface CheckboxProperties extends CheckboxBaseProperties {
	_inputType?: 'checkbox' | 'radio';
	/** The icon for the button: 'checkmark', 'dot' TODO
	 * 'checkmark' by default for plain checkbox
	 */
	icon?: 'checkmark' | 'dot';
}

const factory = create({ theme, id, focus })
	.properties<CheckboxProperties>()
	.children<RenderResult | undefined>();

export const Checkbox = factory(function Checkbox({
	children,
	properties,
	middleware: { theme, id, focus }
}) {
	const [label] = children();
	const themedCss = theme.classes(css);
	const {
		_inputType = 'checkbox',
		aria = {},
		design = 'flat',
		checked = false,
		focusable = true,
		icon = 'checkmark',
		isSerif = false,
		responsive,
		disabled,
		labelHidden,
		name,
		onBlur, onFocus, onValue, onOut, onEnter,
		readOnly,
		required,
		theme: themeProp,
		valid,
		value
		// widgetId
	} = properties();
	const idBase = id.getId(_inputType);

	return (
		<label
			key="root"
			classes={[
				theme.variant(),
				themedCss.root,
				theme.sized(ui),
				theme.spaced(ui),
				theme.colored(colors),
				theme.animated(themedCss),
				isSerif ? themedCss.serif : themedCss.sans,
				checked ? themedCss.checked : null,
				responsive ? themedCss.responsive : null,
				disabled ? themedCss.disabled : null,
				valid === false ? themedCss.invalid : null,
				valid === true ? themedCss.valid : null,
				readOnly ? themedCss.readonly : null,
				required ? themedCss.required : null,
				focus.isFocused('root') ? themedCss.focused : null
			]}
			theme={themeProp}
			disabled={disabled}
			focused={focus.isFocused('root')}
			valid={valid}
			readOnly={readOnly}
			required={required}
			hidden={labelHidden}
			for={idBase}
			secondary={true}
		>
			<input
				key="input"
				id={idBase}
				{...{
					...formatAriaProperties(aria),
					...{
						invalid: valid === false ? 'true' : null,
						readonly: readOnly === true ? 'true' : null
					}
				}}
				classes={themedCss.input}
				checked={checked}
				disabled={disabled}
				focus={focusable && focus.shouldFocus()}
				name={name}
				readonly={readOnly}
				required={required}
				type={_inputType}
				value={value}
				onblur={() => onBlur && onBlur()}
				onchange={(event: Event) => {
					event.stopPropagation();
					const checkbox = event.target as HTMLInputElement;
					onValue && onValue(checkbox.checked);
				}}
				onfocus={() => onFocus && onFocus()}
				onpointerenter={() => onEnter && onEnter()}
				onpointerleave={() => onOut && onOut()}
			/>
			<div key="box" classes={[
				themedCss.box,
				theme.elevated(ui),
				themedCss[design as (keyof typeof themedCss)],
				themedCss[icon as (keyof typeof themedCss)]
			]}></div>
			{label}
		</label>
	);
});

export default Checkbox;
