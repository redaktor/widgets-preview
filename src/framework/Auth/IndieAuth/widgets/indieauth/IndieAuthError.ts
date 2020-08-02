import WidgetBase, { DNode, WidgetProperties, theme } from '../../../../webcomponents/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';

export default class Error extends WidgetBase<WidgetProperties> {
	protected render(): DNode {
		const { me = {}, client_id = {}, statusCode = 0 } = this.properties;
		const containerStr = 'div.ui.container.meContainer';
		if (statusCode === 0) {
			return v(containerStr, [
				v('h5.red.text', ['{{error}}, {{noRes}}.']),
				v('p.red.text', ['{{statusMessage}}'])
			]);
		} else if (me.statusCode !== 200) {
			return v(containerStr, [
				v('h5.red.text', ['{{noRes}}']),
				v('p.red.text', ['{{me.statusCode}} ', '– {{me.statusMessage|safe}}'])
			]);
		} else {
			return v(containerStr, [
				v('h5.red.text', ['{{unknown}}']),
				v('p.red.text', ['{{me.statusCode}} ', '– {{me.statusMessage|safe}}'])
			]);
		}
	}
}
