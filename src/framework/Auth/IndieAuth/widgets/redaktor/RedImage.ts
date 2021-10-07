import WidgetBase from '../../../../../widgets/baseInput';
import { v } from '@dojo/framework/widget-core/d';

export type Sizes = 'mini'|'tiny'|'small'|'medium'|'large'|'big'|'huge'|'massive';
export type Aligns = 'top'|'middle'|'bottom';

export default class Image extends WidgetBase<any> {
	sizes: any = {mini:1,tiny:1,small:1,medium:1,large:1,big:1,huge:1,massive:1};
	aligns: any = {top:1,middle:1,bottom:1};
	protected render(): any {
		const {
			size = '',
			align = 'middle'
		} = this.properties;
		const sized = (!!this.sizes[size] ? ('.' + size) : '');
		const aligned = (!!this.aligns[align] ? '.' + align : '');
		return v(`img.ui.inline${aligned}.aligned${sized}.image`, this.properties);
	}
}
