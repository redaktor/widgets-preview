import WidgetBase, { DNode, WidgetProperties, theme } from '../../../../webcomponents/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import uuid from '../../../../../dojo/core/uuid';
import { dataset } from '../../../../Template/components';
import Error from './IndieAuthError';
import SVG from '../redaktor/RedSvg';

export default class Providers extends WidgetBase<WidgetProperties> {

	protected render(): DNode {
		const {
			me = {}, client_id = {},
			headerNote = '', js = '', notSupported = '', date = ''
		} = this.properties;

		const providers = me.data.best.providers;
		const vColors = ['', 'green', 'green', 'orange', 'red', 'blue'];

		console.log('PROVIDERS0',Object.keys(providers))
		return v('section.ui.column.stackable.grid#auth', [
			v('article.sixteen.wide.column', [
				v('h4.ui.top.spaced.horizontal.header.green.divider.statusdivider', [
					v('small', [headerNote])
				]),
				v('noscript', [
					v('div.ui.tiny.bordered.raised.segment', [ v('h2.red.text', [js]) ])
				])
			]),
			v('span.sixteen.wide.column.indieauth.grid', Object.keys(providers).map((k: string) => {
				const p = providers[k];
				console.log('PROVIDERS',k,p)
				const isP = (!!p.valid && p.key);
				const isA = (!!isP && p.key === 'authorization_endpoint');
				const order = !!p.order ? p.order : (!!isP ? 4 : 5);
				const btnCl = ((order > 3) ? '.disabled.' : '.') + vColors[order];
				const vNode = `output.indieauth.${isP ? 'provider' : 'link'}`;
				return v(vNode, dataset({order: order, url: p.url, provider: p.key, title: p.title}), [
					v(`button.ui.large${btnCl}.button`, [
						v('div.ui.horizontal.segments', [
							v('div.ui.segment.site', (!!isP ? [
								v('div.ui.mini.image', {title: `${p.title}:${p.description}`}, [
									w(SVG, {svg: p.svg})
								]),
								v('span',['  ', p.display||'?'])
							] :
							[
								v('p.meta.blue.text', [v('i.minus.icon'), ' '+notSupported]),
								(!p.display) ? '' : p.display
							])),
							(!isP) ? '' : v('div.ui.inverted.segment.active.dimmer', [
								v('div.ui.indeterminate.loader', [v('i.exchange.icon.blue.text')])
							])
						])
					])
				]);
			}).concat(v('div.ui.center.aligned.grey.inverted.segment.indieauth.link', [
				v('p.serif.italic', [
					v('time', { title: date, datetime: date }, [date])
				])
			])))
		]);
	}
}
