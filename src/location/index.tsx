import { tsx, create } from '@dojo/framework/core/vdom';
import { focus } from '@dojo/framework/core/middleware/focus';
import { formatAriaProperties } from '../common/util';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { schemaToAsLocation } from './util';
import { latLngStr } from '../map/util';
import I18nAddress from '../intlAddress';
import { AsObjectNormalized } from '../common/interfaces';
import i18nActivityPub from '../middleware/i18nActivityPub';
import id from '../middleware/id';
import theme, { Keys } from '../middleware/theme';
import Details from '../details';
import Icon from '../icon';
import bundle from '../_ld/redaktor/nls/redaktor';
import * as detailsCss from '../theme/material/details.m.css';
import * as css from '../theme/material/locationsDates.m.css';
/*
TODO
GeospatialGeometry of schema.org, Place.geo – see https://schema.org/GeoShape

return <Details classes={classes} serif open={open}>
{{
	summary
*/
export interface LocationProperties extends AsObjectNormalized {
	/** Is a map is connected? Location w. close icon */
	hasMap?: boolean;
	/** Is it online too ? */
	hasOnline?: boolean;
	/** If a map is connected, is any location open? */
	locationOpenIndex?: number|false;

	isDetails?: boolean;
	/** larger font, e.g. for Events */
	large?: boolean;
	/** onLocation acts as toggle */
	onLocation?: (location: AsObjectNormalized|false, i: number|false) => any;
	onToggle?: (opened: boolean) => any;
	onFocusPrevious?: () => any;
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
		hasMap = false, hasOnline = false, locationOpenIndex = false, isDetails = false, large = false,
		onLocation, onToggle, onFocusPrevious
	} = properties();
	const {
		type = ['Place'],
		'schema:contentLocation': contentLocation = [],
		'schema:spatialCoverage': spatialCoverage = [],
		'schema:locationCreated': locationCreated = [],
		location: asLoc = ([] as (AsObjectNormalized[])),
		...ld
	} = i18nActivityPub.normalized<LocationProperties>();

