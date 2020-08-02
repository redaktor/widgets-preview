import { RenderResult } from '@dojo/framework/core/interfaces';
import focus from '@dojo/framework/core/middleware/focus';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import validity from '@dojo/framework/core/middleware/validity';
import { create, diffProperty, invalidator, tsx } from '@dojo/framework/core/vdom';
import HelperText from '../helper-text/index';
// import Label from '../label/index';
import { theme, formatAriaProperties, ThemeProperties, Variants } from '../middleware/theme';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/text-input.m.css';

/* TODO
responsive?: boolean;
autofocus?: boolean;
// TODO FIXME
list?: string; // datalist
customValidator?: ((value: string) => ({ valid?: boolean; message?: string; })) | null;
*/


/* TODO check readonly + size

-> privacy concerns <-
A string that describes what if any type of autocomplete functionality the input should provide
Possible values https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
autocomplete


---  hidden
-> the special value _charset_ causes the hidden input's value to be reported as the
character encoding used to submit the form
name
--- email
Whether or not to allow multiple, comma-separated, e-mail addresses to be entered
multiple

???
The id of a <datalist> element located in the same document which provides a list
of predefined values to suggest to the user for this input.
list




A Boolean attribute which, if present, indicates that the input should automatically have focus
autofocus

A string specifying the <form> element with which the input is associated (that is, its form owner).
form

An optional numeric value that defines both whether or not the input should be focusable through use
of the Tab key as well as whether or not the element participates in sequential focus navigation.
tabindex

Defines whether the element may be checked for spelling errors.
spellcheck


------
+ SubmitInput
image: A graphical submit button.
You must use the src attribute to define the source of the image and the alt attribute
to define alternative text.
You can use the height and width attributes to define the size of the image in pixels.
--- submit
The URL to which to submit the form's data; overrides the form's action attribute,
if any.
formaction
A string specifying the encoding type to use for the form data.
formenctype
The HTTP method (get or post) to use when submitting the form.
formmethod
A Boolean which, if present, means the form's fields will not be subjected to
constraint validation before submitting the data to the server
formnovalidate
The browsing context into which to load the response returned by the server after
submitting the form
formtarget

+ FileInput
file: A control that lets the user select a file.
--- file
One or more unique file type specifiers describing file types to allow
accept
What source to use for capturing image or video data
capture
A FileList listing the chosen files
files
A Boolean which, if present, indicates that the user may choose more than one file
multiple

+ DateInput
A control for entering a date (year, month, and day, with no time).
--- date / time
min
max
step

+ NumberInput
--- number / range
min
max
step

+ ColorInput
color: A control for specifying a color.
*/

export type TextInputType =
	| 'text'
	| 'email'
	| 'number'
	| 'password'
	| 'search'
	| 'tel'
	| 'url'
	| 'date';

export interface BaseInputProperties<T extends { value: any } = { value: string }> extends ThemeProperties {
	/** Custom aria attributes */
	aria?: { [key: string]: string | null };
	/** The variant for the input: 'flat', 'outlined', 'raised', 'shaped'
	 * 'flat' by default
	 */
	variant?: Variants;
	/** Default Width or Flex */
	responsive?: boolean;
	/** Should the field autocomplete */
	autocomplete?: boolean | string;
	/** The disabled property of the input */
	disabled?: boolean;
	/** Text to display below the input */
	helperText?: string;
	/** Slides the label */
	labelAnimated?: boolean;
	/** Hides the label for a11y purposes */
	labelHidden?: boolean;
	/** The name property of the input */
	name?: string;
	/** Callback fired when the input is blurred */
	onBlur?(): void;
	/** Callback fired when the input is focused */
	onFocus?(): void;
	/** Callback fired when a key is pressed down */
	onKeyDown?(key: number, preventDefault: () => void): void;
	/** Callback fired when a key is released */
	onKeyUp?(key: number, preventDefault: () => void): void;
	/** Callback fired when the input validation changes */
	onValidate?: (valid: boolean | undefined, message: string) => void;
	/** Callback fired when the input value changes */
	onValue?(value?: T['value']): void;
	/** Callback fired when the input is clicked */
	onClick?(): void;
	/** Callback fired when the pointer enters the input */
	onOver?(): void;
	/** Callback fired when the pointer leaves the input */
	onOut?(): void;
	/** Placeholder text */
	placeholder?: string;
	/** The readonly attribute of the input */
	readOnly?: boolean;
	/** The required attribute of the input */
	required?: boolean;
	/** The initial value */
	initialValue?: T['value'];
	/** The controlled value */
	value?: T['value'];
	/** The id to be applied to the input */
	widgetId?: string;
}

