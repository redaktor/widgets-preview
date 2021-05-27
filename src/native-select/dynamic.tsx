import { create, tsx } from '@dojo/framework/core/vdom';
import { theme } from '../middleware/theme';
import NativeSelect, { NativeSelectProperties } from '../native-select';
import CheckboxGroup from '../checkbox-group';
import RadioGroup, { RadioGroupChildren } from '../radio-group';

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
		return <NativeSelect multiple={multiple} options={options} {...selectProperties}>{...children()}</NativeSelect>
	}
	return !multiple ?
		<RadioGroup options={options} {...selectProperties} /> :
		<CheckboxGroup options={options} {...selectProperties} />
});

export default DynamicSelect;
