import { RenderResult } from '@dojo/framework/core/interfaces';
// TODO TS ArcGis ESRI

export type APObj = {
	[key: string]: any;
	latitude: number;
	longitude: number;
	altitude?: number;
	radius?: number;
	units?: string;
	accuracy?: number;
};
export type Point = [/*Lng*/number, /*Lat*/number];
export type LngObj = { lat: number; lng: number; alt?: number };
export type LngLat = Point | APObj | LngObj;
export type LngLatBounds = Array<LngLat>;
export type ControlPosition = 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

export interface Viewport {
	center?: [number, number];
	zoom?: number;
}
