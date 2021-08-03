import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import Switch from '@redaktor/widgets/switch';
import { ExampleProperties } from '@redaktor/widgets/common/util';

const factory = create({ icache }).properties<ExampleProperties>();

export default factory(function Basic({ properties, middleware: { icache } }) {
	const singleSwitched = icache.getOrSet('singleSwitched', true);
	const switched = icache.getOrSet('switched', false);
	const { design = 'flat' } = properties();
	return (<Example spaced={true}>
		<span>
			<Switch design={design} checked={singleSwitched} name="Switch"
				onValue={(singleSwitched) => { icache.set('switched', singleSwitched); }}
			>
				{{ label: 'On/Off' }}
			</Switch>

			<p>All the sizes</p>
			<br />
			<Switch design={design} size="xs" checked={switched}
				onValue={(switched) => { icache.set('switched', switched); }}>
				XS Box
			</Switch>
			<Switch design={design} size="s" checked={switched}
				onValue={(switched) => { icache.set('switched', switched); }}>
				S Box
			</Switch>
			<Switch design={design} size="m" checked={switched}
				onValue={(switched) => { icache.set('switched', switched); }}>
				M Box
			</Switch>
			<Switch design={design} size="l" checked={switched}
				onValue={(switched) => { icache.set('switched', switched); }}>
				L Box
			</Switch>
			<Switch design={design} size="xl" checked={switched}
				onValue={(switched) => { icache.set('switched', switched); }}>
				XL Box
			</Switch>
			<Switch design={design} size="xxl" checked={switched}
				onValue={(switched) => { icache.set('switched', switched); }}>
				XXL
			</Switch>
			<p>Some colors</p>
			<Switch design={design} color="neutral">neutral</Switch>
			<Switch design={design} color="primary">primary</Switch>
			<Switch design={design} color="secondary">secondary</Switch>
			<Switch design={design} color="green">green</Switch>
			<Switch design={design} color="amber">amber</Switch>

			<p>Lorem Ipsum</p>
		</span>
	</Example>);
});
