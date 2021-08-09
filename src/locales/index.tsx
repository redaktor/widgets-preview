import { tsx, create } from '@dojo/framework/core/vdom';
import { Labeled } from '../common/interfaces';
import Icon from '../icon';
import Details from '../details';
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
	const { locales = [], locale = { locale: 'en' }, open = false, classes, onValue } = properties();
	if (!locales || !locales.length) { return '' }

	const initialValue = !locale.locale ? locales[0].value : !!locales.filter((o) => o.value === locale.locale).length ?
		locale.locale : locale.locale.split('-')[0];

	return <Details classes={classes} serif open={open}>
	{{
		summary: <virtual>
			<Icon type="globe" spaced />
			{locales.map((l,i,a) => {
				const v = (locale.locale||initialValue);
				const selected = l.value === v || (typeof v === 'string' && l.value === v.split('-')[0]);
				return <virtual>
					<li classes={[
						themedCss.item,
						selected && themedCss.selected
					]}>
						<i>{l.value}</i>
					</li>
					{i < a.length-1 ? ', ' : ''}
				</virtual>
			})}
		</virtual>,
		content: <DynamicSelect
			size="s"
			initialValue={initialValue}
			name="locales"
			options={locales}
			onValue={(value) => {
				onValue && onValue(value);
			}}
		/>
	}}
	</Details>
});

export default Locales;
