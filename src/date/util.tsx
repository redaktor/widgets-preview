// import { WithContext, Place } from 'schema-dts';
import { ldPartial, wellKnownUnits } from '../_ld';
import { AsObjectNormalized } from '../common/interfaces';
import parseAmountAndUnit from '../framework/String/numeralValue';

/* visual location for schema.org
CreativeWork
  Audio, Image, Video, Article, Page
  contentLocation -> Place
  locationCreated -> Place | [inoffical]VirtualLocation
  spatialCoverage -> Place

	recordedAt -> Event
	The Event where the CreativeWork was recorded. The CreativeWork may capture all or part of the event.
	Inverse property: recordedIn

	releasedEvent -> PublicationEvent
	The place and time the release was issued, expressed as a PublicationEvent.

...

  Person
  homeLocation -> Place | ContactPoint

  Action, Organization, Event  - [read also for] Group, Person
  location -> Place | PostalAddress | Text | VirtualLocation

  Organization, Person, Place - [read also for] Group
  address -> PostalAddress | Text

  Application
  [inoffical]VirtualLocation

  Place
  geo -> GeoCoordinates|GeoShape

  TravelAction, MoveAction
  fromLocation,
  toLocation,
*/


/* Dates, Time, Duration
respect
	timeRequired -> Duration
	Approximate or typical time it takes to work with or through this resource

https://schema.org/DateTime
https://schema.org/Time
https://schema.org/Duration
*/

type wellKnownUnit = keyof typeof wellKnownUnits;
export function convert(amount: number, from: wellKnownUnit, to: wellKnownUnit) {
	const fromIsMetric = from === 'cm' || from === 'm' || from === 'km';
	const toIsMetric = to === 'cm' || to === 'm' || to === 'km';
	const fromBase = amount * wellKnownUnits[from];
	if (fromIsMetric === toIsMetric) {
		return fromBase / wellKnownUnits[to]
	} else {
  	const toBase = fromIsMetric ? (fromBase * 3.28084) : (fromBase * 0.3048);
    return toBase / wellKnownUnits[to]
  }
}
export function parseASdistance(s: string): {amount: number; units: wellKnownUnit;} | undefined {
	const parsed = parseAmountAndUnit(s,'length', 'm');
	if (!parsed || !parsed.unit) { return }
	let res;
	if (!!parsed && wellKnownUnits.hasOwnProperty(parsed.unit.name)) {
	  res = {amount: parsed.amount, units: (parsed.unit.name as wellKnownUnit)};
	} else if (!!parsed && parsed.unit.toBase) {
		const isMetric = parsed.unit.system === 'metric';
	  res = {amount: parsed.amount * parsed.unit.toBase, units: isMetric ? 'm' : 'ft'};
		const {amount} = res;
	  if (isMetric && amount > 1000) {
	  	res = {amount: amount / 1000, units: 'km'};
	  } else if (isMetric && amount < 1) {
	  	res = {amount: amount * 100, units: 'cm'};
	  } else if (!isMetric && amount > 5280) {
	  	res = {amount: amount / 5280, units: 'miles'};
	  } else if (!isMetric && amount > 3) {
		  res = {amount: amount / 3, units: 'inches'};
	  }
	}
	return (res as any)
}
export function toParagraph(text: any) {
	if (!Array.isArray(text)) { text = [text] }
	return text.map((v: any) => typeof v === 'string' || typeof v === 'number' ? `${v}` : '').join('<br>')
}
export function toFloat(latlng: number|string) {
	return typeof latlng === 'string' ? parseFloat(latlng) : latlng
}
export function schemaToAsLocation(schemaLocation: any/*WithContext<Place>*/, type: string|string[], label?: string) {
	console.log(schemaLocation, type);
	if (!Array.isArray(type)) { type = [type] }
	if (typeof schemaLocation === 'string') {
		const _as = ({
			type: ['Place'],
			name: [schemaLocation]
		} as AsObjectNormalized);
		type.reverse().forEach((_t) => { _as.type.push(_t) });
		return _as
	}
	/* TODO in Place, other properties +
		event Upcoming or past event associated with this place, organization, or action. [-> OrderedCollection]
		? for additional icons ? publicAccess, smokingAllowed,
	*/
	const {
		'@id': _id, id, '@type': _type = [], type: t = [], geo = [], latitude = [], longitude = [],
		name, disambiguatingDescription, description, address, telephone, url, logo, photo
	} = ldPartial(schemaLocation, 'schema', true);
	const as: AsObjectNormalized = {
		id: _id||id,
		type: ['Place', ..._type.concat(t)],
		name
	};

	if (Array.isArray(geo) && geo.length) {
		let { latitude: lat, longitude: lng, geoMidpoint, geoRadius, elevation } = ldPartial(geo[0], 'schema', true);
		if (geoMidpoint && !!geoMidpoint.latitude.length && !!geoMidpoint.longitude.length) {
			as.latitude = toFloat(geoMidpoint.latitude[0]);
			as.longitude = toFloat(geoMidpoint.longitude[0]);
		} else if (!!lat.length && !!lng.length) {
			as.latitude = toFloat(lat[0]);
			as.longitude = toFloat(lng[0]);
		}

		if (Array.isArray(geoRadius)) { geoRadius = geoRadius[0] }
		if (typeof geoRadius === 'number' && !isNaN(geoRadius)) {
			as.radius = geoRadius;
			as.units = 'm'
		} else if (typeof geoRadius === 'string') {
			const parsed = parseASdistance(geoRadius);
			if (parsed && !isNaN(parsed.amount)) {
				as.radius = parsed.amount;
				as.units = parsed.units;
			}
		}

		let altitudeUnits: wellKnownUnit = 'm';
		if (typeof elevation === 'number' && !isNaN(elevation)) {
			as.altitude = elevation;
		} else if (typeof elevation === 'string') {
			const parsed = parseASdistance(elevation);
			if (parsed && !isNaN(parsed.amount)) {
				as.altitude = parsed.amount;
				altitudeUnits = parsed.units;
			}
		}
		if (typeof as.altitude === 'number') {
			if (!as.units) {
				as.units = altitudeUnits;
			} else if (altitudeUnits !== as.unit) {
				as.altitude = convert(as.altitude, altitudeUnits, (as.units as wellKnownUnit));
			}
		}
	} else if (!!latitude.length && !!longitude.length) {
		as.latitude = toFloat(latitude[0]);
		as.longitude = toFloat(longitude[0]);
	}


	let [summary, content, adr, tel, _url] = [
		toParagraph(disambiguatingDescription), toParagraph(description),
		toParagraph(address), toParagraph(telephone), toParagraph(url)
	];
	const fallbackSummary = `${!!adr.length ? adr+'<br><br>' : ''}${!!tel.length ? tel : ''}`;
	as.summary = !summary.length ? [fallbackSummary] : [summary];
	as.content = !content.length ? (!!summary.length ? [fallbackSummary, _url] : [_url]) : [content, _url];

	type.reverse().forEach((_t) => { as.type.unshift(_t) });
	if (typeof label === 'string' && !!label) { as['rdfs:comment'] = label }
	// TODO logo, photo +
	/* address	[PostalAddress | Text]
	addressCountry [Country | Text]
	postalCode [Text]
	geo /	GeoShape
	box [Text]
	circle [Text]
	line [Text]
	polygon [Text]
	*/
	console.log('schemaLocation', as);
	return as
}
