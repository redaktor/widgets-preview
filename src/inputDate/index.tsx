import { RenderResult } from '@dojo/framework/core/interfaces';
import { create, tsx } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import i18n from '@dojo/framework/core/middleware/i18n';
import focus from '@dojo/framework/core/middleware/focus';
import theme from '@redaktor/widgets/middleware/theme';
import { Keys } from '@redaktor/widgets/common/util';
import TextInput, { BaseInputProperties } from '@redaktor/widgets/inputText';
import {
	parseDate, formatDateISO, formatDate
} from '@redaktor/widgets/calendarInput/date-utils';
import bundle from './nls/DateInput';
import * as css from '@redaktor/widgets/theme/material/timePicker.m.css';
import * as inputCss from '@redaktor/widgets/theme/material/inputText.m.css';

/* TODO parse relative w datezone */

export interface DateInputProperties extends BaseInputProperties {
	/** Set the disabled property of the control */
	disabled?: boolean;
	/** Callback to determine if a particular date entry should be disabled */
	dateDisabled?: (date: Date) => boolean;
	/** The name of the field */
	name?: string;
	/** Indicates the input is required to complete the form */
	required?: boolean;
	/** The maximum date to display in the menu (defaults to '23:59:59') */
	max?: Date;
	/** The minimum date to display in the menu (defaults to '00:00:00') */
	min?: Date;
	/** Relative dates, default locales for the user, false disables relative support */
	locales?: string[];
	/** Relative dates are parsed relative to this or now */
	relativeTo?: Date;
	/** Relative dates timezone, calculates int. differences with daylight savings */
	timezone?: string;
}

export interface DateInputChildren {
	/** The label to be displayed above the input */
	label?: RenderResult;
}

export interface DateInputICache {
	value?: string;
	lastValue: string;
	nextValue: string;
	inputValue: string;
	validationMessage: string | undefined;
	focusNode: 'input' | 'menu';
	inputValid?: boolean;
	inputValidMessage?: string;
	isValid?: boolean;
	initialValue?: string;
	min: Date;
	max: Date;
	dirty: boolean;
	callOnValue: void;
}

function isDateInputChildren(children: any): children is DateInputChildren {
	// In order to not make this a breaking change, check for an edge case where an object
	// with a label property that would have been used as a label might instead be treated as a render result
	return children && children.hasOwnProperty && children.hasOwnProperty('label');
}

const factory = create({
	theme,
	i18n,
	focus,
	icache: createICacheMiddleware<DateInputICache>()
})
	.properties<DateInputProperties>()
	.children<DateInputChildren | RenderResult | undefined>();


