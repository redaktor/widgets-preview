import LoadingIndicator from '@redaktor/widgets/loadingIndicator';
import { create, tsx } from '@dojo/framework/core/vdom';

const factory = create();

export default factory(function Basic() {
	return <LoadingIndicator />;
});
