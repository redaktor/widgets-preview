import { create, tsx } from '@dojo/framework/core/vdom';
import Dialog from '@redaktor/widgets/dialog';
import Button from '@redaktor/widgets/button';
import icache from '@dojo/framework/core/middleware/icache';

const factory = create({ icache });

export default factory(function UnderlayDialog({ middleware: { icache } }) {
	const isOpen = icache.getOrSet<boolean>('isOpen', false);
	return (
		<div>
			<Button onClick={() => icache.set('isOpen', !isOpen)}>
				{`${isOpen ? 'Close' : 'Open'} Dialog`}
			</Button>
			<Dialog
				open={isOpen}
				underlay={true}
				onRequestClose={() => icache.set('isOpen', false)}
			>
				{{
					title: 'Underlay Dialog',
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
