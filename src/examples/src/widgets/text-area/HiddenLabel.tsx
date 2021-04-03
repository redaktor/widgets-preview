import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import TextArea from '@dojo/widgets/text-area';

const factory = create();

export default factory(function HiddenLabel() {
	return <Example spaced={true}><TextArea labelHidden={true}>Hidden label</TextArea></Example>;
});
