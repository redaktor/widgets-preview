import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Progress from '@redaktor/widgets/progress';

const factory = create();

export default factory(function ProgressWithCustomOutput() {
	const value = 250;
	const max = 750;

	return (<Example spaced={true}>
		<Progress value={value} max={max}>
			{{
				output: (value, percent) => `${value} of ${max} is ${percent}%`
			}}
		</Progress>
	</Example>);
});
