import { RenderResult } from '@dojo/framework/core/interfaces';
import { tsx, create } from '@dojo/framework/core/vdom';
import Icon from '../icon';
import * as css from '../theme/material/details.m.css';
import theme from '../middleware/theme';

export interface DetailsProperties {
	responsive?: boolean;
	/* if summary is just a string … */
	summary?: string | undefined;
	/* serif summary, default false */
	serif?: boolean;
	/* animated focus / hover, default true */
	animated?: boolean;
	/* start opened */
	open?: boolean;
	onToggle?: (e: Event & {target: HTMLDetailsElement}) => any;
}
export interface DetailsChildren {
	summary?: RenderResult;
	content?: RenderResult;
}
/*
const factory = create({ theme })
	.properties<CardProperties>()
	.children<CardChildren | undefined>();
*/

const factory = create({ theme })
	.properties<DetailsProperties>()
	.children<DetailsChildren | RenderResult| undefined>();


export const Details = factory(function Details({ children, properties, middleware: { theme } }) {
	const themedCss = theme.classes(css);
	const {
		summary: txtSummary, open, color, onToggle, responsive = false, serif = false, animated = true
	} = properties();

	let summary, content;
	if (typeof children()[0] === 'object' && (children()[0] as any).hasOwnProperty('summary')) {
		[{ summary, content } = { summary: undefined, content: undefined }] = (children() as any);
	} else {
		const [s, ...c] = children();
		summary = !!txtSummary ? txtSummary : (children().length > 1 ? s : <Icon type="info" />);
		content = children().length > 1 ? c : children();
	}

	return (
		<details open={open} key="root"
			ontoggle={(e: Event & {target: HTMLDetailsElement}) => { onToggle && onToggle(e) }}
			classes={[
				theme.variant(),
				themedCss.root,
				!!color && themedCss.colored,
				!!responsive && themedCss.responsive
			]}
		>
			{summary && (
				<summary key="summary" classes={[
					themedCss.summary,
					theme.uiSize('l'),
					theme.uiColor(),
					serif && themedCss.serif,
					animated && themedCss.animated
				]}>
					<div classes={themedCss.summaryContent}>{summary}</div>
				</summary>
			)}
			{content}
		</details>
	);
});

export default Details;
