import { create, tsx } from '@dojo/framework/core/vdom';
import { uuid } from '@dojo/framework/core/util';
import i18n from '@dojo/framework/core/middleware/i18n';
import Button from '../button';
import theme, { ThemeProperties } from '../middleware/theme';
import bundle from './nls/Collapsed';
import * as css from '../theme/material/collapsed.m.css';

export interface CollapsedProperties extends ThemeProperties {
	/** The property for the named group */
	property?: string;
	/** The line clamp count, default 14 */
	lines?: number;
	/** Initially expaned, default false */
	expanded?: boolean;
	/** full width */
	responsive?: boolean;
	/** label content */
	label?: 'read'|'readMore'|'view'|'viewMore';
}

const factory = create({ theme, i18n })
	.properties<CollapsedProperties>();

export const Collapsed = factory(function Collapsed({ properties, children, middleware: { theme, i18n } }) {
	const {
		lines = 14,
		expanded = false,
		property = uuid(),
		responsive = true,
		spaced = false,
		size = 's',
		color = 'primary',
		variant = 'flat',
		label = 'readMore'
	} = properties();

	const c = children();
	if (!c || !c.length) { return '' }
	const { messages } = i18n.localize(bundle);

	const themedCss = theme.classes(css);
	const idBase = `${uuid()}_${property}`;
	return <virtual>
		{!!expanded ?
			<input id={idBase} type="checkbox" key="contentDetails" classes={themedCss.input} checked={true} /> :
			<input id={idBase} type="checkbox" key="contentDetails" classes={themedCss.input} />
		}
		<div classes={[themedCss.root]} style={`--l: ${lines};`}>
			{children()}
		</div>
		<Button labelFor={idBase} {...{size, spaced, color, variant, responsive}}>
			<span classes={themedCss.more} /> {messages[label]}
		</Button>
	</virtual>
});
export default Collapsed;
