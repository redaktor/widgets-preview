import { create, tsx } from '@dojo/framework/core/vdom';
import { icache } from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import RadioGroup from '@redaktor/widgets/radioGroup';

const factory = create({ icache });

const App = factory(function({ properties, middleware: { icache } }) {
	const initialValue = 'tom';

	return (<Example>
		<span>
			<RadioGroup
				initialValue={initialValue}
				name="initial-value"
				options={[{ value: 'tom' }, { value: 'dick' }, { value: 'harry' }]}
				onValue={(value) => {
					icache.set('value', value);
				}}
			>
				{{
					label: 'favourite names'
				}}
			</RadioGroup>
			<pre>{`${icache.getOrSet('value', initialValue)}`}</pre>
		</span>
	</Example>);
});

export default App;
