import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import Radio from '@dojo/widgets/radio';
import { ExampleProperties } from '@dojo/widgets/common/util';

const factory = create({ icache }).properties<ExampleProperties>();

export default factory(function Basic({ properties, middleware: { icache } }) {
	const singleChecked = icache.getOrSet('singleChecked', true);
	const checked = icache.getOrSet('checked', false);
	const { variant = 'flat' } = properties();
	return (<Example spaced={true}>
		<span>
			<Radio variant={variant} size="m" checked={singleChecked}
				onValue={(singleChecked) => { icache.set('singleChecked', singleChecked); }}>
				Sample M checkbox that starts checked
			</Radio>

			<p>All the sizes</p>
			<Radio variant={variant} size="xs" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				XS Box
			</Radio>
			<Radio variant={variant} size="s" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				S Box
			</Radio>
			<Radio variant={variant} size="m" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				M Box
			</Radio>
			<Radio variant={variant} size="l" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				L Box
			</Radio>
			<Radio variant={variant} size="xl" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				XL Box
			</Radio>
			<Radio variant={variant} size="xxl" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				XXL
			</Radio>
			<p>Some colors</p>
			<Radio variant={variant} color="neutral">neutral</Radio>
			<Radio variant={variant} color="primary">primary</Radio>
			<Radio variant={variant} color="secondary">secondary</Radio>
			<Radio variant={variant} color="green">green</Radio>
			<Radio variant={variant} color="amber">amber</Radio>

			<p>Lorem <Radio variant={variant} color="amber">Radio M</Radio></p>
			<p>Lorem Ipsum</p>
		</span>
	</Example>);
});
