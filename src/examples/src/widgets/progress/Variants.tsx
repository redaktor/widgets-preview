import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Progress from '@redaktor/widgets/progress';

const factory = create();

export default factory(function Basic() {
	return <Example spaced={true}><span>
		<Progress design="flat" value={50} />
		<Progress design="filled" value={50} />
		<Progress design="raised" value={50} />
		<Progress design="outlined" value={50} />
		<Progress design="shaped" value={50} />

		<Progress color="secondary" design="flat" value={50} />
		<Progress color="secondary" design="filled" value={50} />
		<Progress color="secondary" design="raised" value={50} />
		<Progress color="secondary" design="outlined" value={50} />
		<Progress color="secondary" design="shaped" value={50} />
	</span></Example>;
});
