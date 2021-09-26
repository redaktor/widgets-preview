import { AsTypes, AsActorTypes, AsActivityTypes, AsObjectTypes, AsLinkTypes } from './interfaces';
function apObj(prev: any, cur: any) {
	prev[cur.name] = {
		...cur,
		id: `https://www.w3.org/ns/activitystreams#${cur.name}`,
		url: `https://www.w3.org/TR/activitystreams-vocabulary/#dfn-${cur.name.toLowerCase()}`
	};
	return prev
}
const actors: {name: AsActorTypes; summary: string;}[] = [
	{
		name: 'Application',
		summary: `Describes a software application.`
	},{
		name: 'Group',
		summary: `Represents a formal or informal collective of Actors.`
	},{
		name: 'Organization',
		summary: `Represents an organization.`
	},{
		name: 'Person',
		summary: `Represents an individual person.`
	},{
		name: 'Service',
		summary: `Represents a service of any kind.`
	}
];

const activities: {name: AsActivityTypes; summary: string;}[] = [
	{name: 'Activity', summary: 'Generic Activity'},
	{
		name: 'Accept',
		summary: `Indicates that the actor accepts the object.
		The target property can be used in certain circumstances to indicate
		the context into which the object has been accepted.`
	},{
    name: 'Add',
    summary: `Indicates that the actor has added the object to the target.
		If the target property is not explicitly specified, the target would need to be
		determined implicitly by context. The origin can be used to identify the context
		from which the object originated.`
	},{
    name: 'Announce',
    summary: `(aka 'share') Indicates that the actor is calling the target's attention
		the object. The origin typically has no defined meaning.`
	},{
    name: 'Arrive',
    summary: `An IntransitiveActivity that indicates that the actor has arrived at the location.
		The origin can be used to identify the context from which the actor originated.
		The target typically has no defined meaning.`
	},{
    name: 'Block',
    summary: `Indicates that the actor is blocking the object.
		Blocking is a stronger form of Ignore. The typical use is to support social systems
		that allow one user to block activities or content of other users.
		The target and origin typically have no defined meaning.`
	},{
    name: 'Create',
    summary: `Indicates that the actor has created the object.`
	},{
    name: 'Delete',
    summary: `Indicates that the actor has deleted the object.
		If specified, the origin indicates the context from which the object was deleted.`
	},{
    name: 'Dislike',
    summary: `Indicates that the actor dislikes the object.`
	},{
    name: 'Flag',
    summary: `Indicates that the actor is "flagging" the object.
		Flagging is defined in the sense common to many social platforms as
		reporting content as being inappropriate for any number of reasons.`
	},{
    name: 'Follow',
    summary: `Indicates that the actor is "following" the object.
		Following is defined in the sense typically used within Social systems
		in which the actor is interested in any activity performed by or on the object.
		The target and origin typically have no defined meaning.`
	},{
    name: 'Ignore',
    summary: `Indicates that the actor is ignoring the object.
		The target and origin typically have no defined meaning.`
	},{
    name: 'Invite',
    summary: `A specialization of Offer in which the actor is extending an
		invitation for the object to the target.`
	},{
    name: 'Join',
    summary: `Indicates that the actor has joined the object.
		The target and origin typically have no defined meaning.`
	},{
    name: 'Leave',
    summary: `Indicates that the actor has left the object.
		The target and origin typically have no meaning.`
	},{
    name: 'Like',
    summary: `Indicates that the actor likes, recommends or endorses the object.
		The target and origin typically have no defined meaning.`
	},{
    name: 'Listen',
    summary: `Indicates that the actor has listened to the object.`
	},{
    name: 'Move',
    summary: `Indicates that the actor has moved object from origin to target.
		If the origin or target are not specified, either can be determined by context.`
	},{
    name: 'Offer',
    summary: `Indicates that the actor is offering the object.
		If specified, the target indicates the entity to which the object is being offered.`
	},{
    name: 'Question',
    summary: `Represents a question being asked.
		Question objects are an extension of IntransitiveActivity.
		That is, the Question object is an Activity, but the direct object is the question itself
		and therefore it would not contain an object property.
		Either of the anyOf and oneOf properties may be used to express possible answers,
		but a Question object must not have both properties.`
	},{
    name: 'Reject',
    summary: `Indicates that the actor is rejecting the object.
		The target and origin typically have no defined meaning.`
	},{
    name: 'Read',
    summary: `Indicates that the actor has read the object.`
	},{
    name: 'Remove',
    summary: `Indicates that the actor is removing the object.
		If specified, the origin indicates the context from which the object is being removed.`
	},{
    name: 'TentativeReject',
    summary: `A specialization of Reject in which the rejection is considered tentative.`
	},{
    name: 'TentativeAccept',
    summary: `A specialization of Accept indicating that the acceptance is tentative.`
	},{
    name: 'Travel',
    summary: `Indicates that the actor is traveling to target from origin.
		Travel is an IntransitiveObject whose actor specifies the direct object.
		If the target or origin are not specified, either can be determined by context.`
	},{
    name: 'Undo',
    summary: `Indicates that the actor is undoing the object.
		In most cases, the object will be an Activity describing some previously performed action
		(for instance, a person may have previously "liked" an article but, for whatever reason,
		might choose to undo that like at some later point in time).
		The target and origin typically have no defined meaning.`
	},{
    name: 'Update',
    summary: `Indicates that the actor has updated the object.
		Note, however, that this vocabulary does not define a mechanism for describing
		the actual set of modifications made to object.
		The target and origin typically have no defined meaning.`
	},{
    name: 'View',
    summary: `Indicates that the actor has viewed the object.`
	}
];

