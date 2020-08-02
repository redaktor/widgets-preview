import WidgetBase, { DNode, WidgetProperties } from '../../../../webcomponents/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';

export default class Svg extends WidgetBase<WidgetProperties> {
	protected render(): DNode {
		const {
			x = '0px', y = '0px',
			width = '40px', height = '40px',
			viewBox = '0 0 448 448',
			svg
		} = this.properties;
		let children: DNode[] = (!!svg) ? [] : [...this.children];
		let mySVG: DNode = (!svg && !!children.length) ? children[0] : svg;
		/* TODO console warn
		if viewBox has letters or
		if multiple children|children[0] is node */
		let vNode = v('svg', {
			xmlns: 'http://www.w3.org/2000/svg',
			'xmlns:xlink': 'http://www.w3.org/1999/xlink',
			version: '1.1',
			x: x,
			y: y,
			width: width,
			height: height,
			viewBox: viewBox,
			'enable-background': ('new ' + viewBox),
			'xml:space': 'preserve',
			innerHTML: mySVG
		});
//console.log('mySVG',mySVG);
//		if (mySVG) { (<any>vNode).innerHTML = mySVG; } // TODO FIXME
		return vNode;
	}
}
