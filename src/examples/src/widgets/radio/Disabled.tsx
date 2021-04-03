import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Radio from '@dojo/widgets/radio';

const factory = create();

export default factory(function Basic() {
	return <Example spaced={true}><Radio disabled={true} /></Example>;
});
