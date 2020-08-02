import WidgetBase, { DNode, WidgetProperties, theme } from '../../../../webcomponents/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { lang } from '../../../../../dojo/core/main';
import uuid from '../../../../../dojo/core/uuid';
import SiteInfo from '../microformats/MfCardSiteInfo';
import Card from '../microformats/MfCard';
import Error from './IndieAuthError';
import Providers from './IndieAuthProviders';

export default class Container extends WidgetBase<WidgetProperties> {

	render(): DNode {
		const {
			me = {}, client_id = {}, statusCode = 0,
			_as = 'as', _to = 'to', mfs = '', error = '', cardHeader = ''
		} = this.properties;
		const providers = me.data.best.providers;

		let mfLabel = v('h5.summary.grey.text', [
			v('img.ui.mini.image', {src: 'img/logoMicroformats.svg'}, [
				'&nbsp;  ',
				v('small.grey.serif.text', [ v('em', [mfs]) ])
			])
		]);
		// The "Login as / to Header" with microformats
		let steps = {
			as: [
				/* site info for 'me' */
				(!me.data ? '' :
				v('output.me.site.title', {'data-ref': me.data.url}, [
					w(SiteInfo, lang.mixin(me.data, {key: uuid()}))
				])),
				((!me.data.best.hCard) ? '' :
				v('output.left.aligned.container', {
					'data-ref': `${me.data.url}#${me.data.best.hCard['$ref']}`
				}, [
					/* TODO : widget redaktor.Details : */
				  v('div.mf.description', [
				    v('label.ui.details', [
				      v('input', {type: 'checkbox'}),
			        mfLabel,
							/* representative h-card for 'me' */
							w(Card, {
								locale: 'de',
								card: me.data.best.hCard.properties,
								type: me.data.best.hCard.type,
								representative: me.data.best.hCard.representative,
								key: uuid()
							}, me.data.best.hCard.children || [])
				    ])
				  ])
				]))
			],
			to: [
				/* site info for 'client_id' */
				(!client_id.data ? '' :
				v('output.client_id.site.title', {'data-ref': client_id.data.url}, [
					w(SiteInfo, lang.mixin(client_id.data, {key: uuid()}))
				])),
				((!client_id.data.best.hXApp) ? '' :
				v('output.left.aligned.container', {
					'data-ref': `${client_id.data.url}#${client_id.data.best.hXApp['$ref']}`
				}, [
					/* TODO : widget redaktor.Details : */
				  v('div.mf.description', [
				    v('label.ui.details', [
							v('input', {type: 'checkbox'}),
			        mfLabel,
							/* representative h-x-app for 'client_id' */
							w(Card, {
								locale: 'de',
								card: client_id.data.best.hXApp.properties,
								type: client_id.data.best.hXApp.type,
								representative: client_id.data.best.hXApp.representative,
								key: uuid()
							}, client_id.data.best.hXApp.children || [])
			      ])
				  ])
				]))
			]
		};
		const meError = ((me.statusCode !== 200 || !me.data.best) && [
			v('b.ui.top.left.attached.label.red.large', ['“me”', error]),
			w(Error, this.properties)
		]);
		return v('div.ui.inverted.vertical.grey.segment', [
			v('div.ui.text.container', [
				v('div.ui.top.green.label.signin', [ v('b', [cardHeader]) ]),
				v('div.ui.two.steps', [
					v('div.step.as', (!!meError ? meError : [
						v('b.ui.top.left.attached.green.label', [_as]),
						v('div.ui.container.meContainer', steps.as)
					])),
					v('div.step.to', [
						v('b.ui.top.right.attached.green.label', [_to]),
						v('div.ui.container.clientIdContainer', steps.to)
					])
				]),
				w(Providers, this.properties)
			])
		]);
	}
}
