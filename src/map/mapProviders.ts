/**
 * Definition of map providers as ActivityPub Objects
 * see http://leafletjs.com/reference.html#tilelayer for options in the options map.
 */

// TODO especially newer Satellite : https://www.maptiler.com/cloud/
// TODO https://mapbox.com

/* Types TODO
	https://w3id.org/arco/ontology/location/ExtraurbanContext
	https://w3id.org/arco/ontology/location/SuburbanContext
	https://w3id.org/arco/ontology/location/TerritorialContext
	https://w3id.org/arco/ontology/location/UnderwaterContext
	https://w3id.org/arco/ontology/location/UrbanContext
*/
const B = {
	CARTO: 'https://{s}.basemaps.cartocdn.com/rastertiles/',
	ESRI: 'https://server.arcgisonline.com/ArcGIS/rest/services/',
	ESRI_S_PREFIX: 'https://www.arcgis.com/sharing/rest/content/items/',
	ESRI_S_SUFFIX: '/resources/styles/root.json'
};
const C = {
	canvas: { en: 'canvas', de: 'Leinwand' },
	reference: { en: 'reference', de: 'Referenz' },
	labels: { en: 'labels', de: 'Beschriftung' },
	labelsLocale: { en: 'local labels', de: 'Lokale Beschriftung' },
	hybridLabels: { en: 'hybrid labels', de: 'Hybride Beschriftung' },
	hybridLabelsLocale: { en: 'hybrid/local labels', de: 'Hybride/Lokale Beschriftung' },
	default: { en: 'default', de: 'Standard' },
	strong: { en: 'strong labels', de: 'Fette Beschriftung' },
	no: { en: 'no labels', de: 'Keine Beschriftung' },
	only: { en: 'only labels', de: 'Nur Beschriftung' },
	CC: '([CC-BY-SA](<a href="https://creativecommons.org/licenses/by-sa/3.0/))',
	C_OSM: '(c) [OSM](https://www.openstreetmap.org/copyright)',
	PNG: '/{z}/{x}/{y}.png',
	RET: '/{z}/{x}/{y}{r}.png',
	SUMMARY: {
		contributors: { summaryMap: { en: 'contributors', de: 'Mitwirkende' } },
		layer: { summaryMap: { en: 'Map layer by', de: 'Kartenebene von' } },
		data: { summaryMap: { en: 'Map data', de: 'Kartendaten' } },
		style: { summaryMap: { en: 'Map style', de: 'Kartenstil' } },
		source: { summaryMap: { en: '– Source:', de: '– Quelle:' } },
		imgFrom: { summaryMap: { en: 'Imagery from', de: 'Bilder von' } }
	}
};

export const TAG = {
	BASEMAP: {
		id: 'https://w3id.org/arco/ontology/location/BaseMap',
		name: 'BaseMap',
		summaryMap: { en: 'a basemap', de: 'eine Grundkarte' },
		icon: {}
	},
	REFERENCELAYER: {
		id: 'https://w3id.org/arco/ontology/location/CadastralFolio',
		name: 'CadastralFolio',
		summaryMap: {
			en: 'a tile layer, reference layer or overlay',
			de: 'Tile Layer, Referenz Ebene oder Overlay'
		},
		icon: {}
	},
	LABELS: {
		name: 'MapLabels',
		summaryMap: { en: 'map labels', de: 'Beschriftung für Karten' },
		icon: {}
	},

	HUM: {
		name: 'Humanitarian',
		summaryMap: {
			en: `A humanitarian map which provides data to manage disaster management,
reduces risks, or contribute to achievement of the Sustainable Development Goals.`,
			de: `Eine humanitäre Karte, die Daten bereitstellt für Krisenmanagement oder
um Risiken zu reduzieren oder nachhaltige Ziele zu erreichen.`
		},
		icon: {}
	},
	GEOPOL: {
		name: 'Geopolitical',
		summaryMap: {
			en: `a geopolitical map to study of the effects of Earth's geography on politics (human, physical, boundaries etc.)`,
			de:
				'Eine geopolitische Karte um geographische Effekte zur Politik zu studieren (Human, physikalisch, Grenzen etc.)'
		},
		icon: {}
	},
	TOPO: {
		name: 'TopographyMap',
		summaryMap: {
			en: 'A topographic map shows differences in elevation and landscape by contour lines.',
			de:
				'Topographische Karte, die unterschiedliche Höhe und Landschaft mit Konturlinien zeigt.'
		},
		icon: {}
	},
	TERRAIN: {
		name: 'TerrainMap',
		summaryMap: {
			en:
				'A phyisical map which shows different features of a location usually by color characteristics.',
			de:
				'Eine physikalische Karte, die unterschiedliche Geo-Features normalerweise farbig kennzeichnet.'
		},
		icon: {}
	},
	SAT: {
		name: 'ImageryMap',
		summaryMap: {
			en: 'An imagery map, e.g. illustrated by satellite images.',
			de: 'Eine bebilderte Karte, z. B. durch Satellitenbilder.'
		},
		icon: {}
	},
	CLIMATE: {
		summaryMap: {
			en: 'A climatic Map shows info about the climate of different areas typically colored.',
			de: 'Eine Klimakarte, die Unterschiede der Klimas in verschiedenen Gebieten zeigt.'
		},
		icon: {}
	},
	WEATHER: {
		summaryMap: {
			en:
				'A weather map shows info about the weather of different areas, e.g. by pictograms.',
			de:
				'Eine Wetterkarte, die Unterschiede der Wetters in verschiedenen Gebieten zeigt, z. b. Piktogramme.'
		},
		icon: {}
	},
	ECONOMIC: {
		summaryMap: {
			en: `Economic or resource maps show the different resources present in different areas.
			They show the kind of crops that are grown and the minerals found in places.`,
			de: 'Rohstoff- oder ökonomische Karten zeigen verschiedene Rohstoffe.'
		},
		icon: {}
	},
	TRANSIT: {
		id: 'https://schema.org/TransitMap',
		name: 'TransitMap',
		summaryMap: { en: 'public_transport', de: 'Öff_Verkehrsmittel' },
		icon: {}
	},
	CAR: {
		name: 'StreetMap',
		summaryMap: { en: 'car', de: 'Auto' },
		icon: {}
	},
	PARKING: {
		id: 'https://schema.org/ParkingMap',
		name: 'ParkingMap',
		summaryMap: { en: 'parking spaces', de: 'Parkplätze' },
		icon: {}
	},
	BIKE: {
		name: 'BikeMap',
		summaryMap: {
			en: 'Shows bikeways and paths for similar vehicles.',
			de: 'Zeigt Fahrradwege und Pfade für ähnliches Gefährt.'
		},
		icon: {}
	},
	WALK: {
		name: 'HikeMap',
		summaryMap: {
			en: 'Shows hikeways and paths to walk.',
			de: 'Zeigt Spazier- und Wanderwege und Pfade zum Laufen.'
		},
		icon: {}
	},
	BOAT: {
		name: 'NauticalMap',
		summaryMap: {
			en:
				'Shows marine bathymetry, features ocean or inland waters for boats, ships, water vehicles.',
			de:
				'Zeigt Marine Bathymetrie, Ozeane, Binnengewässer für Boote, Schiffe, Wasserfahrzeuge.'
		},
		icon: {}
	},
	AIR: {
		name: 'AeronauticalMap',
		summaryMap: {
			en: 'Shows air routes, airports, approachs etc.',
			de: 'Zeigt Flugrouten, Flughäfen, Landebahnen etc.'
		},
		icon: {}
	},
	SEATING: {
		id: 'https://schema.org/SeatingMap',
		name: 'SeatingMap',
		summaryMap: { en: 'A Seating Map', de: 'Sitzplan oder Tischkarte' },
		icon: {}
	},
	VENUE: {
		id: 'https://schema.org/VenueMap',
		name: 'VenueMap',
		summaryMap: { en: 'A Venue Map', de: 'Ein Veranstaltungsplan' },
		icon: {}
	},
	FLOOR: {
		id: 'https://schema.org/FloorPlan',
		name: 'FloorPlan',
		summaryMap: { en: 'A Floor Plan', de: 'Ein Gebäudeplan' },
		icon: {}
	},
	HISTORY: {
		name: 'HistoricalOrHistoristic',
		summaryMap: {
			en: 'Historical or historistic looking maps',
			de: 'Historische Karten oder historistische Kartendarstellungen'
		},
		icon: {}
	},
	ART: {
		name: 'DesignAndArt',
		summaryMap: {
			en: 'Thematical maps, uniquely illustrated, Design and Art',
			de: 'Thematische Karten, einzigartig gestaltet, Design und Kunst'
		},
		icon: {}
	},
	LIGHT: {
		name: 'LightMap',
		summaryMap: { en: 'Light maps', de: 'Helle Karten - hell' },
		icon: {}
	},
	DARK: {
		name: 'DarkMap',
		summaryMap: { en: 'Dark maps', de: 'Dunkle Karten - dunkel' },
		icon: {}
	},
	CONTRAST: {
		name: 'ContrastMap',
		summaryMap: { en: 'Maps with high contrast', de: 'Karten mit starkem Kontrast' },
		icon: {}
	}
};

