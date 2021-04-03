/*
 * Nonsense content generation to keep our infinite list interesting.
 */
/*

*/
import { CardProperties } from '../../../../card/';
import { RedaktorActor } from '../../../../common/interfaces';
const topics = [
	true,
	{color: [220,0,5], name: 'DEPOL'},
	{color: [255,40,0], name: 'USPOL'},
	{color: [255,122,0], name: 'Street Photography'},
	{color: [255,175,0], name: 'Reportage'},
	{color: [250,220,0], name: 'JS'},
	{color: [223,220,0], name: 'Journalism'},
	{color: [149,204,13], name: 'Photojournalism'},
	{color: [19,178,11], name: 'Online Journalism'},
	{color: [51,153,133], name: 'Travel'},
	{color: [0,177,204], name: 'Climate Change'},
	{color: [109,167,209], name: 'TS'},
	{color: [13,126,204], name: 'Surveillance'},
	{color: [59,78,184], name: 'Hamburg'},
	{color: [102,51,153], name: 'Robert Frank'},
	{color: [195,12,112], name: 'ActivityPub'},
	{color: [235,47,89], name: 'FLASH'},
	{color: [122,86,83], name: 'Racism'},
	{color: [97,124,143], name: 'Introduction'}
]
const bookmarks = [
	{color: [220,0,5], name: ''},
	{color: [255,40,0], name: ''},
	{color: [255,122,0], name: ''},
	{color: [255,175,0], name: ''},
	{color: [250,220,0], name: ''},
	{color: [223,220,0], name: ''},
	{color: [149,204,13], name: ''},
	{color: [19,178,11], name: ''},
	{color: [51,153,133], name: ''},
	{color: [0,177,204], name: ''},
	{color: [109,167,209], name: ''},
	{color: [13,126,204], name: ''},
	{color: [59,78,184], name: ''},
	{color: [102,51,153], name: ''},
	{color: [195,12,112], name: ''},
	{color: [235,47,89], name: ''},
	{color: [122,86,83], name: ''},
	{color: [97,124,143], name: ''}
]

const names = [
	'Double Your Profit with These [number] tips on [subject]',
	'[number] Easy Ways You Can Turn [subject] Into Success',
	'Can You Pass The [subject] Test?',
	'Why Ignoring [subject] Will Cost You [goal]',
	'[number] Methods Of [subject] [goal]',
	"What [organization] Doesn't Want You To Know About [subject]",
	'The Aliens Are Sneaking [subject] Into America. What You Need To Know For [better]',
	'Clear And Unbiased Facts About [subject] (Without All The Hype)',
	'[subject] Is Bound To Make An Impact On Your [location]',
	'At Last, The Secret To [subject] Revealed',
	'Take The Stress Out Of [subject]',
	'[number] Easy Ways To Make [subject] [better]',
	'Lies About [subject]',
	'Top [number] Ways To Buy Used [subject]',
	'Improve Your [subject] In [number] Days',
	'[better] [subject] In [number] Easy Steps',
	'Proof That [subject] Are Exactly What You Are Looking For',
	'[subject] Becoming A Challenge? [number] Tips for [subject] [better]',
	"The [organization]'s Secret Campaign Against [subject]",
	"Drone Overhead? Why [organization] Can't Have You Panic"
];

const subjects = ['Waning Gibbous', 'Groby', 'Bitdiddle Industries', 'Tin Foil Hats', 'Cats'];

const goals = ['Success', 'Diversity', 'Happiness'];

const locations = ['Life', 'Business', "Mother's Basement", 'Cat'];

const betters = ['Faster', 'Stronger', 'Successful'];

const organizations = ['The Government', 'The CIA', 'The NSA', 'Math Teachers', 'Mozilla'];

const coordinates = ['18.71511, 34.09042', '-118.71511, 34.09042', '51.537888, 6.745791'];

const places = ['Santa Monica', 'Café Du Bonheur', 'Folkwang Museum Essen'];

const events = ['ActivityPub Conference 2020', 'Fridays For Future Berlin', 'Dinner at Yafo'];

const actTypes = ['Activity','Accept','Add','Announce','Arrive',
'Block','Create','Delete','Dislike','Flag','Follow','Ignore','Invite','Join','Leave',
'Like','Listen','Move','Offer','Question','Reject','Read','Remove','Travel','Undo','Update','View'];
const types = ['Article','Audio','Document','Event','Image',
'Note','Page','Place','Video','Profile','Relationship','Link'];

