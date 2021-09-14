import { ActivityPubObject, ActivityPubObjectNormalized } from '../common/interfaces';
import { LngLat } from './interfaces';
import { tsx, create, node, dom } from '@dojo/framework/core/vdom';
import { loadModules } from 'esri-loader';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { apToGeoJSON, latLngStr, lngLatFromO, radiusFromO, isNr } from './util';
import idMiddleware from '../middleware/id';
import theme from '../middleware/theme';
import i18nActivityPub from '../middleware/i18nActivityPub';
import Button from '../Button';
import Icon from '../Icon';
import config, { MapConfig } from './config';
import { uniqueValueInfos, centerSymbol, centerSymbolRadius, radiusSymbol } from './configMarker';
import * as viewCss from '../theme/material/_view.m.css';
import * as iconCss from '../theme/material/icon.m.css';
import * as css from './styles/Map.m.css';
// import { Base as MetaBase } from "@dojo/framework/core/meta/Base";
// import { systemLocale } from "@dojo/framework/i18n/i18n"; /* TODO */
// import Select from '@redaktor/widgets/select';
// import * as UriTemplate from 'uritemplate';
// import Providers from './mapProviders';
// import bundle from './nls/';

/* // TODO:
https://docs.graphhopper.com
https://graphhopper.com/api/1/examples/#routing

https://osmbuildings.org/documentation/leaflet/

https://thenounproject.com/xinhstudio/collection/saigon-attractions-map/
https://thenounproject.com/YuguDesign/collection/map-location-pointers-glyphs/
https://thenounproject.com/vectormarket01/collection/travelling/
*/

export function setActivityPubMap(view: any, ap: any, setLocation = true) {
	if (!ap || typeof ap.latitude !== 'number' || typeof ap.longitude !== 'number') {
		return
	}
	const hasCenter = isNr(ap.latitude) && isNr(ap.longitude) && view.graphics && !!view.graphics.items.length;
	if (hasCenter && setLocation) {
		const hasRadius = isNr(ap.radius) && view.graphics && view.graphics.items && view.graphics.items.length > 1;
		const [x, y] = lngLatFromO(ap);
		const geometry = { type: "point", x, y };
		view.center = [x, y];
		view.graphics.items[0].set('geometry', geometry);
		view.graphics.items[0].set('symbol', hasRadius ? centerSymbolRadius : centerSymbol);
		if (hasRadius) {
			view.graphics.items[1].set('visible', true);
			loadModules([ 'esri/geometry/Circle' ]).then(([Circle]) => {
				const {radius, radiusUnit} = radiusFromO(ap);
				view.graphics.items[1].set('geometry', new Circle({
					center: geometry,
					radius,
					radiusUnit,
					geodesic: true,
					numberOfPoints: 100
				}));
			});
		} else {
			view.graphics.items[1].set('visible', false);
		}
	}

	if (view.geojsonMapping && isNr(view.geojsonMapping.dict[ap.id])) {
		const { properties: p } = view.geojsonMapping.geojson.features[view.geojsonMapping.dict[ap.id]];
		if (!!p) {
			console.log('properties', p);
			const { apType, latLng, name, geoMeta, summary } = p;
			const copyIcon = `<i class="${iconCss.icon} ${iconCss.eyedropper}"></i>`;
			const apIcon = `<i class="${iconCss.icon} ${(iconCss as any)[apType.toLowerCase()]}"></i>`;
			view.popup.clear();
			view.popup.open({
				title: `<span class="${css.smallTypo}">${copyIcon} ${latLng}</span><br />${name}`,
				content: `${apIcon} <span class="${css.smallTypo}">${geoMeta}<br />${summary}</span>`
			});
			/*
			const el = document.createElement('textarea');
			el.value = 'Lorem Ipsum';
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
			*/
		}

	}

};


const { wellKnownMapIds } = config;

