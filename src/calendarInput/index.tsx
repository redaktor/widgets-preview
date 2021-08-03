import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@redaktor/widgets/middleware/theme';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import {
	createResourceTemplate,
	createResourceMiddleware,
	defaultFilter
} from '@dojo/framework/core/middleware/resources';
import focus from '@dojo/framework/core/middleware/focus';
import i18n from '@dojo/framework/core/middleware/i18n';
import { parseDate, formatDate } from './date-utils';
import { Addon } from '@redaktor/widgets/inputText';
import TimePicker from '@redaktor/widgets/timePicker';
import DateInput from '@redaktor/widgets/inputDate';
import { ListOption } from '@redaktor/widgets/list';
import Icon from '@redaktor/widgets/icon';
import Typeahead from '@redaktor/widgets/typeahead';
import Calendar, { CalendarProperties, CalendarChildren } from '@redaktor/widgets/calendar';
import timezones from '@redaktor/widgets/common/data/timezones';
import bundle from './nls/CalendarInput';
import * as ui from '@redaktor/widgets/theme/material/_ui.m.css';
import * as css from '@redaktor/widgets/theme/material/calendar.m.css';

/* TODO parse relative */

export interface CalendarInputProperties extends CalendarProperties {
	/** Input fields above, default false */
	inputFirst?: boolean;
	/** Timezone for the times */
	timezone?: string;
}
export interface CalendarInputIcache {
	/** The most recent "start" property passed */
	start: Date;
	/** Current user-inputted start value */
	startInput: string;
	startTimeInput?: string;
	/** The most recent "end" property passed */
	end?: Date;
	/** Current user-inputted end value */
	endInput?: string;
	endTimeInput?: string;
	/** Timezone for the times */
	timezone?: string;
	/** End is the same than start */
	oneDay?: boolean;
	/** Current locale */
	locale: string;
	/** Indicates which node will be focused */
	focusNode: 'start' | 'end' | 'calendar';
	/** Should validate the input value on the next cycle */
	shouldValidate: boolean;
	/** Final validation message */
	validationMessage?: string;
	/** Can we change both input */
	isRange?: boolean;
}

const icache = createICacheMiddleware<CalendarInputIcache>();
const resource = createResourceMiddleware();
export const listOptionTemplate = createResourceTemplate<ListOption>({
	idKey: 'value',
	read: async (req, { put }) => {
		const { offset, size, query } = req;
		const filteredData = timezones.map((s: string) =>
			({label: s, value: s})).filter((item) => defaultFilter(query, item));
		put({ data: filteredData.slice(offset, offset + size), total: filteredData.length }, req);
	}
});

const factory = create({
	icache,
	resource,
	i18n,
	theme,
	focus
})
	.properties<CalendarInputProperties>()
	.children<CalendarChildren | undefined>();

