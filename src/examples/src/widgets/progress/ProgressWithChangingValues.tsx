import { create, tsx } from '@dojo/framework/core/vdom';
import { icache } from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import Progress from '@redaktor/widgets/progress';
import Button from '@redaktor/widgets/button';

const factory = create({ icache });

export default factory(function ProgressWithChangingvalues({ middleware: { icache } }) {
	const max = 100;
	const step = 10;
	const value = icache.getOrSet<number>('value', 0);
	return (<Example spaced={true}>
		<div>
			<Progress value={value} max={max} />
			<div>
				<Button onClick={() => icache.set('value', Math.max(0, value - step))}>
					Decrease
				</Button>
				<Button onClick={() => icache.set('value', Math.min(value + step, max))}>
					Increase
				</Button>
			</div>
		</div>
	</Example>);
});
