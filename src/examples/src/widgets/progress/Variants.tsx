import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Progress from '@dojo/widgets/progress';

const factory = create();

export default factory(function Basic() {
	return <Example spaced={true}><span>
		<Progress variant="flat" value={50} />
		<Progress variant="filled" value={50} />
		<Progress variant="raised" value={50} />
		<Progress variant="outlined" value={50} />
		<Progress variant="shaped" value={50} />

		<Progress color="secondary" variant="flat" value={50} />
		<Progress color="secondary" variant="filled" value={50} />
		<Progress color="secondary" variant="raised" value={50} />
		<Progress color="secondary" variant="outlined" value={50} />
		<Progress color="secondary" variant="shaped" value={50} />
	</span></Example>;
});
