import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Slider from '@redaktor/widgets/slider';

const factory = create({});

export default factory(function Basic({}) {
	return <Example spaced={true}>
		<span>
			<Slider design="flat" value={50} min={0} max={100} step={10} vertical />
			<Slider design="filled" value={50} min={0} max={100}  vertical />
			<Slider design="raised" value={50} min={0} max={100}  vertical />
			<Slider design="outlined" value={50} min={0} max={100}  vertical />
			<Slider design="shaped" value={50} min={0} max={100}  vertical />

			<Slider color="secondary" design="flat" value={50} min={0} max={100}  />
			<Slider color="secondary" design="filled" value={50} min={0} max={100}  />
			<Slider color="secondary" design="raised" value={50} min={0} max={100}  />
			<Slider color="secondary" design="outlined" value={50} min={0} max={100}  />
			<Slider color="secondary" design="shaped" value={50} min={0} max={100}  />

			<p>Slider</p>
		</span>
</Example>;
});
