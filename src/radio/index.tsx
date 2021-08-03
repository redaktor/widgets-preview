import { create, tsx } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { theme } from '@redaktor/widgets/middleware/theme';
import Checkbox, { CheckboxBaseProperties } from '@redaktor/widgets/checkbox';
import * as css from '@redaktor/widgets/theme/material/radio.m.css';

export interface RadioProperties extends CheckboxBaseProperties {
	/** The icon for the button: 'checkmark', 'dot' TODO
	 * 'checkmark' by default for plain checkbox
	 */
	icon?: 'checkmark' | 'dot';
}
const factory = create({ theme }).properties<RadioProperties>()
	.children<RenderResult | undefined>();

export const Radio = factory(function Radio({ properties, middleware: { theme }, children }) {
	const { icon = 'dot', ...baseProperties } = properties();
	const themedCss = theme.classes(css);
	const extraClasses = { '@redaktor/widgets/checkbox': { box: [themedCss.box] } };

	return <Checkbox {...baseProperties} icon={icon} classes={extraClasses} _inputType='radio'>
		{([...children()] as any)}
	</Checkbox>;
});

export default Radio;
