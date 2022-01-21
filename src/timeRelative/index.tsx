import { create, tsx } from '@dojo/framework/core/vdom';
import i18nActivityPub from '../middleware/i18nActivityPub';
import timeRelative, { TimeRelativeProperties, stdDateFormat } from '../middleware/minute';
import bundle from './nls/TimeRelative';

const factory = create({ i18nActivityPub, timeRelative }).properties<TimeRelativeProperties>();
/*
// Date
date: number | Date | string;
// subscribe to changes
isLive?: boolean;
// absolute date as title
hasTitle?: boolean;
*/
export const TimeRelative = factory(function timeago({ middleware: { i18nActivityPub, timeRelative }, properties}) {
	const { date, short = false, hasTitle = false } = properties();
	if (typeof date !== 'number' && !date) { return '' }
	const localizedDate = new Intl.DateTimeFormat([i18nActivityPub.get().locale, 'en'], stdDateFormat);
	const [{format}, i18nFormat] = [i18nActivityPub.localize(bundle), timeRelative.format()];
	timeRelative.start(short);
	return hasTitle ? <span title={localizedDate.format(typeof date === 'string' ? Date.parse(date) : date)}>
		{format(...i18nFormat)}
	</span> : format(...i18nFormat);
});

export default TimeRelative;
