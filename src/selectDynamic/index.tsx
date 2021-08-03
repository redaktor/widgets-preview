import { create, tsx } from '@dojo/framework/core/vdom';
import { theme } from '@redaktor/widgets/middleware/theme';
import NativeSelect, { NativeSelectProperties } from '@redaktor/widgets/selectNative';
import Checkboxes from '@redaktor/widgets/checkboxGroup';
import Radios, { RadioGroupChildren } from '@redaktor/widgets/radioGroup';

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
		<Radios options={options} {...selectProperties} /> :
		<Checkboxes options={options} {...selectProperties} />
});

export default DynamicSelect;
