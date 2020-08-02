import { create, tsx } from '@dojo/framework/core/vdom';
import { PopupPosition } from '@dojo/widgets/popup';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { createDataMiddleware } from '@dojo/framework/core/middleware/data';
// import { createResource, createMemoryTemplate } from '../framework/resource';
/* ^^^ TODO FIXME : THIS IS 7.0 '@dojo/framework/core/resource' */
// import MetaBase from '@dojo/framework/core/meta/Base';
import focus from '@dojo/framework/core/middleware/focus';
import { theme, ThemeProperties, Keys, Variants } from '../middleware/theme';
import List, {
	ItemRendererProperties, ListOption, ListItemProperties, MenuItemProperties, ListProperties
} from '../list';

import TriggerPopup from '../trigger-popup';
import { find } from '@dojo/framework/shim/array';
import TextInput from '../text-input';
import bundle from '../select/select.nls';
import i18n from '@dojo/framework/core/middleware/i18n';
import HelperText from '../helper-text';
import LoadingIndicator from '../loading-indicator';

/* TODO how to deal with native autocomplete ?
// TODO onSort / onSortRemaining (notMatches)

// TODO - phonetic search - localized AS string !!!  */
// import Search, { SearchResult } from '../framework/String/search/';
// import phonetics from '../../framework/String/phonetic/doubleMetaphone';
// import germanPhonetics from '../../framework/String/phonetic/colognePhonetics';
// import spanishPhonetics from '../../framework/String/phonetic/spanishPhonology';

import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/typeahead.m.css';
import * as listCss from '../theme/material/list.m.css';
import * as inputCss from '../theme/material/text-input.m.css';

export interface TypeaheadProperties extends ThemeProperties {
	/** The variant for the input and box: 'flat', 'outlined', 'raised', 'shaped'
	 * 'flat' by default
	 */
	variant?: Variants;
	/** Callback called when user selects a value */
	onValue(value: string): void;
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
	/** Flag to indicate if values other than those in the resource can be entered, defaults to true */
	strict?: boolean;
}

