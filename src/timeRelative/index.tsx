import { create, tsx } from '@dojo/framework/core/vdom';
import i18nActivityPub from '../middleware/i18nActivityPub';
import timeRelative, { TimeRelativeProperties } from '../middleware/minute';
import bundle from './nls/TimeRelative';

const factory = create({ i18nActivityPub, timeRelative }).properties<TimeRelativeProperties>();
export const TimeRelative = factory(function timeago({ middleware: { i18nActivityPub, timeRelative }}) {
	const [{format}, i18nFormat] = [i18nActivityPub.localize(bundle), timeRelative.format()];
	timeRelative.start();
	return format(...i18nFormat)
});

export default TimeRelative;
