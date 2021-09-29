import { tsx, create } from '@dojo/framework/core/vdom';
import { AsObject, AsObjectNormalized } from '../common/interfaces';
import { normalizeAs } from '../common/activityPubUtil';
import theme from '../middleware/theme';
import Paginated from '../paginated';
import Icon from '../icon';
import { latLngStr } from '../map/util';
import * as css from '../theme/material/Location.m.css';

export interface LocationProperties extends AsObjectNormalized {
	/** If a map is connected, is it open? */
	hasOpenMap: boolean;
	/** onClick acts as toggle */
	onClick: (location: AsObjectNormalized | false) => any;
}
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

const factory = create({ theme }).properties<LocationProperties>()
const Location = factory(function Location({ properties, middleware: { theme } }) {
	const themedCss = theme.classes(css);
	const {
		hasOpenMap = false,
		onClick,
		...ld
	} = normalizeAs(properties());

console.log('ld', ld);
	const { location = [] } = ld;

	return <Paginated key="locations" property="location">
		{(location as AsObjectNormalized).map((loc: AsObjectNormalized) => {
			return <virtual>
				<address
					itemscope itemtype="http://schema.org/Place"
					classes={themedCss.root}
					onclick={() => {
						onClick && onClick(!hasOpenMap ? loc : false);
					}}
				>
					<Icon
						{...(!!hasOpenMap ? {} : loc)}
						type={!!hasOpenMap ? 'close' : loc.type}
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
				</address>
				{loc.latitude && loc.longitude && !hasOpenMap && <Icon
					type="mapMarker"
					size="s"
					classes={{'@redaktor/widgets/icon': {root: [themedCss.marker], icon: [themedCss.markerIcon]}}}
				/>}
			</virtual>
		})}
	</Paginated>
});

export default Location;
