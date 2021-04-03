import { create, tsx } from '@dojo/framework/core/vdom';
import { icache } from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import Chip from '@dojo/widgets/chip';

const factory = create({ icache });

const App = factory(function Clickable({ middleware: { icache } }) {
	const clickable = icache.getOrSet<number>('clickable', 0);
	return (<Example spaced={true}>
		<span>
			<Chip
				onClick={() => {
					icache.set('clickable', icache.getOrSet<number>('clickable', 0) + 1);
				}}
			>
				{{ label: 'Clickable' }}
			</Chip>
			<div>Clicked {String(clickable)} times</div>
		</span>
	</Example>);
});

export default App;
