/* https://github.com/discourse/discourse/blob/master/config/locales/client.de.yml
notification_schedule
time_shortcut
auto_update_input
*/
const locales = {
	de: () => import('./de/redaktor')
};
const messages = {
	follow: 'Follow',
	unfollow: 'Unfollow',
	SpatialCoverage: 'Spatial Coverage of the content',
	ContentLocation: 'Location depicted or described in the content',
	LocationCreated: 'Location where it was created',
	location: 'Location',
	contentCreated: 'created',
	contentCreatedTitle: 'Date when the content was created',
	dateCreated: 'created/added',
	dateCreatedTitle: 'Date when the content was created or added to the feed',
	contentReferenceTime: 'particular moment',
	contentReferenceTimeTitle: 'Specific time that emphasise a particular moment within an Event',
	published: 'published',
	publishedTitle: 'Date when the content was published to the Fediverse via ActivityPub',
	updated: 'updated',
	updatedTitle: 'Date when the content was updated in the Fediverse via ActivityPub',
	expires: 'expires',
	expiresTitle: 'Date the content expires and is no longer useful or available',
	date: 'Date'
};

export default { locales, messages };
