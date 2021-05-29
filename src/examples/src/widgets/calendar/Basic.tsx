import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import icache from '@dojo/framework/core/middleware/icache';
import Calendar from '@redaktor/widgets/calendar';
import CalendarInput from '@redaktor/widgets/calendarInput';

const factory = create({ icache });

export default factory(function Basic({ middleware: { icache } }) {
	const start = icache.getOrSet('start', new Date(2021, 2, 2));
	const end = icache.getOrSet('end', new Date(2021, 2, 2));

	return (
		<Example spaced={true}>
			<virtual>
				<CalendarInput
					weekendDivider={true}
					start={start}
					end={end}
					onValue={(start, end) => {
						console.log(start, end);
						icache.set('start', start);
						icache.set('end', end);
					}}
				/>
				<p>Selected is {start.toLocaleDateString()} - {end.toLocaleDateString()}</p>
			</virtual>
		</Example>
	);
});
