export type ParseableDate = string | number | Date | null | undefined;

export function format(date: Date) {
	return Intl.DateTimeFormat().format(date);
}

function _getLocalised(
	locales: string[] = [Intl.DateTimeFormat().resolvedOptions().locale],
	min = 1,
	max = 8,
	month: number | null = 7,
	date?: number
) {
	let i, _d;
	const id = max === 8 ? 'weekday' : 'month';
	const locale = Array.isArray(locales) && locales.length ? locales[0] : void 0;
	const a = [];
	for (i = min; i < max; i++) {
		_d = new Date(2021, month||i, date||i);
	  a.push({
	  	short: Intl.DateTimeFormat(locale, { [id]: 'short' }).format(_d),
	    long: Intl.DateTimeFormat(locale, { [id]: 'long' }).format(_d)
	  });
	}
	return a
}
export function getWeekdays(locales?: string[]) {
	return _getLocalised(locales)
}
export function getMonths(locales?: string[]) {
	return _getLocalised(locales, 0, 12, null, 3)
}
export function monthInMin(year: number, month: number, minDate?: Date) {
	if (minDate) {
		return new Date(year, month, 1) >= new Date(minDate.getFullYear(), minDate.getMonth(), 1);
	}
	return true;
}

export function monthInMax(year: number, month: number, maxDate?: Date) {
	if (maxDate) {
		const thisMonth = new Date(year, month, 1);
		const max = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
		return thisMonth <= max;
	}
	return true;
}

function stripTime(date: Date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isOutOfDateRange(dateObj: Date, min?: Date, max?: Date) {
	return Boolean((min && dateObj < stripTime(min)) || (max && stripTime(dateObj) > max));
}

export function toDate(d: ParseableDate) {
	if (d instanceof Date) {
		return d;
	}

	if (typeof d === 'string' || typeof d === 'number') {
		return new Date(d);
	}

	return new Date();
}
