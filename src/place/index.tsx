import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { AsObject, AsObjectNormalized } from '../common/interfaces';
import { ldPartial, toIntStr, toBooleanStr } from '../_ld';
import { clampStrings } from '../common/activityPubUtil';
import i18nActivityPub from '../middleware/i18nActivityPub';
import id from '../middleware/id';
import theme from '../middleware/theme';
import breakpoints from '../middleware/breakpoint';
// import Button from '../button';
import Paginated from '../paginated';
import Caption, { coveredLD as captionCoveredLD } from '../caption';
import I18nAddress from '../intlAddress';
import Map from '../map';
import Rate from '../rate';
import Details from '../details';
import Structure from '../structure';
import Icon from '../icon';
import Images from '../images';
import Geo from '../geo';
import { osmWheelchairAndAmenities, LocationFeatureSpecification } from './util';
import Smoke, { Smoking } from '../smoke';
// import * as ui from '../theme/material/_ui.m.css';
import bundle from './nls/Place';
import * as viewCSS from '../theme/material/_view.m.css';
import * as nameCss from '../theme/material/name.m.css';
import * as css from '../theme/material/place.m.css';
/* TODO ISSUE in /images */
export interface PlaceProperties extends AsObject {
	addressExpanded?: boolean;
	view?: 'responsive' | 'column' | 'row' | 'tableRow';
	fullscreen?: boolean;
	fit?: boolean;
	editable?: boolean;
	/** `id` set on the root DOM node */
	widgetId?: string;
	/* when main image has loaded */
	onLoad?: () => any;
	/* when entering fullscreen */
	onFullscreen?: () => any;

	onMouseEnter?: (evt: MouseEvent) => any;
	onMouseLeave?: (evt: MouseEvent) => any;
}

export interface PlaceIcache {
	currentLocale: {locale: string, rtl?: boolean};
	brightnessClass: string;
	loadedImages: boolean;
	mapOpen: false | AsObjectNormalized;
	mapWasOpen: boolean;
	map: any;
	mapView: any;
	locationOpenIndex?: number | false;
}
export interface PlaceChildren {
	/** Optional Header */
	timeWrapper?: RenderResult;
	/** Optional Footer */
	footer?: RenderResult;
}

/* TODO [AP similar] icon: logo, image: photo
AP 			context [see CONCEPTS]
---
CONCEPTS:
containedInPlace, containsPlace,
event 						Event Upcoming or past event associated with this place
---
vcard:tz – TIMEZONE OF PLACE
---
TMP places / Opening Hours:
- validFrom startTime			Date
- validTo endTime 				Date
- openingHoursSpecification		OpeningHoursSpecification
- specialOpeningHoursSpecification "
adr - hoursAvailable 	OpeningHoursSpecification

schema:
tourBookingPage
geo …

address format
*/

const icache = createICacheMiddleware<PlaceIcache>();
const factory = create({ icache, id, i18nActivityPub, theme, breakpoints })
	.properties<PlaceProperties>()
	.children<PlaceChildren | RenderResult | undefined>();

/* TODO osm and wikidata ID per API e.g. https://api.openstreetmap.org/api/0.6/node/6171146490.json */
export const coveredLD = captionCoveredLD.concat([
	'image', 'schema:amenityFeature', 'schema:slogan', 'schema:maximumAttendeeCapacity',
	'schema:aggregateRating', 'schema:isAccessibleForFree', 'schema:publicAccess',
	'schema:hasDriveThroughService', 'schema:smokingAllowed',	'schema:address', 'schema:email',
	'schema:telephone', 'schema:faxNumber', 'schema:hoursAvailable', 'schema:availableLanguage'
	// 'schema:tourBookingPage'
]);
export const schemaSubTypes = [ 'Accommodation', 'AdministrativeArea', 'CivicStructure',
	'Landform', 'LandmarksOrHistoricalBuildings', 'LocalBusiness', 'Residence',
	'TouristAttraction', 'TouristDestination' ];
