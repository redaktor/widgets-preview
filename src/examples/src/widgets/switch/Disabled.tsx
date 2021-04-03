import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import Switch from '@dojo/widgets/switch';

const factory = create({ icache });

export default factory(function Basic({ middleware: { icache } }) {
	// const switched = icache.getOrSet('switched', false);
	return (<Example spaced={true}>
		<span>
			<Switch
				name="Switch"
				disabled={true}
				onValue={(switched) => {
					icache.set('switched', switched);
				}}
			>
				{{ label: 'Disabled Off' }}
			</Switch>
			<Switch
				name="Switch"
				disabled={true}
				onValue={(switched) => {
					icache.set('switched', switched);
				}}
			>
				{{ label: 'Disabled On' }}
			</Switch>
		</span>
	</Example>);
});
