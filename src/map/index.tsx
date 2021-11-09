import { AsObject, AsObjectNormalized } from '../common/interfaces';
import { LngLat } from './interfaces';
import { tsx, create, node, dom } from '@dojo/framework/core/vdom';
import { loadModules } from 'esri-loader';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { apToGeoJSON, latLngStr, lngLatFromO, radiusFromO, isNr } from './util';
import idMiddleware from '../middleware/id';
import theme from '../middleware/theme';
import i18nActivityPub from '../middleware/i18nActivityPub';
import config, { MapConfig } from './config';
const { wellKnownMapIds } = config;
import { uniqueValueInfos, centerSymbol, centerSymbolRadius, radiusSymbol } from './configMarker';
import Button from '../Button';
import Icon from '../Icon';
import apBundle from '../common/nls/ActivityPub';
import bundle from './nls/Map';
import * as viewCss from '../theme/material/_view.m.css';
import * as iconCss from '../theme/material/icon.m.css';
import * as css from './styles/Map.m.css';
// import { Base as MetaBase } from "@dojo/framework/core/meta/Base";
// import { systemLocale } from "@dojo/framework/i18n/i18n"; /* TODO */
// import Select from '@redaktor/widgets/select';
// import * as UriTemplate from 'uritemplate';
// import Providers from './mapProviders';

/* // TODO:
https://docs.graphhopper.com
https://graphhopper.com/api/1/examples/#routing

https://osmbuildings.org/documentation/leaflet/

https://thenounproject.com/xinhstudio/collection/saigon-attractions-map/
https://thenounproject.com/YuguDesign/collection/map-location-pointers-glyphs/
https://thenounproject.com/vectormarket01/collection/travelling/
*/
interface MapThis {
	view: any;
	search: any;
	messages: {[key: string]: string};
	geojson: {[key: string]: any};
	geojsonDict: {[key: string]: number};
	Circle: any;
};
export function setActivityPub(this: MapThis, ap: AsObjectNormalized, centerMarkerVisible = true) {
	if (!ap) { return }
	const { view, search, geojson, geojsonDict } = this;

	if (typeof ap.latitude !== 'number' || typeof ap.longitude !== 'number') {
		if (!ap.name) { return }
		view.popup.actions.getItemAt(0).visible = false;
		view.popup.actions.getItemAt(1).visible = true;
		view.graphics.getItemAt(0).visible = false;
		const apIcon = `<i class="${iconCss.icon} ${(iconCss as any)[
			ap.hasOwnProperty('apType') ? ap.apType.toLowerCase() : ap.type[0].toLowerCase()
		]}"></i>`;
		const { geoMeta = '' } = ap;
		const name = !!ap.name && !!ap.name.length ? ap.name.join(' – ') : '';
		const summary = !!ap.summary && !!ap.summary.length ? ap.summary.join(' – ') : '';
		search.searchName = name;
		search.searchTerm = name;

		view.popup.clear();
		view.popup.open({
			includeDefaultActions: false,
			title: `<span class="${css.smallTypo}">${this.messages.latLngUnknown}</span><br /><span title="${summary}">${name}</span>`,
			content: `${apIcon} <span class="${css.smallTypo}">${geoMeta}</span>`
		});
		return
	}
	view.popup.actions.getItemAt(0).visible = true;
	view.popup.actions.getItemAt(1).visible = false;
	search.clear();

	const { items = [] } = view.graphics||{};
	const hasCenter = isNr(ap.latitude) && isNr(ap.longitude) && !!items.length;
	if (hasCenter) {
		const hasRadius = isNr(ap.radius) && view.graphics && items && items.length > 1;
		const [x, y] = lngLatFromO(ap);
		const geometry = { type: "point", x, y };
		if (view.hasOwnProperty('goTo')) {
			view.goTo([x, y])
		} else {
			view.center = [x, y];
		}
		items[0].set('geometry', geometry);
		items[0].set('symbol', hasRadius ? centerSymbolRadius : centerSymbol);
		if (hasRadius) {
			items[1].set('visible', true);
			const {radius, radiusUnit} = radiusFromO(ap);
			items[1].set('geometry', new (this.Circle)({
				center: geometry,
				radius,
				radiusUnit,
				geodesic: true,
				numberOfPoints: 100
			}));
		} else {
			items[1].set('visible', false);
		}
	}

	if (this.geojsonDict && isNr(this.geojsonDict[ap.id||''])) {
		view.graphics.getItemAt(0).visible = centerMarkerVisible;
		const { properties: p } = geojson.features[geojsonDict[ap.id||'']];
		if (!!p) {
			const { apType, latLng, name, geoMeta, summary } = p;
			const apIcon = `<i class="${iconCss.icon} ${(iconCss as any)[apType.toLowerCase()]}"></i>`;
			view.popup.clear();
			view.popup.open({
				includeDefaultActions: false,
				title: `<span class="${css.smallTypo}">${latLng}</span><br /><span title="${summary}">${name}</span>`,
				content: `${apIcon} <span class="${css.smallTypo}">${geoMeta}</span>`
			});
		}
	}
};

