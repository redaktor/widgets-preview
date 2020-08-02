import { create, tsx } from '@dojo/framework/core/vdom';
import HelperText from '../helper-text/index';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
// import dimensions from '@dojo/framework/core/middleware/dimensions';

import { theme, formatAriaProperties, ThemeProperties, Variants } from '../middleware/theme';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as inputCss from '../theme/material/text-input.m.css';
import * as css from '../theme/material/text-area.m.css';

import focus from '@dojo/framework/core/middleware/focus';
import validity from '@dojo/framework/core/middleware/validity';
import { RenderResult } from '@dojo/framework/core/interfaces';

export interface TextAreaProperties extends ThemeProperties {
	/** Custom aria attributes */
	aria?: { [key: string]: string | null };
	/** The variant for the input: 'flat', 'outlined', 'raised', 'shaped'
	 * 'flat' by default
	 */
	variant?: Variants & (keyof typeof inputCss);
	responsive?: boolean;

	expand?: boolean;
	/** Number of columns, controls the width of the textarea */
	columns?: number;
	/** Custom validator used to validate the contents of the TextArea */
	customValidator?: (value: string) => { valid?: boolean; message?: string } | void;
	/** Set the disabled property of the control */
	disabled?: boolean;
	/** Renders helper text to the user */
	helperText?: string;
	/** Hides the label from view while still remaining accessible for screen readers */
	labelHidden?: boolean;

	labelAnimated?: boolean;
	/** Maximum number of characters allowed in the input */
	maxLength?: number | string;
	/** Minimum number of characters allowed in the input */
	minLength?: number | string;
	/** The name of the field */
	name?: string;

	/** Handler for when the element is blurred */
	onBlur?(): void;

	/** Handler of when the element is clicked */
	onClick?(): void;

	/** Handler for when the element is focused */
	onFocus?(): void;

	/** Handler for when a key is depressed in the element */
	onKeyDown?(key: number, preventDefault: () => void): void;

	/** Handler for when a key is released in the element */
	onKeyUp?(key: number, preventDefault: () => void): void;

	/** Handler for when the pointer moves out of the element */
	onOut?(): void;

	/** Handler for when the pointer moves over the element */
	onOver?(): void;

	/** Called when TextArea's state is validated */
	onValidate?: (valid: boolean | undefined, message: string) => void;

	/** Handler for when the value of the widget changes */
	onValue?(value?: string): void;

	/** Placeholder text displayed in an empty TextArea */
	placeholder?: string;
	/** Makes the field readonly (it may be focused but not changed) */
	readOnly?: boolean;
	/** Sets the input as required to complete the form */
	required?: boolean;
	/** Number of rows, controls the height of the textarea */
	rows?: number;
	/** If the field is valid and optionally display a message */
	valid?: { valid?: boolean; message?: string } | boolean;
	/** The initial value */
	initialValue?: string;
	/** Controlled value property */
	value?: string;
	/** The id used for the form input element */
	widgetId?: string;
	/** Controls text wrapping. Can be "hard", "soft", or "off" */
	wrapText?: 'hard' | 'soft' | 'off';
}

export interface TextAreaICache {
	dirty: boolean;
	value?: string;
	initialValue?: string;
	style?: string;
	line: number;
}

const factory = create({
	icache: createICacheMiddleware<TextAreaICache>(),
	theme,
	focus,
	// dimensions,
	validity
})
	.properties<TextAreaProperties>()
	.children<RenderResult | undefined>();


