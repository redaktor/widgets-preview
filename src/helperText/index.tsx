import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '@redaktor/widgets/middleware/theme';
import * as ui from '@redaktor/widgets/theme/material/_ui.m.css';
import * as colors from '@redaktor/widgets/theme/material/_color.m.css';
import * as css from '@redaktor/widgets/theme/material/helperText.m.css';

export interface HelperTextProperties {
	/** The supplied helper text */
	text?: string;
	/** If `HelperText` indicates a valid condition */
	valid?: boolean;

	classes?: string[];
}

const factory = create({ theme }).properties<HelperTextProperties>();

export default factory(function HelperText({ properties, middleware: { theme } }) {
	const { text, valid, classes = [] } = properties();
	const themedCss = theme.classes(css);

	return (
		<div
			key="root"
			classes={[
				theme.variant(),
				themedCss.root,
				valid === true ? themedCss.valid : null,
				valid === false ? themedCss.invalid : null,
				...(classes||[])
			]}
		>
			{text && (
				<p key="text" classes={[
					themedCss.text,
					theme.sized(ui),
					theme.sized(themedCss),
					theme.spaced(ui, false),
					theme.colored(colors),
				]} aria-hidden={'true'} title={text}>
					{text}
				</p>
			)}
		</div>
	);
});