for (let key in TAG) {
	if (!(<any>TAG)[key].hasOwnProperty('id')) {
		(<any>TAG)[key].id = `https://redaktor.me/data/ontology/${(<any>TAG)[key].name}`;
	}
}

function ORG(name: string) {
	return { id: '', type: 'Organization', name };
}
function OSMlayerORG(name: string, url: string) {
	return {
		...ORG(name),
		url,
		summaryMap: {
			en: `Map data ${C.C_OSM} contributors | Map style (c) [${name}](${url}) ${C.CC}`,
			de: `Kartendaten ${C.C_OSM} Mitwirkende | Kartenstil (c) [${name}](${url}) ${C.CC}`
		}
	};
}
// TODO - id: check if these are already AP actors
export const actor = {
	OSM: {
		...ORG('OSM, OpenStreetMap'),
		url: 'https://www.openstreetmap.org/',
		summaryMap: {
			en: `${C.C_OSM} contributors`,
			de: `${C.C_OSM} Mitwirkende`
		}
	},
	OTM: {
		...ORG('OpenTopoMap - Erhardt, Hochreuther, Schütz'),
		url: 'https://www.opentopomap.org/',
		summary: `(c) [OTM](https://opentopomap.org) ${C.CC}`
	},
	SRTM: {
		...ORG('SRTM - de Ferranti BA'),
		url: 'http://viewfinderpanoramas.org/',
		summary: `(c) [SRTM](http://viewfinderpanoramas.org)`
	},
	CARTO: {
		...ORG('CARTO – Unlock the power of spatial analysis'),
		url: 'http://carto.com/',
		summary: `(c) [CARTO](https://carto.com/attributions)`
	},
	CYCLOSM: {
		...ORG('CyclOSM – OpenStreetMap'),
		url: 'https://github.com/cyclosm/',
		summary: `[CyclOSM](https://github.com/cyclosm/cyclosm-cartocss-style/releases)`
	},
	ESRI: {
		...ORG('Esri – The Science of Where'),
		url: 'https://www.esri.com/',
		summary: `Tiles (c) [Esri](https://www.esri.com/)`
	},
	STADIA: {
		...ORG('Stadia Maps'),
		url: 'https://stadiamaps.com/',
		summary: `(c) [Stadia Maps](https://stadiamaps.com/)`
	},
	STAMEN: {
		...ORG('stamen'),
		url: 'http://maps.stamen.com/',
		summary: `Map tiles by [Stamen Design](http://stamen.com) ${C.CC}`
	},
	WIKIMEDIA: {
		...ORG('Wikimedia Foundation'),
		url: 'https://www.wikimedia.org/',
		summary: '[Wikimedia](https://wikimediafoundation.org/wiki/Maps_Terms_of_Use)'
	},
	WIKIMEDIALABS: {
		...ORG('Wikimedia Foundation'),
		url: 'https://www.mediawiki.org/wiki/Wikimedia_Labs/',
		summary: 'Wikimedia Labs'
	},
	NASA: {
		...ORG('NASA, United States National Space Agency'),
		url: 'https://nasa.gov',
		summary: 'NASA'
	},
	USGS: {
		...ORG('USGS, United States Geological Survey'),
		url: 'https://www.usgs.gov/',
		summary: 'USGS'
	},

	OPENSEAMAP: {
		...ORG('OpenSeaMap'),
		url: 'http://www.openseamap.org/',
		summaryMap: {
			en: `(c) [OpenSeaMap](http://www.openseamap.org) contributors`,
			de: `(c) [OpenSeaMap](http://www.openseamap.org) Mitwirkende`
		}
	},
	OPENPTMAP: {
		...ORG('OpenPtMap'),
		url: 'http://www.openptmap.org/',
		summaryMap: {
			en: `(c) [OpenPtMap](http://www.openptmap.org) contributors`,
			de: `(c) [OpenPtMap](http://www.openptmap.org) Mitwirkende`
		}
	},
	OPENRAILWAYMAP: OSMlayerORG('OpenRailwayMap', 'https://www.OpenRailwayMap.org'),
	OPENFIREMAP: OSMlayerORG('OpenFireMap', 'http://www.openfiremap.org'),
	SAFECAST: OSMlayerORG('SafeCast', 'https://blog.safecast.org/about/')
};

for (let key in actor) {
	(<any>actor)[key].id = `https://redaktor.me/data/Map/actor_${key}`;
}

function concatMaps(...strMaps: (string | { [k: string]: string })[]) {
	const first: any = typeof strMaps[0] === 'string' ? { en: strMaps[0] } : strMaps[0];
	return strMaps.reduce((o: { [k: string]: string }, m) => {
		if (typeof m === 'string') {
			for (let k in o) {
				o[k] += m;
			}
			return o;
		}
		for (let k in m) {
			o[k] = o.hasOwnProperty(k)
				? `${o[k]} ${m[k]}`
				: o.hasOwnProperty('en')
				? `${o.en} ${m[k]}`
				: m[k];
		}
		for (let k in o) {
			if (!m.hasOwnProperty(k)) {
				o[k] = m.hasOwnProperty('en') ? `${o[k]} ${m.en}` : o[k];
			}
		}
		return o;
	}, first);
}

const major = {
	OSM: {
		name: 'OpenStreetMap',
		preview: actor.OSM.url,
		url: `https://{s}.tile.openstreetmap.org${C.PNG}`,
		tag: [TAG.TERRAIN, TAG.CAR, TAG.PARKING],
		contentMap: {
			en: `OpenStreetMap is the free wiki world map, a really free editable map
created by people like you.`,
			de: `OpenStreetMap ist eine Karte der Welt, erstellt von Menschen wie Dir
und frei verwendbar unter einer offenen Lizenz.`
		},
		attributedTo: [actor.OSM],
		height: 19
	},
	CARTO: {
		name: 'CARTO Voyager',
		preview: `${actor.CARTO.url}blog/new-voyager-basemap/`,
		url: `${B.CARTO}voyager_labels_under${C.RET}`,
		tag: [TAG.TERRAIN, TAG.CAR, TAG.PARKING],
		contentMap: {
			en: `CARTO Voyager, mobile-optimized basemap with individual building addresses`,
			de: `CARTO Voyager, mobil optimierte Basiskarte mit individuellen Hausadressen`
		},
		attributedTo: [actor.OSM, actor.CARTO],
		height: 19,
		options: { subdomains: 'abcd' },

		attachment: [
			{
				'@context': { oneOf: 'https://w3id.org/arco/ontology/location/isBaseMapOf' },
				type: 'Question',
				oneOf: [
					{ nameMap: C.default, url: `${B.CARTO}voyager_labels_under${C.RET}` },
					{ nameMap: C.strong, url: `${B.CARTO}voyager${C.RET}` },
					{ nameMap: C.no, url: `${B.CARTO}voyager_nolabels${C.RET}` },
					{ nameMap: C.only, url: `${B.CARTO}voyager_only_labels${C.RET}` }
				]
			}
		]
	},
	ESRI: {
		name: 'Esri World Imagery',
		preview: 'https://www.arcgis.com/home/item.html?id=50c23e4987a44de4ab163e1baeab4a46',
		url: `${B.ESRI}World_Imagery/MapServer/tile/{z}/{y}/{x}`,
		tag: [TAG.SAT],
		contentMap: { en: 'The World Imagery Satellite Map', de: 'Satellitenkarte der Welt' },
		attributedTo: [
			actor.ESRI,
			C.SUMMARY.source,
			{
				type: 'Group',
				summary: `Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping,
Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community`
			}
		],
		attr1: ', USGS | GDI-TH, Esri, HERE, Garmin, FAO, NOAA, USGS',
		attr2: ', CGIAR, USGS | Esri UK, Esri, HERE, Garmin, FAO, METI/NASA, USGS'
	},
	STADIA: {
		name: 'Stadia Maps Alidade Smooth',
		preview: 'https://docs.stadiamaps.com/themes/#alidade-smooth',
		url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
		tag: [TAG.CAR, TAG.TERRAIN, TAG.LIGHT],
		contentMap: {
			en: `Designed to let your data take center stage: Alidade Smooth is a lightly
saturated theme tailored for base maps with lots of overlays or markers.`,
			de: `Design damit Deine Daten im Mittelpunkt stehen: Alidade Smooth ist ein
pastelliges Thema für Basiskarten mit vielen Ebenen oder Markierungen.`
		},
		attributedTo: [
			actor.STADIA,
			{
				type: 'Group',
				url: 'https://openmaptiles.org/',
				summary: `(c) [OpenMapTiles](https://openmaptiles.org/)`,
				subject: actor.OSM
			},
			actor.OSM
		],
		height: 20
	},
	STAMEN: {
		name: 'stamen Toner',
		preview: 'http://maps.stamen.com/toner/',
		url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png',
		tag: [TAG.TERRAIN, TAG.CONTRAST],
		contentMap: {
			en: `These high-contrast B+W (black and white) maps are perfect for
data mashups and exploring river meanders and coastal zones.`,
			de: `Die S/W Karten mit hohem Kontrast sind perfekt für Daten-Mashups
oder um Mäander und Küstengebiete zu erkunden.`
		},
		attributedTo: [actor.STAMEN, actor.OSM],
		height: 20,
		options: { subdomains: 'abcd' }
	}
	/*, // If you have got API keys for these :
	THUNDERFOREST: {
		url: 'https://{s}.tile.thunderforest.com/{variant}/{z}/{x}/{y}.png?apikey={apikey}',
		name: 'Thunderforest', content: 'Thunderforest maps',
		options: {
			attribution:
				'(c) [Thunderforest](http://www.thunderforest.com/), {attribution.OSM}',
			variant: 'cycle',
			apikey: '<insert your api key here>',
			maxZoom: 22
		}
	},
	TOMTOM: {
		name: 'TomTom', content: 'TomTom maps',
		url: 'https://{s}.api.tomtom.com/map/1/tile/{variant}/{style}/{z}/{x}/{y}.{ext}?key={apikey}',
		options: {
			variant: 'basic',
			maxZoom: 22,
			attribution:
				'(c) 1992 - ' + new Date().getFullYear() + ' [TomTom]((https://tomtom.com)',
			subdomains: 'abcd',
			style: 'main',
			ext: 'png',
			apikey: '<insert your API key here>',
		}
	}
	*/
};