export const CalendarInput = factory(function CalendarInput({
	middleware: { icache, resource, i18n, theme, focus },
	properties,
	children
}) {
	const themedCss = theme.classes(css);
	const { messages } = i18n.localize(bundle);

	const {
		minDate,
		start: s = new Date(),
		/* TODO */
		// end,
		design,
		color = 'primary',
		size = 'm',
		timezone = (new Intl.DateTimeFormat().resolvedOptions().timeZone)||'Europe/Berlin',
		locales,
		allowRange = true,
		inputFirst = false
	} = properties();

	const { monthLabel, weekdayCell, header, footer } = children()[0] || ({} as CalendarChildren);

	icache.getOrSet('oneDay', true, false);
	const start = icache.getOrSet('start', (s instanceof Date) ? s : new Date(), false);
console.log(start, icache.get('end'));
	if ((icache.get('end') instanceof Date) && start >= (icache.get('end') as any)) {
		icache.set('end', void 0);
		icache.set('endInput', icache.get('startInput'));
	}

	const shouldValidate = icache.getOrSet('shouldValidate', true, false);
	/* TODO
	const shouldFocus = focus.shouldFocus();
	const focusNode = icache.getOrSet('focusNode', 'start');
	*/
	const nextDay = new Date(start.getTime());
	nextDay.setDate(nextDay.getDate() + 1);
	icache.getOrSet('startInput', formatDate(start, locales));
	if (shouldValidate) {
		icache.set('shouldValidate', false);
	}

	function setTextValue(key: 'start'|'end') {
		return (v: string) => {
			const d = parseDate(v, locales);
			console.log('ON B! setTextValue', key, d);
			key === 'end' && icache.set('focusNode','start',false);

			if (!!d) {
				icache.set((`${key}Input` as 'startInput'|'endInput'), v, false)
				icache.set(key, d);
			} else {
				icache.set((`${key}Input` as 'startInput'|'endInput'), formatDate(start, locales));
				icache.set(key, void 0);
			}
			const oneDay = !icache.get('end') || ((icache.get('start') || new Date()).getTime() ===
				(icache.get('end') || new Date()).getTime());
			icache.set('oneDay', oneDay);

		}
	}
	function setDateValue(start: Date, end: Date) {
		const oneDay = !end || (start.getTime() === end.getTime());
		icache.set('oneDay', oneDay, false);
		icache.set('start', start);
		icache.set('end', oneDay ? void 0 : end, false);
		icache.set('startInput', formatDate(start, locales), false);
		icache.set('endInput', oneDay ? '' : formatDate(end, locales));
	}

	const inputSize: any = { xs: 's', s: 'm', m: 'l', l: 'xl', xl: 'xl', xxl: 'xxl' }
	const input = <div classes={themedCss.inputHeader}>
		<DateInput
			{...{design, color, size: inputSize[size||'m']}}
			key="start"
			required={true}
			initialValue={icache.get('startInput')}
			onFocus={() => icache.set('focusNode','start')}
			onBlur={setTextValue('start')}
			placeholder={formatDate()}
			helperText={icache.get('validationMessage')}
			locales={locales}
			relativeTo={icache.get('start')}
			timezone={icache.get('timezone')}
		>
			{{ label: <span>{messages.date}</span> }}
		</DateInput>

		{ allowRange && <virtual>
			<DateInput
				{...{design, color, size: inputSize[size||'m']}}
				key="end"
				initialValue={icache.get('endInput')}
				onFocus={() => icache.set('focusNode','end')}
				onBlur={setTextValue('end')}
				helperText={icache.get('validationMessage')}
				locales={locales}
				relativeTo={icache.get('start')}
				timezone={icache.get('timezone')}
				classes={{
			    '@redaktor/widgets/inputText': {
			      root: [themedCss.rootEnd]
			    }
			  }}
			>
				{{ label: <span>{messages.to}</span> }}
			</DateInput>
			<div classes={[themedCss.rootStart, theme.sized(ui)]} />
		</virtual>}
		<div classes={themedCss.timeInput}>
			<TimePicker
				{...{design, color, size: inputSize[size||'m']}}
				key="startTime"
				placeholder='hh:mm'
				value={icache.get('startTimeInput')}
				onValue={(v) => { }}
				helperText={icache.get('validationMessage')}

				relativeTo={icache.get('start')}
				timezone={icache.get('timezone')}
			>
			{{
				label: <span>{messages.time}</span>
			}}
			</TimePicker>
		</div>
		<div classes={themedCss.timeInput}>
			<TimePicker
				{...{design, color, size: inputSize[size||'m']}}
				key="endTime"
				placeholder='hh:mm'
				value={icache.get('endTimeInput')}
				onValue={(v) => { }}
				helperText={icache.get('validationMessage')}
				timezone={icache.get('timezone')}
			>
			{{
				label: <span>{messages.to}</span>
			}}
			</TimePicker>
		</div>
		<Typeahead
			size={inputSize[size||'m']}
			key='timezone'
			design={design}
			initialValue={timezone}
			strict={true}
			resource={resource({
				template: listOptionTemplate
			})}
			onBlur={() => console.log('onBlur')}
			onValue={(listOption) => {
				icache.set('timezone', listOption.value);
			}}
			classes={{
				'@redaktor/widgets/typeahead': {
					root: [css.timezoneInput],
					menu: [css.timezones]
				}
			}}
		>
			{{
				leading: <Addon><Icon type='globe' size={size}></Icon></Addon>,
				label: <span>{messages.tz}</span>
			}}
		</Typeahead>
	</div>

	return (
		<Calendar
			{...properties()}
			forceRange={icache.get('focusNode') === 'end'}
			minDate={icache.get('focusNode') === 'end' ? icache.get('start') : minDate}
			start={icache.get('start')}
			end={icache.get('end')}
			onValue={setDateValue}
		>
			{{
				monthLabel,
				weekdayCell,
				header: <virtual>{header}{inputFirst ? input : null}</virtual>,
				footer: <virtual>{footer}{inputFirst ? null : input}</virtual>
			}}
		</Calendar>
	);
});

export default CalendarInput;
