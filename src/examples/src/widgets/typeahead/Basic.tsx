import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Typeahead from '@redaktor/widgets/typeahead';
import Example from '../../Example';
import {
	createResourceTemplate,
	createResourceMiddleware,
	defaultFilter
} from '@dojo/framework/core/middleware/resources';
import { largeListOptions } from '../../data';
import { ListOption } from '@redaktor/widgets/list';
import { Addon } from '@redaktor/widgets/inputText';
import Icon from '@redaktor/widgets/icon';
import timezones from '../../../../common/data/timezones';
import * as css from './list.m.css';

const resource = createResourceMiddleware();
const factory = create({ icache, resource });
/*
const dataWithDisabled = largeListOptions.map((item) => ({
	...item,
	disabled: Math.random() < 0.1
}));
*/
export const listOptionTemplate = createResourceTemplate<ListOption>({
	idKey: 'value',
	read: async (req, { put }) => {
		const { offset, size, query } = req;
		const filteredData = timezones.map((s: string) => ({label: s, value: s})).filter((item) => defaultFilter(query, item));
		put({ data: filteredData.slice(offset, offset + size), total: filteredData.length }, req);
	}
});

export default factory(function Basic({ middleware: { icache, resource } }) {
	const strict = icache.getOrSet('strict', true);
	return (
		<Example spaced={true}>
			<div class="flexRow">
				<Typeahead
					variant='filled'
					initialValue={'Europe/Berlin'}
					strict={strict}
					resource={resource({
						template: listOptionTemplate
					})}
					onBlur={() => console.log('onBlur')}
					onValue={(value) => {
						icache.set('value', value);
					}}
					classes={{
						'@redaktor/widgets/typeahead': {
							menu: [css.menu]
						}
					}}
				>
					{{
						leading: <Addon><Icon type='globe' size='xxl'></Icon></Addon>,
						label: 'Basic Typeahead'
					}}
				</Typeahead>
			</div>
			<button onclick={() => icache.set('strict', (strict = true) => !strict)}>
				{strict ? 'Non strict' : 'strict'}
			</button>
			<pre>{JSON.stringify(icache.getOrSet('value', ''))}</pre>
		</Example>
	);
});