const getESRIvectors = (
	name: string | { [k: string]: string } = {
		en: 'Esri: World Street Map',
		de: 'Esri: Weltstraßenkarte'
	},
	styleId = 'de26a3cf4cc9451298ea173c4b324736',
	attribution = `GDI-TH, Esri, HERE, Garmin, FAO, NOAA, USGS`
) => ({
	...major.ESRI,
	preview: `https://www.arcgis.com/home/item.html?id=${styleId}`,
	[typeof name === 'string' ? 'name' : 'nameMap']: name,
	url:
		'https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf',
	attributedTo: [actor.ESRI, C.SUMMARY.source, { type: 'Group', summary: attribution }],
	attachment: [
		{
			type: ['Document', 'StyleJSON'], // TODO GeoJSON
			url: `${B.ESRI_S_PREFIX}${styleId}${B.ESRI_S_SUFFIX}`
		}
	]
});

const basemap = {
	OSM: major.OSM,
	OSM_DE: {
		...major.OSM,
		name: 'OpenStreetMap DE',
		preview: 'https://openstreetmap.de',
		url: 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
		tag: [TAG.TERRAIN, TAG.CAR, TAG.PARKING],
		contentMap: concatMaps(major.OSM.contentMap, {
			en:
				'\nDE fork: Labels in German and local language, commercial and high-traffic use restricted',
			de:
				'\nDE fork: Beschriftung deutsch & lokal, komerzielle und hochfrequente Nutzung beschränkt'
		}),
		attributedTo: [actor.OSM, { type: 'Group', summary: `(c) OpenStreetMap Deutschland` }],
		height: 18
	},
	OSM_FR: {
		...major.OSM,
		name: 'OpenStreetMap FR',
		preview: 'https://openstreetmap.fr',
		url: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
		tag: [TAG.TERRAIN, TAG.CAR, TAG.PARKING],
		contentMap: concatMaps(major.OSM.contentMap, 'FR fork'),
		attributedTo: [actor.OSM, { type: 'Group', summary: `(c) OpenStreetMap France` }],
		height: 20
	},
	OSM_HOT: {
		...major.OSM,
		name: 'OpenStreetMap HOT',
		preview: 'https://www.hotosm.org',
		url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
		tag: [TAG.TERRAIN, TAG.HUM],
		contentMap: {
			en: `HOT is an international team dedicated to humanitarian action and
community development through open mapping.`,
			de: `HOT ist ein internationales Team und widmet sich humanitärer Hilfe und
Community Entwicklung durch offene Kartierung.`
		},
		attributedTo: [
			actor.OSM,
			{
				type: 'Group',
				summary: `Tiles style by [Humanitarian OSM Team](https://www.hotosm.org/)
hosted by [OSM France](https://openstreetmap.fr/)`
			}
		]
	},
	OTM: {
		name: 'OpenTopoMap',
		preview: 'https://opentopomap.org',
		url: `https://{s}.tile.opentopomap.org${C.PNG}`,
		tag: [TAG.TOPO],
		contentMap: {
			en: `OpenTopoMap is a free, topographical map, generated by OSM-Data and
SRTM-Elevation-data.
The style is based on official map styles and offers good readability feat. high contrasts.`,
			de: `OpenTopoMap ist eine freie, topografische Karte, die aus OSM-Daten
und SRTM-Höhendaten generiert wird.
Der Stil orientiert sich an den amtlichen Karten und setzt auf gute Lesbarkeit
durch hohen Kontrast und ausgewogene Signaturen.`
		},
		attributedTo: [C.SUMMARY.data, actor.OSM, actor.SRTM, { summary: '|' }, actor.OTM],
		height: 17
	},

	ESRI_WORLDIMAGERY: major.ESRI,
	NASA_BLUEMARBLE: {
		name: 'OpenTopoMap',
		preview: 'https://search.earthdata.nasa.gov/',
		url: `https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG4326_500m/{z}/{x}/{y}.jpeg`,
		tag: [TAG.SAT],
		contentMap: {
			en: `NASA Blue Marble Satellitenbilder`,
			de: `NASA Blue Marble Satellitenbilder`
		},
		attributedTo: [C.SUMMARY.data, actor.NASA, actor.USGS, C.SUMMARY.style, actor.ESRI],
		height: 7
	},

	ESRI_WORLDSTREETMAP: {
		...getESRIvectors(),
		tag: [TAG.CAR, TAG.PARKING],
		contentMap: {
			en: `The World Basemap v2 - Streets
Provides a detailed basemap for the world featuring a classic Esri street map style.`,
			de: `Grundkarte der Welt v2 - Straßen
Bietet eine detailierte Welt-Basiskarte mit einem klassischen Esri Straßenkarten Stil.`
		}
	},
	ESRI_OPENSTREETMAP: {
		...getESRIvectors('Esri Open Street Map', 'fae788aa91e54244b161b59725dcbb2a', ''),
		tag: [TAG.TERRAIN, TAG.CAR, TAG.PARKING],
		contentMap: {
			en: `The World Basemap v2 - OpenStreetMap
OpenStreetMap (OSM) is a collaborative project to create a free editable map of the world.
This vector basemap version of OSM data is hosted by Esri.`,
			de: `Grundkarte der Welt v2 - OpenStreetMap
OpenStreetMap (OSM) ist eine freie Karte der Welt, erstellt von Menschen wie Dir.
Diese Vektor-Grundkarte wird von Esri bereitgestellt.`
		},
		attributedTo: [C.SUMMARY.data, actor.OSM, C.SUMMARY.layer, actor.ESRI]
	},
	ESRI_OCEAN: {
		...getESRIvectors(
			{
				en: 'Esri: Ocean Basemap',
				de: 'Esri: Ozeanische Grundkarte'
			},
			'f0c119410f5e4d54be7545657f9768cb',
			'OceanWise, Esri, GEBCO, DeLorme, NaturalVue | Esri UK, Esri, HERE, Garmin, FAO, METI/NASA, USGS'
		),
		tag: [TAG.TOPO, TAG.BOAT],
		contentMap: {
			en: `The World Basemap v2 - Ocean
Designed to be used as a base map by marine GIS professionals
and as a reference map by anyone interested in ocean data.
The base map features marine bathymetry.
Land features include inland waters and roads overlaid on land cover and shaded relief imagery.`,
			de: `Grundkarte der Welt v2 - Ozeane
Bietet eine detailierte Meeres-Basiskarte für Meeres GIS Profis
und als Referenzkarte für jeden Meeresdaten-Interessierten.
Die Basiskarte enthält Marine Bathymetrie.
Zu den Landmerkmalen gehören Binnengewässer und überlappende Straßen sowie schattierte Reliefbilder.`
		}
	},
	ESRI_TOPOGRAPHIC: {
		...getESRIvectors(
			{
				en: 'Esri: Topographic Basemap',
				de: 'Esri: Topografische Grundkarte'
			},
			'7a6bf0e8cb5a418085e66c0485e74d19',
			major.ESRI.attr1
		),
		tag: [TAG.TOPO],
		contentMap: {
			en: `The World Basemap v2 - Topographic
Provides a detailed basemap for the world featuring a classic Esri topographic
map style designed for use with a relief map.`,
			de: `Grundkarte der Welt v2 - Topografisch
Bietet eine detailierte Welt-Basiskarte mit einem klassischen Esri
Topografiekarten Stil, gestaltet zur Benutzung mit einer erhabenen Karte.`
		}
	},

	ESRI_TERRAIN: {
		...getESRIvectors(
			{
				en: 'Esri: Terrain Basemap',
				de: 'Esri: Gelände Grundkarte'
			},
			'33064a20de0c48d2bb61efa8faca93a8',
			major.ESRI.attr2
		),
		tag: [TAG.TERRAIN],
		contentMap: {
			en: `The World Basemap v2 - Terrain
Displays minimal map content: water and land fill, water lines and roads:
Designed as a base layer with the World Terrain Reference layer and hillshade.`,
			de: `Grundkarte der Welt v2 - Gelände
Zeigt minimale Karteninhalte: Wasser und Land Füllung, Auto- und Wasserstraßen:
Gestaltet als Basisebene für die 'World Terrain' Referenz-Ebene und hillshade.`
		}
	},
	ESRI_COMMUNITY: {
		...getESRIvectors(
			{
				en: 'Esri: Community Basemap',
				de: 'Esri: Community Grundkarte'
			},
			'273bf8d5c8ac400183fc24e109d20bcf'
		),
		tag: [TAG.TERRAIN, TAG.CAR, TAG.PARKING, TAG.WALK, TAG.TRANSIT],
		contentMap: {
			en: `The World Basemap v2 - Community map
	Optimized to display special areas of interest (AOIs) that have been created
	and edited by Community Maps contributors.`,
			de: `Grundkarte der Welt v2 - Community Karte
	Optimiert für die Anzeige spezieller Interessenbereiche (AOIs),
	die von Community Maps Mitwirkenden erstellt und bearbeitet wurden.`
		}
	},
	ESRI_NATGEO: {
		...getESRIvectors(
			{
				en: 'Esri: Basemap National Geographic Style',
				de: 'Esri: Grundkarte National Geographic Stil'
			},
			'3d1a30626bbc46c582f148b9252676ce',
			major.ESRI.attr2
		),
		tag: [TAG.GEOPOL, TAG.TOPO, TAG.TERRAIN],
		contentMap: {
			en: `The World Basemap v2 - National Geographic
Provides a detailed view of the world featuring political boundaries, labeling,
and background that highlights the differences in the physical characteristics of the land.`,
			de: `Grundkarte der Welt v2 - National Geographic
Bietet eine detailierte Ansicht der Welt inklusive politischer Grenzen, Bechriftung
und einem Hintergrund, der den physikalischen Boden-Charakter unterstreicht.`
		}
	},
	ESRI_STREETNIGHT: {
		...getESRIvectors(
			{
				en: 'Esri: Streets at night',
				de: 'Esri: Straßen bei Nacht'
			},
			'93554006894c45a88136127535878fca'
		),
		tag: [TAG.CAR, TAG.DARK],
		contentMap: {
			en: `The World Basemap v2 - Streets, night
Provides a detailed basemap for the world featuring a custom 'night time' street map style.`,
			de: `Grundkarte der Welt v2 - Straßen, Nacht
Bietet eine detailierte Welt-Basiskarte mit einem angepaßten 'Bei Nacht' Straßenkarten Stil.`
		}
	},
	ESRI_NAVIGATION: {
		...getESRIvectors('Esri: Navigation', '63c47b7177f946b49902c24129b87252'),
		tag: [TAG.CAR, TAG.PARKING],
		contentMap: {
			en: `The World Basemap v2 - Navigation
Provides a detailed basemap for the world featuring a custom navigation map style.`,
			de: `Grundkarte der Welt v2 - Navigation
Bietet eine detailierte Ansicht der Welt mit einem Navigationskarten-Stil.`
		}
		// TODO local labels
	},
	ESRI_GRAY: {
		...getESRIvectors(
			{
				en: 'Esri: Light Gray Canvas',
				de: 'Esri: Hellgraue Leinwand'
			},
			'291da5eab3a0412593b66d384379f89f'
		),
		tag: [TAG.LIGHT],
		contentMap: {
			en: `The World Basemap v2 - Light Gray
Provides a detailed basemap for the world featuring a light neutral background style
with minimal colors, labels, and features.`,
			de: `Grundkarte der Welt v2 - Hellgrau
Bietet eine detaillierte Weltkarte mit einem hellen, neutralen Hintergrund Stil
und minimalen Farben inklusive Beschriftung.`
		}
	},
	ESRI_GRAY_DARK: {
		...getESRIvectors(
			{
				en: 'Esri: Darkgray Canvas',
				de: 'Esri: Dunkelgraue Leinwand'
			},
			'5e9b3685f4c24d8781073dd928ebda50'
		),
		tag: [TAG.DARK],
		contentMap: {
			en: `The World Basemap v2 - Dark Gray
Provides a detailed basemap for the world featuring a dark neutral background style
with minimal colors, labels, and features.`,
			de: `Grundkarte der Welt v2 - Dunkelgrau
Bietet eine detaillierte Weltkarte mit einem dunklen, neutralen Hintergrund Stil
und minimalen Farben inklusive Beschriftung.`
		}
	},
	ESRI_HUMANGEO: {
		...getESRIvectors(
			{
				en: 'Esri: Human Geography',
				de: 'Esri: Humangeographie'
			},
			'2afe5b807fa74006be6363fd243ffb30'
		),
		tag: [TAG.LIGHT, TAG.CONTRAST, TAG.HUM],
		contentMap: {
			en: `The World Basemap v2 - "Human Geography" map
Provides a detailed basemap for the world, featuring a monochromatic style
with content adjusted to support Human Geography information.
This map is designed for use with Human Geography Label and Detail layers.`,
			de: `Grundkarte der Welt v2 - Karte "Humangeographie"
Bietet eine detaillierte Weltkarte mit einem monochromatischen Stil.
Der Inhalt unterstreicht humangeographische Informationen.`
		}
	},
	ESRI_HUMANGEO_DARK: {
		...getESRIvectors(
			{
				en: 'Esri: Human Geography, dark',
				de: 'Esri: Humangeographie, dunkel'
			},
			'd7397603e9274052808839b70812be50'
		),
		tag: [TAG.DARK, TAG.CONTRAST, TAG.HUM],
		contentMap: {
			en: `The World Basemap v2 - "Human Geography" map, dark
Provides a detailed basemap for the world, featuring a dark monochromatic style
with content adjusted to support Human Geography information.
This map is designed for use with Human Geography Dark Label and Detail layers.`,
			de: `Grundkarte der Welt v2 - Karte "Humangeographie", dunkel
Bietet eine detaillierte Weltkarte mit einem dunklen monochromatischen Stil.
Der Inhalt unterstreicht humangeographische Informationen.`
		}
	},

	ESRI_NEWSPAPER: {
		...getESRIvectors(
			{
				en: 'Esri: Newspaper',
				de: 'Esri: Zeitung'
			},
			'75a3ce8990674a5ebd5b9ab66bdab893'
		),
		tag: [TAG.GEOPOL, TAG.CAR, TAG.ART],
		contentMap: {
			en: `The World Basemap v2 - "Newspaper" Style
Presents a unique take on the Esri vector tile basemap.
This Newspaper style tile layer is a black & white design
with halftone patterns, red highlights, and stylized fonts.`,
			de: `Grundkarte der Welt v2 - "Zeitung" Stil
Eine einzigartige Version der Grundkarte der Esri-Vektor-Kacheln.
Dieses Tile Layer im Zeitungsstil ist ein Schwarz-Weiß-Design
mit Halbtonmustern, roten Highlights und stilisierten Schriftarten.`
		}
	},
	ESRI_NOVA: {
		...getESRIvectors(
			{
				en: 'Esri: Nova',
				de: 'Esri: Nova'
			},
			'75f4dfdff19e445395653121a95a85db'
		),
		tag: [TAG.ART, TAG.DARK],
		contentMap: {
			en: `The World Basemap v2 - "Nova" Style
Provides a detailed basemap for the world featuring a dark background
with glowing blue symbology inspired by the ArcGIS.com splash screen. `,
			de: `Grundkarte der Welt v2 - "Nova" Stil
Bietet eine detaillierte Grundkarte für die Welt mit einem dunklen Hintergrund
und einer leuchtend blauen Symbologie.`
		}
	},
	ESRI_COLOREDPENCIL: {
		...getESRIvectors(
			{
				en: 'Esri: Colored Pencil',
				de: 'Esri: Farbstift'
			},
			'4cf7e1fb9f254dcda9c8fbadb15cf0f8'
		),
		tag: [TAG.GEOPOL, TAG.ART],
		contentMap: {
			en: `The World Basemap v2 - "Colored Pencil" Style
This vector tile layer is presented in the style of hand-drawn, colored pencil cartography.`,
			de: `Grundkarte der Welt v2 - "Farbstift" Stil
Dieses Vektor Tile Layer wird im Stil einer handgezeichneten Buntstiftkartographie präsentiert.`
		}
	},
	ESRI_BLUEPRINT: {
		...getESRIvectors(
			{
				en: 'Esri: Blueprint',
				de: 'Esri: Blaupause'
			},
			'80be160f0ca1413d898ad4e90d197278'
		),
		tag: [TAG.ART, TAG.CONTRAST],
		contentMap: {
			en: `The World Basemap v2 - Blueprint Style
OpenStreetMap vector tile layer presented in a creative cartographic style
emulating a blueprint technical drawing. `,
			de: `Grundkarte der Welt v2 - Blaupausen-Stil
OpenStreetMap-Vektorkachelebene in einem kreativen kartografischen Stil,
der eine technische Blaupausenzeichnung emuliert.`
		}
	},
	ESRI_MIDCENTURY: {
		...getESRIvectors(
			{
				en: 'Esri: Mid Century',
				de: 'Esri: Die 50er Jahre'
			},
			'7675d44bb1e4428aa2c30a9b68f97822'
		),
		tag: [TAG.HISTORY],
		contentMap: {
			en: `The World Basemap v2 - Mid Century
Inspired by the art and advertising of the 1950's, this customized vector style
presents a unique design option to the ArcGIS basemaps.`,
			de: `Grundkarte der Welt v2 - 50er Stil
Inspiriert von der Kunst und Werbung der 1950er Jahre bietet dieser angepasste
Vektorstil eine einzigartige Designoption für die ArcGIS-Grundkarten.`
		}
	},
	ESRI_MODERNANTIQUE: {
		...getESRIvectors(
			{
				en: 'Esri: Modern Antique',
				de: 'Esri: Modern Antik'
			},
			'effe3475f05a4d608e66fd6eeb2113c0'
		),
		tag: [TAG.HISTORY],
		contentMap: {
			en: `The World Basemap v2 - Style
Updating the look of 18th and 19th century antique maps in the modern world of multi-scale mapping.
This map is designed to be used with World Hillshade. `,
			de: `Grundkarte der Welt v2 - Stil
Bringt den Look antiker Karten des 18. und 19. Jahrhunderts in die modernen Welt der mehrskaligen Kartierung.
Diese Karte wurde für die Verwendung mit World Hillshade entwickelt.`
		}
	},
	ESRI_CHARTEDTERRITORY: {
		...getESRIvectors(
			{
				en: 'Esri: Charted Territory',
				de: 'Esri: Kartiertes Gebiet'
			},
			'1c365daf37a744fbad748b67aa69dac8'
		),
		tag: [TAG.GEOPOL],
		contentMap: {
			en: `The World Basemap v2 - Charted Territory
featuring a geopolitical style reminiscent of a printed atlas plate or a school
classroom wall map. This layer is designed for use with shaded relief. `,
			de: `Grundkarte der Welt v2 - Charted Territory
mit einem geopolitischen Stil, der an einen gefruckten Atlas oder eine Klassenzimmer-
Wandkarte erinnert. Diese Schicht ist für die Verwendung mit schattiertem Relief vorgesehen.`
		}
	},
	/*
  WorldPhysical: {
  	options: {
  		variant: 'World_Physical_Map',
  		maxZoom: 8,
  		attribution: '{attribution.Esri} &mdash; ${C.SUMMARY.source[locale]}: US National Park Service'
  	}
  },
  // v2 +
  'StreetsRelief': 'b266e6d17fc345b498345613930fbd76',
  */

	CARTO_VOYAGER: major.CARTO,
	CARTO_POSITRON: {
		...major.CARTO,
		name: 'CARTO Positron',
		url: `${B.CARTO}light_all${C.RET}`,
		tag: [TAG.LIGHT],
		contentMap: {
			en: `CARTO Positron, a light map specifically for data visualization uses`,
			de: `CARTO Positron, eine helle Karte speziell für Daten Visualisierungen`
		},
		attachment: [
			{
				type: 'Question',
				oneOf: [
					{ nameMap: C.default, url: `${B.CARTO}light_all${C.RET}` },
					{ nameMap: C.no, url: `${B.CARTO}light_nolabels${C.RET}` },
					{ nameMap: C.only, url: `${B.CARTO}light_only_labels${C.RET}` }
				]
			}
		]
	},
	CARTO_DARKMATTER: {
		...major.CARTO,
		name: 'CARTO Dark Matter',
		url: `${B.CARTO}dark_all${C.RET}`,
		tag: [TAG.DARK],
		contentMap: {
			en: `CARTO Dark Matter, a dark map specifically for data visualization uses`,
			de: `CARTO Dark Matter, eine helle Karte speziell für Daten Visualisierungen`
		},
		attachment: [
			{
				type: 'Question',
				oneOf: [
					{ nameMap: C.default, url: `${B.CARTO}dark_all${C.RET}` },
					{ nameMap: C.no, url: `${B.CARTO}dark_nolabels${C.RET}` },
					{ nameMap: C.only, url: `${B.CARTO}dark_only_labels${C.RET}` }
				]
			}
		]
	},
	CYCLOSM: {
		name: 'CyclOSM - Open Bicycle',
		url: 'https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
		tag: [TAG.BIKE, TAG.WALK],
		contentMap: { en: 'Cycle oriented OSM', de: 'Fahrrad-orientierte OSM' },
		attributedTo: [actor.CYCLOSM, actor.OSM],
		height: 20
	},
	HIKEBIKE: {
		name: 'wmflabs HikeBike',
		url: 'https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png',
		tag: [TAG.BIKE, TAG.WALK],
		contentMap: {
			en: 'Wikimedia Labs Hike & Bike map',
			de: 'Wikimedia Labs Wander- & Fahrrad-Karte'
		},
		attributedTo: [actor.WIKIMEDIALABS, actor.OSM],
		height: 19
	},
	HILLSHADING: {
		name: 'wmflabs Hillshading',
		url: 'https://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png',
		tag: [TAG.TOPO, TAG.WALK],
		contentMap: {
			en: 'Wikimedia Labs Hillshading & Elevation',
			de: 'Wikimedia Labs Hügelschattierung & Höhe'
		},
		attributedTo: [actor.WIKIMEDIALABS, actor.OSM],
		height: 20
	},
	MTBMAP: {
		name: 'MTB Map',
		url: 'http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png',
		tag: [TAG.BIKE, TAG.WALK],
		contentMap: {
			en: 'Mountain biking (MTB) and hiking map',
			de: 'Mountainbike (MTB) und Wanderkarte'
		},
		attributedTo: [actor.OSM, actor.USGS]
	},
	WIKIMEDIA: {
		name: 'Wikimedia map',
		url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png',
		tag: [TAG.GEOPOL, TAG.TERRAIN, TAG.CAR, TAG.TRANSIT],
		contentMap: {
			en: 'The map on the Wikimedia projects, like Wikipedia and Wikimedia Commons',
			de: 'Die Karte der Wikimedia Projekte, z. B. Wikipedia und Wikimedia Commons'
		},
		attributedTo: [actor.WIKIMEDIA, actor.OSM],
		height: 19,
		options: { minZoom: 1 }
	},

	// TODO
	STADIA_ALIDADE: major.STADIA,
	/* variants: {
	AlidadeSmooth: {
		url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
	},
	AlidadeSmoothDark: {
		url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
	},
	OSMBright: {
		url: 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'
	},
	Outdoors: {
		url: 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
	}
	} */
	STAMEN_TONER: major.STAMEN
	/* variants: {
	Toner: 'toner',
	TonerBackground: 'toner-background',
	TonerHybrurl: 'toner-hybrid',
	TonerLines: 'toner-lines',
	TonerLabels: 'toner-labels',
	TonerLite: 'toner-lite',
	Watercolor: {
		url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/{variant}/{z}/{x}/{y}.{ext}',
		options: {
			variant: 'watercolor',
			ext: 'jpg',
			minZoom: 1,
			maxZoom: 16
		}
	},
	Terrain: {
		options: {
			variant: 'terrain',
			minZoom: 0,
			maxZoom: 18
		}
	},
	TerrainBackground: {
		options: {
			variant: 'terrain-background',
			minZoom: 0,
			maxZoom: 18
		}
	},
	TerrainLabels: {
		options: {
			variant: 'terrain-labels',
			minZoom: 0,
			maxZoom: 18
		}
	},
	TopOSMRelief: {
		url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/{variant}/{z}/{x}/{y}.{ext}',
		options: {
			variant: 'toposm-color-relief',
			ext: 'jpg',
			bounds: [[22, -132], [51, -56]]
		}
	},
	TopOSMFeatures: {
		options: {
			variant: 'toposm-features',
			bounds: [[22, -132], [51, -56]],
			opacity: 0.9
		}
	} */
};

