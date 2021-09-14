export interface MapConfig {
	map: any;
	basemaps: {
		icon: string;
		id: string;
	}[];
	tileLayers: {
		title: string;
		layers: any[];
		visible: boolean;
		visibilityMode: 'independent' | 'exclusive';
		listMode: 'show' | 'hide'| 'hide-children';
		opacity: number;
	}[];
	featureReduction: any;
	wellKnownMapIds: {[key: string]: 1}
}

const config: MapConfig = {
	map: {
		navigation: {
			mouseWheelZoomEnabled: false,
			browserTouchPanEnabled: false
		},
		popup: {
			collapseEnabled: false,
			collapsed: false,
			headingLevel: 4
		},
		constraints: {}
	},
	basemaps: [
		{icon: 'map', id: 'fae788aa91e54244b161b59725dcbb2a'}, // 'fae788aa91e54244b161b59725dcbb2a' /* osm daylight */
		{icon: 'mapSat', id: 'da10cf4ba254469caf8016cd66369157'}, /* world image clarity */
		{icon: 'mapStreet', id: '9d150cad73e248c29c7149e84915a1c5'}, /* OSM Esri World Street Map style */
		/*	'd167e0b1e9ed4abf982ab1aecc97e3ce' w relief
				'55ebf90799fa4a3fa57562700a68c405' World Street Map */
		{icon: 'mapTopo', id: '67372ff42cd145319639a99152b15bc3'},
	],
	tileLayers: [{
		title: 'publicTransport',
		layers: [
			['Transport Map', 'tile.thunderforest.com/transport/{level}/{col}/{row}@2x.png?apikey=7c352c8ff1244dd8b732e349e0b0fe8d'],
			['ÖPNV Karte', 'tileserver.memomaps.de/tilegen/{level}/{col}/{row}.png'],
			['Open Railway Map', 'b.tiles.openrailwaymap.org/standard/{level}/{col}/{row}.png']
		]
	}, {
		title: 'bike',
		layers: [
			['Cycle Map', 'tile.thunderforest.com/cycle/{level}/{col}/{row}@2x.png?apikey=7c352c8ff1244dd8b732e349e0b0fe8d'],
			['CYCLOSM', 'dev.a.tile.openstreetmap.fr/cyclosm/{level}/{col}/{row}.png', ['a', 'b']],
			['HikeBike', 'tiles.wmflabs.org/hikebike/{level}/{col}/{row}.png'],
			['MTB Map', 'tile.mtbmap.cz/mtbmap_tiles/{level}/{col}/{row}.png'],
			['Waymarked Cycling Trails', 'tile.waymarkedtrails.org/cycling/{level}/{col}/{row}.png'],
			['Waymarked MTB Trails', 'tile.waymarkedtrails.org/cycling/{level}/{col}/{row}.png']
		]
	}, {
		title: 'hike',
		layers: [
			['HikeBike', 'tiles.wmflabs.org/hikebike/{level}/{col}/{row}.png'],
			['HillShading', 'tiles.wmflabs.org/hillshading/{level}/{col}/{row}.png'],
			['Waymarked Hiking Trails', 'tile.waymarkedtrails.org/hiking/{level}/{col}/{row}.png']
		]
	}, {
		title: 'humanitarian',
		layers: [
			['OSM Humanitarian', 'a.tile.openstreetmap.fr/hot/{level}/{col}/{row}.png', ['a', 'b']],
			['OSM OpenFireMap', 'openfiremap.org/hytiles/{level}/{col}/{row}.png'],
			['safecast', 's3.amazonaws.com/te512.safecast.org/{level}/{col}/{row}.png']
		]
	}, {
		title: 'hobby',
		layers: [
			['Waymarked Riding Trails', 'tile.waymarkedtrails.org/riding/{level}/{col}/{row}.png'],
			['Waymarked Skating', 'tile.waymarkedtrails.org/skating/{level}/{col}/{row}.png'],
			['Waymarked Slopes', 'tile.waymarkedtrails.org/slopes/{level}/{col}/{row}.png']
		]
	}].map((o) => ({
		...o,
		visible: true,
		visibilityMode: 'independent',
		listMode: 'show',
		opacity: 0.75
	})),
	featureReduction: {
		type: "cluster",
		clusterRadius: "48px",
		clusterMaxSize: "32px",
		clusterMinSize: "24px",
		labelingInfo: [{
			labelExpressionInfo: {
				expression: "Text($feature.cluster_count, '#,###')"
			},
			symbol: {
				type: "text",
				color: "#1988d1"
			},
			labelPlacement: "above-center"
		}],
		popupTemplate: {
			title: "Cluster ({cluster_count} objects)",
			fieldInfos: [{
				fieldName: "cluster_count",
				format: {
					places: 0,
					digitSeparator: true
				}
			}]
		}
	},
	wellKnownMapIds: {
		topo: 1,
		streets: 1,
		satellite: 1,
		hybrid: 1,
		gray: 1,
		oceans: 1,
		osm: 1,
		terrain: 1,
		'national-geographic': 1,
		'dark-gray': 1,
		'dark-gray-vector': 1,
		'gray-vector': 1,
		'streets-vector': 1,
		'streets-night-vector': 1,
		'streets-navigation-vector': 1,
		'topo-vector': 1,
		'streets-relief-vector': 1
	}
}

export default config;
