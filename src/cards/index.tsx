import { tsx, create } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { RenderResult } from '@dojo/framework/core/interfaces';
import intersection from '@dojo/framework/core/middleware/intersection';
import dimensions from '@dojo/framework/core/middleware/dimensions';
import resize from '@dojo/framework/core/middleware/resize';
// import icache from '@dojo/framework/core/middleware/icache';
import id from '../middleware/id';
import Card, { CardProperties } from '../card';
import Icon from '../icon';
import * as css from '../theme/material/cards.m.css';
import theme from '../middleware/theme';

export interface CardsProperties {
	onRequestItems(nextPage: number, lastId: string|null, count: number): Promise<any>;
	page: CardProperties[];
	aside?: boolean | 'left';
}
export interface CardsChildren {
	header?: RenderResult;
	aside?: RenderResult;
}
interface CardsICache {
	curPage: number;
	data: RenderResult[];
	count: number;
	loading: boolean;
}
/* "https://js.arcgis.com/4.16/"
style={`height:${icache.get('loading') ? '99999' : cardsHeight}px;`}
*/
const icache = createICacheMiddleware<CardsICache>();
const factory = create({ icache, theme, id, intersection, dimensions, resize })
	.properties<CardsProperties>()
	.children<CardsChildren>();

export const Cards = factory(function Cards({
	children,
	properties,
	middleware: { icache, theme, id, intersection, dimensions, resize }
}) {
	const _id = id.getId();
	const themedCss = theme.classes(css);
	const {
		aside: asidePosition = true,
		onRequestItems,
		page: p = []
	} = properties();
	let { aside, header } = children()[0] || ({} as CardsChildren);

	const page = <virtual>
	{
		(p||[]).map(
			({actionButtons, ...o}) =>
				<li key={`Card${_id}`} classes={themedCss.item}>
					<Card {...o}>
						{{actionButtons}}
					</Card>
				</li>
		)
	}
	</virtual>
	icache.getOrSet('loading', false, false);
	icache.getOrSet('count', 0, false);
	icache.getOrSet('curPage', ((icache.get('curPage')||0) + 1), false);
	const data = icache.get('data');
	Array.isArray(data) && !!data.length ? icache.set('data', data.concat(page)) :
		icache.getOrSet('data', [page]);

	const _resized = resize.get('root');
	const colHeight = Math.max(...([1,2,3,4,5,6].map((i) => dimensions.get(`col${i}`).offset.top||0)));

	const { isIntersecting } = intersection.get('bottom');
	// console.log('isLoading', icache.get('data').length, isLoading, isIntersecting);
	const cards = icache.get('data');
	if (!icache.get('loading') && isIntersecting) {
		icache.set('loading', true, false);
		const lastId = !p || !p.length ? null : p[p.length-1].id||null;
		const count = icache.get('count')||0 + p.length;
		onRequestItems(((icache.get('curPage')||0) + 1), lastId, count);
		icache.set('loading', false)
	}

	const asideContainer = (
		<virtual>
			<input id={_id} type="checkbox" classes={themedCss.trigger} />
			<aside classes={themedCss.aside}>
				<nav classes={themedCss.asideNav}>
					<label for={_id} classes={themedCss.triggerLabel}>
						<Icon type="close" />
					</label>
				</nav>
				{aside}
			</aside>
		</virtual>
	);
/*
TODO
export interface CardProperties {
	onAction?: () => void;
	responsiveTypo?: boolean;
}
*/

	/* up to 6 columns: */
	return (
		<section
			key="root"
			classes={[
				theme.variant(),
				themedCss.root,
				icache.get('loading') ? themedCss.isLoading : null,
				asidePosition === true || asidePosition === 'left' ? themedCss.hasAside : null,
				asidePosition === 'left' ? themedCss.hasLeftAside : null
			]}
		>
			<div classes={[themedCss.loadBar]} />
			{header}
			{cards || aside ? (
				<virtual>
					<div key="bottom" classes={themedCss.loadTrigger} styles={{top: `${colHeight}px`}} />
					{asidePosition === 'left' ? asideContainer : null}
					<ul key="cards" classes={themedCss.cards}>
						{...(cards||[])}
						<li classes={[themedCss.item, themedCss.col1]} key="col1" />
						<li classes={[themedCss.item, themedCss.col2]} key="col2" />
						<li classes={[themedCss.item, themedCss.col3]} key="col3" />
						<li classes={[themedCss.item, themedCss.col4]} key="col4" />
						<li classes={[themedCss.item, themedCss.col5]} key="col5" />
						<li classes={[themedCss.item, themedCss.col6]} key="col6" />
						<li classes={[themedCss.item, themedCss.breaked]} />
						<li classes={[themedCss.item, themedCss.breaked]} />
						<li classes={[themedCss.item, themedCss.breaked]} />
						<li classes={[themedCss.item, themedCss.breaked]} />
						<li classes={[themedCss.item, themedCss.breaked]} />
						<li classes={[themedCss.item, themedCss.breaked]} />
					</ul>
					{asidePosition === true ? asideContainer : null}
				</virtual>
			) : null}
		</section>
	);
});

export default Cards;
