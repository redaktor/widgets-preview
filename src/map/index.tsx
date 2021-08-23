import { tsx, create, dom } from '@dojo/framework/core/vdom';
// import { Base as MetaBase } from "@dojo/framework/core/meta/Base";
// import { systemLocale } from "@dojo/framework/i18n/i18n"; /* TODO */
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import theme from '../middleware/theme';
import { LatLng } from './interfaces';
import i18n from '@dojo/framework/core/middleware/i18n';
import Button from '../Button';
import Icon from '../Icon';
// import Select from '@redaktor/widgets/select';
// import * as UriTemplate from 'uritemplate';

import Providers from './mapProviders';
import { loadModules } from 'esri-loader';
// import bundle from './nls/';
import * as viewCss from '../theme/material/_view.m.css';
import * as css from './styles/Map.m.css';

/* // TODO:
https://docs.graphhopper.com
https://graphhopper.com/api/1/examples/#routing

https://osmbuildings.org/documentation/leaflet/

https://thenounproject.com/xinhstudio/collection/saigon-attractions-map/
https://thenounproject.com/YuguDesign/collection/map-location-pointers-glyphs/
https://thenounproject.com/vectormarket01/collection/travelling/
*/

type LatLngArray = [number, number] | [number, number, number];
function isNr(n: any) {
	return typeof n === 'number' && !isNaN(n);
}
function latLngFromO(o: any): LatLngArray {
	let a: LatLngArray = [0, 0];
	if (isNr(o.latitude) && isNr(o.longitude)) {
		const alt = typeof o.altitude === 'number' && !isNaN(o.altitude) && o.altitude;
		a = !!alt ? [o.latitude, o.longitude, alt] : [o.latitude, o.longitude];
	} else if (isNr(o.lat)) {
		const lon = isNr(o.lon) ? o.lon : isNr(o.lng) ? o.lng : null;
		if (!isNr(lon)) {
			return a;
		}
		const alt = isNr(o.alt) && o.alt;
		a = !!alt ? [o.lat, lon, alt] : [o.lat, lon];
	}
	return a;
}

// Creates actions in the LayerList.
function defineActions(event: any) { /* TODO */
	// The event object contains an item property.
	// is is a ListItem referencing the associated layer
	// and other properties. You can control the visibility of the
	// item, its title, and actions using this object.

	const item = event.item;
	// Opens the layer's item in the LayerList programmatically
	item.open = true;

	if (item.title === 'US Demographics') {
		// An array of objects defining actions to place in the LayerList.
		// By making this array two-dimensional, you can separate similar
		// actions into separate groups with a breaking line.
		item.actionsSections = [
			[
				{
					title: 'Go to full extent',
					className: 'esri-icon-zoom-out-fixed',
					id: 'full-extent'
				},
				{
					title: 'Layer information',
					className: 'esri-icon-description',
					id: 'information'
				}
			],
			[
				{
					title: 'Increase opacity',
					className: 'esri-icon-up',
					id: 'increase-opacity'
				},
				{
					title: 'Decrease opacity',
					className: 'esri-icon-down',
					id: 'decrease-opacity'
				}
			]
		];
	}
}
/*
function createLeafletLatLng(props: Partial<Props>) {
	const centerArray: LatLngArray = Array.isArray(props.center) ? props.center :
		(!!props.center && typeof props.center === 'object' ? latLngFromO(props.center) : [0, 0]);
	return latLng(centerArray)
}
*/
interface MapCache {
	map: any;
	view: any;
	defaultId: string;
	[mapId: string]: any;
}

const wellKnownMapIds = {
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
};

export interface BaseMapProperties {
	id?: (keyof typeof wellKnownMapIds) | string;
}
export interface MapProperties {
	proxy?: string;
	mapId?: (keyof typeof wellKnownMapIds) | string;

	center?: LatLng;
	zoom?: number;
}

const icache = createICacheMiddleware<MapCache>();
const factory = create({ i18n, theme, icache }).properties<MapProperties>();

