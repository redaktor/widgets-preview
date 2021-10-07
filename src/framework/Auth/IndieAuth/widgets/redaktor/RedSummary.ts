import WidgetBase, { DNode, WidgetProperties, theme } from '../../../../webcomponents/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';

export interface MfDetailsProperties extends WidgetProperties {
	icon?: string;
	title?: string;
	baseClass?: string;
	summary?: DNode;
}

export default class MfDetails extends WidgetBase<MfDetailsProperties> {
	protected render() {

		console.log('MfDetails', this.properties);

		let {
			icon,
			title = '',
			summary = '',
			summaryTag = 'div.strong.summary.blue.text',
			baseTag = 'label.ui.details'
		} = this.properties;

		if (!!icon && !!icon.length) { icon += ' icon' }

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
