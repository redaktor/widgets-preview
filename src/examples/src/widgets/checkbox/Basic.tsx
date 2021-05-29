import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import Checkbox from '@redaktor/widgets/checkbox';
import { ExampleProperties } from '@redaktor/widgets/common/util';

const factory = create({ icache }).properties<ExampleProperties>();

export default factory(function Basic({ properties, middleware: { icache } }) {
	const singleChecked = icache.getOrSet('singleChecked', true);
	const checked = icache.getOrSet('checked', false);
	const { variant = 'filled' } = properties();
	return (<Example spaced={true}>
		<span>
			<Checkbox variant={variant} size="m" checked={singleChecked}
				onValue={(singleChecked) => { icache.set('singleChecked', singleChecked); }}>
				Sample M checkbox that starts checked
			</Checkbox>

			<p>All the sizes</p>
			<Checkbox variant={variant} size="xs" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				XS Box
			</Checkbox>
			<Checkbox variant={variant} size="s" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				S Box
			</Checkbox>
			<Checkbox variant={variant} size="m" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				M Box
			</Checkbox>
			<Checkbox variant={variant} size="l" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				L Box
			</Checkbox>
			<Checkbox variant={variant} size="xl" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				XL Box
			</Checkbox>
			<Checkbox variant={variant} size="xxl" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				XXL
			</Checkbox>
			<p>Some colors</p>
			<Checkbox variant={variant} color="neutral">neutral</Checkbox>
			<Checkbox variant={variant} color="primary">primary</Checkbox>
			<Checkbox variant={variant} color="secondary">secondary</Checkbox>
			<Checkbox variant={variant} color="green">green</Checkbox>
			<Checkbox variant={variant} color="amber">amber</Checkbox>

			<p>Lorem <Checkbox variant={variant} color="amber">Checkbox M</Checkbox></p>
			<p>Lorem Ipsum</p>
			</span>
		</Example>);
});
