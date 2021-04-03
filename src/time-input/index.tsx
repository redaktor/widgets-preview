import { RenderResult } from '@dojo/framework/core/interfaces';
import Map from '@dojo/framework/shim/Map';
import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '../middleware/theme';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import i18n from '@dojo/framework/core/middleware/i18n';
import focus from '@dojo/framework/core/middleware/focus';
import { Keys } from '../common/util';
import TextInput, { BaseInputProperties } from '../text-input';
import { ListOption } from '../list';
import { parseTime, format24HourTime } from './time-utils';
import bundle from './nls/TimeInput';
import * as css from '../theme/material/time-picker.m.css';
import * as inputCss from '../theme/material/text-input.m.css';

/* TODO parse relative w timezone */

export interface TimeInputProperties extends BaseInputProperties {
	/** Set the disabled property of the control */
	disabled?: boolean;
	/** Callback to determine if a particular time entry should be disabled */
	timeDisabled?: (time: Date) => boolean;
	/** The name of the field */
	name?: string;
	/** Indicates the input is required to complete the form */
	required?: boolean;
	/** The maximum time to display in the menu (defaults to '23:59:59') */
	max?: string;
	/** The minimum time to display in the menu (defaults to '00:00:00') */
	min?: string;
	/** The number of seconds between each option in the menu (defaults to 1800) */
	step?: number;
	/** How the time is formatted. 24 hour, 12 hour (defaults to 24) */
	format?: '24' | '12';
	/** Property to determine how many items to render. Defaults to 10 */
	itemsInView?: number;
	/** Relative times, default locales for the user, false disables relative support */
	locales?: string[];
	/** Relative dates are parsed relative to this or now */
	relativeTo?: Date;
	/** Relative dates timezone, calculates int. differences with daylight savings */
	timezone?: string;
}

export interface TimeInputChildren {
	/** The label to be displayed above the input */
	label?: RenderResult;
}

export interface TimeInputICache {
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
	min: string;
	max: string;
	step: number;
	options: (ListOption & { dt: number })[];
	dirty: boolean;
	callOnValue: void;
}
const optionsCache = new Map<string, (ListOption & { dt: number })[]>();

function isTimeInputChildren(children: any): children is TimeInputChildren {
	// In order to not make this a breaking change, check for an edge case where an object
	// with a label property that would have been used as a label might instead be treated as a render result
	return children && children.hasOwnProperty && children.hasOwnProperty('label');
}

const factory = create({
	theme,
	i18n,
	focus,
	icache: createICacheMiddleware<TimeInputICache>()
})
	.properties<TimeInputProperties>()
	.children<TimeInputChildren | RenderResult | undefined>();


export const TimeInput = factory(function TimeInput({
	middleware: { theme, icache, focus, i18n},
	properties,
	children
}) {
	const themedCss = theme.classes(css);
	const { messages } = i18n.localize(bundle);

	const formatTime = (time: Date) => {
		const { format = '24', step = 1800 } = properties();

		const hideSeconds = step >= 60 && time.getSeconds() === 0;

		if (format === '24') {
			return time
				.toLocaleTimeString(undefined, {
					hour12: false,
					hour: 'numeric',
					minute: 'numeric',
					second: hideSeconds ? undefined : 'numeric'
				})
				.replace(/[^a-zA-Z\d\s:.]/g, '');
		} else {
			return time
				.toLocaleTimeString(undefined, {
					hour12: true,
					hour: 'numeric',
					minute: 'numeric',
					second: hideSeconds ? undefined : 'numeric'
				})
				.replace(/[^a-zA-Z\d\s:.]/g, '');
		}
	};

	const {
		initialValue,
		format = '24',
		value: controlledValue,
		min = '00:00:00',
		max = '23:59:59',
		itemsInView = 10,
		step = 1800,
		relativeTo = (new Date()),
		timezone,
		timeDisabled,
		locales,
		onValue,
		onBlur,
		onFocus,
		...inputProperties
	} = properties();
	const is12 = format === '12';
	const parse = (v?: string, is12 = false) => parseTime(v, is12, locales, relativeTo, timezone);

	if (
		initialValue !== undefined &&
		controlledValue === undefined &&
		icache.get('initialValue') !== initialValue
	) {
		const parsed = initialValue && parse(initialValue, is12);
		icache.set('inputValue', parsed ? formatTime(parsed) : '');
		icache.set('initialValue', initialValue);
		icache.delete('callOnValue');
	}

	if (controlledValue !== undefined && icache.get('lastValue') !== controlledValue) {
		const parsed = controlledValue && parse(controlledValue, is12);
		icache.set('inputValue', parsed ? formatTime(parsed) : '');
		icache.set('value', parsed ? format24HourTime(parsed) : '');
		icache.set('lastValue', controlledValue);
	}
	if (!!icache.get('inputValue')) {
		const t = parse(icache.get('inputValue'), is12);
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
		const { onValidate, onValue, format } = properties();
		const is12 = format === '12';
		const max = parse(properties().max, is12);
		const min = parse(properties().min, is12);

		let isValid = icache.get('inputValid');
		let validationMessages: string[] = [];

		if (icache.get('inputValidMessage')) {
			validationMessages.push(icache.get('inputValidMessage') || '');
		}

		if (min && max && min > max) {
			validationMessages.push(messages.invalidProps);
			isValid = false;
		} else {
			const newTime = parse(testValue, is12);

			if (newTime !== undefined) {
				if (min && newTime < min) {
					validationMessages.push(messages.tooEarly);
				} else if (max && newTime > max) {
					validationMessages.push(messages.tooLate);
				} else {
					const twentyFourHourTime = format24HourTime(newTime);
					if (controlledValue === undefined) {
						icache.set('value', twentyFourHourTime);
						icache.set('inputValue', formatTime(newTime));
					}
					if (onValue) {
						onValue(twentyFourHourTime);
					}
				}
			} else {
				if (inputValue) {
					validationMessages.push(messages.invalidTime);
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

	if (min !== icache.get('min') || max !== icache.get('max') || step !== icache.get('step')) {
		icache.set('options', () => {
			const key = `${min}-${max}-${step}`;
			const cached = optionsCache.get(key);
			if (cached) {
				return cached;
			}
			const options: (ListOption & { dt: number })[] = [];
			const dt = parse(min, false) || new Date(1970, 0, 1, 0, 0, 0, 0);
			const end = parse(max, false) || new Date(1970, 0, 1, 23, 59, 59, 99);
			while (dt.getDate() === 1 && dt <= end) {
				const value = formatTime(dt);

				options.push({
					dt: dt.getTime(),
					label: value,
					value: value
				});

				dt.setSeconds(dt.getSeconds() + step);
			}
			optionsCache.set(key, options);
			return options;
		});
		icache.set('min', min);
		icache.set('max', max);
		icache.set('step', step);
	}
	const { name, classes, variant, color, size, disabled, required } = properties();
	const [labelChild] = children();
	const _label = isTimeInputChildren(labelChild) ? labelChild.label : labelChild;
	const p = parseTime((icache.get('nextValue') || icache.get('inputValue') || ''), false, locales, relativeTo, timezone);
	const t = p && format24HourTime(p);
	const label = icache.get('dirty') && icache.get('isValid') && t ? t : _label;

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
				variant={variant}
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
				helperText={icache.get('validationMessage')}
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

export default TimeInput;
