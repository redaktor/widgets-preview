/* https://jsfiddle.net/hyg9e7vz/ */
// TODO descriptions, "schema:domainIncludes"

import { as, security, asSupportedExtensions, wellKnownVocab, vocab } from '../';

const baseUrl = 'https://www.w3.org/TR/activitystreams-vocabulary/';
const asCompact: any = {
  activityTypes:[
    [21,2],[22,21],[23,2],[24,3],[25,2],[26,2],[27,2],[28,2],[29,2],[30,2],[31,2],
    [32,2],[33,32],[34,2],[35,34],[36,2],[37,2],[38,2],[39,2],[40,2],[41,2],[42,2],
    [43,3],[44,2],[45,28],[46,2],[47,2],[48,3]
  ],
  actorTypes:[
    [49,0],[50,0],[51,0],[52,0],[53,0]
  ],
  coreTypes:[
    [0,1,1],[1,0,0],[2,0],[3,2],[4,0],[5,4],[6,4],[7,5]
  ],
  objectTypes:[
    [8,0],[9,0],[10,0],[11,10],[12,10],[13,10],[14,0],[15,10],[16,0],[17,0],[18,1],[19,0],[20,0]
  ],
  properties:[
    [`${baseUrl}@id`,[0,1,2],[0,1],['xsd:anyURI']],[`${baseUrl}@type`,[0,1],[0,1],['xsd:anyURI']],
    ['actor',[0],[2],[0,1]],['attachment',[0,1],[0],[0,1]],['attributedTo',[0,1],[1,0],[1,0]],
    ['audience',[0,1],[0],[0,1]],['bcc',[0,1],[0],[0,1]],['bto',[0,1],[0],[0,1]],
    ['cc',[0,1],[0],[0,1]],['context',[0,1],[0],[0,1]],['current',[0,2],[4],[6,1]],
    ['first',[0,2],[4],[6,1]],['generator',[0,1],[0],[0,1]],['icon',[0,1],[0],[12,1]],
    ['image',[0,1],[0],[12,1]],['inReplyTo',[0,1],[0],[0,1]],['instrument',[0],[2],['Object | Link']],
    ['last',[0,2],[4],[6,1]],['location',[0,1],[0],['Object | Link']],['items',[0],[4],[0,1,0,1]],
    ['oneOf',[0],[48],[0,1]],['anyOf',[0],[48],[0,1]],['closed',[0],[48],[0,1,'xsd:datetime','xsd:boolean']],
    ['origin',[0],[2],[0,1]],['next',[0,2],[6],[6,1]],['object',[0],[2,8],[0,1]],['prev',[0,2],[6],[6,1]],
    ['preview',[0,1],[1,0],[1,0]],['result',[0],[2],[0,1]],['replies',[0,1,2],[0],[4]],['tag',[0,1],[0],[0,1]],
    ['target',[0],[2],[0,1]],['to',[0,1],[0],[0,1]],['url',[0,1],[0],['xsd:anyuri',1]],['accuracy',[0,2],[17],['xsd:float']],
    ['altitude',[0,1,2],[0],['xsd:float']],['content',[0,1],[0],['xsd:string','rdf:langstring']],
    ['name',[0,1],[0,1],['xsd:string','rdf:langstring']],['duration',[0,1,2],[0],['xsd:duration']],['height',[0,2],[1],['xsd:nonnegativeinteger']],
    ['href',[0,2],[1],['xsd:anyuri']],['hreflang',[0,2],[1],[]],['partOf',[0,2],[6],[1,4]],['latitude',[0,2],[17],['xsd:float']],
    ['longitude',[0,2],[17],['xsd:float']],['mediaType',[0,1,2],[1,0],[]],['endTime',[0,1,2],[0],['xsd:datetime']],
    ['published',[0,1,2],[0],['xsd:datetime']],['startTime',[0,1,2],[0],['xsd:datetime']],['radius',[0,2],[17],['xsd:float']],
    ['rel',[0],[1],[]],['startIndex',[0,2],[7],['xsd:nonnegativeinteger']],['summary',[0,1],[0],['xsd:string','rdf:langstring']],
    ['totalItems',[0,2],[4],['xsd:nonnegativeinteger']],
    ['units',[0,2],[17],[`${baseUrl}cm`,`${baseUrl}feet`,`${baseUrl}inches`,`${baseUrl}km`,`${baseUrl}m`,`${baseUrl}miles`,'xsd:anyuri']],
    ['updated',[0,1,2],[0],['xsd:datetime']],['width',[0,2],[1],['xsd:nonnegativeinteger']],
    ['subject',[0,2],[8],[1,0]],['relationship',[0],[8],[0]],['describes',[0,2],[19],[0]],
    ['formerType',[0],[20],[0]],['deleted',[0,2],[20],['xsd:datetime']]
  ]
}

