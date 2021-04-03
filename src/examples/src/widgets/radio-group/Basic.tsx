import { create, tsx } from '@dojo/framework/core/vdom';
import { icache } from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import RadioGroup from '@dojo/widgets/radio-group';

const factory = create({ icache });

const App = factory(function({ properties, middleware: { icache } }) {
	const { get, set } = icache;

	return (<Example spaced={true}>
		<span>
			<RadioGroup
				name="standard"
				options={[{ value: 'cat' }, { value: 'dog' }, { value: 'fish' }]}
				onValue={(value) => {
					set('standard', value);
				}}
			>
				{{
					label: 'pets'
				}}
			</RadioGroup>
			<pre>{`${get('standard')}`}</pre>
		</span>
	</Example>);
});

export default App;
