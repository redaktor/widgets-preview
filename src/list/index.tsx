import { RenderResult } from '@dojo/framework/core/interfaces';
import { node } from '@dojo/framework/core/vdom';
import { focus } from '@dojo/framework/core/middleware/focus';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { create, renderer, tsx } from '@dojo/framework/core/vdom';
import global from '@dojo/framework/shim/global';
import { createResourceMiddleware } from '@dojo/framework/core/middleware/resources';
import theme, { ThemeProperties } from '@redaktor/widgets/middleware/theme';
import { Keys } from '@redaktor/widgets/common/util';
import offscreen from '@redaktor/widgets/middleware/offscreen';
import * as ui from '@redaktor/widgets/theme/material/_ui.m.css';
import * as colors from '@redaktor/widgets/theme/material/_color.m.css';
import * as listItemCss from '@redaktor/widgets/theme/material/list-item.m.css';
import * as menuItemCss from '@redaktor/widgets/theme/material/menu-item.m.css';
import * as css from '@redaktor/widgets/theme/material/list.m.css';
import * as fixedCss from './list.m.css';
import LoadingIndicator from '@redaktor/widgets/loadingIndicator';
import { MenuItem, MenuItemProperties, ListItem, ListItemProperties } from './Listitem';

export const offscreenHeight = (dnode: RenderResult) => {
	const r = renderer(() => dnode);
	const div = global.document.createElement('div');
	div.style.position = 'absolute';
	global.document.body.appendChild(div);
	r.mount({ domNode: div, sync: true });
	const dimensions = div.getBoundingClientRect();
	global.document.body.removeChild(div);
	return dimensions.height;
};

export type ListOption = { value: string; label: string; disabled?: boolean; divider?: boolean };

export interface ListProperties {
	/** Determines if this list can be reordered */
	draggable?: boolean;
	/** Called when a draggable is dropped */
	onMove?: (from: number, to: number) => void;
	/** The initial selected value */
	initialValue?: string;
	/** Controlled value property */
	value?: string;
	/** Callback called when user selects a value */
	onValue?(value: ListOption, scrollTop: number): void;
	/** Called to request that the menu be closed */
	onRequestClose?(): void;
	/** Optional callback, when passed, the widget will no longer control it's own active index / keyboard navigation */
	onActiveIndexChange?(index: number): void;
	/** Optional property to set the activeIndex when it is being controlled externally */
	activeIndex?: number;
	/** Determines if the widget can be focused or not. If the active index is controlled from elsewhere you may wish to stop the menu being focused and receiving keyboard events */
	focusable?: boolean;
	/** Callback called when menu root is focused */
	onFocus?(): void;
	/** Callback called when menu root is blurred */
	onBlur?(): void;
	/** Property to determine how many items to render. Not passing a number will render all results */
	itemsInView?: number;
	/** Property to determine if this list is being used as a menu, changes a11y and item type */
	menu?: boolean;
	/** The id to be applied to the root of this widget, if not passed, one will be generated for a11y reasons */
	widgetId?: string;
	/** Callback to determine if a list item is disabled. If not provided, ListOption.disabled will be used */
	disabled?: (item: ListOption) => boolean;
	/** Specifies if the list height should by fixed to the height of the items in view */
	height?: 'auto' | 'fixed';

	scrollTop?: number;
}

export interface ListChildren {
	/** Custom renderer for item contents */
	(
		item: ItemRendererProperties,
		properties: ListItemProperties & MenuItemProperties & ThemeProperties
	): RenderResult;
}

export interface ItemRendererProperties {
	active: boolean;
	disabled: boolean;
	label: string;
	selected: boolean;
	value: string;
}

interface ListICache {
	activeIndex: number;
	dragIndex?: number;
	dragOverIndex?: number;
	initial: string;
	previousInputText: string;
	inputText: string;
	itemHeight: number;
	itemsInView: number;
	menuHeight: number;
	resetInputTextTimer: any;
	value: string;
	scrollTop: number;
	previousActiveIndex: number;
}

const factory = create({
	icache: createICacheMiddleware<ListICache>(),
	focus,
	theme,
	offscreen,
	node,
	resource: createResourceMiddleware<ListOption>()
}).properties<ListProperties>()
	.children<ListChildren | undefined>();