const objects: {name: AsObjectTypes; summary: string;}[] = [
	{name: 'Object', summary: 'Generic Object'},
	{
    name: 'Article',
    summary: `Represents any kind of multi-paragraph written work.`
	},{
    name: 'Audio',
    summary: `Represents an audio document of any kind.`
	},{
    name: 'Document',
    summary: `Represents a document of any kind.`
	},{
    name: 'Event',
    summary: `Represents any kind of event.`
	},{
    name: 'Image',
    summary: `Represents an image document of any kind.`
	},{
    name: 'Note',
    summary: `Represents a short written work typically less than a single paragraph in length.`
	},{
    name: 'Page',
    summary: `Represents a Web Page.`
	},{
    name: 'Place',
    summary: `Represents a logical or physical location.`
	},{
    name: 'Video',
    summary: `Represents a video document of any kind.`
	},

	{
    name: 'Profile',
    summary: `A Profile is a content object that describes another Object,
		typically used to describe Actor Type objects.
		The describes property is used to reference the object being described by the profile.`
	},{
    name: 'Relationship',
    summary: `Describes a relationship between two individuals.
		The subject and object properties are used to identify the connected individuals.`
	},{
    name: 'Tombstone',
    summary: `A Tombstone represents a content object that has been deleted.
		It can be used in Collections to signify that there used to be an object at this position,
		but it has been deleted.`
	},

	{
    name: 'Collection',
    summary: `A Collection is a subtype of Object that represents ordered
		or unordered sets of Object or Link instances.`
	},{
    name: 'OrderedCollection',
    summary: `A subtype of Collection in which members of the logical collection
		are assumed to always be strictly ordered.`
	},{
    name: 'CollectionPage',
    summary: `Used to represent distinct subsets of items from a Collection.
		Refer to the Activity Streams 2.0 Core for a complete description.`
	},{
    name: 'OrderedCollectionPage',
    summary: `Used to represent ordered subsets of items from an OrderedCollection.
		Refer to the Activity Streams 2.0 Core for a complete description.`
	}
];
const links: {name: AsLinkTypes; summary: string;}[] = [
	{
    name: 'Link',
    summary: `Represents a link.`
	},{
    name: 'Mention',
    summary: `A specialized Link that represents an @mention.`
	}
];

interface AsTypeDescription {id: string; url: string; summary: string; name: AsTypes}
type _Actors = { [K in AsActorTypes]: AsTypeDescription; }
type _Activities = { [K in AsActivityTypes]: AsTypeDescription; }
type _Objects = { [K in AsObjectTypes]: AsTypeDescription; }
type _Links = { [K in AsLinkTypes]: AsTypeDescription; }
export const AsActors: _Actors = actors.reduce(apObj, {});
export const AsActivities: _Activities = activities.reduce(apObj, {});
export const AsObjects: _Objects = objects.reduce(apObj, {});
export const AsLinks: _Links = links.reduce(apObj, {});
export const activityPubTypes = [...actors, ...activities, ...objects, ...links].map((o) => o.name);
export const activityPubTypesRegex = new RegExp(`^${activityPubTypes.join('|')}$`);
