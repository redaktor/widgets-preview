import { create, tsx } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import Checkbox, { CheckboxBaseProperties } from '../checkbox';
import * as css from '../theme/material/radio.m.css';

export interface RadioProperties extends CheckboxBaseProperties {
	/** The icon for the button: 'checkmark', 'dot' TODO
	 * 'checkmark' by default for plain checkbox
	 */
	icon?: 'checkmark' | 'dot';
}
const factory = create().properties<RadioProperties>()
	.children<RenderResult | undefined>();

const myClasses = {
	'@redaktor/widgets/checkbox': { box: [css.box] }
};

export const Radio = factory(function Radio({ properties, children }) {
	const { icon = 'dot', ...baseProperties } = properties();
	return <Checkbox {...baseProperties} icon={icon} classes={myClasses} _inputType='radio'>
		{([...children()] as any)}
	</Checkbox>;
});

export default Radio;
