import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import TextArea from '@dojo/widgets/text-area';

const factory = create();

export default factory(function HelperText() {
	return <Example spaced={true}>
		<TextArea helperText="Hi there, enter some text">Has helper text</TextArea>
	</Example>;
});
