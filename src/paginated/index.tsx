import { create, tsx } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import id from '../middleware/id';
import theme, { ThemeProperties } from '../middleware/theme';
import Icon from '../icon';
// import { formatAriaProperties } from '../common/util';
import * as css from '../theme/material/paginated.m.css';

export interface PaginatedProperties extends ThemeProperties {
	view?: 'responsive' | 'column' | 'row' | 'tableRow';
	/** The property for the named group */
	property?: string;
	/** Custom id base attribute, defaults to uuid */
	widgetId?: string;
	/* small typo, media captions */
	compact?: boolean;
	/* inherit ui colors */
	colored?: boolean;
	/* solid border */
	solid?: boolean;
	/*  */
	transformNodes?: (node: RenderResult) => RenderResult;
}

const factory = create({ id, theme })
	.properties<PaginatedProperties>();

export const Paginated = factory(function Paginated({ properties, children, middleware: { id, theme } }) {
	const { property = '', view = 'column', compact = false, colored = false, solid = false, transformNodes } = properties();

	const c = children();
	if (!c || !c.length) { return '' }
	const themedCss = theme.classes(css);
	const rootClasses = [
		view === 'column' ? themedCss.column : themedCss.row,
		themedCss.root,
		theme.spaced(themedCss, true),
		compact && themedCss.compact,
		colored && themedCss.colored,
		solid && themedCss.solid
	];

	if (c.length === 1) {
		return <div classes={rootClasses}>{c}</div>
	}

	const idBase = id.getId(property);
	const ids: any = c.map((node: any, i: number) => !!node && typeof node === 'object' && node.properties && node.properties.id || `${idBase}_${i}`);
	const stopEventJS = (e?: Event) => {
		e && e.stopPropagation();
	}

	return <div classes={rootClasses}>
		{c.filter((node: any) => !!node && !!node.properties).map((node: any, i: number, a: RenderResult[]) => {
			if (!node.properties.id) {
				node.properties.id = node.properties.id || `${idBase}_${i}`;
			}
			return <virtual>
				{!i ?
					<input id={ids[i]} key={`${idBase}_${i}`} type="radio" classes={themedCss.input} name={idBase} checked={true} /> :
					<input id={ids[i]} key={`${idBase}_${i}`} type="radio" classes={themedCss.input} name={idBase} />
				}
				<div classes={[themedCss.pane]}>
					{!!transformNodes ? transformNodes(node) : node}
					{
						i === a.length-1 && a.length > 2 ?
							<label role="button" classes={themedCss.prev} for={ids[0]} onclick={stopEventJS}>
								<Icon type="left" />
							</label> :
							((i < a.length-1) ? <label role="button" classes={themedCss.next} for={ids[i+1]} onclick={stopEventJS}>
								<Icon type="right" />
							</label> :
								(!!i ? <label role="button" classes={themedCss.prev} for={ids[i-1]} onclick={stopEventJS}>
									<Icon type="left" />
								</label> : ''))
					}
				</div>
			</virtual>
		})}
	</div>
});
export default Paginated;
