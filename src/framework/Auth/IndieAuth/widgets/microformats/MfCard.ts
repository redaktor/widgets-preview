import { v, w } from '@dojo/framework/widget-core/d';
import { lang } from '../../../../../dojo/core/main';
import uuid from '../../../../../dojo/core/uuid';

import WidgetBase, { DNode, WidgetProperties, theme } from '../../../../webcomponents/WidgetBase';
import { u_pExplode, dtExplode, /*eExplode,*/ addressObj } from './util';
import { monster, witch } from './svgs';
import Ribbon from './MfCardRibbon';
import NameHeader from './MfCardNameHeader';
import Image from '../redaktor/RedImage';
import Url from '../redaktor/RedUrl';
import Details from '../redaktor/RedDetails';

import bundle from './nls/common';

/* TODO FIXME -
better isSmall
.cardExtra .meta {
	display: inline-block;
	min-width: 52px;
}
*/

export default class Card extends WidgetBase<WidgetProperties> {
	/* TODO : this and h-x-app in own files ? */
	protected hOrg(o: any, isSmall = false, isOrg = false): DNode {
		if (!(o.org)) { return ''; }
		const children: DNode[] = o.org.map((_org: any): DNode => {
			if (_org.properties) {
				return w(Card, {
					card: _org.properties,
					locale: this.properties.locale,
					type: 'h-org', isSmall: true, isOrg: true, key: uuid()
				})
			} else {
				return v('span.grey.italic.serif.text.p-org', [_org])
			}
		});
		return v('div.p-org.org.extra.content', children);
	}

	protected avatar(o: any, isSmall = false, isOrg = false): DNode {
		let Avatar: DNode = v('i.ui.user.icon.right.floated', {
			style: (!!isOrg) ? 'margin-left: 1.8rem;' : ''
		});
		if (Array.isArray(o.photo) || Array.isArray(o.logo)) {
		 Avatar = w(Image, {
			 key: uuid(),
			 src: (!!(o.photo) ? o.photo[0] : o.logo[0]),
			 size: 'mini',
			 class: 'right floated'
		 })
		 // TODO : slideshow with ATTR. p-photo / p-logo
		} else if (!!(o.sex) && o.sex.toUpperCase() === 'M') {
		 Avatar = v('div.right.floated', [monster]);
		} else if (!!(o.sex)) {
		 Avatar = v('div.right.floated', [witch]);
		}
		return Avatar;
	}

	protected notes(o: any, isSmall = false, isOrg = false, caption = 'Notes'): DNode {
		let Notes: DNode = '';
		if (!!(o.note)) {
			// TODO ? 'lang="en-us"' -> lang.detect, hyphenated
			const notes = u_pExplode('note',o,'justified note small serif text','','p');
			if (!!notes.length) {
				const summary = v('span', (!!notes[0].children.length) ?
					[(notes[0].children[0].slice(0, 20)+' …')] : [caption]);
				Notes = w(Details, {
					key: uuid(),
					icon: 'idea',
					title: caption,
				}, notes.concat([v('br')]));
			}
		}
		return Notes;
	}

	protected orgs(o: any, isSmall = false, isOrg = false, caption = 'Organisations'): DNode {
		let Orgs: DNode = '';
		const isArr = Array.isArray(o.org);
		if (!(o.org)) { return Orgs; }
		if (!(isArr && o.org.length === 1 && typeof o.org[0] === 'string')) {
			const orgContent = (this.hOrg(o, isSmall))||((!isOrg) ? 'priv.' : '');
			const orgP = {key:uuid(), icon:'users', summary:caption, title:caption};
	    Orgs = w(Details, orgP, [orgContent, v('br')]);
		} // else only org string is under name already
		return Orgs;
	}

	protected contact(o: any, isSmall = false, isOrg = false, captions?: any): DNode {
	  if (!(o.tel) && !(o.email) && !(o.key) && !(o.impp)) { return ''; }

		/* TODO i18n c[1] :: */
	  const contactTypes = [['p-tel','tel','call'],['u-email','email','mail'],
	  	['u-key','key','privacy'],['u-impp','impp','talk']];
		const children: any = {summary: [], list: []};
		let cl: string = '', item: DNode = '';
		contactTypes.forEach((c) => {
	    if (o[c[1]]) {
				if (!Array.isArray(o[c[1]])) { o[c[1]] = [o[c[1]]]; }
				children.summary.push(v('i', {class: 'ui ' + c[2] + ' icon'}));
				children.summary.push(' ');
	      o[c[1]].forEach((val: string, i: number) => {
	        cl = ((i > 0) ? [c[1], 'header'] : [c[0], c[1], 'header']).join(' ');
					item = v('div.item', [
						v('span', {class: cl}, [
							v('i', {class: 'ui '+c[2]+' icon'}, [
								(i > 0) ? w(Url, {
									key: uuid(), href:val, class:('contact '+c[0]), title:c[1], target:'_blank'
								}) : val
							]),
							' '
						])
					]);
					children.list.push(item);
	      });
	    }
	  });
		// TODO : DETAILS :
		return v('div.extra.content.description', [
			v('label.ui.details', [
				v('input', {type: 'checkbox'}),
				v('span.summary.purple.text', children.summary),
				v('div.ui.list', children.list)
			])
		])
	}

