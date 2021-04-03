import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Progress from '@dojo/widgets/progress';

const factory = create();

export default factory(function Basic() {
	return <Example spaced={true}><span>
		<Progress circular size="xs" value={50} />
		<Progress circular size="s" value={50} />
		<Progress circular size="m" value={50} />
		<Progress circular size="l" value={50} />
		<Progress circular size="xl" value={50} />

		<Progress circular color="secondary" variant="flat" value={50} />
		<Progress circular color="secondary" variant="filled" value={50} />
		<Progress circular color="secondary" variant="raised" value={50} />
		<Progress circular color="secondary" variant="outlined" value={50} />
		<Progress circular color="secondary" variant="shaped" value={50} />

		<p>Circles</p>
	</span></Example>;
});
