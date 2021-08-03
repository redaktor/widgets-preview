import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Progress from '@redaktor/widgets/progress';

const factory = create();

export default factory(function Basic() {
	return <Example spaced={true}><span>
		<Progress rounded design="flat" value={50} />
		<Progress rounded design="filled" value={50} />
		<Progress rounded design="raised" value={50} />
		<Progress rounded design="outlined" value={50} />
		<Progress rounded design="shaped" value={50} />

		<Progress rounded color="secondary" design="flat" value={50} />
		<Progress rounded color="secondary" design="filled" value={50} />
		<Progress rounded color="secondary" design="raised" value={50} />
		<Progress rounded color="secondary" design="outlined" value={50} />
		<Progress rounded color="secondary" design="shaped" value={50} />
	</span></Example>;
});