const layer = {
	ESRI_HYBRID_REF: {
		...getESRIvectors(
			{
				en: 'Esri: Hybrid Reference Layer',
				de: 'Esri: Hybride Referenzebene'
			},
			'30d6b8271e1849cd9c3042060001f425'
		),
		tag: [TAG.LABELS],
		contentMap: {
			en: `The World Basemap v2 - Hybrid Reference
Provides a detailed reference layer for the world designed to be overlaid on imagery or canvas base.`,
			de: `Grundkarte der Welt v2 - Hybride Referenz
Bietet eine detailierte Referenzebene, gestaltet um auf Bebilderung oder Leinwände gelegt zu werden.`
		},
		hasBaseMap: ['ESRI_WORLDIMAGERY', 'ESRI_TOPOGRAPHIC', 'ESRI_TERRAIN'],
		attachment: [
			{
				type: 'Question',
				oneOf: [
					getESRIvectors(C.hybridLabels, '30d6b8271e1849cd9c3042060001f425'),
					getESRIvectors(C.hybridLabelsLocale, '2a2e806e6e654ea78ecb705149ceae9f')
				]
			}
		]
	},
	ESRI_STREETNIGHT_REF: {
		...getESRIvectors(
			{
				en: 'Esri: "Streets at night" Reference Layer',
				de: 'Esri: "Straßen bei Nacht" Referenzebene'
			},
			'93554006894c45a88136127535878fca'
		),
		tag: [TAG.LABELS],
		contentMap: {
			en: `The World Basemap v2 - "Streets at night" Labels
Provides a detailed reference layer for the world designed to be overlaid on dark maps.`,
			de: `Grundkarte der Welt v2 - "Straßen bei Nacht" Beschriftung
Bietet eine detailierte Referenzebene, gestaltet um auf dunkle Karten gelegt zu werden.`
		},
		hasBaseMap: 'ESRI_STREETNIGHT',
		attachment: [
			{
				type: 'Question',
				oneOf: [
					getESRIvectors(C.labels, '93554006894c45a88136127535878fca'),
					getESRIvectors(C.labelsLocale, 'f3a55a52222341a7aafc793174351bb8')
				]
			}
		]
	},
	ESRI_GRAY_REF: {
		...getESRIvectors(
			{
				en: 'Esri: Light Gray Canvas, Reference Layer',
				de: 'Esri: Hellgraue Leinwand, Referenzebene'
			},
			'1768e8369a214dfab4e2167d5c5f2454'
		),
		tag: [TAG.LABELS],
		contentMap: {
			en: `The World Basemap v2 - "Light Gray Canvas" Labels
Reference style with minimal colors, labels, and features.
This map is designed to be used with Light Gray Canvas Base.`,
			de: `Grundkarte der Welt v2 - "Hellgraue Leinwand" Beschriftung
Referenzebene mit minimalen Farben inklusive Beschriftung.
Gestaltet zur Benutzung mit "Hellgraue Leinwand" Basis.`
		},
		hasBaseMap: 'ESRI_GRAY',
		attachment: [
			{
				type: 'Question',
				oneOf: [
					getESRIvectors(C.labels, '1768e8369a214dfab4e2167d5c5f2454'),
					getESRIvectors(C.labelsLocale, '3ffec1551cd14606a286622c634b0bb4')
				]
			}
		]
	},
	ESRI_GRAY_DARK_REF: {
		...getESRIvectors(
			{
				en: 'Esri: Darkgray Canvas, Reference Layer',
				de: 'Esri: Dunkelgraue Leinwand, Referenzebene'
			},
			'747cb7a5329c478cbe6981076cc879c5'
		),
		tag: [TAG.LABELS],
		contentMap: {
			en: `The World Basemap v2 - "Dark Gray Canvas" Labels
Reference style with minimal colors, labels, and features.
This map is designed to be used with Dark Gray Canvas Base.`,
			de: `Grundkarte der Welt v2 - "Dunkelgraue Leinwand" Beschriftung
Referenzebene mit minimalen Farben inklusive Beschriftung.
Gestaltet zur Benutzung mit "Dunkelgraue Leinwand" Basis.`
		},
		hasBaseMap: 'ESRI_GRAY_DARK',
		attachment: [
			{
				type: 'Question',
				oneOf: [
					getESRIvectors(C.labels, '747cb7a5329c478cbe6981076cc879c5'),
					getESRIvectors(C.labelsLocale, '7465191cfa1f425fbe41e4d44450d559')
				]
			}
		]
	},
	ESRI_HUMANGEO_DETAIL: {
		...getESRIvectors(
			{
				en: 'Esri: Human Geography, Detail Layer',
				de: 'Esri: Humangeographie, Detailebene'
			},
			'97fa1365da1e43eabb90d0364326bc2d'
		),
		tag: [TAG.TERRAIN],
		contentMap: {
			en: `The World Basemap v2 - "Human Geography" - details
This layer is designed for use with "Human Geography" Label and Base layers.`,
			de: `Grundkarte der Welt v2 - "Humangeographie" - Details
Diese Ebene wurde gestaltet zur Benutzung mit "Humangeographie" Beschriftung und Basisebene.`
		},
		hasBaseMap: 'ESRI_HUMANGEO'
	},
	ESRI_HUMANGEO_REF: {
		...getESRIvectors(
			{
				en: 'Esri: Human Geography, Label',
				de: 'Esri: Humangeographie, Beschriftung'
			},
			'ba52238d338745b1a355407ec9df6768'
		),
		tag: [TAG.LABELS],
		contentMap: {
			en: `The World Basemap v2 - Human Geography map
This layer is designed for use with "Human Geography" Detail and Base layers.`,
			de: `Grundkarte der Welt v2 - Karte Humangeographie
Diese Ebene wurde gestaltet zur Benutzung mit "Humangeographie" Detail und Basisebene.`
		},
		hasBaseMap: 'ESRI_HUMANGEO',
		attachment: [
			{
				type: 'Question',
				oneOf: [
					getESRIvectors(C.labels, 'ba52238d338745b1a355407ec9df6768'),
					getESRIvectors(C.labelsLocale, '2a2e806e6e654ea78ecb705149ceae9f')
				]
			}
		]
	},
	ESRI_HUMANGEO_DARK_DETAIL: {
		...getESRIvectors(
			{
				en: 'Esri: Human Geography, dark, Detail Layer',
				de: 'Esri: Humangeographie, dunkel, Detailebene'
			},
			'1ddbb25aa29c4811aaadd94de469856a'
		),
		tag: [TAG.TERRAIN],
		contentMap: {
			en: `The World Basemap v2 - Human Geography map, dark - details
This layer is designed for use with "Human Geography dark" Label and Base layers.`,
			de: `Grundkarte der Welt v2 - Karte Humangeographie, dunkel - Details
Diese Ebene wurde gestaltet zur Benutzung mit "Humangeographie dunkel" Beschriftung und Basisebene.`
		},
		hasBaseMap: 'ESRI_HUMANGEO_DARK'
	},
	ESRI_HUMANGEO_DARK_REF: {
		...getESRIvectors(
			{
				en: 'Esri: Human Geography, dark, Label',
				de: 'Esri: Humangeographie, dunkel, Beschriftung'
			},
			'4a3922d6d15f405d8c2b7a448a7fbad2'
		),
		tag: [TAG.LABELS],
		contentMap: {
			en: `The World Basemap v2 - Human Geography map, dark
This layer is designed for use with Human Geography Dark Detail and Base layers.`,
			de: `Grundkarte der Welt v2 - Karte Humangeographie, dunkel
Diese Ebene wurde gestaltet zur Benutzung mit "Humangeographie dunkel" Detail und Basisebene.`
		},
		hasBaseMap: 'ESRI_HUMANGEO_DARK',
		attachment: [
			{
				type: 'Question',
				oneOf: [
					getESRIvectors(C.labels, '4a3922d6d15f405d8c2b7a448a7fbad2'),
					getESRIvectors(C.labelsLocale, '2a2e806e6e654ea78ecb705149ceae9f')
				]
			}
		]
	},

	OPENSEAMAP: {
		name: 'OpenSeaMap',
		preview: 'https://openseamap.org',
		url: 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
		tag: [TAG.TOPO, TAG.BOAT, TAG.TRANSIT],
		contentMap: {
			en: `OpenSeaMap is an open source, worldwide project to create a free nautical chart.
Incl. beacons, buoys and other navigation aids as well as port information, repair shops and chandlerys.`,
			de: `OpenSeaMap ist ein weltweites Opensource-Projekt zur Erstellung einer freien Seekarte.
Inkl. Routen, Leuchtfeuer, Tonnen und andere Seezeichen, Seewetter, Hafen-Informationen, Reparaturwerkstätten etc.,
Einkaufsmöglichkeiten, Restaurants und Sehenswürdigkeiten.`
		},
		attributedTo: [actor.OPENSEAMAP]
	},
	OPENPTMAP: {
		name: 'OpenPtMap',
		preview: 'http://openptmap.org',
		url: 'http://openptmap.org/tiles/{z}/{x}/{y}.png',
		tag: [TAG.TOPO, TAG.TRANSIT],
		contentMap: {
			en: `OpenPtMap shows Public Transport Lines and Railroads.`,
			de: `OpenPtMap zeigt Öffi - ÖV-Linien und Bahnstrecken.`
		},
		height: 17,
		attributedTo: [actor.OPENPTMAP]
	},
	OPENRAILWAYMAP: {
		name: 'OpenRailwayMap',
		preview: 'https://openrailwaymap.org',
		url: 'https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
		tag: [TAG.TRANSIT, TAG.HUM],
		contentMap: {
			en: `OpenRailwayMap (previously called "Bahnkarte") is a detailed online map
of the world's railway infrastructure, built on OpenStreetMap data.`,
			de: `OpenRailwayMap (Bahnkarte) ist eine detaillierte Karte vohn Bahnstrecken
und Infrastruktur basierend auf OpenStreetMap Daten.`
		},
		height: 19,
		attributedTo: [actor.OPENRAILWAYMAP]
	},
	OPENFIREMAP: {
		name: 'OpenFireMap',
		preview: 'http://openfiremap.org',
		url: 'http://openfiremap.org/hytiles/{z}/{x}/{y}.png',
		tag: [TAG.HUM, TAG.TOPO],
		contentMap: {
			en: `Fire Hydrants and infrastructure`,
			de: `Hydranten und Infrastruktur`
		},
		height: 19,
		attributedTo: [actor.OPENFIREMAP]
	},
	SAFECAST: {
		name: 'SafeCast',
		preview: 'https://safecast.org',
		url: 'https://s3.amazonaws.com/te512.safecast.org/{z}/{x}/{y}.png',
		tag: [TAG.HUM],
		contentMap: {
			en: `Air Quality`,
			de: `Luftqualität`
		},
		height: 16,
		attributedTo: [actor.SAFECAST],
		attachment: [
			{
				type: 'Image',
				name: 'Scale',
				url: {
					type: 'Link',
					href: 'https://map.safecast.org/scales64_240x854.png',
					mediaType: 'image/png'
				}
			}
		]
	}

	//"LABELS","HUM","GEOPOL","TOPO","TERRAIN","SAT","CLIMATE","WEATHER","ECONOMIC","TRANSIT","CAR",
	//"PARKING","BIKE","WALK","BOAT","AIR","SEATING","VENUE","FLOOR","HISTORY","ART","LIGHT","DARK","CONTRAST"
	/*
	OpenMapSurfer: {
		name: '',
		preview: '',
		url: 'https://maps.heigit.org/openmapsurfer/tiles/{variant}/webmercator/{z}/{x}/{y}.png',
		options: {
			maxZoom: 19,
			variant: 'roads',
			attribution: '${C.SUMMARY.imgFrom[locale]}
(http://giscience.uni-hd.de/)GIScience Research Group @ University of Heidelberg</a> | ${C.SUMMARY.data[locale]} '
		},
		variants: {
			Roads: {
				options: {
					variant: 'roads',
					attribution: '{attribution.OpenMapSurfer}{attribution.OSM}'
				}
			},
			Hybrurl: {
				options: {
					variant: 'hybrid',
					attribution: '{attribution.OpenMapSurfer}{attribution.OSM}'
				}
			},
			AdminBounds: {
				options: {
					variant: 'adminb',
					maxZoom: 18,
					attribution: '{attribution.OpenMapSurfer}{attribution.OSM}'
				}
			},
			ContourLines: {
				options: {
					variant: 'asterc',
					maxZoom: 18,
					minZoom: 13,
					attribution: '{attribution.OpenMapSurfer} (https://lpdaac.usgs.gov/products/aster_policies)ASTER GDEM</a>'
				}
			},
			Hillshade: {
				options: {
					variant: 'asterh',
					maxZoom: 18,
					attribution: '{attribution.OpenMapSurfer} (https://lpdaac.usgs.gov/products/aster_policies">ASTER GDEM</a>,
					<a href="http://srtm.csi.cgiar.org/)[SRTM]'
				}
			},
			ElementsAtRisk: {
				options: {
					variant: 'elements_at_risk',
					attribution: '{attribution.OpenMapSurfer}{attribution.OSM}'
				}
			}
		}
	},
	OpenWeatherMap: {
		name: '',
		preview: '',
		url: 'http://{s}.tile.openweathermap.org/map/{variant}/{z}/{x}/{y}.png?appid={apiKey}',
		options: {
			maxZoom: 19,
			attribution: '${C.SUMMARY.data[locale]} (c) (http://openweathermap.org)[OpenWeatherMap]',
			apiKey:'<insert your api key here>',
			opacity: 0.5
		},
		variants: {
			Clouds: 'clouds',
			CloudsClassic: 'clouds_cls',
			Precipitation: 'precipitation',
			PrecipitationClassic: 'precipitation_cls',
			Rain: 'rain',
			RainClassic: 'rain_cls',
			Pressure: 'pressure',
			PressureContour: 'pressure_cntr',
			Wind: 'wind',
			Temperature: 'temp',
			Snow: 'snow'
		}
	},
	JusticeMap: { // US
		// Justice Map (http://www.justicemap.org/)
		// Visualize race and income data for your community, county and country.
		// Includes tools for data journalists, bloggers and community activists.
		url: 'http://www.justicemap.org/tile/{size}/{variant}/{z}/{x}/{y}.png',
		options: {
			attribution: '(http://www.justicemap.org/terms.php)Justice Map</a>',
			// one of 'county', 'tract', 'block'
			size: 'county',
			// Bounds for USA, including Alaska and Hawaii
			bounds: [[14, -180], [72, -56]]
		},
		variants: {
			income: 'income',
			americanIndian: 'indian',
			asian: 'asian',
			black: 'black',
			hispanic: 'hispanic',
			multi: 'multi',
			nonWhite: 'nonwhite',
			white: 'white',
			plurality: 'plural'
		}
	}
*/
};

