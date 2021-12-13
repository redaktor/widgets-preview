import { RenderResult } from '@dojo/framework/core/interfaces';
import { create, tsx } from '@dojo/framework/core/vdom';
import i18nActivityPub from '../middleware/i18nActivityPub';
import theme from '../middleware/theme';
import is from '../framework/is';
// import bundle from './nls/Structure';
import * as colors from '@redaktor/widgets/theme/material/_color.m.css';
import * as css from '../theme/material/structure.m.css';

export interface StructureProperties {
	value: string | { [key: string]: any };
	colors: (keyof typeof colors)[];
}
/*
export type TOF = 'undefined'|'null'|'NaN'|'number'|'integer'|'string'|'boolean'|'symbol'|'function'|'object'|'array'|'bigint';
export default function is(data: any, evtType?: TOF)
object
<div class="triple-row" style="background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;">
	<div class="predicate">
		<div style="width: 0px; border-right-width: 3px; border-right-style: solid; border-right-color: rgb(133, 224, 133); margin-right: 3px;"></div>
		<div>track</div>
	</div>
	<div class="object"></div>
</div>

<div class="triple-row" style="background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;">
	<div class="predicate">
		<div style="width: 30px; border-right-width: 3px; border-right-style: solid; border-right-color: rgb(194, 133, 224); margin-right: 3px;"></div>
		<div>@type</div>
	</div>
	<div class="object">MusicRecording</div>
</div>
*/
const factory = create({ theme, i18nActivityPub }).properties<StructureProperties>();
export const Structure = factory(function structure({ middleware: { theme, i18nActivityPub }, properties}) {
	const themedCss = theme.classes(css);
	const {
		value,
		colors = [
			'pink', 'deepOrange', 'lime', 'blue', 'yellow', 'deepPurple', 'cyan', 'brown',
			'indigo', 'amber', 'lightGreen', 'lightBlue', 'purple', 'teal', 'blueGrey', 'green'
		]
	} = properties();
	if (is(value,'undefined')) { return '' }
	const knownType = ['undefined','null','NaN','number','integer','string','boolean'];

	const nodes: RenderResult[] = [];
	let [level,lastLevel] = [0,0];
	let isArray = false;

	const parse = (k: string, v: any) => {
		const t = is(v);
		console.log(k,v,t)
		if (t === 'object' || t === 'array') {
			parse(k,'');
			t !== 'array' && level++;
		}
		if (t === 'array') {
			lastLevel = level;
			isArray = true;
			for (let i in v) { parse(`${i}`, v[i]) }
			isArray = false;
		} else if (t === 'object') {
			const getWeight = (a: any) => {
				let [aK, aV] = a;
				if (aK === '@context') { return -4 }
				if ((aK.trim().charAt(0)||'') === '@') { return -3 }
				const _t = is(aV);
				const isPrimary = aK === 'name' || aK === 'summary' || aK === 'content';
			  if (_t !== 'object' && _t !== 'array') { return isPrimary ? -2 : -1 }
				if (isPrimary) { return 0 }
			  return 1;
			}
			const _sort = (a: any, b: any) => {
			  return getWeight(a) === getWeight(b) ? 0 : (getWeight(a) < getWeight(b) ? -1 : 1);
			}
			for (let [_k, _v] of (Object.entries(v).sort(_sort))) { parse(_k, _v) }
			isArray && level--;
		} else if (knownType.indexOf(t) > -1) {
			const isArrayKey = lastLevel === level && level !== (isArray ? level-1 : level);
			let colorI = level;
			while (!!colorI && colorI > colors.length) {
				colorI = Math.round(colorI/colors.length)||0
			}
			nodes.push(
				<div classes={[themedCss.tripleRow, theme.uiColor((colors as any)[colorI]), theme.variant()]}>
					<div classes={themedCss.predicate}>
						<div classes={[themedCss.border, isArrayKey && themedCss.index]} style={`--level: ${level}`}></div>
						<div classes={isArrayKey && themedCss.muted}>{k}</div>
					</div>
					<div classes={themedCss.object}>
						{t === 'undefined' ? '' : (t === 'NaN' ? 'NaN' : (t === 'null' ? 'null' : `${v}`))}
					</div>
				</div>
			);
		}
	}

	if (is(value,'string')) {
		try {
			const o = JSON.parse(value as string);
			parse('', o)
		} catch(e) {
			parse('', value)
		}
	} else {
		parse('', value)
	}

	return <div classes={themedCss.root}>
		{...nodes}
	</div>
});

export default Structure;
