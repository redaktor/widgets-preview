const locales = {
	de: () => import('../de/summary/objectTypes')
};
const messages = {
	"Relationship":"Describes a relationship between two individuals. The subject and object properties are used to identify the connected individuals. See 5.2 Representing Relationships Between Entities for additional information.",
	"Article":"Represents any kind of multi-paragraph written work.",
	"Document":"Represents a document of any kind.",
	"Audio":"Represents an audio document of any kind.",
	"Image":"An image document of any kind",
	"Video":"Represents a video document of any kind.",
	"Note":"Represents a short written work typically less than a single paragraph in length.",
	"Page":"Represents a Web Page.",
	"Event":"Represents any kind of event.",
	"Place":"Represents a logical or physical location. See 5.3 Representing Places for additional information.",
	"Mention":"A specialized Link that represents an @mention.",
	"Profile":"A Profile is a content object that describes another Object, typically used to describe Actor Type objects. The describes property is used to reference the object being described by the profile.",
	"Tombstone":"A Tombstone represents a content object that has been deleted. It can be used in Collections to signify that there used to be an object at this position, but it has been deleted."
};

export default { locales, messages };
