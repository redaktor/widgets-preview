import { RenderResult } from '@dojo/framework/core/interfaces';
import { create, tsx } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { theme, ThemeProperties, Designs, formatAriaProperties } from '../middleware/theme';
import TitlePane, { TitlePaneProperties, TitlePaneChildren } from '../paneTitle';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/accordion.m.css';
import * as titlePaneCss from '../theme/material/paneTitle.m.css';

/* TODO
What icon will you choose to indicate expansion?
What icon will you choose to indicate collapsing?
Where exactly will you place the icon?
How do you design a category title?  free children node
What if there isn’t enough space to display all items?
Should you have a “collapse all/open all” link or button?
color transparent/opaque
*/

export interface AccordionPaneProperties extends ThemeProperties {
	/** If true, only one TitlePane can be opened at a given time */
	exclusive?: boolean;
	/** Animated Icon, default 'plusMinus' */
	icon?: 'plusMinus'|'plusClose'|'chevron';
	/** Icon before title */
	iconLeft?: boolean;
	/** The pane names */
	panes: string[];
	rounded?: boolean;
	responsive?: boolean;
}

interface AccordionPaneICache {
	openIndexes: Set<number>;
}
const icache = createICacheMiddleware<AccordionPaneICache>();

const factory = create({
	icache,
	theme
}).properties<AccordionPaneProperties>()
	.children<RenderResult>();

export const Accordion = factory(function Accordion({
	middleware: { icache, theme },
	properties,
	children
}) {
	const themedCss = theme.classes(css);
	const {
		exclusive,
		panes,
		responsive = true,
		spaced = false,
		rounded = false,
		iconLeft = false,
		icon = 'plusMinus'
	} = properties();

	const openIndexes = icache.getOrSet('openIndexes', new Set());

	const onOpen = (index: number) => {
		if (exclusive) {
			icache.set('openIndexes', new Set([index]));
		} else {
			const openIndexes = icache.getOrSet('openIndexes', new Set());
			openIndexes.add(index);
			icache.set('openIndexes', openIndexes);
		}
	};

	const onClose = (index: number) => {
		const openIndexes = icache.getOrSet('openIndexes', new Set());
		openIndexes.delete(index);
		icache.set('openIndexes', openIndexes);
	};

	return (
		<div classes={[
			theme.variant(),
			themedCss.root,
			theme.shaped(ui),
			theme.sized(ui),
			theme.elevated(ui),
			theme.colored(colors),
			theme.animated(themedCss),
			rounded && themedCss.rounded,
			responsive && themedCss.responsive
		]}>
			{panes.map((paneName, index) => <TitlePane
				key={`pane-${index}`}
				open={openIndexes.has(index)}
				onOpen={() => {
					onOpen(index);
				}}
				onClose={() => {
					onClose(index);
				}}
				theme={theme.compose(
					titlePaneCss,
					css,
					'pane'
				)}
				name={paneName}
				icon={icon}
				iconLeft={iconLeft}
				spaced={spaced}
			>
				{children()[index]}
			</TitlePane>)}
		</div>
	);
});

/*
	const themedCss = theme.classes(css);
	const [renderer] = children();
	const { rounded = false, responsive = false, exclusive = false } = properties();

	const onOpen = (key: string) => {
		return () => {
			icache.set('openKeys', {
				...(exclusive ? {} : icache.get('openKeys')),
				[key]: true
			});
		};
	};

	const onClose = (key: string) => {
		return () => {
			const openKeys = icache.get('openKeys') || {};
			icache.set('openKeys', {
				...openKeys,
				[key]: false
			});
		};
	};

	const open = (key: string) => {
		const openKeys: AccordionPaneICache['openKeys'] = icache.get('openKeys') || {};
		return !!openKeys[key];
	};

	return <div themedCss={[
		theme.variant(),
		theme.sized(ui),
		theme.spaced(ui),
		theme.colored(colors),
		theme.animated(themedCss),
		themedCss.root,
		rounded && themedCss.rounded,
		responsive && themedCss.responsive,
	]}>
		{renderer(onOpen, onClose, open)}
	</div>;
});
*/
export default Accordion;
