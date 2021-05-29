import { RenderResult } from '@dojo/framework/core/interfaces';
import { focus } from '@dojo/framework/core/middleware/focus';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { createResourceMiddleware } from '@dojo/framework/core/middleware/resources';
import { create, renderer, tsx } from '@dojo/framework/core/vdom';
import global from '@dojo/framework/shim/global';
import { theme, ThemeProperties, Keys, Variants } from '../middleware/theme';
import * as LI from './Listitem';
import MenuItem from './MenuItem';
import LoadingIndicator from '../loadingIndicator';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/list.m.css';
import * as fixedCss from './list.m.css';
import * as listItemCss from '../theme/material/list-item.m.css';
import * as menuItemCss from '../theme/material/menu-item.m.css';

export const ListItem = LI;
export type ListOption = { value: string; label?: string; disabled?: boolean; divider?: boolean };
export const defaultTransform = {
	value: ['value'],
	label: ['label'],
	divider: ['divider'],
	disabled: ['disabled']
};

export interface ListProperties extends ThemeProperties {
	/** The variant for the list: 'flat', 'outlined', 'raised', 'shaped'
	 * 'flat' by default
	 */
	variant?: Variants;
	/** The initial selected value */
	initialValue?: string;
	/** Controlled value property */
	value?: string;
	/** Callback called when user selects a value */
	onValue(value: string, index: number): void;
	/** Called to request that the menu be closed */
	onRequestClose?(): void;
	/** Optional callback, when passed, the widget will no longer control it's own active index / keyboard navigation */
	onActiveIndexChange?(index: number): void;
	/** Optional property to set the activeIndex when it is being controlled externally */
	activeIndex?: number;
	/** Callback to determine if a list item is disabled. If not provided, ListOption.disabled will be used */
	disabled?: (item: ListOption) => boolean;
	/** Hover / Click item */
	animated?: boolean;
	/** Determines if the widget can be focused or not.
	 * If the active index is controlled from elsewhere you may wish to stop the menu being focused and receiving keyboard events
	 */
	focusable?: boolean;
	/** Callback called when menu total height is calculated */
	onHeight?(height: number): void;
	/** Callback called when menu root is focused */
	onFocus?(): void;
	/** Callback called when menu root is blurred */
	onBlur?(): void;
	/** Callback called when menu root finished animations */
	onAnimationEnd?(): void;
	/** Property to determine how many items to render. Not passing a number will render all results */
	itemsInView?: number;
	/** Property to determine if this list is being used as a menu, changes a11y and item type */
	menu?: boolean;
	/** The id to be applied to the root of this widget, if not passed, one will be generated for a11y reasons */
	widgetId?: string;
	/** Styled for Lists above/before an element (e.g. Popups) */
	above?: boolean;
}

export interface MenuItemProperties {
	/** Callback used when the item is clicked */
	onSelect(): void;
	/** Property to set the active state of the item, indicates it's the current keyboard / mouse navigation target */
	active?: boolean;
	/** Callback used when the item wants to request it be made active, to example on pointer move */
	onRequestActive(): void;
	/** Property to set the disabled state of the item */
	disabled?: boolean;
	/** The id to apply to this widget top level for a11y */
	widgetId: string;
}
export interface ListItemProperties extends MenuItemProperties {
	/** Property to set the selected state of the item */
	selected?: boolean;
}

export interface ListChildren {
	/** Custom renderer for item contents */
	(
		item: ItemRendererProperties,
		properties: ListItemProperties & MenuItemProperties
	): RenderResult;
}

export interface ItemRendererProperties {
	active: boolean;
	disabled: boolean;
	label?: string;
	selected: boolean;
	value: string;
}

interface ListICache {
	activeIndex: number;
	initial: string;
	inputText: string;
	itemHeight: number;
	itemsInView: number;
	menuHeight: number;
	totalContentHeight: number;
	resetInputTextTimer: any;
	value: string;
	scrollTop: number;
	previousActiveIndex: number;
	requestedInputText: string;
}