/* TODO */
// Creates actions in the LayerList.
function defineLayerActions(event: any) {
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

interface MapCache {
	map: any;
	view: any;
	defaultId: string;
	searchLoaded: boolean;
	isCenterUpdate: boolean;
	centerMarkerVisible: boolean;
	radiusVisible: boolean;
	apVisible: boolean;
	[mapId: string]: any;
}
export interface BaseMapProperties {
	id?: (keyof typeof wellKnownMapIds) | string;
}

export interface MapProperties extends ActivityPubObject {
	proxy?: string;
	mapId?: (keyof typeof wellKnownMapIds) | string;
	mapOptions?: MapConfig['map'];
	center?: ActivityPubObjectNormalized | LngLat;
	zoom?: number;
	featureReduction?: MapConfig['featureReduction'];
	basemaps?: MapConfig['basemaps'];
	tileLayers?: MapConfig['tileLayers'];
	hasCenterMarker?: boolean;
	hasSearch?: boolean;
	onView?: (view: any) => any;
	onActivityPubLocation?: (attributes: {id: string, pointer: string, [k: string]: any}) => any;
	/* use geojson, overrides activitypub */
	geojson?: any;
}

const icache = createICacheMiddleware<MapCache>();
const factory = create({ i18nActivityPub, idMiddleware, theme, icache, node }).properties<MapProperties>();

export default factory(function lMap({
	middleware: { i18nActivityPub, theme, idMiddleware, icache, node }
}) {
	const { getOrSet, get, set } = icache;
	// const { messages } = i18n.localize(bundle);
	const themedCss = theme.classes(css);
	const viewDesktopCSS = theme.viewDesktopCSS();
	const {
		center: c = [-118.71511, 34.09042],
		zoom = 11,
		proxy = 'http://localhost:8080/',
		mapId = 'fae788aa91e54244b161b59725dcbb2a',
		mapOptions = config.map,
		featureReduction = config.featureReduction,
		basemaps = config.basemaps,
		tileLayers = config.tileLayers,
		hasCenterMarker = false,
		hasSearch = false,
		onView,
		onActivityPubLocation,
		geojson: g,
		...ap
	} = i18nActivityPub.normalized<MapProperties>();

	const center = Array.isArray(c) ? c : lngLatFromO(c);
	const {radius, radiusUnit} = radiusFromO(c);
	const geojson = (!!g && !!g.type) ? g : (!!ap.type && apToGeoJSON(ap));

	getOrSet('searchLoaded', false, false);
	getOrSet('mapOptions', { center, zoom: !Math.max(0, zoom || 0) ? 11 : zoom }, false);
	getOrSet('apVisible', true, false);
	getOrSet('radiusVisible', true, false);
	getOrSet('centerMarkerVisible', hasCenterMarker, false);

	const switchMap = (
		id: string = `${mapId}`,
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
		].join(' ');

		// if (!Math.max(0,zoom||0)) { zoom = 11 }
		getOrSet('defaultId', `${mapId}`, false);
		getOrSet('mapId', `${mapId}`, false);

		return dom({
			node: container,
			onAttach: () => {
				loadModules([
					'esri/config',
					'esri/Graphic',
					'esri/geometry/Circle',
					'esri/views/MapView',
					'esri/Map',
					'esri/Basemap',
					'esri/WebMap',
					'esri/layers/GroupLayer',
					'esri/layers/MapImageLayer',
					'esri/layers/WebTileLayer',
					'esri/layers/GeoJSONLayer',
        	"esri/renderers/UniqueValueRenderer",
					'esri/widgets/LayerList',
					'esri/widgets/BasemapGallery',
					"esri/widgets/ScaleBar"
				]).then(([
					esriConfig, // TODO
					Graphic,
					Circle,
					MapView,
					_Map,
					BaseMap,
					WebMap,
					GroupLayer,
					MapImageLayer,
					WebTileLayer,
					GeoJSONLayer,
					UniqueValueRenderer,
					LayerList,
					BasemapGallery,
					ScaleBar
				]) => {
					// esriConfig.request.proxyUrl = proxy;

					// Create layers
					const toLayers = (_a: [string, string, string[]?][]) => _a.map((a) => {
						const tileLayer = new WebTileLayer({
							title: a[0],
							urlTemplate: `${proxy}${a[1]}`,
							visible: false
						});
						if (a.length > 2) { tileLayer.subDomains = a[2] }
						return tileLayer
					});
					const layers = config.tileLayers.map((o) => new GroupLayer({...o, layers: toLayers(o.layers)}));

					console.log(center, zoom);

					/* Default ActivityPub-content layer as geojson */
					let geojsonLayer: any;
					if (!!geojson.features.length) {
						// green 13b20b indigo 3b4eb8 lightblue 6da7d1 teal 339985 beige [203, 187, 157, 1]		[195, 12, 112, 1]
						console.log(JSON.stringify(geojson), uniqueValueInfos);
						const renderer = new UniqueValueRenderer({
							field: "apType",
							uniqueValueInfos
						});
						const blob = new Blob([JSON.stringify(geojson)], {type: "application/geo+json"});
						const url  = URL.createObjectURL(blob);
						geojsonLayer = new GeoJSONLayer({
							url,
							renderer,
							featureReduction,
							outFields: ["*"],
							popupTemplate: {
								title: `<span class="${css.smallTypo}">{latLng}</span><br />{name}`,
								content: `<span class="${css.smallTypo}">{geoMeta}<br />{summary}</span>`
							}
						});

						layers.unshift(geojsonLayer);
					}
					getOrSet('layers', layers, false);

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
					// Create View
					// then we load a map from an id
					// const map = new MMap({ basemap: "osm" });
					// and we show that map in a container w/ id #viewDiv
					const view = new MapView({
						map,
						container,
						...mapOptions,
						...get('mapOptions'),
	          // set highlightOptions like color and fillOpacity
	          highlightOptions: {
	            color: [255, 0, 58],
	            fillOpacity: 0.8
	          }
					});
					// view.geojsonLayer = geojsonLayer;
					map.when(async () => {
						try {
							view.geojsonMapping = {
								dict: (geojson.features as any[]).reduce((o, feature, i) => {
									o[feature.properties.locationId] = i;
									return o
								}, {}),
								geojson
							};

							const scaleBar = new ScaleBar({
			          view: view,
			          unit: 'dual' // TODO i18n ? The scale bar displays both metric and non-metric units.
			        });
			        view.ui.add(scaleBar, { position: 'bottom-left' });

							console.log('view when 1');
							// Add the basemaps gallery for the more button
							container = document.createElement('div');
							container.setAttribute('id', idMiddleware.getId('basemaps'));
							container.style.display = 'none';
							const basemapGallery = new BasemapGallery({
								view,
								container
							});
						  view.ui.add(basemapGallery, { position: 'top-right' });
							basemapGallery.watch('activeBasemap', function(_map: any) {
								const c = document.getElementById(idMiddleware.getId('basemaps'));
								if (c) { c.style.display = 'none' }
								set('mapId', _map.portalItem.id);
						  });
							// Create the LayerList widget with the associated actions
							// and add it to the top-right corner of the view.
							container = document.createElement('div');
							container.setAttribute('id', idMiddleware.getId('layer'));
							container.style.display = 'none';
							const layerList = new LayerList({
								view,
								container,
								showSubLayers: true,
								// executes for each ListItem in the LayerList:
								listItemCreatedFunction: defineLayerActions
							});

							const mapSearchNode = node.get('mapSearch');
							loadModules([
								'esri/widgets/Search',
								// 'esri/widgets/Directions'
							]).then(([
								Search,
								// Directions
							]) => {
								const showPopup = (address: string, pt: any) => {
									console.log('search popup');
									view.popup.open({
										title: latLngStr(pt.latitude, pt.longitude),
										content: address,
										location: pt
									});
								}
								// Add Search widget
								container = document.createElement('div');
								if (hasSearch && mapSearchNode && !get('searchLoaded')) {
									mapSearchNode.innerHTML = '';
									mapSearchNode.appendChild(container);
								}
								const search = new Search({
									view,
									container
								});
								// Add to the map (instead container, too much mapspace in column)
								// view.ui.add(search, 'top-right');
	/*
								container = document.createElement('div');
								mapSearchNode.appendChild(container);
								const directions = new Directions({
					        view,
									container,
					        routeServiceUrl: 'https://utility.arcgis.com/usrsvcs/appservices/7d0Q6PhsVvdlP0nO/rest/services/World/Route/NAServer/Route_World'
					      });
	*/
								// Find address
								view.on('click', function(evt: Event & {mapPoint: any}){
									view.hitTest(evt).then((response: any) => {
										/* short circuit, no other info elements */
										if (response.results.length === 1) {
											console.log(evt);
											search.clear();
											view.popup.clear();
											if (search.activeSource) {
												const geocoder = search.activeSource.locator; // World geocode service
												const location = evt.mapPoint;
												geocoder.locationToAddress({ location })
													.then(function({address}: {address?: string}) { // Show the address found
														address && showPopup(address, evt.mapPoint);
													}, function(err: Error) { // Show no address found
														showPopup('No address found.', evt.mapPoint);
													});
											}
										}
									});
								});
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

							if (hasCenterMarker) {
								const geometry = { type: 'point', x: center[0], y: center[1] };
								// center square or circle
								view.graphics.add(new Graphic({
									geometry,
									symbol:	isNr(radius) ? centerSymbolRadius : centerSymbol,
									visible: get('centerMarkerVisible')
								}));
								// radius circle
								const radiusGeometry = isNr(radius) && get('radiusVisible') ? new Circle({
								  center: geometry,
									radius,
								  radiusUnit,
								  geodesic: true,
								  numberOfPoints: 100
								}) : geometry;
								view.graphics.add(new Graphic({
								  geometry: radiusGeometry,
								  symbol: radiusSymbol,
									visible: isNr(radius) && get('radiusVisible')
								}));
							}
							view.popup.on('click', function(event: Event){
							  console.log(event);
							});
							view.popup.watch('selectedFeature', function(graphic: any) {
							  if (graphic) {
							    // const graphicTemplate = graphic.getEffectivePopupTemplate();
							    // graphicTemplate.actions.items[0].visible = graphic.attributes.website ? true : false;
									if (graphic.attributes.hasOwnProperty('apType')) {
										onActivityPubLocation && onActivityPubLocation(graphic.attributes)
									}
							  }
							});

							onView && onView(view);

						} catch(e) {
							console.log('error', e);
						}
					});

					view.watch('stationary', () => {
						// console.log(view.center.longitude, view.center.latitude, view.zoom);
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
			).catch((err) => {
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
		icon: {'@redaktor/widgets/icon': { icon: [themedCss.mapSwitchIcon] }},
		openIcon: {'@redaktor/widgets/icon': { icon: [themedCss.mapSwitchIcon, themedCss.openIcon] }},
		closeIcon: {'@redaktor/widgets/icon': { icon: [themedCss.mapSwitchIcon, themedCss.closeIcon] }}
	}
	const getElements = (...cacheKeys: string[]) =>
	 	cacheKeys.map((k) => document.getElementById(idMiddleware.getId(k)));

	return (
		<div key="root"
			classes={[
				'redaktorMap',
				themedCss.root,
				viewCss.item,
				!!viewDesktopCSS && viewDesktopCSS.item
			]}
		>
			<div key="mapSearch"></div>
			<div key="mapSwitch" classes={[themedCss.mapSwitch]}>
				{basemaps.map((o, i) =>
					<Button {...btnProps} classes={extraClasses.button} onClick={switchMap(o.id)} disabled={curId === o.id}>
						<Icon classes={extraClasses.icon} size="xxl" type={(basemaps[i].icon as any)} />
					</Button>
				)}
				{([
					['basemaps', 'layer', extraClasses.basemapButton, 'moreIcon'],
					['layer', 'basemaps', extraClasses.layerButton, 'stack']
				] as [string, string, any, 'plus'|'stack'][]).map((a) =>
					<Button {...btnProps} key={a[0]} design="outlined" classes={a[2]}
						onClick={(k) => {
							const mapSwitch = node.get('mapSwitch');
							const el = document.getElementById(k);
							if (!!el) { el.classList.toggle(themedCss.open) }
							mapSwitch && mapSwitch.querySelectorAll(`.${themedCss.button}`).forEach((_el) => {
								if (_el.id !== k) { _el.classList.remove(themedCss.open) }
							});

							const [toggle, hidden] = getElements(a[0],a[1]);
							if (toggle) {
								toggle.style.display = (toggle.style.display === 'block') ? 'none' : 'block'
							}
							if (hidden) { hidden.style.display = 'none' }
						}}
					>
						<Icon classes={extraClasses.openIcon} size="xxl" type={a[3]} />
						<Icon classes={extraClasses.closeIcon} size="l" type="close" />
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
