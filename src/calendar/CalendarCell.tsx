import { tsx, create } from '@dojo/framework/core/vdom';
import * as css from '@redaktor/widgets/theme/material/calendar.m.css';
import theme from '@redaktor/widgets/middleware/theme';

export type SelectMode = boolean | 'start' | 'range' | 'end';
export interface CalendarCellProperties {
	/** Used to immediately call focus on the cell */
	callFocus?: boolean;
	/** The set date value */
	date: Date;
	/** Whether the date is in the displayed month */
	disabled?: boolean;
	/** Whether the shift key was pressed */
	shift?: boolean;
	/** Whether the date can receive tab focus */
	focusable?: boolean;
	/** Handler for the mouseenter event */
	onMouseEnter?(date: Date, isRange: boolean, disabled: boolean): void;
	/** Handler for the click event */
	onClick?(date: Date, isRange: boolean, disabled: boolean): void;
	/** Handler for when the cell receives focus */
	onFocusCalled?(): void;
	/** Handler for the key down event */
	onKeyDown?(key: number, preventDefault: () => void): void;
	/** Handler for the key up event */
	onKeyUp?(key: number, preventDefault: () => void): void;
	/** if the date is outside the min/max */
	outOfRange?: boolean;
	/** if the date is currently selected */
	selected?: SelectMode;
	/** if the date the same as the current day */
	today?: boolean;
	/** if the date belongs to a hovered day in range mode */
	hoverRange?: boolean;
}
const CalendarCell = create({ theme }).properties<CalendarCellProperties>()(
	function CalendarCell({ middleware: { theme }, properties }) {
		const themeCss = theme.classes(css);
		const {
			callFocus,
			date,
			focusable = false,
			selected = false,
			onFocusCalled,
			disabled = false,
			outOfRange = false,
			hoverRange = false,
			today = false
		} = properties();
		let downTimer = 0;

		function onMouseenter(event: MouseEvent) {
			event.stopPropagation();
			const { date, disabled = false, onMouseEnter } = properties();
			onMouseEnter && onMouseEnter(date, event.shiftKey, disabled);
		}
		function onMousedown(event: MouseEvent) {
			downTimer = event.timeStamp;
		}
		function onClick(event: MouseEvent) {
			event.stopPropagation();
			const { date, disabled = false, onClick /*, outOfRange = false*/ } = properties();
			let isRange = event.shiftKey || (event.timeStamp - downTimer > 640);
			downTimer = 0;
			onClick && onClick(date, isRange, disabled);
		}

		function onKeyDown(event: KeyboardEvent) {
			event.stopPropagation();
			const { onKeyDown } = properties();
			onKeyDown && onKeyDown(event.which, () => { event.preventDefault() });
		}
		function onKeyUp(event: KeyboardEvent) {
			event.stopPropagation();
			const { onKeyUp } = properties();
			onKeyUp && onKeyUp(event.which, () => { event.preventDefault() });
		}

		if (callFocus) {
			onFocusCalled && onFocusCalled();
		}

		return (
			<td
				key="root"
				focus={callFocus}
				role="gridcell"
				aria-selected={!!selected ? 'true' : 'false'}
				tabIndex={focusable ? 0 : -1}
				classes={[
					themeCss.date,
					disabled || outOfRange ? themeCss.inactiveDate : null,
					outOfRange ? themeCss.outOfRange : null,
					hoverRange ? themeCss.hoverRange : null,
					!!selected ? themeCss.selectedDate : null,
					selected === 'start' ? themeCss.start : null,
					selected === 'range' ? themeCss.range : null,
					selected === 'end' ? themeCss.end : null,
					today ? themeCss.todayDate : null
				]}
				onclick={onClick}
				onmouseenter={onMouseenter}
				onmousedown={onMousedown}
				onkeydown={onKeyDown}
				onkeyup={onKeyUp}
			>
				<p>{`${date.getDate()}`}</p>
			</td>
		);
	}
);

export default CalendarCell;
