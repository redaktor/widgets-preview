import { create, tsx } from '@dojo/framework/core/vdom';
import TextArea from '@redaktor/widgets/textArea';

const factory = create();

export default factory(function Basic() {
	return <TextArea />;
});
