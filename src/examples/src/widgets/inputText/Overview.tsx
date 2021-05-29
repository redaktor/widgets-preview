import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import TextInput from '@redaktor/widgets/inputText';

const factory = create({ icache });
const greet = "Hello World!";

const Overview = factory(function({ middleware: { icache } }) {
	icache.getOrSet('value', greet);
	const variant = 'filled';
	return (<Example spaced={true}>
		<span>
			<p>Medium sized input variants</p>
			<div class="flexRow">
				<TextInput>Input label</TextInput>
			</div>
			<div class="flexRow">
				<TextInput variant='flat'>flat</TextInput>
				<TextInput variant='filled'>filled</TextInput>
				<TextInput variant='outlined'>outlined</TextInput>
				<TextInput variant='raised'>raised</TextInput>
				<TextInput variant='shaped'>shaped</TextInput>
			</div>
			<div class="flexRow">
				<TextInput variant='flat' color='secondary'>flat</TextInput>
				<TextInput variant='filled' color='secondary'>filled</TextInput>
				<TextInput variant='outlined' color='secondary'>outlined</TextInput>
				<TextInput variant='raised' color='secondary'>raised</TextInput>
				<TextInput variant='shaped' color='secondary'>shaped</TextInput>
			</div>
			<br />
			<p>All the sizes</p>
			<div class="flexRow">
				<TextInput
					size='xs'
					variant={variant}
					initialValue={greet}
					value={icache.get('value')}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size xs</TextInput>
				<TextInput
					size='s'
					variant={variant}
					initialValue={greet}
					value={icache.get('value')}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size s</TextInput>
				<TextInput
					size='m'
					variant={variant}
					initialValue={greet}
					value={icache.get('value')}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size m</TextInput>
				<TextInput
					size='l'
					variant={variant}
					initialValue={greet}
					value={icache.get('value')}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size l</TextInput>
				<TextInput
					size='xl'
					variant={variant}
					initialValue={greet}
					value={icache.get('value')}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size xl</TextInput>
				<TextInput
					size='xxl'
					variant={variant}
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
