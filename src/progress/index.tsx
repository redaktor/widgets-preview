import { RenderResult } from '@dojo/framework/core/interfaces';
import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import { theme, ThemeProperties } from '@redaktor/widgets/middleware/theme';
import progressMiddleware from './middleware';
import Circle from './circle';
import Ticks, { MarkTypes } from './ticks'
import Output, { OutputDisplay, OutputDisplays, Aligns } from './output';
import * as ui from '@redaktor/widgets/theme/material/_ui.m.css';
import * as colors from '@redaktor/widgets/theme/material/_color.m.css';
import * as css from '@redaktor/widgets/theme/material/progress.m.css';

export interface ProgressProperties extends ThemeProperties {
	responsive?: boolean;
	/** CircularProgress */
	circular?: boolean;
	/** Rounded Edges */
	rounded?: boolean;
	/** Custom aria attributes */
	aria?: { [key: string]: string | null };
	/** Value used to calculate percent width or maximum value for sliders */
	max?: number;
	/** Value used to calculate percent width or maximum value for sliders */
	min?: number;
	/** The current value */
	value?: number;
	/** Value used to supply a dom id to the element with role="progressbar" */
	widgetId?: string;

	step?: number;

	marks?: number[] | { [step: number]: string | null };
	/** dot or tickmark */
	markType?: MarkTypes;

	/** Visibility or type of progress bar output */
	outputDisplay?: boolean | OutputDisplays;
	/** Flex alignment of output */
	outputAlign?: Aligns;

	/* Vertical Sliders: Submit a number of lines for the height */
	vertical?: boolean | number;

	buffer?: number;
	onOutput?(value: number, percent: number): RenderResult;
}

const factory = create({ theme, icache, progressMiddleware })
	.properties<ProgressProperties>();

export const Progress = factory(function Progress({
	// children,
	id,
	properties,
	middleware: { theme, icache, progressMiddleware }
}) {

	const themedCss = theme.classes(css);

	const {
		min = 0, max = 100, value, buffer, step, percent,
		isIndeterminate, isStep, vertical, lines, cssVar, outputValue
	} = progressMiddleware.format();

	const {
		// aria = {},
		size = 'l',
		design = 'flat',
		responsive = true,
		circular = false,
		rounded = false,
		outputDisplay = true,
		markType = false,
		marks,
		outputAlign,
		onOutput,
		widgetId = `progress-${id}`
	} = properties();

	const ticks = markType && <Ticks key="tickmarks" {
		...{
			min, max, percent, step, isStep: !!isStep, marks, markType, vertical,
			onSize: (hasCaption, w) => {
				if (vertical && w) {
					icache.getOrSet('hasCaption', hasCaption, false);
					icache.set('width', (w > 0 ?
						`--width: calc(var(--track-h, var(--line, 16px)) + var(--plr,10px) + ${Math.ceil(w)}px);` :
						''
					))
				}
			}
		}
	} />

	const outPos = !outputDisplay || (typeof outputDisplay === 'string' && !(outputDisplay in OutputDisplay)) ? false :
		(outputDisplay === true ? (!vertical ? 'bottom' : 'right') : outputDisplay);
	const output = typeof onOutput === 'function' ? onOutput(value||0, percent) : <Output {
		...{
			vertical, outputDisplay, outputAlign, widgetId, design, size,
			hasCaption: icache.get('hasCaption'),
			value: outputValue
		}
	} />;
	const defaultDepth = { shaped:1, filled:1, raised:2, outlined:0, flat:0 };

	return (
		<div key="root"
			style={`--progress: ${percent}%`}
			classes={[
				themedCss.root,
				themedCss.progressRoot,
				theme.variant(),
				theme.shaped(themedCss),
				theme.sized(ui),
				theme.colored(colors),
				theme.spaced(ui),
				theme.animated(themedCss),
				circular ? themedCss.circular : (vertical ? css.vertical : css.horizontal),
				isIndeterminate ? css.indeterminate : css.determinate,
				rounded && themedCss.rounded,
				responsive && themedCss.responsive,
				icache.get('hasCaption') && themedCss.labeled,
				!!buffer && themedCss.buffer,
				outPos === 'tooltip' && themedCss.hasTooltip,
				outPos === 'top' || outPos === 'bottom' ? themedCss.column : themedCss.row
			]}
		>
			{outPos === 'top' || outPos === 'left' ? output : null}
			<div classes={themedCss.wrapper} {
				...(buffer||lines||icache.get('width') ? {style: `${cssVar.buffer}${cssVar.lines}${icache.get('width')}`} : {})
			}>
				{outPos === 'tooltip' ? output : null}
				{ isIndeterminate ?
					<progress classes={[themedCss.progress, theme.elevated(ui, 'filled', defaultDepth)]} /> :
					<progress
						min={`${min}`} max={`${max}`} value={`${value}`}
						id={widgetId} classes={[themedCss.progress, theme.elevated(ui, 'filled', defaultDepth)]}
					/>
				}
				{circular && <Circle {...{percent, isIndeterminate}} />}
				{ticks}
			</div>
			{outPos === 'bottom' || outPos === 'right' ? output : null}
		</div>
	);
});

export default Progress;
