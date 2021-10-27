import { tsx, create } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
// import { schemaToAsDate } from './util';
import { AsObjectNormalized } from '../common/interfaces';
import i18nActivityPub from '../middleware/i18nActivityPub';
import id from '../middleware/id';
import theme from '../middleware/theme';
import Icon from '../icon';
import bundle from '../_ld/redaktor/nls/redaktor';
import * as css from '../theme/material/location.m.css';


export interface DateProperties extends AsObjectNormalized {
	/** Is a map is connected? Date w. close icon */
	hasCalendar?: boolean;
	/** If a map is connected, is any date open? */
	dateOpenIndex?: number | false;
	/** onClick acts as toggle */
	onClick?: (date: Date | false) => any;
}
export interface DateIcache {
	dateOpenIndex: number | false;
}
const icache = createICacheMiddleware<DateIcache>();
const factory = create({ theme, icache, id, i18nActivityPub }).properties<DateProperties>()
const Dates = factory(function Date({ properties, middleware: { theme, icache, id, i18nActivityPub } }) {
	const themedCss = theme.classes(css);
	const {
		hasCalendar = false,
		dateOpenIndex = false,
		onClick,
		...ld
	} = i18nActivityPub.normalized<DateProperties>();
	const {get, getOrSet, set} = icache;
	hasCalendar && getOrSet('dateOpenIndex', dateOpenIndex||false, false);

	const {
		startTime, endTime,
		'dc:created': contentCreated = [],
		'schema:dateCreated': dateCreated = [],
		'schema:contentReferenceTime': contentReferenceTime = [],
		'schema:expires': expires = [],
		published, updated, duration
	} = ld;
	const { messages } = i18nActivityPub.localize(bundle);
	const locDateTimeShort = new Intl.DateTimeFormat([i18nActivityPub.get().locale, 'en']);
	const locDateTime = new Intl.DateTimeFormat([i18nActivityPub.get().locale, 'en'], {
		weekday: 'short',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	});
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
	type dateDescription = [string, string, string, any];
	const dates: dateDescription[] = [
		[contentCreated, 'contentCreated', 'create'],
		[dateCreated, 'created', 'create'],
		[contentReferenceTime, 'contentReferenceTime', 'calendar'],
		[published, 'published', 'published'],
		[updated, 'updated', 'update'],
		[expires, 'expires', 'timing']
	].reduce((date, a) => {
		let [d, type, icon] = a;
		if (!!d && !Array.isArray(d)) { d = [d] }
		if (!d || !d.length) { return date }
		return date.concat(d.map((date: string) => {
			const label: string = (messages.hasOwnProperty(type) && (messages as any)[type]) || messages.date;
			const title: string = (messages.hasOwnProperty(`${type}Title`) && (messages as any)[`${type}Title`]) || '';
			return [date, label, title, icon]
		}));
	}, []).filter((dA) => !!dA.length && !!dA[0]);

	const getTimeNode = (a: dateDescription, i: number) => {
		const [d, label = '', title = '', iconType] = a;
		const date = global.Date.parse(d);
		const formattedDate = !i ? locDateTimeShort.format(date) : locDateTime.format(date);
		const jsDate = new global.Date(d);
		const timeNode = <time
			key={`timeWrapper${i}`}
			classes={themedCss.muted}
			datetime={jsDate.toISOString().replace(/Z$/,'')}
			onclick={() => {
				console.log(jsDate);
				if (!!hasCalendar) {
					if (get('dateOpenIndex') === i) {
						onClick && onClick(false);
						set('dateOpenIndex', false);
					} else {
						onClick && onClick(jsDate);
						set('dateOpenIndex', i);
					}
				}
			}}
		>
			{!!i && <span>
				<Icon type={get('dateOpenIndex') === i ? 'close' : iconType} size="l" spaced="right" /> {label}
			</span>} {formattedDate}
		</time>;

		return !i ? timeNode : <div key={`date${i+1}`} title={title} classes={[themedCss.full, themedCss.foldItem]}>
			{timeNode}
		</div>
	}

	/* TODO @type icon */


	return <div key="locations" property="location" classes={[
		themedCss.root,
		get('dateOpenIndex') !== false && themedCss.mapOpen
	]}>
		{!!dates[0] && getTimeNode(dates[0], 0)}
		{!!dates.length && <span classes={themedCss.moreCount}>+{dates.length}</span>}
		{!!dates.length && <div classes={themedCss.fold}>
			<input id={id.getId()} type="checkbox" classes={themedCss.expanded} />
			{dates.map((d, i) => getTimeNode(d, i+1))}
		</div>}
	</div>
});

export default Dates;
