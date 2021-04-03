import { RenderResult } from '@dojo/framework/core/interfaces';
import focus from '@dojo/framework/core/middleware/focus';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { create, tsx } from '@dojo/framework/core/vdom';
import { theme, formatAriaProperties } from '../middleware/theme';
import progressMiddleware from '../progress/middleware';
import Ticks from '../progress/ticks';
import Output, { OutputDisplay } from '../progress/output';
import { ProgressProperties } from '../progress';

import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/progress.m.css';
import * as fixedCss from './styles/slider.m.css';

export interface SliderProperties extends ProgressProperties {
	/** Set the disabled property of the control */
	disabled?: boolean;
	/** The name of the input element */
	name?: string;
	/** Handler for when the element is blurred */
	onBlur?(): void;
	/** Handler for when the element is focused */
	onFocus?(): void;
	/** Handler for when the pointer moves out of the element */
	onOut?(): void;
	/** Handler for when the pointer moves over the element */
	onOver?(): void;
	/** Handler for when the value of the widget changes */
	onValue?(value: number): void;
	/** Makes the slider readonly (it may be focused but not changed) */
	readOnly?: boolean;
	/** If the slider must be set */
	required?: boolean;
	/** Size of the slider increment */
	step?: number;
	/** If the value provided by the slider are valid */
	valid?: boolean;
	/** The initial value */
	initialValue?: number;
}

export interface SliderChildren {
	/** Adds a <label> element with the supplied text */
	label?: RenderResult;
	/** An optional function that returns a string or DNode for custom output format */
	output?(value: number): RenderResult;
}

export interface SliderICache {
	value?: number;
	initialValue?: number;
	width?: string;
	hasCaption?: boolean;
}

const factory = create({
	theme,
	focus,
	progressMiddleware,
	icache: createICacheMiddleware<SliderICache>()
})
	.properties<SliderProperties>()
	.children<SliderChildren | undefined>();

export const Slider = factory(function Slider({
	id,
	middleware: { theme, focus, icache, progressMiddleware },
	properties,
	children
}) {

	const themedCss = theme.classes(css);

	const {
		aria = {},
		size = 'l',
		variant = 'flat',
		responsive = true,
		circular = false,
		rounded = false,
		outputDisplay = true,
		markType = false,
		max = 100,
		min = 0,
		marks,
		outputAlign,
		onOutput,
		widgetId = `progress-${id}`,
		disabled,
		valid,
		name,
		readOnly,
		required,
		theme: themeProp,
		classes,
		onOut,
		onOver,
		onBlur,
		onFocus,
		onValue
	} = properties();

	const { initialValue = min } = properties();
	let { value } = properties();

	if (value === undefined) {
		value = icache.get('value') || initialValue;
		const existingInitialValue = icache.getOrSet('initialValue', min);

		if (initialValue !== existingInitialValue) {
			value = initialValue;
			if (initialValue > max) {
				value = max;
			} else if (initialValue < min) {
				value = min;
			}

			icache.set('value', value);
			icache.set('initialValue', initialValue);
			onValue && onValue(value);
		}
	} else {
		if (value > max) {
			value = max;
		} else if (value < min) {
			value = min;
		}
		icache.set('value', value);
	}
	const {
		buffer, step, percent,
		isIndeterminate, isStep, vertical, lines, cssVar, outputValue
	} = progressMiddleware.format(icache.get('value'));

	const ticks = markType && <Ticks {
		...{
			min, max, percent, step, isStep: !!isStep, marks, markType, vertical,
			onSize: (hasCaption, w) => {

				icache.getOrSet('hasCaption', hasCaption, false);
				icache.set('width', (w > 0 ?
					`--width: calc(var(--track-h, var(--line, 16px)) + var(--plr,10px) + ${Math.ceil(w)}px);` :
					''
				))

			}
		}
	} />

	const outPos = !outputDisplay || (typeof outputDisplay === 'string' && !(outputDisplay in OutputDisplay)) ? false :
		(outputDisplay === true ? (!vertical ? 'bottom' : 'right') : outputDisplay);
	const output = typeof onOutput === 'function' ? onOutput(value||0, percent) : <Output {
		...{
			vertical, outputDisplay, outputAlign, widgetId, variant, size,
			hasCaption: icache.get('hasCaption'),
			value: outputValue
		}
	} />;
	const defaultDepth = { shaped:1, filled:1, raised:2, outlined:0, flat:0 };

	return (
		<div key="root"
			style={`--progress: ${percent}%`}
			classes={[
				theme.variant(),
				themedCss.root,
				themedCss.slider,
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
				outPos === 'top' || outPos === 'bottom' ? themedCss.column : themedCss.row,

				disabled ? themedCss.disabled : null,
				focus.isFocused('input') ? themedCss.focused : null,
				valid === false ? themedCss.invalid : null,
				valid === true ? themedCss.valid : null,
				readOnly ? themedCss.readonly : null,
				fixedCss.rootFixed
			]}
		>
			{outPos === 'top' || outPos === 'left' ? output : null}
			<div classes={[themedCss.wrapper, fixedCss.wrapperFixed]} {
				...(buffer||lines||icache.get('width') ? {style: `${cssVar.buffer}${cssVar.lines}${icache.get('width')}`} : {})
			}>
				{outPos === 'tooltip' ? output : null}
				{ isIndeterminate ?
					<progress classes={[themedCss.progress, theme.elevated(ui, 'filled', defaultDepth)]} /> :
					<input
						key="input"
						{...formatAriaProperties(aria)}
						classes={[themedCss.range, fixedCss.nativeInput, theme.elevated(ui, 'filled', defaultDepth)]}
						disabled={disabled}
						id={widgetId}
						focus={focus.shouldFocus}
						aria-invalid={valid === false ? 'true' : 'false'}
						aria-readonly={readOnly ? 'true' : 'false'}
						max={`${max}`}
						min={`${min}`}
						name={name}
						readOnly={readOnly}
						required={required}
						step={step}
						type="range"
						value={`${icache.get('value')||value||initialValue}`}
						onblur={() => onBlur && onBlur()}
						onfocus={() => onFocus && onFocus()}
						onpointerenter={() => onOver && onOver()}
						onpointerleave={() => onOut && onOut()}
						oninput={(event: Event) => {
							event.stopPropagation();
							const value = Math.max(min, parseFloat((event.target as HTMLInputElement).value));
							icache.set('value', value);
							onValue && onValue(value);
						}}
					/>
				}
				{ticks}
			</div>
			{outPos === 'bottom' || outPos === 'right' ? output : null}
		</div>
	);
});

export default Slider;
