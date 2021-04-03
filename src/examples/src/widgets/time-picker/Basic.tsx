import { create, tsx } from '@dojo/framework/core/vdom';
import TimePicker from '@dojo/widgets/time-picker';
import TextInput from '@dojo/widgets/text-input';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';

const factory = create({ icache });

export default factory(function Basic({ middleware: { icache } }) {
	return (
		<Example spaced={true}>
			<div>
				<TimePicker responsive={false} step={1800} onValue={(value) => icache.set('value', value)}>
					{{ label: 'Time: ' }}
				</TimePicker>
				<TextInput variant='filled' initialValue="TEST">TEST</TextInput>
				<div>The value is {icache.get('value') || 'not set'}</div>
			</div>
		</Example>
	);
});
