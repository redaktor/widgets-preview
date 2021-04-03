import { create, tsx } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import List, {ItemRendererProperties,ListOption,ListProperties} from '../list';
import { ListItemProperties, MenuItemProperties } from '../list/Listitem';

import theme from '../middleware/theme';
import focus from '@dojo/framework/core/middleware/focus';
import i18n from '@dojo/framework/core/middleware/i18n';
import { dimensions } from '@dojo/framework/core/middleware/dimensions';
import { createResourceMiddleware } from '@dojo/framework/core/middleware/resources';
import TriggerPopup from '../trigger-popup';
import { PopupPosition } from '@dojo/widgets/popup';
import TextInput from '../text-input';
import HelperText from '../helper-text';
import { Keys } from '../common/util';
import LoadingIndicator from '../loading-indicator';
import { find } from '@dojo/framework/shim/array';
import bundle from '../select/nls/Select';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/typeahead.m.css';
import * as inputCss from '../theme/material/text-input.m.css';

export interface TypeaheadProperties {
	/** Callback called when user selects a value */
	onValue?(value: ListOption): void;
	/** The initial selected value */
	initialValue?: string;
	/** Property to determine how many items to render. Defaults to 6 */
	itemsInView?: number;
	/** Placement of the select menu; 'above' or 'below' */
	position?: PopupPosition;
	/** Property to determine if the input is disabled */
	disabled?: boolean;
	/** Sets the helper text of the input */
	helperText?: string;
	/** Boolean to indicate if field is required */
	required?: boolean;
	/** Callback when valid state has changed */
	onValidate?(valid?: boolean): void;
	/** The name property of the input */
	name?: string;
	/** Optional controlled value of the typeahead */
	value?: string;
	/** Callback fired when the input is blurred */
	onBlur?(): void;
	/** Callback fired when the input is focused */
	onFocus?(): void;
	/** Callback to determine if an individual item is disabled */
	itemDisabled?: ListProperties['disabled'];
	/** Flag to indicate if values must be those in the resource, defaults to true */
	strict?: boolean;
}

export interface TypeaheadICache {
	value: string;
	labelValue: string;
	lastValue: string | undefined;
	activeIndex: number;

	isDirty: boolean;
	isExpanded: boolean;
	isClosing: boolean;
	isAbove: boolean;
	isValid: boolean;

	focusNode: string;
	initial: string;
	valid: boolean | undefined;
	selectedOption?: ListOption;
	scrollTop?: number;
}

export interface TypeaheadChildren {
	/** The label to show */
	label?: RenderResult;
	/** Custom renderer for item contents */
	items?: (
		item: ItemRendererProperties,
		props: ListItemProperties & MenuItemProperties
	) => RenderResult;
	leading?: RenderResult;
}

const factory = create({
	icache: createICacheMiddleware<TypeaheadICache>(),
	resource: createResourceMiddleware<ListOption>(),
	dimensions,
	theme,
	focus,
	i18n
})
	.properties<TypeaheadProperties>()
	.children<TypeaheadChildren | undefined>();

