import * as css from '../theme/material/radio-group.m.css';
import theme from '@dojo/framework/core/middleware/theme';
import { uuid } from '@dojo/framework/core/util';
import { Radio, RadioProperties } from '../radio/';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { create, tsx } from '@dojo/framework/core/vdom';
import { radioGroup } from './middleware';

type RadioOptions = { value: string; label?: string }[];

export interface RadioGroupProperties extends RadioProperties {
	vertical?: boolean;
	/** Initial value of the radio group */
	initialValue?: string;
	/** Controlled value property */
	value?: string;
	/** The name attribute for this form group */
	name: string;
	/** Callback for the current value */
	onValue(value: any): void;
	/** Object containing the values / labels to create radios for */
	options: RadioOptions;
}

export interface RadioGroupChildren {
	/** Custom renderer for the radios, receives the radio group middleware and options */
	radios?(
		name: string,
		middleware: ReturnType<ReturnType<typeof radioGroup>['api']>,
		options: RadioOptions,
		disabled: boolean
	): RenderResult;
	label?: RenderResult;
}

const factory = create({ radioGroup, theme })
	.properties<RadioGroupProperties>()
	.children<RadioGroupChildren | undefined>();

export const RadioGroup = factory(function({
	children,
	properties,
	middleware: { radioGroup, theme }
}) {
	const {
		vertical, options, onValue, value, initialValue, disabled,
		name = '', widgetId = uuid(), ...radioProps
	} = properties();
	const [{ radios, label } = { radios: undefined, label: undefined }] = children();
	const radio = radioGroup(onValue, initialValue || '', value);
	const themedCss = theme.classes(css);

	function renderRadios() {
		if (radios) {
			return radios(name, radio, options, !!disabled);
		}
		return options.map(({ value, label }) => {
			const { checked } = radio(value);
			return (
				<Radio {...radioProps} spaced={true} checked={checked()} name={`${name}_${widgetId}`} onValue={checked} value={value}>
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
