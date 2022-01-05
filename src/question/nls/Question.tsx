/* https://github.com/discourse/discourse/blob/master/config/locales/client.de.yml
notification_schedule
time_shortcut
auto_update_input
*/
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
		=1 {read answer}
		other {read answers}}`,
	moreInfo: 'further information'
};

export default { locales, messages };
