import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Progress from '@redaktor/widgets/progress';

const factory = create();

export default factory(function Basic() {
	return <Example spaced={true}><span>
		<Progress size="xs" value={50} />
		<Progress size="s" value={50} />
		<Progress size="m" value={50} />
		<Progress size="l" value={50} />
		<Progress size="xl" value={50} />
		<Progress size="xxl" value={50} />
	</span></Example>;
});
