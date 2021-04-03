import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import EmailInput from '@dojo/widgets/email-input';

const factory = create();

const EmailInputExample = factory(function() {
	return <Example spaced={true}><EmailInput /></Example>;
});

export default EmailInputExample;
