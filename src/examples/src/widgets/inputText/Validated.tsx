import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import TextInput from '@redaktor/widgets/inputText';

const factory = create({ icache });

export default factory(function Basic({ middleware: { icache } }) {
	const valid = icache.get<{ valid?: boolean; message?: string }>('valid');
	return (<Example spaced={true}>
		<TextInput
			valid={valid}
			required
			onValidate={(valid, message) => {
				icache.set('valid', { valid, message });
			}}
			pattern="foo|bar"
		>
			{{ label: "Type 'foo' or 'bar'" }}
		</TextInput>
	</Example>);
});
