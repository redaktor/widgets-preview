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
	duplicate: 'duplicate of',
	answers: `{count, plural, offset:0
		=1 {answer}
		other {answers}}`,
	comments: `{count, plural, offset:0
		=1 {comment}
		other {comments}}`,
};

export default { locales, messages };
