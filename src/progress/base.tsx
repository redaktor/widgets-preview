import { RenderResult } from '@dojo/framework/core/interfaces';
import { create, tsx } from '@dojo/framework/core/vdom';
import dimensions from '@dojo/framework/core/middleware/dimensions';
import { theme, ThemeProperties, Designs } from '@redaktor/widgets/middleware/theme';
import Chip from '@redaktor/widgets/chip';
import * as ui from '@redaktor/widgets/theme/material/_ui.m.css';
import * as colors from '@redaktor/widgets/theme/material/_color.m.css';
import * as css from '@redaktor/widgets/theme/material/progress.m.css';

enum OutputDisplay {
	'top' = 'top', // vertical default if true
	'bottom' = 'bottom',
	'left' = 'left',
	'right' = 'right', // horizontal default if true
	'inline' = 'inline',
	'tooltip' = 'tooltip',
}
enum MarkType {
	'dot' = 'dot', // default for progress/readonly if true
	'tickmark' = 'tickmark' // default for slider/interactive if true
}
enum FlexAlign {
	start = 'start',
	center = 'center', // default
	end = 'end'
}
export type OutputDisplays = (OutputDisplay | keyof typeof OutputDisplay);
export type MarkTypes = (MarkType | keyof typeof MarkType);
export type Aligns = (FlexAlign | keyof typeof FlexAlign);

export interface ProgressProperties extends ThemeProperties {
	responsive?: boolean;
	/** CircularProgress */
	circular?: boolean;
	/** Rounded Edges */
	rounded?: boolean;
	/** The design for the input: 'flat', 'outlined', 'raised', 'shaped'
	 * 'flat' by default
	 */
	design?: Designs;
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
	output?(value: number, percent: number): RenderResult;
}

const factory = create({ theme, dimensions })
	.properties<ProgressProperties>();

