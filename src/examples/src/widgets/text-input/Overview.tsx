import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import TextInput from '@dojo/widgets/text-input';

const factory = create({ icache });

const Example = factory(function({ middleware: { icache } }) {
	const variant = 'flat';
	return (
		<virtual>
			<p>Medium sized input variants</p>
			<div class="flexRow">
				<TextInput variant='flat'>flat</TextInput>
				<TextInput variant='filled'>filled</TextInput>
				<TextInput variant='outlined'>outlined</TextInput>
				<TextInput variant='raised'>raised</TextInput>
				<TextInput variant='shaped'>shaped</TextInput>
			</div>
			<br />
			<div class="flexRow">
				<TextInput variant='flat' color='secondary'>flat</TextInput>
				<TextInput variant='filled' color='secondary'>filled</TextInput>
				<TextInput variant='outlined' color='secondary'>outlined</TextInput>
				<TextInput variant='raised' color='secondary'>raised</TextInput>
				<TextInput variant='shaped' color='secondary'>shaped</TextInput>
			</div>
			<p>All the sizes</p>
			<div class="flexRow">
				<TextInput
					size='xs'
					variant={variant}
					initialValue="Hello World!"
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size xs</TextInput>
				<TextInput
					size='s'
					variant={variant}
					initialValue="Hello World!"
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size s</TextInput>
				<TextInput
					size='m'
					variant={variant}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size m</TextInput>
				<TextInput
					size='l'
					variant={variant}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size l</TextInput>
				<TextInput
					size='xl'
					variant={variant}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size xl</TextInput>
				<TextInput
					size='xxl'
					variant={variant}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>xxl</TextInput>
			</div>
			<p>The latest text input is: "{icache.getOrSet('value', '')}"</p>
		</virtual>
	);
});

export default Example;