const arcoBase = 'https://w3id.org/arco/ontology/location/';
const dataBase = 'https://redaktor.me/data/Map/';
function getContext(mapType: 'MapLayer' | 'Map' = 'MapLayer') {
	const extContext: any = { tag: `${arcoBase}SiteType`, mapContext: `${arcoBase}TypeOfContext` };
	if (mapType === 'MapLayer') {
		extContext.isBaseMapOf = `${arcoBase}isBaseMapOf`;
		extContext.hasBaseMap = `${arcoBase}hasBaseMap`;
	}
	return ['https://www.w3.org/ns/activitystreams', 'https://redaktor.me/ns/redaktor', extContext];
}
function getMap(name: any, orderedItems: any[]) {
	const nameMap = typeof name === 'string' ? { en: name, de: name } : name;
	return {
		'@context': getContext('Map'),
		nameMap,
		type: ['OrderedCollection', 'Map'],
		totalItems: orderedItems.length,
		orderedItems
	};
}
const Basemap: any = basemap;
const ProviderItems = [basemap, layer].reduce((a: any[], o: any, i) => {
	for (let key in o) {
		o[key]['@context'] = getContext();
		if (!o[key].id) {
			o[key].id = `${dataBase}${key}`;
		}
		if (!o[key].tag) {
			o[key].tag = [];
		}
		o[key].tag.push(!i ? TAG.BASEMAP : TAG.REFERENCELAYER);
		o[key].type = ['MapLayer', 'Note'];
		if (o[key].hasOwnProperty('hasBaseMap')) {
			if (!Array.isArray(o[key].hasBaseMap)) {
				o[key].hasBaseMap = [o[key].hasBaseMap];
			}
			o[key].hasBaseMap = o[key].hasBaseMap.map((baseKey: string) => {
				if (basemap.hasOwnProperty(baseKey) && Basemap[baseKey].hasOwnProperty('tag')) {
					if (!o[key].tag) {
						o[key].tag = [];
					}
					if (!Array.isArray(o[key].tag)) {
						o[key].tag = [o[key].tag];
					}
					if (!Array.isArray(Basemap[baseKey].tag)) {
						Basemap[baseKey].tag = [Basemap[baseKey].tag];
					}
					o[key].tag = o[key].tag.concat(Basemap[baseKey].tag);
				}
				return {
					type: 'Link',
					href: `${dataBase}${baseKey}`,
					mediaType: 'text/html'
				};
			});
		}
		if (!!o[key].preview && typeof o[key].preview === 'string') {
			o[key].preview = {
				type: 'Link',
				href: o[key].preview,
				mediaType: 'text/html',
				rel: 'help'
			};
		}
	}
	return a.concat([o]);
}, []);