export const List = factory(function List({
	children,
	properties,
	id,
	middleware: { icache, focus, theme, resource, offscreen, node }
}) {
	const {
		activeIndex,
		initialValue,
		focusable = true,
		itemsInView = 10,
		menu = false,
		scrollTop: st,
		onActiveIndexChange,
		onBlur,
		onFocus,
		onRequestClose,
		onValue,
		widgetId,
		theme: themeProp,
		design,
		resource: {
			template,
			options = resource.createOptions((curr, next) => ({ ...curr, ...next }))
		},
		classes,
		height = 'fixed'
	} = properties();
	const {
		get,
		template: { read }
	} = resource.template(template);

	const [itemRenderer] = children();

	function setActiveIndex(index: number) {
		if (onActiveIndexChange) {
			onActiveIndexChange(index);
		} else {
			icache.set('activeIndex', index);
		}
	}

	function setValue(value: ListOption) {
		icache.set('value', value.value);
		onValue && onValue(value, icache.get('scrollTop')||0);
	}

	function onKeyDown(event: KeyboardEvent, total: number) {
		const { disabled, activeIndex } = properties();
		event.stopPropagation();
		let computedActiveIndex =
			activeIndex === undefined ? icache.getOrSet('activeIndex', 0) : activeIndex;
		switch (event.which) {
			case Keys.Enter:
			case Keys.Space:
				event.preventDefault();

				if (activeItem) {
					const itemDisabled = disabled ? disabled(activeItem) : activeItem.disabled;

					if (!itemDisabled) {
						setValue(activeItem);
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
							icache.delete('previousInputText');
						}, 800);
					});
					icache.set('inputText', (value = '') => {
						return `${value}${event.key}`;
					});
				}
				break;
		}
	}

	function renderItems(start: number, count: number) {
		const renderedItems = [];
		const { size: resourceRequestSize } = options();
		const {
			meta: { total = 0 }
		} = get(options(), { meta: true, read });
		if (total) {
			let pages: number[] = [];
			for (let i = 0; i < Math.min(total - start, count); i++) {
				const index = i + startNode;
				const page = Math.floor(index / resourceRequestSize) + 1;
				if (pages.indexOf(page) === -1) {
					pages.push(page);
				}
			}
			if (!pages.length) {
				pages.push(1);
			}
			const pageItems = pages.map((page, index) => {
				if (index === pages.length - 1) {
					options({ offset: (page - 1) * options().size });
				}
				return get({ ...options(), offset: (page - 1) * options().size }, { read });
			});
			for (let i = 0; i < Math.min(total - start, count); i++) {
				const index = i + startNode;
				const page = Math.floor(index / resourceRequestSize) + 1;
				const pageIndex = pages.indexOf(page);
				const indexWithinPage = index - (page - 1) * resourceRequestSize;
				const items = pageItems[pageIndex];
				if (items && items[indexWithinPage]) {
					const { value, label, disabled, divider } = items[indexWithinPage];
					renderedItems[i] = renderItem({ value, label, disabled, divider }, index);
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
			disabled: true,
			classes,
			design
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
				dragged={icache.get('dragIndex') === index}
				draggable={draggable}
				onDragStart={(event) => onDragStart(event, index)}
				onDragEnd={onDragEnd}
				onDragOver={(event) => onDragOver(event, index)}
				onDrop={(event) => onDrop(event, index)}
				movedUp={
					icache.get('dragOverIndex') === index &&
					icache.get('dragIndex')! < icache.get('dragOverIndex')!
				}
				movedDown={
					icache.get('dragOverIndex') === index &&
					icache.get('dragIndex')! > icache.get('dragOverIndex')!
				}
				collapsed={
					icache.get('dragIndex') === index && icache.get('dragOverIndex') !== undefined
				}
			>
				<LoadingIndicator />
			</ListItem>
		);
	}

	function onDragStart(event: DragEvent, index: number) {
		if (!draggable) {
			return;
		}
		icache.set('dragIndex', index);
		event.dataTransfer!.setData('text/plain', `${index}`);
	}

	function onDragOver(event: DragEvent, index: number) {
		const dragIndex = icache.get('dragIndex')!;
		if (!draggable || dragIndex === undefined) {
			return;
		}
		event.preventDefault();
		event.dataTransfer!.dropEffect = 'move';
		let targetIndex: number | undefined = index;
		if (event.offsetY < 10 && index === dragIndex + 1) {
			targetIndex = undefined;
		} else if (event.offsetY > itemHeight - 10 && index === dragIndex - 1) {
			targetIndex = undefined;
		}
		if (icache.get('dragOverIndex') !== targetIndex) {
			icache.set('dragOverIndex', targetIndex);
		}
	}

	function onDragEnd(event: DragEvent) {
		if (!draggable) {
			return;
		}
		event.preventDefault();
		icache.set('dragIndex', undefined);
		icache.set('dragOverIndex', undefined);
	}

	function onDrop(event: DragEvent, index: number) {
		if (!draggable) {
			return;
		}
		event.preventDefault();
		const from = event.dataTransfer && event.dataTransfer.getData('text/plain');
		if (from === null) {
			return;
		}
		setActiveIndex(index);
		onMove && onMove(parseInt(from, 10), index);
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
				setValue(data);
			},
			active,
			onRequestActive: () => {
				setActiveIndex(index);
			},
			disabled: itemDisabled,
			classes,
			design
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
				{ ...itemProps, theme: themeProp }
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
					theme={theme.compose(
						listItemCss,
						css,
						'item'
					)}
					animated={true}
					selected={selected}
					dragged={icache.get('dragIndex') === index}
					draggable={draggable}
					onDragStart={(event) => onDragStart(event, index)}
					onDragEnd={onDragEnd}
					onDragOver={(event) => onDragOver(event, index)}
					onDrop={(event) => onDrop(event, index)}
					movedUp={
						icache.get('dragOverIndex') === index &&
						icache.get('dragIndex')! < icache.get('dragOverIndex')!
					}
					movedDown={
						icache.get('dragOverIndex') === index &&
						icache.get('dragIndex')! > icache.get('dragOverIndex')!
					}
					collapsed={
						icache.get('dragIndex') === index &&
						icache.get('dragOverIndex') !== undefined
					}
				>
					{children}
				</ListItem>
			);
		}

		return divider ? [item, <hr classes={themedCss.divider} />] : item;
	}

	let { value: selectedValue, draggable, onMove } = properties();

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
			widgetId: 'offcreen',
			theme: themeProp
		};

		const offscreenMenuItem = itemRenderer ? (
			itemRenderer(
				{
					selected: false,
					active: false,
					value: 'offscreen',
					label: 'offscreen',
					disabled: false
				},
				offscreenItemProps
			)
		) : menu ? (
			<MenuItem {...offscreenItemProps}>offscreen</MenuItem>
		) : (
			<ListItem {...offscreenItemProps}>offscreen</ListItem>
		);

		const itemHeight = icache.getOrSet(
			'itemHeight',
			offscreen(() => offscreenMenuItem, (node) => node.getBoundingClientRect().height)
		);

		itemHeight && icache.set('menuHeight', itemsInView * itemHeight);
	}

	const menuHeight = icache.get('menuHeight');
	const idBase = widgetId || `menu-${id}`;
	let rootStyles: Partial<CSSStyleDeclaration> = {};
	if (menuHeight) {
		rootStyles =
			height === 'fixed' ? { height: `${menuHeight}px` } : { maxHeight: `${menuHeight}px` };
	}
	const shouldFocus = focus.shouldFocus();
	const themedCss = theme.classes(css);
	const itemHeight = icache.getOrSet('itemHeight', 0);
	let scrollTop = icache.getOrSet('scrollTop', st||0);
	const nodePadding = Math.min(itemsInView, 20);
	const renderedItemsCount = itemsInView + 2 * nodePadding;
	let computedActiveIndex =
		activeIndex === undefined ? icache.getOrSet('activeIndex', 0) : activeIndex;
	const inputText = icache.get('inputText');
	const {
		meta: { total = 0 }
	} = get(options(), { meta: true, read });
	if (inputText && inputText !== icache.get('previousInputText') && total) {
		const items = get({ ...options(), offset: 0, size: total });
		const first = items.slice(0, computedActiveIndex);
		const second = items.slice(computedActiveIndex);
		let foundIndex = computedActiveIndex;
		for (let i = 1; i < second.length; i++) {
			const item = second[i];
			if (item && item.label.toLowerCase().indexOf(inputText.toLowerCase()) === 0) {
				foundIndex = foundIndex + i;
				break;
			}
		}
		if (foundIndex === computedActiveIndex) {
			for (let i = 0; i < first.length; i++) {
				const item = first[i];
				if (item && item.label.toLowerCase().indexOf(inputText.toLowerCase()) === 0) {
					foundIndex = i;
					break;
				}
			}
		}
		if (foundIndex !== computedActiveIndex) {
			setActiveIndex(foundIndex);
		}
		icache.set('previousInputText', inputText);
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
			if (typeof icache.get('scrollTop') === 'number' && scrollTop === 0) {
				const n = node.get('root');
				n && n.scrollTo({top:icache.get('scrollTop')||0, left:0});
			} else {
				icache.set('scrollTop', scrollTop);
			}
		}

		icache.set('previousActiveIndex', computedActiveIndex);
	}

	const startNode = Math.max(0, Math.floor(scrollTop / itemHeight) - nodePadding);
	const offsetY = startNode * itemHeight;

	const items = renderItems(startNode, renderedItemsCount);
	const totalContentHeight = total * itemHeight;
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
				fixedCss.root
			]}
			tabIndex={focusable ? 0 : -1}
			onkeydown={(e) => {
				total && onKeyDown(e, total);
			}}
			focus={() => shouldFocus}
			onfocus={onFocus}
			onpointerdown={focusable ? undefined : (event) => event.preventDefault()}
			onblur={onBlur}
			scrollTop={scrollTop}
			onscroll={(e) => {
				const newScrollTop = (e.target as HTMLElement).scrollTop;
				if (scrollTop !== newScrollTop) {
					icache.set('scrollTop', newScrollTop);
				}
			}}
			styles={rootStyles}
			role={menu ? 'menu' : 'listbox'}
			aria-orientation="vertical"
			aria-activedescendant={`${idBase}-item-${computedActiveIndex}`}
			id={idBase}
		>
			<div
				classes={fixedCss.wrapper}
				styles={{
					height: `${totalContentHeight}px`
				}}
				key="wrapper"
			>
				<div
					classes={fixedCss.transformer}
					styles={{
						transform: `translateY(${offsetY}px)`
					}}
					key="transformer"
				>
					{items}
				</div>
			</div>
		</div>
	);
});

export default List;
