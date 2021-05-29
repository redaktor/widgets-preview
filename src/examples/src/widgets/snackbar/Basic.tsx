import { create, tsx } from '@dojo/framework/core/vdom';
import Snackbar from '@redaktor/widgets/snackbar';

const factory = create();

export default factory(function Basic() {
	return (
		<Snackbar open={true}>
			{{
				message: 'Basic Snackbar'
			}}
		</Snackbar>
	);
});
