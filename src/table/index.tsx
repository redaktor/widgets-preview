import { tsx, create, node } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { RenderResult } from '@dojo/framework/core/interfaces';
import theme, { ThemeProperties } from '../middleware/theme';
import * as ui from '../theme/material/_ui.m.css';
import * as color from '../theme/material/_color.m.css';
import * as css from '../theme/material/table.m.css';

export type ColumnType = ('fixed'|'responsive'|'resizable'|'flexible');
export interface ColumnProperties {
	type?: ColumnType;
	name?: string;
	width?: string|number;
}
export interface TableProperties {
	/* The Column properties for the table, an array where members can be
	 a type string ('fixed'|'responsive'|'resizable'|'flexible') or an object
	 {type: ..., name, width} where name goes in the table header and width
	 is either fixed or the initial width for 'resizable'
	*/
	columns?: (ColumnType | ColumnProperties)[];
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

interface TableIcache {
	isResizing: {key: string; width: number; x: number;}|false;
}
const icache = createICacheMiddleware<TableIcache>();

const factory = create({ theme, icache, node  }).properties<TableProperties>().children<RenderResult>();
export const Table = factory(function Table({
	middleware: { theme, icache, node },
	properties,
	children
}) {
	const themedCss = theme.classes(css);
	const { itemsPerPage = 5, columns = [] } = properties();
	console.log(itemsPerPage); /* TODO */

	const { getOrSet, get, set } = icache;
	getOrSet('isResizing', false, false);
	const handleMouseMove = (e: MouseEvent) => {
		const {key = false, x = 0, width = 0} = get('isResizing')||{};
		const el = key && node.get(key);
		const dx = e.clientX - x;
		if (el) {
			el.style.width = `${width + dx}px`;
		}
	};
	const handleMouseUp = () => {
		set('isResizing', false);
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	};

	let isResizable = false;
	const headerCols: any[] = [];
	const tableCols = !columns.length ? '' : columns.map((c, i) => {
		const type = (typeof c === 'string') ? c : c.type;
		const width = (typeof c === 'string') ? '' :
			typeof c.width === 'number' ? `${c.width}px` : c.width;
		const styles = !width ? {} : { styles: {width} };
		const cssType: (keyof typeof themedCss) = !type ? 'resizable' :
			(type === 'fixed' ? 'fixedCell' : type);
		const resizer = type !== 'resizable' ? '' : <virtual>
			<div classes={themedCss.resizer} onmousedown={(e) => {
				const styles = window.getComputedStyle((e.target as any).parentNode);
				set('isResizing', {x: e.clientX, width: parseInt(styles.width||'0', 10), key: `col_${i}`}, false);
				document.addEventListener('mousemove', handleMouseMove);
				document.addEventListener('mouseup', handleMouseUp);
			}}>{'<>'}</div>
		</virtual>
		if (type === 'resizable') { isResizable = true }
		if ((typeof c !== 'object' || !c.name) && !isResizable) {
			headerCols.push('')
		} else {
			headerCols.push(isResizable ? <div classes={themedCss.hasResize}>
				{typeof c === 'object' && !!c.name ? c.name : ''}
				{resizer}
			</div> : (typeof c === 'object' && !!c.name ? c.name : ''));
		}

		return <col key={`col_${i}`} classes={themedCss[cssType]} {...styles} />
	});

	const tableHeader = (headerCols.filter((n) => !!n).length && <thead>
		<tr>{headerCols.map((n) => <th classes={themedCss.cell}>{n}</th>)}</tr>
	</thead>);

	const colgroup = !!tableCols && <colgroup>
		{tableCols}
	</colgroup>

	return <div key="root" classes={[themedCss.root, theme.variant(), theme.colored(color)]}>
		<table key="table" classes={[
			themedCss.table,
			get('isResizing') && themedCss.isResizing
		]}>
			{tableHeader}
			{colgroup}
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
	const { index = 0, length = 0, align = 'left', styles = {}, onClick } = properties();
	return <td
		key={`cell_${index}`}
		classes={[
			themedCss.cell,
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
