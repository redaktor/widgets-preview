import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import icache from '@dojo/framework/core/middleware/icache';
import focus from '@dojo/framework/core/middleware/focus';
import i18n from '@dojo/framework/core/middleware/i18n';
import theme from '@redaktor/widgets/middleware/theme';
import { Keys } from '@redaktor/widgets/common/util';
import { monthInMin, monthInMax } from './date-utils';
import Icon from '@redaktor/widgets/icon/index';
import * as css from '@redaktor/widgets/theme/material/calendar.m.css';
import * as baseCss from '@redaktor/widgets/common/styles/base.m.css';
import * as iconCss from '@redaktor/widgets/theme/material/icon.m.css';
import bundle from './nls/Calendar';

export type CalendarMessages = {
	chooseMonth: string;
	chooseYear: string;
	previousMonth: string;
	nextMonth: string;
	previousYears: string;
	nextYears: string;
};

/**
 * Enum for next/previous buttons
 */
enum Paging {
	next = 'next',
	previous = 'previous'
}

/**
 * Enum for month or year controls
 */
enum Controls {
	month = 'month',
	year = 'year'
}

interface DatePickerProperties {
	/** Id to reference label containing current month and year */
	labelId?: string;
	/** Maximum date to be picked */
	maxDate?: Date;
	/** Minimum date to be picked */
	minDate?: Date;
	/** Currently displayed month (zero-based) */
	month: number;
	/** Array of full and abbreviated month names */
	monthNames: { short: string; long: string }[];
	/** Handles when a user action occurs that triggers a change in the month or year popup state */
	onPopupChange?(open: boolean): void;
	/** Handles when a month should change (month is zero-based) */
	onRequestMonthChange?(month: number): void;
	/** Handles when a year should change */
	onRequestYearChange?(year: number): void;
	/** Formats the displayed current month and year */
	renderMonthLabel?(month: number, year: number): any;
	/** Currently displayed year */
	year: number;
	/** Number of years to display in a single page of the year popup */
	yearRange?: number;
}

const BASE_YEAR = ((new Date).getFullYear() - 4);

