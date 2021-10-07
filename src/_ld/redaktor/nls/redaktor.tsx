/* https://github.com/discourse/discourse/blob/master/config/locales/client.de.yml
notification_schedule
time_shortcut
auto_update_input
*/
const locales = {
	de: () => import('./de/redaktor')
};
const messages = {
	SpatialCoverage: 'Spatial Coverage of the content',
	ContentLocation: 'Location depicted or described in the content',
	LocationCreated: 'Location where it was created',
	location: 'Location'
};

export default { locales, messages };
