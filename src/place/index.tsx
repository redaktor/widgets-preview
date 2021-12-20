import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { AsObject, AsObjectNormalized } from '../common/interfaces';
import { ldPartial, schemaLanguages } from '../_ld';
import { clampStrings } from '../common/activityPubUtil';
import i18nActivityPub from '../middleware/i18nActivityPub';
import id from '../middleware/id';
import theme from '../middleware/theme';
import breakpoints from '../middleware/breakpoint';
import Button from '../button';
import Paginated from '../paginated';
import Caption, { coveredLD as captionCoveredLD } from '../caption';
import I18nAddress from '../intlAddress';
import Map from '../map';
import { latLngStr } from '../map/util';
import Rate from '../rate';
import Details from '../details';
import Structure from '../structure';
import Icon from '../icon';
import Images from '../images';
// import * as ui from '../theme/material/_ui.m.css';
import bundle from './nls/Place';
import * as viewCSS from '../theme/material/_view.m.css';
import * as nameCss from '../theme/material/name.m.css';
import * as css from '../theme/material/place.m.css';
/* TODO ISSUE in /images */
export interface PlaceProperties extends AsObject {
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

const icache = createICacheMiddleware<PlaceIcache>();
const factory = create({ icache, id, i18nActivityPub, theme, breakpoints })
	.properties<PlaceProperties>()
	.children<PlaceChildren | RenderResult | undefined>();

/* TODO
[AP similar] icon: logo, image: photo
AP 			context [is similar to: ]
schema

address -> postOfficeBoxNumber
*/
export const coveredLD = captionCoveredLD.concat([
	'image'
]);
export const Place = factory(function place({
	middleware: { icache, id, i18nActivityPub, theme, breakpoints /*, resource */ },
	properties
}) {

	const { messages } = i18nActivityPub.localize(bundle);
	const {
		fullscreen, widgetId, mediaType, onMouseEnter, onMouseLeave, onLoad, onFullscreen,
		color = 'cyan', fit = false, view = 'column'
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
		// text:
		slogan = [],
		branchCode = [],
		isicV4 = [],
		globalLocationNumber = [],
		// int:
		maximumAttendeeCapacity = [],
		// URL:
		tourBookingPage = []
	} = ldPartial(ld, 'schema', true);

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
	const checkBoolean = (b: any): boolean|'und' => {
		if (typeof b === 'boolean') { return b }
			// just in case
		if (b === 'true') { return true }
		if (b === 'false') { return false }
		return Array.isArray(b) ? (!!b.length && checkBoolean(b[0])) : 'und'
	}
	const [isAccessibleForFree,publicAccess,hasDriveThroughService,smokingAllowed] = [b1,b2,b3,b4].map(checkBoolean);


	/*
	openingHoursSpecification		OpeningHoursSpecification
	specialOpeningHoursSpecification "
	amenityFeature 		https://schema.org/LocationFeatureSpecification
	event 						Event Upcoming or past event associated with this place

	containedInPlace, containsPlace
	geo …

	More specific Types
	Accommodation
	AdministrativeArea
	CivicStructure
	Landform
	LandmarksOrHistoricalBuildings
	LocalBusiness
	Residence
	TouristAttraction
	TouristDestination
	*/
	// const sUrl = 'https://schema.org/';

	const setMap = (location: AsObjectNormalized|false,	locationOpenIndex: number|false) => {
		set('locationOpenIndex', locationOpenIndex, false);
		set('mapWasOpen', true, false);
		set('mapOpen', location);
		const view = get('mapView');
		if (view) {
			view.setActivityPub(location);
		}
	}

	const addressArray = Array.isArray(ld['schema:address']) ? ld['schema:address'] :
		(!!ld['schema:address'] ? [ld['schema:address']] : []);

	const btnClasses = {
		'@redaktor/widgets/button': {
			root: [themedCss.switchButton],
			disabled: [themedCss.disabled]
		}
	};
	const preventDefault = (e: Event) => { e.preventDefault(); }

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
			theme.animated(themedCss)
		]}
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
		aria-label="Image"
		role="region"
	>
		<div classes={themedCss.header}>
			<div classes={themedCss.topWrapper}>
				<div classes={themedCss.metaWrapper}>
					<span classes={themedCss.geoCoordinates}>{latLngStr(ld)}</span>

				</div>
				<noscript><i classes={themedCss.noLocation} /></noscript>
				<div classes={themedCss.switchButtons}>
					<Button color="cyan" design="filled" responsive={false} classes={btnClasses}>
						<Icon type="map" size="xl" spaced="right" /> Karte öffnen
					</Button>
					<Button disabled={true} color="cyan" design="filled" responsive={false} classes={btnClasses}>
						<Icon type="image" size="xl" spaced="right" />
					</Button>
				</div>
				<div classes={[nameCss.root, themedCss.nameWrapper]}>
					{!!slogan.length && <p classes={[nameCss.kicker, themedCss.kicker]}>{slogan.join(', ')}</p>}
					{!!name && !omit.has('name') && <Paginated key="name" property="name" spaced={false}>
						{clampStrings(name, 250).map((s) => <h5>{s}</h5>)}
					</Paginated>}
				</div>
				{!!addressArray.length && !omit.has('schema:address') &&
					<Paginated key="address" property="schema:address" spaced={false}>
						{...addressArray.map((o: any = {}) =>	<I18nAddress address={o}
							additionalProperties={['email','telephone','faxNumber','hoursAvailable','availableLanguage']}
						/>)}
					</Paginated>
				}
			</div>
		</div>
		{!omit.has('location') && ld.location && ld.location.length && <div
			role="region"
			aria-label={messages.locationmap}
			classes={[themedCss.mapWrapper, get('mapWasOpen') && !get('mapOpen') && themedCss.closed]}
		>
			{(get('mapWasOpen') || get('mapOpen')) && getOrSet('map', <Map
				key="map"
				{...ld}
				hasCenterMarker
				hasSearch
				center={get('mapOpen')||void 0}
				zoom={15}
				onView={(view) => {
					set('mapView', view, false);
					ld.location && setMap(ld.location[0], 0);
				}}
				onActivityPubLocation={({pointer}) => {

				}}
				onActivityPubLocationOpen={({id, pointer}) => {

				}}
			/>)}
		</div>}
		<div classes={themedCss.images}>
			<Images key="images" view={view} image={image} size={(vp as any)} />
		</div>
		<div classes={themedCss.content}>
			<div classes={themedCss.contentWrapper}>
				<Caption {...(ld)}
					classes={{
						'@redaktor/widgets/images': { captionWrapper: [themedCss.captionWrapper] }
					}}
					colored
					contentLines={3}
					omitProperties={['name','date','location']}
					onLocale={(l) => i18nActivityPub.setLocale(l)}
				/>
			</div>
			{!!aggregateRating && <div classes={themedCss.rateWrapper}>
				<Rate readOnly {...ldPartial(aggregateRating)} />
			</div>}
			<Details>
				{{
					summary: <span>{messages.moreInfo}</span>,
					content: <Structure omitProperties={coveredLD} value={ld} />
				}}
			</Details>
		</div>
	</div>
});

export default Place;
