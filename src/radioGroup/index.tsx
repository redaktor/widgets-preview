import { RenderResult } from '@dojo/framework/core/interfaces';
import { create, tsx } from '@dojo/framework/core/vdom';
import { MenuOption } from '@redaktor/widgets/common/interfaces';
import theme from '@dojo/framework/core/middleware/theme';
import id from '@redaktor/widgets/middleware/id';
import { Radio, RadioProperties } from '@redaktor/widgets/radio/';
import * as css from '@redaktor/widgets/theme/material/radioGroup.m.css';
import { radioGroup } from './middleware';

export interface RadioGroupProperties extends RadioProperties {
	vertical?: boolean;
	/** Initial value of the radio group */
	initialValue?: string;
	/** Controlled value property */
	value?: string;
	/** The name attribute for this form group */
	name?: string;
	/** Callback for the current value */
	onValue?(value: any): void;
	/** Object containing the values / labels to create radios for */
	options: MenuOption[];
}

export interface RadioGroupChildren {
	/** Custom renderer for the radios, receives the radio group middleware and options */
	inputs?(
		name: string,
		middleware: ReturnType<ReturnType<typeof radioGroup>['api']>,
		options: MenuOption[],
		disabled: boolean
	): RenderResult;
	label?: RenderResult;
}

const factory = create({ radioGroup, id, theme })
	.properties<RadioGroupProperties>()
	.children<RadioGroupChildren | undefined>();

export const RadioGroup = factory(function({
	children,
	properties,
	middleware: { radioGroup, id, theme }
}) {
	const {
		vertical, options, onValue, value, initialValue, disabled,
		name = '', widgetId, ...radioProps
	} = properties();
	const [{ inputs, label } = { inputs: undefined, label: undefined }] = children();
	const radio = radioGroup(initialValue || '', value, onValue);
	const themedCss = theme.classes(css);

	function renderRadios() {
		if (inputs) {
			return inputs(name, radio, options, !!disabled);
		}
		return options.map(({ value, label, disabled }) => {
			const { checked } = radio(value);
			return (
				<Radio {...radioProps} spaced={true} checked={checked()} disabled={disabled} name={widgetId||id.getId(name)} onValue={checked} value={value}>
					{label || value}
				</Radio>
			);
		});
	}

	return (
		<fieldset key="root" classes={[theme.variant(), themedCss.root, vertical && themedCss.vertical]} name={name}>
			{label && <legend classes={themedCss.legend}>{label}</legend>}
			{renderRadios()}
		</fieldset>
	);
});

export default RadioGroup;
