import WidgetBase, { DNode, WidgetProperties } from '../../webcomponents/WidgetBase';
import uuid from '../../../dojo/core/uuid';
import { v, w } from '@dojo/framework/widget-core/d';
import Card from '../../webcomponents/redaktor/card/Card'; //'./widgets/microformats/MfCard';

export default class App extends WidgetBase<WidgetProperties> {

	render(): DNode {
		const { me = {} } = this.properties;

		return v('div.ui.container', [
			v('div.ui.cards', [
				w(Card, {
					locale: 'de',
					description: 'TEST',
					card: me.data.best.hCard.properties,
					type: me.data.best.hCard.type,
					representative: me.data.best.hCard.representative,
					key: uuid()
				}, me.data.best.hCard.children || [])
			])
		]);
	}
}
