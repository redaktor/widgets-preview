import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { uuid } from '@dojo/framework/core/util';
// import Button from '../button';
import Icon from '../icon';
import * as css from '../theme/material/cards.m.css';
import theme from '../middleware/theme';

export interface CardsProperties {
	aside?: boolean | 'left';
}
export interface CardsChildren {
	content: RenderResult;
	aside?: RenderResult;
}
const factory = create({ theme }).properties<CardsProperties>().children<CardsChildren>();

export const Cards = factory(function Cards({ children, properties, middleware: { theme } }) {
	const id = uuid();
	const themedCss = theme.classes(css);
	const { aside: asidePosition = true } = properties();
	let { aside, content } = children()[0] || ({} as CardsChildren);

	const asideContainer = <virtual>
		<input id={id} type="checkbox" classes={themedCss.trigger} />
		<aside classes={themedCss.aside}>
			<nav classes={themedCss.asideNav}>
				<label for={id} classes={themedCss.triggerLabel}><Icon type="close" /></label>
			</nav>
			{aside}
		</aside>
	</virtual>

	/* up to 6 columns: */
	return (
		<section key="root" classes={[
			theme.variant(),
			themedCss.root,
			(asidePosition === true || asidePosition === 'left') ? themedCss.hasAside : null,
			asidePosition === 'left' ? themedCss.hasLeftAside : null
		]}>
			{ (content || aside) ?
				<virtual>
					{asidePosition === 'left' ? asideContainer : null }
					<ul classes={themedCss.cards}>
						{ content && typeof content === 'object' && content.hasOwnProperty('children') ?
								(content as any).children.map((card: any) => <li classes={themedCss.item}>{card}</li>) :
								content
						}
						<li classes={[themedCss.item, themedCss.breaked]}></li>
						<li classes={[themedCss.item, themedCss.breaked]}></li>
						<li classes={[themedCss.item, themedCss.breaked]}></li>
						<li classes={[themedCss.item, themedCss.breaked]}></li>
						<li classes={[themedCss.item, themedCss.breaked]}></li>
						<li classes={[themedCss.item, themedCss.breaked]}></li>
					</ul>
					{asidePosition === true ? asideContainer : null }
				</virtual> : null}
		</section>
	);
});

export default Cards;
