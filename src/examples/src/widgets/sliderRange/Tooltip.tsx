import RangeSlider from '@redaktor/widgets/sliderRange';
import { create, tsx } from '@dojo/framework/core/vdom';

const factory = create();

export default factory(function TooltipRangeSlider() {
	return (
		<RangeSlider
			initialValue={{
				min: 0,
				max: 100
			}}
			showOutput={true}
			outputIsTooltip={true}
		/>
	);
});