interface MapCache {
	map: any;
	view: any;
	layerView: any;
	defaultId: string;
	searchLoaded: boolean;
	locationHasSearch: boolean;
	currentPointer: string;
	centerMarkerVisible: boolean;
	radiusVisible: boolean;
	apVisible: boolean;
	[mapId: string]: any;
}
export interface BaseMapProperties {
	id?: (keyof typeof wellKnownMapIds) | string;
}

export interface MapProperties extends AsObject {
	proxy?: string;
	mapId?: (keyof typeof wellKnownMapIds) | string;
	mapOptions?: MapConfig['map'];
	center?: AsObjectNormalized | LngLat;
	zoom?: number;
	featureReduction?: MapConfig['featureReduction'];
	basemaps?: MapConfig['basemaps'];
	tileLayers?: MapConfig['tileLayers'];
	hasCenterMarker?: boolean;
	hasSearch?: boolean;
	onView?: (view: any) => any;
	onActivityPubLocation?: (attributes: {id: string, pointer: string, [k: string]: any}) => any;
	onActivityPubLocationOpen?: (attributes: {id: string, pointer: string, [k: string]: any}) => any;
	/* use geojson, overrides activitypub */
	geojson?: any;
}

const icache = createICacheMiddleware<MapCache>();
const factory = create({ i18nActivityPub, idMiddleware, theme, icache, node }).properties<MapProperties>();

