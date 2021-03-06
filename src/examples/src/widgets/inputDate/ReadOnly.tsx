import { create, tsx } from '@dojo/framework/core/vdom';
import DateInput from '@redaktor/widgets/inputDate';
import Example from '../../Example';

const factory = create();

export default factory(function ReadOnly() {
	return (
		<Example>
			<DateInput name="dateInput" readOnly={true} />
		</Example>
	);
});
