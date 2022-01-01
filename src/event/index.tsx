import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { AsObject, AsObjectNormalized } from '../common/interfaces';
import { ldPartial, schemaLanguages, toIntStr } from '../_ld';
import { clampStrings } from '../common/activityPubUtil';
import i18nActivityPub from '../middleware/i18nActivityPub';
import id from '../middleware/id';
import theme from '../middleware/theme';
import breakpoints from '../middleware/breakpoint';
import Paginated from '../paginated';
import TimeRelative from '../timeRelative';
import Caption, { coveredLD as captionCoveredLD } from '../caption';
import Calendar from '../calendar';
import Map from '../map';
import Rate from '../rate';
import Details from '../details';
import Structure from '../structure';
import Icon from '../icon';
import Images from '../images';
import Img, { getWH } from '../image/image';
// import * as ui from '../theme/material/_ui.m.css';
import bundle from './nls/Event';
import * as viewCSS from '../theme/material/_view.m.css';
import * as css from '../theme/material/event.m.css';
/* TODO ISSUE in /images */
export interface EventProperties extends AsObject {
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

export interface EventIcache {
	currentLocale: {locale: string, rtl?: boolean};
	brightnessClass: string;
	loadedImages: boolean;
	mapOpen: false | AsObjectNormalized;
	mapWasOpen: boolean;
	map: any;
	mapView: any;
	calendarOpen: boolean;
	locationOpenIndex?: number | false;
}
export interface EventChildren {
	/** Optional Header */
	timeWrapper?: RenderResult;
	/** Optional Footer */
	footer?: RenderResult;
}

const icache = createICacheMiddleware<EventIcache>();
const factory = create({ icache, id, i18nActivityPub, theme, breakpoints })
	.properties<EventProperties>()
	.children<EventChildren | RenderResult | undefined>();

/* TODO
duration // schema: dateCreated, contentReferenceTime, expires

[AP similar] duration, startDate, endDate, location + Thing
AP 			context [is similar to: ]
schema 	eventSchedule		Schedule

// TODO: address region select
rating review
? review 							https://schema.org/Review

// STRUCT
? doorTime 						DATES
? audience 						Audience
? typicalAgeRange			Text
? subEvent/superEvent
? recordedIn					CreativeWork
? workFeatured / workPerformed
? subEvent/superEvent


Organization or Person:
- organizer
- performer
- funder
- sponsor
- translator
- attendee
contributor
composer
director
actor (e.g. tv, Person)

// ACTIONS - ticket btn etc.
isAccessibleForFree boolean
"offers": {
"@type": "Offer",
"price": "13.00",
"priceCurrency": "USD",
"url": "http://www.ticketfly.com/purchase/309433"
}
remainingAttendeeCapacity int


More specific Types
BusinessEvent
ChildrensEvent
ComedyEvent
CourseInstance
DanceEvent
DeliveryEvent
EducationEvent
EventSeries
ExhibitionEvent
Festival
FoodEvent
Hackathon
LiteraryEvent
MusicEvent
PublicationEvent
SaleEvent
ScreeningEvent
SocialEvent
SportsEvent
TheaterEvent
VisualArtsEvent

// <Icon type="image" spaced={image.length < 11 ? 'right' : false} />
*/
export const coveredLD = captionCoveredLD.concat([
	'event', 'image', 'startTime', 'endTime', 'date', 'duration', 'dc:created',
	'schema:event', 'schema:startDate', 'schema:endDate', 'schema:previousStartDate',
	'schema:dateCreated', 'schema:contentReferenceTime', 'schema:expires', 'schema:eventAttendanceMode',
	'schema:eventStatus', 'schema:inLanguage', 'schema:aggregateRating', 'schema:maximumAttendeeCapacity',
	'schema:maximumPhysicalAttendeeCapacity', 'schema:maximumVirtualAttendeeCapacity'
]);
export const Event = factory(function event({
	middleware: { icache, id, i18nActivityPub, theme, breakpoints /*, resource */ },
	properties
}) {
	const { get, set, getOrSet } = icache;
	const themedCss = theme.classes(css);
	const { messages } = i18nActivityPub.localize(bundle);
	const {
		fullscreen, widgetId, mediaType, onMouseEnter, onMouseLeave, onLoad, onFullscreen,
		color = 'red', fit = false, view = 'column',
	} = properties();

	const {
		startTime: start, endTime: end, published, updated, duration,
		'dc:created': contentCreated = [], ...ld
	} = i18nActivityPub.normalized<EventProperties>();
	const omit = i18nActivityPub.omit();

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
	const { /* TODO dateCreated, contentReferenceTime, expires */
		dateCreated = [], contentReferenceTime = [], expires = [], startDate, endDate,
		eventAttendanceMode = '', eventStatus = '', previousStartDate, inLanguage,
		aggregateRating: rating,
		maximumAttendeeCapacity: _mc,
		maximumPhysicalAttendeeCapacity: _mpc,
		maximumVirtualAttendeeCapacity: _mvc
	} = ldPartial(ld);
	const [mc, mpc, mvc] = [toIntStr(_mc), toIntStr(_mpc), toIntStr(_mvc)];
	const aggregateRating = Array.isArray(rating) ? rating[0] : rating;

	const sUrl = 'https://schema.org/';
	const status = eventStatus.replace(sUrl,'');
	const mode = status === 'EventMovedOnline' ? 'online' :
		(eventAttendanceMode.replace(sUrl,'') === 'MixedEventAttendanceMode' ? 'mixed' :
			(eventAttendanceMode.replace(sUrl,'') === 'OnlineEventAttendanceMode' ? 'online' : 'offline'));
	const inLanguages = schemaLanguages(inLanguage, i18nActivityPub.get().locale);
	const [isCancelled, isPostponed] = [status === 'EventCancelled', status === 'EventPostponed'];

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

	let jsDates: any = {};
	try {
		jsDates = !startTime ? {} : (!endTime ? {
			start: new Date(startTime)
		} : {
			start: new Date(startTime),
			end: new Date(endTime)
		})
	} catch(e) { }

	let isPast = false;
	type TimeKey = 'startTime' | 'endTime' | 'date';
	const getTimeNode = (key: TimeKey = 'startTime', customDate?: string) => {
		if ((!startTime && !endTime) || isPostponed) {
			return key !== 'startTime' ? '' : <div classes={[themedCss.time, isPast && themedCss.pastDate]}>
				<h1 classes={[themedCss.noDay]}>?</h1>
				{!!startTime && <small classes={[themedCss.statusByline]}>{messages.tba}</small>}
			</div>
		}
		const xsdDate = !!customDate ? customDate : (key === 'startTime' ? startTime : endTime);
		const jsDate = xsdDate ? new Date(xsdDate) : void 0;
		if (!jsDate) { return '' }
		if (key === 'date') {
			const intlDate = new Intl.DateTimeFormat([i18nActivityPub.get().locale, 'en'], {
				weekday: 'short', year: 'numeric', month: 'long', day: 'numeric',
				hour: 'numeric', minute: 'numeric'
			});
			return !xsdDate ? '' : intlDate.format(jsDate);
		}
	 	const isSameThanStart = key === 'endTime' && !!startTime &&
			startTime.split('T')[0] === endTime.split('T')[0];
		const jsNow = new Date();
		const locShortMonth = new Intl.DateTimeFormat([i18nActivityPub.get().locale, 'en'], {
			month: 'short'
		}).format(jsDate);
		const timeOfDay = new Intl.DateTimeFormat([i18nActivityPub.get().locale, 'en'], {
			hour: '2-digit',
			minute: '2-digit',
			timeZoneName: 'short'
		}).format(jsDate);
		const [curYear, curMonth, curDate] = [jsNow.getFullYear(), jsNow.getMonth(), jsNow.getDate()];
		const [year = 0, month = 0, date = 0] = [jsDate.getFullYear(), jsDate.getMonth(), jsDate.getDate()];
		const isSameYear = curYear === year;
		const isSameMonth = !!isSameYear && curMonth === month;
		const isSameDate = isCancelled || (!!isSameYear && !!isSameMonth && curDate === date);
		isPast = isCancelled || Date.parse(xsdDate) < jsNow.getTime();
		const datetime = isCancelled ? '' : xsdDate;

 		return <virtual>
			{key === 'endTime' && <hr classes={[!isSameThanStart ? themedCss.until : themedCss.untilSmall]} />}
			<time key={key} classes={[themedCss.time, isPast && themedCss.pastDate]} datetime={datetime}>
				{!isSameThanStart && <virtual>
					<h1 classes={[themedCss.day, isSameDate && themedCss.sameDate]}>
						{date}
					</h1>
					<p classes={[themedCss.monthYear]}>
						<b classes={isSameMonth && themedCss.sameMonthYear}>{locShortMonth}</b>
						<br />
						<span classes={isSameYear && themedCss.sameMonthYear}>{year}</span>
					</p>
				</virtual>}
				<small classes={[themedCss.timeOfDay]}>{timeOfDay}</small>
			</time>
		</virtual>
	}

	const timeOrStatusNode = !startTime && !endTime ? '' : (isCancelled || isPostponed ?
		<h5 classes={themedCss.eventStatus}>
			<Icon type={isCancelled ? 'cancel' : 'bullhorn'} spaced="right" />
			{isCancelled ? messages.cancelled : messages.postponed}
		</h5> : <small classes={themedCss.eventMeta}>
			<TimeRelative date={startTime||endTime||''} />
		</small>);

	const isWideDate = (!!jsDates.hasOwnProperty('start') && jsDates.start.getDate() > 9) ||
		(!!jsDates.hasOwnProperty('end') && jsDates.end.getDate() > 9);
	const images = <div classes={themedCss.imagesWrapper}>
		<Images {...ld}
			key="images"
			view={view}
			size={(vp as any)}
			image={image}
		/>
	</div>

	const setCalendar = () => {
		set('mapOpen', false, false);
		set('locationOpenIndex', false);
		set('calendarOpen', true);
	}
	const setMap = (location: AsObjectNormalized|false,	locationOpenIndex: number|false) => {
		location !== false && set('calendarOpen', false, false);
		set('locationOpenIndex', locationOpenIndex, false);
		set('mapWasOpen', true, false);
		set('mapOpen', location);
		const view = get('mapView');
		if (view) {
			view.setActivityPub(location);
		}
	}

	const attendanceNodes = <span classes={themedCss.eventAttendance}>
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
				<span classes={themedCss.eventMeta}>{(messages as any)[`${mode}Short`]}</span>
			}
		</span>
	</span>;

	return <div
		key="root"
		classes={[
			themedCss.root,
			isWideDate && themedCss.wideDate,
			isPast && themedCss.pastDate,
			!!get('loadedImages') && themedCss.imagesOpen,
			isCancelled && themedCss.cancelled,
			isPostponed && themedCss.postponed,
			theme.variant(),
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
		<div classes={themedCss.header}>
			<details classes={[
				themedCss.details,
				(isCancelled || isPostponed) && themedCss.noContent
			]}>
				<summary onclick={setCalendar} classes={themedCss.timeWrapper}>
					{status === 'EventRescheduled' && <small classes={themedCss.eventStatus}>
						<Icon size="s" type="alert" spaced="right" /> {messages.rescheduled}
					</small>}
					{!!startTime && getTimeNode()}
					{!!endTime && getTimeNode('endTime')}
				</summary>
				{!omit.has('date') && !isCancelled && !isPostponed &&
					<div classes={themedCss.calendarWrapper}>
						{status === 'EventRescheduled' && previousStartDate && <p classes={themedCss.attendanceCount}>
							<Icon color="red" size="s" type="alert" spaced="right" />
							{messages.previousStartDate} {getTimeNode('date', previousStartDate)}
						</p>}
						<Calendar
							{...jsDates}
							color={color}
							readonly
							responsive
							weekendDivider
							onValue={(start, end) => {
								console.log(start, end);
								// icache.set('start', start);
								// icache.set('end', end);
							}}
						/>
					</div>
				}
			</details>

			<div classes={themedCss.topWrapper}>
				<div classes={themedCss.timeRelativeWrapper}>
					{timeOrStatusNode}
					{attendanceNodes}
				</div>
				<div classes={themedCss.nameWrapper}>
					{!!name && !omit.has('name') && <Paginated key="name" property="name" spaced={false}>
						{clampStrings(name, 250).map((s) => s.length < 125 ? <h3>{s}</h3> : <h5>{s}</h5>)}
					</Paginated>}
				</div>
				<div classes={themedCss.locationWrapper}>
					<Caption {...(ld)} locationHasOnline={mode === 'online' || mode === 'mixed'} colored largeLocation locationIsDetails
						classes={{
							'@redaktor/widgets/images': { meta: [themedCss.location], moreCount: [themedCss.locationMoreCount] },
							'@redaktor/widgets/locationsDates': { root: [themedCss.locationDetails] }
						}}
						omitProperties={['name','date','locales','attributedTo','summary','content']}
						onLocation={setMap}
						locationOpenIndex={get('locationOpenIndex')}
					/>
				</div>
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
				>
					{!!inLanguages.length && <small classes={[themedCss.eventMeta, themedCss.inLanguage]}>
						{messages.eventInLang} {inLanguages.join(',')}
					</small>}
				</Caption>
			</div>
			{!!aggregateRating && <div classes={themedCss.rateWrapper}>
				<Rate readOnly {...ldPartial(aggregateRating)} />
			</div>}
			<Structure omitProperties={coveredLD} value={ld}>
				{{ detailsSummary: <span>{messages.moreInfo}</span> }}
			</Structure>
		</div>
	</div>
});

export default Event;