const PresetItems = [
	{
		nameMap: { en: 'Traffic', de: 'Verkehr' },
		type: ['OrderedCollection'],
		totalItems: 11,
		orderedItems: [
			getMap('OpenStreetMap', [basemap.ESRI_OPENSTREETMAP]),
			getMap('WorldStreetMap', [basemap.ESRI_WORLDSTREETMAP]),
			getMap('Wikimedia', [basemap.WIKIMEDIA]),
			getMap('OpenStreetMap Classic', [basemap.OSM]),
			getMap('OpenStreetMap Classic DE', [basemap.OSM_DE]),
			getMap('OpenStreetMap Classic FR', [basemap.OSM_FR]),
			getMap('WorldStreetMap Community POI', [basemap.ESRI_COMMUNITY]),
			getMap('Streets at night', [basemap.ESRI_STREETNIGHT]),
			getMap('Navigation', [basemap.ESRI_NAVIGATION]),
			getMap('Newspaper style', [basemap.ESRI_NEWSPAPER]),
			getMap('Carto Voyager', [basemap.CARTO_VOYAGER])
		]
	},
	{
		nameMap: { en: 'Satellite', de: 'Satellit' },
		type: ['OrderedCollection'],
		totalItems: 2,
		orderedItems: [
			getMap('ESRI World Imagery', [basemap.ESRI_WORLDIMAGERY, layer.ESRI_HYBRID_REF]),
			getMap('NASA Blue Marble', [basemap.NASA_BLUEMARBLE, layer.ESRI_HYBRID_REF])
			//TODO getMap('', [ basemap. ]), // https://www.maptiler.com/cloud/
		]
	},
	{
		nameMap: { en: 'Topography', de: 'Topographie' },
		type: ['OrderedCollection'],
		totalItems: 4,
		orderedItems: [
			getMap('ESRI Topographic', [basemap.ESRI_TOPOGRAPHIC]),
			getMap('OpenTopoMap', [basemap.OTM]),
			getMap('ESRI National Geographic', [basemap.ESRI_NATGEO]),
			getMap('Hillshading', [basemap.HILLSHADING, layer.ESRI_HYBRID_REF])
		]
	},
	{
		nameMap: { en: 'Terrain', de: 'Gelände' },
		type: ['OrderedCollection'],
		totalItems: 4,
		orderedItems: [
			getMap('ESRI Terrain', [basemap.ESRI_TERRAIN]),
			getMap('Wikimedia', [basemap.WIKIMEDIA]),
			getMap('Carto Voyager', [basemap.CARTO_VOYAGER]),
			getMap('ESRI Human Geo', [
				basemap.ESRI_HUMANGEO,
				layer.ESRI_HUMANGEO_DETAIL,
				layer.ESRI_HUMANGEO_REF
			])
		]
	},
	{
		nameMap: { en: 'Public Transport', de: 'Öffentliche Verkehrsmittel' },
		type: ['OrderedCollection'],
		totalItems: 5,
		orderedItems: [
			getMap('Open Public Transport', [basemap.OSM, layer.OPENPTMAP]),
			getMap('Open Railway', [basemap.OSM, layer.OPENRAILWAYMAP]),
			getMap('Open Sea', [basemap.OSM, layer.OPENSEAMAP]),
			getMap('ESRI Community', [basemap.ESRI_COMMUNITY]),
			getMap('Wikimedia', [basemap.WIKIMEDIA])
		]
	},
	{
		nameMap: { en: 'Bike & Hike', de: 'Fahrrad & Wandern' },
		type: ['OrderedCollection'],
		totalItems: 5,
		orderedItems: [
			getMap('CYCLOSM', [basemap.CYCLOSM]),
			getMap('HikeBike', [basemap.HIKEBIKE]),
			getMap('MTB Map', [basemap.MTBMAP]),
			getMap('HillShading', [basemap.HILLSHADING]),
			getMap('ESRI Community', [basemap.ESRI_COMMUNITY])
		]
	},
	{
		nameMap: { en: 'Nautical & Aeronautical', de: 'Nautisch & Aeronautisch' },
		type: ['OrderedCollection'],
		totalItems: 2,
		orderedItems: [
			getMap('OpenSeaMap', [basemap.OSM_HOT, layer.OPENSEAMAP]),
			getMap('ESRI Ocean', [basemap.ESRI_OCEAN])
		]
	},
	{
		nameMap: { en: 'Humanitarian', de: 'Humanitär' },
		type: ['OrderedCollection'],
		totalItems: 6,
		orderedItems: [
			getMap('OSM Humanitarian', [basemap.OSM_HOT]),
			getMap('ESRI Human Geo dark', [
				basemap.ESRI_HUMANGEO_DARK,
				layer.ESRI_HUMANGEO_DARK_DETAIL,
				layer.ESRI_HUMANGEO_DARK_REF
			]),
			getMap('ESRI Human Geo', [
				basemap.ESRI_HUMANGEO,
				layer.ESRI_HUMANGEO_DETAIL,
				layer.ESRI_HUMANGEO_REF
			]),
			getMap('OSM Humanitarian', [basemap.OSM, layer.OPENRAILWAYMAP]),
			getMap('OSM Humanitarian', [basemap.OSM, layer.OPENFIREMAP]),
			getMap('OSM Humanitarian', [basemap.OSM, layer.SAFECAST])
		]
	}

	/* TODO:
  '@context': { oneOf: 'https://w3id.org/arco/ontology/location/isBaseMapOf' },
  // "CLIMATE","WEATHER","ECONOMIC","TRANSIT","AIR"
  */
	/*
  Globus ?
  --- --- ---
  ESRI_NEWSPAPER [ 'Geopolitical', 'StreetMap', 'DesignAndArt' ]
  ESRI_NOVA [ 'DesignAndArt', 'DarkMap' ]
  ESRI_COLOREDPENCIL [ 'Geopolitical', 'DesignAndArt' ]
  ESRI_BLUEPRINT [ 'DesignAndArt', 'ContrastMap' ]
  ESRI_MIDCENTURY [ 'HistoricalOrHistoristic' ]
  ESRI_MODERNANTIQUE [ 'HistoricalOrHistoristic' ]
  ESRI_CHARTEDTERRITORY [ 'Geopolitical' ]
  CARTO_VOYAGER [ 'TerrainMap', 'StreetMap', 'ParkingMap' ]
  CARTO_POSITRON [ 'LightMap' ]
  CARTO_DARKMATTER [ 'DarkMap' ]
  STADIA_ALIDADE [ 'StreetMap', 'TerrainMap', 'LightMap' ]
  STAMEN_TONER [ 'TerrainMap', 'ContrastMap' ]
  */
];

