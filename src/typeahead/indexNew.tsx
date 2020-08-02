import { create, tsx } from '@dojo/framework/core/vdom';
import { PopupPosition } from '@dojo/widgets/popup';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { createDataMiddleware } from '@dojo/framework/core/middleware/data';
import { dimensions } from '@dojo/framework/core/middleware/dimensions';
// import { createResource, createMemoryTemplate } from '../framework/resource';
/* ^^^ TODO FIXME : THIS IS 7.0 '@dojo/framework/core/resource' */
// import MetaBase from '@dojo/framework/core/meta/Base';
import focus from '@dojo/framework/core/middleware/focus';
import { theme, ThemeProperties, Keys, Variants } from '../middleware/theme';
import List, {
	offscreenHeight, ListProperties,
	ItemRendererProperties, ListOption, ListItemProperties, MenuItemProperties
} from '../list';

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
	isClosing: boolean;
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
	dimensions,
	theme,
	focus,
	i18n
})
	.properties<TypeaheadProperties>()
	.children<TypeaheadChildren | undefined>();
/*
let shiftPx = 0;
const style = getComputedStyle(document.body);
const baseSize = parseInt(style.getPropertyValue('--base-size'), 10);
const line = baseSize * parseFloat(style.getPropertyValue('--base-line'));
if (line) {
	const small = baseSize * parseFloat(style.getPropertyValue('--small-size')) || 0;
	shiftPx = !small ? (line * 2) : (line * 2);
}
*/
export const Typeahead = factory(function Typeahead({
	id,
	properties,
	children,
	middleware: { icache, data, dimensions, theme, focus, i18n }
}) {
	const themedCss = theme.classes(css);
	const { messages } = i18n.localize(bundle);
	const {
		initialValue,
		variant = 'flat' as (Variants & keyof typeof themedCss),
		animated = true,
		size = 'm',
		spaced = true,
		color = 'primary',
		disabled = false,
		required = false,
		name,
		helperText = '',
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

	let valueOption: ListOption | undefined;
	const currentOptions = get(getOptions());
	if (currentOptions && currentOptions.length) {
		valueOption = find(currentOptions, (option) => option.value === value);
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
		let activeIndex: number;
		const total = getTotal(getOptions()) || 0;

		switch (event) {
			case Keys.Escape:
				onClose();
				break;
			case Keys.Down:
				preventDefault();
				activeIndex = icache.getOrSet('activeIndex', 0);
				if (!onOpen()) {
					icache.set('activeIndex', (activeIndex + 1) % total);
				}
				break;
			case Keys.Up:
				preventDefault();
				activeIndex = icache.getOrSet('activeIndex', 0);
				if (!onOpen()) {
					icache.set('activeIndex', (activeIndex - 1 + total) % total);
				}
				break;
			case Keys.Enter:
				preventDefault();
				activeIndex = icache.getOrSet('activeIndex', 0);
				const allItems = get({ query: getOptions().query });
				if (allItems && allItems.length >= activeIndex) {
					const { itemDisabled } = properties();

					const activeItem = allItems[activeIndex];
					let disabled = false;
					if (activeItem) {
						disabled = itemDisabled ? itemDisabled(activeItem) : !!activeItem.disabled;

						if (!disabled) {
							icache.set('value', activeItem.value);
							icache.set('activeIndex', activeIndex);
							onClose();
							callOnValue(activeItem.value);
						} else if (!strict) {
							const value = icache.getOrSet('value', '');
							icache.set('activeIndex', activeIndex);
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

	function openMenu() {
		const { disabled = false } = properties();
		if (!disabled && !icache.get('isExpanded')) {
			icache.set('isExpanded', true);
			!theme.isJS() && icache.set('activeIndex', 0);
			return true;
		}
		return false;
	}

	function closeMenu() {
		const { animated = true } = properties();
		icache.set('focusNode', 'trigger');
		if (icache.get('isExpanded')) {
			if (animated) {
				icache.set('isClosing', true);
			} else {
				icache.set('isExpanded', false);
			}
		}
	}
	function closeAnimatedMenu() {
		if (icache.get('isClosing')) {
			icache.set('isExpanded', false);
			icache.set('isClosing', false);
		}
	}
	function renderMenu() {
		const menu = <List
			key="menu"
			variant={variant}
			animated={true}
			above={icache.get('isAbove')}
			focusable={false}
			activeIndex={icache.get('activeIndex')}
			resource={sharedResource}
			transform={transform}
			onValue={(value, index) => {
				focus.focus();
				closeMenu();
				icache.set('activeIndex', index);
				value !== icache.get('value') && icache.set('value', value);
				callOnValue(value);
				icache.set('lastValue', value);
			}}
			onAnimationEnd={closeAnimatedMenu}
			onRequestClose={closeMenu}
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
		const menuHeight = offscreenHeight(menu);
		const { position: triggerPosition } = dimensions.get('root');
		const el = document.scrollingElement || document.documentElement;
		const scrollTop = el.scrollTop || Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
		const aboveTop = scrollTop + triggerPosition.top;
		const aboveBottom = scrollTop + triggerPosition.bottom;
		const belowBottom = el.scrollHeight - triggerPosition.bottom;
		const belowVisible = el.clientHeight - triggerPosition.bottom;
		const { position } = properties();
		let pos = position||'below';
		const nPos = pos === 'below' ? 'above' : 'below';
		const willFit = {
			below: {
				fixed: belowVisible - menuHeight > 0,
				scroll: belowBottom - menuHeight > 0
			},
			above: {
				fixed: triggerPosition.top - menuHeight > 0,
				scroll: triggerPosition.top - menuHeight > 0
			}
		};
		if (!willFit[pos].fixed) {
			const autoPos = (willFit[nPos].fixed) ? nPos : (aboveTop < belowBottom ? 'below' : 'above');
			pos = (!position) ? autoPos : (!willFit[nPos].fixed && willFit[pos].scroll ? pos : autoPos)
		}
		icache.set('isAbove', pos === 'above');
		const styles = !theme.isJS ? {} : {
			style: `left:${triggerPosition.left}px;
top: ${pos === 'below' ? (scrollTop + triggerPosition.bottom) : (aboveTop - menuHeight + (aboveBottom - aboveTop))}px;`
		}

		return <div
			key="menu-wrapper"
			{...styles}
			classes={[
				themedCss.menuWrapper,
				theme.isJS ? themedCss.js : null,
				theme.animated(themedCss),
				theme.sized(ui),
				icache.get('isClosing') ? themedCss.closing : (!icache.get('activeIndex') ? themedCss.opening : null),
				!icache.get('isExpanded') && icache.get('isAbove') ? themedCss.above : themedCss.below
			]}>{menu}</div>
	}

	return <virtual>
	{(theme.isJS() && icache.get('isExpanded')) && <body>{renderMenu()}</body>}
	<div
		key="root"
		classes={[
			theme.variant(),
			themedCss[variant as (Variants & keyof typeof themedCss)],
			theme.sized(ui),
			theme.spaced(ui),
			theme.colored(colors),
			theme.animated(themedCss),
			icache.get('activeIndex') === void 0 ? themedCss.first : null,
			themedCss.root,
			icache.get('isAbove') ? themedCss.above : themedCss.below,
			disabled && themedCss.disabled,
			valid === true ? themedCss.valid : (valid === false ? themedCss.invalid : null)
		]}
	>
		<TextInput
			key="trigger"
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
			widgetId={triggerId}
			disabled={disabled}
			classes={{
				'@dojo/widgets/text-input': {
					root: [themedCss.trigger],
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
			{{
				label,
				leading,
				focusContent: (theme.isJS() === false) && renderMenu()
			}}
		</TextInput>
		<HelperText
			key="helperText"
			text={valid === false ? messages.requiredMessage : helperText}
			valid={valid}
		/>
	</div>
</virtual>
});

export default Typeahead;