const offscreenHeight = (dnode: RenderResult) => {
	const r = renderer(() => dnode);
	const div = global.document.createElement('div');
	div.style.position = 'absolute';
	global.document.body.appendChild(div);
	r.mount({ domNode: div, sync: true });
	const dimensions = div.getBoundingClientRect();
	global.document.body.removeChild(div);
	return dimensions.height;
};

const factory = create({
	focus, theme,
	icache: createICacheMiddleware<ListICache>(),
	resource: createResourceMiddleware<ListOption>()
})
	.properties<ListProperties>()
	.children<ListChildren | undefined>();

export const List = factory(function List({
	children,
	properties,
	id,
	middleware: { icache, focus, theme, resource }
}) {

	const themedCss = theme.classes(css);
	const { getOrRead, createOptions, find, meta, isLoading } = resource;
	const {
		variant = 'flat' as (Variants & keyof typeof themedCss),
		activeIndex,
		focusable = true,
		initialValue,
		itemsInView = 10,
		menu = false,
		above = false,
		onActiveIndexChange,
		onBlur,
		onFocus,
		onRequestClose,
		onAnimationEnd,
		onValue,
		// onHeight,
		widgetId,
		theme: themeProp,
		resource: { template, options = createOptions(id) }
	} = properties();
	const [itemRenderer] = children();

	function setActiveIndex(index: number) {
		if (onActiveIndexChange) {
			onActiveIndexChange(index);
		} else {
			icache.set('activeIndex', index);
		}
	}

	function setValue(value: string) {
		icache.set('value', value);
		onValue(value, icache.get('activeIndex')||0);
	}

	function onKeyDown(event: KeyboardEvent, total: number) {
		const { disabled } = properties();

		event.stopPropagation();

		switch (event.which) {
			case Keys.Enter:
			case Keys.Space:
				event.preventDefault();

				if (activeItem) {
					const itemDisabled = disabled ? disabled(activeItem) : activeItem.disabled;

					if (!itemDisabled) {
						setValue(activeItem.value);
					}
				}
				break;
			case Keys.Down:
				event.preventDefault();
				if (event.metaKey || event.ctrlKey) {
					setActiveIndex(total - 1);
				} else {
					setActiveIndex((computedActiveIndex + 1) % total);
				}
				break;
			case Keys.Up:
				event.preventDefault();
				if (event.metaKey || event.ctrlKey) {
					setActiveIndex(0);
				} else {
					setActiveIndex((computedActiveIndex - 1 + total) % total);
				}
				break;
			case Keys.Escape:
				event.preventDefault();
				onRequestClose && onRequestClose();
				break;
			case Keys.Home:
				event.preventDefault();
				setActiveIndex(0);
				break;
			case Keys.End:
				event.preventDefault();
				setActiveIndex(total - 1);
				break;
			default:
				if (!event.metaKey && !event.ctrlKey && event.key.length === 1) {
					icache.set('resetInputTextTimer', (existingTimer) => {
						if (existingTimer) {
							clearTimeout(existingTimer);
						}
						return setTimeout(() => {
							icache.delete('inputText');
						}, 800);
					});
					icache.set('inputText', (value = '') => {
						return `${value}${event.key}`;
					});
				}
				break;
		}
	}

	function renderItems(start: number, count: number, startNode: number) {
		const renderedItems = [];
		const metaInfo = meta(template, options(), true);
		if (metaInfo && metaInfo.total) {
			const pages: number[] = [];
			for (let i = 0; i < Math.min(metaInfo.total - start, count); i++) {
				const index = i + startNode;
				const page = Math.floor(index / count) + 1;
				if (pages.indexOf(page) === -1) {
					pages.push(page);
				}
			}
			const pageItems = getOrRead(template, options({ page: pages }));
			for (let i = 0; i < Math.min(metaInfo.total - start, count); i++) {
				const index = i + startNode;
				const page = Math.floor(index / count) + 1;
				const pageIndex = pages.indexOf(page);
				const indexWithinPage = index - (page - 1) * count;
				const items = pageItems[pageIndex];
				if (items && items[indexWithinPage]) {
					renderedItems[i] = renderItem(items[indexWithinPage], index);
				} else if (!items) {
					renderedItems[i] = renderPlaceholder(index);
				}
			}
		}
		return renderedItems;
	}

	function renderPlaceholder(index: number) {
		const itemProps = {
			widgetId: `${idBase}-item-${index}`,
			key: `item-${index}`,
			onSelect: () => {},
			active: false,
			onRequestActive: () => {
				setActiveIndex(index);
			},
			disabled: true
		};
		return menu ? (
			<MenuItem
				{...itemProps}
				theme={theme.compose(
					menuItemCss,
					css,
					'item'
				)}
			>
				<LoadingIndicator />
			</MenuItem>
		) : (
			<ListItem
				{...itemProps}
				selected={false}
				theme={theme.compose(
					listItemCss,
					css,
					'item'
				)}
			>
				<LoadingIndicator />
			</ListItem>
		);
	}

	function renderItem(data: ListOption, index: number) {
		const { disabled } = properties();
		const { value, label, divider, disabled: optionDisabled = false } = data;
		const itemDisabled = disabled ? disabled(data) : optionDisabled;
		const selected = value === selectedValue;
		const active = index === computedActiveIndex;
		if (active) {
			activeItem = data;
		}
		const itemProps = {
			widgetId: `${idBase}-item-${index}`,
			key: `item-${index}`,
			onSelect: () => {
				setValue(value);
			},
			active,
			onRequestActive: () => {
				setActiveIndex(index);
			},
			disabled: itemDisabled
		};

		let item: RenderResult;

		if (itemRenderer) {
			item = itemRenderer(
				{
					value,
					label,
					disabled: itemDisabled,
					active,
					selected
				},
				itemProps
			);
		} else {
			const children = label || value;
			item = menu ? (
				<MenuItem
					{...itemProps}
					theme={theme.compose(
						menuItemCss,
						css,
						'item'
					)}
				>
					{children}
				</MenuItem>
			) : (
				<ListItem
					{...itemProps}
					selected={selected}
					theme={theme.compose(
						listItemCss,
						css,
						'item'
					)}
				>
					{children}
				</ListItem>
			);
		}

		return divider ? [item, <hr classes={themedCss.divider} />] : item;
	}

	let { value: selectedValue } = properties();

	if (selectedValue === undefined) {
		if (initialValue !== undefined && initialValue !== icache.get('initial')) {
			icache.set('initial', initialValue);
			icache.set('value', initialValue);
		}
		selectedValue = icache.get('value');
	}

	if (itemsInView !== icache.get('itemsInView')) {
		icache.set('itemsInView', itemsInView);

		const offscreenItemProps = {
			selected: false,
			onSelect: () => {},
			active: false,
			onRequestActive: () => {},
			onActive: () => {},
			scrollIntoView: false,
			widgetId: 'offscreen',
			theme: themeProp
		};

		const offscreenMenuItem = itemRenderer ? (
			itemRenderer(
				{
					selected: false,
					active: false,
					value: 'offscreen',
					disabled: false
				},
				offscreenItemProps
			)
		) : menu ? (
			<MenuItem {...offscreenItemProps}>offscreen</MenuItem>
		) : (
			<ListItem {...offscreenItemProps}>offscreen</ListItem>
		);
		const itemHeight = icache.getOrSet('itemHeight', offscreenHeight(offscreenMenuItem));
		itemHeight && icache.set('menuHeight', itemsInView * itemHeight);
	}

	const nodePadding = Math.min(itemsInView, 20);
	const menuHeight = icache.get('menuHeight');
	const idBase = widgetId || `menu-${id}`;
	const rootStyles = menuHeight ? { maxHeight: `${menuHeight}px` } : {};
	const shouldFocus = focus.shouldFocus();
	const itemHeight = icache.getOrSet('itemHeight', 0);
	let scrollTop = icache.getOrSet('scrollTop', 0);

	const renderedItemsCount = itemsInView + 2 * nodePadding;
	options({ size: renderedItemsCount });
	let computedActiveIndex =
		activeIndex === undefined ? icache.getOrSet('activeIndex', 0) : activeIndex;
	const inputText = icache.get('inputText');
	const requestedInputText = icache.get('requestedInputText');
	if (inputText || requestedInputText) {
		const findOptions = {
			options: options(),
			start: computedActiveIndex + 1,
			type: 'start' as const,
			query: { value: inputText || requestedInputText }
		};
		if (!isLoading(template, findOptions)) {
			const foundItem = find(template, findOptions);
			if (!foundItem) {
				if (inputText && (!requestedInputText || inputText !== requestedInputText)) {
					icache.set('requestedInputText', inputText);
				} else {
					icache.delete('requestedInputText');
				}
			} else {
				icache.delete('requestedInputText');
			}
			if (foundItem && computedActiveIndex !== foundItem.index) {
				setActiveIndex(foundItem.index);
			}
		}
	}

	const previousActiveIndex = icache.get('previousActiveIndex');
	computedActiveIndex =
		activeIndex === undefined ? icache.getOrSet('activeIndex', 0) : activeIndex;
	let activeItem: ListOption | undefined = undefined;

	if (computedActiveIndex !== previousActiveIndex) {
		const visibleStartIndex = Math.floor(scrollTop / itemHeight);
		const visibleEndIndex = visibleStartIndex + itemsInView - 1;
		if (computedActiveIndex < visibleStartIndex) {
			scrollTop = computedActiveIndex * itemHeight;
		} else if (computedActiveIndex > visibleEndIndex) {
			scrollTop = Math.max(computedActiveIndex + 1 - itemsInView, 0) * itemHeight;
		}

		if (icache.get('scrollTop') !== scrollTop) {
			icache.set('scrollTop', scrollTop);
		}

		icache.set('previousActiveIndex', computedActiveIndex);
	}

	const startNode = Math.max(0, Math.floor(scrollTop / itemHeight) - nodePadding);
	const offsetY = startNode * itemHeight;

	const items = renderItems(startNode, renderedItemsCount, startNode);
	const metaInfo = meta(template, options(), true);

	if (!metaInfo || metaInfo.total === undefined) {
		return;
	}

	const total = metaInfo.total;
// const totalContentHeight = total * itemHeight;


	return (
		<div
			key="root"
			classes={[
				theme.variant(),
				(themedCss as any)[variant],
				theme.sized(ui),
				theme.spaced(ui),
				theme.colored(colors), // TODO
				theme.animated(themedCss),
				above ? themedCss.above : null,
				themedCss.root,
				fixedCss.root
			]}
			tabIndex={focusable ? 0 : -1}
			onkeydown={(e) => {
				onKeyDown(e, total);
			}}
			onpointerdown={focusable ? undefined : (event) => event.preventDefault()}
			focus={() => shouldFocus}
			onfocus={() => { onFocus && onFocus() }}
			onblur={onBlur}
			scrollTop={scrollTop}
			onscroll={(e) => {
				const newScrollTop = (e.target as HTMLElement).scrollTop;
				if (scrollTop !== newScrollTop) {
					icache.set('scrollTop', newScrollTop);
				}
			}}
			onanimationend={(e:any) => {
				e.pseudoElement === '' && onAnimationEnd && onAnimationEnd();
			}}
			styles={rootStyles}
			role={menu ? 'menu' : 'listbox'}
			aria-orientation="vertical"
			aria-activedescendant={`${idBase}-item-${computedActiveIndex}`}
			id={idBase}
		>
			<div
				classes={[fixedCss.transformer, themedCss.transformer]}
				styles={{ transform: `translateY(${offsetY}px)` }}
				key="transformer"
			>
				{items}
			</div>
		</div>
	);
});

export default List;
