import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import Button from '@dojo/widgets/button';

const factory = create({ icache });

export default factory(function ToggleButton({ middleware: { icache } }) {
	const pressed = icache.getOrSet('pressed', false);

	return (<Example spaced={true}>
		<Button pressed={pressed} onClick={() => icache.set('pressed', !pressed)}>
			Toggle Button
		</Button>
	</Example>);
});
