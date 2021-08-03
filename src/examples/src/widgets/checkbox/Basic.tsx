import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import Checkbox from '@redaktor/widgets/checkbox';
import { ExampleProperties } from '@redaktor/widgets/common/util';

const factory = create({ icache }).properties<ExampleProperties>();

export default factory(function Basic({ properties, middleware: { icache } }) {
	const singleChecked = icache.getOrSet('singleChecked', true);
	const checked = icache.getOrSet('checked', false);
	const { design = 'filled' } = properties();
	return (<Example spaced={true}>
		<span>
			<Checkbox design={design} size="m" checked={singleChecked}
				onValue={(singleChecked) => { icache.set('singleChecked', singleChecked); }}>
				Sample M checkbox that starts checked
			</Checkbox>

			<p>All the sizes</p>
			<Checkbox design={design} size="xs" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				XS Box
			</Checkbox>
			<Checkbox design={design} size="s" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				S Box
			</Checkbox>
			<Checkbox design={design} size="m" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				M Box
			</Checkbox>
			<Checkbox design={design} size="l" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				L Box
			</Checkbox>
			<Checkbox design={design} size="xl" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				XL Box
			</Checkbox>
			<Checkbox design={design} size="xxl" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				XXL
			</Checkbox>
			<p>Some colors</p>
			<Checkbox design={design} color="neutral">neutral</Checkbox>
			<Checkbox design={design} color="primary">primary</Checkbox>
			<Checkbox design={design} color="secondary">secondary</Checkbox>
			<Checkbox design={design} color="green">green</Checkbox>
			<Checkbox design={design} color="amber">amber</Checkbox>

			<p>Lorem <Checkbox design={design} color="amber">Checkbox M</Checkbox></p>
			<p>Lorem Ipsum</p>
			</span>
		</Example>);
});
