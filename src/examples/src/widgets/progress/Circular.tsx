import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Progress from '@redaktor/widgets/progress';

const factory = create();

export default factory(function Basic() {
	return <Example spaced={true}><span>
		<Progress circular size="xs" value={50} />
		<Progress circular size="s" value={50} />
		<Progress circular size="m" value={50} />
		<Progress circular size="l" value={50} />
		<Progress circular size="xl" value={50} />

		<Progress circular color="secondary" design="flat" value={50} />
		<Progress circular color="secondary" design="filled" value={50} />
		<Progress circular color="secondary" design="raised" value={50} />
		<Progress circular color="secondary" design="outlined" value={50} />
		<Progress circular color="secondary" design="shaped" value={50} />

		<p>Circles</p>
	</span></Example>;
});
