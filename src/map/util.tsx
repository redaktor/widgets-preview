import { tsx } from '@dojo/framework/core/vdom';
import { JSONpointer } from '../framework/JSON/Pointer';
import { AsObjectNormalized } from '../common/interfaces';

export function isNr(n: any) { return typeof n === 'number' && !isNaN(n); }
export type EsriUnits = ("feet"|"kilometers"|"meters"|"miles"|"nautical-miles"|"yards");
export type LngLatArray = [number, number] | [number, number, number];
export type RadiusO = {radius?: number; radiusUnit?: EsriUnits;};
export function toDMS(coordinate: number, posCardinal: string, negCardinal: string) {
  const absolute = Math.abs(coordinate);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60);
  const cardinal = coordinate >= 0 ? posCardinal : negCardinal;
  return `${degrees}°${minutes}'${seconds}"${cardinal}`
}
function latLng(latitude: number, longitude: number) {
  return [Math.round(latitude * 100000)/100000, Math.round(longitude * 100000)/100000]
}
function toMeter(v: number, units = 'm', delimiter = ',') {
  const toM = {cm:v*100, feet:v/3.281, inches:v/39.37, km:v/1000, miles:v*1609, m:v*1};
  if (units === 'm') {
    return `${delimiter}${v}`
  } else if (toM.hasOwnProperty(units)) {
    return `${delimiter}${toM[(units as keyof typeof toM)]}`
  }
  return ''
}
export function latLngStr(
	{latitude, longitude, altitude, units, accuracy, radius}: Partial<AsObjectNormalized>,
	onlyCoordinates = false
) {
	if (typeof latitude !== 'number' || typeof longitude !== 'number') { return '' }
	const [lat, lng] = latLng(latitude, longitude);
	if (onlyCoordinates) { return `${lat}, ${lng}` }
	const alt = typeof altitude !== 'number' ? '' : ` ⬍${altitude}${units||'m'}`;
	const rad = !radius ? '' : ` ⌀${radius}${units||'m'}`;
	return `${toDMS(lat,'N','S')} ${toDMS(lng,'E','W')}${alt}${rad}`
}

export function geoHref(
	{latitude, longitude, altitude, units, accuracy, radius, name = []}: Partial<AsObjectNormalized>
) {
  if (!Array.isArray(name)) { name = [`${name}`] }
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return {
      href: `geo:0,0?q=${name.join(',')}`,
      content: name.join(',')
    }
  }
	const [lat, lng] = latLng(latitude, longitude);
	const hrefs = [`geo:${lat},${lng}`];
  if (typeof altitude === 'number') { hrefs.push(toMeter(altitude, units)) }
  if (typeof radius === 'number') { hrefs.push(toMeter(radius, units, ';u=')) }
  const href = hrefs.join('');

  const alti = typeof altitude !== 'number' ? '' : ` ⬍${altitude}${units||'m'}`;
  const radi = !radius ? '' : ` ⌀${radius}${units||'m'}`;
  const content = <virtual>
    <span itemprop="latitude">{toDMS(lat,'N','S')}</span>
    <span> </span>
    <span itemprop="longitude">{toDMS(lng,'E','W')}</span>
    {!!alti && <span itemprop="altitude">{alti}</span>}
    {!!radi && <span itemprop="radius">{radi}</span>}
  </virtual>;
  return { href, content }
}

export function apToGeoJSON(ap: AsObjectNormalized, messages: any = {}) {

	/* TODO
	Travel -> `target` can be the location …

	*/

	const [seen, results, features] = [new Set<string>(), new Set<string>(), []];
	const jp = (new JSONpointer(ap));
	jp.walk((value: any, pointer: string) => {
		/* make sure, pointer is unique and has at least both, longitude and latitude for GeoJSON */
		const matches = pointer.match(/(longitude|latitude)$/g);
		if (matches && !!matches.length) {
			const repl: any = {longitude: 'latitude', latitude: 'longitude'};
			seen.add(pointer);
			if (seen.has(pointer.replace(new RegExp(matches[0]+'$'), repl[matches[0]]))) {
				results.add(pointer.split('/location')[0])
			}
		}
	});
	/* build features from JSON pointers */
	/* TODO i18n */
	results.forEach((pointer) => {
		const {id = '', type: mainTypes = ['Object'], location} = jp.get(pointer);
    if (!location) { return }
		/* feature per location */
		location.forEach(({
			longitude, latitude, altitude, units, accuracy, radius,
			id: locationId, type: locationType = 'Place', name: n = '', summary: s = ''
		}: any) => {
			if (longitude && latitude) {
				if (Array.isArray(locationType)) { locationType = locationType[0] }
				const location = JSON.stringify({ longitude, latitude, altitude, units, accuracy, radius });
				const latLng = latLngStr({longitude, latitude, altitude, units, accuracy, radius});
				const name = !!n.length ? n.join(' – ') : '';
				const summary = !!s.length ? s.join(' – ') : '';

        const {location: _location = 'location', _of = 'of', _in = 'in'} = messages;
				const geoMeta = !pointer ? mainTypes.join(',') : pointer.split('/').reverse().reduce((s,p,i,a) => {
				  const nr = parseInt(p,10);
				  if (typeof nr === 'number' && !isNaN(nr)) {
            const type = messages.hasOwnProperty(a[i+1]) ? messages[a[i+1]] : a[i+1];
				  	const res = `${s}${type} ${nr+1} ${_in} `;
				  	a[i+1] = '';
				    return res
				  }
				  return s + p
				}, `${_location} ${_of} `).replace(/in $/g, '');

				/* and feature per type */
				mainTypes.forEach((apType: string) => {
					(features as any[]).push({
						type: "Feature",
						geometry: {
							type: "Point",
							coordinates: [longitude, latitude]
						},
						properties: {apType, pointer, id, locationId, locationType, location, name, summary, latLng, geoMeta}
					})
				})
			}
		});
	});
	return {type: "FeatureCollection", features: features.reverse()}
}

export function lngLatFromO(o: any): LngLatArray {
	let a: LngLatArray = [0, 0];
	if (isNr(o.latitude) && isNr(o.longitude)) {
		const alt = typeof o.altitude === 'number' && !isNaN(o.altitude) && o.altitude;
		a = !!alt ? [o.longitude, o.latitude, alt] : [o.longitude, o.latitude];
	} else if (isNr(o.lat)) {
		const lon = isNr(o.lon) ? o.lon : isNr(o.lng) ? o.lng : null;
		if (!isNr(lon)) {
			return a;
		}
		const alt = isNr(o.alt) && o.alt;
		a = !!alt ? [lon, o.lat, alt] : [lon, o.lat];
	}
	return a;
}
export function radiusFromO({radius, units = "m"}: any): RadiusO {
	if (!radius || !isNr(radius)) { return {} }
	radius = (units === 'cm') ? (radius / 100) : ((units === 'inches') ? (radius / 12) : radius);
	const conversionUnits: any = { cm: 'meters', inches: 'feet', m: 'meters', km: 'kilometers' }
	const radiusUnit: ("feet"|"kilometers"|"meters"|"miles"|"nautical-miles"|"yards") =
		conversionUnits.hasOwnProperty(units) ? conversionUnits[units] : units;
	return {radius, radiusUnit}
}
