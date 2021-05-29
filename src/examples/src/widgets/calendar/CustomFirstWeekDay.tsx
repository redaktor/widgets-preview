import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import Calendar, { FirstDayOfWeek } from '@redaktor/widgets/calendar';

const factory = create({ icache });

export default factory(function Basic({ middleware: { icache } }) {
	const date = icache.getOrSet('date', new Date());

	return (
		<Example spaced={true}>
			<Calendar firstDayOfWeek={FirstDayOfWeek.monday} start={date} />
			<Calendar firstDayOfWeek={4} start={date} />
		</Example>
	);
});
