/* https://github.com/discourse/discourse/blob/master/config/locales/client.de.yml
notification_schedule
time_shortcut
auto_update_input
*/
const locales = {
	de: () => import('./de/Map')
};
const messages = {
	zoomIn: 'Zoom in',
	zoomRadius: 'Zoom to radius / extent',
	search: 'Search',
	copyLatLng: 'Copy coordinates',
	latLngUnknown: 'Coordinates are unknown.',
	open: 'Open current ActivityPub Place',
	info: 'Info',
	type: 'Type',
	address: 'address',
	notFound: 'No address found.'
};

export default { locales, messages };
