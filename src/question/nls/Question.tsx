const locales = {
	de: () => import('./de/Question')
};
const messages = {
	questionShort: 'Q',
	answerShort: 'A',
	question: 'Question',
	poll: 'Poll',
	answer: 'Answer',
	comment: 'Comment',
	ofQuestioner: 'of the questioner',
	ofAccepted: 'of the accepted author',
	wasAsked: 'asked',
	wasActive: 'active',
	answered: 'answered',
	doVote: 'vote',
	doAnswer: 'answer',
	readAnswers: `{hasAccepted, select,
		yes {
			{count, plural, offset:0
				=0 {no further answers yet}
				=1 {further answer}
				other {read further answers}}}
		other {
			{count, plural, offset:0
				=0 {no answers yet}
				=1 {answer}
				other {read answers}}}
	}`,
	moreInfo: 'further information',
	duplicate: 'duplicate of',
	tentativeaccept: 'reasonable',
	accepted: 'accepted answer',
	close: `{tense, select,
	  past {The question closed {date}!}
		other {The question closes {date}!}
	}`
};

export default { locales, messages };
