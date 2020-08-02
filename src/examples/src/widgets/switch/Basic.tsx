import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Switch from '@dojo/widgets/switch';
import { ExampleProperties } from '@dojo/widgets/common/util';

const factory = create({ icache }).properties<ExampleProperties>();

export default factory(function Basic({ properties, middleware: { icache } }) {
	const singleSwitched = icache.getOrSet('singleSwitched', true);
	const switched = icache.getOrSet('switched', false);
	const { variant = 'flat' } = properties();
	return (
		<div>
			<Switch variant={variant} checked={singleSwitched} name="Switch"
				onValue={(singleSwitched) => { icache.set('switched', singleSwitched); }}
			>
				{{ label: 'On/Off' }}
			</Switch>

			<p>All the sizes</p>
			<br />
			<Switch variant={variant} size="xs" checked={switched}
				onValue={(switched) => { icache.set('switched', switched); }}>
				XS Box
			</Switch>
			<Switch variant={variant} size="s" checked={switched}
				onValue={(switched) => { icache.set('switched', switched); }}>
				S Box
			</Switch>
			<Switch variant={variant} size="m" checked={switched}
				onValue={(switched) => { icache.set('switched', switched); }}>
				M Box
			</Switch>
			<Switch variant={variant} size="l" checked={switched}
				onValue={(switched) => { icache.set('switched', switched); }}>
				L Box
			</Switch>
			<Switch variant={variant} size="xl" checked={switched}
				onValue={(switched) => { icache.set('switched', switched); }}>
				XL Box
			</Switch>
			<Switch variant={variant} size="xxl" checked={switched}
				onValue={(switched) => { icache.set('switched', switched); }}>
				XXL
			</Switch>
			<p>Some colors</p>
			<Switch variant={variant} color="neutral">neutral</Switch>
			<Switch variant={variant} color="primary">primary</Switch>
			<Switch variant={variant} color="secondary">secondary</Switch>
			<Switch variant={variant} color="green">green</Switch>
			<Switch variant={variant} color="amber">amber</Switch>

			<p>Lorem Ipsum</p>
		</div>
	);
});
