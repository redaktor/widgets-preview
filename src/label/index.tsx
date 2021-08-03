import { create, tsx } from '@dojo/framework/core/vdom';

import * as baseCss from '@redaktor/widgets/common/styles/base.m.css';
import theme from '@redaktor/widgets/middleware/theme';
import * as css from '@redaktor/widgets/theme/material/label.m.css';
import { formatAriaProperties } from '@redaktor/widgets/common/util';

export interface LabelProperties {
	/** Custom aria attributes */
	aria?: { [key: string]: string | null };
	/** If the label should be disabled */
	disabled?: boolean;
	/** If the label is focused */
	focused?: boolean;
	/** ID to explicitly associate the label with an input element */
	forId?: string;
	/** If the label should be invisible (it will remain accessible to screen readers) */
	hidden?: boolean;
	/** If the label is read only */
	readOnly?: boolean;
	/** If the label is required */
	required?: boolean;
	/** If the label should use the secondary styling */
	secondary?: boolean;
	/** If the label is valid */
	valid?: boolean;
	/** ID of the underlying label element */
	widgetId?: string;
	/** Indicates that the label or it's control are active, will add extra style class */
	active?: boolean;
}

const factory = create({ theme }).properties<LabelProperties>();

export const Label = factory(function Label({ properties, id, children, middleware: { theme } }) {
	const {
		aria = {},
		active,
		disabled,
		focused,
		forId,
		hidden,
		readOnly,
		required,
		secondary,
		valid,
		widgetId = `label-${id}`
	} = properties();

	const themedCss = theme.classes(css);

	return (
		<label
			{...formatAriaProperties(aria)}
			id={widgetId}
			classes={[
				theme.variant(),
				themedCss.root,
				disabled && themedCss.disabled,
				focused && themedCss.focused,
				readOnly && themedCss.readonly,
				required && themedCss.required,
				secondary && themedCss.secondary,
				active && themedCss.active,
				hidden && baseCss.visuallyHidden,
				valid === true ? themedCss.valid : null,
				valid === false ? themedCss.invalid : null
			]}
			for={forId}
		>
			{children()}
		</label>
	);
});

export default Label;
