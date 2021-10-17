const locales = {
	de: () => import('../de/summary/properties')
};
const messages = {
	"id":"Provides the globally unique identifier for an Object or Link.",
	"type":"Identifies the Object or Link type. Multiple values may be specified.",
	"actor":"Describes one or more entities that either performed or are expected to perform the activity. Any single activity can have multiple actors. The actor MAY be specified using an indirect Link.",
	"attachment":"Identifies a resource attached or related to an object that potentially requires special handling. The intent is to provide a model that is at least semantically similar to attachments in email.",
	"attributedTo":"Identifies one or more entities to which this object is attributed. The attributed entities might not be Actors. For instance, an object might be attributed to the completion of another activity.",
	"audience":"Identifies one or more entities that represent the total population of entities for which the object can considered to be relevant.",
	"bcc":"Identifies one or more Objects that are part of the private secondary audience of this Object.",
	"bto":"Identifies an Object that is part of the private primary audience of this Object.",
	"cc":"Identifies an Object that is part of the public secondary audience of this Object.",
	"context":"Identifies the context within which the object exists or an activity was performed. The notion of \"context\" used is intentionally vague. The intended function is to serve as a means of grouping objects and activities that share a common originating context or purpose. An example could be all activities relating to a common project or event.",
	"current":"In a paged Collection, indicates the page that contains the most recently updated member items.",
	"first":"In a paged Collection, indicates the furthest preceeding page of items in the collection.",
	"generator":"Identifies the entity (e.g. an application) that generated the object.",
	"icon":"Indicates an entity that describes an icon for this object. The image should have an aspect ratio of one (horizontal) to one (vertical) and should be suitable for presentation at a small size.",
	"image":"Indicates an entity that describes an image for this object. Unlike the icon property, there are no aspect ratio or display size limitations assumed.",
	"inReplyTo":"Indicates one or more entities for which this object is considered a response.",
	"instrument":"Identifies one or more objects used (or to be used) in the completion of an Activity.",
	"last":"In a paged Collection, indicates the furthest proceeding page of the collection.",
	"location":"Indicates one or more physical or logical locations associated with the object.",
	"items":"Identifies the items contained in a collection. The items might be ordered or unordered.",
	"oneOf":"Identifies an exclusive option for a Question. Use of oneOf implies that the Question can have only a single answer. To indicate that a Question can have multiple answers, use anyOf.",
	"anyOf":"Identifies an inclusive option for a Question. Use of anyOf implies that the Question can have multiple answers. To indicate that a Question can have only one answer, use oneOf.",
	"closed":"Indicates that a question has been closed, and answers are no longer accepted.",
	"origin":"Describes an indirect object of the activity from which the activity is directed. The precise meaning of the origin is the object of the English preposition \"from\". For instance, in the activity \"John moved an item to List B from List A\", the origin of the activity is \"List A\".",
	"next":"In a paged Collection, indicates the next page of items.",
	"object":"When used within an Activity, describes the direct object of the activity. For instance, in the activity \"John added a movie to his wishlist\", the object of the activity is the movie added. When used within a Relationship describes the entity to which the subject is related.",
	"prev":"In a paged Collection, identifies the previous page of items.",
	"preview":"Identifies an entity that provides a preview of this object.",
	"result":"Describes the result of the activity. For instance, if a particular action results in the creation of a new resource, the result property can be used to describe that new resource.",
	"replies":"Identifies a Collection containing objects considered to be responses to this object.",
	"tag":"One or more \"tags\" that have been associated with an objects. A tag can be any kind of Object. The key difference between attachment and tag is that the former implies association by inclusion, while the latter implies associated by reference.",
	"target":"Describes the indirect object, or target, of the activity. The precise meaning of the target is largely dependent on the type of action being described but will often be the object of the English preposition \"to\". For instance, in the activity \"John added a movie to his wishlist\", the target of the activity is John's wishlist. An activity can have more than one target.",
	"to":"Identifies an entity considered to be part of the public primary audience of an Object",
	"url":"Identifies one or more links to representations of the object",
	"accuracy":"Indicates the accuracy of position coordinates on a Place objects. Expressed in properties of percentage. e.g. \"94.0\" means \"94.0% accurate\".",
	"altitude":"Indicates the altitude of a place. The measurement units is indicated using the units property. If units is not specified, the default is assumed to be \"m\" indicating meters.",
	"content":"The content or textual representation of the Object encoded as a JSON string. By default, the value of content is HTML. The mediaType property can be used in the object to indicate a different content type. The content MAY be expressed using multiple language-tagged values.",
	"name":"A simple, human-readable, plain-text name for the object. HTML markup MUST NOT be included. The name MAY be expressed using multiple language-tagged values.",
	"duration":"When the object describes a time-bound resource, such as an audio or video, a meeting, etc, the duration property indicates the object's approximate duration. The value MUST be expressed as an xsd:duration as defined by [ xmlschema11-2], section 3.3.6 (e.g. a period of 5 seconds is represented as \"PT5S\").",
	"height":"On a Link, specifies a hint as to the rendering height in device-independent pixels of the linked resource.",
	"href":"The target resource pointed to by a Link.",
	"hreflang":"Hints as to the language used by the target resource. Value MUST be a [BCP47] Language-Tag.",
	"partOf":"Identifies the Collection to which a CollectionPage objects items belong.",
	"latitude":"The latitude of a place",
	"longitude":"The longitude of a place",
	"mediaType":"When used on a Link, identifies the MIME media type of the referenced resource. When used on an Object, identifies the MIME media type of the value of the content property. If not specified, the content property is assumed to contain text/html content.",
	"endTime":"The date and time describing the actual or expected ending time of the object. When used with an Activity object, for instance, the endTime property specifies the moment the activity concluded or is expected to conclude.",
	"published":"The date and time at which the object was published",
	"startTime":"The date and time describing the actual or expected starting time of the object. When used with an Activity object, for instance, the startTime property specifies the moment the activity began or is scheduled to begin.",
	"radius":"The radius from the given latitude and longitude for a Place. The units is expressed by the units property. If units is not specified, the default is assumed to be \"m\" indicating \"meters\".",
	"rel":"A link relation associated with a Link. The value MUST conform to both the [HTML5] and [RFC5988] \"link relation\" definitions. In the [HTML5], any string not containing the \"space\" U+0020, \"tab\" (U+0009), \"LF\" (U+000A), \"FF\" (U+000C), \"CR\" (U+000D) or \",\" (U+002C) characters can be used as a valid link relation.",
	"startIndex":"A non-negative integer value identifying the relative position within the logical view of a strictly ordered collection.",
	"summary":"A natural language summarization of the object encoded as HTML. Multiple language tagged summaries MAY be provided.",
	"totalItems":"A non-negative integer specifying the total number of objects contained by the logical view of the collection. This number might not reflect the actual number of items serialized within the Collection object instance.",
	"units":"Specifies the measurement units for the radius and altitude properties on a Place object. If not specified, the default is assumed to be \"m\" for \"meters\".",
	"updated":"The date and time at which the object was updated",
	"width":"On a Link, specifies a hint as to the rendering width in device-independent pixels of the linked resource.",
	"subject":"On a Relationship object, the subject property identifies one of the connected individuals. For instance, for a Relationship object describing \"John is related to Sally\", subject would refer to John.",
	"relationship":"On a Relationship object, the relationship property identifies the kind of relationship that exists between subject and object.",
	"describes":"On a Profile object, the describes property identifies the object described by the Profile.",
	"formerType":"On a Tombstone object, the formerType property identifies the type of the object that was deleted.",
	"deleted":"On a Tombstone object, the deleted property is a timestamp for when the object was deleted."
};

export default { locales, messages };
