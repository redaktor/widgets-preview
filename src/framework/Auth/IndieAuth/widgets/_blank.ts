import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/framework/widget-core/interfaces';
import { v } from '@dojo/framework/widget-core/d';

export default class X extends WidgetBase<WidgetProperties> {
	protected render(): DNode {
		const { X = '' } = this.properties;
		return v('', [

		]);
	}
}