const privacies = ['private', 'group', 'public'];

function activityPubContext(sampleID: string = 'sample') {
	return (o: any, i: number) => {
		if (!o['@context']) {
			o['@context'] = "https://www.w3.org/ns/activitystreams"
		}
		if (!o['id']) {
			o.id = `${sampleID}ID${i}`
		}
		return o
	}
}
function generateArticleTitle() {
	const template = names[Math.floor(Math.random() * names.length)];

	return template.replace(/\[[^\]]+\]/g, (match) => {
		switch (match) {
			case '[number]':
				return String(Math.round(Math.random() * 14) + 1);
			case '[subject]':
				return subjects[Math.floor(Math.random() * subjects.length)];
			case '[goal]':
				return goals[Math.floor(Math.random() * goals.length)];
			case '[location]':
				return locations[Math.floor(Math.random() * locations.length)];
			case '[better]':
				return betters[Math.floor(Math.random() * betters.length)];
			case '[organization]':
				return organizations[Math.floor(Math.random() * organizations.length)];
		}

		return match;
	});
}


const actors = [
	{
	  "type": "Application",
		"id": "https://example.com/",
	  "name": "Exampletron 3000"
	}, {
	  "type": "Group",
		"id": "https://austin.peterjoannou.co.uk/",
	  "name": "Big Beards of Austin",
	  "summary": "Beards longer than walls"
	}, {
	  "type": "Organization",
		"id": "https://redaktor.me/",
	  "name": "redaktor Foundation"
	}, {
	  "type": "Person",
		"id": "https://alyssa.redaktor.me/",
	  "name": "Alyssa P. Hacker"
	}, {
	  "type": "Person",
		"id": "https://robin.redaktor.me/",
	  "name": "Robin Rebel",
	  "summary": generateArticleTitle()
	}, {
	  "type": "Person",
		"id": "https://ben.example.com/",
	  "name": "Ben Bitdiddle"
	}, {
	  "type": "Person",
		"id": "https://fayola.example.com/",
	  "name": "Fayola",
	  "summary": generateArticleTitle()
	}, {
	  "type": "Person",
		"id": "https://sara.example.com/",
	  "name": "Sara Talk",
	  "summary": generateArticleTitle()
	}, {
	  "type": "Person",
		"id": "https://chris.example.com/",
	  "name": "Chris",
	  "summary": generateArticleTitle()
	}, {
	  "type": "Person",
		"id": "https://amy.example.com/",
	  "name": "Amy",
	  "summary": generateArticleTitle()
	}, {
	  "type": "Person",
		"id": "https://evan.example.com/",
	  "name": "Evan",
	  "summary": generateArticleTitle()
	}, {
	  "@context": ["https://www.w3.org/ns/activitystreams",
	               {"@language": "ja"}],
	  "type": "Person",
	  "id": "https://kenzoishii.example.com/",
	  "preferredUsername": "kenzoishii",
	  "name": "石井健蔵",
	  "summary": "この方はただの例です",
	  "icon": [
	    "https://kenzoishii.example.com/image/165987aklre4"
	  ]
	}
].map(activityPubContext('actor'));

const fixedActors: RedaktorActor[] = [
	{
		type: 'Person',
		id: 'https://mstdn.io/@tmarble',
		name: `Tom Marble`,
		summary: `Consultant specializing in: Clojure, Debian GNU/Linux, cybersecurity, performance analysis, and FLOSS hw/sw/legal policy.`,
		handle: '@tmarble@mstdn.io',
		preferredUsername: 'Tom Marble',
		follow: 'follower',
		icon: 'https://media.mstdn.io/mstdn-media/accounts/avatars/000/067/970/original/4431a7747fe3602a.jpg'
	}, {
		type: 'Person',
		id: 'https://mastodon.social/@sl007',
		name: `Sebastian Lasse - Consultant and Coach`,
		summary: `Sebastian Lasse is a photojournalist (concerned photography), filmmaker and developer. Currently building a decentralized ActivityPub FLOSS CMS`,
		handle: '@sl007@mastodon.social',
		follow: 'me',
		icon: 'https://files.mastodon.social/accounts/avatars/000/193/100/original/7f01a5239b42dd26.png'
	}, {
		type: 'Person',
		id: 'https://octodon.social/@cwebber',
		name: `Christopher Lemmer Webber`,
		summary: `User freedom activist, ActivityPub co-editor,
Spritely project lead, parenthesis enthusiast, occasional artist.`,
		handle: '@cwebber@octodon.social',
		preferredUsername: 'Christopher Lemmer Webber',
		petName: 'Chris',
		follow: 'mutual',
		icon: 'https://assets.octodon.social/accounts/avatars/000/050/423/original/f460dcb4e096ebf9.png'
	}
].map(activityPubContext('fixedActor'));

