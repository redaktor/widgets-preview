import { tsx, create } from '@dojo/framework/core/vdom';
import { focus } from '@dojo/framework/core/middleware/focus';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { schemaToAsLocation } from './util';
import { AsObjectNormalized } from '../common/interfaces';
import i18nActivityPub from '../middleware/i18nActivityPub';
import id from '../middleware/id';
import theme, { Keys } from '../middleware/theme';
// import Paginated from '../paginated';
import Icon from '../icon';
import { latLngStr } from '../map/util';
import bundle from '../_ld/redaktor/nls/redaktor';
import * as css from '../theme/material/locationsDates.m.css';
/*
TODO
GeospatialGeometry of schema.org, Place.geo – see https://schema.org/GeoShape
*/

export interface LocationProperties extends AsObjectNormalized {
	/** Is a map is connected? Location w. close icon */
	hasMap?: boolean;
	/** If a map is connected, is any location open? */
	locationOpenIndex?: number|false;
	/** onLocation acts as toggle */
	onLocation?: (location: AsObjectNormalized|false, i: number|false) => any;
}
export interface LocationIcache {
	expanded: boolean;
	locationOpenIndex: number|false;
	focusIndex?: number;
}
const icache = createICacheMiddleware<LocationIcache>();
const factory = create({ theme, focus, icache, id, i18nActivityPub }).properties<LocationProperties>()
const Location = factory(function Location({ properties, middleware: { theme, focus, icache, id, i18nActivityPub } }) {
	const themedCss = theme.classes(css);
	const {
		hasMap = false,
		locationOpenIndex = false,
		onLocation,
	} = properties();
	const {
		type = ['Place'],
		'schema:contentLocation': contentLocation = [],
		'schema:spatialCoverage': spatialCoverage = [],
		'schema:locationCreated': locationCreated = [],
		location: asLocation = ([] as (AsObjectNormalized[])),
		...ld
	} = i18nActivityPub.normalized<LocationProperties>();

	const { messages } = i18nActivityPub.localize(bundle);
	const {get, getOrSet, set} = icache;
	hasMap && set('locationOpenIndex', locationOpenIndex, false);

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

	/* TODO @type icon */
	const location: AsObjectNormalized[] = [...schemaLocation||[], ...(asLocation as AsObjectNormalized[])||[]];
	if (!location.length) { return '' }

	const getAddressNode = (i: number, isFold = true) => {
		const loc = location[i];
		const locOpenIndex = get('locationOpenIndex');
		const rType = loc.type[0].split('redaktor:');
		const iconType: any = (rType.length > 1 && rType[1] === 'ContentLocation' || rType[1] === 'SpatialCoverage') ?
			(type && type.filter((t) => t.split(':').length === 1)[0] || 'Place') :
			(loc.type.filter((t) => t.split(':').length === 1)[0] || 'Place');
		const title = (rType[0] === '' && rType.length > 1 && messages.hasOwnProperty(rType[1]) && (messages as any)[rType[1]]) ||
			messages.location;

		const handleClick = () => {
			if (!!hasMap) {
				if (locOpenIndex === i) {
					set('locationOpenIndex', false);
					onLocation && onLocation(false, false);
				} else {
					set('locationOpenIndex', i);
					onLocation && onLocation(loc, i);
				}
			}
		}
		const handleKeydown = (event: KeyboardEvent) => {
			event.stopPropagation();
			const focusIndex = get('focusIndex')||0;
			const l = location.length;
			switch (event.which) {
				case Keys.Enter:
				case Keys.Space:
					event.preventDefault();
					handleClick();
				break;
				case Keys.Up:
					set('focusIndex', !focusIndex ? (l ? l-1 : 0) : focusIndex-1);
					focus.focus();
					event.preventDefault();
					break;
				case Keys.Down:
					set('focusIndex', focusIndex === (l ? l-1 : 0) ? 0 : focusIndex+1);
					focus.focus();
					event.preventDefault();
					break;
			}
		}

		const locNode = <virtual>
			<address
				key={`adr_${i}`}
				itemscope itemtype="http://schema.org/Place"
				classes={[themedCss.item]}
			>
				<Icon
					{...(!!hasMap ? {} : loc)}
					type={locOpenIndex !== false && locOpenIndex === i ? 'close' : iconType}
					title={title}
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
			</address>
			{loc.latitude && loc.longitude && !hasMap && <Icon
				type="mapMarker"
				size="s"
				classes={{'@redaktor/widgets/icon': {root: [themedCss.marker], icon: [themedCss.markerIcon]}}}
			/>}
		</virtual>;
		return !isFold ? locNode : <li
			key={`location_${i+1}`}
			tabIndex={0}
			focus={get('focusIndex') === i && focus.shouldFocus}
			onclick={handleClick}
			onkeydown={handleKeydown}
			classes={[themedCss.foldItem]}
		>
			{locNode}
		</li>
	}

	const menuId = id.getId('menu');

	return <span key="locations" itemprop="location"
		role="button"
		aria-expanded={getOrSet('expanded', false) ? 'true' : 'false'}
		aria-controls={menuId}
		classes={[
			themedCss.root,
			get('locationOpenIndex') !== false && themedCss.mapOpen,
			location.length > 1 && themedCss.hasFold
		]}
		onfocus={() => {
			set('expanded', true);
			set('focusIndex', 0);
			focus.focus()
		}}
		onblur={() => {
			set('expanded', false)
		}}
	>
		{getAddressNode(0, false)}
		{location.length > 1 && <output classes={themedCss.moreCount}>+{location.length-1}</output>}
		{location.length > 1 && <ul id={menuId} role="menu" aria-modal="true" classes={themedCss.fold}>
				{location.map((loc, i) => getAddressNode(i))}
			</ul>
		}
	</span>
});

export default Location;
