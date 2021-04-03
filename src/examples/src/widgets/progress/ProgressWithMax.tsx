import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Progress from '@dojo/widgets/progress';

const factory = create();

export default factory(function ProgressWithMax() {
	return <Example spaced={true}><Progress value={0.3} max={1} /></Example>;
});
