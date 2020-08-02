import WidgetBase from '../../../../../widgets/baseInput';
import { lang } from '../../../../../dojo/core/main';
import { v } from '@dojo/framework/widget-core/d';

export default class Url extends WidgetBase<any> {

	protected render(): any {
		const {
			href = '#',
			target = '_self',
			rel = 'nofollow',
		} = this.properties;
		let children: any[] = (!this.children.length) ? [href] : [...this.children];
		return v('a.item', lang.mixin({rel, target, href}, this.properties), children);
	}
}
