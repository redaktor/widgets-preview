import { create, tsx } from '@dojo/framework/core/vdom';
import TwoColumnLayout from '@redaktor/widgets/two-column-layout';
import { icache } from '@dojo/framework/core/middleware/icache';
import Button from '@redaktor/widgets/button';

const factory = create({ icache });

export default factory(function Collapsing({ middleware: { icache } }) {
	const width = icache.getOrSet('width', 401);
	return (
		<virtual>
			<div styles={{ width: `${width}px` }}>
				<TwoColumnLayout breakpoint={400}>
					{{
						leading: (
							<div styles={{ textAlign: 'center' }}>This is the leading content</div>
						),
						trailing: (
							<div styles={{ borderLeft: '1px solid black', textAlign: 'center' }}>
								This is the trailing content
							</div>
						)
					}}
				</TwoColumnLayout>
			</div>
			<div>
				<Button
					onClick={() => {
						icache.set('width', 300);
					}}
				>
					Collapse
				</Button>
				<Button
					onClick={() => {
						icache.set('width', 401);
					}}
				>
					Expand
				</Button>
			</div>
		</virtual>
	);
});
