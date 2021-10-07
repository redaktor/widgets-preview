import { DNode, WidgetProperties } from '@dojo/framework/widget-core/interfaces';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { ThemeableMixin, ThemeableProperties, theme } from '@dojo/framework/widget-core/mixins/Themeable';
import { v, w } from '@dojo/framework/widget-core/d';

export interface MfDetailsProperties extends ThemeableProperties {
	icon?: string;
	title?: string;
	baseClass?: string;
	summary?: DNode;
}

export const DetailsBase = ThemeableMixin(WidgetBase);

export default class MfDetails extends DetailsBase<MfDetailsProperties> {
	protected render() {

		console.log('MfDetails', this.classes);

		const {
			icon,
			title = '',
			summary = '',
			summaryTag = 'div.strong.summary.blue.text',
			baseTag = 'label.ui.details'
		} = this.properties;
		let summaryChildren: DNode[] = (!!icon) ?
			[v('i', {class: icon}), ' ', summary] : [summary];
		const children: DNode[] = [
			v('input', {type: 'checkbox'}),
			v(summaryTag, summaryChildren)
		];
		console.log(this.children);
		return v('div', {title}, [v(baseTag, children.concat(this.children))])
	}
}
