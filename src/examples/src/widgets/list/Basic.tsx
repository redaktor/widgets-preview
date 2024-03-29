import { create, tsx } from '@dojo/framework/core/vdom';
import List from '@redaktor/widgets/list';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import { listOptionTemplate } from '../../template';

const factory = create({ icache });

export default factory(function Basic({ middleware: { icache } }) {
	return (
		<Example>
			<List
				design='flat'
				color='primary'
				resource={{ template: listOptionTemplate }}
				onValue={(value) => {
					icache.set('value', value);
				}}
			/>
			<p>{`Clicked on: ${JSON.stringify(icache.getOrSet('value', ''))}`}</p>
		</Example>
	);
});
