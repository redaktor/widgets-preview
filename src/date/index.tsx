import { tsx, create } from '@dojo/framework/core/vdom';
import { focus } from '@dojo/framework/core/middleware/focus';
import { formatAriaProperties } from '../common/util';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { getLdDates as getLD } from './util';
import { AsObjectNormalized } from '../common/interfaces';
import i18nActivityPub from '../middleware/i18nActivityPub';
import id from '../middleware/id';
import theme, { Keys } from '../middleware/theme';
import Icon from '../icon';
import ldBundle from '../_ld/redaktor/nls/redaktor';
import * as detailsCss from '../theme/material/details.m.css';
import * as css from '../theme/material/locationsDates.m.css';

export const getLdDates = getLD;
// type DateDescription = [string, string, string, any];
export interface DateProperties extends AsObjectNormalized {
	/** Is a calendar is connected? Date w. close icon */
	hasCalendar?: boolean;
	/** If a calendar is connected, is any date open? */
	dateOpenIndex?: number|false;
	/** onDate acts as toggle */
	onDate?: (date: Date|false, index: number|false) => any;
	onToggle?: (opened: boolean) => any;
	onFocusPrevious?: () => any;
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
		onDate,
		onToggle,
		onFocusPrevious
	} = properties();
	const ld = i18nActivityPub.normalized<DateProperties>();
	const {get, getOrSet, set} = icache;
	const localizedDateShort = new Intl.DateTimeFormat([i18nActivityPub.get().locale, 'en']);
	const localizedDate = new Intl.DateTimeFormat([i18nActivityPub.get().locale, 'en'], {
		weekday: 'short',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	});
	const dates = getLD(ld, i18nActivityPub.localize(ldBundle).messages);
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

	const handleFocus = () => {
		if (get('focusIndex') !== 1) {
			set('expanded', true);
			set('focusIndex', 0);
			focus.focus();
			onToggle && onToggle(true);
		} else {
			set('expanded', false);
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
		const dOpenIndex = get('dateOpenIndex');
		const [d] = dates[i];
		const date = global.Date.parse(d);
		const jsDate = new global.Date(d);
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
	const getNode = (i: number, isFold = true) => {
		const [d, label = '', title = '', iconType] = dates[i];
		const date = global.Date.parse(d);
		if (isNaN(date)) { return '' }
		const formattedDate = !isFold ? localizedDateShort.format(date) : localizedDate.format(date);
		const jsDate = new global.Date(d);
		const handleKeydown = (event: KeyboardEvent) => {
			event.stopPropagation();
			const fi = get('focusIndex')||0;
			const l = dates.length;
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
			{!!formattedDate && <span classes={[
				themedCss.name,
				dates.length === 1 && themedCss.rootSummary,
				dates.length === 1 && detailsCss.summaryContent
			]} itemprop="name">
				{formattedDate}
			</span>}
		</time>;

		return !isFold ? mainNode : <li
			key={`date${i+1}`}
			tabIndex={0}
			focus={get('focusIndex') === i && focus.shouldFocus}
			onclick={handleClick(i)}
			onkeydown={handleKeydown}
			onblur={handleBlur}
			classes={[themedCss.full, themedCss.foldItem]}
		>
			{mainNode}
		</li>
	}

	const menuId = id.getId('menu');
	const ariaProperties: { [key: string]: string | null } = dates.length === 1 ? {} : {
		expanded: (getOrSet('expanded', false) ? 'true' : 'false'),
		controls: menuId
	}
	const onProperties = dates.length === 1 ? {
		onclick: handleClick(0),
		onkeydown: (event: KeyboardEvent) => {
			event.stopPropagation();
			if (event.which === Keys.Enter || event.which === Keys.Space) {
				event.preventDefault();
				handleClick(0)();
			}
		}
	} : {};

	return <div key="dates"
		role="button"
		tabIndex={0}
		aria-expanded={getOrSet('expanded', false) ? 'true' : 'false'}
		aria-controls={menuId}
		classes={[
			themedCss.root,
			get('expanded') && themedCss.expanded,
			get('dateOpenIndex') !== false && themedCss.mapOpen,
			dates.length === 1 && detailsCss.summary,
			dates.length === 1 && detailsCss.animated,
			dates.length === 1 ? themedCss.singleItem : themedCss.hasFold
		]}
		{...formatAriaProperties(ariaProperties)}
		{...onProperties}
		onfocus={handleFocus}
	>
		{getNode(0, false)}
		{dates.length > 1 && <output classes={themedCss.moreCount}>{` +${dates.length-1}`}</output>}
		{dates.length > 1 && <ul id={menuId} role="menu" aria-modal="true" classes={themedCss.fold}>
			{...dates.map((d, i) => getNode(i))}
		</ul>}
	</div>
});

export default Dates;
