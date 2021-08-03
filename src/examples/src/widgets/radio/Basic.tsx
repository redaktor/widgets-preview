import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import Radio from '@redaktor/widgets/radio';
import { ExampleProperties } from '@redaktor/widgets/common/util';

const factory = create({ icache }).properties<ExampleProperties>();

export default factory(function Basic({ properties, middleware: { icache } }) {
	const singleChecked = icache.getOrSet('singleChecked', true);
	const checked = icache.getOrSet('checked', false);
	const { design = 'flat' } = properties();
	return (<Example spaced={true}>
		<span>
			<Radio design={design} size="m" checked={singleChecked}
				onValue={(singleChecked) => { icache.set('singleChecked', singleChecked); }}>
				Sample M checkbox that starts checked
			</Radio>

			<p>All the sizes</p>
			<Radio design={design} size="xs" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				XS Box
			</Radio>
			<Radio design={design} size="s" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				S Box
			</Radio>
			<Radio design={design} size="m" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				M Box
			</Radio>
			<Radio design={design} size="l" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				L Box
			</Radio>
			<Radio design={design} size="xl" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				XL Box
			</Radio>
			<Radio design={design} size="xxl" checked={checked}
				onValue={(checked) => { icache.set('checked', checked); }}>
				XXL
			</Radio>
			<p>Some colors</p>
			<Radio design={design} color="neutral">neutral</Radio>
			<Radio design={design} color="primary">primary</Radio>
			<Radio design={design} color="secondary">secondary</Radio>
			<Radio design={design} color="green">green</Radio>
			<Radio design={design} color="amber">amber</Radio>

			<p>Lorem <Radio design={design} color="amber">Radio M</Radio></p>
			<p>Lorem Ipsum</p>
		</span>
	</Example>);
});
