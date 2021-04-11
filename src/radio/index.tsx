import { create, w } from '@dojo/framework/core/vdom';
import * as css from '../theme/material/radio.m.css';
import { RenderResult } from '@dojo/framework/core/interfaces';
import Checkbox, { CheckboxBaseProperties } from '../checkbox';

export interface RadioProperties extends CheckboxBaseProperties {
	/** The icon for the button: 'checkmark', 'dot' TODO
	 * 'checkmark' by default for plain checkbox
	 */
	icon?: 'checkmark' | 'dot';
}
const factory = create().properties<RadioProperties>()
	.children<RenderResult | undefined>();

const myClasses = {
	'@dojo/widgets/checkbox': { box: [css.box] }
};

export const Radio = factory(function Radio({ properties, children }) {
	const { icon = 'dot', ...baseProperties } = properties();
	return (w(Checkbox, {
		...baseProperties,
		icon,
		classes: myClasses,
		_inputType: 'radio'
	}, [...children()] as any));
});

export default Radio;
