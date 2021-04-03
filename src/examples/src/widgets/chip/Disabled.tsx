import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Chip from '@dojo/widgets/chip';

const factory = create();

const App = factory(function Disabled() {
	return (<Example spaced={true}>
		<Chip
			disabled
			onClick={() => {
				window.alert('clicked');
			}}
		>
			{{ label: 'Disabled' }}
		</Chip>
	</Example>);
});

export default App;
