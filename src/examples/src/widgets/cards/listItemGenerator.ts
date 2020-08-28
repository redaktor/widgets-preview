/*
 * Nonsense content generation to keep our infinite list interesting.
 */

const names = [
	'Double Your Profit with These [number] tips on [subject]',
	'[number] Easy Ways You Can Turn [subject] Into Success',
	'Can You Pass The [subject] Test?',
	'Why Ignoring [subject] Will Cost You Time And Sales',
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

const subjects = ['Waning Gibbous', 'Government Test Sites', 'Tin Foil Hats', 'Cats'];

const goals = ['Success', 'Domination', 'Happiness'];

const locations = ['Life', 'Business', "Mother's Basement", 'Cat'];

const betters = ['Faster', 'Stronger', 'Successful'];

const organizations = ['The Government', 'The CIA', 'The FBI', 'Math Teachers'];

const ApTypes = {
	note: 1,
	article: 1,
	image: 1,
	audio: 1,
	video: 1,
	event: 1,
	place: 1,
	chat: 1,
	page: 1,
	redaktor: 1,
	terminal: 1,
	map: 1
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
export function getListItems(count = 10): Promise<CardProps[]> {
	const articles: any[] = [];

	for (let i = 0; i < count; i++) {
		const sentences = Math.round(Math.random() * 3);

		let summary = generateArticleTitle();
		for (let j = 0; j < sentences; j++) {
			summary += '. ' + generateArticleTitle();
		}

		articles.push({
			mediaSrc: Math.random() > 0.5 ? mediaSrc : null,
			name: generateArticleTitle(),
			summary,
			type: types[Math.floor(Math.random() * types.length)],
			privacy: privacies[Math.floor(Math.random() * privacies.length)],
			bookmark: Math.random() > 0.5, // TODO
			topic: Math.random() > 0.5,
			actorName: `Lorem Ipsum`,
			handle: '@sl007@mastodon.social',
			activity: 'created',
			time: '23m ago'
		});
	}

	return new Promise<CardProps[]>((resolve) => {
		setTimeout(() => {
			resolve(articles);
		}, 300);
	});
}
