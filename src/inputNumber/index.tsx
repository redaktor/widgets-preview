import { RenderResult } from '@dojo/framework/core/interfaces';
import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '@redaktor/widgets/middleware/theme';
import TextInput, { BaseInputProperties, TextInputChildren } from '@redaktor/widgets/inputText';
import * as textInputCss from '@redaktor/widgets/theme/material/inputText.m.css';
import * as numberInputCss from '@redaktor/widgets/theme/material/inputNumber.m.css';

export interface NumberInputProperties extends BaseInputProperties<{ value: number | null }> {
	/** The min value a number can be */
	min?: number;
	/** The max value a number can be */
	max?: number;
	/** The step to increment the number value by */
	step?: number;
	/** Represents if the input value is valid */
	valid?: { valid?: boolean; message?: string } | boolean;
	/** Callback fired when the input is blurred */
	onBlur?(value: any): void;
}

const factory = create({ theme }).properties<NumberInputProperties>()
	.children<TextInputChildren | RenderResult | undefined>();

export default factory(function NumberInput({ properties, children, middleware: { theme } }) {
	const { initialValue, value, onValue } = properties();
	const _children: any = Array.isArray(children()) ? children()[0] : children();
	function onValueAdapter(valueAsString?: string) {
		if (!onValue) {
			return;
		}
		if (valueAsString === undefined || valueAsString === '') {
			onValue && onValue(null);
		} else {
			onValue(parseFloat(valueAsString));
		}
	}

	return (
		<TextInput
			{...properties()}
			value={value === undefined ? '' : `${value}`}
			initialValue={initialValue === undefined ? initialValue : `${initialValue}`}
			onValue={onValueAdapter}
			type="number"
			theme={theme.compose(
				textInputCss,
				numberInputCss
			)}
		>
			{_children}
		</TextInput>
	);
});
