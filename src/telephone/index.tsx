import { create, tsx } from '@dojo/framework/core/vdom';
import i18nActivityPub from '../middleware/i18nActivityPub';
import * as libphonenumber from 'google-libphonenumber';
// import bundle from './nls/TimeRelative';

const factory = create({ i18nActivityPub }).properties<{telephone: string|number|(string|number)[]}>();
export const Telephone = factory(function telephone({ middleware: { i18nActivityPub }, properties}) {

	const { telephone } = properties()

	const getPhoneLink = (nr: string|number) => {
		const s = `${nr}`;
		try {
			const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
			const phoneO = phoneUtil.parse(s, 'DE');
			if (!phoneUtil.isValidNumber(phoneO)) { return s }
			const tel = phoneUtil.format(phoneO, libphonenumber.PhoneNumberFormat.INTERNATIONAL).replace(/ /g,'');
			return <a itemprop="telephone" rel="noopener noreferrer" href={`tel:${tel}`}>{s}</a>
		} catch(e) {
			return s
		}
	}
	return Array.isArray(telephone) ? telephone.map((nr) => getPhoneLink(nr)) :
		[getPhoneLink(telephone)]
});

export default Telephone;
