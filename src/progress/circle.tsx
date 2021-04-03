import { create, tsx } from '@dojo/framework/core/vdom';
import { theme } from '../middleware/theme';
import * as css from '../theme/material/progress.m.css';

export interface CircleProperties {
	percent?: number;
	isIndeterminate?: boolean;
}

const factory = create({ theme }).properties<CircleProperties>();
export const Circle = factory(function Circle({
	properties,
	middleware: { theme }
}) {
	const themedCss = theme.classes(css);
	const {
		percent = 0,
		isIndeterminate = false
	} = properties();


	const easeOut = (t: number) => {
		t = Math.min(Math.max(0, t), 1);
		t = (t -= 1) * t * t + 1; // https://gist.github.com/gre/1650294
		return t;
	}
	return (<svg
		key="circle"
		classes={themedCss.svg}
		style={`--progress: ${percent};${!isIndeterminate ? '' :
			`transform: rotate(${(easeOut(percent/70) * 270).toFixed(3)}deg);`}`}
	>
		<circle classes={[themedCss.circle, themedCss.bg]} />
		<circle classes={[themedCss.circle, themedCss.track]} />
	</svg>);
});

export default Circle;
