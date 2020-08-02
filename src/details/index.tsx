import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import * as css from '../theme/material/details.m.css';
import theme from '../middleware/theme';

export interface DetailsProperties {
	summary?: string | undefined;
	animated?: boolean;
	open?: boolean;
}

const factory = create({ theme })
	.properties<DetailsProperties>()
	.children();


export const Details = factory(function Details({ children, properties, middleware: { theme } }) {
	const themedCss = theme.classes(css);
	const { summary, open, animated = true } = properties();

	return (
		<details open={open} key="root" classes={[
			theme.variant(),
			themedCss.root
		]}>
			{summary && (
				<summary key="summary" classes={[
					themedCss.summary,
					animated ? themedCss.animated : null
				]}>
					{summary}
				</summary>
			)}
			{children()}
		</details>
	);
});

export default Details;
