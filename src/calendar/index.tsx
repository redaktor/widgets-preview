import { tsx, create } from '@dojo/framework/core/vdom';
import { DNode, RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import focus from '@dojo/framework/core/middleware/focus';
import i18n from '@dojo/framework/core/middleware/i18n';
import theme from '@redaktor/widgets/middleware/theme';
import { formatAriaProperties, Keys } from '@redaktor/widgets/common/util';
import Icon from '@redaktor/widgets/icon/index';
import {
	getWeekdays, getMonths, monthInMin, monthInMax, isOutOfDateRange, toDate
} from './date-utils';
import CalendarCell, { SelectMode } from './CalendarCell';
import DatePicker from './DatePicker';
import bundle from './nls/Calendar';
import * as css from '@redaktor/widgets/theme/material/calendar.m.css';
import * as baseCss from '@redaktor/widgets/common/styles/base.m.css';
import * as iconCss from '@redaktor/widgets/theme/material/icon.m.css';
import * as colors from '@redaktor/widgets/theme/material/_color.m.css';

export type CalendarMessages = {
	chooseMonth: string;
	chooseYear: string;
	previousMonth: string;
	nextMonth: string;
	previousYears: string;
	nextYears: string;
};

export enum FirstDayOfWeek {
	sunday = 0,
	monday = 1,
	tuesday = 2,
	wednesday = 3,
	thursday = 4,
	friday = 5,
	saturday = 6
}

export interface CalendarProperties {
	/** Custom aria attributes */
	aria?: { [key: string]: string | null };
	/** Set the latest date the calendar will display (it will show the whole month but not allow later selections) */
	maxDate?: Date;
	/** Set the earliest date the calendar will display (it will show the whole month but not allow previous selections) */
	minDate?: Date;
	/** Configure the first day of the calendar week, defaults to 1 (monday) */
	firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	/** A visual divider after Friday (5), defaults to false */
	weekendDivider?: boolean;
	/** The initial start value */
	start?: Date;
	/** The initial end value */
	end?: Date;
	/** Allow range selection, defaults to true */
	allowRange?: boolean;
	/** Force range selection, defaults to alse */
	forceRange?: boolean;
	/** A controlled date start value */
	startValue?: Date;
	/** A controlled date end value */
	endValue?: Date;
	/** Function called when the user selects a date */
	onValue?: (startValue: Date, endValue: Date) => void;

	/** The initial month to display */
	initialMonth?: number;
	/** A controlled month value */
	month?: number;
	/** Function called when the month changes */
	onMonth?(month: number): void;
	/** The initial year to display, defaults to current year */
	initialYear?: number;
	/** A controlled year value */
	year?: number;
	/** Function called when the year changes */
	onYear?(year: number): void;
	/** Default locales for the user */
	locales?: string[];
}

export interface CalendarIcache {
	startValue: Date;
	start: Date;
	endValue: Date;
	end: Date;
	initialMonth: number;
	month: number;
	initialYear: number;
	year: number;
	callDateFocus?: boolean;
	focusedDay: number;
	isRange?: boolean;
	forceRange?: boolean;
	hoveredRangeDate?: Date;
	monthLabelId: string;
	popupOpen?: boolean;
}

export interface CalendarChildren {
	/** Optional Header */
	header?: RenderResult;
	/** Optional Footer */
	footer?: RenderResult;
	/** Format the displayed current month and year */
	monthLabel?: (month: number, year: number) => RenderResult;
	/** Format the weekday column headers */
	weekdayCell?: (day: { short: string; long: string }) => RenderResult;
}
/**
 * Enum for next/previous buttons
 */
enum Paging {
	next = 'next',
	previous = 'previous'
}

const factory = create({
	icache: createICacheMiddleware<CalendarIcache>(),
	i18n,
	theme,
	focus
})
	.properties<CalendarProperties>()
	.children<CalendarChildren | undefined>();

export const Calendar = factory(function Calendar({
	middleware: { icache, i18n, theme, focus },
	properties,
	id,
	children
}) {
	const themedCss = theme.classes(css);
	const { messages: commonMessages } = i18n.localize(bundle);

	const {
		aria = {},
		minDate,
		maxDate,
		start,
		end,
		locales,
		allowRange = true,
		forceRange = false,
		firstDayOfWeek = 1
	} = properties();
	const weekdayNames = getWeekdays(locales);

	let { startValue, endValue, month, year } = properties();
	const { monthLabel, weekdayCell, header, footer } = children()[0] || ({} as CalendarChildren);
	const defaultStart = start || new Date();
	const defaultEnd = end || start;
	const {
		initialYear = defaultStart.getFullYear(),
		initialMonth = defaultStart.getMonth(),
		weekendDivider = false
	} = properties();

	const existingInitialValue = icache.get('start');
	const existingInitialMonth = icache.get('initialMonth');
	const existingInitialYear = icache.get('initialYear');
	const callDateFocus = icache.getOrSet('callDateFocus', false);
	const focusedDay = icache.getOrSet('focusedDay', 1);
	const monthLabelId = icache.getOrSet('monthLabelId', id);
	const popupOpen = icache.getOrSet('popupOpen', false);

	const shouldFocus = focus.shouldFocus();
	if (!startValue) {
		startValue = icache.get('startValue') || new Date();

		if (!start && !existingInitialValue) {
			startValue = toDate(defaultStart);

			if (isOutOfDateRange(startValue, minDate, maxDate)) {
				startValue = toDate(maxDate);
			}

			icache.set('start', startValue, false);
			icache.set('startValue', startValue);
		}

		if (start && start !== existingInitialValue) {
			startValue = toDate(start);

			icache.set('start', toDate(start), false);
			icache.set('startValue', startValue);
		}
		icache.getOrSet('hoveredRangeDate', icache.get('startValue'))
	}
	if (!endValue) {
		if (!end) {
			endValue = toDate(defaultEnd);
			icache.set('end', endValue);
			icache.set('endValue', endValue);
		} else if (end !== existingInitialValue) {
			endValue = toDate(end);
			icache.set('end', endValue);
			icache.set('endValue', endValue);
		}
	}

	if (typeof month === 'undefined') {
		if (initialMonth !== existingInitialMonth) {
			icache.set('initialMonth', initialMonth);
			icache.set('month', initialMonth);
		}
	}

	if (typeof year === 'undefined') {
		if (initialYear !== existingInitialYear) {
			icache.set('initialYear', initialYear);
			icache.set('year', initialYear);
		}
	}

	({ month, year } = getMonthYear());

	let weekdayOrder: number[] = [];
	for (let i = firstDayOfWeek; i < firstDayOfWeek + 7; i++) {
		weekdayOrder.push(i > 6 ? i - 7 : i);
	}

	const weekdays = weekdayOrder.map((order) => (
		<th role="columnheader" classes={[themedCss.weekday, (themedCss as any)[`_${order}`]]}>
			{renderWeekdayCell(weekdayNames[order])}
		</th>
	));

	function onValueChange(value: Date, isShift: boolean) {
		const { onValue } = properties();
		let [startValue, endValue] = [value, value];

		if (allowRange && isShift) {
			const [s, e] = [(icache.get('startValue')||value), (icache.get('endValue')||value)];
			const dates: any = [s, (value >= s && value <= e ? value : e), value];
			startValue = new Date(Math.min.apply(null,dates));
			endValue = new Date(Math.max.apply(null,dates));
		}
		icache.set('startValue', startValue);
		icache.set('endValue', endValue);
		// console.log('calendar onValue', startValue, endValue);
		onValue && onValue(startValue, endValue);
	}

	function onMonthChange(newMonth: number) {
		const { onMonth } = properties();
		icache.set('month', newMonth);
		onMonth && onMonth(newMonth);
	}

	function onYearChange(newYear: number) {
		const { onYear } = properties();
		icache.set('year', newYear);
		onYear && onYear(newYear);
	}

	function getMonthLength(month: number, year: number) {
		const lastDate = new Date(year, month + 1, 0);
		return lastDate.getDate();
	}

	function getMonthYear() {
		let { month, year, startValue } = properties();
		const selectedDate = startValue || icache.getOrSet('startValue', new Date());
		month = typeof month === 'number' ? month : icache.get('month');
		year = typeof year === 'number' ? year : icache.get('year');
		return {
			month: typeof month === 'number' ? month : selectedDate.getMonth(),
			year: typeof year === 'number' ? year : selectedDate.getFullYear()
		};
	}


	function goToDate(day: number) {
		const { month, year } = getMonthYear();
		const currentMonthLength = getMonthLength(month, year);
		const previousMonthLength = getMonthLength(month - 1, year);

		ensureDayIsInMinMax(new Date(year, month, day), (updatedDay) => (day = updatedDay));

		if (day < 1) {
			onMonthDecrement();
			day += previousMonthLength;
		} else if (day > currentMonthLength) {
			onMonthIncrement();
			day -= currentMonthLength;
		}
		icache.set('hoveredRangeDate', new Date(year, month, day), false);
		icache.set('focusedDay', day, false);
		icache.set('callDateFocus', true);
	}

	function onDateHover(date: Date, shiftKey: boolean) {
		icache.set('isRange', forceRange||shiftKey, false)
		icache.set('hoveredRangeDate', date)
	}
	function onDateClick(date: Date, shiftKey: boolean, disabled: boolean) {
		const day = date.getDate();
		if (disabled) {
			({ month, year } = day < 15 ? onMonthIncrement() : onMonthDecrement());
			icache.set('callDateFocus', true);
		}
		icache.set('focusedDay', day);
		onValueChange(date, shiftKey);
	}


	function onDateFocusCalled() {
		icache.set('callDateFocus', false);
	}
	function onDateKeyUp(key: number) {
		if (key === Keys.Shift) {
			icache.set('hoveredRangeDate', icache.get('startValue'));
			icache.set('isRange', false);
		}
	}
	function onDateKeyDown(key: number, preventDefault: () => void) {
		const { month, year } = getMonthYear();
		switch (key) {
			case Keys.Shift:
				icache.set('isRange', true);
				break;
			case Keys.Up:
				preventDefault();
				goToDate(focusedDay - 7);
				break;
			case Keys.Down:
				preventDefault();
				goToDate(focusedDay + 7);
				break;
			case Keys.Left:
				preventDefault();
				goToDate(focusedDay - 1);
				break;
			case Keys.Right:
				preventDefault();
				goToDate(focusedDay + 1);
				break;
			case Keys.PageUp:
				preventDefault();
				goToDate(1);
				break;
			case Keys.PageDown:
				preventDefault();
				const monthLength = getMonthLength(month, year);
				goToDate(monthLength);
				break;
			case Keys.Enter:
			case Keys.Space:
				/* TODO isShift */
				onValueChange(new Date(year, month, focusedDay), Boolean(icache.get('isRange')));
		}
	}

	function onMonthDecrement() {
		const { month, year } = getMonthYear();

		const newYear = month === 0 ? year - 1 : year;
		const newMonth = month === 0 ? 11 : month - 1;

		onMonthChange(newMonth);
		if (newYear !== year) {
			onYearChange(newYear);
		}

		return { month: newMonth, year: newYear };
	}

	function onMonthIncrement() {
		const { month, year } = getMonthYear();

		const newYear = month === 11 ? year + 1 : year;
		const newMonth = month === 11 ? 0 : month + 1;
		onMonthChange(newMonth);
		if (newYear !== year) {
			onYearChange(newYear);
		}
		return { month: newMonth, year: newYear };
	}

	function onMonthPageDown(event: MouseEvent) {
		event.stopPropagation();
		onMonthDecrement();
	}

	function onMonthPageUp(event: MouseEvent) {
		event.stopPropagation();
		onMonthIncrement();
	}

	function ensureDayIsInMinMax(newDate: Date, update: (day: number) => void) {
		const { minDate, maxDate } = properties();

		if (minDate && newDate < minDate) {
			update(minDate.getDate());
		} else if (maxDate && newDate > maxDate) {
			update(maxDate.getDate());
		}
	}

	function renderDateGrid() {
		const { month, year } = getMonthYear();
		const { firstDayOfWeek = 1, allowRange = true } = properties();

		ensureDayIsInMinMax(new Date(year, month, focusedDay), (newDay) =>
			icache.set('focusedDay', newDay)
		);
		const currentMonthLength = getMonthLength(month, year);
		const previousMonthLength = getMonthLength(month - 1, year);
		const currentMonthStartDay = new Date(year, month, 1).getDay();
		const initialWeekday =
			currentMonthStartDay - firstDayOfWeek < 0
				? currentMonthStartDay - firstDayOfWeek + 7
				: currentMonthStartDay - firstDayOfWeek;
		const todayString = new Date().toDateString();

		let dayIndex = 0;
		let isCurrentMonth = currentMonthStartDay === firstDayOfWeek;
		let cellMonth = isCurrentMonth ? month : month - 1;
		let date = isCurrentMonth ? 0 : previousMonthLength - initialWeekday;
		let isToday: boolean;
		let weeks: DNode[] = [];
		let days: DNode[];
		let dateObj: Date;
		let dateString: string;
		let weekday: number;
		let selectedMode: SelectMode;
		let hoverRange: boolean;

		const selectedStart = icache.get('startValue') || new Date();
		const selectedEnd = icache.get('endValue') || new Date();
		const selectedStartString = selectedStart.toDateString();
		const selectedEndString = selectedEnd.toDateString();
		const hoveredRangeDate = icache.get('isRange') && icache.get('hoveredRangeDate');

		for (let week = 0; week < 6; week++) {
			days = [];

			for (weekday = 0; weekday < 7; weekday++) {
				// find the next date
				// if we've reached the end of the previous month, reset to 1
				if (date > dayIndex && date >= previousMonthLength) {
					date = 1;
					cellMonth++;
				}
				// if we've reached the end of the current month, reset to 1
				else if (date <= dayIndex && date >= currentMonthLength) {
					date = 1;
					cellMonth++;
				} else {
					date++;
				}
				dateObj = new Date(year, cellMonth, date);
				dateString = dateObj.toDateString();
				isCurrentMonth = month === cellMonth;
				isToday = dateString === todayString;
				selectedMode = false;
				hoverRange = false;
				if (allowRange) {
					if(!isOutOfDateRange(dateObj, selectedStart, selectedEnd)) {
						selectedMode = (selectedStart && dateString === selectedStartString &&
							 dateString === selectedEndString) ? true : (
								 dateString === selectedStartString ? 'start' : (
									 dateString === selectedEndString ? 'end' : 'range'
								 )
							 )
					}
					if(hoveredRangeDate && hoveredRangeDate < selectedStart) {
						if(!isOutOfDateRange(dateObj, hoveredRangeDate, selectedStart)) {
							hoverRange = true;
						}
					}
					if(hoveredRangeDate && hoveredRangeDate > selectedEnd) {
						if(!isOutOfDateRange(dateObj, selectedEnd, hoveredRangeDate)) {
							hoverRange = true;
						}
					}
				}
				days.push(
					renderDateCell(dateObj, dayIndex++, selectedMode, isCurrentMonth, isToday, hoverRange)
				);
			}

			weeks.push(<tr>{days}</tr>);
		}

		return weeks;
	}

	function renderDateCell(
		dateObj: Date,
		index: number,
		selected: SelectMode,
		currentMonth: boolean,
		today: boolean,
		hoverRange: boolean
	) {
		const { minDate, maxDate, theme, classes, design } = properties();

		const day = dateObj.getDate();
		const outOfRange = isOutOfDateRange(dateObj, minDate, maxDate);
		const focusable = currentMonth && day === icache.get('focusedDay');

		return (
			<CalendarCell
				classes={classes}
				design={design}
				key={`date-${index}`}
				callFocus={(callDateFocus || shouldFocus) && focusable}
				date={dateObj}
				outOfRange={outOfRange}
				focusable={focusable}
				disabled={!currentMonth}
				selected={selected}
				theme={theme}
				today={today}
				hoverRange={hoverRange}
				onClick={outOfRange ? undefined : onDateClick}
				onFocusCalled={onDateFocusCalled}
				onKeyDown={onDateKeyDown}
				onKeyUp={onDateKeyUp}
				onMouseEnter={onDateHover}
			/>
		);
	}

	function renderDatePicker(labels: typeof bundle.messages) {
		const {
			theme,
			classes,
			design,
			minDate,
			maxDate
		} = properties();
		const monthNames = getMonths(locales);
		const { month, year } = getMonthYear();

		return (
			<div classes={[themedCss.pickerWrapper]}>
				<DatePicker
					key="date-picker"
					classes={classes}
					design={design}
					labelId={monthLabelId}
					month={month}
					monthNames={monthNames}
					renderMonthLabel={monthLabel}
					theme={theme}
					year={year}
					minDate={minDate}
					maxDate={maxDate}
					onPopupChange={(open: boolean) => {
						icache.set('popupOpen', open);
					}}
					onRequestMonthChange={(requestMonth: number) => {
						onMonthChange(requestMonth);
					}}
					onRequestYearChange={(requestYear: number) => {
						onYearChange(requestYear);
					}}
				/>
				<div classes={[themedCss.controls, popupOpen ? baseCss.visuallyHidden : null]}>
					<button
						classes={themedCss.previous}
						tabIndex={popupOpen ? -1 : 0}
						type="button"
						disabled={!monthInMin(year, month - 1, minDate)}
						onclick={onMonthPageDown}
					>
						{renderPagingButtonContent(Paging.previous, labels)}
					</button>
					<button
						classes={themedCss.next}
						tabIndex={popupOpen ? -1 : 0}
						type="button"
						disabled={!monthInMax(year, month + 1, maxDate)}
						onclick={onMonthPageUp}
					>
						{renderPagingButtonContent(Paging.next, labels)}
					</button>
				</div>
			</div>
		);
	}

	function renderPagingButtonContent(type: Paging, labels: CalendarMessages) {
		const { classes, design } = properties();
		const iconType = type === Paging.next ? 'right' : 'left';
		const labelText = type === Paging.next ? labels.nextMonth : labels.previousMonth;

		return [
			<Icon
				type={iconType}
				theme={theme.compose(
					iconCss,
					css,
					'calendarPaging'
				)}
				classes={classes}
				design={design}
			/>,
			<span classes={[baseCss.visuallyHidden]}>{labelText}</span>
		];
	}

	function renderWeekdayCell(day: { short: string; long: string }) {
		return weekdayCell ? (
			weekdayCell(day)
		) : (
			<abbr classes={themedCss.abbr} title={day.long}>
				{day.short}
			</abbr>
		);
	}
	const hasRange = icache.get('end') && endValue && startValue.getTime() !== endValue.getTime();
	return (
		<div classes={[
			theme.variant(),
			theme.colored(colors),
			themedCss.root,
			weekendDivider ? themedCss.weekendDivider : null,
			icache.get('isRange') ? themedCss.isRange : null,
			hasRange ? themedCss.hasRange : null
		]}
		{...formatAriaProperties(aria)}
		>
			<div classes={themedCss.header}>
				{header}
			</div>
			{renderDatePicker(commonMessages)}
			<table
				cellspacing="0"
				cellpadding="0"
				role="grid"
				aria-labelledby={monthLabelId}
				classes={[
					themedCss.dateGrid,
					popupOpen ? baseCss.visuallyHidden : null
				]}
			>
				<thead>
					<tr>{weekdays}</tr>
				</thead>
				<tbody>{renderDateGrid()}</tbody>
			</table>
			<div classes={themedCss.footer}>
				{footer}
			</div>
		</div>
	);
});

export default Calendar;
