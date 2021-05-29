import { create, tsx } from '@dojo/framework/core/vdom';
import Pagination from '@redaktor/widgets/pagination';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import Slider from '@redaktor/widgets/slider';

interface BasicCache {
	currentPage: number;
}

const icache = createICacheMiddleware<BasicCache>();
const factory = create({ icache });

const Example = factory(function Example({ middleware: { icache } }) {
	const currentPage = icache.getOrSet('currentPage', 8);

	return (
		<div>
			<div>
				<label>Current Page:</label>
				<Slider
					initialValue={currentPage}
					min={1}
					max={25}
					onValue={(value) => icache.set('currentPage', value || 1)}
				/>
			</div>

			<Pagination
				page={currentPage}
				pageSize={10}
				total={25}
				onPage={(value) => {
					icache.set('currentPage', value);
				}}
			/>
		</div>
	);
});

export default Example;
