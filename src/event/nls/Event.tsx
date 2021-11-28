/* https://github.com/discourse/discourse/blob/master/config/locales/client.de.yml
notification_schedule
time_shortcut
auto_update_input
*/
const locales = {
	de: () => import('./de/Event')
};
const messages = {
	open: 'Open',
	close: 'Close',
	calendar: 'calendar',
	locationmap: 'event location'
};

export default { locales, messages };
