import { create, tsx } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { uuid } from '@dojo/framework/core/util';
import Icon from '../icon';
import theme, { ThemeProperties } from '../middleware/theme';
// import { formatAriaProperties } from '../common/util';
import * as css from '../theme/material/paged.m.css';

export interface PagedProperties extends ThemeProperties {
	/** The property for the named group */
	property?: string;
	/** Custom id base attribute, defaults to uuid */
	widgetId?: string;
}

const factory = create({ theme })
	.properties<PagedProperties>()
	.children<RenderResult[]>();

export const Paged = factory(function Paged({ middleware: { theme }, properties, children }) {
	const {
		property = uuid(),
		widgetId = uuid()
	} = properties();

	const nodes = children();
	if (!nodes || !nodes.length) { return '' }
	if (nodes.length === 1) { return nodes[0] }

	const themedCss = theme.classes(css);

	const idBase = `${widgetId}_${property}`;
	const ids: any = nodes.map((node: any, i: number) => node.properties.id || `${idBase}_${i}`);
	const newNodes = nodes.map((node: any, i: number, a: any[]) => {
		node.properties.classes += ` ${themedCss.paged}`;
		if (!node.properties.id) {
			node.properties.id = ids[i];
		}
		if (i === a.length-1 && a.length > 2) {
			node.children.push(<label classes={themedCss.prev} for={ids[0]}><Icon type="left" /><Icon type="left" /></label>)
		}
		if (i < a.length-1) {
			node.children.push(<label classes={themedCss.next} for={ids[i+1]}><Icon type="right" /></label>)
		}
		if (!!i) {
			node.children.push(<label classes={themedCss.prev} for={ids[i-1]}><Icon type="left" /></label>)
		}
		return node
	});


	return <virtual>
		{...newNodes.reduce((p: any[], c: any, i: number) => {
			p.push(!i ?
				<input id={ids[i]} key={`${idBase}_${i}`} type="radio" classes={themedCss.pager} name={idBase} checked={true} /> :
				<input id={ids[i]} key={`${idBase}_${i}`} type="radio" classes={themedCss.pager} name={idBase} />);
			p.push(c);
			return p
		}, [])}
	</virtual>
});

export default Paged;
