import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import TextInput from '@redaktor/widgets/inputText';

const factory = create({ icache });
const greet = "Hello World!";

const Overview = factory(function({ middleware: { icache } }) {
	icache.getOrSet('value', greet);
	const design = 'filled';
	return (<Example spaced={true}>
		<span>
			<p>Medium sized input designs</p>
			<div class="flexRow">
				<TextInput>Input label</TextInput>
			</div>
			<div class="flexRow">
				<TextInput design='flat'>flat</TextInput>
				<TextInput design='filled'>filled</TextInput>
				<TextInput design='outlined'>outlined</TextInput>
				<TextInput design='raised'>raised</TextInput>
				<TextInput design='shaped'>shaped</TextInput>
			</div>
			<div class="flexRow">
				<TextInput design='flat' color='secondary'>flat</TextInput>
				<TextInput design='filled' color='secondary'>filled</TextInput>
				<TextInput design='outlined' color='secondary'>outlined</TextInput>
				<TextInput design='raised' color='secondary'>raised</TextInput>
				<TextInput design='shaped' color='secondary'>shaped</TextInput>
			</div>
			<br />
			<p>All the sizes</p>
			<div class="flexRow">
				<TextInput
					size='xs'
					design={design}
					initialValue={greet}
					value={icache.get('value')}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size xs</TextInput>
				<TextInput
					size='s'
					design={design}
					initialValue={greet}
					value={icache.get('value')}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size s</TextInput>
				<TextInput
					size='m'
					design={design}
					initialValue={greet}
					value={icache.get('value')}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size m</TextInput>
				<TextInput
					size='l'
					design={design}
					initialValue={greet}
					value={icache.get('value')}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size l</TextInput>
				<TextInput
					size='xl'
					design={design}
					initialValue={greet}
					value={icache.get('value')}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size xl</TextInput>
				<TextInput
					size='xxl'
					design={design}
					initialValue={greet}
					value={icache.get('value')}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>xxl</TextInput>
			</div>
			<p>The latest text input is: "{icache.getOrSet('value', '')}"</p>
		</span>
	</Example>);
});

export default Overview;
