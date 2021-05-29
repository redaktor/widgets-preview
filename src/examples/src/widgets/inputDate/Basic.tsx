import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import DateInput from '@redaktor/widgets/inputDate';
import Example from '../../Example';

const factory = create({ icache });

export default factory(function Basic({ middleware: { icache } }) {
	return (
		<Example spaced={true}>
			<div>
				<div>{icache.get('date')}</div>
				<DateInput
					key="test"
					name="dateInput"
					onValue={(value) => {
						icache.set('date', value);
					}}
				/>
			</div>
		</Example>
	);
});
