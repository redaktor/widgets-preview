const locales = {
	de: () => import('./de/Question')
};
const messages = {
	question: 'Question',
	answer: 'Answer',
	questionShort: 'Q',
	asked: 'asked',
	active: 'active',
	doVote: 'vote',
	doAnswer: 'answer',
	readAnswers: `{count, plural, offset:0
		=0 {no answers yet}
		=1 {no further answers yet}
		=2 {further answer}
		other {read further answers}}`,
	moreInfo: 'further information'
};

export default { locales, messages };
