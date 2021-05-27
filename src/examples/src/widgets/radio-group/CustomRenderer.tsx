import { Radio } from '@dojo/widgets/radio';
import { create, tsx } from '@dojo/framework/core/vdom';
import { icache } from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import RadioGroup from '@dojo/widgets/radio-group';

const factory = create({ icache });

const App = factory(function({ middleware: { icache } }) {
	const { get, set } = icache;

	return (<Example>
		<span>
			<RadioGroup
				name="custom"
				options={[{ value: 'yes' }, { value: 'no' }, { value: 'maybe' }]}
				onValue={(value) => {
					set('custom', value);
				}}
			>
				{{
					label: 'going?',
					inputs: (name, radioGroup, options) => {
						return options.map(({ value, label }) => {
							const { checked } = radioGroup(value);
							return (
								<virtual>
									<span>I'm custom!</span>
									<Radio
										checked={checked()}
										name={name}
										onValue={checked}
										value={value}
									>
										{label || value}
									</Radio>
									<hr
										styles={{
											borderColor: '#d6dde2',
											borderStyle: 'solid',
											borderWidth: '1px 0 0',
											height: '0',
											margin: '0',
											overflow: 'hidden'
										}}
									/>
								</virtual>
							);
						});
					}

				}}
			</RadioGroup>
			<pre>{`${get('custom')}`}</pre>
		</span>
	</Example>);
});

export default App;