console.log(asLoc, ld, schemaToAsLocation(asLoc[0], type))

	const { messages, format } = i18nActivityPub.localize(bundle);
	const {get, getOrSet, set} = icache;
	hasMap && set('locationOpenIndex', locationOpenIndex, false);
	const asLocation: AsObjectNormalized[] = asLoc;
	const asLocationIds: any = asLocation.map((l) => l.id||'').reduce((o: any, k, i) => {
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

	const handleFocus = () => {
		if (get('focusIndex') !== 1) {
			set('expanded', true, false);
			set('focusIndex', 0);
			focus.focus();
			onToggle && onToggle(true);
		} else {
			set('expanded', false, false);
			set('focusIndex', -1);
			onFocusPrevious && onFocusPrevious();
			onToggle && onToggle(false);
		}
	}
	const handleBlur = () => {
		set('expanded', false);
		onToggle && onToggle(false);
	}
	const handleClick = (i: number) => () => {
		if (!!hasMap) {
			console.log(get('locationOpenIndex'))
			if (get('locationOpenIndex') === i) {
				set('locationOpenIndex', false);
				onLocation && onLocation(false, false);
			} else {
				set('locationOpenIndex', i);
				onLocation && onLocation(location[i], i);
			}
		}
	}

	/* TODO @type icon */
	const location: AsObjectNormalized[] = [...schemaLocation||[], ...(asLocation as AsObjectNormalized[])||[]];
	if (!location.length) { return '' }

	const getAddressNode = (i: number, isFold = true, isDetails = false) => {
		const loc = location[i];
		const locOpenIndex = get('locationOpenIndex');
		const rType = loc.type[0].split('redaktor:');
		const defaultIconType: any = isFold && locOpenIndex === i ? 'close' :
			((rType.length > 1 && rType[1] === 'ContentLocation' || rType[1] === 'SpatialCoverage') ?
				(type && type.filter((t) => t.split(':').length === 1)[0] || 'Place') :
				(loc.latitude && loc.longitude ? 'mapMarker' : (loc.type.filter((t) => t.split(':').length === 1)[0] || 'Place')));
		const title = isDetails ? '' : (rType[0] === '' && rType.length > 1 && messages.hasOwnProperty(rType[1]) && (messages as any)[rType[1]]) ||
			messages.location;

		const handleKeydown = (event: KeyboardEvent) => {
			event.stopPropagation();
			const fi = get('focusIndex')||0;
			const l = location.length;
			const [prev, next] = [(!fi ? (l ? l-1 : 0) : fi-1), (fi === (l ? l-1 : 0) ? 0 : fi+1)];
			switch (event.which) {
				case Keys.Enter:
				case Keys.Space:
					event.preventDefault();
					handleClick(i)();
					break;
				case Keys.Up:
					set('focusIndex', prev);
					focus.focus();
					event.preventDefault();
					break;
				case Keys.Down:
					set('focusIndex', next);
					focus.focus();
					event.preventDefault();
					break;
				case Keys.Tab:
					set('focusIndex', !!event.shiftKey ? prev : next);
					break;
			}
		}
		const maxWH = isFold ? 'var(--line)' : 'calc(var(--line2) - var(--pt) - var(--ui-border-width-emphasized))';
		const locIcon = <Icon
			{...(!!hasMap ? {} : loc)}
			icon={loc.icon}
			type={defaultIconType}
			title={title}
			size={!!hasMap ? 's' : 'xl'}
			maxWidth={maxWH}
			maxHeight={maxWH}
			spaced="right"
			classes={{'@redaktor/widgets/icon': {icon: [themedCss.icon]}}}
		/>
		const locNode = <virtual>
			<address
				key={`adr_${i}`}
				itemscope itemtype="http://schema.org/Place"
				classes={[
					themedCss.item,
					!!isDetails && themedCss.detailsItem,
					!isDetails && large && themedCss.large
				]}
			>
				<span classes={[themedCss.detailsSummaryOpen]}>
					{format('locationCount',{count: location.length})}
					{hasOnline && ` & ${messages.online}`}
				</span>
				<span classes={[themedCss.detailsSummaryClosed]}>
					{loc.latitude && loc.longitude &&
						<span itemprop="geo" itemscope itemtype="http://schema.org/GeoCoordinates">
							{!loc.name && latLngStr(loc)||''}
							<meta itemprop="latitude" content={`${loc.latitude}`} />
							<meta itemprop="longitude" content={`${loc.longitude}`} />
						</span>
					}
					{(!isDetails || !isFold) && (loc.name ?
						<span classes={[
							themedCss.name,
							location.length === 1 && themedCss.rootSummary,
							location.length === 1 && detailsCss.summaryContent
						]} itemprop="name">
							{locIcon}{loc.name}
						</span> :
						locIcon)
					}
					{isFold && isDetails && <span classes={themedCss.postalAddress}>
						{locIcon}
						<I18nAddress
							itemClasses={themedCss.postalAddressItem}
							address={{ name: loc.name, ...(loc['schema:address']||{}) }}
						/>
					</span>}
				</span>
			</address>
			{loc.latitude && loc.longitude && !hasMap && <Icon
				type="mapMarker"
				size="s"
				classes={{'@redaktor/widgets/icon': {root: [themedCss.marker], icon: [themedCss.markerIcon]}}}
			/>}
		</virtual>;

		return !isFold ? locNode : <li key={`location_${i+1}`}
			role="button"
			tabIndex={0}
			focus={get('focusIndex') === i && focus.shouldFocus}
			onclick={handleClick(i)}
			onkeydown={handleKeydown}
			classes={isDetails ? themedCss.detailsLi : themedCss.foldItem}
		>
			{locNode}
		</li>
	}

	const menuId = id.getId('menu');
	const ariaProperties: { [key: string]: string | null } = isDetails || location.length === 1 ? {} : {
		expanded: (getOrSet('expanded', false) ? 'true' : 'false'),
		controls: menuId
	}
	const onProperties = location.length === 1 ? {
		onclick: handleClick(0),
		onkeydown: (event: KeyboardEvent) => {
			event.stopPropagation();
			if (event.which === Keys.Enter || event.which === Keys.Space) {
				event.preventDefault();
				handleClick(0)();
			}
		}
	} : {};

	const dropdownProperties = isDetails ? {} : {
		role: 'button',
		tabIndex: 0
	}
	return <div key="locations" itemprop="location"
		classes={[
			themedCss.root,
			theme.uiColor('cyan'),
			get('locationOpenIndex') !== false && themedCss.mapOpen,
			location.length === 1 && detailsCss.summary,
			location.length === 1 && detailsCss.animated,
			isDetails && themedCss.isDetails,
			location.length === 1 ? themedCss.singleItem : themedCss.hasFold
		]}
		{...dropdownProperties}
		{...formatAriaProperties(ariaProperties)}
		{...onProperties}
		onfocus={handleFocus}
		onblur={handleBlur}
	>

	{isDetails ? <Details
		size={large ? 'l' : 's'}
		classes={{ '@redaktor/widgets/details': { summary: [themedCss.detailsSummary] } }}
	>
			{{
				summary: <virtual>
					{getAddressNode(get('locationOpenIndex')||0, false, true)}
					{location.length > 1 && <virtual>
						<output classes={themedCss.moreCount}>{` +${location.length-(hasOnline ? 0 : 1)}`}</output>
					</virtual>}
				</virtual>,
				content: <ul classes={themedCss.detailsUl}>
						{location.map((loc, i) => getAddressNode(i, true, true))}
					</ul>
			}}
		</Details> : <virtual>
			{getAddressNode(get('locationOpenIndex')||0, false)}
			{location.length > 1 && <output classes={themedCss.moreCount}>{` +${location.length-1}`}</output>}
			{location.length > 1 && <ul id={menuId} role="menu" aria-modal="true" classes={themedCss.fold}>
					{location.map((loc, i) => getAddressNode(i))}
				</ul>
			}
		</virtual>}
	</div>
});

export default Location;
