import WidgetBase, { DNode, WidgetProperties, theme } from '../../../../webcomponents/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';

export default class Login extends WidgetBase<WidgetProperties> {

	render(): DNode {
		const {
			client_id = '/',
			placeholder = 'yourdomain.com'
		} = this.properties;

		return v('div.ui.authLogin', [
			v('h3.ui.orange.header', ['Enter your Web Address:']),
			v('form.ui.labeled.action.input', [
				v('div.ui.label', [v('i.orange.text.icon.linkify'), 'http://']),
				v('input', {type: 'text', name: 'me', placeholder: placeholder}),
				v('input', {type: 'hidden', name: 'client_id', value: client_id}),
				v('button.ui.green.button', {type: 'submit'}, ['Sign In'])
			])
		]);
	}

}
