import { focus } from '@dojo/framework/core/middleware/focus';
import { create, tsx } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { ldPartial } from '../_ld';
import theme from '../middleware/theme';
import is from '../framework/is';

import * as css from '../theme/material/rate.m.css';
import Icon from '../icon';
import { RenderResult } from '@dojo/framework/core/interfaces';

export interface RateProperties {
	/** Handler for when the value of the widget changes */
	onValue?(value: number): void;
	/* Minimal value, defaults to 1 */
	worstRating?: number | string;
	/* Number of icons to show, defaults to 5, max 10 */
	bestRating?: number | string;
	/* Initial value for this widget */
	ratingValue?: number | string;
	/* The count of total number of ratings */
	ratingCount?: number;
	/* The count of total number of reviews */
	reviewCount?: number;
	/* Controlled value for this widget */
	value?: number;
	/* The form name for this rate widget */
	name?: string;
	/* To indicate if half stars should be used */
	allowHalf?: boolean;
	/* To set the readonly state */
	readOnly?: boolean;
	/* Flag and Like actions alongside stars */
	hasActions?: boolean;
}

export interface RateChildren {
	/* The label to be rendered from this rate widget */
	label?: RenderResult;
	/*
		The icon to be used, default is a star, this icon should be a font icon or an svg that accepts a `fill` to denote it's colour
		TODO icon?: RenderResult;
	*/
}

interface RateIcache {
	value: number;
	valueHovered: number;
	initialValue: number;
	valueFocused: string;
	focused: boolean;
}

const factory = create({ focus, theme, icache: createICacheMiddleware<RateIcache>() })
	.properties<RateProperties>()
	.children<RateChildren | undefined>();

export const Rate = factory(function Rate({properties, id, children, middleware: { theme, icache } }) {
	const idBase = `rate-${id}`;

	const {
		onValue, ratingCount, ratingValue = 0, bestRating = 5, worstRating = 1, reviewCount = 0,
		allowHalf = true, readOnly = false, hasActions = false, name = idBase, theme: themeProp, classes, variant
	} = properties();
	// TODO controlled:
	// let { value } = properties();
	const toNumber = (s: number | string) => {
		if (typeof s === 'number' && !isNaN(s)) { return s }
		const float = parseFloat(`${s}`);
		return allowHalf ? Math.round(float*2)/2 : Math.round(float)
	}
	const [value, best, worst] = [toNumber(ratingValue), toNumber(bestRating), toNumber(worstRating)];
	// const [{ label, icon } = { label: undefined, icon: undefined }] = children()
	const themedCss = theme.classes(css);
	const count = ((best-worst) * (allowHalf === true ? 2 : 1));
	const values = [
		...Array.from(Array(count).keys()).map((v) => (allowHalf === true ? v/2 : v) + worst),
		best
	].reverse();
	let hasChecked = false;

	return <div key="root" classes={[
		themedCss.root,
		theme.uiSize('l'),
		hasActions && themedCss.hasActions,
		readOnly ? themedCss.readOnly : themedCss.readWrite
	]}>
		<fieldset key="fieldset" classes={themedCss.fieldset} name={name}>
			{values.map((v, i) => {
				const vId = `${name}-${i}`;
				const cl = is(v, 'integer') ? themedCss.full : themedCss.half;
				const checked = typeof value === 'number' && value >= v && !hasChecked;
				if (!!checked) { hasChecked = true }
				return <virtual>
					<input key={`input${i}`} classes={[themedCss.input]} type="radio" id={vId} name={idBase} value={`${v}`} checked={checked} />
					<label key={`label${i}`} classes={[
						themedCss.label,
						cl,
						i < 2 ? themedCss.like : i === values.length-1 && themedCss.flag
					]} for={vId} title={`${v}/${best}`} />
				</virtual>
			})}
		</fieldset>
		<div key="count" classes={themedCss.count}>{is(ratingCount, 'number') ? ratingCount : ''}</div>
	</div>
});

export default Rate;