export default factory(function lMap({
	/*children,*/ properties,
	middleware: { /*i18n,*/ theme, icache }
}) {
	// const { messages } = i18n.localize(bundle);
	const themedCss = theme.classes(css);
	const viewDesktopCSS = theme.viewDesktopCSS();
	const {
		proxy = 'http://localhost:8080/',
		mapId = 'fae788aa91e54244b161b59725dcbb2a',
		center = [-118.71511, 34.09042],
		zoom = 11
	} = properties();

	icache.getOrSet(
		'mapOptions',
		{
			center: Array.isArray(center) ? center : [-118.71511, 34.09042], // TODO lat lng
			zoom: !Math.max(0, zoom || 0) ? 11 : zoom
		},
		false
	);
	const switchMap = (
		id: string = mapId,
		subDomains: string[] = ['a', 'b', 'c'],
		title: string = ''
	) => () => {
		loadModules(['esri/Map', 'esri/Basemap', 'esri/WebMap', 'esri/layers/WebTileLayer']).then(
			([_Map, BaseMap, WebMap, WebTileLayer]) => {
				let map;
				if (wellKnownMapIds.hasOwnProperty(id)) {
					map = icache.getOrSet(id, BaseMap.fromId(id), false);
				} else if (/^[a-z|A-Z|0-9]{32}$/.test(id)) {
					map = icache.getOrSet(id, new WebMap({ portalItem: { id } }), false);
				} else if (typeof id === 'string') {
					if (!proxy && id.substr(0, 4) === 'http') {
						id = id.split('://')[1];
					}
					try {
						const urlTemplate = id;
						map = new _Map({
							basemap: new BaseMap({
								id,
								title,
								baseLayers: [new WebTileLayer({ urlTemplate, subDomains, title })]
							})
						});
					} catch (e) {
						console.log(`Could not load map: ${id}`);
						console.error(e);
					}
				}
				map.layers = icache.get('layers') || [];
				icache.set(
					'view',
					{ ...icache.get('view'), map, ...icache.get('mapOptions') },
					false
				);
				icache.set('mapId', id, false);
				icache.set('map', map);
			}
		);
	};

	const createMap = (): any => {
		const node = document.createElement('div');
		// node.style.height = '100%';
		// node.style.width = '100%';

		node.className = [
			themedCss.map,
			viewCss.media,
			viewCss.item,
			viewCss.baselined,
			viewCss.m1by1,
			!!viewDesktopCSS && viewDesktopCSS.item,
			!!viewDesktopCSS && viewDesktopCSS.m1by1
		].join(' ')

		// if (!Math.max(0,zoom||0)) { zoom = 11 }
		icache.getOrSet('defaultId', mapId, false);
		icache.getOrSet('mapId', mapId, false);

		return dom({
			node,
			onAttach: () => {
				loadModules([
					'esri/config',
					'esri/views/MapView',
					'esri/Map',
					'esri/WebMap',
					'esri/layers/GroupLayer',
					'esri/layers/MapImageLayer',
					'esri/layers/WebTileLayer',
					'esri/widgets/LayerList'
				])
					.then(
						([
							esriConfig,
							MapView,
							_Map,
							WebMap,
							GroupLayer,
							MapImageLayer,
							WebTileLayer,
							LayerList
						]) => {
							// esriConfig.request.proxyUrl = proxy;
							console.log(`${proxy}tile.thunderforest.com`);
							// Create layers
							const publicTransportLayers = [
								new WebTileLayer({
									urlTemplate:
										`${proxy}tile.thunderforest.com/transport/{level}/{col}/{row}@2x.png?apikey=7c352c8ff1244dd8b732e349e0b0fe8d`,
									title: 'Transport Map',
									visible: false
								}),
								new WebTileLayer({
									urlTemplate:
										`${proxy}tileserver.memomaps.de/tilegen/{level}/{col}/{row}.png`,
									title: 'ÖPNV Karte',
									visible: false
								}),
								new WebTileLayer({
									urlTemplate:
										`${proxy}b.tiles.openrailwaymap.org/standard/{level}/{col}/{row}.png`,
									title: 'Open Railway Map',
									visible: false
								})
							];

							const bikeLayers = [
								new WebTileLayer({
									urlTemplate:
										`${proxy}tile.thunderforest.com/cycle/{level}/{col}/{row}@2x.png?apikey=7c352c8ff1244dd8b732e349e0b0fe8d`,
									title: 'Cycle Map',
									visible: false
								}),
								new WebTileLayer({
									urlTemplate:
										`${proxy}dev.a.tile.openstreetmap.fr/cyclosm/{level}/{col}/{row}.png`,
									subDomains: ['a', 'b'],
									title: 'CYCLOSM',
									visible: false
								}),
								new WebTileLayer({
									urlTemplate:
										`${proxy}tiles.wmflabs.org/hikebike/{level}/{col}/{row}.png`,
									title: 'HikeBike',
									visible: false
								}),
								new WebTileLayer({
									urlTemplate:
										`${proxy}tile.mtbmap.cz/mtbmap_tiles/{level}/{col}/{row}.png`,
									title: 'MTB Map',
									visible: false
								}),
								new WebTileLayer({
									urlTemplate:
										`${proxy}tile.waymarkedtrails.org/cycling/{level}/{col}/{row}.png`,
									title: 'Waymarked Cycling Trails',
									visible: false
								}),
								new WebTileLayer({
									urlTemplate:
										`${proxy}tile.waymarkedtrails.org/cycling/{level}/{col}/{row}.png`,
									title: 'Waymarked MTB Trails',
									visible: false
								})
							];

							const hikeLayers = [
								new WebTileLayer({
									urlTemplate:
										`${proxy}tiles.wmflabs.org/hikebike/{level}/{col}/{row}.png`,
									title: 'HikeBike',
									visible: false
								}),
								new WebTileLayer({
									urlTemplate:
										`${proxy}tiles.wmflabs.org/hillshading/{level}/{col}/{row}.png`,
									title: 'HillShading',
									visible: false
								}),
								new WebTileLayer({
									urlTemplate: '${proxy}',
									// https://sebilasse.maps.arcgis.com/home/webmap/viewer.html?webmap=a7bca5f65fb74daba6dedacb7a90d115
									title: 'ESRI Community',
									visible: false
								}),
								new WebTileLayer({
									urlTemplate:
										`${proxy}tile.waymarkedtrails.org/hiking/{level}/{col}/{row}.png`,
									title: 'Waymarked Hiking Trails',
									visible: false
								})
							];

							const humanitarianLayers = [
								/*
						7 {en: "Humanitarian", de: "Humanitär"}
						[[{"en":"OSM Humanitarian","de":"OSM Humanitarian"},["https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"]],
						[{"en":"ESRI Human Geo dark","de":"ESRI Human Geo dark"},["https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf","https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf","https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf"]],
						[{"en":"ESRI Human Geo","de":"ESRI Human Geo"},["https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf","https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf","https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf"]],
						[{"en":"OSM Humanitarian","de":"OSM Humanitarian"},["https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png","https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"]],
						[{"en":"OSM Humanitarian","de":"OSM Humanitarian"},["https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png","http://openfiremap.org/hytiles/{z}/{x}/{y}.png"]],
						[{"en":"OSM Humanitarian","de":"OSM Humanitarian"},["https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png","https://s3.amazonaws.com/te512.safecast.org/{z}/{x}/{y}.png"]]]

						*/
								new WebTileLayer({
									urlTemplate:
										`${proxy}a.tile.openstreetmap.fr/hot/{level}/{col}/{row}.png`,
									subDomains: ['a', 'b'],
									title: 'OSM Humanitarian',
									visible: false
								}),
								new WebTileLayer({
									urlTemplate:
										`${proxy}openfiremap.org/hytiles/{level}/{col}/{row}.png`,
									title: 'OSM OpenFireMap',
									visible: false
								}),
								new WebTileLayer({
									urlTemplate:
										`${proxy}s3.amazonaws.com/te512.safecast.org/{level}/{col}/{row}.png`,
									title: 'safecast',
									visible: false
								})
							];

							const hobbyLayers = [
								new WebTileLayer({
									urlTemplate:
										`${proxy}tile.waymarkedtrails.org/riding/{level}/{col}/{row}.png`,
									title: 'Waymarked Riding Trails',
									visible: false
								}),
								new WebTileLayer({
									urlTemplate:
										`${proxy}tile.waymarkedtrails.org/skating/{level}/{col}/{row}.png`,
									title: 'Waymarked Skating',
									visible: false
								}),
								new WebTileLayer({
									urlTemplate:
										`${proxy}tile.waymarkedtrails.org/slopes/{level}/{col}/{row}.png`,
									title: 'Waymarked Slopes',
									visible: false
								})
							];
							/*
					6 {en: "Nautical & Aeronautical", de: "Nautisch & Aeronautisch"}
					[[{"en":"OpenSeaMap","de":"OpenSeaMap"},["https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png","https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"]],
					[{"en":"ESRI Ocean","de":"ESRI Ocean"},["https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf"]]]


					8 ACCESSIBILITY >
					*/

							const layers = [
								new GroupLayer({
									title: 'Humanitarian',
									visible: true,
									visibilityMode: 'independent',
									opacity: 0.75,
									layers: humanitarianLayers
								}),
								new GroupLayer({
									title: 'Hiking',
									visible: true,
									visibilityMode: 'independent',
									opacity: 0.75,
									layers: hikeLayers
								}),
								new GroupLayer({
									title: 'Bike',
									visible: true,
									visibilityMode: 'independent',
									opacity: 0.75,
									layers: bikeLayers
								}),
								new GroupLayer({
									title: 'Public Transport',
									visible: true,
									visibilityMode: 'independent',
									opacity: 0.75,
									listMode: 'show',
									layers: publicTransportLayers
								})
							];
							icache.getOrSet('layers', layers, false);

							// then we load a * web map * from an id
							const map = icache.getOrSet(
								'map',
								new WebMap({
									portalItem: {
										// autocasts as new PortalItem()
										id: mapId // 'fae788aa91e54244b161b59725dcbb2a'
									},
									layers
								}),
								false
							);
							// then we load a map from an id
							// const map = new MMap({ basemap: "osm" });
							// and we show that map in a container w/ id #viewDiv

							console.log(center, zoom);
							const view = new MapView({
								map,
								...icache.get('mapOptions'),
								container: node,
								navigation: {
									mouseWheelZoomEnabled: false,
									browserTouchPanEnabled: false
								},
								constraints: {}
							});

							view.when(function() {
								console.log('view when 1');
								// Create the LayerList widget with the associated actions
								// and add it to the top-right corner of the view.
								const layerList = new LayerList({
									view: view,
									showSubLayers: true,
									// executes for each ListItem in the LayerList
									listItemCreatedFunction: defineActions
								});

								// Event listener that fires each time an action is triggered
								layerList.on('trigger-action', function(event: any) {
									// The layer visible in the view at the time of the trigger.
									const visibleLayer = layers.filter((l) => l.visible)[0];

									// Capture the action id.
									const id = event.action.id;

									if (id === 'full-extent') {
										// if the full-extent action is triggered then navigate
										// to the full extent of the visible layer
										view.goTo(visibleLayer.fullExtent).catch(function(
											error: Error
										) {
											if (error.name !== 'AbortError') {
												console.error(error);
											}
										});
									} else if (id === 'information') {
										// if the information action is triggered, then
										// open the item details page of the service layer
										window.open(visibleLayer.url);
									} else if (id === 'increase-opacity') {
										// if the increase-opacity action is triggered, then
										// increase the opacity of the GroupLayer by 0.25

										if (visibleLayer.opacity < 1) {
											visibleLayer.opacity += 0.25;
										}
									} else if (id === 'decrease-opacity') {
										// if the decrease-opacity action is triggered, then
										// decrease the opacity of the GroupLayer by 0.25

										if (visibleLayer.opacity > 0) {
											visibleLayer.opacity -= 0.25;
										}
									}
								});
								// Add widget to the top right corner of the view
								view.ui.add(layerList, 'top-right');
								icache.getOrSet('view', view);
							});

							view.watch('stationary', () => {
								console.log(view.center.longitude, view.center.latitude, view.zoom);
								icache.set(
									'mapOptions',
									{
										center: view
											? [view.center.longitude, view.center.latitude]
											: center,
										zoom: view ? view.zoom : zoom
									},
									false
								);
							});
						}
					)
					.catch((err) => {
						// handle any errors
						console.error(err);
					});
			}
		});
	};

	// const { center } = properties();
	/*
	const actionItems = ACTION.map((k) => {
		const label = m.hasOwnProperty(`see_${k}`) ? m[`see_${k}`] : k;
		return { label, value: k }
	});
	*/
	// const el = ElementMeta.get('mapcontainer')
	/*
  osm           fae788aa91e54244b161b59725dcbb2a
  imagery meta  c03a526d94704bfb839445e80de95495
  imagery       da10cf4ba254469caf8016cd66369157
  streets       55ebf90799fa4a3fa57562700a68c405
  topo          67372ff42cd145319639a99152b15bc3
  nav           c50de463235e4161b206d000587af18b

	<span onclick={switchMap('https://www.wanderreitkarte.de/topo/{level}/{col}/{row}.png')}>c</span>
  */
	const btnProps: any = {
		color: 'secondary',
		spaced: false,
		responsive: true,
		animated: false
	};
	const baseIds = [
		icache.get('defaultId'),
		'fae788aa91e54244b161b59725dcbb2a',
		'da10cf4ba254469caf8016cd66369157',
		'55ebf90799fa4a3fa57562700a68c405',
		'67372ff42cd145319639a99152b15bc3'
	];
	const curId = icache.get('mapId');

	return (
		<div key="root" classes={[
			themedCss.root
		]}>
			<div key="mapSwitch" classes={[themedCss.mapSwitch]}>
				<Button
					onClick={switchMap(baseIds[0])}
					disabled={curId === baseIds[0]}
					{...btnProps}
				>
					<Icon size="xxl" type="map" />
				</Button>
				<Button
					onClick={switchMap(baseIds[1])}
					disabled={curId === baseIds[1]}
					{...btnProps}
				>
					<Icon size="xxl" type="mapOSM" />
				</Button>
				<Button
					onClick={switchMap(baseIds[2])}
					disabled={curId === baseIds[2]}
					{...btnProps}
				>
					<Icon size="xxl" type="mapSat" />
				</Button>
				<Button
					onClick={switchMap(baseIds[3])}
					disabled={curId === baseIds[3]}
					{...btnProps}
				>
					<Icon size="xxl" type="mapStreet" />
				</Button>
				<Button
					onClick={switchMap(baseIds[4])}
					disabled={curId === baseIds[4]}
					{...btnProps}
				>
					<Icon size="xxl" type="mapTopo" />
				</Button>
			</div>
			{createMap()}
		</div>
	);
});
