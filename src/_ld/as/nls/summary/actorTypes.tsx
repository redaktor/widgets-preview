const locales = {
	de: () => import('../de/summary/actorTypes')
};
const messages = {
	"Application":"Describes a software application.",
	"Group":"Represents a formal or informal collective of Actors.",
	"Organization":"Represents an organization.",
	"Person":"Represents an individual person.",
	"Service":"Represents a service of any kind."
};

export default { locales, messages };
