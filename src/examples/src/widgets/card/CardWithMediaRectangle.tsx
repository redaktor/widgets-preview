import { create, tsx } from '@dojo/framework/core/vdom';
import Card from '@dojo/widgets/card';
import Avatar from '@dojo/widgets/avatar';
const mediaSrc = require('./img/card-photo.jpg');

const factory = create();

export default factory(function CardWithMediaRectangle() {
	return (
		<div styles={{ width: '520px' }}>
			<Card
				mediaSrc={mediaSrc}
				nameMap={{en: "It is on! The season is officially open!", de: "Es ist an! Die Saison ist eröffnet!"}}
				type={["note", "image"]}
				privacy={"group"}
				actorName={"Sebastian Lasseeeeeeeeeeeeeeeee, redaktor.me 🐍"}
				handle={"@sl007@mastodon.social000000000000000"}
				activity={"created"}
				time={"23m ago"}
			>
				{{
					avatar: <Avatar spaced={false}>SL</Avatar>,
					content: <p>
						Auch 2020 gibt es wieder #ActivityPub Conf.<br />
						Yay!<br /><br />
						Eine Konferenz zur Gegenwart und Zukunft des führenden föderierten Webstandards.
						<br /><br />
						Ihr könnt Euch hier registrieren, es ist für alle gratis:<br />
						https://conf.activitypub.rocks <br />
						Wer zuerst kommt, malt zuerst.<br />

						⬡ #apconf2020 #fediverse<br />
					</p>
				}}
			</Card>
		</div>
	);
});
