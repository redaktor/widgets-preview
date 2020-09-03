/*
 * Nonsense content generation to keep our infinite list interesting.
 */
/*

*/
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

const ApTypes = {
	note: 1,
	article: 1,
	image: 1,
	audio: 1,
	video: 1,
	event: 1,
	place: 1,
	page: 1,
	/* TODO
	chat: 1,
	redaktor: 1,
	terminal: 1,
	map: 1 */
};
const types = Object.keys(ApTypes);
const privacies = ['private', 'group', 'public'];

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

/**
 * Grabs content for our list. This is async because it could be pulling data from a server.
 */
interface CardProps {
	name: string;
	summary: string;
	kicker?: string;
	aspectRatio?: '1:1' | '3:2' | '16:9' | '4:1';
	mediaSrc: any;
	type: string;
	privacy: string;
	bookmark: boolean;
	topic: boolean;
	actorName: string;
	handle: string;
	activity: string;
	time: string;
}
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

export function getListItems(count = 50): Promise<CardProps[]> {
	const articles: any[] = [];

	for (let i = 0; i < count; i++) {
		const type = i < 2 ? 'article' : types[Math.floor(Math.random() * types.length)];

		const name = type === 'place' ? places[Math.floor(Math.random() * places.length)] :
			(type === 'event' ? events[Math.floor(Math.random() * events.length)] : generateArticleTitle());

		const sentences = Math.round(Math.random() * (type === 'event' || type === 'place' ? 3 : 5));
		let summary = `${type} ${generateArticleTitle()}`;
		for (let j = 0; j < sentences; j++) {
			summary += '. ' + generateArticleTitle();
		}
		/*

		note: 1,
		article: 1,
		image: 1,
		audio: 1,
		video: 1,
		event: 1,
		place: 1,
		page: 1,

		TODO
		chat: 1,
		redaktor: 1,
		terminal: 1,
		map: 1 ::
		*/
		const media = i < 1 || type === 'image' ? {mediaSrc: mediaSrc23, aspectRatio: '3:2'} : (
			type === 'video' || type === 'page' ? {mediaSrc} : (
				type === 'audio' ? {mediaSrc: mediaSrc11, aspectRatio: '1:1'} : (
					type === 'event' ? {mediaSrc: mediaSrc41, aspectRatio: '4:1'} :
						(Math.random() > 0.5 ? medias[Math.floor(Math.random() * medias.length)] : {aspectRatio: '16:9'})
				)
			)
		);

		const kicker = type === 'place' ? coordinates[Math.floor(Math.random() * coordinates.length)] : null;


		articles.push({
			name,
			type,
			summary,
			kicker,
			privacy: privacies[Math.floor(Math.random() * privacies.length)],
			bookmark: Math.random() > 0.75 ? bookmarks[Math.floor(Math.random() * bookmarks.length)] : false,
			topic: Math.random() > 0.65 ? topics[Math.floor(Math.random() * topics.length)] : false,
			activity: Math.random() > 0.5 ? 'Susanne Sharer shared' : null,
			actorName: `Lorem Ipsum`,
			handle: '@sl007@mastodon.social',
			time: '23m ago',
			...media
		});
	}

	return new Promise<CardProps[]>((resolve) => {
		setTimeout(() => {
			resolve(articles);
		}, 300);
	});
}
