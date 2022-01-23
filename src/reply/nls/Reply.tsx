const locales = {
	de: () => import('./de/Reply')
};
const messages = {
	answered: 'answered',
	answer: 'Answer',
	comment: 'Comment',
	ofQuestioner: 'of the questioner',
	ofAccepted: 'of the accepted author',
	accepted: 'accepted answer',
	duplicate: 'duplicate of'
};

export default { locales, messages };
