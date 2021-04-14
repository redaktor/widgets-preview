import { create, tsx } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { uuid } from '@dojo/framework/core/util';
import Icon from '../icon';
import theme, { ThemeProperties } from '../middleware/theme';
// import { formatAriaProperties } from '../common/util';
import * as css from '../theme/material/paginated.m.css';

export interface PaginatedProperties extends ThemeProperties {
	/** The property for the named group */
	property?: string;
	/** Custom id base attribute, defaults to uuid */
	widgetId?: string;
}

const factory = create({ theme })
	.properties<PaginatedProperties>();

export const Paginated = factory(function Paginated({ properties, children, middleware: { theme } }) {
	const {
		property = uuid(),
		widgetId = uuid()
	} = properties();

	const c = children();
	if (!c || !c.length) { return '' }
	if (c.length === 1) { return c }

	const themedCss = theme.classes(css);
	const idBase = `${widgetId}_${property}`;

	const ids: any = c.map((node: any, i: number) => node.properties.id || `${idBase}_${i}`);
	return c.map((node: any, i: number, a: RenderResult[]) => {
		if (!node.properties.id) {
			node.properties.id = node.properties.id || `${idBase}_${i}`;
		}
		return <virtual>
			{!i ?
				<input id={ids[i]} key={`${idBase}_${i}`} type="radio" classes={themedCss.pager} name={idBase} checked={true} /> :
				<input id={ids[i]} key={`${idBase}_${i}`} type="radio" classes={themedCss.pager} name={idBase} />
			}
			<div classes={[themedCss.root]}>
				{node}
				{
					i === a.length-1 && a.length > 2 ?
						<label classes={themedCss.prev} for={ids[0]}><Icon type="left" /><Icon type="left" /></label> :
						((i < a.length-1) ? <label classes={themedCss.next} for={ids[i+1]}><Icon type="right" /></label> :
							(!!i ? <label classes={themedCss.prev} for={ids[i-1]}><Icon type="left" /></label> : ''))
				}
			</div>
		</virtual>
	});
});

export default Paginated;
