/* https://github.com/discourse/discourse/blob/master/config/locales/client.de.yml
notification_schedule
time_shortcut
auto_update_input
*/
const locales = {
	de: () => import('./de/CalendarInput')
};
const messages = {
	date: 'Date',
	time: 'Time',
	to: 'To',
	tz: 'Timezone',
	invalidProps: 'Min date cannot be greater than max date',
	invalidDate: 'Invalid date format',
	tooEarly: 'Date must be at after Min date',
	tooLate: 'Date must be before Max date'
};

export default { locales, messages };
