import WidgetBase, { DNode, WidgetProperties, theme } from '../../../../webcomponents/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';

export interface MfDetailsProperties extends WidgetProperties {
	icon?: string;
	title?: string;
	baseClass?: string;
	summary?: DNode;
}

function _textContent(children: DNode[]) {
	return children.filter((child) => typeof child === 'string');
}
function textContent(nodeOrChildren: DNode|DNode[]) {
	let results: string[] = [];
	if (typeof nodeOrChildren === 'string') {
		results.push(nodeOrChildren);
	} else if (Array.isArray(nodeOrChildren)) {
		
	} else if (typeof nodeOrChildren === 'object') {

	}
	return results.join('')
}

export default class MfDetails extends WidgetBase<MfDetailsProperties> {
	protected render() {

		console.log('MfDetails', this.properties);

		let {
			icon,
			title = '',
			summary = false,
			summaryTag = 'div.strong.summary.blue.text',
			baseTag = 'label.ui.details'
		} = this.properties;

		if (!!icon && !!icon.length) { icon += ' icon' }
		if (typeof summary !== 'string') {
			console.log('this.children', this.children)
			console.log('textContent', this.children.filter((child) => typeof child === 'string'));
			summary = 'TEST'
		}

		let classes = (!!this.properties.summaryCount) ?
			'summarized' : (this.properties.class||'default');
		console.log('classes',classes)

		let summaryChildren: DNode[] = (!!icon) ?
			[v('i', {class: icon}), ' ', summary] : [summary];
		const children: DNode[] = [
			v('input', {type: 'checkbox'}),
			v(summaryTag, summaryChildren)
		];
		console.log(this.children);

		return v('div', {title}, [v(baseTag, {class: classes}, children.concat(this.children))])
	}
}