export const Progress = factory(function Progress({
	children,
	id,
	properties,
	middleware: { theme, dimensions }
}) {
	const themedCss = theme.classes(css);
	const {
		// aria = {},
		design = 'flat',
		responsive = true,
		circular = false,
		rounded = false,
		vertical = false,
		max = 100,
		min = 0,
		outputDisplay = true,
		markType = true,
		outputAlign,
		output: outFn,

		buffer: b,
		step, marks, value, size,
		widgetId = `progress-${id}`
	} = properties();

	const outputValue = (value: number, percent: number) => {
		return outFn ? outFn(value, percent) : `${percent}%`;
	};
	// const easeIn = (t: number) => t * t;
	const easeOut = (t: number) => {
		t = Math.min(Math.max(0, t), 1);
		t = (t -= 1) * t * t + 1; // https://gist.github.com/gre/1650294
		return t;
	}

	const percent = typeof value !== 'number' || isNaN(value) ? 0 :
		Math.round(((value - min) / (max - min)) * 100);
	const buffer = typeof b !== 'number' || isNaN(b) || b < percent || b < 0 ? 0 :
		Math.round(100 - ((b - min) / (max - min)) * 100);
	const isIndeterminate = typeof value !== 'number' || isNaN(value);
	const _output = !value || !percent ? '' : outputValue(value, percent);
	const lines = !vertical ? 0 : (vertical === true ? 10 : Math.max(2, vertical));
	const _buffer = !buffer ? '' : `--buffer: ${buffer}%;`;
	const _lines = !lines ? '' : `--lines: ${lines};`;

	const isStep = (step && typeof step === 'number' && !isNaN(step));
	const isRepeat = (isStep && typeof marks !== 'object');
	const stepPercent = !step ? 0 : Math.round(((step - min) / (max - min)) * 100);
	let donePercent = 0;
	let hasNext = false;
	let hasCaption = false;
	let ticksGrid: string[] = isRepeat ? [`repeat(${Math.floor(100 / stepPercent)}, ${stepPercent}%)`] : [];
	let ticks: RenderResult[] = [];

	const marksArray = typeof marks !== 'object' ? [] :
		(Array.isArray(marks) ? marks : Object.keys(marks).map((k) => parseInt(k, 10)));
	const stepArray = !step || !isStep ? [] : [...Array(Math.floor(max/step)-1).keys()].map(i => (i+1)*step);

	[...new Set([...marksArray, ...stepArray])].filter((nr) => (typeof nr === 'number' && !isNaN(nr)))
		.sort((a, b) => (a - b))
		.map((nr,i) => {
			!i && !vertical && ticks.push(<li />);
			const stepPercent = Math.round(((nr - min) / (max - min)) * 100 - donePercent);
			donePercent += stepPercent;
			!isRepeat && ticksGrid.push(`${stepPercent}% `);
			const caption = typeof marks !== 'object' || Array.isArray(marks) ? '' : marks[nr];
			const tickClass = [donePercent > percent && !hasNext ? themedCss.next : null];
			if (step && (nr % step) === 0) { tickClass.push(themedCss.step) }

			ticks.push(!caption ?
				<li classes={tickClass} /> :
				<li classes={tickClass}><span classes={themedCss.caption}>{caption}</span></li>
			);
			if (!!caption) { hasCaption = true }
			if (donePercent > percent) { hasNext = true }
		});

	if (vertical) {
		ticks = ticks.reverse();
		ticks.push(<li />);
	}
	if (!isRepeat) {
		ticksGrid.push('auto ');
		if (vertical) { ticksGrid = ticksGrid.reverse() }
	}

	const outPos = !outputDisplay || !(outputDisplay in OutputDisplay) ? false :
		(outputDisplay === true ? (vertical ? 'top' : 'right') : outputDisplay);
	const outAlign = outputAlign && (outputAlign in FlexAlign) ? outputAlign :
		(hasCaption ? 'start' : 'center');
	const mType = !markType || !(markType in MarkType) ? 'tickmark' :markType;
	const output = outPos ?
		<output for={widgetId} classes={[
			themedCss.output,
			themedCss.hasOwnProperty(outPos) ? (themedCss as any)[outPos] : null,
			themedCss.hasOwnProperty(outAlign) ? (themedCss as any)[outAlign] : null,
			size === 'xs' ? themedCss.small : null,
			typeof _output === 'string' ? themedCss.value : null
		]}>
			{(typeof _output !== 'string' ? _output :
				(outPos === 'tooltip' ?
					<span>{`${_output}`}</span> :
					<Chip animated={false} design={design}>{`${_output}`}</Chip>
				)
			)}
		</output> : null

	const tickGrid = ticksGrid.join('');
	const circle = () => (<svg
		key="circle"
		classes={themedCss.svg}
		style={`--progress: ${percent};${!isIndeterminate ? '' :
			`transform: rotate(${(easeOut(percent/70) * 270).toFixed(3)}deg);`}`}
	>
		<circle classes={[themedCss.circle, themedCss.bg]} />
		<circle classes={[themedCss.circle, themedCss.track]} />
	</svg>);

	let width = 0;
	if (!!vertical && !!hasCaption && !!markType) {
		width = dimensions.get('ticks').size.width;
	}
	const _width = width > 0 ? `--width: calc(var(--track-h, var(--line, 16px)) + var(--plr,10px) + ${Math.ceil(width)}px);` : '';

	return (
		<div key="root"
			style={`--progress: ${percent}%`}
			classes={[
				themedCss.root,
				themedCss.progressRoot,
				themedCss[design],
				theme.variant(),
				theme.sized(ui),
				theme.spaced(ui),
				theme.colored(colors),
				theme.animated(themedCss),
				circular ? themedCss.circular : (vertical ? css.vertical : css.horizontal),
				isIndeterminate ? css.indeterminate : css.determinate,
				rounded && themedCss.rounded,
				responsive && themedCss.responsive,
				hasCaption && themedCss.labeled,
				!!buffer && themedCss.buffer,
				outPos === 'tooltip' && themedCss.hasTooltip,
				outPos === 'top' || outPos === 'bottom' ? themedCss.column : themedCss.row
			]}
		>
			{outPos === 'top' || outPos === 'left' ? output : null}
			<div classes={themedCss.wrapper} {
				...(_buffer||_lines||_width ? {style: `${_buffer}${_lines}${_width}`} : {})
			}>
				{outPos === 'tooltip' ? output : null}
				{ isIndeterminate ?
					<progress classes={themedCss.progress} /> :
					children()
				}
				{circular && circle()}
				{ticks.length>0 && !!markType &&
					<ul
						key="ticks"
						classes={[
							themedCss.ticks,
							mType !== 'tickmark' ? themedCss.dot : themedCss.tickmark
						]}
						style={`--ticks: ${tickGrid.trim()};`}
					>
						{ticks}
					</ul>
				}
			</div>
			{outPos === 'bottom' || outPos === 'right' ? output : null}
		</div>
	);
});

export default Progress;
