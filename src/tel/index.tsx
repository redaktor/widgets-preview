import { create, tsx } from '@dojo/framework/core/vdom';
import * as libphonenumber from 'google-libphonenumber';
import theme from '../middleware/theme';
import i18nActivityPub from '../middleware/i18nActivityPub';
import bundle from './nls/Tel';

const factory = create({theme, i18nActivityPub}).properties<{telephone: string|number|(string|number)[], name?: string[]}>();
export const Telephone = factory(function telephone({middleware: {theme, i18nActivityPub}, properties}) {

	const { telephone, name = [] } = properties();
	const { format } = i18nActivityPub.localize(bundle);
	const title = format('title', {name: !name.length ? telephone : name.join(',')});

	const getTelLink = (nr: string|number) => {
		const s = `${nr}`;
		try {
			const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
			const phoneO = phoneUtil.parse(s, 'DE');
			if (!phoneUtil.isValidNumber(phoneO)) { return s }
			const tel = phoneUtil.format(phoneO, libphonenumber.PhoneNumberFormat.INTERNATIONAL).replace(/ /g,'');
			return <a classes={theme.uiColor()} title={title} itemprop="telephone" rel="noopener noreferrer" href={`tel:${tel}`}>{s}</a>
		} catch(e) {
			return s
		}
	}
	return Array.isArray(telephone) ? telephone.map((nr) => getTelLink(nr)) :
		[getTelLink(telephone)]
});

export default Telephone;
