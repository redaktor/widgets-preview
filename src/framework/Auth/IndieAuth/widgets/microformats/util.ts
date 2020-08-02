import { DNode } from '@dojo/framework/widget-core/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import { lang } from '../../../../../dojo/core/main';
import Image from '../redaktor/RedImage';
import Url from '../redaktor/RedUrl';

export function displayUrl(_url: string, relUrls?: any) {
  /* TODO FIXME - if !!(relUrls) use .title, .text, .url */
  return _url.replace(/https?:[/][/]/gi, '').replace(/[/]$/gi, '').trim();
}

/*
  TODO :
  e- : eExplode including sanitizing
*/

// dt- : 'explode' the parts -->
export function dtExplode(type: string, props:any, baseClass = '', title?: string, suffix = '', _el = 'time') {
  if (baseClass !== '') { baseClass = ' '+baseClass; }
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return props[type].map((dt: string) => v(_el, {class: 'dt-'+type+baseClass, title: dt, datetime: dt}, [
		(<any>new Date(dt)).toLocaleDateString('en-us', options)
	]));
}


/*
TODO : becomes widgets
*/
function imgNode(photo: string) {
  return v('img', {class: "img ui inline mini image right floated", src: photo})
}
function urlNode(href: string, cssClass: string, title: string, children: any[]) {
  return v('a', {class: 'item ${cssClass}', target: '_blank', href, title}, children);
}




// u-, p- : 'explode' the parts -->
//upExplode('url',p,'item',' ','URLs');
export function u_pExplode(type: string, props:any, baseClass = '', title?: string, _el = 'span') {
  console.log('u_p', type, props, baseClass, title)
  if (baseClass !== '') { baseClass = ' '+baseClass; }
  return props[type].map((part: any): DNode => {
    if (typeof part === 'object' && part.hasOwnProperty('properties') && Array.isArray(part.properties.url)) {
      const _namePart = (part.properties.name||part.properties.url);
      let children: DNode[] = [];
      if (!!(part.properties.photo) || !!(part.properties.logo)) {
				const photo = part.properties[!!(part.properties.photo) ? 'photo' : 'logo'][0];
        children = [
          v('span', [
  					_namePart,
  					imgNode(photo)
          ]
				)]
      } else {
        children = [part.properties.name||part.properties.url];
      }
      return urlNode(part.properties.url, 'u-'+type+baseClass, title||'', children);
    } else if (typeof part === 'string' && type === 'url') {
      return urlNode(part, 'u-'+type+baseClass, title||'', [part]);
    } else if (typeof part === 'string') {
			return v(_el, {class: 'p-'+type+baseClass, title: title}, [part]);
    } else if (typeof part === 'object') {
			return v(_el, {class: 'p-'+type+baseClass, title: title}, [JSON.stringify(part)]);
    }
    return '';
  });
}
// GEO ARRAY
export function geoArray(o: any) {
  let geo: string[];
  if (typeof o === 'string') {
    geo = o.replace('geo:', '').split(',');
  } else {
    geo = [o.latitude[0],o.longitude[0]];
    geo.push((!!(o.altitude)) ? o.altitude[0] : NaN);
  }
  if (isNaN(parseFloat(geo[0])) || isNaN(parseFloat(geo[1]))) {
    return [];
  }
  return geo;
}
// card ADDRESS portion -->
export function addressObj(adr: any) {
  if (!(adr)) { return ''; }
  const o: any = { label: adr, geoFull: '', summary: '', details: '' };
  const children: DNode[] = [];
  if (typeof adr === 'string') {
    return lang.mixin(o, {details: v('span.item.p-adr', [adr])});
  } else if (typeof adr !== 'object' || !(adr.properties)) {
    return '';
  }
  const p = adr.properties;
  const aps = ['post-office-box','extended-address','street-address','locality',
              'postal-code','region','country-name'];

  const allAps = aps.concat(['adr','label','geo','latitude','longitude']);
  if (!(allAps.filter((s: string) => p.hasOwnProperty(s)).length)) { return ''; }

  if (Array.isArray(p.name) && Array.isArray(p.label) && p.label[0].length < p.name[0].length) {
    lang.mixin(o, {label: p.name[0], summary: p.label[0]});
  } else {
    lang.mixin(o, {label: p.label[0], summary: p.name[0]})
  }
  const pL = aps.map((type) => {
    let c = (type === 'postal-code') ? 'header' : 'description';
    children.push(u_pExplode(type, p, c));
    return (Array.isArray(p[type]) ? p[type][0] + ', ' : '');
  }).join(', ');

  lang.mixin(o, { details: v('address.ui.narrow.list', children) },
    ((pL.length > o.label.length) ? { label: pL } : {}));

  let geo: string[] = [];
  if (!!(p.latitude) && !!(p.longitude)) {
    geo = geoArray(p);
  } else if (Array.isArray(p.geo) && p.geo[0].properties) {
    geo = geoArray(p.geo[0].properties);
  } else if (Array.isArray(p.geo)) {
    geo = geoArray(p.geo[0]);
  }
  if (!!geo) {lang.mixin(o, {label:geo.slice(0,2).join(','), geoFull:geo.join(',')});}
  return o;
}
/*
export function openstreetmap(mapLabel: string, geoStr = '') {
  // TODO - serverside rendering is no problem but involves the geocoding request to nominatim
  const noJS = '<noscript><i class="red map icon"></i> Enable JavaScript for maps</noscript>';
  const $ = node('span', '', noJS);
  const _ = $(':root');
  // TODO - serverside rendering, see assets/osm.js
  if (geoStr != '') { _.append(el('small','p-geo',('geo:'+geoStr))); }
  _.append(el('i','ui map icon'), el('div','osm map',mapLabel));
  return $.html();
}
*/
