import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Slider from '@redaktor/widgets/slider';

const factory = create({});

export default factory(function SliderWithNoOutput({}) {
	return <Example spaced={true}>
		<Slider min={0} max={100} showOutput={false} />
	</Example>;
});