	protected address(o: any, isSmall = false, isOrg = false, captions?: any): DNode {
		const children: DNode[] = [];
	  if (!!(o.adr)) {
	    o.adr.forEach((adr: any) => {
	      const myAddress = addressObj(adr);
	      if (!(myAddress.summary)) {
					children.push(w(Details, {
						key: uuid(),
						summaryTag: 'span.summary.purple.text',
						summary: v('div.ui.left.pointing.purple.basic.label', [
							v('i.ui.marker.icon'), ' ', myAddress.summary
						])
					}, [myAddress.details, v('br')]));
	      } else {
	        children.push(...[v('i.ui.marker.icon'), ' ', myAddress.details]);
	      }
	    });
	  } else {
	    /* TODO FIXME - we could parse address details or geo if any,
			also see openstreetmap in main and util */
	  }
		return v('div.extra.content.description', children);
	}

	protected categories(o: any, isSmall = false, isOrg = false, caption = 'Categories'): DNode {
		if (!!(o.category)) {
			const cats = u_pExplode('category',o,'ui tag label');
			return w(Details, {key: uuid(), icon: 'tags', summary: caption, title: caption}, cats);
		}
		return '';
	}

	protected urls(o: any, isSmall = false, isOrg = false, caption = 'URLs'): DNode {
		/* TODO FIXME APP
		if ((!!(p.url) && p.url.length > 1) || !(p.name)) {
	    const urls = upExplode('url',p,'item',' ','URLs');
	    _.append(el('div', 'ui narrow list extra content urls', urls+'<br/><br/>'));
	    if (Object.keys(rels).length) {
	      $('.list.extra.content.urls').each((i: number, elem: any) => {
	        const href = $(this).attr('href');
	        if (!!(href)) {
	          ['code-license','code-repository','content-license','content-repository'].forEach(type => {
	              if (!!(rels[type])) {
	                rels[type].forEach((_url: string) => {
	                  if (href === _url) {
	                    var v = type+': '+$(this).html();
	                    $(this).html(v);
	                  }
	                });
	              }
	          });
	        };
	      });
	    }
	  }
		*/
		if (!o.url || o.url.length < 2) { // name is linked with only url already
			return '';
		}
		if (!!(o.url)) {
			const urls = u_pExplode('url',o,'item',caption);
			console.log('urls', urls);
			return w(Details, {
				key: uuid(), icon: 'linkify', summary: caption, title: caption
			}, [v('div.ui.narrow.list.urls', urls), v('div')]);
		}
		return '';
	}

	protected extra(o: any, p: string, title = '', icon: DNode = '', isDT = false) {
		console.log('extra', title);
		if (icon !== '') { icon = v('i.ui.' + icon + '.icon') }
		const cl = (icon !== '') ? '' : 'header';
		const content = (!!isDT) ? dtExplode(p,o,cl,title) : u_pExplode(p,o,cl,title);
		content.push(v('br'));
		const eChildren: DNode[] = [icon, v('small.meta',[title]), ' '].concat(content);
		return v('span', eChildren);
	}

	protected extras(o: any, isSmall = false, isOrg = false, messages?: any): DNode {
		let Extras: DNode = '';
		// TODO if !!(o.bday) || !!(o.anniversary) is near make it red, if today blink
		const eO: any = {
			bday: [messages.bday, 'birthday', true],
			anniversary: [messages.anniversary, 'birthday', true],
			tz: [messages.tz, 'wait'],
			callsign: [messages.callsign, 'sound'],
			role: [messages.role, 'spy'],
			'job-title': [messages.jobTitle, 'spy']
		}
		const eChildren: DNode[] = [];
		let key: string;
		for (key in eO) {
			if (!!(o[key])) {
				eChildren.push(this.extra.apply(this, [o, key].concat(eO[key])))
			}
		}
		if (!!(o.responses)) {
			const responses = u_pExplode('responses', o, 'small note meta serif text');
			eChildren.push(w(Details, {
				key: uuid(),
				summaryTag: 'small',
				summary: messages.res,
				title: messages.res,
				icon: 'comments outline'
			}, responses));
		}
		return v('div.extra.content.cardExtra', eChildren);
	}


	protected render(): DNode {
		/* TODO for extends :
		classes : e.g. hCard h-card vcard
		hApp h-x-app
		*/
		const messages = this.localizeBundle(bundle);

		const {
			representative = false,
			isSmall = false,
			isOrg = false,
			type = ['']
		} = this.properties;

		const o = (!!this.properties.card) ? this.properties.card : this.properties;
		/* TODO - instead of `card`, `url` can be specified  : this.properties.url*/
		const ribbonLabel = (!!representative) ? messages.representative : ' ';

		let Children: DNode[] = [];
		if (!!(this.children) && !!this.children.length) {
			Children.push(
				v('div.extra.content', [v('i.child.icon')].concat(
					this.children.reduce((a: any, c: any): DNode[] => {
						if (c.value) { a.push(v('small', [c.value])); }
						a.push(v('br'));
						a.push(w(Card, {
							card: c.properties,
							locale: this.properties.locale,
							type: c.type,
							key: uuid()
						}, c.children||[]));
						return a;
					}, [])
				))
			);
		}

		return v('div.ui.fluid.card', [
			w(Ribbon, {label:(ribbonLabel+' '+type), success:representative, key:uuid()}),
			/* TODO NameHeader : ((type === '') ? 'priv.' : '')))||'anonymous' */
			v('div.content', [
				this.avatar(o, isSmall, isOrg),
				w(NameHeader, o),
				this.notes(o, isSmall, isOrg, messages.note),
				this.orgs(o, isSmall, isOrg, messages.org),
				this.contact(o, isSmall, isOrg, messages),
				this.address(o, isSmall, isOrg, messages),
				this.categories(o, isSmall, isOrg, messages.cat),
				this.urls(o, isSmall, isOrg, messages.url),
				this.extras(o, isSmall, isOrg, messages)
			]),
			v('div.extra.content', Children)
		]);
	}
}