export interface TextInputChildren {
	/** The label to be displayed above the input */
	label?: RenderResult;
	/** Renderer for focused content */
	focusContent?: RenderResult;
	/** Renderer for leading content */
	leading?: RenderResult;
	/** Renderer for trailing content */
	trailing?: RenderResult;
}

export interface TextInputProperties extends BaseInputProperties {
	/** Custom validator used to validate the contents of the input */
	customValidator?: (value: string) => { valid?: boolean; message?: string } | void;
	/** The min value a number can be */
	min?: number | string;
	/** The max value a number can be */
	max?: number | string;
	/** The step to increment the number value by */
	step?: number | string;
	/** Maximum number of characters allowed in the input */
	maxLength?: number | string;
	/** Minimum number of characters allowed in the input */
	minLength?: number | string;
	/** Pattern used as part of validation */
	pattern?: string | RegExp;
	/** Input type, e.g. text, email, tel, etc. */
	type?: TextInputType;
	/** Represents if the input value is valid */
	valid?: { valid?: boolean; message?: string } | boolean;
}

function formatValue(v: any) {
	return typeof v !== 'undefined' ? {value: `${v}`} : {}
}
function formatAutocomplete(autocomplete: string | boolean | undefined): string | undefined {
	if (typeof autocomplete === 'boolean') { return autocomplete ? 'on' : 'off' }
	return autocomplete;
}

interface TextInputICache {
	uuid: string;
	rendered: boolean;
	dirty: boolean;
	value?: string;
	initialValue?: string;
}

const factory = create({
	theme,
	icache: createICacheMiddleware<TextInputICache>(),
	validity,
	focus,
	diffProperty,
	invalidator
})
	.properties<TextInputProperties>()
	.children<TextInputChildren | RenderResult | undefined>();

