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
	open: 'Open current ActivityPub Place',
	info: 'Info',
	type: 'Type',
	address: 'address',
	notFound: 'No address found.',
	latLngUnknown: 'Coordinates are unknown.',
	spatialCoverage: 'Spatial Coverage of the content',
	contentLocation: 'Location depicted or described in the content',
	locationCreated: 'Location where it was created',
	location: 'Location'
};

export default { locales, messages };
