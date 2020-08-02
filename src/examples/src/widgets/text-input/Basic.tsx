import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import TextInput from '@dojo/widgets/text-input';
import { ExampleProperties } from '@dojo/widgets/common/util';

const factory = create({ icache }).properties<ExampleProperties>();

const Example = factory(function Basic({ properties, middleware: { icache } }) {
	const { variant = 'flat' } = properties();
	return (
		<virtual>
			<TextInput
				responsive={true}
				size='xs'
				variant={variant}
				initialValue="Hello World!"
				onValue={(value) => {
					icache.set('value', value);
				}}
			>Label</TextInput><br /><br />
			<TextInput
				responsive={true}
				size='s'
				variant={variant}
				initialValue="Hello World!"
				onValue={(value) => {
					icache.set('value', value);
				}}
			>Label</TextInput><br />
			<TextInput
				responsive={true}
				size='m'
				variant={variant}
				onValue={(value) => {
					icache.set('value', value);
				}}
			>Label</TextInput><br />
			<TextInput
				responsive={true}
				size='l'
				variant={variant}
				onValue={(value) => {
					icache.set('value', value);
				}}
			>Label</TextInput><br />
			<TextInput
				responsive={true}
				size='xl'
				variant={variant}
				onValue={(value) => {
					icache.set('value', value);
				}}
			>Label</TextInput><br />
			<TextInput
				responsive={true}
				size='xxl'
				variant={variant}
				onValue={(value) => {
					icache.set('value', value);
				}}
			>Label</TextInput><br />
			<p>The latest text input is: "{icache.getOrSet('value', '')}"</p>
		</virtual>
	);
});

export default Example;
