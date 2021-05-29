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
				name="colours"
				options={[
					{ value: 'red', label: 'Rouge' },
					{ value: 'green', label: 'Vert' },
					{ value: 'blue', label: 'Bleu' }
				]}
				onValue={(value) => {
					set('colours', value);
				}}
			>
				{{
					label: 'colours'
				}}
			</CheckboxGroup>
			<pre>{`${get('colours')}`}</pre>
		</span>
	</Example>);
});

export default App;
