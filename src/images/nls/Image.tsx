/* https://github.com/discourse/discourse/blob/master/config/locales/client.de.yml
notification_schedule
time_shortcut
auto_update_input
*/
const locales = {
	de: () => import('./de/Image')
};
const messages = {
	enlarge: 'Enlarge',
	info: 'Info',
	next: 'Next image',
	prev: 'Previous image',
	home: 'First Image',
	open: 'Open',
	close: 'Close',
	overview: 'overview',
	calendar: 'calendar',
	locationmap: 'locations on a map'
};

export default { locales, messages };