export const Typeahead = factory(function Typeahead({
	id,
	properties,
	children,
	middleware: { icache, resource, dimensions, theme, focus, i18n }
}) {
	const {
		initialValue,
		disabled,
		required,
		position,
		name,
		helperText,
		itemsInView,
		onValidate,
		strict = true,
		value: controlledValue,
		itemDisabled,
		resource: {
			template,
			options = resource.createOptions((curr, next) => ({ ...curr, ...next }))
		},
		classes,
		theme: themeProp,
		variant,
		color = 'primary',
		size = 'm',
	} = properties();
	const {
		get,
		template: { read }
	} = resource.template(template);

	const themedCss = theme.classes(css);
	const { messages } = i18n.localize(bundle);

	const [{ label, items, leading } = {} as TypeaheadChildren] = children();

	if (
		initialValue !== undefined &&
		controlledValue === undefined &&
		initialValue !== icache.get('initial')
	) {
		icache.set('initial', initialValue);
		icache.set('value', initialValue);
		icache.delete('labelValue');
	}
	const updatedValue = icache.get('lastValue') !== controlledValue;
	if (controlledValue !== undefined && updatedValue) {
		icache.set('value', controlledValue);
		icache.set('lastValue', controlledValue);
		icache.delete('labelValue');
		icache.set('selectedOption', (option) => {
			if (option && option.value !== controlledValue) {
				return undefined;
			}
			return option;
		});
		options({ query: { value: controlledValue } });
	}

	let valid = icache.get('valid');
	let value = icache.get('value');
	let labelValue = icache.get('labelValue');
	const listId = `typeahead-list-${id}`;
	const triggerId = `typeahead-trigger-${id}`;
	const dirty = icache.get('isDirty');
	if (strict && icache.get('selectedOption')) {
		icache.set('valid', true, false)
	}

	function callOnValue(value: ListOption) {
		const { onValidate, onValue, required } = properties();
		const lastValue = icache.get('lastValue');

		if (lastValue === value.value) {
			return;
		}

		let valid = required ? true : undefined;
		if (required && !value) {
			valid = false;
		}

		icache.set('lastValue', value.value);
		icache.set('valid', valid);
		value && onValue && onValue(value);
		onValidate && onValidate(valid);
	}

	function onKeyDown(
		event: number,
		preventDefault: () => void,
		onOpen: () => boolean,
		onClose: () => void
	) {
		const {
			meta: { total = 0 }
		} = get(options(), { meta: true, read });
		switch (event) {
			case Keys.Escape:
				onClose();
				break;
			case Keys.Down:
				preventDefault();
				if (!onOpen()) {
					icache.set('activeIndex', (activeIndex = strict ? 0 : -1) => {
						return total ? (activeIndex + 1) % total : total;
					});
				}
				break;
			case Keys.Up:
				preventDefault();
				if (!onOpen()) {
					icache.set('activeIndex', (activeIndex = 0) => {
						activeIndex = activeIndex === -1 ? 0 : activeIndex;
						return total ? (activeIndex - 1 + total) % total : total;
					});
				}
				break;
			case Keys.Enter:
				preventDefault();
				const activeIndex = icache.getOrSet('activeIndex', strict ? 0 : -1);
				const labelValue = icache.get('labelValue');
				if (activeIndex > -1 || labelValue) {
					const data = get({ ...options(), size: total });
					let selectedValue: ListOption | undefined;
					const activeItem = data[activeIndex];
					if (strict) {
						if (!data.length) {
							if (required) {
								icache.set('valid', false);
								onValidate && onValidate(false);
							}
							options({ query: {} });
							icache.set('labelValue', '');
						} else if (activeItem) {
							const disabled = itemDisabled
								? itemDisabled(activeItem)
								: !!activeItem.disabled;
							if (!disabled) {
								const { value: itemValue, label, disabled, divider } = activeItem;
								selectedValue = { value: itemValue, label, disabled, divider };
							}
						}
					} else {
						if (activeItem) {
							const disabled = itemDisabled
								? itemDisabled(activeItem)
								: !!activeItem.disabled;
							if (!disabled) {
								const { value: itemValue, label, disabled, divider } = activeItem;
								selectedValue = { value: itemValue, label, disabled, divider };
							}
						}
						if (!selectedValue && labelValue) {
							selectedValue = find(data, (item) => {
								if (item) {
									return item.label.toLowerCase() === labelValue!.toLowerCase();
								}
								return false;
							});
							if (!selectedValue) {
								selectedValue = { value: labelValue, label: labelValue };
							}
						}
					}
					if (selectedValue) {
						icache.set('value', selectedValue.value);
						icache.set('selectedOption', selectedValue);
						callOnValue(selectedValue);
					}
				}
				onClose();
				break;
		}
	}
	const {
		meta: { total, status }
	} = get(options(), { meta: true, read });
	const selectedOption = icache.get('selectedOption');
	if (required && dirty) {
		const isValid = Boolean(selectedOption) || Boolean(!strict && !!labelValue);
		if (isValid !== valid) {
			icache.set('valid', isValid);
			valid = isValid;
			onValidate && onValidate(isValid);
		}
	}

	let currentItems = [];
	if (!icache.get('selectedOption') && value) {
		currentItems = get(options(), { read }) || [];
		const option = currentItems.find((item) => Boolean(item && item.value === value));
		if (option) {
			icache.set('selectedOption', option);
		} else {
			const findItem =
				get({ ...options(), query: { ...options().query, value } }, { read }) || [];
			if (findItem) {
				icache.set('selectedOption', findItem[0]);
			}
		}
	}

	return (
		<div
			key="root"
			classes={[
				theme.variant(),
				theme.sized(ui),
				theme.sized(themedCss),
				theme.colored(colors),
				theme.spaced(ui, false),
				theme.animated(themedCss, true),
				themedCss.root,
				disabled && themedCss.disabled,
				valid === true && themedCss.valid,
				valid === false && themedCss.invalid
			]}
		>
			<TriggerPopup
				key="popup"
				onOpen={() => icache.set('isExpanded', true)}
				onClose={() => {
					icache.set('isExpanded', false);
					if (!icache.get('isDirty')) {
						icache.set('isDirty', true);
					}
				}}
				position={position}
				classes={classes}
				theme={themeProp}
				variant={variant}
			>
				{{
					trigger: (toggleOpen) => {
						function openMenu() {
							const { disabled } = properties();

							if (!disabled && !icache.get('isExpanded')) {
								toggleOpen();
								icache.set('isExpanded', true);
								icache.set('activeIndex', strict ? 0 : -1);
								return true;
							}

							return false;
						}

						function closeMenu() {
							if (icache.get('isExpanded')) {
								toggleOpen();
								icache.set('isExpanded', false);
							}
							if (!icache.get('isDirty')) {
								icache.set('isDirty', true);
							}
						}

						const selectedOption = icache.get('selectedOption');
						return (
							<TextInput
								selection={
									((!!icache.get('valid') && !!icache.get('selectedOption')) ||
									!currentItems.length)
								}
								onValue={(value) => {
									openMenu();
									options({ query: { label: value } });
									icache.set('labelValue', value || '');
									icache.set('activeIndex', strict ? 0 : -1);
									icache.delete('value');
									icache.delete('selectedOption');
								}}
								theme={theme.compose(inputCss, css, 'input')}
								onFocus={() => {
									const { onFocus } = properties();
									onFocus && onFocus();
								}}
								onBlur={() => {
									const { onBlur } = properties();
									if (!strict) {
										const value = icache.getOrSet('labelValue', '');
										const currentOption = icache.get('selectedOption');
										const selectedOption = icache.set(
											'selectedOption',
											(selectedOption) => {
												if (selectedOption) {
													return selectedOption;
												}
												if (value) {
													return { value, label: value };
												}
											}
										);
										icache.set(
											'value',
											selectedOption ? selectedOption.value : value
										);
										if (selectedOption) {
											if (
												!currentOption ||
												currentOption.value !== selectedOption.value
											) {
												callOnValue(selectedOption);
											}
										}
									} else if (typeof icache.get('selectedOption') === 'undefined') {
										icache.set('valid', false);
										onValidate && onValidate(false);
									}

									closeMenu();
									onBlur && onBlur();
								}}
								name={name}
								value={selectedOption ? selectedOption.label : labelValue || ''}
								focus={() =>
									icache.get('focusNode') === 'trigger' && focus.shouldFocus()
								}
								aria={{
									controls: listId,
									haspopup: 'listbox',
									expanded: `${icache.getOrSet('isExpanded', false)}`
								}}
								key="trigger"
								widgetId={triggerId}
								disabled={disabled}
								classes={{
									'@dojo/widgets/text-input': {
										root: [themedCss.trigger]
									}
								}}
								variant={variant}
								color={color}
								size={size}
								onClick={openMenu}
								onKeyDown={(event, preventDefault) => {
									onKeyDown(event, preventDefault, openMenu, closeMenu);
								}}
								valid={icache.get('valid')}
							>
								{{ label, leading }}
							</TextInput>
						);
					},
					content: (toggleClosed) => {
						function closeMenu() {
							icache.set('focusNode', 'trigger');
							toggleClosed();
						}

						const { itemDisabled } = properties();

						const menu = <List
							key="menu"
							height="auto"
							animated={true}
							focusable={false}
							activeIndex={icache.getOrSet('activeIndex', strict ? 0 : -1)}
							resource={resource({ template, options })}
							disabled={itemDisabled}
							classes={{
								'@dojo/widgets/list': {
									root: [
										themedCss.menu,
										variant && (themedCss as any)[variant],
										disabled ? themedCss.disabled : null
									],
									transformer: [themedCss.menuTransformer],
									item: [themedCss.listItem, disabled ? themedCss.disabled : null]
								}
							}}
							onValue={(value, scrollTop) => {

								focus.focus();
								closeMenu();
								icache.set('scrollTop', scrollTop, false);
								if (value.value !== icache.get('value')) {
									icache.set('value', value.value);
									icache.set('selectedOption', value);
								}
								callOnValue(value);
							}}
							scrollTop={icache.get('scrollTop')}
							onRequestClose={closeMenu}
							onBlur={closeMenu}
							initialValue={value}
							itemsInView={itemsInView}
							variant={variant}
							color={color}
							size={size}
							widgetId={listId}
						>
							{items}
						</List>

						return total === undefined && status === 'reading' ? (
							<LoadingIndicator
								key="loading"
								theme={themeProp}
								classes={classes}
								variant={variant}
								color={color}
								size={size}
							/>
						) : (
							<div
								key="menu-wrapper"
								classes={[
									themedCss.menuWrapper,
									/* TODO isJS */
									// theme.isJS() ? themedCss.js : null,
									icache.get('isClosing') ? themedCss.closing : (!icache.get('activeIndex') ? themedCss.opening : null),
									!icache.get('isExpanded') && icache.get('isAbove') ? themedCss.above : themedCss.below
								]}
							>
								{menu}
							</div>
						);
					}
				}}
			</TriggerPopup>
			<HelperText
				key="helperText"
				text={valid === false ? messages.requiredMessage : helperText}
				valid={valid}
				theme={themeProp}
			/>
		</div>
	);
});

export default Typeahead;
