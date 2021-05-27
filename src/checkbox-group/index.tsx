import { create, tsx } from '@dojo/framework/core/vdom';
import { checkboxGroup } from './middleware';
import theme from '@dojo/framework/core/middleware/theme';
import { uuid } from '@dojo/framework/core/util';
import { Checkbox, CheckboxProperties } from '../checkbox/index';
import { RenderResult } from '@dojo/framework/core/interfaces';
import * as css from '../theme/material/checkbox-group.m.css';

type CheckboxOptions = { value: string; label?: string }[];

export interface CheckboxGroupProperties extends CheckboxProperties {
	vertical?: boolean;
	/** The name attribute for this form group */
	name?: string;
	/** Object containing the values / labels to create checkboxes for */
	options: CheckboxOptions;
	/** Callback for the current value */
	onValue?(value: string[]|any): void;
	/** Initial value of the checkbox group */
	initialValue?: string[]|any;
	/** A controlled value for the checkbox group */
	value?: string[]|any;
}

export interface CheckboxGroupChildren {
	/** Custom renderer for the checkboxes, receives the checkbox group middleware and options */
	inputs?(
		name: string,
		middleware: ReturnType<ReturnType<typeof checkboxGroup>['api']>,
		options: CheckboxOptions
	): RenderResult;
	label?: RenderResult;
}

const factory = create({ checkboxGroup, theme })
	.properties<CheckboxGroupProperties>()
	.children<CheckboxGroupChildren | undefined>();

export const CheckboxGroup = factory(function({
	children,
	properties,
	middleware: { checkboxGroup, theme }
}) {
	const { vertical, name = '', widgetId = uuid(), options, onValue, initialValue, value, ...cbProps } = properties();
	const [{ inputs, label } = { inputs: undefined, label: undefined }] = children();

	const checkbox = checkboxGroup(initialValue, value, onValue);
	const themedCss = theme.classes(css);

	function renderCheckboxes() {
		if (inputs) {
			return inputs(name, checkbox, options);
		}
		return options.map(({ value, label }) => {
			const { checked } = checkbox(value);
			return (
				<Checkbox {...cbProps} spaced={true} name={`${name}_${widgetId}`} value={value} checked={checked()} onValue={checked}>
					{label || value}
				</Checkbox>
			);
		});
	}

	return (
		<fieldset key="root" classes={[theme.variant(), themedCss.root, vertical && themedCss.vertical]} name={name}>
			{label && <legend classes={themedCss.legend}>{label}</legend>}
			{renderCheckboxes()}
		</fieldset>
	);
});

export default CheckboxGroup;
