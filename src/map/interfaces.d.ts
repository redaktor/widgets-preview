import {
	LatLng as LeafletLatLng,
	LatLngBounds as LeafletLatLngBounds,
	ControlPosition,
	Layer,
	Map,
	Point as LeafletPoint,
	Renderer,
	CRS
} from 'leaflet';
import { RenderResult } from '@dojo/framework/core/interfaces';
// import type { Node } from 'react'

export type AddLayerHandler = (layer: Layer, name: string, checked?: boolean) => void;
export type RemoveLayerHandler = (layer: Layer) => void;

export interface LayerContainer {
	addLayer: AddLayerHandler;
	removeLayer: RemoveLayerHandler;
}

export interface LeafletContext {
	map?: Map;
	pane?: string;
	layerContainer?: LayerContainer;
	popupContainer?: Layer;
}

export type APObj = {
	[key: string]: any;
	latitude: number;
	longitude: number;
	altitude?: number;
	radius?: number;
	units?: string;
	accuracy?: number;
};
export type LngObj = { lat: number; lng: number; alt?: number };
export type LatLng = LeafletLatLng | [number, number] | APObj | LngObj;

export type LatLngBounds = LeafletLatLngBounds | Array<LatLng>;

export type ControlPosition = 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

export type Point = [number, number] | LeafletPoint;

export interface Viewport {
	center?: [number, number];
	zoom?: number;
}

export type GridLayerOptions = {
	tileSize?: number | LeafletPoint;
	opacity?: number;
	updateWhenIdle?: boolean;
	updateWhenZooming?: boolean;
	updateInterval?: number;
	zIndex?: number;
	bounds?: LeafletLatLngBounds;
	minZoom?: number;
	maxZoom?: number;
	minNativeZoom?: number;
	maxNativeZoom?: number;
	noWrap?: boolean;
	className?: string;
	keepBuffer?: number;
} & MapLayerProps;

export interface PathOptions {
	stroke?: boolean;
	color?: string;
	weight?: number;
	opacity?: number;
	lineCap?: 'butt' | 'round' | 'square' | 'inherit';
	lineJoin?: 'miter' | 'round' | 'bevel' | 'inherit';
	dashArray?: string;
	dashOffset?: string;
	fill?: boolean;
	fillColor?: string;
	fillOpacity?: number;
	fillRule?: 'nonzero' | 'evenodd' | 'inherit';
	bubblingMouseEvents?: boolean;
	renderer?: Renderer;
	className?: string;
	interactive?: boolean;
	pane?: string;
	attribution?: string;
}

export interface DivOverlayOptions {
	children: RenderResult;
	className?: string;
	offset?: LeafletPoint;
	onClose?: () => void;
	onOpen?: () => void;
}

export type CrossOrigin = boolean | string;

export interface ImageOverlayOptions {
	opacity?: number;
	alt?: string;
	interactive?: boolean;
	attribution?: string;
	crossOrigin?: CrossOrigin;
	errorOverlayUrl?: string;
	zIndex?: number;
	className?: string;
}

export type LeafletProps = { leaflet: LeafletContext };

export interface MapControlProps {
	leaflet: LeafletContext;
	position?: ControlPosition;
}

export type MapComponentProps = { leaflet: LeafletContext; pane?: string };

export type DivOverlayProps = MapComponentProps & DivOverlayOptions;

export type MapLayerProps = {
	attribution?: string;
	children?: RenderResult;
} & MapComponentProps;

export type GridLayerProps = MapLayerProps & GridLayerOptions;

export type PathProps = MapLayerProps & PathOptions;

export type SVGOverlayProps = MapComponentProps &
	ImageOverlayOptions & {
		bounds: LatLngBounds;
		children?: RenderResult;
	};

export type LeafletElement = Map;
export type CtrlPosition = boolean | ControlPosition;
export type ZoomOption = boolean | 'center';
export type Props = {
	[key: string]: any;
	// Leaflet options
	preferCanvas?: boolean;
	attributionControl?: CtrlPosition;
	zoomControl?: CtrlPosition;
	zoomSnap?: number;
	zoomDelta?: number;
	closePopupOnClick?: boolean;
	trackResize?: boolean;
	boxZoom?: boolean;
	doubleClickZoom?: ZoomOption;
	dragging?: boolean;
	crs?: CRS;
	center?: LatLng;
	zoom?: number;
	minZoom?: number;
	maxZoom?: number;
	maxBounds?: any; // LatLngBounds;
	renderer?: Renderer;
	zoomAnimation?: boolean;
	zoomAnimationThreshold?: number;
	fadeAnimation?: boolean;
	markerZoomAnimation?: boolean;
	transform3DLimit?: number;
	inertia?: boolean;
	inertiaDeceleration?: number;
	inertiaMaxSpeed?: number;
	easeLinearity?: number;
	worldCopyJump?: boolean;
	maxBoundsViscosity?: number;
	keyboard?: boolean;
	keyboardPanDelta?: number;
	scrollWheelZoom?: ZoomOption;
	wheelDebounceTime?: number;
	wheelPxPerZoomLevel?: number;
	tap?: boolean;
	tapTolerance?: number;
	touchZoom?: ZoomOption;
	bounceAtZoomLimits?: boolean;

	// Additional options
	animate?: boolean;
	duration?: number;
	noMoveStart?: boolean;
	bounds?: LatLngBounds;
	boundsOptions?: {
		paddingTopLeft?: Point;
		paddingBottomRight?: Point;
		padding?: Point;
		maxZoom?: number;
	};
	children?: Node;
	className?: string;
	id?: string;
	style?: Object;
	useFlyTo?: boolean;
	viewport?: Viewport;
	whenReady?: () => void;
};
