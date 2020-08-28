import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import intersection from '@dojo/framework/core/middleware/intersection';
// import dimensions from '@dojo/framework/core/middleware/dimensions';
// import resize from '@dojo/framework/core/middleware/resize';
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
	content: RenderResult;
	aside?: RenderResult;
}
/* "https://js.arcgis.com/4.16/"
style={`height:${isLoading ? '99999' : cardsHeight}px;`}

	{
		content && typeof content === 'object' && content.hasOwnProperty('children') ?
			(content as any).children.map((card: any) => <li classes={themedCss.item}>{card}</li>) :
			content
	}
*/
const factory = create({ theme, intersection })
	.properties<CardsProperties>()
	.children<CardsChildren>();

export const Cards = factory(function Cards({
	children,
	properties,
	middleware: { theme, intersection }
}) {
	const id = uuid();
	const themedCss = theme.classes(css);
	const { aside: asidePosition = true, onRequestItems, data, isLoading } = properties();
	let { aside, content } = children()[0] || ({} as CardsChildren);

	// const r = resize.get('root');
	// const cardsHeight = dimensions.get('bottom').offset.top + 1800;

	const { isIntersecting } = intersection.get('bottom');
	console.log('isLoading', isLoading, isIntersecting);
	if (isIntersecting && !isLoading) {
		console.log('isIntersecting!', data ? data.length : 'no data');
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
			{content || aside ? (
				<virtual>
					{asidePosition === 'left' ? asideContainer : null}
					<ul key="cards" classes={themedCss.cards}>
						{data &&
							data.map(
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
									},
									i
								) => (
									<li classes={themedCss.item}>
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
								)
							)}
						<li style="background-color:red;">
							<span key="bottom">more</span>
						</li>
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
