import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import theme, { ThemeProperties } from '../middleware/theme';
import * as ui from '../theme/material/_ui.m.css';
import * as color from '../theme/material/_color.m.css';
import * as css from '../theme/material/table.m.css';

export interface TableTemplate {
	name?: string;
	value: string;

}
export interface TableProperties {
	/* max. items per “page”, default 10 */
	itemsPerPage?: number;
}
export interface RowProperties extends ThemeProperties {
	/* borders, default true */
	bordered?: boolean;
	/* row index */
	index?: number;
	/* when clicking a row */
	onClick?: (index: number) => any;
}
export interface CellProperties {
	/* type of cell, fixed is small / responsive has media queries / resizable can be resized, default 'flexible' */
	type?: ('fixed'|'responsive'|'resizable'|'flexible');
	/* text align */
	align?: ('left' | 'center' | 'right');
	/* CSS styles, var(--w) overwrites fixed width */
	styles?: any;
	/* when clicking a cell */
	onClick?: (index: number) => any;
	/* cell index */
	index?: number;
	/* cells length */
	length?: number;
}


const factory = create({ theme }).properties<TableProperties>().children<RenderResult>();

export const Table = factory(function Table({
	middleware: { theme },
	properties,
	children
}) {
	const themedCss = theme.classes(css);
	const { itemsPerPage = 5 } = properties();

	console.log(itemsPerPage); /* TODO */

	return <div key="root" classes={[themedCss.root]}>
		<table key="table" classes={[themedCss.table]}>
			{children()}
		</table>
	</div>
});

const rowFactory = create({ theme }).properties<RowProperties>().children<RenderResult>();
export const Row = rowFactory(function Table({
	middleware: { theme },
	properties,
	children
}) {
	const themedCss = theme.classes(css);
	const { index = 0, bordered = true, onClick } = properties();

	const _c: RenderResult[] = Array.isArray(children()) ? children() : [children()];
	const indexedChildren = _c.map((c, i) => {
		if (!!c && typeof c === 'object' && !Array.isArray(c) && c.properties) {
			c.properties.index = i;
			c.properties.length = _c.length;
		}
		return c
	})
	return <tr
		key={`row_${index}`}
		classes={[
			themedCss.item,
			theme.sized(ui, 's'),
			theme.variant(),
			theme.colored(color, 'neutral'),
			bordered && themedCss.bordered
		]}
		onclick={() => {onClick && onClick(index)}}
	>
		{Array.isArray(children()) ? indexedChildren : children()}
	</tr>
});

const cellFactory = create({ theme }).properties<CellProperties>().children<RenderResult>();
export const Cell = cellFactory(function Table({
	middleware: { theme },
	properties,
	children
}) {
	const themedCss = theme.classes(css);
	const { index = 0, length = 0, type = 'flexible', align = 'left', styles = {}, onClick } = properties();
	const cssType: keyof typeof themedCss = type === 'fixed' ? 'fixedCell' : type;
	return <td
		key={`cell_${index}`}
		classes={[
			themedCss[cssType],
			index === 0 && themedCss.first,
			index === length-1 && themedCss.last,
			align === 'center' && themedCss.center,
			align === 'right' && themedCss.right
		]}
		styles={styles}
		onclick={() => {onClick && onClick(index)}}
	>
		{children()}
	</td>
});
export default Table;
