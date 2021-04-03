import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import TextInput from '@dojo/widgets/text-input';

const factory = create();

export default factory(function Basic() {
	return <Example spaced={true}>
		<TextInput helperText="Helper text">{{ label: 'Input with helper text' }}</TextInput>
	</Example>;
});
