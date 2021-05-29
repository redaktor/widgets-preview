import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import TextInput from '@redaktor/widgets/inputText';
import Button from '@redaktor/widgets/button';

const factory = create({ icache });

const Controlled = factory(function Controlled({ middleware: { icache } }) {
	return (<Example spaced={true}>
		<span>
			<TextInput
				value={icache.getOrSet('value', '')}
				onValue={(value) => {
					icache.set('value', value);
				}}
			>
				{{ label: 'Controlled input with reset' }}
			</TextInput>
			<Button
				onClick={() => {
					icache.set('value', '');
				}}
			>
				Reset input
			</Button>
			<div>The value text input is: "{icache.getOrSet('value', '')}"</div>
		</span>
	</Example>);
});

export default Controlled;
