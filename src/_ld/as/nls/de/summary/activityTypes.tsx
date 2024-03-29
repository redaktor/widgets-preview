export default {
	"Activity":"An Activity is a subtype of Object that describes some form of action that may happen, is currently happening, or has already happened. The Activity type itself serves as an abstract base type for all types of activities. It is important to note that the Activity type itself does not carry any specific semantics about the kind of action being taken.",
	"IntransitiveActivity":"Instances of IntransitiveActivity are a subtype of Activity representing intransitive actions. The object property is therefore inappropriate for these activities.",
	"Accept":"Indicates that the actor accepts the object. The target property can be used in certain circumstances to indicate the context into which the object has been accepted.",
	"TentativeAccept":"A specialization of Accept indicating that the acceptance is tentative.",
	"Add":"Indicates that the actor has added the object to the target. If the target property is not explicitly specified, the target would need to be determined implicitly by context. The origin can be used to identify the context from which the object originated.",
	"Arrive":"An IntransitiveActivity that indicates that the actor has arrived at the location. The origin can be used to identify the context from which the actor originated. The target typically has no defined meaning.",
	"Create":"Indicates that the actor has created the object.",
	"Delete":"Indicates that the actor has deleted the object. If specified, the origin indicates the context from which the object was deleted.",
	"Follow":"Indicates that the actor is \"following\" the object. Following is defined in the sense typically used within Social systems in which the actor is interested in any activity performed by or on the object. The target and origin typically have no defined meaning.",
	"Ignore":"Indicates that the actor is ignoring the object. The target and origin typically have no defined meaning.",
	"Join":"Indicates that the actor has joined the object. The target and origin typically have no defined meaning.",
	"Leave":"Indicates that the actor has left the object. The target and origin typically have no meaning.",
	"Like":"Indicates that the actor likes, recommends or endorses the object. The target and origin typically have no defined meaning.",
	"Offer":"Indicates that the actor is offering the object. If specified, the target indicates the entity to which the object is being offered.",
	"Invite":"A specialization of Offer in which the actor is extending an invitation for the object to the target.",
	"Reject":"Indicates that the actor is rejecting the object. The target and origin typically have no defined meaning.",
	"TentativeReject":"A specialization of Reject in which the rejection is considered tentative.",
	"Remove":"Indicates that the actor is removing the object. If specified, the origin indicates the context from which the object is being removed.",
	"Undo":"Indicates that the actor is undoing the object. In most cases, the object will be an Activity describing some previously performed action (for instance, a person may have previously \"liked\" an article but, for whatever reason, might choose to undo that like at some later point in time). The target and origin typically have no defined meaning.",
	"Update":"Indicates that the actor has updated the object. Note, however, that this vocabulary does not define a mechanism for describing the actual set of modifications made to object. The target and origin typically have no defined meaning.",
	"View":"Indicates that the actor has viewed the object.",
	"Listen":"Indicates that the actor has listened to the object.",
	"Read":"Indicates that the actor has read the object.",
	"Move":"Indicates that the actor has moved object from origin to target. If the origin or target are not specified, either can be determined by context.",
	"Travel":"Indicates that the actor is traveling to target from origin. Travel is an IntransitiveObject whose actor specifies the direct object. If the target or origin are not specified, either can be determined by context.",
	"Announce":"Indicates that the actor is calling the target's attention the object. The origin typically has no defined meaning.",
	"Block":"Indicates that the actor is blocking the object. Blocking is a stronger form of Ignore. The typical use is to support social systems that allow one user to block activities or content of other users. The target and origin typically have no defined meaning.",
	"Flag":"Indicates that the actor is \"flagging\" the object. Flagging is defined in the sense common to many social platforms as reporting content as being inappropriate for any number of reasons.",
	"Dislike":"Indicates that the actor dislikes the object.",
	"Question":"Represents a question being asked. Question objects are an extension of IntransitiveActivity. That is, the Question object is an Activity, but the direct object is the question itself and therefore it would not contain an object property. Either of the anyOf and oneOf properties MAY be used to express possible answers, but a Question object MUST NOT have both properties."
};
