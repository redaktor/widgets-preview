import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Slider from '@redaktor/widgets/slider';

const factory = create();

export default factory(function DisabledSlider() {
	return (<Example spaced={true}>
		<Slider min={0} initialValue={50} max={100} disabled>
			{{ label: 'Disabled' }}
		</Slider>
	</Example>);
});
