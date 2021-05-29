import { create, tsx } from '@dojo/framework/core/vdom';
import { theme } from '../middleware/theme';
import NativeSelect, { NativeSelectProperties } from '../selectNative';
import CheckboxGroup from '../checkboxGroup';
import RadioGroup, { RadioGroupChildren } from '../radioGroup';

export interface DynamicSelectProperties extends NativeSelectProperties {
	/** The maximum number of single checkboxes / radios, default 3 */
	singleMax?: number;
	/* TODO - Enhance client JS with a typeahead - TODO :
	typeahead?: boolean | 'readOnly';
	*/
}

const factory = create({ theme })
	.properties<DynamicSelectProperties>()
	.children<RadioGroupChildren | undefined>();

export const DynamicSelect = factory(function DynamicSelect({
	properties,
	children,
	middleware: { theme }
}) {
	const {
		singleMax = 3,
		multiple = false,
		options = [],
		...selectProperties
	} = properties();

	if (!options || !options.length) { return '' }
	if (options.length > singleMax) {
		return <NativeSelect multiple={multiple} options={options} {...selectProperties}>
			{([...children()] as any)}
		</NativeSelect>
	}
	return !multiple ?
		<RadioGroup options={options} {...selectProperties} /> :
		<CheckboxGroup options={options} {...selectProperties} />
});

export default DynamicSelect;
