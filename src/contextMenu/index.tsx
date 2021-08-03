import { create, tsx } from '@dojo/framework/core/vdom';
import { createResourceMiddleware } from '@dojo/framework/core/middleware/resources';
import theme from '../middleware/theme';
import List, { ListOption } from '../list/index';
import * as menuCss from '../theme/default/list.m.css';
import * as css from '../theme/default/contextMenu.m.css';
import ContextPopup from '../contextPopup';

export interface ContextMenuProperties {
	/* A callback that will be called with the value of whatever item is selected */
	onSelect(value: ListOption): void;
}

const factory = create({
	theme,
	resource: createResourceMiddleware<ListOption>()
}).properties<ContextMenuProperties>();

export const ContextMenu = factory(function({ properties, children, middleware: { theme } }) {
	const { resource, onSelect, classes, design } = properties();
	return (
		<ContextPopup>
			{{
				trigger: children(),
				content: ({ close, shouldFocus }) => (
					<List
						key="menu"
						height="auto"
						focus={shouldFocus}
						theme={theme.compose(
							menuCss,
							css,
							'menu'
						)}
						classes={classes}
						design={design}
						menu
						resource={resource}
						onBlur={close}
						onRequestClose={close}
						onValue={(value) => {
							close();
							onSelect(value);
						}}
					/>
				)
			}}
		</ContextPopup>
	);
});

export default ContextMenu;
