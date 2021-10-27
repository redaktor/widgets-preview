import { tsx, create } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { schemaToAsLocation } from './util';
import { AsObjectNormalized } from '../common/interfaces';
import i18nActivityPub from '../middleware/i18nActivityPub';
import id from '../middleware/id';
import theme from '../middleware/theme';
// import Paginated from '../paginated';
import Icon from '../icon';
import { latLngStr } from '../map/util';
import bundle from '../_ld/redaktor/nls/redaktor';
import * as css from '../theme/material/Location.m.css';
/*
TODO
GeospatialGeometry of schema.org, Place.geo – see https://schema.org/GeoShape
*/

export interface LocationProperties extends AsObjectNormalized {
	/** Is a map is connected? Location w. close icon */
	hasMap?: boolean;
	/** If a map is connected, is any location open? */
	mapOpenIndex?: number | false;
	/** onClick acts as toggle */
	onClick?: (location: AsObjectNormalized | false) => any;
}
export interface LocationIcache {
	mapOpenIndex: number | false;
}
const icache = createICacheMiddleware<LocationIcache>();
const factory = create({ theme, icache, id, i18nActivityPub }).properties<LocationProperties>()
const Location = factory(function Location({ properties, middleware: { theme, icache, id, i18nActivityPub } }) {
	const themedCss = theme.classes(css);
	const {
		hasMap = false,
		mapOpenIndex = false,
		onClick,
		...ld
	} = i18nActivityPub.normalized<LocationProperties>();
	const {get, getOrSet, set} = icache;
	hasMap && getOrSet('mapOpenIndex', mapOpenIndex||false, false);

	const {
		'schema:contentLocation': contentLocation = [],
		'schema:spatialCoverage': spatialCoverage = [],
		'schema:locationCreated': locationCreated = [],
		location: asLocation = ([] as (AsObjectNormalized[]))
	} = ld;
	const { messages } = i18nActivityPub.localize(bundle);
console.log(hasMap);
	const asLocationIds: any = (asLocation as (AsObjectNormalized[])).map((l) => l.id||'').reduce((o: any, k, i) => {
		o[k] = `${i}`;
		return o
	}, {});

	const schemaLocation: AsObjectNormalized[] = [];
	[
		[contentLocation, 'redaktor:ContentLocation'],
		[spatialCoverage, 'redaktor:SpatialCoverage'],
		[locationCreated, 'redaktor:LocationCreated']
	].forEach((a) => {
		let [loc, type] = a;
		if (!Array.isArray(loc)) { loc = [loc] }
		if (!loc.length) { return }
		loc.forEach((schemaLoc: any) => {
			if (
				(!schemaLoc['@id'] || !asLocationIds.hasOwnProperty(schemaLoc['@id'])) &&
				(!schemaLoc.id || !asLocationIds.hasOwnProperty(schemaLoc.id))
			) {
				schemaLocation.push(schemaToAsLocation(schemaLoc, type))
			}
		});
	});

	const getAddressNode = (loc: AsObjectNormalized, i: number) => {
		const rType = loc.type[0].split('redaktor:');
		const iconType: any = (rType.length > 1 && rType[1] === 'ContentLocation' || rType[1] === 'SpatialCoverage') ?
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
					if (!!hasMap) {
						if (get('mapOpenIndex') === i) {
							onClick && onClick(false);
							set('mapOpenIndex', false);
						} else {
							onClick && onClick(loc);
							set('mapOpenIndex', i);
						}
					}

				}}
			>
				<label classes={themedCss.label} for={id.getId()}>
					<Icon
						{...(!!hasMap ? {} : loc)}
						type={get('mapOpenIndex') === i ? 'close' : iconType}
						size={!!hasMap ? 's' : 'xl'}
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
			{loc.latitude && loc.longitude && !hasMap && <Icon
				type="mapMarker"
				size="s"
				classes={{'@redaktor/widgets/icon': {root: [themedCss.marker], icon: [themedCss.markerIcon]}}}
			/>}
		</virtual>
	}

	/* TODO @type icon */
	const location: AsObjectNormalized[] = [...schemaLocation||[], ...(asLocation as AsObjectNormalized[])||[]];
	const firstLocation = location.shift();

	return <div key="locations" property="location" classes={[
		themedCss.root,
		get('mapOpenIndex') !== false && themedCss.mapOpen
	]}>
		{!!firstLocation && getAddressNode(firstLocation, 0)}
		{!!location.length && <span classes={themedCss.moreCount}>+{location.length}</span>}
		{!!location.length && <div classes={themedCss.fold}>
			<input id={id.getId()} type="checkbox" classes={themedCss.expanded} />
			{location.map((loc, i) => <div
				key={`location_${i+1}`}
				classes={themedCss.foldItem}
			>
					{getAddressNode(loc, i+1)}
			</div>)}
		</div>}
	</div>
});

export default Location;
