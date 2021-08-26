import { tsx, create, node, dom } from '@dojo/framework/core/vdom';
// import { Base as MetaBase } from "@dojo/framework/core/meta/Base";
// import { systemLocale } from "@dojo/framework/i18n/i18n"; /* TODO */
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import idMiddleware from '../middleware/id';
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

interface MapCache {
	map: any;
	view: any;
	defaultId: string;
	searchLoaded: boolean;
	[mapId: string]: any;
}
export interface BaseMapProperties {
	id?: (keyof typeof wellKnownMapIds) | string;
}
export interface MapProperties {
	proxy?: string;
	mapId?: (keyof typeof wellKnownMapIds) | string;

	center?: LatLng;
	zoom?: number;

	hasSearch?: boolean;
}

const icache = createICacheMiddleware<MapCache>();
const factory = create({ i18n, idMiddleware, theme, icache, node }).properties<MapProperties>();

export default factory(function lMap({
	/*children,*/ properties,
	middleware: { /*i18n,*/ theme, idMiddleware, icache, node }
}) {
	const { getOrSet, get, set } = icache;
	// const { messages } = i18n.localize(bundle);
	const themedCss = theme.classes(css);
	const viewDesktopCSS = theme.viewDesktopCSS();
	const {
		proxy = 'http://localhost:8080/',
		mapId = 'fae788aa91e54244b161b59725dcbb2a',
		center = [-118.71511, 34.09042],
		zoom = 11,
		hasSearch = true
	} = properties();

	getOrSet('searchLoaded', false, false);
	getOrSet(
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
					map = getOrSet(id, BaseMap.fromId(id), false);
				} else if (/^[a-z|A-Z|0-9]{32}$/.test(id)) {
					map = getOrSet(id, new WebMap({ portalItem: { id } }), false);
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
				map.layers = get('layers') || [];
				/* set(
					'view',
					{ ...get('view'), map, ...get('mapOptions') },
					false
				); */
				set('mapId', id, false);
				set('map', map);
			}
		);
	};

	const createMap = (): any => {
		let container = document.createElement('div');
		// container.style.height = '100%';
		// container.style.width = '100%';

		container.className = [
			themedCss.map,
			viewCss.media,
			viewCss.baselined,
			viewCss.m1by1,
			viewCss.item,
			!!viewDesktopCSS && viewDesktopCSS.item,
			!!viewDesktopCSS && viewDesktopCSS.m1by1
		].join(' ')

		// if (!Math.max(0,zoom||0)) { zoom = 11 }
		getOrSet('defaultId', mapId, false);
		getOrSet('mapId', mapId, false);

		return dom({
			node: container,
			onAttach: () => {
				loadModules([
					'esri/config',
					'esri/views/MapView',
					'esri/Map',
					'esri/Basemap',
					'esri/WebMap',
					'esri/layers/GroupLayer',
					'esri/layers/MapImageLayer',
					'esri/layers/WebTileLayer',
					'esri/widgets/LayerList',
					'esri/widgets/BasemapGallery'
				]).then(([
					esriConfig,
					MapView,
					_Map,
					BaseMap,
					WebMap,
					GroupLayer,
					MapImageLayer,
					WebTileLayer,
					LayerList,
					BasemapGallery
				]) => {
					// esriConfig.request.proxyUrl = proxy;

					// Create layers
					const tileLayers = (_a: [string, string, string[]?][]) => _a.map((a) => {
						const tileLayer = new WebTileLayer({
							title: a[0],
							urlTemplate: `${proxy}${a[1]}`,
							visible: false
						});
						if (a.length > 2) { tileLayer.subDomains = a[2] }
						return tileLayer
					});
					const orderedLayers = {
						publicTransport: tileLayers([
							['Transport Map', 'tile.thunderforest.com/transport/{level}/{col}/{row}@2x.png?apikey=7c352c8ff1244dd8b732e349e0b0fe8d'],
							['ÖPNV Karte', 'tileserver.memomaps.de/tilegen/{level}/{col}/{row}.png'],
							['Open Railway Map', 'b.tiles.openrailwaymap.org/standard/{level}/{col}/{row}.png']
						]),
						bike: tileLayers([
							['Cycle Map', 'tile.thunderforest.com/cycle/{level}/{col}/{row}@2x.png?apikey=7c352c8ff1244dd8b732e349e0b0fe8d'],
							['CYCLOSM', 'dev.a.tile.openstreetmap.fr/cyclosm/{level}/{col}/{row}.png', ['a', 'b']],
							['HikeBike', 'tiles.wmflabs.org/hikebike/{level}/{col}/{row}.png'],
							['MTB Map', 'tile.mtbmap.cz/mtbmap_tiles/{level}/{col}/{row}.png'],
							['Waymarked Cycling Trails', 'tile.waymarkedtrails.org/cycling/{level}/{col}/{row}.png'],
							['Waymarked MTB Trails', 'tile.waymarkedtrails.org/cycling/{level}/{col}/{row}.png']
						]),
						hike: tileLayers([
							['HikeBike', 'tiles.wmflabs.org/hikebike/{level}/{col}/{row}.png'],
							['HillShading', 'tiles.wmflabs.org/hillshading/{level}/{col}/{row}.png'],
							['Waymarked Hiking Trails', 'tile.waymarkedtrails.org/hiking/{level}/{col}/{row}.png']
						]),
						humanitarian: tileLayers([
							['OSM Humanitarian', 'a.tile.openstreetmap.fr/hot/{level}/{col}/{row}.png', ['a', 'b']],
							['OSM OpenFireMap', 'openfiremap.org/hytiles/{level}/{col}/{row}.png'],
							['safecast', 's3.amazonaws.com/te512.safecast.org/{level}/{col}/{row}.png']
						]),
						hobby: tileLayers([
							['Waymarked Riding Trails', 'tile.waymarkedtrails.org/riding/{level}/{col}/{row}.png'],
							['Waymarked Skating', 'tile.waymarkedtrails.org/skating/{level}/{col}/{row}.png'],
							['Waymarked Slopes', 'tile.waymarkedtrails.org/slopes/{level}/{col}/{row}.png']
						])
					}
					const layers = [
						['Hobby', orderedLayers.hobby],
						['Humanitarian', orderedLayers.humanitarian],
						['Hiking', orderedLayers.hike],
						['Bike', orderedLayers.bike],
						['Public Transport', orderedLayers.publicTransport]
					].map((a) => new GroupLayer({
						title: a[0],
						layers: a[1],
						visible: true,
						visibilityMode: 'independent',
						listMode: 'show',
						opacity: 0.75
					}));
					getOrSet('layers', layers, false);

// new Map({ basemap: "dark-gray" })
					// then we load a * web map * from an id
					const map = getOrSet(
						'map',
						wellKnownMapIds.hasOwnProperty(mapId) ? BaseMap.fromId(mapId) :
							new WebMap({
								portalItem: { id: mapId },
								layers
							}),
						false
					);
					// then we load a map from an id
					// const map = new MMap({ basemap: "osm" });
					// and we show that map in a container w/ id #viewDiv

					console.log(center, zoom);
					const view = new MapView({
						...get('mapOptions'),
						map,
						container,
						navigation: {
							mouseWheelZoomEnabled: false,
							browserTouchPanEnabled: false
						},
						constraints: {}
					});



					// get('mapId')
					view.when(function() {
						console.log('view when 1');
						// Add the basemaps gallery for the more button
						container = document.createElement('div');
						container.setAttribute("id", idMiddleware.getId('basemaps'));
						container.style.display = 'none';
						const basemapGallery = new BasemapGallery({
							view,
							container
						});
					  view.ui.add(basemapGallery, { position: "top-right" });
						basemapGallery.watch('activeBasemap', function(_map: any) {
							const c = document.getElementById(idMiddleware.getId('basemaps'));
							if (c) { c.style.display = 'none' }
							set('mapId', _map.portalItem.id);
					  });
						// Create the LayerList widget with the associated actions
						// and add it to the top-right corner of the view.
						container = document.createElement('div');
						container.setAttribute("id", idMiddleware.getId('layer'));
						container.style.display = 'none';
						const layerList = new LayerList({
							view,
							container,
							showSubLayers: true,
							listItemCreatedFunction: defineActions // executes for each ListItem in the LayerList
						});


						const mapSearchNode = node.get('mapSearch')
						if (hasSearch && mapSearchNode && !get('searchLoaded')) {
							// set('searchLoaded', true, false);
							console.log('searchLoaded');
							loadModules([
								'esri/widgets/Search'
							]).then(([
								Search
							]) => {
								const showPopup = (address: string, pt: any) => {
									view.popup.open({
										title:  + Math.round(pt.longitude * 100000)/100000 + ", " +
											Math.round(pt.latitude * 100000)/100000,
										content: address,
										location: pt
									});
								}
								// Add Search widget
								container = document.createElement('div');
								mapSearchNode.innerHTML = '';
								mapSearchNode.appendChild(container);
								const search = new Search({
									view,
									container
								});
								// view.ui.add(search, "top-right"); // Add to the map

								// Find address
								view.on("click", function(evt: Event & {mapPoint: any}){
									search.clear();
									view.popup.clear();
									if (search.activeSource) {
										const geocoder = search.activeSource.locator; // World geocode service
										const params = {
											location: evt.mapPoint
										};
										geocoder.locationToAddress(params)
											.then(function({address}: {address?: string}) { // Show the address found
												address && showPopup(address, evt.mapPoint);
											}, function(err: Error) { // Show no address found
												showPopup("No address found.", evt.mapPoint);
											});
									}
								});
							});
						}

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
						// getOrSet('view', view);
					});

					view.watch('stationary', () => {
						console.log(view.center.longitude, view.center.latitude, view.zoom);
						set(
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
		}});
	};

	const btnProps: any = {
		color: 'secondary',
		spaced: false,
		responsive: true,
		animated: false
	};
	const baseIds = [
		{icon: 'map', id: get('defaultId')}, // 'fae788aa91e54244b161b59725dcbb2a' /* osm daylight */
		{icon: 'mapSat', id: 'da10cf4ba254469caf8016cd66369157'}, /* world image clarity */
		{icon: 'mapStreet', id: '9d150cad73e248c29c7149e84915a1c5'}, /* OSM Esri World Street Map style */
		/*	'd167e0b1e9ed4abf982ab1aecc97e3ce' w relief
				'55ebf90799fa4a3fa57562700a68c405' World Street Map */
		{icon: 'mapTopo', id: '67372ff42cd145319639a99152b15bc3'},
	];

/* https://www.arcgis.com/sharing/rest/content/items/
	6cf42d6ad9e3480696c5021546e76fab	sat img
	34a7f521276a40ddabe5b012c3b1f607	hybrid img
	bc68233b448b4a39a10e2aca8ea48fdb	street
	03714c4eac0e4fca8e3b863ec768bcf2	topo
	7ac83bff30ea49c0a5d1b3a21c8cced4	navigation
	4aa1788830fd4adeaa2561555189c9bd	streetnight
	f8cf1a4115b9416680d35f8bf22bb63e	terrain labels webmap
	d0ee2af09e834c5cad92bed939006571	lightgray
	e68ff0b5a0f84cfda9acf3686dcce492	darkgray
	f0c119410f5e4d54be7545657f9768cb	ocean
	9213bb45776e48edab35ac64a6fa57f1	nat. geo.
	83fcab56ac6142668f4828984b347cc2	OSM
	a149cb017b044027bb29a44dfac62063	charted territory worldmap
	06743c3f4dee46cc8aafd9d9888ec668	community map
	d27314802fd7456d993679d0239f1b99	navigation dark
	abc33869ef34485bac55dfd588d8f2db	newspaper
	fc841e1f61cf4c7c948192a0e40190d1	human geography
	8de0609893384ba687eae0a6ce2204c0	human geography dark
	7823927a547b40be8aaf65b0f06af990	modern Antique
	682bfcfcc0d347019396090ba33ee6bf	mid Century
	a504e8b3f0c047a19e76d80cc9cc8cd0	nova
	a4c0ba7feb364a53a4adb804cb6fd182	colored pencil
	13b3e755300a4a9c86e0ce7583817e48	firefly imagery hybrid
*/

	const curId = get('mapId');
	const extraClasses = {
		button: {'@redaktor/widgets/button': { root: [themedCss.button] }},
		basemapButton: {'@redaktor/widgets/button': { root: [themedCss.button, themedCss.basemapButton] }},
		layerButton: {'@redaktor/widgets/button': { root: [themedCss.button, themedCss.layerButton] }},
		icon: {'@redaktor/widgets/icon': { icon: [themedCss.mapSwitchIcon] }}
	}
	const getElements = (...cacheKeys: string[]) =>
	 	cacheKeys.map((k) => document.getElementById(idMiddleware.getId(k)));
console.log('map render');
	return (
		<div key="root"
			classes={[
				themedCss.root,
				viewCss.item,
				!!viewDesktopCSS && viewDesktopCSS.item
			]}
		>
			<div key="mapSearch"></div>
			<div key="mapSwitch" classes={[themedCss.mapSwitch]}>
				{baseIds.map((o, i) =>
					<Button {...btnProps} classes={extraClasses.button} onClick={switchMap(o.id)} disabled={curId === o.id}>
						<Icon classes={extraClasses.icon} size="xxl" type={(baseIds[i].icon as any)} />
					</Button>
				)}
				{([
					['basemaps', 'layer', extraClasses.basemapButton, 'plus'],
					['layer', 'basemaps', extraClasses.layerButton, 'stack']
				] as [string, string, any, 'plus'|'stack'][]).map((a) =>
					<Button {...btnProps} design="outlined" classes={a[2]}
						onClick={() => {
							const [toggle, hidden] = getElements(a[0],a[1]);
							if (toggle) {
								toggle.style.display = (toggle.style.display === 'block') ? 'none' : 'block'
							}
							if (hidden) { hidden.style.display = 'none' }
						}}
					>
						<Icon classes={extraClasses.icon} size="xxl" type={a[3]} />
					</Button>
				)}
			</div>

			{node.get('mapSearch') && createMap()}
		</div>
	);
});


	// const { center } = properties();
	/*
	const actionItems = ACTION.map((k) => {
		const label = m.hasOwnProperty(`see_${k}`) ? m[`see_${k}`] : k;
		return { label, value: k }
	});
	*/
	// const el = ElementMeta.get('mapcontainer')


	/*
  imagery meta  c03a526d94704bfb839445e80de95495
  nav           c50de463235e4161b206d000587af18b

	<span onclick={switchMap('https://www.wanderreitkarte.de/topo/{level}/{col}/{row}.png')}>c</span>
  */

/* new WebTileLayer({
urlTemplate: '${proxy}',
// https://sebilasse.maps.arcgis.com/home/webmap/viewer.html?webmap=a7bca5f65fb74daba6dedacb7a90d115
title: 'ESRI Community',
visible: false
})
*/

/*
7 {en: "Humanitarian", de: "Humanitär"}
[[{"en":"OSM Humanitarian","de":"OSM Humanitarian"},["https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"]],
[{"en":"ESRI Human Geo dark","de":"ESRI Human Geo dark"},["https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf","https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf","https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf"]],
[{"en":"ESRI Human Geo","de":"ESRI Human Geo"},["https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf","https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf","https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf"]],
[{"en":"OSM Humanitarian","de":"OSM Humanitarian"},["https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png","https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"]],
[{"en":"OSM Humanitarian","de":"OSM Humanitarian"},["https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png","http://openfiremap.org/hytiles/{z}/{x}/{y}.png"]],
[{"en":"OSM Humanitarian","de":"OSM Humanitarian"},["https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png","https://s3.amazonaws.com/te512.safecast.org/{z}/{x}/{y}.png"]]]

*/
/*
6 {en: "Nautical & Aeronautical", de: "Nautisch & Aeronautisch"}
[[{"en":"OpenSeaMap","de":"OpenSeaMap"},["https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png","https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"]],
[{"en":"ESRI Ocean","de":"ESRI Ocean"},["https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf"]]]


8 ACCESSIBILITY >
*/