export default factory(function lMap({
	middleware: { i18nActivityPub, theme, idMiddleware, icache, node }
}) {
	const { getOrSet, get, set } = icache;

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
		onActivityPubLocationOpen,
		geojson: g,
		...ap
	} = i18nActivityPub.normalized<MapProperties>();
	const themedCss = theme.classes(css);
	const desktopCSS = theme.viewDesktopCSS();
	const { messages } = i18nActivityPub.localize(bundle);
	const { messages: apMessages } = i18nActivityPub.localize(apBundle);

	const center = Array.isArray(c) ? c : lngLatFromO(c);
	const {radius, radiusUnit} = radiusFromO(c);
	const geojson = (!!g && !!g.type) ? g : (!!ap.type && apToGeoJSON(ap, apMessages));

	getOrSet('searchLoaded', false, false);
	getOrSet('locationHasSearch', (typeof ap.latitude !== 'number' || typeof ap.longitude !== 'number'), false);
	getOrSet('mapOptions', { center, zoom: !Math.max(0, zoom || 0) ? 11 : zoom }, false);
	getOrSet('apVisible', true, false);
	getOrSet('radiusVisible', true, false);
	getOrSet('centerMarkerVisible', hasCenterMarker, false);

	const actions = [{
		id: 'zoom',
		visible: true,
		className: `${css.actionIcon} ${iconCss.icon} ${iconCss.zoomIn}`,
		title: messages.zoomIn
	}, {
		id: 'search',
		visible: true,
		className: `${css.actionIcon} ${iconCss.icon} ${iconCss.search}`,
		title: messages.search
	}, {
		id: 'copy',
		visible: true,
		className: `${css.actionIcon} ${iconCss.icon} ${iconCss.eyedropper}`,
		title: messages.copyLatLng
	}, {
		id: 'open',
		visible: true,
		className: `${css.actionIcon} ${iconCss.icon} ${iconCss.place}`,
		title: messages.open
	}];

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
				set('mapId', id, false);
				set('map', map);
			}
		);
	};

	const createMap = (): any => {
		let container = document.createElement('div');

		container.className = [
			themedCss.map,
			viewCss.media,
			viewCss.baselined,
			viewCss.m1by1,
			viewCss.item,
			!!desktopCSS && desktopCSS.item,
			!!desktopCSS && desktopCSS.m1by1
		].join(' ');

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
        	'esri/renderers/UniqueValueRenderer',
					'esri/widgets/Search',
					'esri/widgets/LayerList',
					'esri/widgets/BasemapGallery',
					'esri/widgets/Fullscreen',
					'esri/widgets/ScaleBar',
					"esri/core/promiseUtils"
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
					Search,
					LayerList,
					BasemapGallery,
					Fullscreen,
					ScaleBar,
					promiseUtils
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

					/* Default ActivityPub-content layer as geojson */
					let geojsonLayer: any;
					if (!!geojson.features.length) {
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
							outFields: ['*'],
							title: 'ActivityPub',
							popupTemplate: {
								title: `<span class="${css.smallTypo}">{latLng}</span><br /><span title="{summary}">{name}</span>`,
								content: `<span class="${css.smallTypo}">{geoMeta}</span>`,
								overwriteActions: true,
								actions
							}
						});
						layers.unshift(geojsonLayer);
					}

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
						...get('mapOptions')
					});

					map.when(async () => {
						try {
							const geojsonDict = (geojson.features as any[]).reduce((o, feature, i) => {
								o[feature.properties.locationId] = i;
								return o
							}, {});

							const fullscreen = new Fullscreen({ view: view });
							view.ui.add(fullscreen, "top-left");
							fullscreen.viewModel._fullscreenStyle = 'min-width: 100vw; min-height: 100vh;';

							const scaleBar = new ScaleBar({
			          view: view,
			          unit: 'dual' // TODO i18n ? The scale bar displays both metric and non-metric units.
			        });
			        view.ui.add(scaleBar, { position: 'bottom-left' });

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

							// Creates actions in the LayerList.
							const defineLayerActions = (event: any) => {
								const { item } = event;
								if (item.title === 'ActivityPub') {
									item.panel = { content: 'legend', className: css.activityPubLegend, open: true }
									item.open = true;
								}
							}
							const layerList = new LayerList({
								view,
								container,
								showSubLayers: true,
								// executes for each ListItem in the LayerList:
								listItemCreatedFunction: defineLayerActions
							});

							const mapSearchNode = node.get('mapSearch');
							const showPopup = (content: string, location: any, features: string[] = []) => {
								// console.log('search popup', content, location);
								const address = messages.address;
								const title = features.length ?
									`title="${features.join(', ').replace(/_/g,' ').replace(/\/(line|fill)/,'')}"` : '';
								const icon = `<i class="${iconCss.icon} ${iconCss.mapMarker}"></i>`;
								const latLng = latLngStr(location);
								view.popup.open({
									includeDefaultActions: true,
									title: `${icon} <span class="${css.smallTypo}" ${title}>${latLng}</span>`,
									content,
									location
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
								container,
								visible: get('locationHasSearch')
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
									const features: string[] = [];
									const filtered = response.results.filter((res:any) => {
										if (!res.graphic || !res.graphic.attributes) {
											return false
										}
										const { attributes } = res.graphic;
										const isCluster = attributes.hasOwnProperty('cluster_count');
										const hasAP = attributes.hasOwnProperty('apType');
										if (!isCluster && !hasAP && attributes.hasOwnProperty('layerName')) {
											features.push(attributes.layerName)
										}
										return isCluster || hasAP;
									});
									/* short circuit, no other info elements */
									if (filtered.length === 0) {
										search.clear();
										view.popup.clear();
										if (search.activeSource) {
											const geocoder = search.activeSource.locator; // World geocode service
											const location = evt.mapPoint;
											geocoder.locationToAddress({ location })
												.then(function({address = messages.notFound}: {address?: string}) {
													// Show the address found
													showPopup(address, evt.mapPoint, features);
												}, function(err: Error) {
													// Show no address found
													showPopup(messages.notFound, evt.mapPoint, features);
												});
										}
									}
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
							layerList.container.querySelectorAll('.esri-legend__layer-caption').forEach((el: HTMLElement) => {
								if (el.textContent === 'apType') { el.textContent = messages.type || 'Type' }
							});
							// TODO: better solution:
							/*
							if (geojsonLayerView) {
								geojsonLayerView.filter = { where: `apType = '${type}'` };
							}
							*/

							if (hasCenterMarker) {
								const geometry = { type: 'point', x: center[0], y: center[1] };
								// center square or circle
								const centerGraphic = new Graphic({
									geometry,
									symbol:	isNr(radius) ? centerSymbolRadius : centerSymbol,
									visible: get('centerMarkerVisible')
								});
								view.graphics.add(centerGraphic);
								// radius circle
								const radiusGeometry = isNr(radius) && get('radiusVisible') ? new Circle({
								  center: geometry,
									radius,
								  radiusUnit,
								  geodesic: true,
								  numberOfPoints: 100
								}) : geometry;
								const radiusGraphic = new Graphic({
								  geometry: radiusGeometry,
								  symbol: radiusSymbol,
									visible: isNr(radius) && get('radiusVisible')
								});
								view.graphics.add(radiusGraphic);
							}
							view.popup.maxInlineActions = 5;
							view.popup.actions = actions;
							view.popup.dockEnabled = true;
							view.popup.dockOptions = { buttonEnabled: false, breakpoint: true };

							view.setActivityPub = setActivityPub.bind({view, messages, search, geojson, geojsonDict, Circle});
							view.popup.watch('selectedFeature', function(graphic: any) {
							  if (!graphic) { return }
								const hasAP = graphic.attributes.hasOwnProperty('apType');
								const { location: l } = graphic.attributes;
								if (Array.isArray(l)) { graphic.attributes.location = l[0] }
								graphic.attributes.location = ((typeof l === 'string') ?
									JSON.parse(l) : (typeof l === 'object' ? l : void 0));
								if (hasAP) {
									view.setActivityPub(graphic.attributes.location, get('centerMarkerVisible'));
									onActivityPubLocation && onActivityPubLocation(graphic.attributes)
								}
							});
							view.popup.on('trigger-action', function(o: any) {
								switch (o.action.id) {
									case 'search':
										search.searchTerm = search.searchName||'';
										search.suggest(search.searchName)||'';
									break;
									case 'zoom':
										if (!o.action.isRadius) {
											view.popup.actions.getItemAt(0).className = `${css.radiusIcon} ${iconCss.icon} ${iconCss.zoomOut}`;
											view.popup.actions.getItemAt(0).title = messages.zoomRadius;
											const maxZoom = (map.hasOwnProperty('getMaxZoom') && map.getMaxZoom() - 1) || 16;
	    								if (map.hasOwnProperty('centerAndZoom')) {
												map.centerAndZoom(center, maxZoom)
											} else {
												view.zoom = maxZoom;
											}
											o.action.isRadius = true
										} else {
											view.popup.actions.getItemAt(0).className = `${css.actionIcon} ${iconCss.icon} ${iconCss.zoomIn}`;
											view.popup.actions.getItemAt(0).title = messages.zoomIn;
											view.extent = view.graphics.getItemAt(1).geometry.extent;
											o.action.isRadius = false
										}
									break;
									case 'copy':
										const el = document.createElement('textarea');
										el.value = `${center[1]}, ${center[0]}`;
										document.body.appendChild(el);
										el.select();
										document.execCommand('copy');
										document.body.removeChild(el);
										const currentActionClass = o.action.className;
										o.action.className = `${css.actionIcon} ${css.actionIconOk} ${iconCss.icon} ${iconCss.check}`;
										setTimeout(() => { o.action.className = currentActionClass }, 1200);
									break;
									case 'open':
										const { id = '', pointer = get('currentPointer') } = ap;
										onActivityPubLocationOpen && onActivityPubLocationOpen({...ap, id, pointer});
									break;
								}
							});

							onView && onView(view);

						} catch(e) {
							console.log('esri map error', e);
						}
					});

					view.watch('stationary', () => {
						// console.log(view.center.longitude, view.center.latitude, view.zoom);
						set(
							'mapOptions',
							{
								center: view ? [view.center.longitude, view.center.latitude] : center,
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
			classes={[ 'redaktorMap', themedCss.root, viewCss.item, !!desktopCSS && desktopCSS.item ]}
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
[{"en":"ESRI Human Geo dark","de":"ESRI Human Geo dark"},
	["https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf",
	"https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf",
	"https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf"]],
[{"en":"ESRI Human Geo","de":"ESRI Human Geo"},
	["https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf",
	"https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf",
	"https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf"]],
[{"en":"OSM Humanitarian","de":"OSM Humanitarian"},
	["https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png","https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"]],
[{"en":"OSM Humanitarian","de":"OSM Humanitarian"},
	["https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png","http://openfiremap.org/hytiles/{z}/{x}/{y}.png"]],
[{"en":"OSM Humanitarian","de":"OSM Humanitarian"},
	["https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png","https://s3.amazonaws.com/te512.safecast.org/{z}/{x}/{y}.png"]]]

*/
/*
6 {en: "Nautical & Aeronautical", de: "Nautisch & Aeronautisch"}
[[{"en":"OpenSeaMap","de":"OpenSeaMap"},
	["https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png","https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"]],
[{"en":"ESRI Ocean","de":"ESRI Ocean"},
	["https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf"]]]


8 ACCESSIBILITY >
*/


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
