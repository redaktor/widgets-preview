import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Checkbox from '@dojo/widgets/checkbox';

const factory = create();

export default factory(function Disabled() {
	return (<Example spaced={true}>
		<span>
			<Checkbox disabled>Disabled Checkbox</Checkbox>
			<Checkbox checked disabled>
				Disabled Checkbox (Checked)
			</Checkbox>
		</span>
	</Example>);
});
