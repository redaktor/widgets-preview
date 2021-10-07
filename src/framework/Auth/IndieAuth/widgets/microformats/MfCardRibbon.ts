import WidgetBase, { DNode, WidgetProperties } from '../../../../webcomponents/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';

export default class Ribbon extends WidgetBase<WidgetProperties> {

	protected render(): DNode {
		let {
			label = '',
			success = false,
			size = 'medium',
			align = 'right'
		} = this.properties;
		const color = this.properties.color || (!!success) ? 'green' : 'grey';
		const aligned = '.' + align;
		const children = (!!success ? [v('i.ui.checkmark.box.icon')] : []);
		if (!!success) {
			if (Array.isArray(label)) { label = (label.join(', ')+' ') }
			children.push(v('', [' '+label]));
		}
		return v(`div.ui.${color}${aligned}.ribbon.label`, this.properties, children);

	}
}
