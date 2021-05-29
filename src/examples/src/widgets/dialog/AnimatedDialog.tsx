import { create, tsx } from '@dojo/framework/core/vdom';
import Dialog from '@redaktor/widgets/dialog';
import Button from '@redaktor/widgets/button';
import icache from '@dojo/framework/core/middleware/icache';
import theme from '@redaktor/widgets/middleware/theme';
import * as css from './styles/AnimatedDialog.m.css';

const factory = create({ icache, theme });

export default factory(function AnimatedDialog({ middleware: { icache, theme } }) {
	const isOpen = icache.getOrSet<boolean>('isOpen', false);
	const { enter, exit } = theme.classes(css);

	return (
		<div>
			<Button onClick={() => icache.set('isOpen', !isOpen)}>
				{`${isOpen ? 'Close' : 'Open'} Dialog`}
			</Button>
			<Dialog
				open={isOpen}
				onRequestClose={() => icache.set('isOpen', false)}
				classes={{
					'@redaktor/widgets/dialog': {
						enter: [enter],
						exit: [exit]
					}
				}}
			>
				{{
					title: 'Basic Dialog',
					content: (
						<virtual>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id
							purus ipsum. Aenean ac purus purus. Nam sollicitudin varius augue, sed
							lacinia felis tempor in.
						</virtual>
					)
				}}
			</Dialog>
		</div>
	);
});
