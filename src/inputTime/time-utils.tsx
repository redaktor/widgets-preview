import { padStart } from '@dojo/framework/shim/string';
// import spacetime from '@redaktor/widgets/common/spacetime';
import { parseRelative } from '@redaktor/widgets/calendarInput/date-utils';

export interface TimeParser {
	regex: RegExp;
	positions: {
		hour?: number;
		minute?: number;
		second?: number;
		amPm?: number;
	};
}

export const formats: Record<string, TimeParser> = {
	hh: {
		regex: /^(\d{1,2})[:]?$/i,
		positions: {
			hour: 1
		}
	},

	hhmm: {
		regex: /^(\d{1,2}):(\d{1,2})$/,
		positions: {
			hour: 1,
			minute: 2
		}
	},
	hhmmss: {
		regex: /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/,
		positions: {
			hour: 1,
			minute: 2,
			second: 3
		}
	},
	hham: {
		regex: /^(\d{1,2})\s*([ap]\.? ?m\.?)$/i,
		positions: {
			hour: 1,
			amPm: 2
		}
	},

	hhmmam: {
		regex: /^(\d{1,2}):(\d{1,2})\s*([ap]\.? ?m\.?)$/i,
		positions: {
			hour: 1,
			minute: 2,
			amPm: 3
		}
	},
	hhmmssam: {
		regex: /^(\d{1,2}):(\d{1,2}):(\d{1,2})\s*([ap]\.? ?m\.?)$/i,
		positions: {
			hour: 1,
			minute: 2,
			second: 3,
			amPm: 4
		}
	}
};

const amPmRegex = /^\d{1,2}\s*([ap]\.? ?m\.?)$/i;
const formats24 = ['hh', 'hhmm', 'hhmmss'];
const formats12 = ['hh', 'hhmm', 'hhmmss', 'hham', 'hhmmam', 'hhmmssam'];

export function parseTime(
	time: string | undefined,
	hour12: boolean,
	userLocales: string[] = [],
	relativeTo: Date = (new Date()),
	timezone?: string
) {
	if (!time) { return undefined; }

	if (amPmRegex.test(time)) {
		for (const key of formats12) {
			const format = formats[key] as TimeParser;
			const match = format.regex.exec(time);
			if (match) {
				let hours = format.positions.hour ? parseInt(match[format.positions.hour], 0) : 0;
				if (hours <= 12) {
					hour12 = true;
				}
			}
		}
	}

	const timeFormats = hour12 ? formats12 : formats24;

	for (const key of timeFormats) {
		const format = formats[key] as TimeParser;

		const match = format.regex.exec(time);
		if (match) {
			let hours = format.positions.hour ? parseInt(match[format.positions.hour], 0) : 0;
			const minutes = format.positions.minute
				? parseInt(match[format.positions.minute], 0)
				: 0;
			const seconds = format.positions.second
				? parseInt(match[format.positions.second], 0)
				: 0;

			if (
				hour12 &&
				format.positions.amPm &&
				match[format.positions.amPm].toLocaleLowerCase()[0] === 'p' &&
				hours !== 12
			) {
				// special case for '12pm', which is just 12
				hours += 12;
			} else if (
				hour12 &&
				format.positions.amPm &&
				match[format.positions.amPm].toLocaleLowerCase()[0] === 'a' &&
				hours === 12
			) {
				// special case of '12am', which we want to be hour 0
				hours = 0;
			}

			if (hours === undefined || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
				return undefined;
			}

			return new Date(1970, 0, 1, hours, minutes, seconds, 0);
		}
	}

	if (userLocales) {
		const rel = parseRelative(time, userLocales, relativeTo, timezone);
		if (!!rel) { return rel.value }
	}

	return undefined;
}

export function format24HourTime(dt: Date) {
	return `${padStart(String(dt.getHours()), 2, '0')}:${padStart(
		String(dt.getMinutes()),
		2,
		'0'
	)}:${padStart(String(dt.getSeconds()), 2, '0')}`;
}
