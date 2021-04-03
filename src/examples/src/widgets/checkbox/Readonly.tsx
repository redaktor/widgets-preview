import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Checkbox from '@dojo/widgets/checkbox';

const factory = create();

export default factory(function Readonly() {
	return (<Example spaced={true}>
		<span>
			<Checkbox readOnly>Readonly Checkbox</Checkbox>
			<Checkbox checked readOnly>
				Readonly Checkbox (Checked)
			</Checkbox>
		</span>
	</Example>);
});
