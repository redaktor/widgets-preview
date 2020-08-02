import WidgetBase, { DNode, WidgetProperties } from '../../../../webcomponents/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import uuid from '../../../../../dojo/core/uuid';
import Img from '../redaktor/RedImage';
import Url from '../redaktor/RedUrl';

export default class SiteInfo extends WidgetBase<WidgetProperties> {
	protected render(): DNode {
		let o = this.properties;
		if (!(o) || typeof o != 'object' || (!(o.best) && !(o.url))) { o = {best:{}, url: ''} }
		const t = o.best.title;
		const infoChildren: DNode[] = [];
		if (!!(o.best.icon)) {
			infoChildren.push(w(Img, {src: o.best.icon, class: 'icon', key: uuid()}));
			infoChildren.push('  ');
		}
		(!!(o.url) && infoChildren.push(w(Url, {href: o.url, title: t, target: '_blank'})));
		return v('span', infoChildren);
	}
}
