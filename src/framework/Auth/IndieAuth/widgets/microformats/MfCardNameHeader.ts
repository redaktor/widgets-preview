import WidgetBase, { DNode, WidgetProperties } from '../../../../webcomponents/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import Url from '../redaktor/RedUrl';
import { u_pExplode } from './util';

export default class NameHeader extends WidgetBase<WidgetProperties> {

	protected render(): DNode {
		const nps = ['honorific-prefix','given-name','additional-name','family-name','honorific-suffix'];
		const { url, name, org, nickname, isOrg = false } = this.properties;
		let type: string;
		const p = this.properties;
		const children: DNode[] = [];

		if (Array.isArray(url) && url.length === 1 && !!name) {
			children.push(w(Url, {
				href: url[0],
				class: 'p-name u-url fn url right floated',
				target: '_blank',
				title: 'name',
				style: 'max-width: calc(100% - 2.7rem - 1em);'
			}, [(Array.isArray(name) && !!name.length) ? name[0] : url[0]]))
	  } else if (!isOrg &&Array.isArray(name)) {
			children.push(v('span.p-name', name))
	  } else if (p[nps[0]] || p[nps[1]] || p[nps[2]] || p[nps[3]] || p[nps[4]]) {
	    nps.forEach((type) => children.push(u_pExplode(type, p)));
		} else {
	    type = 'org';
			children.push(v('span.p-org.org.grey.text', [!!(p.org) ? p.org[0] : 'Name']));
	  }
	  if (type !== 'org' && Array.isArray(p.org) && p.org.length === 1 && typeof p.org[0] === 'string') {
			children.push(v('span.p-org.org.grey.text', [p.org[0]]));
	  }

		return v('h3.header', children);
	}
}
