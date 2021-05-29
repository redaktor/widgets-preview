import { create, tsx } from '@dojo/framework/core/vdom';
import ConstrainedInput from '@redaktor/widgets/inputConstrained';

const factory = create();

export default factory(function Basic() {
	return (
		<ConstrainedInput
			rules={{
				length: {
					min: 4,
					max: 16
				},
				contains: {
					numbers: 1,
					uppercase: 1,
					specialCharacters: 1
				}
			}}
		>
			{{ label: 'Enter Username' }}
		</ConstrainedInput>
	);
});
