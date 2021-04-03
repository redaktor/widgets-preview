import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Chip from '@dojo/widgets/chip';

const factory = create();

const App = factory(function Basic() {
	return <Example spaced={true}><Chip>{{ label: 'Chip Example' }}</Chip></Example>;
});

export default App;
