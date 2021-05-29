import { create, tsx } from '@dojo/framework/core/vdom';
import ConstrainedInput from '@redaktor/widgets/inputConstrained';

const factory = create();

export default factory(function Basic() {
	return (
		<ConstrainedInput
			rules={{
				length: {
					min: 1,
					max: 10
				}
			}}
		>
			{{ label: 'Minimum and Maximum Length Constraints' }}
		</ConstrainedInput>
	);
});
