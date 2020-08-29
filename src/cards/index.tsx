import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import intersection from '@dojo/framework/core/middleware/intersection';
import dimensions from '@dojo/framework/core/middleware/dimensions';
import resize from '@dojo/framework/core/middleware/resize';
// import icache from '@dojo/framework/core/middleware/icache';
import { uuid } from '@dojo/framework/core/util';
import Card from '../card';
import Icon from '../icon';
import * as css from '../theme/material/cards.m.css';
import theme from '../middleware/theme';

export interface CardsProperties {
	onRequestItems(): Promise<void>;
	data: any[];
	isLoading: boolean;
	aside?: boolean | 'left';
}
export interface CardsChildren {
	header?: RenderResult;
	aside?: RenderResult;
}
/* "https://js.arcgis.com/4.16/"
style={`height:${isLoading ? '99999' : cardsHeight}px;`}
*/
const factory = create({ theme, intersection, dimensions, resize })
	.properties<CardsProperties>()
	.children<CardsChildren>();

export const Cards = factory(function Cards({
	children,
	properties,
	middleware: { theme, intersection, dimensions, resize }
}) {
	const id = uuid();
	const themedCss = theme.classes(css);
	const { aside: asidePosition = true, onRequestItems, isLoading, data = [] } = properties();
	let { aside, header } = children()[0] || ({} as CardsChildren);

	const r = resize.get('root');
	const colHeight = Math.max(...([1,2,3,4,5,6].map((i) => dimensions.get(`col${i}`).offset.top||0)));

	const { isIntersecting } = intersection.get('bottom');
	console.log('isLoading', data.length, isLoading, isIntersecting);
	if (!isLoading && isIntersecting) {
		onRequestItems();
	}

	const asideContainer = (
		<virtual>
			<input id={id} type="checkbox" classes={themedCss.trigger} />
			<aside classes={themedCss.aside}>
				<nav classes={themedCss.asideNav}>
					<label for={id} classes={themedCss.triggerLabel}>
						<Icon type="close" />
					</label>
				</nav>
				{aside}
			</aside>
		</virtual>
	);

	const cards = !data ? [] : data.map(
		(
			{
				name,
				summary,
				mediaSrc,
				type,
				privacy,
				actorName,
				handle,
				activity,
				time,
				bookmark,
				topic
			}
		) => <li classes={themedCss.item}>
				<Card
					{...{
						name,
						summary,
						mediaSrc,
						type,
						privacy,
						actorName,
						handle,
						activity,
						time,
						bookmark,
						topic
					}}
				/>
			</li>
	);

	/* up to 6 columns: */
	return (
		<section
			key="root"
			classes={[
				theme.variant(),
				themedCss.root,
				asidePosition === true || asidePosition === 'left' ? themedCss.hasAside : null,
				asidePosition === 'left' ? themedCss.hasLeftAside : null
			]}
		>
			{header}
			{cards || aside ? (
				<virtual>
					<div key="bottom" classes={themedCss.loadTrigger} styles={{top: `${colHeight}px`}} />
					{asidePosition === 'left' ? asideContainer : null}
					<ul key="cards" classes={themedCss.cards}>
						{cards}
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
