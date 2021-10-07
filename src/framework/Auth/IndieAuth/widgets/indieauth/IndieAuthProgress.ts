import WidgetBase, { DNode, WidgetProperties, theme } from '../../../../webcomponents/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';

export default class Progress extends WidgetBase<WidgetProperties> {
	protected render(): DNode {
		const { providers = [] } = this.properties;
		return v('div.ui.equal.width.grid.authProgress', providers.map((p: any) => {
			return v('output.ui.column', { 'data-ref': (p.valid) ? p.url : 'link' },
				[v('div.ui.small.indicating.progress',[v('div.bar')])]
			);
		}));
	}
}
