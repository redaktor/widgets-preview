import theme from '../middleware/theme';
import { ThemedProperties } from '@dojo/framework/core/mixins/Themed';
import { create, tsx } from '@dojo/framework/core/vdom';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/loading-indicator.m.css';

export interface LoadingIndicatorProperties extends ThemedProperties {}

const factory = create({ theme }).properties<LoadingIndicatorProperties>();

export const LoadingIndicator = factory(function LoadingIndicator({ middleware: { theme } }) {
	const classes = theme.classes(css);

	return (
		<div classes={[
			theme.variant(),
			theme.colored(colors),
			theme.spaced(ui, false),
			classes.root
		]} role="progressbar">
			<div classes={classes.buffer} />
				<div classes={[classes.bar, classes.primary]}>
					<span classes={classes.inner} />
				</div>
			</div>
	);
});

export default LoadingIndicator;