export const Presets = {
	summaryMap: {
		en: 'Preset maps for redaktor',
		de: 'Voreingestellte Karten für redaktor'
	},
	type: ['OrderedCollection'],
	totalItems: PresetItems.length,
	orderedItems: PresetItems
};
export default {
	summaryMap: {
		en: 'All default Tile Layers for redaktor maps',
		de: 'Alle Standard Tile Layer für redaktor Karten'
	},
	type: ['OrderedCollection'],
	totalItems: ProviderItems.length,
	orderedItems: ProviderItems
};

console.log(
	JSON.stringify({
		summaryMap: {
			en: 'All default Tile Layers for redaktor maps',
			de: 'Alle Standard Tile Layer für redaktor Karten'
		},
		type: ['OrderedCollection'],
		totalItems: ProviderItems.length,
		orderedItems: ProviderItems
	})
);

// https://leafletjs.com/reference-1.6.0.html#tilelayer
/*
var isOverlay = function (providerName, layer) {
	if (layer.options.opacity && layer.options.opacity < 1) {
		return true;
	}
	var overlayPatterns = [
		'OpenWeatherMap',
		'OpenSeaMap',
		'OpenPtMap',
		'OpenRailwayMap',
		'OpenFireMap',
		'OpenMapSurfer.(Hybrid|AdminBounds|ContourLines|Hillshade|ElementsAtRisk)',
		'Stamen.Toner(Hybrid|Lines|Labels)',
		'^JusticeMap',
		'SafeCast'
	];
	return providerName.match('(' + overlayPatterns.join('|') + ')') !== null;
};
*/

