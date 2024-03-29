const locales = {
	de: () => import('./de/Calendar'),
	zh: () => import('./zh-CN/Calendar'),
	'zh-TW': () => import('./zh-TW/Calendar')
};

const messages = {
	chooseMonth: 'Choose Month',
	chooseYear: 'Choose Year',
	previousMonth: 'Previous Month',
	nextMonth: 'Next Month',
	previousYears: 'Earlier years',
	nextYears: 'Later years',
	startTime: 'The actual or expected starting time of the {type}',
	endTime: 'The actual or expected ending time of the {type}',
	published: 'The date and time at which the {type} was published',
	updated: 'The date and time at which the {type} was lastly updated',
	duration: `The {type}'s approximate duration`,
	contentReferenceTime: 'The specific time described by a creative work',
	dateCreated: 'The date on which the {type} was created',
	expires: 'Date the content expires and is no longer useful or available'
};

export default { locales, messages };
