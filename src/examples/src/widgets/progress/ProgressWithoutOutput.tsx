import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Progress from '@redaktor/widgets/progress';

const factory = create();

export default factory(function ProgressWithoutOutput() {
	return <Example spaced={false}><Progress value={50} outputDisplay={false} /></Example>;
});