//const attr = (k: keyof typeof LP) => LP[k].options.attribution;

/*


		L.TileLayer.major = L.TileLayer.extend({
			initialize: function (arg, options) {
				var providers = L.TileLayer.major.providers;

				var parts = arg.split('.');

				var providerName = parts[0];
				var variantName = parts[1];

				if (!providers[providerName]) {
					throw 'No such provider (' + providerName + ')';
				}

				var provider = {
					url: providers[providerName].url,
					options: providers[providerName].options
				};

				// overwrite values in provider from variant.
				if (variantName && 'variants' in providers[providerName]) {
					if (!(variantName in providers[providerName].variants)) {
						throw 'No such variant of ' + providerName + ' (' + variantName + ')';
					}
					var variant = providers[providerName].variants[variantName];
					var variantOptions;
					if (typeof variant === 'string') {
						variantOptions = {
							variant: variant
						};
					} else {
						variantOptions = variant.options;
					}
					provider = {
						url: variant.url || provider.url,
						options: L.Util.extend({}, provider.options, variantOptions)
					};
				}

				// replace attribution placeholders with their values from toplevel provider attribution,
				// recursively
				var attributionReplacer = function (attr) {
					if (attr.indexOf('{attribution.') === -1) {
						return attr;
					}
					return attr.replace(/\{attribution.(\w*)\}/g,
						function (match, attributionName) {
							return attributionReplacer(providers[attributionName].options.attribution);
						}
					);
				};
				provider.options.attribution = attributionReplacer(provider.options.attribution);

				// Compute final options combining provider options with any user overrides
				var layerOpts = L.Util.extend({}, provider.options, options);
				L.TileLayer.prototype.initialize.call(this, provider.url, layerOpts);
			}
		});
	*/
