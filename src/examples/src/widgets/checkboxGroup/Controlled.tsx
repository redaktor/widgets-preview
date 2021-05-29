import { create, tsx } from '@dojo/framework/core/vdom';
import { icache } from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import CheckboxGroup from '@redaktor/widgets/checkboxGroup';

const factory = create({ icache });

const App = factory(function({ properties, middleware: { icache } }) {
	const { get, set } = icache;

	return (<Example>
		<span>
			<CheckboxGroup
				value={get('controlled')}
				name="initial-value"
				options={[{ value: 'tom' }, { value: 'dick' }, { value: 'harry' }]}
				onValue={(value) => {
					set('controlled', value);
				}}
			>
				{{
					label: 'favourite names'
				}}
			</CheckboxGroup>
			<pre>{`${get('controlled')}`}</pre>
		</span>
	</Example>);
});

export default App;
