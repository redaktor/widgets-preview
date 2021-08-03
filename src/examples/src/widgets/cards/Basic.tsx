import { create, tsx } from '@dojo/framework/core/vdom';
// import { wordsAndBreaks } from '../../../../framework/String/words';
import icache from '@dojo/framework/core/middleware/icache';
import { getListItems } from './listItemGenerator';
// import Card from '@redaktor/widgets/card';
// import Map from '@redaktor/widgets/map';
import Example from '../../Example';
import Cards from '@redaktor/widgets/cards';
import Details from '@redaktor/widgets/details';
import Avatar from '@redaktor/widgets/avatar';
import Icon from '@redaktor/widgets/icon';
import Button from '@redaktor/widgets/button';
// import * as cardCss from '../../../../theme/material/card.m.css';
import * as asideCss from '../../../../theme/material/aside.m.css';

const actionButtons = (
	<virtual>
		<Button size="l" spaced={false} responsive={true}>
			<Icon size="xxl" type="link" />
		</Button>
		<Button size="l" spaced={false} responsive={true}>
			<Icon size="xxl" type="like" />
		</Button>
		<Button size="l" spaced={false} responsive={true}>
			<Icon size="xxl" type="bookmark" />
		</Button>
		<Button size="l" spaced={false} responsive={true}>
			<Icon size="xxl" type="share" />
		</Button>
		<noscript>
			<Button size="l" spaced={false} responsive={true}>
				<Icon size="xxl" type="comment" />
			</Button>
		</noscript>
		<Icon spaced={false} type="more" />
	</virtual>
);
// TODO aside + css
/* TODO : Focus and List styles
Languages
Link area
Comment area

TODO hover avatar (follow, hover "cascade" if other accounts mentioned in description)

mine
update delete bookmark move more

other
xxx like bookmark share more
[accept, join, move]


## USER (FROM)
follow / unfollow | join / leave (group)
dm
mention
--
## TO
[users list w ## USER popup]

## MORE
link kopieren
download (?)
einbettungscode anfordern / erwerben
---
mute
block
flag

## ASIDE

-
Docs / Support / About Instance / Announcements
-
Most read
Follow Recommendations
Trending Tags
Subscribed Topics (inkl. hash2pub)

<Details open={true} summary="Bookmarks"><p>c</p></Details>
<Details open={true} summary="Saved Searches"><p>d</p></Details>

Calendar,
Last notes, articles, photos ...

Map
Nearby

///
topics, bookmarks / searches



CARD
Note
Article
Image
Video
Audio
Event
Place

Collection
Photo/Video/Audio Album
Calendar
Map



<Card
	{...{
		...stdProps,
		// mediaSrc: mediaSrc41,
		// aspectRatio: '4:1',
		type: 'place',
		name: 'Name of Place',
		summary: 'summary',
		kicker: '34.0822731, -118.8262169'
		// content: '4: from me a minimal note: \n'+summary.substr(0,48)
	}}
>
	{{
		avatar,
		actionButtons: actionButtons2,
		header: (
			<div
				classes={[cardCss.media, cardCss.baselined, cardCss.m1by1]}
			>
				<Map
					mapId="75a3ce8990674a5ebd5b9ab66bdab893"
					center={[-118.71511, 34.09042]}
					proxy='https://cors-anywhere.herokuapp.com/'
				/>
			</div>
		)
	}}
</Card>
*/

function withChildren(o: any) {
	console.log(o.actor.name);
	if (o.type !== 'article') { o.actionButtons = actionButtons }
	return o
}
async function getListItemsWithChildren() {
	const page = await getListItems();
	return page.map(withChildren)
}
const factory = create({ icache });