let asCore: any = {};
const asClasses = [
  'Object','Link','Activity','IntransitiveActivity','Collection','OrderedCollection',
  'CollectionPage','OrderedCollectionPage','Relationship','Article','Document','Audio',
  'Image','Video','Note','Page','Event','Place','Mention','Profile','Tombstone',
  'Accept','TentativeAccept','Add','Arrive','Create','Delete','Follow','Ignore','Join','Leave',
  'Like','Offer','Invite','Reject','TentativeReject','Remove','Undo','Update','View','Listen',
  'Read','Move','Travel','Announce','Block','Flag','Dislike','Question',
  'Application','Group','Organization','Person','Service'
];
const asPropertyTypes = [ 'rdf:Property', 'owl:ObjectProperty', 'owl:FunctionalProperty' ];
const asLayers = ['core', 'security', 'extension'];

const ontologyAS = {
  '@context': [
    as,
    {
      '@version': 1.1,
      ...wellKnownVocab,
    }
  ],
  'id': 'https://www.w3.org/TR/activitystreams-vocabulary/',
  'type': 'owl:Ontology',
  'owl:imports': Object.keys(asCompact).map((key) => {
    const a: any[] = asCompact[key];
    return {
      '@index': key,
      'type': 'owl:Ontology',
      'owl:members': a.map((_a) => {
        if (key === 'properties') {
          const [name, types, domains, _ranges] = _a;
          const url = `https://www.w3.org/TR/activitystreams-vocabulary/#dfn-${name.toLowerCase()}`;
          const contextRanges: string[] = [];
          const ranges = _ranges.map((r: number|string) => {
            if (contextRanges[0] !== '@id') {
              contextRanges.push((typeof r === 'string') ? r : '@id');
            }
            if (typeof r === 'string') { return r }
            return {
              "type": "Link",
              "href": `https://www.w3.org/TR/activitystreams-vocabulary/#dfn-${asClasses[r].toLowerCase()}`,
              "name": asClasses[5]
            }
          });

          asCore[name] = {
            "@id": `as:${name}`,
            "@type": contextRanges.length === 1 ? contextRanges[0] : contextRanges
          }
          return {
            id: `as:${name}`,
            type: types.map((i: number) => asPropertyTypes[i]),
            name,
            'schema:workExample': [],
            'rdfs:comment': '',
            'rdfs:domain': {
              type: 'owl:Class',
              'owl:unionOf': domains.map((d: number) => {
                return {
                  type: 'Link',
                  href: `https://www.w3.org/TR/activitystreams-vocabulary/#dfn-${asClasses[d].toLowerCase()}`,
                  name: asClasses[d]
                }
              })
            },
            'rdfs:isDefinedBy': url,
            'rdfs:range': {
              type: 'owl:Class',
              'owl:unionOf': ranges
            },
            url
          }
        } else {
          const [nameId, subClassOfId, disjointWithId] = _a;
          const name = asClasses[nameId];
          const id = `as:${name}`
          asCore[name] = id;
          const subClassOf = asClasses[subClassOfId];
          const disjointWith = disjointWithId && asClasses[disjointWithId];
          return {
            id,
            type: 'owl:Class',
            name,
            'schema:workExample': [],
            'rdfs:comment': '',
            'rdfs:subClassOf': {
              type: 'Link',
              href: `https://www.w3.org/TR/activitystreams-vocabulary/#dfn-${subClassOf}`,
              name: subClassOf
            },
            'owl:disjointWith': !disjointWith ? [] : {
              type: 'Link',
              href: `https://www.w3.org/TR/activitystreams-vocabulary/#dfn-${disjointWith}`,
              name: disjointWith
            },
            url: `https://www.w3.org/TR/activitystreams-vocabulary/#dfn-${name.toLowerCase()}`
          }
        }
      })
    }
  })
};
export const defaultContext = [
	as,
	security,
	{
		'@version': 1.1,
		'id': '@id',
    'type': '@type',
		...vocab,
		...wellKnownVocab,
		...asCore,
		...asSupportedExtensions
	}
];

export default ontologyAS;
