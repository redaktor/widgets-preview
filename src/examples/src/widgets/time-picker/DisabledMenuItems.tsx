import { create, tsx } from '@dojo/framework/core/vdom';
import TimePicker from '@dojo/widgets/time-picker';
import Example from '../../Example';

const factory = create();

export default factory(function Basic() {
	return (
		<Example spaced={true}>
			<TimePicker step={3600} timeDisabled={(time) => time.getHours() > 12} />
		</Example>
	);
});
