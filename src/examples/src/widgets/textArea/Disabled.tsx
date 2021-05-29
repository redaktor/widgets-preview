import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import TextArea from '@redaktor/widgets/textArea';

const factory = create();

export default factory(function Disabled() {
	return (<Example spaced={true}>
		<TextArea initialValue="Initial Value" disabled={true}>
			Can't type here
		</TextArea>
	</Example>);
});
