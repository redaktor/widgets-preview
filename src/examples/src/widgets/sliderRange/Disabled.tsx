import RangeSlider from '@redaktor/widgets/sliderRange';
import { create, tsx } from '@dojo/framework/core/vdom';

const factory = create();

export default factory(function DisabledRangeSlider() {
	return <RangeSlider initialValue={{ min: 20, max: 80 }} disabled />;
});
