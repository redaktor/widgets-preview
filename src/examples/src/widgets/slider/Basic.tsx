import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Slider from '@redaktor/widgets/slider';

const factory = create({});

export default factory(function Basic({}) {
	return <Example spaced={true}>
		<span>
			<Slider onOutput={(v:number,p:number) => <p>label</p>} initialValue={50} size="xs" />
			<Slider initialValue={50} size="s" />
			<Slider initialValue={50} size="m" />
			<Slider initialValue={50} size="l" />
			<Slider initialValue={50} size="xl" />
			<Slider initialValue={50} size="xxl" />
			<p>Slider</p>
		</span>
</Example>;
});
