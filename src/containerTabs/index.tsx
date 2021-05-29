import { create, tsx } from '@dojo/framework/core/vdom';
import focus from '@dojo/framework/core/middleware/focus';
import i18n from '@dojo/framework/core/middleware/i18n';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import theme from '@dojo/framework/core/middleware/theme';
import Icon from '../icon';

import commonBundle from '../common/nls/common';
import { formatAriaProperties, Keys } from '../common/util';
import * as css from '../theme/material/containerTabs.m.css';

export interface TabItem {
	closeable?: boolean;
	disabled?: boolean;
	name: string;
}

export interface TabContainerProperties {
	/** Orientation of the tab buttons, defaults to top */
	alignButtons?: 'bottom' | 'top' | 'left' | 'right';
	/** callback when a tabs close icon is clicked */
	onClose?(index: number): void;
	/** Custom aria attributes */
	aria?: { [key: string]: string | null };
	/** initial active tab ID. Defaults to the first tab's ID. */
	initialActiveIndex?: number;
	/** controlled active tab ID */
	activeIndex?: number;
	/** Callback fired when a tab is changed if `activeTab` is passed */
	onActiveIndex?(index: number): void;
	/** Tabs config used to display tab buttons */
	tabs: TabItem[];
}

interface TabContainerICache {
	activeIndex: number | undefined;
}

const factory = create({
	focus,
	i18n,
	icache: createICacheMiddleware<TabContainerICache>(),
	theme
})
	.properties<TabContainerProperties>()
	.children();

export const TabContainer = factory(function TabContainer({
	children,
	id,
	middleware: { focus, i18n, icache, theme },
	properties
}) {
	const {
		alignButtons = 'top',
		aria = {},
		initialActiveIndex = 0,
		tabs,
		onActiveIndex,
		onClose
	} = properties();
	let { activeIndex } = properties();

	const themedCss = theme.classes(css);
	const { messages } = i18n.localize(commonBundle);

	if (activeIndex === undefined) {
		activeIndex = icache.getOrSet('activeIndex', initialActiveIndex);
	}

	function closeTab(index: number) {
		onClose && onClose(index);
		setActiveIndex(0);
	}

	function setActiveIndex(index: number) {
		focus.focus();
		onActiveIndex && onActiveIndex(index);
		icache.set('activeIndex', index);
	}

	function onKeyDown(event: KeyboardEvent, { closeable, disabled }: TabItem, index: number) {
		event.stopPropagation();
		const total = tabs.length;

		switch (event.which) {
			case Keys.Escape:
				if (closeable && !disabled) {
					closeTab(index);
				}
				break;
			case Keys.Left:
			case Keys.Up:
				event.preventDefault();
				setActiveIndex((index - 1 + total) % total);
				break;
			case Keys.Right:
			case Keys.Down:
				event.preventDefault();
				setActiveIndex((index + 1) % total);
				break;
			case Keys.Home:
				event.preventDefault();
				setActiveIndex(0);
				break;
			case Keys.End:
				event.preventDefault();
				setActiveIndex(tabs.length - 1);
				break;
		}
	}

	const renderTab = (tab: TabItem, index: number) => {
		const { closeable, disabled, name } = tab;

		const active = index === activeIndex;

		return (
			<div
				aria-controls={`${id}-tab-${index}`}
				aria-disabled={disabled ? 'true' : 'false'}
				aria-selected={active ? 'true' : 'false'}
				classes={[
					themedCss.tabButton,
					active ? themedCss.activeTabButton : null,
					closeable ? themedCss.closeable : null,
					disabled ? themedCss.disabledTabButton : null
				]}
				focus={active ? focus.shouldFocus : () => false}
				id={`${id}-tabbutton-${index}`}
				key={`${index}-tabbutton`}
				onclick={() => {
					if (!disabled) {
						setActiveIndex(index);
					}
				}}
				onkeydown={(event) => onKeyDown(event, tab, index)}
				role="tab"
				tabIndex={active ? 0 : -1}
			>
				<span key="tabButtonContent" classes={themedCss.tabButtonContent}>
					{name}
					{closeable ? (
						<button
							disabled={disabled}
							tabIndex={active ? 0 : -1}
							classes={themedCss.close}
							key={`${index}-tabbutton-close`}
							type="button"
							onclick={(event) => {
								event.stopPropagation();
								if (!disabled) {
									closeTab(index);
								}
							}}
						>
							<Icon type="closeIcon" altText={messages.close} size="s" />
						</button>
					) : null}
					<span classes={[themedCss.indicator, active && themedCss.indicatorActive]}>
						<span classes={themedCss.indicatorContent} />
					</span>
				</span>
			</div>
		);
	};

	const content = [
		<div key="buttons" classes={themedCss.tabButtons}>
			{tabs.map(renderTab)}
		</div>,
		<div key="tabs" classes={themedCss.tabs}>
			{children().map((child, index) => {
				const disabled = tabs[index].disabled;
				const active = activeIndex === index && !disabled;
				return (
					<div classes={active ? themedCss.tab : undefined} hidden={!active}>
						{child}
					</div>
				);
			})}
		</div>
	];

	let alignClass;
	let orientation: 'horizontal'|'vertical'  = 'horizontal';

	switch (alignButtons) {
		case 'right':
			alignClass = themedCss.alignRight;
			orientation = 'vertical';
			content.reverse();
			break;
		case 'bottom':
			alignClass = themedCss.alignBottom;
			content.reverse();
			break;
		case 'left':
			alignClass = themedCss.alignLeft;
			orientation = 'vertical';
			break;
	}

	return (
		<div
			{...formatAriaProperties(aria)}
			key="root"
			aria-orientation={orientation}
			classes={[theme.variant(), alignClass || null, themedCss.root]}
			role="tablist"
		>
			{...content}
		</div>
	);
});

export default TabContainer;
