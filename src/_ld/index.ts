export const as = 'https://www.w3.org/ns/activitystreams';
export const security = 'https://w3id.org/security/v1';
export const vocab = { '@vocab': as };
export const wellKnownVocab = {
	as,
	bibo: 'http://purl.org/ontology/bibo/',
	dc: 'http://purl.org/dc/elements/1.1/',
	dcat: 'http://www.w3.org/ns/dcat#',
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
export function ldPartial<P = any>(o: {[key: string]: P}, vocabulary: string = 'schema', toArrays = false) {
  const res: {[key: string]: (P|P[])} = {};
  for (let k in o) {
    const [prefix, key] = k.split(':');
    if (prefix === vocabulary) {
      res[key] = (!!toArrays && !Array.isArray(o[k])) ? [o[k]] : o[k];
    }
  }
  return res
}
type LocO = string | {[key: string]: string};
export function schemaLanguages(a: LocO | LocO[], localizeLocale: string): LocO[] {
	if (!Array.isArray(a)) { a = [a] }
	return a.map((_o) => {
		if (typeof _o === 'string') { return _o }
		let {name, alternateName} = ldPartial(_o);
		name = Array.isArray(name) ? name[0] : name;
		alternateName = Array.isArray(alternateName) ? alternateName[0] : alternateName;
		if (localizeLocale && !!Intl && !!(Intl as any).DisplayNames) {
			console.log({name, alternateName});
			const commonBCP47 = /^[A-Za-z]{2,4}([_-][A-Za-z]{4})?([_-]([A-Za-z]{2}|[0-9]{3}))?$/;
			const langCode = commonBCP47.test(alternateName) ? alternateName :
				(commonBCP47.test(name) ? name : '');
			if ((!!langCode.length )) {
				const localizedLanguage = new (Intl as any).DisplayNames(langCode, { type: 'language' });
				const localized = localizedLanguage.of(localizeLocale)
				if (!!localized && !!localized.length) { return localized }
			}
		}
		return name || alternateName || ''
	}).filter((v) => !!v);
}

export interface SplitPrefix {
	key: string;
	url: string;
	prefix: string;
	hasUrl: boolean;
}
export function splitPrefix(key: string): SplitPrefix {
	for (let url of [
		'http://www.w3.org/1999/02/22-rdf-syntax-ns#/',
		'http://www.w3.org/2000/01/rdf-schema#'
	]) {
		if (key.trim().indexOf(url) === 0) {
			key = `@${text.replace(url,'')}`;
			return { key, url, prefix: 'rdf', hasUrl: true }
		}
	}
	for (let prefix in wellKnownVocab) {
		const url = wellKnownVocab[(prefix as keyof typeof wellKnownVocab)];
		if (key.trim().indexOf(url) === 0) {
			key = key.replace(url, '');
			return { key, url, prefix, hasUrl: true }
		} else if (key.trim().indexOf(`${prefix}:`) === 0) {
			key = key.replace(`${prefix}:`,'');
			return { key, url, prefix, hasUrl: false }
		}
	}
	return { key, url: '', prefix: '', hasUrl: false }
}
