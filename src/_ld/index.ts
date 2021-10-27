export const as = 'https://www.w3.org/ns/activitystreams';
export const security = 'https://w3id.org/security/v1';
export const vocab = { '@vocab': as };
export const wellKnownVocab = {
	as,
	bibo: 'http://purl.org/ontology/bibo/',
	dc: 'http://purl.org/dc/elements/1.1/',
	dcat: 'http://www.w3.org/ns/dcat#',
	dct: 'http://purl.org/dc/terms/',
	dcterms: 'http://purl.org/dc/terms/',
	dctype: 'http://purl.org/dc/dcmitype/',
	eli: 'http://data.europa.eu/eli/ontology#',
	foaf: 'http://xmlns.com/foaf/0.1/',
	ldp: 'http://www.w3.org/ns/ldp#',
	org: 'http://www.w3.org/ns/org#',
	owl: 'http://www.w3.org/2002/07/owl#',
	rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
	rdfa: 'http://www.w3.org/ns/rdfa#',
	rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
	redaktor: 'https://purl.org/redaktor/namespace',
	schema: 'http://schema.org/',
	skos: 'http://www.w3.org/2004/02/skos/core#',
	snomed: 'http://purl.bioontology.org/ontology/SNOMEDCT/',
	vcard: 'http://www.w3.org/2006/vcard/ns#',
	void: 'http://rdfs.org/ns/void#',
	xml: 'http://www.w3.org/XML/1998/namespace',
	xsd: 'http://www.w3.org/2001/XMLSchema#'
};
export const wellKnownUnits = {
  cm: 1e-2, feet: 1, inches: (1 / 12), km: 1e3, m: 1, miles: 5280
}
export const asSupportedExtensions = {
	manuallyApprovesFollowers: 'as:manuallyApprovesFollowers',
	sensitive: 'as:sensitive',
	movedTo: 'as:movedTo',
	focalPoint: {
		'@container': '@list',
		'@id': 'toot:focalPoint'
	},
	toot: 'http://joinmastodon.org/ns#',
	Emoji: 'toot:Emoji',
	featured: 'toot:featured'
};
export function ldPartial<P = any>(o: {[key: string]: P}, vocabulary: string, toArrays = false) {
  const res: {[key: string]: (P|P[])} = {};
  for (let k in o) {
    const [prefix, key] = k.split(':');
    if (prefix === vocabulary) {
      res[key] = (!!toArrays && !Array.isArray(o[k])) ? [o[k]] : o[k];
    }
  }
  return res
}