export interface TypeaheadICache {
	value: string;
	lastValue: string | undefined;
	activeIndex: number;
	isDirty: boolean;
	isExpanded: boolean;
	isAbove: boolean;
	isValid: boolean;
	focusNode: string;
	initial: string;
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

/* // TODO FIXME if screen too small: scrollIntoView
export class ScrollViewMeta extends MetaBase {
	public scroll(key: string | number): void {
		const node = this.getNode(key);
		if (node) {
			node.scrollIntoView({block: "end", behavior: "smooth"});
		}
	}
}
*/

const factory = create({
	icache: createICacheMiddleware<TypeaheadICache>(),
	data: createDataMiddleware<ListOption>(),
	theme,
	focus,
	i18n
})
	.properties<TypeaheadProperties>()
	.children<TypeaheadChildren | undefined>();

let shiftPx = 0;
const style = getComputedStyle(document.body);
const baseSize = parseInt(style.getPropertyValue('--base-size'), 10);
const line = baseSize * parseFloat(style.getPropertyValue('--base-line'));
if (line) {
	const small = baseSize * parseFloat(style.getPropertyValue('--small-size')) || 0;
	shiftPx = !small ? (line * 2) : (line * 2);
}

export const Typeahead = factory(function Typeahead({
	id,
	properties,
	children,
	middleware: { icache, data, theme, focus, i18n }
}) {
	const themedCss = theme.classes(css);
	const { messages } = i18n.localize(bundle);
	const {
		initialValue,
		variant = 'flat',
		animated = true,
		size = 'm',
		spaced = true,
		color = 'primary',
		disabled,
		required,
		position,
		name,
		helperText,
		itemsInView,
		transform,
		onValidate,
		strict = true,
		value: controlledValue
	} = properties();
	const { get, getOptions, setOptions, shared, getTotal, isLoading } = data();
	const sharedResource = shared();
	/*
	sharedResource.resource = createResource(
		createMemoryTemplate({
			filter: (query, item) => {
				// use the query and item to provide custom filtering
				console.log(query,item);
				return true
			}
		})
	);*/

	const [{ label, items, leading } = {} as TypeaheadChildren] = children();

	if (
		initialValue !== undefined &&
		controlledValue === undefined &&
		initialValue !== icache.get('initial')
	) {
		icache.set('initial', initialValue);
		icache.set('value', initialValue);
	}

	if (controlledValue !== undefined && icache.get('lastValue') !== controlledValue) {
		icache.set('value', controlledValue);
		icache.set('lastValue', controlledValue);
		setOptions({ query: { value: controlledValue } });
	}

	let valid = icache.get('isValid');
	const value = icache.get('value');
	const listId = `typeahead-list-${id}`;
	const triggerId = `typeahead-trigger-${id}`;
	const isDirty = icache.get('isDirty');

	if (required && isDirty) {
		const isValid = Boolean(value);
		if (isValid !== valid) {
			icache.set('isValid', isValid);
			valid = isValid;
			onValidate && onValidate(isValid);
		}
	}

	function callOnValue(value: string) {
		const { onValidate, onValue, required } = properties();
		const lastValue = icache.get('lastValue');

		if (lastValue === value) {
			return;
		}

		let valid = required ? true : undefined;
		if (required && !value) {
			valid = false;
		}

		icache.set('lastValue', value);
		icache.set('isValid', Boolean(valid));
		value && onValue && onValue(value);
		onValidate && onValidate(valid);
	}

	function onKeyDown(
		event: number,
		preventDefault: () => void,
		onOpen: () => boolean,
		onClose: () => void
	) {
		const activeIndex = icache.getOrSet('activeIndex', 0);
		const total = getTotal(getOptions()) || 0;

		switch (event) {
			case Keys.Escape:
				onClose();
				break;
			case Keys.Down:
				preventDefault();
				if (!onOpen()) {
					icache.set('activeIndex', (activeIndex + 1) % total);
				}
				break;
			case Keys.Up:
				preventDefault();
				if (!onOpen()) {
					icache.set('activeIndex', (activeIndex - 1 + total) % total);
				}
				break;
			case Keys.Enter:
				preventDefault();

				const allItems = get({ query: getOptions().query });
				if (allItems && allItems.length >= activeIndex) {
					const { itemDisabled } = properties();

					const activeItem = allItems[activeIndex];
					let disabled = false;
					if (activeItem) {
						disabled = itemDisabled ? itemDisabled(activeItem) : !!activeItem.disabled;

						if (!disabled) {
							icache.set('value', activeItem.value);
							onClose();
							callOnValue(activeItem.value);
						} else if (!strict) {
							const value = icache.getOrSet('value', '');
							onClose();
							callOnValue(value);
						}
					} else {
						if (strict) {
							const { onValidate, required } = properties();
							if (required) {
								icache.set('isValid', false);
								onValidate && onValidate(false);
							}
						} else {
							const value = icache.getOrSet('value', '');
							onClose();
							callOnValue(value);
						}
					}
				}
				break;
		}
	}

	return (
		<div
			key="root"
			classes={[
				theme.variant(),
				theme.sized(ui),
				theme.spaced(ui),
				theme.colored(colors),
				theme.animated(themedCss),
				themedCss.root,
				icache.get('isExpanded') && themedCss.open,
				icache.get('isAbove') && themedCss.above,
				disabled && themedCss.disabled,
				valid === true && themedCss.valid,
				valid === false && themedCss.invalid
			]}
		>
			<TriggerPopup
				key="popup"
				shiftPx={shiftPx}
				onOpen={(position: any) => {
					if (position === 'above') {
						icache.set('isAbove', true)
					}
					icache.set('isExpanded', true);
				}}
				onClose={() => {
					icache.set('isExpanded', false);
					icache.set('isAbove', false);
					if (!icache.get('isDirty')) {
						icache.set('isDirty', true);
					}
				}}
				position={position}
			>
				{{
					trigger: (toggleOpen) => {
						function openMenu() {
							const { disabled } = properties();

							if (!disabled && !icache.get('isExpanded')) {
								toggleOpen();
								icache.set('isExpanded', true);
								icache.set('activeIndex', 0);
								return true;
							}

							return false;
						}

						function closeMenu() {

							if (icache.get('isExpanded')) {
								toggleOpen();
								icache.set('isExpanded', false);
							}
						}

						let valueOption: ListOption | undefined;
						const currentOptions = get(getOptions());
						if (currentOptions && currentOptions.length) {
							valueOption = find(currentOptions, (option) => option.value === value);
						}

						return (
							<TextInput
								autocomplete={false}
								variant={variant}
								animated={animated}
								size={size}
								spaced={spaced}
								color={color}
								onValue={(value) => {
									if (value !== icache.get('value')) {
										openMenu();
										setOptions({ query: { value: value } });
										icache.set('value', value || '');
									}
								}}
								theme={theme.compose(
									inputCss,
									css,
									'input'
								)}
								onFocus={() => {
									const { onFocus } = properties();

									onFocus && onFocus();
								}}
								onBlur={() => {
									const { onBlur } = properties();
									closeMenu();
									onBlur && onBlur();
								}}
								name={name}
								initialValue={valueOption ? valueOption.label || valueOption.value : value}
								focus={() =>
									icache.get('focusNode') === 'trigger' && focus.shouldFocus()
								}
								aria={{
									controls: listId,
									haspopup: 'listbox',
									isExpanded: `${icache.getOrSet('isExpanded', false)}`
								}}
								key="trigger"
								widgetId={triggerId}
								disabled={disabled}
								classes={{
									'@dojo/widgets/text-input': {
										root: [themedCss.trigger, icache.get('isAbove') ? themedCss.above : null],
										label: [themedCss.label],
										input: [themedCss.input],
										focusedContent: [themedCss.focusedWrapper]
									}
								}}
								onClick={openMenu}
								onKeyDown={(event, preventDefault) => {
									onKeyDown(event, preventDefault, openMenu, closeMenu);
								}}
								valid={valid}
							>
								{{ label, leading, focusContent: <div classes={[themedCss.focused]}>TEST</div> }}
							</TextInput>
						);
					},
					content: (toggleClosed) => {
						function closeMenu() {
							icache.set('focusNode', 'trigger');
							toggleClosed();
						}

						return getTotal(getOptions()) === undefined && isLoading(getOptions()) ? (
							<LoadingIndicator key="loading" />
						) : (
							<div key="menu-wrapper" classes={[
								themedCss.menuWrapper,
								theme.sized(ui)
							]}>
								<List
									variant={variant}
									above={icache.get('isAbove')}
									key="menu"
									focusable={false}
									activeIndex={icache.get('activeIndex')}
									resource={sharedResource}
									transform={transform}
									onValue={(value) => {
										focus.focus();
										closeMenu();
										value !== icache.get('value') && icache.set('value', value);
										callOnValue(value);
										icache.set('lastValue', value);
									}}
									onRequestClose={closeMenu}
									onAnimationEnd={() => {console.log('animation ended')}}
									onBlur={closeMenu}
									initialValue={value}
									itemsInView={itemsInView}
									theme={theme.compose(
										listCss,
										css,
										'menu'
									)}
									classes={{
										'@dojo/widgets/list': {
											root: [
												themedCss.menu,
												theme.animated(themedCss),
												themedCss[variant],
												themedCss.open,
												icache.get('isAbove') && themedCss.above
											],
											transformer: [themedCss.menuTransformer],
											item: [themedCss.listItem]
										}
									}}
									widgetId={listId}
								>
									{items}
								</List>
							</div>
						);
					}
				}}
			</TriggerPopup>
			<HelperText
				key="helperText"
				text={valid === false ? messages.requiredMessage : helperText}
				valid={valid}
			/>
		</div>
	);
});

export default Typeahead;
