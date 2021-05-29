import { RenderResult } from '@dojo/framework/core/interfaces';
import { create, tsx } from '@dojo/framework/core/vdom';
import { theme, ThemeProperties } from '../middleware/theme';

import * as fixedCss from './styles/breadcrumbGroup.m.css';
import * as css from '../theme/default/breadcrumbGroup.m.css';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';

export interface BreadcrumbItem extends ThemeProperties {
	[key: string]: any;

	href?: string;
	label: string;
	title?: string;
}

export interface BreadcrumbProperties {
	current?: 'page' | 'step';
	href?: string;
	title?: string;
}

export interface BreadcrumbGroupProperties {
	items: BreadcrumbItem[];
	label: string;
}

export interface BreadcrumbGroupChildren {
	(items: BreadcrumbItem[]): RenderResult;
}

const separatorFactory = create({ theme });

export const Separator = separatorFactory(function Separator({ children, middleware: { theme } }) {
	const themeCss = theme.classes(css);

	return (
		<li aria-hidden="true" classes={themeCss.listItem}>
			<span classes={[fixedCss.separatorFixed, themeCss.separator]}>{children()}</span>
		</li>
	);
});

export { Separator as BreadcrumbSeparator };

const breadcrumbFactory = create({ theme }).properties<BreadcrumbProperties>();

export const Breadcrumb = breadcrumbFactory(function Breadcrumb({
	children,
	middleware: { theme },
	properties
}) {
	const { current, href, title } = properties();
	const themeCss = theme.classes(css);

	return (
		<li classes={[themeCss.listItem, current ? themeCss.current : undefined]}>
			{href ? (
				<a
					aria-current={current || undefined}
					classes={[fixedCss.breadcrumbFixed, themeCss.breadcrumb]}
					href={href}
					title={title}
				>
					{children()}
				</a>
			) : (
				<span
					aria-current={current || undefined}
					classes={[fixedCss.breadcrumbFixed, themeCss.breadcrumb]}
				>
					{children()}
				</span>
			)}
		</li>
	);
});

const factory = create({ theme })
	.properties<BreadcrumbGroupProperties>()
	.children<BreadcrumbGroupChildren | undefined>();

export const BreadcrumbGroup = factory(function BreadcrumbGroup({
	children,
	properties,
	middleware: { theme }
}) {
	const { items, label } = properties();
	const themeCss = theme.classes(css);

	const defaultRenderer: BreadcrumbGroupChildren = (items: BreadcrumbItem[]) => {
		const lastIndex = items.length - 1;

		return items.map((item, index) => (
			<virtual>
				{index !== 0 && <Separator key={`breadcrumb-${index}-separator`}>/</Separator>}
				<Breadcrumb
					key={`breadcrumb-${index}`}
					current={index === lastIndex ? 'page' : undefined}
					href={item.href}
					title={item.title}
				>
					{item.label}
				</Breadcrumb>
			</virtual>
		));
	};
	const [renderer = defaultRenderer] = children();

	return (
		<nav classes={[
			theme.variant(),
			themeCss.root,
			theme.sized(ui),
			theme.colored(colors)
		]} aria-label={label}>
			<ol classes={[fixedCss.listFixed, themeCss.list]}>{renderer(items)}</ol>
		</nav>
	);
});

export default BreadcrumbGroup;
