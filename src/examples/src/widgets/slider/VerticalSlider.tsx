import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Slider from '@dojo/widgets/slider';

const factory = create({});

export default factory(function VerticalSlider({}) {
	return (<Example spaced={true}>
		<Slider min={0} max={100} vertical />
	</Example>);
});
