import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Slider from '@redaktor/widgets/slider';

const factory = create({});

export default factory(function Basic({}) {
	return <Example spaced={true}>
		<span>
			<Slider variant="flat" value={50} min={0} max={100} step={10} vertical />
			<Slider variant="filled" value={50} min={0} max={100}  vertical />
			<Slider variant="raised" value={50} min={0} max={100}  vertical />
			<Slider variant="outlined" value={50} min={0} max={100}  vertical />
			<Slider variant="shaped" value={50} min={0} max={100}  vertical />

			<Slider color="secondary" variant="flat" value={50} min={0} max={100}  />
			<Slider color="secondary" variant="filled" value={50} min={0} max={100}  />
			<Slider color="secondary" variant="raised" value={50} min={0} max={100}  />
			<Slider color="secondary" variant="outlined" value={50} min={0} max={100}  />
			<Slider color="secondary" variant="shaped" value={50} min={0} max={100}  />

			<p>Slider</p>
		</span>
</Example>;
});
