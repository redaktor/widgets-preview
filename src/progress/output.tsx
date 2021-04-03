import { RenderResult } from '@dojo/framework/core/interfaces';
import { create, tsx } from '@dojo/framework/core/vdom';
import { theme, ThemeProperties } from '../middleware/theme';
import Chip from '../chip';
import * as css from '../theme/material/progress.m.css';

enum FlexAlign {
	start = 'start',
	center = 'center', // default
	end = 'end'
}
export enum OutputDisplay {
	'top' = 'top', // vertical default if true
	'bottom' = 'bottom',
	'left' = 'left',
	'right' = 'right', // horizontal default if true
	'inline' = 'inline',
	'tooltip' = 'tooltip',
}
export type OutputDisplays = (OutputDisplay | keyof typeof OutputDisplay);
export type Aligns = (FlexAlign | keyof typeof FlexAlign);

export interface OutputProperties extends ThemeProperties {
	value?: RenderResult;
	/** The variant for the input: 'flat', 'outlined', 'raised', 'shaped'
	 * 'flat' by default
	 */
	variant?: any;
	/** Visibility or type of progress bar output */
	outputDisplay?: boolean | OutputDisplays;
	/** Flex alignment of output */
	outputAlign?: Aligns;
	/* Vertical Sliders: Submit a number of lines for the height */
	vertical?: boolean | number;
	/** Value used to supply a dom id to the element with role="progressbar" */
	widgetId?: string;

	hasCaption?: boolean;
}

const factory = create({ theme }).properties<OutputProperties>();
export const Ticks = factory(function Ticks({
	properties,
	middleware: { theme }
}) {
	const themedCss = theme.classes(css);
	const {
		vertical = false,
		outputDisplay = true,
		widgetId = '',
		value,
		outputAlign,
		hasCaption,
		variant,
		size
	} = properties();

	const outPos = !outputDisplay || !(outputDisplay in OutputDisplay) ? false :
		(outputDisplay === true ? (!!vertical ? 'top' : 'right') : outputDisplay);
	const outAlign = outputAlign && (outputAlign in FlexAlign) ? outputAlign :
		(hasCaption ? 'start' : 'center');

	return outPos ?
		<output for={widgetId} classes={[
			themedCss.output,
			themedCss.hasOwnProperty(outPos) ? (themedCss as any)[outPos] : null,
			themedCss.hasOwnProperty(outAlign) ? (themedCss as any)[outAlign] : null,
			size === 'xs' ? themedCss.small : null,
			typeof value === 'string' ? themedCss.value : null
		]}>
			{(typeof value !== 'string' ? value :
				(outPos === 'tooltip' ?
					<span>{`${value}`}</span> :
					<Chip animated={false} variant={variant}>{`${value}`}</Chip>
				)
			)}
		</output> : null;
});

export default Ticks;
