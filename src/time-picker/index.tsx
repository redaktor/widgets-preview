import { RenderResult } from '@dojo/framework/core/interfaces';
import Map from '@dojo/framework/shim/Map';
import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '../middleware/theme';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import {
	createResourceTemplate,
	createResourceMiddleware
} from '@dojo/framework/core/middleware/resources';
import i18n from '@dojo/framework/core/middleware/i18n';
import focus from '@dojo/framework/core/middleware/focus';
import Icon from '../icon';
import { Keys } from '../common/util';
import TextInput from '../text-input';
import TriggerPopup from '../trigger-popup';
import Button from '../button';
import { List, ListOption } from '../list';
import { TimeInputProperties, TimeInputChildren, TimeInputICache } from '../time-input';
import { parseTime, format24HourTime } from '../time-input/time-utils';
import bundle from '../time-input/nls/TimeInput';
import * as css from '../theme/material/time-picker.m.css';
import * as inputCss from '../theme/material/text-input.m.css';

/* TODO parse relative w timezone */

const template = createResourceTemplate<ListOption>('value');
const resource = createResourceMiddleware();
const optionsCache = new Map<string, (ListOption & { dt: number })[]>();

function isTimePickerChildren(children: any): children is TimeInputChildren {
	// In order to not make this a breaking change, check for an edge case where an object
	// with a label property that would have been used as a label might instead be treated as a render result
	return children && children.hasOwnProperty && children.hasOwnProperty('label');
}

const factory = create({
	resource,
	theme,
	i18n,
	focus,
	icache: createICacheMiddleware<TimeInputICache>()
})
	.properties<TimeInputProperties>()
	.children<TimeInputChildren | RenderResult | undefined>();


export const TimePicker = factory(function TimePicker({
	id,
	middleware: { theme, icache, focus, i18n, resource },
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
	const options = icache.getOrSet('options', []).map(({ label, value, dt }) => ({
		label,
		value,
		disabled: timeDisabled ? timeDisabled(new Date(dt)) : false
	}));
	const { name, theme: themeProp, classes, variant, color, size } = properties();
	const [labelChild] = children();
	const _label = isTimePickerChildren(labelChild) ? labelChild.label : labelChild;

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
			<TriggerPopup key="popup" theme={themeProp} classes={classes} variant={variant}>
				{{
					trigger: (toggleOpen) => {
						function openMenu() {
							icache.set('focusNode', 'menu');
							focus.focus();
							toggleOpen();
						}

						const { disabled, required } = properties();

						return (
							<div classes={themedCss.input}>
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
											openMenu();
										}
									}}
									type="text"
								>
									{{
										label,
										trailing: (
												<Button
													theme={themeProp}
													key="clockIcon"
													variant='flat'
													size={size}
													disabled={disabled}
													onClick={openMenu}
													classes={{
														'@dojo/widgets/button': {
															root: [themedCss.toggleMenuButton]
														}
													}}
												>
													<Icon type="clockIcon" size={size} />
												</Button>
										)
									}}
								</TextInput>
							</div>
						);
					},
					content: (onClose) => {
						function closeMenu() {
							icache.set('focusNode', 'input');
							focus.focus();
							onClose();
						}

						return (
							<div key="menu-wrapper" classes={themedCss.menuWrapper}>
								<List
									key="menu"
									itemsInView={itemsInView}
									height="auto"
									animated={true}
									theme={themeProp}
									classes={classes}
									variant={'filled'}
									color={color}
									size={size}
									focus={() => shouldFocus && focusNode === 'menu'}
									resource={resource({
										template: template({ id, data: options })
									})}
									onValue={(value) => {
										if (controlledValue === undefined) {
											icache.set('inputValue', value.value);
										} else {
											icache.set('nextValue', value.value);
										}
										callOnValue();
										closeMenu();
									}}
									onRequestClose={closeMenu}
									onBlur={closeMenu}
									initialValue={''}
									menu
								/>
							</div>
						);
					}
				}}
			</TriggerPopup>
		</div>
	);
});

export default TimePicker;