export const DateInput = factory(function DateInput({
	middleware: { theme, icache, focus, i18n},
	properties,
	children
}) {
	const themedCss = theme.classes(css);
	const { messages } = i18n.localize(bundle);

	const {
		initialValue,
		value: controlledValue,
		min = new Date(1970, 0, 1, 0, 0, 0, 0),
		max = new Date(2099, 11, 31, 23, 59, 59, 99),
		relativeTo = (new Date()),
		timezone,
		dateDisabled,
		locales,
		onValue,
		onBlur,
		onFocus,
		...inputProperties
	} = properties();

	const parse = (v?: string) => parseDate(v, locales, relativeTo, timezone);

	if (
		initialValue !== undefined &&
		controlledValue === undefined &&
		icache.get('initialValue') !== initialValue
	) {
		const parsed = initialValue && parse(initialValue);
		icache.set('inputValue', parsed ? formatDate(parsed) : '');
		icache.set('initialValue', initialValue);
		icache.delete('callOnValue');
	}

	if (controlledValue !== undefined && icache.get('lastValue') !== controlledValue) {
		const parsed = controlledValue && parse(controlledValue);
		icache.set('inputValue', parsed ? formatDate(parsed) : '');
		icache.set('value', parsed ? formatDateISO(parsed) : '');
		icache.set('lastValue', controlledValue);
	}
	if (!!icache.get('inputValue')) {
		const t = parse(icache.get('inputValue'));
		if (!!t !== icache.get('isValid')) {
			icache.set('isValid', !!t);
			if (!!t) {
				icache.set('validationMessage', void 0);
			}
		}
	} else if (!inputProperties.required && !icache.get('isValid')) {
		icache.set('isValid', true, false);
		icache.set('validationMessage', void 0);
	}

	const shouldFocus = focus.shouldFocus();
	const focusNode = icache.getOrSet('focusNode', 'input');

	function callOnValue() {
		const inputValue = icache.get('inputValue');
		const testValue = icache.get('nextValue') || inputValue;
		const { onValidate, onValue } = properties();

		let isValid = icache.get('inputValid');
		let validationMessages: string[] = [];

		if (icache.get('inputValidMessage')) {
			validationMessages.push(icache.get('inputValidMessage') || '');
		}

		if (min && max && min > max) {
			validationMessages.push(messages.invalidProps);
			isValid = false;
		} else {
			const newDate = parse(testValue);

			if (newDate !== undefined) {
				if (min && newDate < min) {
					validationMessages.push(messages.tooEarly);
				} else if (max && newDate > max) {
					validationMessages.push(messages.tooLate);
				} else {
					const twentyFourHourDate = formatDateISO(newDate);
					if (controlledValue === undefined) {
						icache.set('value', twentyFourHourDate);
						icache.set('inputValue', formatDate(newDate));
					}
					if (onValue) {
						onValue(twentyFourHourDate);
					}
				}
			} else {
				if (inputValue) {
					validationMessages.push(messages.invalidDate);
				}
			}

			isValid = validationMessages.length === 0;
			icache.set('isValid', isValid);
		}

		const validationMessage = validationMessages.join('; ');
		onValidate && onValidate(isValid, validationMessage);

		icache.set('validationMessage', validationMessage);
		icache.set('dirty', false);
	}

	icache.getOrSet('callOnValue', () => callOnValue());

	if (min !== icache.get('min') || max !== icache.get('max')) {
		icache.set('min', min);
		icache.set('max', max);
	}


	const { name, classes, design, color, size, disabled, required } = properties();
	const [labelChild] = children();
	const _label = isDateInputChildren(labelChild) ? labelChild.label : labelChild;

	// console.log('V', icache.get('value'), icache.get('inputValue'), icache.get('nextValue'));
	const d = parseDate(icache.get('nextValue') || icache.get('inputValue') || '');
	const label = icache.get('dirty') && icache.get('isValid') && d ? formatDate(d, locales) : _label;

	return (
		<div classes={[
			theme.variant(),
			themedCss.root,
			inputProperties.responsive && themedCss.responsive
		]}>
			<input
				type="hidden"
				name={name}
				value={icache.getOrSet('value', '')}
				aria-hidden="true"
			/>
			<TextInput
				{...inputProperties}
				key="input"
				disabled={disabled}
				required={required}
				focus={() => shouldFocus && focusNode === 'input'}
				theme={theme.compose(
					inputCss,
					css,
					'input'
				)}
				classes={classes}
				design={design}
				color={color}
				size={size}
				initialValue={icache.getOrSet('inputValue', '')}
				onBlur={() => {
					if (icache.get('dirty')) {
						callOnValue();
					}
					onBlur && onBlur(icache.get('nextValue') || icache.get('inputValue') || '');
				}}
				onValue={(v) => {
					onValue && onValue(v);
					return controlledValue === undefined
						? icache.set('inputValue', v || '')
						: icache.set('nextValue', v || '')
					}
				}
				onFocus={() => {
					icache.set('dirty', true);
					onFocus && onFocus();
				}}
				helperText={icache.get('validationMessage')||inputProperties.helperText}
				valid={icache.get('isValid') && icache.get('inputValid')}
				onValidate={(valid, message) => {
					if (valid !== icache.get('inputValid')) {
						icache.set('inputValid', valid);
						icache.set('inputValidMessage', message);
					}
				}}
				onKeyDown={(key) => {
					if (key === Keys.Down || key === Keys.Enter) {
						if (key === Keys.Enter) {
							callOnValue();
						}
						// openMenu();
					}
				}}
				type="text"
			>
				{{ label }}
			</TextInput>
		</div>
	)
});

export default DateInput;
