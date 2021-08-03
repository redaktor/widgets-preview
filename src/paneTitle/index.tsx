import { create, tsx } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import dimensions from '@dojo/framework/core/middleware/dimensions';
import focus from '@dojo/framework/core/middleware/focus';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { theme, ThemeProperties } from '../middleware/theme';

// import Icon from '../icon';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/paneTitle.m.css';
import * as fixedCss from './styles/paneTitle.m.css';

export interface TitlePaneProperties extends ThemeProperties {
	/** If false the pane will not collapse in response to clicking the title */
	closeable?: boolean;
	/** Animated Icon */
	icon?: 'plusMinus'|'plusClose'|'chevron';
	/** Icon before title */
	iconLeft?: boolean;
	/** 'aria-level' for the title's DOM node */
	headingLevel?: number;
	/** If true the pane is opened and content is visible initially */
	initialOpen?: boolean;
	/** Explicitly control TitlePane */
	open?: boolean;
	/** Called when the title of a closed pane is clicked */
	onClose?(): void;
	/** Called when the title of an open pane is clicked */
	onOpen?(): void;
	/** The displayed title name for this pane */
	name: string;
}

export interface TitlePaneICache {
	initialOpen?: boolean;
	open?: boolean;
}

export type TitlePaneChildren = {
	/** Renderer for the pane content */
	content?: RenderResult;
	/** Renderer for the pane title */
	title: RenderResult;
};

const factory = create({
	dimensions,
	focus,
	icache: createICacheMiddleware<TitlePaneICache>(),
	theme
}).properties<TitlePaneProperties>();

/* TODO in span
	<Icon type={open ? 'remove' : 'add'} theme={themeProp} />
*/

export const TitlePane = factory(function TitlePane({
	id,
	children,
	properties,
	middleware: { dimensions, focus, icache, theme }
}) {
	const themedCss = theme.classes(css);
	const {
		icon,
		iconLeft = false,
		closeable = true,
		spaced = false,
		headingLevel,
		initialOpen,
		onClose,
		onOpen,
		name,
		theme: themeProp
	} = properties();
	let { open } = properties();
	const iconClass: (keyof typeof themedCss)|null = icon ? icon : null;
	// const firstRender = icache.get('open') === undefined;

	if (open === undefined) {
		open = icache.get('open');
		const existingInitialOpen = icache.get('initialOpen');

		if (initialOpen !== existingInitialOpen) {
			icache.set('open', initialOpen);
			icache.set('initialOpen', initialOpen);
			open = initialOpen;
		}
	}

	// theme.variant() === 'dark-m__root__266c963sO1y'
	return (
		<details
			open={open}
			classes={[
				theme.variant(),
				theme.animated(themedCss),
				spaced ? themedCss.spaced : null,
				iconLeft ? themedCss.iconLeft : themedCss.iconRight,
				themedCss.root,
				fixedCss.rootFixed
			]}
		>
			<summary
				aria-level={headingLevel ? `${headingLevel}` : null}
				classes={[
					themedCss.title,
					theme.sized(ui),
					theme.colored(colors),
					closeable ? themedCss.closeable : null,
					closeable ? fixedCss.closeableFixed : null,
					ui.uiVar
				]}
				role="heading"
				disabled={!closeable}
				focus={focus.isFocused('summary')}
				key="summary"
				onclick={(event: MouseEvent) => {
					event.stopPropagation();
					icache.set('open', !open);
					if (open) {
						onClose && onClose();
					} else {
						onOpen && onOpen();
					}
				}}
			>
				<div classes={[themedCss.title, themedCss.titleWrapper]}>
					{iconClass && <div classes={[themedCss.iconWrapper, themedCss[iconClass]]} />}
					{name}
				</div>
			</summary>
			<div
				classes={[themedCss.content, themedCss.contentTransition, fixedCss.contentFixed]}
				id={`${id}-content`}
				key="content"
			>
				{children()}
			</div>
		</details>
	);
});

export default TitlePane;
