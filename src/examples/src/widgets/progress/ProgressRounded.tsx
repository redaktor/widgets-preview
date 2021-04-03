import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Progress from '@dojo/widgets/progress';

const factory = create();

export default factory(function Basic() {
	return <Example spaced={true}><span>
		<Progress rounded variant="flat" value={50} />
		<Progress rounded variant="filled" value={50} />
		<Progress rounded variant="raised" value={50} />
		<Progress rounded variant="outlined" value={50} />
		<Progress rounded variant="shaped" value={50} />

		<Progress rounded color="secondary" variant="flat" value={50} />
		<Progress rounded color="secondary" variant="filled" value={50} />
		<Progress rounded color="secondary" variant="raised" value={50} />
		<Progress rounded color="secondary" variant="outlined" value={50} />
		<Progress rounded color="secondary" variant="shaped" value={50} />
	</span></Example>;
});
