import theme from '@dojo/framework/core/middleware/theme';
import { throttle } from '@dojo/framework/core/util';
import { create, tsx } from '@dojo/framework/core/vdom';
import * as css from '../theme/default/menu-item.m.css';

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

const factory = create({ theme }).properties<MenuItemProperties>();

export const MenuItem = factory(function MenuItem({ properties, children, middleware: { theme } }) {
	const { onSelect, active = false, onRequestActive, disabled = false, widgetId } = properties();

	const themedCss = theme.classes(css);

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
				themedCss.root,
				active && themedCss.active,
				disabled && themedCss.disabled
			]}
			onpointerdown={() => {
				requestActive();
				select();
			}}
			role="menuitem"
			aria-disabled={disabled}
		>
			{children()}
		</div>
	);
});

export default MenuItem;
