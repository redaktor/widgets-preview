import { create, tsx } from '@dojo/framework/core/vdom';
import { AsObjectNormalized } from '../common/interfaces';
import i18nActivityPub from '../middleware/i18nActivityPub';
import theme from '../middleware/theme';
import * as css from '../theme/material/accessory.m.css';

export interface AccessoryProperties {
	mode?: ('tag' | 'topic' | 'bookmark' | 'ribbon') & keyof typeof css;
	items: AsObjectNormalized[];
}

const factory = create({ i18nActivityPub, theme }).properties<AccessoryProperties>();
export const Accessory = factory(function accessory({ middleware: { theme }, properties }) {
	const { mode = 'tag', items = [] } = properties();
	const themedCss = theme.classes(css);

	return <ul classes={[
		themedCss.root,
		theme.variant(),
		theme.uiColor()
	]}>{
		!items.length ? '' : items.map((o,i) => !o.name ? '' :
		<li style={`--i: ${i};`}
			classes={[
				themedCss[mode],
				items.length > 3 ? themedCss.more3 : themedCss.max3,
				i>3 && themedCss.onlyHover
			]}
		>
			{o.name.map((n) => {
				n = n.trim().replace(/^#/,'');
				return <a href={`/tags/${n}`} title={`#${n}`} rel="noopener noreferrer tag" target="_blank" classes={themedCss.tagLink}>{n}</a>
			})}
		</li>)}
	</ul>
});

export default Accessory;
