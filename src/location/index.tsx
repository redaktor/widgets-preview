import { tsx, create } from '@dojo/framework/core/vdom';
import { schemaToAsLocation } from './util';
import { AsObjectNormalized } from '../common/interfaces';
import i18nActivityPub from '../middleware/i18nActivityPub';
import theme from '../middleware/theme';
import Paginated from '../paginated';
import Icon from '../icon';
import { latLngStr } from '../map/util';
import bundle from '../_ld/redaktor/nls/redaktor';
import * as css from '../theme/material/Location.m.css';
/*
TODO
GeospatialGeometry of schema.org, Place.geo – see https://schema.org/GeoShape
*/

export interface LocationProperties extends AsObjectNormalized {
	/** If a map is connected, is it open? */
	hasOpenMap: boolean;
	/** onClick acts as toggle */
	onClick: (location: AsObjectNormalized | false) => any;
}

const factory = create({ theme, i18nActivityPub }).properties<LocationProperties>()
const Location = factory(function Location({ properties, middleware: { theme, i18nActivityPub } }) {
	const themedCss = theme.classes(css);
	const {
		hasOpenMap = false,
		onClick,
		...ld
	} = i18nActivityPub.normalized<LocationProperties>();
	const {
		'schema:contentLocation': contentLocation = [],
		'schema:spatialCoverage': spatialCoverage = [],
		'schema:locationCreated': locationCreated = [],
		location: asLocation = ([] as (AsObjectNormalized[]))
	} = ld;
	const { messages } = i18nActivityPub.localize(bundle);

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
	}, []);

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
					onClick && onClick(!hasOpenMap ? loc : false);
				}}
			>
				<label style="margin:0; padding:0;" for="xyztest">
					<Icon
						{...(!!hasOpenMap ? {} : loc)}
						type={!!hasOpenMap ? 'close' : iconType}
						size={!!hasOpenMap ? 's' : 'xl'}
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
			{loc.latitude && loc.longitude && !hasOpenMap && <Icon
				type="mapMarker"
				size="s"
				classes={{'@redaktor/widgets/icon': {root: [themedCss.marker], icon: [themedCss.markerIcon]}}}
			/>}
		</virtual>
	}

	/* TODO @type icon */
	const location: AsObjectNormalized[] = [...schemaLocation||[], ...(asLocation as AsObjectNormalized[])||[]];
	const firstLocation = location.shift();

	return <div classes={themedCss.root} key="locations" property="location">
		{!!firstLocation && getAddressNode(firstLocation, 0)}
		<div classes={themedCss.fold}>
			<input id="xyztest" type="checkbox" classes={themedCss.foldInput} />
			{location.map((loc, i) => <div
				key={`location_${i+1}`}
				classes={themedCss.foldItem}
			>
					{getAddressNode(loc, i+1)}
			</div>)}
		</div>
	</div>
});

export default Location;
