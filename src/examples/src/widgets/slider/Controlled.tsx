import icache from '@dojo/framework/core/middleware/icache';
import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Slider from '@redaktor/widgets/slider';

const factory = create({ icache });

export default factory(function Controlled({ middleware: { icache } }) {
	const value = icache.getOrSet('value', 50);

	return (<Example spaced={true}>
		<Slider
			min={0}
			max={100}
			value={value}
			onValue={(value) => {
				icache.set('value', value);
			}}
		/>
	</Example>);
});
