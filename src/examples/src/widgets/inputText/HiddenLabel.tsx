import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import TextInput from '@redaktor/widgets/inputText';

const factory = create();

export default factory(function Basic() {
	return <Example spaced={true}><TextInput labelHidden>{{ label: 'Hidden label' }}</TextInput></Example>;
});
