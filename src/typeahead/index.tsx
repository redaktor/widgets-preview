import { create, tsx} from '@dojo/framework/core/vdom';
import { PopupPosition } from '@dojo/widgets/popup';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { createResourceMiddleware, ResourceMeta } from '@dojo/framework/core/middleware/resources';
// import { createResource, createMemoryTemplate } from '../framework/resource';
/* ^^^ TODO FIXME : THIS IS 7.0 '@dojo/framework/core/resource' */
// import MetaBase from '@dojo/framework/core/meta/Base';
import focus from '@dojo/framework/core/middleware/focus';
import { theme, ThemeProperties, Keys, Variants } from '../middleware/theme';
import List, {
	ItemRendererProperties, ListOption, ListItemProperties, MenuItemProperties, ListProperties
} from '../list';

// import { find } from '@dojo/framework/shim/array';
// import LoadingIndicator from '../loading-indicator';
import TriggerPopup from '../trigger-popup';
import TextInput from '../text-input';
import bundle from '../select/select.nls';
import i18n from '@dojo/framework/core/middleware/i18n';
import HelperText from '../helper-text';

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
	position: PopupPosition;
	isDirty: boolean;
	isExpanded: boolean;
	isOpening: boolean;
	isClosing: boolean;
	isValid: boolean;
	focusNode: string;
	initial: string;
	menuHeight: number;
	selected: boolean;
	meta?: ResourceMeta;
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
	resource: createResourceMiddleware<ListOption>(),
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
	middleware: { icache, resource, theme, focus, i18n }
}) {
	const themedCss = theme.classes(css);
	const { messages } = i18n.localize(bundle);
	const { createOptions, meta, find, /*isLoading, getOrRead*/ } = resource;
	const {
		initialValue,
		value: controlledValue,
		strict = true,
		variant = 'flat',
		animated = true,
		size = 'm',
		color = 'primary',
		position = 'below',
		disabled,
		required,
		name,
		helperText,
		itemsInView,
		onValidate,
		resource: { template, options = createOptions(id) }
	} = properties();

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
		options({ query: { value: controlledValue } });
	}

	let valid = icache.get('isValid');
	let invalidText = '';
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
	if (strict && Boolean(value) && icache.get('lastValue') !== icache.get('value')) {
		icache.set('isValid', false);
		valid = false;
		invalidText = messages.strictMessage;
		onValidate && onValidate(false);
	}
	if (strict && required && !valid) {
		invalidText = messages.strictMessage;
	} else if (required && !valid) {
		invalidText = messages.requiredMessage;
	}


	function callOnValue(value: string) {
		const { onValidate, onValue, required } = properties();
		const lastValue = icache.get('lastValue');
		if (lastValue === value) { return }

		let valid = !required ? true : required && !value;
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
		const metaInfo = meta(template, options()) || icache.get('meta');
		const total = (metaInfo && metaInfo.total) || 0;

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
				icache.set('selected', true);
				onClose();
				break;
/*
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
				*/
		}
	}

	function renderList(toggleClosed?: any) {
		function closeMenu() {
			icache.set('focusNode', 'trigger');
			toggleClosed && toggleClosed();
		}
		return <List
			variant={variant}
			animated={true}
			above={icache.get('position') === 'above'}
			key="menu"
			focusable={false}
			activeIndex={icache.get('activeIndex')}
			resource={resource({ template, options })}
			onValue={(value: any) => {
				focus.focus();
				closeMenu();
				value !== icache.get('value') && icache.set('value', value);
				callOnValue(value);
				icache.set('lastValue', value);
			}}
			onHeight={(h: any) => icache.set('menuHeight', h)}
			onRequestClose={closeMenu}
			onAnimationEnd={() => { animated && icache.set('isOpening', false); }}
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
						themedCss[variant as (Variants & keyof typeof themedCss)],
						disabled ? themedCss.disabled : null
					],
					transformer: [themedCss.menuTransformer],
					item: [themedCss.listItem, disabled ? themedCss.disabled : null]
				}
			}}
			widgetId={listId}
		>
			{items}
		</List>
	}

	const helper = ((valid === false && invalidText) || helperText) &&
	<HelperText
		key="helperText"
		text={valid === false ? invalidText : helperText}
		valid={valid}
		/*
		classes={{
			'@dojo/widgets/helper-text': {
				root: [theme.spaced(ui)]
			}
		}}
		*/
	/>;

	return (
		<virtual>
			{icache.get('position') === 'below' && helper}
			<div
				key="root"
				classes={[
					themedCss.root,
					theme.variant(),
					theme.sized(ui),
					theme.spaced(ui),
					theme.colored(colors),
					theme.animated(themedCss),
					animated && icache.get('activeIndex') === void 0 ? themedCss.first : null,
					themedCss[icache.get('position')||position],
					icache.get('isExpanded') ? themedCss.open : null,
					helper ? themedCss.hasHelperText : null,
					disabled ? themedCss.disabled : null,
					valid === true ? themedCss.valid : null,
					valid === false ? themedCss.invalid : null
				]}
			>
				<TriggerPopup
					key="popup"
					onOpen={(openPos) => {
						icache.set('isExpanded', true);
						if (openPos !== icache.get('position')) {
							icache.set('position', openPos);
						}
					}}
					onClose={() => {
						icache.set('isExpanded', false);
						icache.set('position', 'below');
						if (!icache.get('isDirty')) {
							icache.set('isDirty', true);
						}
					}}
					minHeight={Math.max(icache.get('menuHeight')||0, 120)}
					position={position}
				>
					{{
						content: renderList,
						trigger: (toggleOpen) => {
							function openMenu() {
								const { disabled } = properties();
								if (!disabled && !icache.get('isExpanded')) {
									toggleOpen();
									icache.set('isExpanded', true);
									icache.getOrSet('activeIndex', -1);
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

							let valueOption: any;
							if (value) {
								valueOption = (
									find(template, {
										options: options(),
										start: 0,
										query: { value },
										type: 'exact'
									}) || {
										item: undefined
									}
								).item;
							}


							return (
								<TextInput
									autocomplete={false}
									variant={variant}
									animated={animated}
									size={size}
									spaced={false}
									color={color}
									onValue={(value) => {
										if (value !== icache.get('value')) {
											animated && icache.get('isOpening') && icache.set('isOpening', false);
											openMenu();
											options({ query: { value } });
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
										openMenu();
										animated && icache.set('isOpening', true);
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
									required={required}
									classes={{
										'@dojo/widgets/text-input': {
											root: [themedCss.trigger, themedCss[icache.get('position')||position]],
											label: [themedCss.label],
											input: [themedCss.input],
											focusedContent: [themedCss.focusedWrapper]
										}
									}}
									onKeyDown={(event, preventDefault) => {
										onKeyDown(event, preventDefault, openMenu, closeMenu);
									}}
									valid={valid}
								>
									{{ label, leading, focusContent: (theme.isJS() === false) && renderList() }}
								</TextInput>
							);
						}
					}}
				</TriggerPopup>
			</div>
			{icache.get('position') === 'above' && helper}
		</virtual>
	);
});

export default Typeahead;
/*
const menuMinH = 120;
const { position: triggerPosition } = dimensions.get('root');
const el = document.scrollingElement || document.documentElement;
const scrollTop = el.scrollTop || Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
const aboveTop = scrollTop + triggerPosition.top;
const belowBottom = el.scrollHeight - triggerPosition.bottom;
const belowVisible = el.clientHeight - triggerPosition.bottom;
let pos = position||'below';
const nPos = pos === 'below' ? 'above' : 'below';
const willFit = {
	below: {
		fixed: belowVisible - menuMinH > 0,
		scroll: belowBottom - menuMinH > 0
	},
	above: {
		fixed: triggerPosition.top - menuMinH > 0,
		scroll: aboveTop - menuMinH > 0
	}
};
if (!willFit[pos].fixed) {
	const autoPos = (willFit[nPos].fixed) ? nPos : (aboveTop < belowBottom ? 'below' : 'above');
	pos = (!position) ? autoPos : (!willFit[nPos].fixed && willFit[pos].scroll ? pos : autoPos)
}
console.log(pos);
if (icache.get('position') === 'above') {
	icache.set('isAbove', true)
}
*/