export const TextArea = factory(function TextArea({
	id,
	middleware: { icache, theme, focus, /*dimensions,*/ validity },
	properties,
	children
}) {
	const themedCss = theme.classes(css);

	function callOnValidate(valid: boolean | undefined, message: string) {
		let { valid: previousValid, onValidate } = properties();
		let previousMessage: string | undefined;

		if (typeof previousValid === 'object') {
			previousMessage = previousValid.message;
			previousValid = previousValid.valid;
		}

		if (valid !== previousValid || message !== previousMessage) {
			onValidate && onValidate(valid, message);
		}
	}

	function validate() {
		const { customValidator, value = icache.get('value') || '' } = properties();
		const dirty = icache.getOrSet('dirty', false);

		if (value === '' && !dirty) {
			callOnValidate(undefined, '');
			return;
		}

		icache.set('dirty', true);

		let { valid, message = '' } = validity.get('input', value || '');
		if (valid && customValidator) {
			const customValid = customValidator(value);
			if (customValid) {
				valid = customValid.valid;
				message = customValid.message || '';
			}
		}

		callOnValidate(valid, message);
	}

	function getValidity() {
		const { valid = { valid: undefined, message: undefined } } = properties();

		if (typeof valid === 'boolean') {
			return { valid, message: undefined };
		}

		return {
			valid: valid.valid,
			message: valid.message
		};
	}

	const {
		aria = {},
		variant = 'flat' as (keyof typeof inputCss),
		responsive = false,
		expand = true,
		columns = 20,
		disabled,
		widgetId = `textarea-${id}`,
		maxLength,
		minLength,
		name,
		placeholder,
		readOnly,
		required,
		rows = 2,
		initialValue,
		wrapText,
		theme: themeProp,
		classes,
		labelAnimated = true,
		labelHidden,
		helperText,
		onValidate
	} = properties();

	let { value } = properties();

	if (value === undefined) {
		value = icache.get('value');
		const existingInitialValue = icache.get('initialValue');

		if (initialValue !== existingInitialValue) {
			icache.set('value', initialValue);
			icache.set('initialValue', initialValue);
			value = initialValue;
		}
	}

	onValidate && validate();
	const { valid, message } = getValidity();

	const computedHelperText = (valid === false && message) || helperText;
	const inputFocused = focus.isFocused('input');

	const [{ label: l} = {} as any] = children();
	const label = (!!l ? l : (!l && !!children()) ?
		children() : void 0) || void 0;

// const [label] = children();
	const isExpand = theme.isJS() && expand;
	return (
		<div key="root" classes={[
			themedCss.root,
			isExpand ? themedCss.expand : null,
			isExpand && icache.get('value') ? themedCss.expanded : null,
			responsive ? themedCss.responsive : null,
			label && labelAnimated === true ? themedCss.slideLabel : themedCss.staticLabel,
			theme.variant(),
			inputCss[variant],
			theme.sized(ui),
			theme.spaced(ui),
			theme.colored(colors),
			theme.animated(themedCss)
		]}>
			<div key="stub" id={`stub-${id}`} classes={themedCss.stub} />
			<div
				key="wrapper"
				classes={[
					themedCss.wrapper,
					disabled ? themedCss.disabled : null,
					valid === false ? themedCss.invalid : null,
					valid === true ? themedCss.valid : null,
					readOnly ? themedCss.readonly : null,
					required ? themedCss.required : null,
					inputFocused ? themedCss.focused : null
				]}
			>
				<textarea
					id={widgetId}
					key="input"
					{...formatAriaProperties(aria)}
					classes={themedCss.input}
					style={isExpand && icache.get('style')}
					cols={`${columns}`}
					disabled={disabled}
					focus={focus.shouldFocus}
					aria-invalid={valid === false ? 'true' : null}
					maxlength={maxLength ? `${maxLength}` : null}
					minlength={minLength ? `${minLength}` : null}
					name={name}
					placeholder={placeholder ? placeholder : (labelAnimated === true ? ' ' : void 0)}
					readOnly={readOnly}
					aria-readonly={readOnly ? 'true' : null}
					required={required}
					rows={`${rows}`}
					value={value}
					wrap={wrapText}
					onblur={() => {
						const { onBlur } = properties();
						onBlur && onBlur();
					}}
					onfocus={() => {
						const { onFocus } = properties();
						onFocus && onFocus();
					}}
					oninput={(event: Event) => {
						const { onValue } = properties();
						event.stopPropagation();
						const value = (event.target as HTMLInputElement).value;
						if (isExpand && !!value.length) {
							const input: any = document.getElementById(widgetId);
							const getStyle = (k: string) => {
							  return input.currentStyle ?
									input.currentStyle[k] :
									(document as any).defaultView.getComputedStyle(input,null).getPropertyValue(k);
							}
							const stub: any = document.getElementById(`stub-${id}`);
							stub.innerHTML = '<br style="line-height: var(--ptb,4px);">' + value;
							stub.style.width = `${input.offsetWidth}px`;
							stub.style.visibility = 'hidden';
							stub.style.display = 'block';
							stub.style['line-height'] = getStyle('line-height');
							stub.style['font-size'] = getStyle('font-size');
				      const h = stub.offsetHeight;
				      stub.style.visibility = 'visible';
				      stub.style.display = 'none';
						  icache.set('style', h ? `height: ${h}px;` : 'height: auto;');
						} else if (!value.length) {
							icache.set('style', 'height: auto;');
						}
						icache.set('value', value);
						onValue && onValue(value);
					}}
					onkeydown={(event: KeyboardEvent) => {
						const { onKeyDown } = properties();
						event.stopPropagation();
						//
						onKeyDown &&
							onKeyDown(event.which, () => {
								event.preventDefault();
							});
					}}
					onkeyup={(event: KeyboardEvent) => {
						const { onKeyUp } = properties();
						event.stopPropagation();
						/*
						icache.set('style', 'height: auto;');
						isExpand && setExpandStyle();
						*/
						onKeyUp &&
							onKeyUp(event.which, () => {
								event.preventDefault();
							});
					}}
					onclick={() => {
						const { onClick } = properties();
						onClick && onClick();
					}}
					onpointerenter={() => {
						const { onOver } = properties();
						onOver && onOver();
					}}
					onpointerleave={() => {
						const { onOut } = properties();
						onOut && onOut();
					}}
				/>
				<b classes={themedCss.border} />
				<b classes={themedCss.bg} />
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
			<HelperText
				text={computedHelperText}
				valid={valid}
				classes={(classes as any)}
				theme={themeProp}
			/>
		</div>
	);
});

export default TextArea;
