import { tsx, create } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { schemaToAsDate } from './util';
import { AsObjectNormalized } from '../common/interfaces';
import i18nActivityPub from '../middleware/i18nActivityPub';
import id from '../middleware/id';
import theme from '../middleware/theme';
// import Paginated from '../paginated';
import Icon from '../icon';
import { latLngStr } from '../map/util';
import bundle from '../_ld/redaktor/nls/redaktor';
import * as css from '../theme/material/Date.m.css';
/*
TODO
GeospatialGeometry of schema.org, Place.geo – see https://schema.org/GeoShape
*/

export interface DateProperties extends AsObjectNormalized {
	/** Is a map is connected? Date w. close icon */
	hasCalendar?: boolean;
	/** If a map is connected, is any location open? */
	calendarOpenIndex?: number | false;
	/** onClick acts as toggle */
	onClick?: (location: AsObjectNormalized | false) => any;
}
export interface DateIcache {
	calendarOpenIndex: number | false;
}
const icache = createICacheMiddleware<DateIcache>();
const factory = create({ theme, icache, id, i18nActivityPub }).properties<DateProperties>()
const Date = factory(function Date({ properties, middleware: { theme, icache, id, i18nActivityPub } }) {
	const themedCss = theme.classes(css);
	const {
		hasCalendar = false,
		calendarOpenIndex = false,
		onClick,
		...ld
	} = i18nActivityPub.normalized<DateProperties>();
	const {get, getOrSet, set} = icache;
	hasCalendar && getOrSet('calendarOpenIndex', calendarOpenIndex||false, false);

	const {
		startTime, endTime,
		'schema:contentReferenceTime': contentReferenceTime = [],
		'schema:dateCreated': dateCreated = [],
		'schema:expires': expires = [],
		published, updated, duration
	} = ld;
	const { messages } = i18nActivityPub.localize(bundle);
/*
schema/isDatetime:
contentReferenceTime	DateTime
The specific time described by a creative work, for works (e.g. articles, video objects etc.) that emphasise a particular moment within an Event.
dateCreated	Date || DateTime
Date of first broadcast/publication.
expires Date
Date the content expires and is no longer useful or available.

isDatetime: published, updated, startTime, endTime
isDuration: duration
*/

	const schemaDate: AsObjectNormalized[] = [];
	[
		[dateCreated, 'redaktor:ContentDate'],
		[dateModified, 'redaktor:SpatialCoverage'],
		[datePublished, 'redaktor:DateCreated']
	].forEach((a) => {
		let [loc, type] = a;
		if (!Array.isArray(loc)) { loc = [loc] }
		if (!loc.length) { return }
		loc.forEach((schemaLoc: any) => {
			if (
				(!schemaLoc['@id'] || !asDateIds.hasOwnProperty(schemaLoc['@id'])) &&
				(!schemaLoc.id || !asDateIds.hasOwnProperty(schemaLoc.id))
			) {
				schemaDate.push(schemaToAsDate(schemaLoc, type))
			}
		});
	}, []);

	const getAddressNode = (loc: AsObjectNormalized, i: number) => {
		const rType = loc.type[0].split('redaktor:');
		const iconType: any = (rType.length > 1 && rType[1] === 'ContentDate' || rType[1] === 'SpatialCoverage') ?
			(ld.type && ld.type.filter((t) => t.split(':').length === 1)[0] || 'Place') :
			(loc.type.filter((t) => t.split(':').length === 1)[0] || 'Place');
		const label = (rType[0] === '' && rType.length > 1 && messages.hasOwnProperty(rType[1]) && (messages as any)[rType[1]]) ||
			messages.location;

		return <virtual>
			<address
				key={`adr_${i}`}
				itemscope itemtype="http://schema.org/Place"
				title={label}
				classes={[themedCss.item]}
				onclick={() => {
					console.log(loc);
					if (!!hasCalendar) {
						if (get('calendarOpenIndex') === i) {
							onClick && onClick(false);
							set('calendarOpenIndex', false);
						} else {
							onClick && onClick(loc);
							set('calendarOpenIndex', i);
						}
					}

				}}
			>
				<label classes={themedCss.label} for={id.getId()}>
					<Icon
						{...(!!hasCalendar ? {} : loc)}
						type={get('calendarOpenIndex') === i ? 'close' : iconType}
						size={!!hasCalendar ? 's' : 'xl'}
						maxWidth="var(--line2)"
						maxHeight="var(--line2)"
						spaced="right"
						classes={{'@redaktor/widgets/icon': {icon: [themedCss.icon]}}}
					/>
					{loc.name &&
						<span classes={themedCss.name} itemprop="name">{loc.name}</span>
					}
					{loc.latitude && loc.longitude &&
						<span itemprop="geo" itemscope itemtype="http://schema.org/GeoCoordinates">
							{!loc.name && latLngStr(loc)||''}
							<meta itemprop="latitude" content={`${loc.latitude}`} />
							<meta itemprop="longitude" content={`${loc.longitude}`} />
						</span>
					}
				</label>
			</address>
			{loc.latitude && loc.longitude && !hasCalendar && <Icon
				type="mapMarker"
				size="s"
				classes={{'@redaktor/widgets/icon': {root: [themedCss.marker], icon: [themedCss.markerIcon]}}}
			/>}
		</virtual>
	}

	/* TODO @type icon */
	const location: AsObjectNormalized[] = [...schemaDate||[], ...(asDate as AsObjectNormalized[])||[]];
	const firstDate = location.shift();

	return <div key="locations" property="location" classes={[
		themedCss.root,
		get('calendarOpenIndex') !== false && themedCss.mapOpen
	]}>
		{!!firstDate && getAddressNode(firstDate, 0)}
		{!!location.length && <span classes={themedCss.moreCount}>+{location.length}</span>}
		<div classes={themedCss.fold}>
			<input id={id.getId()} type="checkbox" classes={themedCss.expanded} />
			{location.map((loc, i) => <div
				key={`location_${i+1}`}
				classes={themedCss.foldItem}
			>
					{getAddressNode(loc, i+1)}
			</div>)}
		</div>
	</div>
});

export default Date;
