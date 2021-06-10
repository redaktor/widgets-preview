import { tsx, create } from '@dojo/framework/core/vdom';
import { Labeled } from '../common/interfaces';
import Icon from '../icon';
import DynamicSelect from '../selectDynamic';
import * as css from '../theme/material/details.m.css';
import theme from '../middleware/theme';

export interface LocalesProperties {
	locales: Labeled[];
	locale: {locale: string; rtl?: boolean;};
	open?: boolean;
	onValue?(locale: string): any;
}

const factory = create({ theme }).properties<LocalesProperties>();

export const Locales = factory(function Locales({ properties, middleware: { theme } }) {
	const themedCss = theme.classes(css);
	const { locales = [], locale = { locale: 'en' }, open = false, onValue } = properties();
	const detailsProps = open ? { open: true } : {};

	const initialValue = !locale.locale ? locales[0].value : !!locales.filter((o) => o.value === locale.locale).length ?
		locale.locale : locale.locale.split('-')[0];

	return <details {...detailsProps}>
			<summary>
				<Icon type="globe" />{' '}
				<i classes={themedCss.metaSummary}>{
					locales.map((l,i,a) => {
						const v = (locale.locale||initialValue);
						const localeCaption = `${l.value}${i < a.length-1 ? ', ' : ''}`;
						return l.value === v || (typeof v === 'string' && l.value === v.split('-')[0]) ? 
							<span classes={themedCss.selected}>{localeCaption}</span> : localeCaption
					})
				}</i>
			</summary>
			<DynamicSelect
				size="s"
				initialValue={initialValue}
				name="locales"
				options={locales}
				onValue={(value) => {
					onValue && onValue(value);
				}}
			/>
		</details>
});

export default Locales;
