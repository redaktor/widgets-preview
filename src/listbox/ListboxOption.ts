import { DNode, v, ThemedBase, ThemedProperties, theme } from '../commonOld/Widget';
import * as css from '../theme/material/listbox.m.css';

export interface ListboxOptionProperties extends ThemedProperties {
	active?: boolean;
	// classes?: (string | null)[];
	disabled?: boolean;
	id: string;
	index: number;
	label: DNode;
	option: any;
	selected?: boolean;
	onClick?(option: any, index: number, key?: string | number): void;
}

@theme(css)
export class ListboxOptionBase<P extends ListboxOptionProperties = ListboxOptionProperties> extends ThemedBase<P, null> {
	private _onClick(event: MouseEvent) {
		console.log(event)
		event.stopPropagation();
		const { index, key, option, onClick } = this.properties;
		onClick && onClick(option, index, key);
	}

	protected render(): DNode {
		const {
			id,
			label,
			// classes = [],
			disabled = false,
			selected = false
		} = this.properties;

/*
		return v('label', {
      //for: optionId,
      key: this._getOptionId(index),
      classes: this.theme(css.option)
    }, [
      v('input', {
        //id: optionId,
        type: multiple ? 'checkbox' : 'radio', // TODO FIXED CSS
        'aria-hidden': true,
        name: `${ widgetId }-listcontrol`,
        checked: index === activeIndex,
        onclick: (event: MouseEvent) => {
          console.log(event)
        //  event.stopPropagation();
          this._onOptionClick(option, index)
        }
      }),
      v('span', {
        classes: [
          this.theme(css.label),
          disabled ? this.theme(css.disabled) : null
        ]
      }, [this._getOptionLabel(option, index)])
		]);
	*/

		return v('label', {
			'aria-disabled': disabled ? 'true' : null,
			'aria-selected': disabled ? null : String(selected),
			// classes: this.theme(classes),
			id,
			role: 'option',
			onclick: this._onClick
		}, [ label ]);
	}
}

export default class ListboxOption extends ListboxOptionBase<ListboxOptionProperties> {}
