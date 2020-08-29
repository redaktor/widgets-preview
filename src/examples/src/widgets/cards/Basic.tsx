import { create, tsx } from '@dojo/framework/core/vdom';
import { wordsAndBreaks } from '../../../../framework/String/words';
import icache from '@dojo/framework/core/middleware/icache';
import { getListItems } from './listItemGenerator';
import Card from '@dojo/widgets/card';
import Cards from '@dojo/widgets/cards';
import Details from '@dojo/widgets/details';
import Avatar from '@dojo/widgets/avatar';
import Icon from '@dojo/widgets/icon';
import Button from '@dojo/widgets/button';
import Map from '@dojo/widgets/map';
import * as cardCss from '../../../../theme/material/card.m.css';
import * as asideCss from '../../../../theme/material/aside.m.css';
const mediaSrc = require('../card/img/card-photo.jpg');
const mediaSrc41 = require('../card/img/card-photo-1-4.jpg');
const mediaSrc11 = require('../card/img/card-photo-1-1.jpg');
const mediaSrc23 = require('../card/img/card-photo-2-3.jpg');
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

const nameMap = {
	en: 'It is on! The season is officially open!',
	de: 'Es ist an! Die Saison ist eröffnet!'
};
const summary = `Auch 2020 gibt es wieder #ActivityPub Conf
Yay!

Eine Konferenz zur Gegenwart und Zukunft des führenden föderierten Webstandards.

Ihr könnt Euch hier registrieren, es ist für alle gratis:
https://conf.activitypub.rocks
Wer zuerst kommt, malt zuerst.
Un projet parmi d'autres, Roborder : une flotte autonomes de robots, avec algorithmes de détection et analyses prédictives lorem ipsu
⬡ #apconf2020 #fediverse`;
const avatar = <Avatar spaced={false}>SL</Avatar>;
const name = 'Sebastian Lasse'; /* TODO max length 20 */
const nameSummary = 'redaktor.me 🐍'; /* TODO max length like mastodon-20 */
const handle = '@sl007@mastodon.social';

const actionButtons = (
	<virtual>
		<Button spaced={false} responsive={true}>
			<Icon size="xxl" type="link" />
		</Button>
		<Button spaced={false} responsive={true}>
			<Icon size="xxl" type="like" />
		</Button>
		<Button spaced={false} responsive={true}>
			<Icon size="xxl" type="bookmark" />
		</Button>
		<Button spaced={false} responsive={true}>
			<Icon size="xxl" type="share" />
		</Button>
		<noscript>
			<Button spaced={false} responsive={true}>
				<Icon size="xxl" type="comment" />
			</Button>
		</noscript>
		<Icon spaced={false} type="more" />
	</virtual>
);
const actionButtons2 = (
	<virtual>
		<Button spaced={false} responsive={true}>
			<Icon size="xxl" type="update" />
		</Button>
		<Button spaced={false} responsive={true}>
			<Icon size="xxl" type="_delete" />
		</Button>
		<Button spaced={false} responsive={true}>
			<Icon size="xxl" type="bookmark" />
		</Button>
		<Button spaced={false} responsive={true}>
			<Icon size="xxl" type="move" />
		</Button>
		<Icon spaced={false} type="more" />
	</virtual>
);

const factory = create({ icache });
// const chunks = wordsAndBreaks(summary);
export default factory(function CardsExample({ middleware: { icache } }) {
	const data: any = icache.getOrSet('data', getListItems);
	const isLoading: boolean = icache.get('loading') || false;

	const stdProps: any = {
		actorName: `${name}, ${nameSummary}`,
		handle,
		privacy: 'group',
		time: '23m ago'
	};

	return (
		<Cards
			{...{
				isLoading,
				data,
				onRequestItems: async () => {
					icache.set('loading', true);
					const newData = await getListItems();
					const data = icache.get('data') || [];
					console.log(data);
					icache.set('loading', false, false);
					icache.set('data', [...(data as any), ...newData]);
				}
			}}
		>
			{{
				header: (
					<button style="position:absolute;top:-18px;left:0;background:#fadc00;" onclick={() => {
						(document.querySelector('.markdown + .hidden') as any).classList.toggle("markdownFullscreen");
						(document.querySelector('.z-90.hidden') as any).classList.toggle("markdownFullscreen");
						(document.querySelector('.markdown') as any).classList.toggle("markdownFullscreen");
					}}>
						TOGGLE EXAMPLE
					</button>
				),
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
								<Icon size="l" spaced={false} type="view" /> All
							</Button>
						</Details>
						<Details open={true} summary="Federate">
							<h5 classes={asideCss.subheadline}>new</h5>
							<ul classes={[asideCss.container, asideCss.federate]}>
								<li classes={[asideCss.item, asideCss.top]}>
									<div classes={asideCss.avatar}>
										<Avatar spaced={false}>BB</Avatar>
									</div>
									<span classes={asideCss.rows}>
										<span classes={asideCss.name}>Robin Rebel</span>
										<br />
										<small classes={asideCss.handle}>@robin@rebel.me</small>
										<Button spaced={false} variant="outlined">
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
										<Button spaced={false} variant="outlined">
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
										<Button spaced={false} variant="outlined">
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
										<Button spaced={false} variant="outlined">
											Follow
										</Button>
									</span>
								</li>
							</ul>
							<br />
							<Button>
								<Icon size="l" spaced={false} type="view" /> All
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
								<Icon size="l" spaced={false} type="view" /> All
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
				),

				content: (
					<virtual>
						<Card
							{...{
								...stdProps,
								type: 'note',
								bookmark: true,
								topic: true,
								content: '1: minimal note: \n' + summary.substr(0, 48),
								mediaSrc: mediaSrc11,
								aspectRatio: '1:1'
							}}
						>
							{{ avatar, actionButtons }}
						</Card>
						<Card
							{...{
								...stdProps,
								name: '2 A headline',
								petName: 'Sebi',
								mediaSrc: mediaSrc23,
								aspectRatio: '3:2',
								type: 'note',
								summary:
									'2: note w. image and summary: \n' + summary.substr(0, 180),
								content: summary
							}}
						>
							{{ avatar, actionButtons }}
						</Card>
						<Card
							{...{
								...stdProps,
								mediaSrc,
								nameMap,
								type: 'article',
								summary: '3: article w. image and summary: \n' + summary,
								content: summary
							}}
						>
							{{ avatar, actionButtons }}
						</Card>
					</virtual>
				)
			}}
		</Cards>
	);
});