// const chunks = wordsAndBreaks(summary);
export default factory(function CardsExample({ middleware: { icache } }) {
	const page: any = icache.getOrSet('page', getListItemsWithChildren);

	(async () => console.log( (await getListItems()).map(withChildren)[0] ))();
	return (
		<Example hasFullscreen={true}>
			<Cards
				{...{
					page,
					onRequestItems: async () => (await getListItems()).map(withChildren)
				}}
			>
				{{
					// header: '',
					aside: (
						<div classes={asideCss.root}>
							<Details open={true} summary="Most read">
								<ol classes={[asideCss.container, asideCss.mostread]}>
									<li tabindex="0" classes={asideCss.item}>
										<div classes={asideCss.icon}>1</div>
										<span classes={asideCss.caption}>
											Lorem Ipsum Lorem Ipsum Lorem Ipsum dolor sunt lorem ipsum
											lorem ipsum max 5 lines
										</span>
									</li>
									<li tabindex="0" classes={asideCss.item}>
										<div classes={asideCss.icon}>2</div>
										<span classes={asideCss.caption}>Lorem Ipsum dolor sunt</span>
									</li>
									<li tabindex="0" classes={asideCss.item}>
										<div classes={asideCss.icon}>3</div>
										<span classes={asideCss.caption}>Lorem Ipsum dolor sunt</span>
									</li>
									<li tabindex="0" classes={asideCss.item}>
										<div classes={asideCss.icon}>4</div>
										<span classes={asideCss.caption}>Lorem Ipsum dolor sunt</span>
									</li>
								</ol>
								<br />
								<Button>
									<span><Icon size="l" spaced={false} type="view" /> All</span>
								</Button>
							</Details>
							<Details open={true} summary="Federate">
								<h5 classes={asideCss.subheadline}>new</h5>
								<ul classes={[asideCss.container, asideCss.federate]}>
									<li classes={[asideCss.item, asideCss.top]}>
										<div classes={asideCss.avatar}>
											<Avatar spaced={false}>RR</Avatar>
										</div>
										<span classes={asideCss.rows}>
											<span classes={asideCss.name}>Robin Rebel</span>
											<br />
											<small classes={asideCss.handle}>@robin@rebel.me</small>
											<Button spaced={false} design="outlined">
												Follow
											</Button>
										</span>
									</li>
								</ul>
								<h5 classes={asideCss.subheadline}>recommended</h5>
								<ul classes={[asideCss.container, asideCss.federate]}>
									<li classes={[asideCss.item, asideCss.top]}>
										<div classes={asideCss.avatar}>
											<Avatar spaced={false}>AP</Avatar>
										</div>
										<span classes={asideCss.rows}>
											<span classes={asideCss.name}>Alyssa P. Hacker</span>
											<br />
											<small classes={asideCss.handle}>alyssa@chaos.social</small>
											<Button spaced={false} design="outlined">
												Follow
											</Button>
										</span>
									</li>
									<li classes={[asideCss.item, asideCss.top]}>
										<div classes={asideCss.avatar}>
											<Avatar spaced={false}>BB</Avatar>
										</div>
										<span classes={asideCss.rows}>
											<span classes={asideCss.name}>Ben Bitdiddle</span>
											<br />
											<small classes={asideCss.handle}>@ben@octodon.social</small>
											<Button spaced={false} design="outlined">
												Follow
											</Button>
										</span>
									</li>
									<li classes={[asideCss.item, asideCss.top]}>
										<div classes={asideCss.avatar}>
											<Avatar spaced={false}>ED</Avatar>
										</div>
										<span classes={asideCss.rows}>
											<span classes={asideCss.name}>Ed</span>
											<br />
											<small classes={asideCss.handle}>@ed@octodon.social</small>
											<Button spaced={false} design="outlined">
												Follow
											</Button>
										</span>
									</li>
								</ul>
								<br />
								<Button>
									<span><Icon size="l" spaced={false} type="view" /> All</span>
								</Button>
							</Details>
							<Details open={true} summary="Trending Tags">
								<ol classes={[asideCss.container, asideCss.tags]}>
									<li classes={asideCss.item}>
										<div classes={asideCss.graph} />
										<span classes={asideCss.tag}>
											supertag
											<br />
											<small classes={asideCss.tagCount}>
												<b>382</b>
												<span> reden drüber</span>
											</small>
										</span>
									</li>
									<li classes={asideCss.item}>
										<div classes={asideCss.graph} />
										<span classes={asideCss.tag}>
											cooltag
											<br />
											<small classes={asideCss.tagCount}>
												<b>342</b>
												<span> reden drüber</span>
											</small>
										</span>
									</li>
									<li classes={asideCss.item}>
										<div classes={asideCss.graph} />
										<span classes={asideCss.tag}>
											3tag
											<br />
											<small classes={asideCss.tagCount}>
												<b>287</b>
												<span> reden drüber</span>
											</small>
										</span>
									</li>
									<li classes={asideCss.item}>
										<div classes={asideCss.graph} />
										<span classes={asideCss.tag}>
											othertag
											<br />
											<small classes={asideCss.tagCount}>
												<b>40</b>
												<span> reden drüber</span>
											</small>
										</span>
									</li>
									<li classes={asideCss.item}>
										<div classes={asideCss.graph} />
										<span classes={asideCss.tag}>
											incredibleFive
											<br />
											<small classes={asideCss.tagCount}>
												<b>5</b>
												<span> reden drüber</span>
											</small>
										</span>
									</li>
								</ol>
								<br />
								<Button>
									<span><Icon size="l" spaced={false} type="view" /> All</span>
								</Button>
							</Details>
							<Details open={true} summary="Recent Topics">
								<ul classes={[asideCss.container, asideCss.topics]}>
									<li classes={[asideCss.item, asideCss.rows]}>
										<span classes={asideCss.topic}>
											b&w photography
											<br />
											<small classes={asideCss.topicCount}>
												<b>82</b>
												<span> neu / 1238</span>
											</small>
										</span>
										<div classes={asideCss.topicImage} />
									</li>
									<li classes={[asideCss.item, asideCss.rows]}>
										<span classes={asideCss.topic}>
											webdesign
											<br />
											<small classes={asideCss.topicCount}>
												<b>40</b>
												<span> neu / 761</span>
											</small>
										</span>
										<div classes={asideCss.topicImage} />
									</li>
									<li classes={[asideCss.item, asideCss.rows]}>
										<span classes={asideCss.topic}>
											rare stamps
											<br />
											<small classes={asideCss.topicCount}>
												<span>22</span>
											</small>
										</span>
										<div classes={asideCss.topicImage} />
									</li>
								</ul>
							</Details>
						</div>
					)}}
			</Cards>
		</Example>
	);
});
