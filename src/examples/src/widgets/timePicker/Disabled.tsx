import { create, tsx } from '@dojo/framework/core/vdom';
import TimePicker from '@redaktor/widgets/timePicker';
import Example from '../../Example';

const factory = create();

export default factory(function Basic() {
	return (
		<Example spaced={true}>
			<TimePicker disabled />
		</Example>
	);
});
