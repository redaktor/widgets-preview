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
	home: 'First Image'
};

export default { locales, messages };
