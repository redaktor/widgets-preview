import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Details from '@dojo/widgets/details';
import Avatar from '@dojo/widgets/avatar';
import Icon from '@dojo/widgets/icon';
import Button from '@dojo/widgets/button';
import Card, { CardProperties } from '@dojo/widgets/card';
/*
import Map from '@dojo/widgets/map';

	<div
		styles={{
			width: '100%',
			height: '100%',
			position: 'absolute',
			top: '0px',
			left: '0px',
			zIndex: '10000'
		}}
	>
		<Map mapId="75a3ce8990674a5ebd5b9ab66bdab893" center={[51.568255, 6.743474]} />
	</div>
*/
const exampleData: any = {
  "@context": "https://www.w3.org/ns/activitystreams",
  type: "Announce",
  actor: {
    follow: "follower"​​,

    handle: "@tmarble@mstdn.io",
    icon: "https://media.mstdn.io/mstdn-media/accounts/avatars/000/067/970/original/4431a7747fe3602a.jpg",
    id: "https://mstdn.io/@tmarble",
    name: "Benjamin Tomas Savage Tom",
    preferredUsername: "Benjamin Tomas Savage Tom",
    summary: "Consultant specializing in: Clojure, Debian GNU/Linux, cybersecurity, performance analysis, and FLOSS hw/sw/legal policy.",
    type: "Person"
  },
  id: "activityID0",
  mediaSrc: "card-photo-2-3.3G_muD46.jpg",
  name: "The Government's Secret Campaign Against Cats",
  ​
  object: {
    id: "#0",
    attributedTo: {
      "@context": "https://www.w3.org/ns/activitystreams",
      id: "https://amy.example.com/",
      name: "Amy",
      summary: "Proof That Bitdiddle Industries Are Exactly What You Are Looking For",
      type: "Person"
    },
    name: "The Government's Secret Campaign Against Cats",
    summary: "Article 10 Easy Ways To Make Tin Foil Hats Stronger. Proof That Cats Are Exactly What You Are Looking For",

    privacy: "public",
    published: "23m ago",
    bookmark: false,
    content: null,
    kicker: 'yo kicker',
    topic: {color: [ 223, 220, 0 ], name: "Journalism"},
		type: "Article"
  },
  ​
  privacy: "private",
  published: "1m ago",
  summary: "Article 10 Easy Ways To Make Tin Foil Hats Stronger. Proof That Cats Are Exactly What You Are Looking For",
  ​
  topic: false,
  aspectRatio: "3:2",
  bookmark: { color: [149, 204, 13], name: "testbook" },
  content: null,
  kicker: 'a kicker',​

  actionButtons: {}
}
exampleData.actionButtons = (
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

const types = ['Article','Note','Audio','Document','Event','Image','Page',
'Place','Video','Profile','Relationship','Tombstone','Link','Mention',
'Collection','OrderedCollection','CollectionPage','OrderedCollectionPage'];
const cards = types.map((t) => {
	const o = JSON.parse(JSON.stringify({...exampleData}));
	o.object.type = t;
	if (t === 'Note' || t === 'Audio' || t === 'Image' || t === 'Video') {
		o.kicker = null;
	}
	return <virtual>
		<br />
		<h3>{t}</h3>
		<Card {...o} />
	</virtual>
});
const factory = create();

export default factory(function Basic() {
	return (
		<Example spaced={true}>
			<div styles={{ width: '380px' }}>
				{ ...cards }
			</div>
		</Example>
	);
});
