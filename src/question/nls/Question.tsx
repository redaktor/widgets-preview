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
	questionShort: 'Q',
	readAnswers: 'read all the answers',
	moreInfo: 'further information'
};

export default { locales, messages };