export const TextInput = factory(function TextInput({
	middleware: { icache, theme, validity, focus, diffProperty, invalidator },
	properties,
	children,
	id
}) {
	diffProperty('pattern', (previous: TextInputProperties, next: TextInputProperties) => {
		const value = next.pattern instanceof RegExp ? next.pattern.source : next.pattern;
		if (value !== previous.pattern) {
			invalidator();
		}
	});

	const themedCss = theme.classes(css);
	const dirty = icache.getOrSet('dirty', false);

	const {
		aria = {},
		variant = 'flat' as (keyof typeof themedCss),
		responsive,
		autocomplete,
		// classes,
		customValidator,
		disabled,
		helperText,
		labelAnimated = true,
		labelHidden = false,
		max,
		maxLength,
		min,
		minLength,
		name,
		onBlur,
		onClick,
		onFocus,
		onKeyDown,
		onKeyUp,
		onOut,
		onOver,
		onValidate,
		onValue,
		pattern: patternValue,
		placeholder,
		readOnly,
		required,
		step,
		theme: themeProp,
		type = 'text',

		valid: validValue = { valid: undefined, message: '' },
		widgetId = `text-input-${id}`
	} = properties();

	let { initialValue, value } = properties();
	if (!icache.get('rendered')) {
		icache.set('rendered', true);
	} else {
		initialValue = void 0;
	}


	const [{ label: l, leading, trailing, focusContent } = {} as any] = children();
	const label: TextInputChildren | undefined = (!!l ? l : (!l && !!children()) ?
		children() : void 0) as TextInputChildren | undefined;

	if (value === undefined) {
		value = icache.get('value');
		const existingInitialValue = icache.get('initialValue');

		if (initialValue !== existingInitialValue) {
			icache.set('value', initialValue);
			icache.set('initialValue', initialValue);
			value = initialValue;
		}
	}

	const pattern = patternValue instanceof RegExp ? patternValue.source : patternValue;

	function _callOnValidate(valid: boolean | undefined, message: string) {
		let { valid: previousValid } = properties();
		let previousMessage: string | undefined;

		if (typeof previousValid === 'object') {
			previousMessage = previousValid.message;
			previousValid = previousValid.valid;
		}

		if (valid !== previousValid || message !== previousMessage) {
			onValidate && onValidate(valid, message);
		}
	}

	if (onValidate) {
		if (value === '' && !dirty) {
			_callOnValidate(undefined, '');
		} else {
			icache.set('dirty', true);
			let { valid, message = '' } = validity.get('input', value || '');
			if (valid && customValidator) {
				const customValid = customValidator(value || '');
				if (customValid) {
					valid = customValid.valid;
					message = customValid.message || '';
				}
			}

			_callOnValidate(valid, message);
		}
	}

	const { valid, message } =
		typeof validValue === 'boolean' ? { valid: validValue, message: '' } : validValue;

	const computedHelperText = (valid === false && message) || helperText;
	const inputFocused = focus.isFocused('input');

	return (
		<div key="root" classes={[
			theme.variant(),
			themedCss[variant],
			theme.sized(ui),
			theme.spaced(ui),
			theme.colored(colors),
			theme.animated(themedCss),
			responsive ? themedCss.responsive : null,
			label && labelAnimated === true ? themedCss.slideLabel : themedCss.staticLabel,
			themedCss.root
		]} role="presentation">
			<div
				key="wrapper"
				classes={[
					themedCss.wrapper,
					disabled ? themedCss.disabled : null,
					inputFocused ? themedCss.focused : null,
					valid === false ? themedCss.invalid : null,
					valid === true ? themedCss.valid : null,
					readOnly ? themedCss.readonly : null,
					required ? themedCss.required : null,
					leading ? themedCss.hasLeading : null,
					trailing ? themedCss.hasTrailing : null,
					!label || labelHidden ? themedCss.noLabel : null
				]}
				role="presentation">
				<div key="inputWrapper" classes={[
					themedCss.inputWrapper,
				]} role="presentation">
					{leading}
					<input
						{...formatAriaProperties(aria)}
						{...formatValue(initialValue)}
						aria-invalid={valid === false ? 'true' : null}
						autocomplete={formatAutocomplete(autocomplete)}
						classes={themedCss.input}
						disabled={disabled}
						id={widgetId}
						focus={focus.shouldFocus}
						key={'input'}
						max={max}
						maxlength={maxLength ? `${maxLength}` : null}
						min={min}
						minlength={minLength ? `${minLength}` : null}
						name={name}
						pattern={pattern}
						placeholder={placeholder ? placeholder : (labelAnimated === true ? ' ' : void 0)}
						readOnly={readOnly}
						aria-readonly={readOnly ? 'true' : null}
						required={required}
						step={step}
						type={type}
						onblur={() => {
							onBlur && onBlur();
						}}
						onfocus={() => {
							onFocus && onFocus();
						}}
						oninput={(event: Event) => {
							event.stopPropagation();
							const value = (event.target as HTMLInputElement).value;
							icache.set('value', value);
							onValue && onValue(value);
						}}
						onkeydown={(event: KeyboardEvent) => {
							event.stopPropagation();
							onKeyDown && onKeyDown(event.which, () => event.preventDefault());
						}}
						onkeyup={(event: KeyboardEvent) => {
							event.stopPropagation();
							onKeyUp && onKeyUp(event.which, () => event.preventDefault());
						}}
						onclick={() => {
							onClick && onClick();
						}}
						onpointerenter={() => {
							onOver && onOver();
						}}
						onpointerleave={() => {
							onOut && onOut();
						}}
					/>
					<div classes={[themedCss.border, theme.colored(colors)]}></div>
					{focusContent && <div classes={[themedCss.focusedContent]}>{focusContent}</div> }
					{trailing}
					{label && (
						<label
							classes={themedCss.label}
							theme={themeProp}
							disabled={disabled}
							valid={valid}
							focused={inputFocused}
							readOnly={readOnly}
							required={required}
							hidden={labelHidden}
							for={widgetId}
							active={!!value || inputFocused}
						>
							{label}
						</label>
					)}
				</div>
			</div>
			<HelperText
				text={computedHelperText}
				valid={valid}
				classes={([themedCss.helperText] as any)}
				theme={themeProp}
			/>
		</div>
	);
});

export interface AddonProperties {
	filled?: boolean;
}

const addonFactory = create({
	theme
})
	.properties<AddonProperties>()
	.children();

export const Addon = addonFactory(function Addon({ middleware: { theme }, properties, children }) {
	const themedCss = theme.classes(css);
	const { filled } = properties();

	return (
		<span classes={[themedCss.addonRoot, filled ? themedCss.addonFilled : null]}>
			{children()}
		</span>
	);
});

export default TextInput;