fixedActors[0].edgeNames = [fixedActors[2]];
fixedActors[2].edgeNames = [
	fixedActors[0],
	actors[1],
	actors[2],
	actors[3],
	actors[5]
];

/**
 * Grabs content for our list. This is async because it could be pulling data from a server.
 */
const mediaSrc = require('../card/img/card-photo.jpg');
const mediaSrc41 = require('../card/img/card-photo-1-4.jpg');
const mediaSrc11 = require('../card/img/card-photo-1-1.jpg');
const mediaSrc23 = require('../card/img/card-photo-2-3.jpg');
const medias = [
	{mediaSrc, aspectRatio: '16:9'},
	{mediaSrc: mediaSrc41, aspectRatio: '4:1'},
	{mediaSrc: mediaSrc11, aspectRatio: '1:1'},
	{mediaSrc: mediaSrc23, aspectRatio: '3:2'}
];

export function getListItems(count = 50): Promise<CardProperties[]> {
	const articles: any[] = [];

	for (let i = 0; i < count; i++) {
		const type = i < 2 ? 'Article' : (
			i === 2 ? 'Event' : (i === 3 ? 'Place' : types[Math.floor(Math.random() * types.length)])
		);

		const name = type === 'Place' ? places[Math.floor(Math.random() * places.length)] :
			(type === 'Event' ? events[Math.floor(Math.random() * events.length)] : generateArticleTitle());

		let sentences = Math.round(Math.random() * (type === 'Event' || type === 'Place' ? 3 : 5));
		let summary = `${type} ${generateArticleTitle()}`;
		for (let j = 0; j < sentences; j++) {
			summary += '. ' + generateArticleTitle();
		}
		let content = null;
		if (type === 'Note' && Math.random() > 0.3) {
			sentences = Math.round(Math.random() * 50);
			content = `${type} ${generateArticleTitle()}`;
			for (let j = 0; j < sentences; j++) {
				content += '. ' + generateArticleTitle();
			}
		}

		const media = i < 1 || type === 'Image' ? {mediaSrc: mediaSrc23, aspectRatio: '3:2'} : (
			type === 'Video' || type === 'Page' ? {mediaSrc} : (
				type === 'Audio' ? {mediaSrc: mediaSrc11, aspectRatio: '1:1'} : (
					type === 'Event' ? {mediaSrc: mediaSrc41, aspectRatio: '4:1'} :
						(Math.random() > 0.5 ? medias[Math.floor(Math.random() * medias.length)] : {aspectRatio: '16:9'})
				)
			)
		);

		const kicker = type === 'Place' ? coordinates[Math.floor(Math.random() * coordinates.length)] : null;

		articles.push({
			"@context": "https://www.w3.org/ns/activitystreams",
			id: `activityID${i}`,
			type: i < 3 ? 'Announce' : actTypes[Math.floor(Math.random() * actTypes.length)],
			name,
			summary,
			content,
			kicker,
			privacy: privacies[Math.floor(Math.random() * privacies.length)],
			bookmark: Math.random() > 0.75 ? bookmarks[Math.floor(Math.random() * bookmarks.length)] : false,
			topic: Math.random() > 0.65 ? topics[Math.floor(Math.random() * topics.length)] : false,
			published: `${i+1}m ago`,

			actor: i < 3 ? fixedActors[i] : actors[Math.floor(Math.random() * actors.length)],

			object: {
				id: `#${i}`,
				type,
				name,
				summary,
				content,
				kicker,
				privacy: privacies[Math.floor(Math.random() * privacies.length)],
				bookmark: Math.random() > 0.75 ? bookmarks[Math.floor(Math.random() * bookmarks.length)] : false,
				topic: Math.random() > 0.65 ? topics[Math.floor(Math.random() * topics.length)] : false,
				published: `${i+23}m ago`,
				attributedTo: actors[Math.floor(Math.random() * actors.length)]
			},
			...media
		});
	}

	return new Promise<CardProperties[]>((resolve) => {
		setTimeout(() => {
			resolve(articles);
		}, 300);
	});
}
