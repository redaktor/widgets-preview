import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import TextArea from '@dojo/widgets/text-area';

const factory = create({ icache });

const Overview = factory(function({ middleware: { icache } }) {
	const variant = 'flat';
	return (<Example spaced={true}>
		<span>
			<p>Medium sized input variants</p>
			<div class="flexRow">
				<TextArea variant='flat'>flat</TextArea>
				<TextArea variant='filled'>filled</TextArea>
				<TextArea variant='outlined'>outlined</TextArea>
				<TextArea variant='raised'>raised</TextArea>
				<TextArea variant='shaped'>shaped</TextArea>
			</div>
			<br />
			<div class="flexRow">
				<TextArea variant='flat' color='secondary'>flat</TextArea>
				<TextArea variant='filled' color='secondary'>filled</TextArea>
				<TextArea variant='outlined' color='secondary'>outlined</TextArea>
				<TextArea variant='raised' color='secondary'>raised</TextArea>
				<TextArea variant='shaped' color='secondary'>shaped</TextArea>
			</div>
			<p>All the sizes</p>
			<div class="flexRow">
				<TextArea
					size='xs'
					variant={variant}
					initialValue="Hello World!"
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size xs</TextArea>
				<TextArea
					size='s'
					variant={variant}
					initialValue="Hello World!"
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size s</TextArea>
				<TextArea
					size='m'
					variant={variant}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size m</TextArea>
				<TextArea
					size='l'
					variant={variant}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size l</TextArea>
				<TextArea
					size='xl'
					variant={variant}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size xl</TextArea>
				<TextArea
					size='xxl'
					variant={variant}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>xxl</TextArea>
			</div>
			<p>The latest text input is: "{icache.getOrSet('value', '')}"</p>
		</span>
	</Example>);
});

export default Overview;
