import { create, tsx } from '@dojo/framework/core/vdom';
import { AsObjectNormalized } from '../common/interfaces';
import theme from '../middleware/theme';
import i18nActivityPub from '../middleware/i18nActivityPub';
import bundle from './nls/Geo';
import { geoHref } from '../map/util';

const factory = create({theme, i18nActivityPub}).properties<Partial<AsObjectNormalized>>();
export const Geo = factory(function geo({middleware:{theme, i18nActivityPub}, properties}) {
	const { name = [] } = properties();
	const { format } = i18nActivityPub.localize(bundle);
	const title = format('title', {name: name.join(',')});
	const { href, content } = geoHref(properties());
	return <a classes={theme.uiColor()} title={title} itemprop="geo" rel="noopener noreferrer" href={href}>{content}</a>
});

export default Geo;
