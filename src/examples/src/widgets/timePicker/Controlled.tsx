import { create, tsx } from '@dojo/framework/core/vdom';
import TimePicker from '@redaktor/widgets/timePicker';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';

const factory = create({ icache });

export default factory(function Controlled({ middleware: { icache } }) {
	return (
		<Example spaced={true}>
			<TimePicker
				step={1800}
				value={icache.get('value')}
				onValue={(value) => icache.set('value', value)}
			>
				{{ label: 'Time: ' }}
			</TimePicker>
			<div>The value is {icache.get('value') || 'not set'}</div>
		</Example>
	);
});
