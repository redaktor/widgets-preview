import { RenderResult } from '@dojo/framework/core/interfaces';
import { create, tsx } from '@dojo/framework/core/vdom';
import dimensions from '@dojo/framework/core/middleware/dimensions';
import { theme, ThemeProperties } from '@redaktor/widgets/middleware/theme';
import * as css from '@redaktor/widgets/theme/material/progress.m.css';

enum MarkType {
	'dot' = 'dot', // default for progress/readonly if true
	'tickmark' = 'tickmark' // default for slider/interactive if true
}
export type MarkTypes = (MarkType | keyof typeof MarkType);

export interface TicksProperties extends ThemeProperties {
	/** Value used to calculate percent width or maximum value for sliders */
	max?: number;
	/** Value used to calculate percent width or maximum value for sliders */
	min?: number;
	/** The current percent */
	percent?: number;

	step?: number;

	isStep?: boolean;

	marks?: number[] | { [step: number]: string | null };
	/** dot or tickmark */
	markType?: boolean | MarkTypes;
	/* Vertical Sliders: Submit a number of lines for the height */
	vertical?: boolean | number;

	onSize?: (hasCaption: boolean, width: number) => any;
}

const factory = create({ theme, dimensions }).properties<TicksProperties>();
export const Ticks = factory(function Ticks({
	properties,
	middleware: { theme, dimensions }
}) {
	const themedCss = theme.classes(css);
	const {
		vertical = false,
		max = 100,
		min = 0,
		percent = 0,
		markType = true,
		step, marks, isStep, onSize
	} = properties();

	const isRepeat = (isStep && typeof marks !== 'object');
	const stepPercent = !step ? 0 : Math.round(((step - min) / (max - min)) * 100);
	let donePercent = 0;
	let hasCaption = false;
	let hasNext = false;
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
				<li key={`li${i}`} classes={tickClass} /> :
				<li key={`li${i}`} classes={tickClass}><span classes={themedCss.caption}>{caption}</span></li>
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

	const mType = !markType || !(markType in MarkType) ? 'tickmark' :markType;
	const tickGrid = ticksGrid.join('');
	typeof onSize === 'function' && onSize(hasCaption, dimensions.get('ticks').size.width);

	return ticks && <ul
		key="ticks"
		classes={[
			themedCss.ticks,
			mType !== 'tickmark' ? themedCss.dot : themedCss.tickmark
		]}
		style={`--ticks: ${tickGrid.trim()};`}
	>
		{ticks}
	</ul>
});

export default Ticks;
