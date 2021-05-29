import { create, tsx } from '@dojo/framework/core/vdom';
import { throttle } from '@dojo/framework/core/util';
import Icon from '../icon';
import theme from '../middleware/theme';
import * as listItemCss from '../theme/material/list-item.m.css';
import * as menuItemCss from '../theme/material/menu-item.m.css';

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

const menuItemFactory = create({ theme }).properties<MenuItemProperties>();

export const MenuItem = menuItemFactory(function MenuItem({
	properties,
	children,
	middleware: { theme }
}) {
	const {
		onSelect,
		active = false,
		onRequestActive,
		disabled = false,
		variant = 'flat',
		widgetId
	} = properties();

	const themedCss = theme.classes(menuItemCss);

	function select() {
		!disabled && onSelect();
	}

	function requestActive() {
		!disabled && !active && onRequestActive();
	}

	return (
		<div
			id={widgetId}
			key="root"
			onpointermove={throttle(() => {
				requestActive();
			}, 500)}
			classes={[
				theme.variant(),
				themedCss[variant],
				theme.animated(themedCss, true),
				themedCss.root,
				active && themedCss.active,
				disabled && themedCss.disabled
			]}
			onclick={() => {
				requestActive();
				select();
			}}
			role="menuitem"
			aria-disabled={disabled ? 'true' : 'false'}
		>
			{children()}
		</div>
	);
});

export interface ListItemProperties {
	/** Callback used when the item is clicked */
	onSelect(): void;
	/** Property to set the selected state of the item */
	selected?: boolean;
	/** Property to set the active state of the item, indicates it's the current keyboard / mouse navigation target */
	active?: boolean;
	/** Callback used when the item wants to request it be made active, to example on pointer move */
	onRequestActive(): void;
	/** Property to set the disabled state of the item */
	disabled?: boolean;
	/** The id to apply to this widget top level for a11y */
	widgetId: string;
	/** Determines if this item can be reordered */
	draggable?: boolean;
	/** Determines if this item is actively being dragged */
	dragged?: boolean;
	/** Determines if this item is visually shifted down due to DnD */
	movedUp?: boolean;
	/** Determines if this item is visually shifted down due to DnD */
	movedDown?: boolean;
	/** Called when dragging begins */
	onDragStart?: (event: DragEvent) => void;
	/** Called when dragging ends */
	onDragEnd?: (event: DragEvent) => void;
	/** Called when over a dragged item */
	onDragOver?: (event: DragEvent) => void;
	/** Called when a holistic drag is complete */
	onDrop?: (event: DragEvent) => void;
	/** Determines if this item is visually collapsed during DnD */
	collapsed?: boolean;
}

const listItemFactory = create({ theme }).properties<ListItemProperties>();

export const ListItem = listItemFactory(function ListItem({
	properties,
	children,
	middleware: { theme }
}) {
	const {
		onSelect,
		active = false,
		onRequestActive,
		selected = false,
		disabled = false,
		spaced = false,
		widgetId,
		draggable,
		dragged,
		onDragStart,
		onDragEnd,
		onDragOver,
		onDrop,
		movedUp,
		movedDown,
		collapsed,
		theme: themeProp,
		variant = 'flat'
	} = properties();

	const themedCss = theme.classes(listItemCss);

	function select() {
		!disabled && onSelect();
	}

	function requestActive() {
		!disabled && !active && onRequestActive();
	}

	return (
		<div
			id={widgetId}
			key="root"
			onpointermove={throttle(() => {
				requestActive();
			}, 500)}
			classes={[
				theme.variant(),
				themedCss[variant],
				theme.animated(themedCss, true),
				themedCss.root,
				spaced && themedCss.height,
				selected && themedCss.selected,
				active && themedCss.active,
				disabled && themedCss.disabled,
				movedUp && themedCss.movedUp,
				movedDown && themedCss.movedDown,
				collapsed && themedCss.collapsed,
				dragged && themedCss.dragged,
				draggable && themedCss.draggable
			]}
			onclick={() => {
				requestActive();
				select();
			}}
			role="option"
			aria-disabled={disabled ? 'true' : 'false'}
			aria-selected={selected ? 'true' : 'false'}
			draggable={draggable}
			ondragenter={(event: DragEvent) => event.preventDefault()}
			ondragstart={onDragStart}
			ondragend={onDragEnd}
			ondragover={onDragOver}
			ondrop={onDrop}
			styles={{ visibility: dragged ? 'hidden' : undefined }}
		>
			{children()}
			{draggable && (
				<Icon
					type="bars"
					classes={{ '@redaktor/widgets/icon': { icon: [themedCss.dragIcon] } }}
					theme={themeProp}
					variant={variant}
				/>
			)}
		</div>
	);
});
