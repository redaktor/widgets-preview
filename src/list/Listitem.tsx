import { theme, Variants } from '../middleware/theme';
import { throttle } from '@dojo/framework/core/util';
import { create, tsx } from '@dojo/framework/core/vdom';
import * as css from '../theme/material/list-item.m.css';

export interface ListItemProperties {
	/** The variant for the listItem: 'flat', 'outlined', 'raised', 'shaped'
	 * 'flat' by default
	 */
	variant?: Variants;
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
	/** Hover / Click item */
	animated?: boolean;
	/** The id to apply to this widget top level for a11y */
	widgetId: string;
}

const factory = create({ theme }).properties<ListItemProperties>();

export const ListItem = factory(function ListItem({ properties, children, middleware: { theme } }) {
	const {
		variant = 'flat' as (keyof typeof themedCss),
		onSelect,
		active = false,
		onRequestActive,
		selected = false,
		disabled = false,
		animated = false,
		widgetId
	} = properties();

	const themedCss = theme.classes(css);

	function select() {
		!disabled && onSelect();
	}

	function requestActive() {
		!disabled && !active && onRequestActive();
	}

	const itemProps = {
		id: widgetId,
		key: 'root',
		role: 'option',
		'aria-disabled': disabled,
		'aria-selected': selected,
		onpointermove: throttle(() => {
			requestActive();
		}, 500),
		onpointerdown: () => {
			requestActive();
			select();
		},
		classes: [
			theme.variant(),
			(themedCss as any)[variant],
			themedCss.root,
			animated && themedCss.animated,
			selected && themedCss.selected,
			active && themedCss.active,
			disabled && themedCss.disabled
		]
	}

	return (theme.isJS() ? <div {...itemProps}>{children()}</div> :
		<virtual>
			<input
				key="check"
				id={'input-'+widgetId}
				tabIndex={0}
				checked={selected === true}
				classes={themedCss.input} type="checkbox"
			/>
			<label {...itemProps} for={'input'+widgetId}>
				{children()}
			</label>
		</virtual>
	);
});

export default ListItem;