const DatePicker = create({ theme, focus, icache, i18n }).properties<DatePickerProperties>()(
	function DatePicker({ middleware: { theme, focus, icache, i18n }, properties, id }) {
		const themeCss = theme.classes(css);
		const { messages: labels } = i18n.localize(bundle);
		const { labelId = `${id}_label`, month, year } = properties();
		const keyWithFocus = icache.get<string>('keyWithFocus');
		const monthPopupOpen = icache.getOrSet('monthPopupOpen', false);
		const yearPopupOpen = icache.getOrSet('yearPopupOpen', false);
		const yearPage = icache.getOrSet('yearPage', 0);

		function closeMonthPopup(event?: MouseEvent) {
			if (event) {
				event.stopPropagation();
			}
			const { onPopupChange } = properties();
			icache.set('keyWithFocus', 'month-button');
			icache.set('monthPopupOpen', false);
			focus.focus();
			onPopupChange && onPopupChange(getPopupState());
		}

		function closeYearPopup(event?: MouseEvent) {
			if (event) {
				event.stopPropagation();
			}
			const { onPopupChange } = properties();
			icache.set('yearPopupOpen', false);
			icache.set('keyWithFocus', 'year-button');
			focus.focus();
			onPopupChange && onPopupChange(getPopupState());
		}

		function getMonthInputKey(month: number): string {
			return `${id}_month_input_${month}`;
		}

		function getPopupState() {
			const monthPopupOpen = icache.get('monthPopupOpen');
			const yearPopupOpen = icache.get('yearPopupOpen');
			return !!monthPopupOpen || !!yearPopupOpen;
		}

		function getYearInputKey(year: number): string {
			return `${id}_year_input_${year}`;
		}

		function getYearRange() {
			const { year, yearRange = 20 } = properties();
			const offset = ((year - BASE_YEAR) % yearRange) - yearRange * yearPage;

			if (year >= BASE_YEAR) {
				return { first: year - offset, last: year + yearRange - offset };
			} else {
				return { first: year - (yearRange + offset), last: year - offset };
			}
		}

		function onMonthButtonClick(event: MouseEvent) {
			event.stopPropagation();
			monthPopupOpen ? closeMonthPopup() : openMonthPopup();
		}

		function onMonthRadioChange(event: Event) {
			event.stopPropagation();
			const { onRequestMonthChange } = properties();
			onRequestMonthChange &&
				onRequestMonthChange(parseInt((event.target as HTMLInputElement).value, 10));
		}

		function onPopupKeyDown(event: KeyboardEvent) {
			event.stopPropagation();
			// close popup on escape, or if a value is selected with enter/space
			if (
				event.which === Keys.Escape ||
				event.which === Keys.Enter ||
				event.which === Keys.Space
			) {
				event.preventDefault();
				monthPopupOpen && closeMonthPopup();
				yearPopupOpen && closeYearPopup();
			}
		}

		function onYearButtonClick(event: MouseEvent) {
			event.stopPropagation();
			yearPopupOpen ? closeYearPopup() : openYearPopup();
		}

		function onYearPageDown(event: MouseEvent) {
			event.stopPropagation();
			icache.set('yearPage', yearPage - 1);
		}

		function onYearPageUp(event: MouseEvent) {
			event.stopPropagation();
			icache.set('yearPage', yearPage + 1);
		}

		function onYearRadioChange(event: Event) {
			event.stopPropagation();
			const {
				onRequestYearChange,
				month,
				minDate,
				maxDate,
				onRequestMonthChange
			} = properties();
			const newYear = parseInt((event.target as HTMLInputElement).value, 10);
			if (!monthInMinMax(newYear, month)) {
				// we know the year is valid but the month is out of range
				if (minDate && newYear === minDate.getFullYear()) {
					onRequestMonthChange && onRequestMonthChange(minDate.getMonth());
				} else if (maxDate && newYear === maxDate.getFullYear()) {
					onRequestMonthChange && onRequestMonthChange(maxDate.getMonth());
				}
			}
			icache.set('yearPage', 0);
			onRequestYearChange && onRequestYearChange(newYear);
		}

		function openMonthPopup() {
			const { month, onPopupChange } = properties();
			icache.set('monthPopupOpen', true);
			icache.set('yearPopupOpen', false);
			icache.set('keyWithFocus', getMonthInputKey(month));
			focus.focus();
			onPopupChange && onPopupChange(getPopupState());
		}

		function openYearPopup() {
			const { year, onPopupChange } = properties();
			icache.set('yearPopupOpen', true);
			icache.set('monthPopupOpen', false);
			icache.set('keyWithFocus', getYearInputKey(year));
			focus.focus();
			onPopupChange && onPopupChange(getPopupState());
		}

		function monthInMinMax(year: number, month: number) {
			let { minDate, maxDate } = properties();

			return monthInMin(year, month, minDate) && monthInMax(year, month, maxDate);
		}

		function yearInMinMax(year: number) {
			const { minDate, maxDate } = properties();
			const minYear = minDate ? minDate.getFullYear() : year;
			const maxYear = maxDate ? maxDate.getFullYear() : year;
			return year >= minYear && year <= maxYear;
		}

		function renderControlsTrigger(type: Controls) {
			const { month, monthNames, year } = properties();

			const content = type === Controls.month ? monthNames[month].long : `${year}`;
			const open = type === Controls.month ? monthPopupOpen : yearPopupOpen;
			const onclick = type === Controls.month ? onMonthButtonClick : onYearButtonClick;
			const key = `${type}-button`;

			return (
				<button
					key={key}
					aria-controls={`${id}_${type}_dialog`}
					aria-expanded={open ? 'true' : 'false'}
					aria-haspopup="true"
					id={`${id}_${type}_button`}
					classes={[
						(themeCss as any)[`${type}Trigger`],
						open ? (themeCss as any)[`${type}TriggerActive`] : null
					]}
					focus={keyWithFocus === key ? focus.shouldFocus : undefined}
					role="menuitem"
					type="button"
					onclick={onclick}
				>
					{content}
				</button>
			);
		}

		function renderMonthLabel(month: number, year: number) {
			let { monthNames, renderMonthLabel } = properties();
			if (!monthNames && !renderMonthLabel) {
				const d = new Date(Date.UTC(year, month, 1, 3, 0, 0));
				return new Intl.DateTimeFormat('en-US', {month: 'long'}).format(d)
			}
			return renderMonthLabel
				? renderMonthLabel(month, year)
				: `${monthNames[month].long} ${year}`;
		}

		function renderMonthRadios() {
			const { year, month, monthNames } = properties();
			return monthNames.map(({ short, long }, i) => {
				const key = getMonthInputKey(i);
				return (
					<label
						key={`${id}_month_radios_${i}`}
						classes={themeCss.monthRadio}
						for={getMonthInputKey(i)}
						onmouseup={closeMonthPopup}
					>
						<input
							checked={i === month}
							classes={themeCss.monthRadioInput}
							id={key}
							key={key}
							name={`${id}_month_radios`}
							focus={keyWithFocus === key ? focus.shouldFocus : undefined}
							tabIndex={monthPopupOpen ? 0 : -1}
							type="radio"
							value={`${i}`}
							disabled={!monthInMinMax(year, i)}
							onchange={onMonthRadioChange}
						/>
						<abbr classes={themeCss.monthRadioLabel} title={long}>
							{short}
						</abbr>
					</label>
				);
			});
		}

		function renderPagingButtonContent(type: Paging) {
			const { classes, design } = properties();
			const iconType = type === Paging.next ? 'right' : 'left';
			const labelText = type === Paging.next ? labels.nextYears : labels.previousYears;

			return [
				<Icon
					type={iconType}
					theme={theme.compose(
						iconCss,
						css,
						'datePickerPaging'
					)}
					classes={classes}
					design={design}
				/>,
				<span classes={baseCss.visuallyHidden}>{labelText}</span>
			];
		}

		function renderYearRadios() {
			const { year } = properties();
			const radios = [];

			const yearLimits = getYearRange();
			for (let i = yearLimits.first; i < yearLimits.last; i++) {
				const key = getYearInputKey(i);
				radios.push(
					<label
						key={`${id}_year_radios_${i}`}
						classes={themeCss.yearRadio}
						for={getYearInputKey(i)}
						onmouseup={closeYearPopup}
					>
						<input
							checked={i === year}
							classes={themeCss.yearRadioInput}
							id={key}
							key={key}
							name={`${id}_year_radios`}
							focus={keyWithFocus === key ? focus.shouldFocus : undefined}
							tabIndex={yearPopupOpen ? 0 : -1}
							type="radio"
							value={`${i}`}
							disabled={!yearInMinMax(i)}
							onchange={onYearRadioChange}
						/>
						<abbr classes={themeCss.yearRadioLabel}>{`${i}`}</abbr>
					</label>
				);
			}

			return radios;
		}

		return (
			<div classes={themeCss.datePicker}>
				<div classes={themeCss.topMatter} role="menubar">
					<label
						id={labelId}
						classes={[baseCss.visuallyHidden]}
						aria-live="polite"
						aria-atomic="false"
					>
						{renderMonthLabel(month, year)}
					</label>
					{renderControlsTrigger(Controls.month)}
					{renderControlsTrigger(Controls.year)}
				</div>

				<div
					key="month-grid"
					aria-hidden={monthPopupOpen ? 'false' : 'true'}
					aria-labelledby={`${id}_month_button`}
					classes={[themeCss.monthGrid, !monthPopupOpen ? baseCss.visuallyHidden : null]}
					id={`${id}_month_dialog`}
					role="dialog"
				>
					<fieldset classes={themeCss.monthFields} onkeydown={onPopupKeyDown}>
						<legend classes={baseCss.visuallyHidden}>{labels.chooseMonth}</legend>
						{...renderMonthRadios()}
					</fieldset>
				</div>

				<div
					key="year-grid"
					aria-hidden={yearPopupOpen ? 'false' : 'true'}
					aria-labelledby={`${id}_year_button`}
					classes={[themeCss.yearGrid, !yearPopupOpen ? baseCss.visuallyHidden : null]}
					id={`${id}_year_dialog`}
					role="dialog"
				>
					<fieldset classes={themeCss.yearFields} onkeydown={onPopupKeyDown}>
						<legend classes={[baseCss.visuallyHidden]}>{labels.chooseYear}</legend>
						{...renderYearRadios()}
					</fieldset>
					<div classes={themeCss.controls}>
						<button
							classes={themeCss.previous}
							tabindex={yearPopupOpen ? 0 : -1}
							type="button"
							onclick={onYearPageDown}
							disabled={!yearInMinMax(year - 1)}
						>
							{...renderPagingButtonContent(Paging.previous)}
						</button>
						<button
							classes={themeCss.next}
							tabindex={yearPopupOpen ? 0 : -1}
							type="button"
							onclick={onYearPageUp}
							disabled={!yearInMinMax(year + 1)}
						>
							{...renderPagingButtonContent(Paging.next)}
						</button>
					</div>
				</div>
			</div>
		);
	}
);

export default DatePicker;
