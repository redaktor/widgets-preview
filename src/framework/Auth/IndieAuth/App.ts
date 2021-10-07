import { DNode, WidgetProperties } from '@dojo/framework/widget-core/interfaces';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import Progress from './widgets/indieauth/IndieAuthProgress';
import Login from './widgets/indieauth/IndieAuthLogin';
import Container from './widgets/indieauth/IndieAuthContainer';

export default class App extends WidgetBase<WidgetProperties> {

	render(): DNode {
		const providers = this.properties.me.data.best.providers;
		let w_IndieAuth = this.properties.me.statusCode < 0 ? Login : Container;

		return v('div', [
			w(Progress, {providers: Object.keys(providers).map(k => {
				return {valid: providers[k].valid, url: providers[k].url}
			})}),
			w(w_IndieAuth, this.properties)
		]);

	}
}
