import { RenderResult } from '@dojo/framework/core/interfaces';
import { create } from '@dojo/framework/core/vdom';

const factory = create().properties<{
	/** Value used to calculate percent width or maximum value for sliders */
	max?: number;
	/** Value used to calculate percent width or maximum value for sliders */
	min?: number;
	/** The current value */
	value?: number;
	initialValue?: number;
	/** The discrete value */
	step?: number;
	/** A buffer value */
	buffer?: number;
	/* Vertical: Submit a number of lines for the height */
	vertical?: boolean | number;

	onOutput?(value: number, percent: number): RenderResult;
}>();

export const progressMiddleware = factory(({ properties }) => {
  return {
      format(_value?: number) {
				const {
					min: _min = 0,
					max: _max = 100,
					step: s,
					buffer: b,
					vertical = false,
					initialValue,
					onOutput
				} = properties();
				let { value: v } = properties();
				if (typeof v !== 'number' || isNaN(v)) {
					v = initialValue;
				}
				const outputValue = (value: number, percent: number) => {
					return onOutput ? onOutput(value, percent) : `${percent}%`;
				};

				const min = typeof _min !== 'number' || isNaN(_min) ? 0 : (
					typeof _max === 'number' || !isNaN(_max) && _min < _max ? _min : 0
				);
				const max = typeof _max !== 'number' || isNaN(_max) ? 100 : (
					typeof _min === 'number' || !isNaN(_min) && _min < _max ? _max : 100
				);
				const value = typeof _value === 'number' && !isNaN(_value) ? _value :
				(typeof v !== 'number' || isNaN(v) ? (!min && !max ? void 0 :
					((max < min) ? min : min + (max - min)/2)
				) : v);
				const buffer = typeof b !== 'number' || isNaN(b) ? void 0 : b;
				const step = typeof s !== 'number' || isNaN(s) ? void 0 : s;
				const percent = typeof value !== 'number' || isNaN(value) ? 0 :
					Math.round(((value - min) / (max - min)) * 100);
				const bufferPercent = typeof buffer !== 'number' || isNaN(buffer) || buffer < (value||0) || buffer < 0 ? 0 :
					Math.round(100 - ((buffer - min) / (max - min)) * 100);
				const stepPercent = !step ? 0 : Math.round(((step - min) / (max - min)) * 100);

				const isIndeterminate = typeof v !== 'number' || isNaN(v);
				const isStep = (step && typeof step === 'number' && !isNaN(step));
				const lines = !vertical ? 0 : (vertical === true ? 10 : Math.max(2, vertical));

				const _output = isIndeterminate ? '' : outputValue(value||0, percent);
				const cssVar = {
					buffer: isNaN(bufferPercent) ? '' : `--buffer: ${bufferPercent}%;`,
					lines: !lines ? '' : `--lines: ${lines};`
				};

        return {
					min, max, value, buffer, step, percent, bufferPercent, stepPercent,
					isIndeterminate, isStep, vertical, lines, cssVar, outputValue: _output
				};
      }
  }
});

export default progressMiddleware;
