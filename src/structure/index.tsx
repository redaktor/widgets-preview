import { RenderResult } from '@dojo/framework/core/interfaces';
import { create, tsx } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { splitPrefix } from '../_ld';
import Details from '../details';
import theme from '../middleware/theme';
import is from '../framework/is';
import { isRenderResult } from '../common/util';
import * as colors from '@redaktor/widgets/theme/material/_color.m.css';
import * as css from '../theme/material/structure.m.css';

export interface StructureProperties {
	/* The LD object */
	value: string | { [key: string]: any };
	omitProperties?: string[];
	colors?: (keyof typeof colors)[];
}
export interface StructureChildren {
	/* Render in <Details> */
	detailsSummary?: RenderResult;
	header?: RenderResult;
	footer?: RenderResult;
}
const icache = createICacheMiddleware<{omits: Set<any>}>();

const factory = create({ theme, icache }).properties<StructureProperties>().children<StructureChildren | RenderResult | RenderResult[] | undefined>();
export const Structure = factory(function structure({ middleware: { theme, icache }, properties, children}) {
	const themedCss = theme.classes(css);
	const {
		value,
		omitProperties = [],
		colors = [
			'deepOrange', 'deepPurple', 'cyan', 'brown', 'lime', 'blue', 'yellow', 'pink',
			'indigo', 'amber', 'lightGreen', 'lightBlue', 'purple', 'teal', 'blueGrey', 'green'
		]
	} = properties();
	if (is(value,'undefined')) { return '' }
	icache.getOrSet('omits', new Set(omitProperties));
	const knownType = ['undefined','null','NaN','number','integer','string','boolean'];
	// sort linked data properties
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
	const omit = (keys: string[], o: any): any => {
		if (!is(o,'object') || !keys.length) { return o }
		const k = keys.pop();
		if (!k) { return o }
		const { [k]: omitted, ...rest } = o;
		return omit(keys, rest);
	}

	const nodes: RenderResult[] = [];
	const parse = (_key: string, v: any, level = 0, isArrayKey = false, _vocabUrl = '') => {
		const omits = icache.get('omits');
		const { key, url, prefix, hasUrl } = splitPrefix(_key);
		if (!!omits && !!omits.size) {
			// check wellKnown prefix and url
			if (omits.has(_key) || (!!url && !!prefix && omits.has(!hasUrl ? `${url}${key}` : `${prefix}:${key}`))) {
				return ''
			}
		}

		const t = is(v);
		if (t === 'object' || t === 'array') {
			// parse row for key
			parse(key, '', level, isArrayKey, url);
			level++;
		}
		// parse keys/values in objects or primitive values
		if (t === 'array') {
			!isArrayKey && level--;
			for (let i in v) { parse(`${i}`, v[i], level, true) }
			!isArrayKey && level++;
		} else if (t === 'object') {
			for (let [_k, _v] of (Object.entries(v).sort(_sort))) { parse(_k, _v, level, false) }
		} else if (knownType.indexOf(t) > -1) {
			let colorI = (level||1)-1;
			while (colorI > colors.length) {
				colorI = Math.round(colorI/colors.length)||0
			}
			const vocabUrlO = !!(url||_vocabUrl) ? {title: `${key}`} : {};
			!!key && nodes.push(
				<virtual key={`${level}${key}`}>
					<dt key={`dt-${level}${key}`} {...vocabUrlO} classes={themedCss.breaked}></dt>
					<dt key={`dt-${level}${key}2`} title={`${url||_vocabUrl}${key}`} classes={[
						themedCss.predicate,
						isArrayKey && themedCss.index,
						theme.uiColor((colors as any)[colorI]),
						theme.variant()
					]} style={`--level: ${level}`}>
						{key}
					</dt>
					<dd key={`dd-${level}${key}`} classes={[themedCss.object, theme.uiColor((colors as any)[colorI]), theme.variant()]}>
						{t === 'undefined' ? '' : (t === 'NaN' ? 'NaN' : (t === 'null' ? 'null' : `${v}`))}
					</dd>
				</virtual>
			);
		}
	}

	// parse root
	let o;
	if (is(value,'string')) {
		try {
			o = JSON.parse(value as string);
		} catch(e) {
			o = value
		}
	} else {
		o = value
	}
	parse('', omit(omitProperties, o));

	const [render] = children();
	let {header, footer = '', detailsSummary = ''} = isRenderResult(render) ? {header: render} : render;

	const allNodes = <virtual>
		{header}
		<dl key="root" classes={themedCss.root}>{...nodes}</dl>
		{footer}
	</virtual>;
	return !nodes.length && !header ? '' : (!!detailsSummary ? <Details>{{
			summary: detailsSummary,
			content: allNodes
		}}</Details> : allNodes)
});

export default Structure;