export const Place = factory(function place({
	middleware: { icache, id, i18nActivityPub, theme, breakpoints /*, resource */ },
	properties
}) {

	const { messages } = i18nActivityPub.localize(bundle);
	const {
		fullscreen, widgetId, mediaType, onMouseEnter, onMouseLeave, onLoad, onFullscreen,
		addressExpanded = false, fit = false, color = 'amber', view = 'column'
	} = properties();
	const { get, set, getOrSet } = icache;
	const themedCss = theme.classes(css);
	const {
		published, updated, duration, 'dc:created': contentCreated = [], ...ld
	} = i18nActivityPub.normalized<PlaceProperties>();
	const omit = i18nActivityPub.omit();
	const idBase = id.getId('place');
	if (view === 'tableRow') {
		return 'TODO'
	}

	const viewDesktopCSS = theme.viewDesktopCSS();
	let vp = 'm' ;
	if (view === 'responsive') {
		const {breakpoint = 's'} = breakpoints.get('measure')||{};
		vp = breakpoint;
	}
	const { name, image = [] } = ld;

	const { tz } = ldPartial(ld, 'vcard');
	const {
		amenityFeature = [],
		// text:
		slogan = [],
		email,
		telephone,
		faxNumber,
		hoursAvailable,
		availableLanguage,
		// URL:
		tourBookingPage = [],
		// int:
		maximumAttendeeCapacity: _mc = []
	} = ldPartial(ld, 'schema', true);
	const mc = toIntStr(_mc);
	// map boolean to undetermined or boolean
	const {
		aggregateRating: rating,
		// boolean:
		isAccessibleForFree: b1 = 'und',
		publicAccess: b2 = 'und',
		hasDriveThroughService: b3 = 'und',
		smokingAllowed: b4 = 'und'
	} = ldPartial(ld);
	const aggregateRating = Array.isArray(rating) ? rating[0] : rating;
	const [isAccessibleForFree,publicAccess,hasDriveThroughService,smokingAllowed] = [b1,b2,b3,b4].map(toBooleanStr);
	if (hasDriveThroughService === 'yes') {
		amenityFeature.push({propertyID: 'hasDriveThroughService', value: hasDriveThroughService })
	}
	const { wheelchair, amenities: _amenities } = osmWheelchairAndAmenities(amenityFeature);
	const toFeatureIcons = (a: [string, string]) => {
		const titleO = messages.hasOwnProperty(a[0]) ? { title: (messages as any)[a[0]] } : {};
		return <img {...titleO}
			classes={a[0].indexOf('wheelchair') !== 0 ? themedCss.featureIcon : themedCss.wheelchair}
			src={a[1]}
		/>
	}
	const { type } = ld;
	const specificAmenities: [string, string][] = schemaSubTypes
		.filter(s => type.includes(s)||type.includes(`http://schema.org/${s}`)||type.includes(`schema:${s}`))
		.map(s => [s, `/assets/osm/${s}.svg`]);
	const amenities = specificAmenities.concat(_amenities);
	// amenityFeature: https://schema.org/LocationFeatureSpecification
	let smoking: Smoking|'und';
	const smokingFeature = amenityFeature.filter((o: LocationFeatureSpecification) => o.propertyID === 'smoking');
	if (!!smokingFeature.length) {
		smoking = smokingFeature[0].value;
	} else {
		smoking = smokingAllowed;
	}
	const featureIcons = amenities.map(toFeatureIcons);

	const msg = (s: string, b: string) => !!s && messages.hasOwnProperty(s) ?
		<span>
			<Icon type={b === 'yes' ? 'check' : 'closed'} color={b === 'yes' ? color : 'error'}
				spaced="right" />
			<small>{(messages as any)[s]}</small>
		</span> : '';

	const [isPublic, isFree] = [
		msg(`public_${publicAccess}`, publicAccess),
		msg(`free_${isAccessibleForFree}`, isAccessibleForFree)
	];
	const statusByline = featureIcons.length > 4 ? ' ' : (!isFree && !isPublic ? '' :
		<virtual>{isPublic} {isFree}</virtual>);

	const setMap = (location: AsObjectNormalized|false,	locationOpenIndex: number|false) => {
		set('locationOpenIndex', locationOpenIndex, false);
		set('mapWasOpen', true, false);
		set('mapOpen', location);
		const view = get('mapView');
		if (view) {
			view.setActivityPub(location);
		}
	}
/*
	const btnClasses = {
		'@redaktor/widgets/button': { root: [themedCss.switchButton] }
	};


	<noscript><i classes={themedCss.noLocation} /></noscript>

	{!!featureIcons.length && <div classes={themedCss.featureIcons}>{featureIcons}</div>}
*/
	const addressArray = Array.isArray(ld['schema:address']) ? ld['schema:address'] :
		(!!ld['schema:address'] ? [ld['schema:address']] : []);
	const addressPaginated = <Paginated key="address" property="schema:address" spaced={false}>
		{...addressArray.map((o: any = {}) =>	<I18nAddress address={o}
			additionalProperties={['email','telephone','faxNumber','hoursAvailable','availableLanguage']}
		/>)}
	</Paginated>
	const namePR = (isPublic || isFree || !!slogan.length) ? '0px' :
		`calc((var(--line) + var(--grid-base)) * ${smoking === 'no' ? 2 : 1})`;

	return <div
		key="root"
		classes={[
			themedCss.root,
			theme.variant(),
			// !!get('loadedImages') && themedCss.imagesOpen,
			// isColumn ? themedCss.column : themedCss.row,
			viewCSS.item,
			!!viewDesktopCSS && viewDesktopCSS.item,
			theme.shaped(themedCss),
			theme.uiSize(),
			theme.uiColor(color),
			theme.uiElevation(),
			theme.animated(themedCss),
			!!addressExpanded && themedCss.expanded
		]}
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
		aria-label="Image"
		role="region"
	>
		<div classes={themedCss.header}>
			<div classes={themedCss.topWrapper}>
				<div key="meta" classes={themedCss.metaWrapper}>
					{<p key="meta1" classes={themedCss.attendanceCount}><Geo {...ld} /></p>}
					{!!mc && <p key="meta2" classes={themedCss.attendanceCount}>
						{mc} <Icon type="people" size="s" />
						<div key="meta3" classes={themedCss.smokingAndWheelchair}>
							{smoking === 'no' && <Smoke smoking="no" />}
							{wheelchair.map(toFeatureIcons)}
						</div>
					</p>}
				</div>

				<div key="nameWrapper" classes={[nameCss.root, themedCss.nameWrapper]} style={`--pr: ${namePR};`}>
					{!!statusByline && <p classes={[themedCss.placeStatus, (isPublic||isFree) && !slogan.length && themedCss.topSpace]}>
						{statusByline}
					</p>}
					{!!slogan.length && <p classes={[nameCss.kicker, themedCss.kicker]}>{slogan.join(', ')}</p>}
					{!!name && !omit.has('name') && <Paginated key="name" property="name" spaced="right">
						{clampStrings(name, 250).map((s) => <h5>{s}</h5>)}
					</Paginated>}
					{(email || telephone || faxNumber || hoursAvailable || availableLanguage) && <p classes={themedCss.topContact}>
						<I18nAddress address={{email, telephone, faxNumber, hoursAvailable, availableLanguage}}
							additionalProperties={['email','telephone','faxNumber','hoursAvailable','availableLanguage']}
							onlyAdditional={true} color={color}
						/>
					</p>}
				</div>
			</div>
			<div key="addressWrapper" classes={themedCss.addressWrapper}>
				{!!featureIcons.length && <div classes={themedCss.featureIcons}>{featureIcons}</div>}
				{!!addressArray.length && !omit.has('schema:address') && !!addressExpanded ? addressPaginated :
					<Details color={color}>{{
						summary: messages.adrContact,
						content: addressPaginated
					}}</Details>
				}
			</div>
		</div>
		{!omit.has('location') && <Details
			color={color}
			classes={{'@redaktor/widgets/details': { summary: [themedCss.mapDetails] }}}
			onToggle={(e) => {
				if (e.target && !e.target.open) {
					set('mapOpen', false)
				} else {
					getOrSet('mapOpen', ld)
				}
			}}
		>{{
			summary: !get('mapOpen') ?
				<span><Icon type="map" color="neutral" spaced="right" />{messages.map}</span> :
				<span><Icon type="image" color="neutral" spaced="right" />({image.length} {messages.images})</span>,
			content: (get('mapWasOpen') || get('mapOpen')) ? getOrSet('map', <Map
				key="map"
				{...ld}
				hasCenterMarker
				hasSearch
				center={get('mapOpen')||void 0}
				zoom={15}
				onView={(view) => {
					set('mapView', view, false);
					ld && setMap(ld, 0);
				}}
				onActivityPubLocation={({pointer}) => {

				}}
				onActivityPubLocationOpen={({id, pointer}) => {

				}}
			/>) : ''
		}}</Details>}
		{!omit.has('image') && <div key="images" classes={themedCss.images}>
			<Images view={view} image={image} itemsPerPage={4} size={(vp as any)} />
		</div>}
		<div classes={themedCss.content}>
			<div key="contentWrapper" classes={themedCss.contentWrapper}>
				<Caption {...(ld)}
					classes={{
						'@redaktor/widgets/images': { captionWrapper: [themedCss.captionWrapper] }
					}}
					colored
					color={color}
					contentLines={3}
					omitProperties={['name','date','location']}
					onLocale={(l) => i18nActivityPub.setLocale(l)}
				/>
			</div>
			{!!aggregateRating && <div key="rateWrapper" classes={themedCss.rateWrapper}>
				<Rate readOnly {...ldPartial(aggregateRating)} />
			</div>}
			<Details classes={{'@redaktor/widgets/details': {root: [themedCss.additional]}}}>
				{{
					summary: <span>{messages.moreInfo}{!!smoking && smoking !== 'no' && smoking !== 'und' &&
						<Smoke smoking={smoking} classes={{
							'@redaktor/widgets/smoke': { root: [themedCss.smokeRoot], smokeWrapper: [themedCss.smokeWrapper] }
						}} />}
					</span>,
					content: <div classes={themedCss.additionalContent}>
						<p classes={themedCss.placeMeta}>
							{!!smoking && (messages as any)[`smoking_${smoking}`]}
						</p>
						<Structure omitProperties={coveredLD} value={ld} />
					</div>
				}}
			</Details>
		</div>
	</div>
});

export default Place;
