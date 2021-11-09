import { tsx, create } from '@dojo/framework/core/vdom';
import { focus } from '@dojo/framework/core/middleware/focus';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
// import { schemaToAsDate } from './util';
import { AsObjectNormalized } from '../common/interfaces';
import i18nActivityPub from '../middleware/i18nActivityPub';
import id from '../middleware/id';
import theme, { Keys } from '../middleware/theme';
import Icon from '../icon';
import bundle from '../_ld/redaktor/nls/redaktor';
import * as css from '../theme/material/locationsDates.m.css';

// type DateDescription = [string, string, string, any];
export interface DateProperties extends AsObjectNormalized {
	/** Is a calendar is connected? Date w. close icon */
	hasCalendar?: boolean;
	/** If a calendar is connected, is any date open? */
	dateOpenIndex?: number|false;
	/** onDate acts as toggle */
	onDate?: (date: Date|false, index: number|false) => any;
}
export interface DateIcache {
	expanded: boolean;
	dateOpenIndex: number|false;
	focusIndex?: number;
}

const icache = createICacheMiddleware<DateIcache>();
const factory = create({ focus, theme, icache, id, i18nActivityPub }).properties<DateProperties>()
const Dates = factory(function Date({ properties, middleware: { focus, theme, icache, id, i18nActivityPub } }) {
	const themedCss = theme.classes(css);
	const {
		hasCalendar = false,
		dateOpenIndex = false,
		onDate
	} = properties();
	const {
		startTime, endTime, published, updated, duration,
		'dc:created': contentCreated = [],
		'schema:dateCreated': dateCreated = [],
		'schema:contentReferenceTime': contentReferenceTime = [],
		'schema:expires': expires = [],
		...ld
	} = i18nActivityPub.normalized<DateProperties>();

	const { messages } = i18nActivityPub.localize(bundle);
	const {get, getOrSet, set} = icache;
	const locDateTimeShort = new Intl.DateTimeFormat([i18nActivityPub.get().locale, 'en']);
	const locDateTime = new Intl.DateTimeFormat([i18nActivityPub.get().locale, 'en'], {
		weekday: 'short',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	});

	const dates = [
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
			const label = (messages.hasOwnProperty(type) && (messages as any)[type]) || messages.date;
			const title = (messages.hasOwnProperty(`${type}Title`) && (messages as any)[`${type}Title`]) || '';
			return [date, label, title, icon]
		}));
	}, []).filter((dA) => !!dA.length && !!dA[0]);
	/* TODO @type icon */
	if (!dates.length || !dates[0]) {
		return ''
	}
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
	hasCalendar && set('dateOpenIndex', dateOpenIndex, false);

	const getNode = (i: number, isFold = true) => {
		const [d, label = '', title = '', iconType] = dates[i];
		const dOpenIndex = get('dateOpenIndex');
		const date = global.Date.parse(d);
		const formattedDate = !isFold ? locDateTimeShort.format(date) : locDateTime.format(date);
		const jsDate = new global.Date(d);
		const handleClick = () => {
			if (!!hasCalendar) {
				if (dOpenIndex !== false && dOpenIndex === i) {
					set('dateOpenIndex', false);
					onDate && onDate(false, false);
				} else {
					set('dateOpenIndex', i);
					onDate && onDate(jsDate, i);
				}
			}
		};
		const handleKeydown = (event: KeyboardEvent) => {
			event.stopPropagation();
			const focusIndex = get('focusIndex')||0;
			const l = dates.length;
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

		const mainNode = <time
			key={`timeWrapper${i}`}
			classes={themedCss.item}
			datetime={jsDate.toISOString().replace(/Z$/,'')}
		>
			{!!isFold && <span title={title} classes={themedCss.iconWrapper}>
				<Icon
					type={get('dateOpenIndex') === i ? 'close' : iconType}
					size="s"
					spaced="right"
					maxWidth="var(--line2)"
					maxHeight="var(--line2)"
					classes={{'@redaktor/widgets/icon': {icon: [themedCss.icon]}}}
				 /> {label}
			</span>}
			{formattedDate}
		</time>;

		return !isFold ? mainNode : <li
			key={`date${i+1}`}
			tabIndex={0}
			focus={get('focusIndex') === i && focus.shouldFocus}
			onclick={handleClick}
			onkeydown={handleKeydown}
			classes={[themedCss.full, themedCss.foldItem]}
		>
			{mainNode}
		</li>
	}

	const menuId = id.getId('menu');

	return <span key="dates"
		role="button"
		tabIndex={0}
		aria-expanded={getOrSet('expanded', false) ? 'true' : 'false'}
		aria-controls={menuId}
		classes={[
			themedCss.root,
			get('dateOpenIndex') !== false && themedCss.mapOpen,
			dates.length > 1 && themedCss.hasFold
		]}
		onfocus={() => {
			set('expanded', true);
			set('focusIndex', 0);
			focus.focus()
		}}
		onblur={() => {
			set('expanded', false);
		}}
	>
		{getNode(0, false)}
		{dates.length > 1 && <output classes={themedCss.moreCount}>+{dates.length-1}</output>}
		{dates.length > 1 && <ul id={menuId} role="menu" aria-modal="true" classes={themedCss.fold}>
			{...dates.map((d, i) => getNode(i))}
		</ul>}
	</span>
});

export default Dates;
