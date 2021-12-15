/* https://github.com/discourse/discourse/blob/master/config/locales/client.de.yml
notification_schedule
time_shortcut
auto_update_input
*/
const locales = {
	de: () => import('./de/Event')
};
const messages = {
	calendar: 'calendar',
	locationmap: 'event location',
	event: 'Event',
	eventInLang: 'Event in',
	cancelled: 'Cancelled',
	postponed: 'Postponed',
	rescheduled: 'Rescheduled to',
	movedOnline: 'Only Online',
	onlineEvent: 'Virtual Event',
	offlineEvent: 'In-Person Event',
	mixedEvent: 'Hybrid Event (on-/offline)',
	onlineShort: 'online',
	offlineShort: 'offline',
	mixedShort: 'hybrid',
	updated: 'updated',
	tba: 'to be announced',
	previousStartDate: 'previous date was',
	moreInfo: 'further information'
};

export default { locales, messages };
