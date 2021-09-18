
const locales = {
	de: () => import('./de/ActivityPub')
};
const types = [
	'Application','Group','Organization','Person','Service','Activity','Accept','Add',
	'Announce','Arrive','Block','Create','Delete','Dislike','Flag','Follow','Ignore',
	'Invite','Join','Leave','Like','Listen','Move','Offer','Question','Reject','Read',
	'Remove','TentativeReject','TentativeAccept','Travel','Undo','Update','View',
	'Object','Article','Audio','Document','Event','Image','Note','Page','Place','Video',
	'Profile','Relationship','Tombstone','Collection','OrderedCollection','CollectionPage',
	'OrderedCollectionPage','Link','Mention',
	'location', 'attachment', 'actor', 'attributedTo', 'audience', 'current', 'first', 'image',
	'instrument', 'last', 'items', 'next', 'prev', 'preview', 'result', 'replies',  'accuracy',
	'duration', 'height', 'endTime', 'published', 'startTime', 'updated', 'width', 'subject',
	'relationship', 'describes'
]
const messages = types.reduce((o: any, s) => {
	const isUpper = /^[A-Z]/.test(s);
	o[s] = s.replace( /([A-Z])/g, (m, p1) => ` ${isUpper ? p1 : p1.toLowerCase()}`).trim();
	return o
}, {
	_of: 'of',
	_in: 'in'
});

export default { locales, messages };
