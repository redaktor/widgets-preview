import { RenderResult } from '@dojo/framework/core/interfaces';
import { create, tsx } from '@dojo/framework/core/vdom';
import i18nActivityPub from '../middleware/i18nActivityPub';
import { wellKnownVocab } from '../_ld';
import theme from '../middleware/theme';
import is from '../framework/is';
// import bundle from './nls/Structure';
import * as colors from '@redaktor/widgets/theme/material/_color.m.css';
import * as css from '../theme/material/structure.m.css';

export interface StructureProperties {
	value: string | { [key: string]: any };
	colors?: (keyof typeof colors)[];
}

function splitPrefix(text: string): [string, string] /*[vocabUrl, key]*/ {
	const vocabUrls = [
		'http://www.w3.org/1999/02/22-rdf-syntax-ns#/',
		'http://www.w3.org/2000/01/rdf-schema#'
	];
	for (let vocabUrl of vocabUrls) {
		if (text.trim().indexOf(vocabUrl) === 0) {
			return [vocabUrl, `@${text.replace(vocabUrl,'')}`]
		}
	}
	for (let vocabPrefix in wellKnownVocab) {
		const vocabUrl = wellKnownVocab[(vocabPrefix as keyof typeof wellKnownVocab)];
		if (text.trim().indexOf(vocabUrl) === 0) {
			return [vocabUrl, text.replace(vocabUrl,'')]
		} else if (text.trim().indexOf(`${vocabPrefix}:`) === 0) {
			return [vocabUrl, text.replace(`${vocabPrefix}:`,'')]
		}
	}
  return ['', text];
}

const factory = create({ theme, i18nActivityPub }).properties<StructureProperties>();
export const Structure = factory(function structure({ middleware: { theme, i18nActivityPub }, properties}) {
	const themedCss = theme.classes(css);
	const {
		value,
		colors = [
			'deepOrange', 'deepPurple', 'cyan', 'brown', 'lime', 'blue', 'yellow', 'pink',
			'indigo', 'amber', 'lightGreen', 'lightBlue', 'purple', 'teal', 'blueGrey', 'green'
		]
	} = properties();
	if (is(value,'undefined')) { return '' }

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

	const nodes: RenderResult[] = [];
	const parse = (_key: string, v: any, level = 0, isArrayKey = false, _vocabUrl = '') => {
		const [vocabUrl, k] = splitPrefix(_key);
		console.log(vocabUrl, k);
		const t = is(v);
		if (t === 'object' || t === 'array') {
			// parse row for key
			parse(k, '', level, isArrayKey, vocabUrl);
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
			const vocabUrlO = !!(vocabUrl||_vocabUrl) ? {title: `${k}`} : {};
			nodes.push(
				<virtual>
					<dt {...vocabUrlO} classes={themedCss.breaked}></dt>
					<dt title={`${vocabUrl||_vocabUrl}${k}`} classes={[
						themedCss.predicate,
						isArrayKey && themedCss.index,
						theme.uiColor((colors as any)[colorI]),
						theme.variant()
					]} style={`--level: ${level}`}>
						{k}
					</dt>
					<dd classes={[themedCss.object, theme.uiColor((colors as any)[colorI]), theme.variant()]}>
						{t === 'undefined' ? '' : (t === 'NaN' ? 'NaN' : (t === 'null' ? 'null' : `${v}`))}
					</dd>
				</virtual>
			);
		}
	}

	// parse root
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

	return <dl classes={themedCss.root}>{...nodes}</dl>
});

export default Structure;
