import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import TextArea from '@redaktor/widgets/textArea';

const factory = create({ icache });

const Overview = factory(function({ middleware: { icache } }) {
	const design = 'flat';
	return (<Example spaced={true}>
		<span>
			<p>Medium sized input designs</p>
			<div class="flexRow">
				<TextArea design='flat'>flat</TextArea>
				<TextArea design='filled'>filled</TextArea>
				<TextArea design='outlined'>outlined</TextArea>
				<TextArea design='raised'>raised</TextArea>
				<TextArea design='shaped'>shaped</TextArea>
			</div>
			<br />
			<div class="flexRow">
				<TextArea design='flat' color='secondary'>flat</TextArea>
				<TextArea design='filled' color='secondary'>filled</TextArea>
				<TextArea design='outlined' color='secondary'>outlined</TextArea>
				<TextArea design='raised' color='secondary'>raised</TextArea>
				<TextArea design='shaped' color='secondary'>shaped</TextArea>
			</div>
			<p>All the sizes</p>
			<div class="flexRow">
				<TextArea
					size='xs'
					design={design}
					initialValue="Hello World!"
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size xs</TextArea>
				<TextArea
					size='s'
					design={design}
					initialValue="Hello World!"
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size s</TextArea>
				<TextArea
					size='m'
					design={design}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size m</TextArea>
				<TextArea
					size='l'
					design={design}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size l</TextArea>
				<TextArea
					size='xl'
					design={design}
					onValue={(value) => {
						icache.set('value', value);
					}}
				>size xl</TextArea>
				<TextArea
					size='xxl'
					design={design}
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
