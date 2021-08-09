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
	info: 'Info'
};

export default { locales, messages };
