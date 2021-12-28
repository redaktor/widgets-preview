import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '../middleware/theme';
import i18nActivityPub from '../middleware/i18nActivityPub';
import MD from '../MD';
import bundle from './nls/Mailto';

const factory = create({theme, i18nActivityPub}).properties<{email: string|(string)[], name?: string[]}>();
export const Email = factory(function email({middleware: {theme, i18nActivityPub}, properties}) {

	const { email, name = [] } = properties();
	const { format } = i18nActivityPub.localize(bundle);

	const getMailtoLink = (mail: string) => {
		return <MD components={{p:'span'}} content={mail} onlyFirst="a" transformNodes={(n) => {
			if (n && typeof n === 'object' && !Array.isArray(n) && n.properties && n.properties.href && n.properties.href.indexOf('mailto') === 0) {
				n.properties.itemprop = 'email';
				n.properties.title = format('title', {name: !name.length ? email : name.join(',')});
			}
			return n
		}} />
	}
	return Array.isArray(email) ? email.map((s) => getMailtoLink(s)) : [getMailtoLink(email)]
});

export default Email;
