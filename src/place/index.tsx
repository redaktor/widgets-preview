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
import Paginated from '../paginated';
import TimeRelative from '../timeRelative';
import Caption, { coveredLD as captionCoveredLD } from '../caption';
import I18nAddress from '../intlAddress';
import Map from '../map';
import Rate from '../rate';
import Details from '../details';
import Structure from '../structure';
import Icon from '../icon';
import Images from '../images';
import Img, { getWH } from '../image/image';
// import * as ui from '../theme/material/_ui.m.css';
import bundle from './nls/Place';
import * as viewCSS from '../theme/material/_view.m.css';
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

slogan
tourBookingPage
event Upcoming or past event associated with this place, organization, or action.
amenityFeature
branchCode
isicV4
globalLocationNumber
containedInPlace, containsPlace
geo …

boolean:
hasDriveThroughService
isAccessibleForFree
publicAccess
smokingAllowed

maximumAttendeeCapacity 		Int
openingHoursSpecification		OpeningHoursSpecification
specialOpeningHoursSpecification


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
export const coveredLD = captionCoveredLD.concat([
	'image'
]);
export const Place = factory(function place({
	middleware: { icache, id, i18nActivityPub, theme, breakpoints /*, resource */ },
	properties
}) {
	const {
		fullscreen, widgetId, mediaType, onMouseEnter, onMouseLeave, onLoad, onFullscreen,
		color = 'cyan', fit = false, view = 'column'
	} = properties();
	const { get, set, getOrSet } = icache;
	const themedCss = theme.classes(css);
	const { messages } = i18nActivityPub.localize(bundle);

	const {
		startTime: start, endTime: end, published, updated, duration,
		'dc:created': contentCreated = [],
		omitProperties = new Set(),
		...ld
	} = i18nActivityPub.normalized<PlaceProperties>();

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
	const {
		dateCreated = [], contentReferenceTime = [], expires = [], startDate, endDate,
		eventAttendanceMode = '', eventStatus = '', previousStartDate, inLanguage, aggregateRating,
		maximumAttendeeCapacity: mc,
		maximumPhysicalAttendeeCapacity: mpc,
		maximumVirtualAttendeeCapacity: mvc
	} = ldPartial(ld);

	const sUrl = 'https://schema.org/';
	const status = eventStatus.replace(sUrl,'');
	const mode = status === 'EventMovedOnline' ? 'online' :
		(eventAttendanceMode.replace(sUrl,'') === 'MixedEventAttendanceMode' ? 'mixed' :
			(eventAttendanceMode.replace(sUrl,'') === 'OnlineEventAttendanceMode' ? 'online' : 'offline'));
	const inLanguages = schemaLanguages(inLanguage, i18nActivityPub.get().locale);
	const [isCancelled, isPostponed] = [status === 'EventCancelled', status === 'EventPostponed'];
console.log(inLanguages);
	const startTime = start || startDate;
	const endTime = (isCancelled || isPostponed ? void 0 : end || endDate);

	const imgId = id.getId('eventimages');
	const hasImage = !!image.length;
	let img;
	let fitContain = true;
	let aspectRatio = 1;
	if (!!hasImage) {
		img = image[0];
		if (typeof img === 'string') { img = {type: ['Image'], url: img} }
		const {width = 0, height = 0} = getWH(img as AsObjectNormalized);
		aspectRatio = (!width || !height ? 0 : width/height)
		fitContain = aspectRatio < 1.16;
	}
	const addLines = [
		1.25, 1.3333, 1.5, 1.6, 1.7777, 2.2857, 2.6666, 3, 4.5
	].reduce((n, ar, i) => aspectRatio > ar ? i+1 : n, 0);

	const timeOrStatusNode = !startTime && !endTime ? '' : (isCancelled || isPostponed ?
		<h5 classes={themedCss.placeStatus}>
			<Icon type={isCancelled ? 'cancel' : 'bullhorn'} spaced="right" />
			{isCancelled ? messages.cancelled : messages.postponed}
		</h5> : <small classes={themedCss.placeMeta}>
			<TimeRelative date={startTime||endTime} />
		</small>);

	const images = <div classes={themedCss.imagesWrapper}>
		<Images {...ld}
			key="images"
			view={view}
			size={(vp as any)}
			image={image}
		/>
	</div>

	const setMap = (location: AsObjectNormalized|false,	locationOpenIndex: number|false) => {
		set('locationOpenIndex', locationOpenIndex, false);
		set('mapWasOpen', true, false);
		set('mapOpen', location);
		const view = get('mapView');
		if (view) {
			view.setActivityPub(location);
		}
	}

	const attendanceNodes = <span classes={themedCss.placeAttendance}>
		{status === 'EventMovedOnline' && <Icon type="update" spaced="right" title={messages.movedOnline} />}
		{status === 'EventMovedOnline' && <span classes={themedCss.attendanceCount}>{messages.updated}</span>}
		{(mode === 'mixed' || mode === 'online' || !!mvc) &&
			<Icon color="neutral" type="display" spaced="right" size="s" />
		}
		{(!!mvc || isCancelled) &&
			<span classes={themedCss.attendanceCount}>{isCancelled ? '0' : mvc}</span>
		}
		{(mode === 'mixed' || mode === 'offline' || (mode !== 'online' && !!mpc)) &&
			<Icon color="neutral" type="place" spaced="right" size="s" />
		}
		{mode !== 'online' && (!!mpc || isCancelled) &&
			<span classes={themedCss.attendanceCount}>{isCancelled ? '0' : mpc}</span>
		}
		{!!mc && !mvc && !mpc &&
			<span classes={themedCss.attendanceCount}>
				{mc} <Icon type="people" size="s" />
			</span>
		}
		<span title={!!mode ? (messages as any)[`${mode}Event`] : (!isCancelled ? messages.cancelled : messages.event)}>
			{!!mode && !isCancelled && !isPostponed &&
				<span classes={themedCss.placeMeta}>{(messages as any)[`${mode}Short`]}</span>
			}
		</span>
	</span>;
console.log('LD',ld);
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
		{!omitProperties.has('location') && ld.location && ld.location.length && <div
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
		<div classes={themedCss.header}>
			<div classes={themedCss.topWrapper}>
				<div classes={themedCss.metaWrapper}>
					{timeOrStatusNode}
					{attendanceNodes}
				</div>
				<div classes={themedCss.nameWrapper}>
					{name && <Paginated key="name" property="name" spaced={false}>
						{clampStrings(name, 250).map((s) => <h5>{s}</h5>)}
					</Paginated>}
				</div>
				<I18nAddress
					address={(ld['schema:address']||{})}
					additionalProperties={['email','telephone','faxNumber','hoursAvailable','availableLanguage']}
				/>
			</div>
		</div>
		<div classes={themedCss.content}>
			{img && <virtual>
				<input tabIndex={-1} classes={themedCss.imagesLoaded} type="checkbox" id={imgId} checked={!!get('loadedImages')} />
				<div
					classes={[
						themedCss.imageWrapper,
						aspectRatio < 0.75 && themedCss.left,
						!!fitContain && themedCss.max,
						!!fitContain ? viewCSS.m7by6 : viewCSS.m3by2,
						!!fitContain && !!viewDesktopCSS && viewDesktopCSS.item,
						!!viewDesktopCSS && (!!fitContain ? viewDesktopCSS.m7by6 : viewDesktopCSS.m3by2)
					]}
					onclick={() => { getOrSet('loadedImages', true) }}
				>
						<Img {...img}
							baselined={!fitContain}
							fit={fitContain ? 'contain' : false}
							align={aspectRatio < 0.75 ? 'left' : 'right'}
						/>
					{image.length > 1 && <output classes={themedCss.moreCount}>{` +${image.length-1}`}</output>}
				</div>
				{!!icache.get('loadedImages') || image.length === 1 ? images : <noscript>{images}</noscript>}
			</virtual>}
			<div classes={themedCss.contentWrapper}>
				<Caption {...(ld)}
					classes={{
						'@redaktor/widgets/images': { captionWrapper: [themedCss.captionWrapper] }
					}}
					colored
					contentLines={3+addLines}
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
