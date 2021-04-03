import {
  CustomAriaProperties, LabeledProperties, RedaktorProperties, RedaktorCSS, RedaktorStyleCSS
} from '../common/interfaces';
import { FocusMixin, FocusProperties } from '@dojo/framework/core/mixins/Focus';
import { DNode, v, w, Dimensions, theme, customElement } from '../commonOld/Widget';
import { LabeledBase } from '../commonOld/WidgetLabeled';
import { formatAriaProperties, keyName } from '../commonOld/util';
import { reference } from '@dojo/framework/core/diff';
import { diffProperty } from '@dojo/framework/core/decorators/diffProperty';
import MetaBase from '@dojo/framework/core/meta/Base';
import { Focus } from '@dojo/framework/core/meta/Focus';
import { Intersection } from '@dojo/framework/core/meta/Intersection';
// import uuid from '../../framework/uuid';
import * as css from '../theme/material/listbox.m.css';
export enum Operation { increase = 1, decrease = -1 }
/*
monitor datalist support
IE	   FIREFOX	CHROME	SAFARI	OPERA
10.0+	 4.0+	    20.0+	  –	      9.0+
*/

/**
 * @type ListboxProperties
 *
 * Properties that can be set on a Listbox component
 *
 * @property activeIndex          Index of the currently active listbox option
 * @property getOptionLabel       Function to return string label based on option data
 * @property getOptionDisabled    Function that accepts option data and returns a boolean for disabled/not disabled
 * @property getOptionId          Function that accepts option data and returns a string ID
 * @property getOptionSelected    Function that accepts option data and returns a boolean for selected/unselected
 * @property widgetId             Optional custom id for the root node of the listbox
 * @property focus                Indicates if the listbox needs focusing
 * @property multiple             Adds correct semantics for a multiselect listbox
 * @property optionData           Array of data for listbox options
 * @property tabIndex             Listbox is in the focus order by default, but setting tabIndex: -1 will remove it
 * @property visualFocus          When controlling Listbox through an outside widget, e.g. in ComboBox, visualFocus mimics visual focus styling when true
 * @property onActiveIndexChange  Called with the index of the new requested active descendant
 * @property onOptionSelect       Called with the option data of the new requested selected item
 */

export interface ListboxProperties extends
RedaktorProperties, CustomAriaProperties, FocusProperties, LabeledProperties {
  /* TODO goes to main / RedaktorCSS */
  animated?: boolean;
  /* <-- */
	activeIndex?: number | number[];
  autoOpen?: boolean;
  autoOrder?: boolean;
  bottom?: boolean;
  closed?: boolean;
  multiple?: boolean;
  muted?: boolean;
  optionData?: any[];
  raised?: boolean;
  scroll?: boolean | number;
  tabIndex?: number;
  useNativeElement?: boolean; /* TODO FIXME */
  visualFocus?: boolean;
  widgetId?: string;

  _opening?: boolean;

	getOptionDisabled?(option: any, index: number): boolean;
	getOptionId?(option: any, index: number): string;
	getOptionLabel?(option: any, index: number): DNode;
	getOptionSelected?(option: any, index: number): boolean;

	onActiveIndexChange?(index: number, key?: string | number): void;
  onOptionSelect?(index: number, key?: string | number): void;
	onKeyDown?(event: KeyboardEvent, key?: string | number): void;
	onBlur?(key?: string | number): void;
	onFocus?(key?: string | number): void;
}

@theme(css)
@diffProperty('optionData', reference)
@customElement<ListboxProperties>({
	tag: 'redaktor-listbox',
	properties: [
		'activeIndex',
		'focus',
		'multiple',
    'raised',
		'tabIndex',
		'visualFocus',
		'optionData',
		'getOptionDisabled',
		'getOptionId',
		'getOptionLabel',
		'getOptionSelected'
	],
	attributes: [
		'widgetId'
	],
	events: [
		'onActiveIndexChange',
		'onOptionSelect',
		'onKeyDown',
		'onFocus',
		'onBlur'
	]
})
export class ListboxBase<P extends ListboxProperties = ListboxProperties> extends FocusMixin(LabeledBase)<P> {
	private _boundRenderOption = this.renderOption.bind(this);
  private _selected: Set<number> = new Set();
	private _idBase = `l${Date.now()}`// uuid();
  private _bottom = false;

  private _activeIndex = -1;


	private _getOptionDisabled(option: any, index: number) {
		const { getOptionDisabled } = this.properties;
		return getOptionDisabled ? getOptionDisabled(option, index) : option.disabled || false;
	}

	private _getOptionId(index: number = this._activeIndex): string | undefined {
		const { optionData = [], getOptionId } = this.properties;
		return getOptionId ? getOptionId(optionData[index], index) :
      typeof index === 'number' ? `${this._idBase}-${index}` : undefined;
	}
  // KEYBOARD NAVIGATION
  private _moveActiveIndex(operation: Operation) {
    const {
      key, onActiveIndexChange, widgetId = this._idBase, optionData = []
    } = this.properties;
    const total = optionData.length;
    const nextIndex = ((this._activeIndex) + operation + total) % total;
    if (this._selected.has(nextIndex)) {
      this._activeIndex = nextIndex;
      this._moveActiveIndex(operation)
    } else {
      this._activeIndex = nextIndex;
      // this.meta(Focus).set(`${widgetId}-option-${nextIndex}`);
      onActiveIndexChange ? onActiveIndexChange && onActiveIndexChange(nextIndex, key) :
        this.invalidate();
    }
  }
	protected _onKeyDown(event: KeyboardEvent) {
    event.preventDefault();
		event.stopPropagation();
		const {
      key, optionData = [], onActiveIndexChange, onOptionSelect, onKeyDown
		} = this.properties;
    if (!optionData.length) {
      this._activeIndex = -1;
      this.invalidate();
      return;
    } else if (this._activeIndex < 0) {
      this._activeIndex = 0;
      this.invalidate();
      return;
    }

		onKeyDown && onKeyDown(event, key);
    const pressed = keyName(event);
		const activeItem = optionData[this._activeIndex];

		switch (pressed) {
			case 'ArrowUp':
        this._moveActiveIndex(Operation.decrease);
				break;
			case 'ArrowDown':
        this._moveActiveIndex(Operation.increase);
				break;
			case 'Home':
        this._activeIndex = 0;
        // this.meta(Focus).set(`${widgetId}-option-0`);
				onActiveIndexChange ? onActiveIndexChange && onActiveIndexChange(0, key) :
          this.invalidate();
				break;
			case 'End':
        this._activeIndex = optionData.length - 1;
        // this.meta(Focus).set(`${widgetId}-option-${this._activeIndex}`);
				onActiveIndexChange ? onActiveIndexChange(this._activeIndex, key) :
          this.invalidate();
				break;
			case 'Enter':
			case ' ':
				if (!this._getOptionDisabled(activeItem, this._activeIndex)) {
          this.select();
					onOptionSelect && onOptionSelect(this._activeIndex, key);
				}
				break;
		}
	}

	private _onOptionClick(option: any, index: number, key?: string | number) {
		const { onActiveIndexChange, onOptionSelect, multiple = false } = this.properties;
		if (!this._getOptionDisabled(option, index)) {
      this.select(index);
			onActiveIndexChange && onActiveIndexChange(index, key);
			onOptionSelect && onOptionSelect(index, key);
		}
    const { active } = this.meta(Focus).get('root');
    if (!active || !multiple) {
      this.meta(Focus).set('root');
    }
    if (active && !multiple) {
      ("activeElement" in document) && (<any>document).activeElement.blur();
    }
	}
  private _getOptionLabel(option: any, index: number) {
    const { getOptionLabel } = this.properties;
    return getOptionLabel ? getOptionLabel(option, index) : (typeof option !== 'object' ?
      `${option}` : (typeof option.label === 'string' ? option.label : (
        typeof option.value === 'string' ? option.value : ''
      )));
  }

  protected select(index: number = this._activeIndex) {
    const { multiple = false } = this.properties;
    if (multiple) {
      this._selected[this._selected.has(index) ? 'delete' : 'add'](index)
    } else {
      this._selected.clear();
      this._selected.add(index);
    }
    this._activeIndex = -1;
    this.invalidate()
  }

	protected renderOption(a: any[], option: any, index: number): DNode[] {
		const {
      autoOpen = true, widgetId = this._idBase, multiple = false,
      required = false, getOptionSelected, theme
		} = this.properties;
		const disabled = this._getOptionDisabled(option, index);
		const checked = getOptionSelected ? getOptionSelected(option, index) :
      this._selected.has(index);
    const selected = index === this._activeIndex;
    const firstChecked = Math.min(...this._selected) === index;
    const id = this._getOptionId(index);
    const label = this._getOptionLabel(option, index);

    a.push(v('input', {
      id,
      key: `${widgetId}-optioncontrol-${index}`,
      // TODO better naming & multple different names :
      name: `${widgetId}-optioncontrol${multiple ? index : ''}`,
      type: multiple ? 'checkbox' : 'radio', // TODO FIXED CSS
      'aria-hidden': true,
      classes: [ checked ? this.theme(css.selected) : null ],
      onchange: (event: MouseEvent) => {
        event.stopPropagation();
        this._onOptionClick(option, index);
      },
      value: `${index}`, // TODO FIXME
      checked
    }));
    a.push(v('label', {
      for: id,
      key: `${widgetId}-option-${index}`,
      role: 'option',
      classes: [
        this.theme(css.option),
        firstChecked ? this.theme(css.first) : null,
        disabled ? this.theme(css.disabled) : null,
        selected ? css.selected : null
      ],
      onclick: (event: MouseEvent) => {
        if (this._selected.has(index)) {
          // TODO
          this._onOptionClick(option, index);
        }
      }
    }, [label]))

		return a
	}

	protected renderOptions(): DNode[] {
		const { widgetId = this._idBase, optionData = [], autoOrder = true } = this.properties;

    const options = optionData.reduce(this._boundRenderOption, []);;
		return options.concat((!autoOrder ? [] : [
      v('div', {
        key: `${widgetId}-optionborder`,
        classes: this.theme(css.border), innerHTML: '&nbsp;',
        style: this.borderStyle()
      })
    ]));
	}

  protected renderCustomSelect(): DNode {
		const {
      focus, visualFocus, aria = {}, widgetId = this._idBase,
			disabled = false, multiple = false, optionData = [], label, tabIndex = 0
		} = this.properties;
    /*
    if (this._focusedIndex === undefined) {
			options.map(getOptionSelected).forEach((isSelected, index) => {
				if (isSelected) {
					this._focusedIndex = index;
				}
			});
		}
    */
    return v('div', {
      widgetId,
      key: 'options',
      role: 'listbox',
      // tabIndex, // TODO FIXME
      ...formatAriaProperties(aria),
      'aria-activedescendant': this._getOptionId(),
      'aria-multiselectable': multiple ? 'true' : null, /* TODO */
      classes: [
        ...this.theme([
          css.options
          /*visualFocus ? css.open : null,*/ /* TODO */
        ]),
        ...this.getSchemaClasses(css)
      ]
    }, this.renderOptions());
    /* TODO ??? */
    /*
    'aria-invalid': invalid ? 'true' : null,
    'aria-readonly': readOnly ? 'true' : null,
    tabIndex: _open ? 0 : -1,

    getOptionDisabled,
    getOptionId,
    getOptionLabel,
    getOptionSelected,
    onfocusout: this._onListboxBlur
    onActiveIndexChange: (index: number) => {
        this._focusedIndex = index;
        this.invalidate();
      },
      onOptionSelect: (option: any) => {
        onChange && onChange(option, key);
        this._closeSelect();
        this.focus();
      },
      onKeyDown: (event: KeyboardEvent) => {
        const index = this._getSelectedIndexOnInput(event);
        if (index !== undefined) {
          this._focusedIndex = index;
          this.invalidate();
        }
      }
    */
  }

  protected renderNativeSelect(): DNode {
    return v('p', ['TODO']) /* TODO FIXME */
  }

  protected _getRootClasses(ui: RedaktorCSS & RedaktorStyleCSS = css): (string | null)[] {
    const {
      responsive = false, raised = false, readOnly = false, required = false,
      autoOrder = true, autoOpen = true, closed = false, muted = false,
      multiple = false, scroll = true, animated = true, _opening = false, helperText
    } = this.properties;

    const focus = this.meta(Focus).get('root');
    return [
      ui.root,
      this.getDisabledClass(ui),
      this.getValidClass(ui),
      ...this.getStyleClasses(ui),
      focus.containsFocus ? ui.focused : null,
      responsive === true ? ui.responsive : null,
      raised === true ? css.raised : null,
      readOnly === true ? css.readonly : null,
      required === true ? ui.required : null,
      animated === true ? css.animated : null,
      muted === true ? css.muted : null,
      !!scroll ? css.scroll : css.noscroll,
      !!helperText ? css.hasHelperText : css.noHelperText,
      autoOrder === true ? css.autoOrder : css.fixedOrder,
      autoOpen === true ? css.expandable : css.expanded,
      closed === true ? css.closed : css.open,
      multiple === true ? css.multi : css.single,
      autoOpen === false && _opening === true ? css.opening : null
    ];
  }
  protected getRootClasses(): (string | null)[] { return this._getRootClasses() }

	protected render(): DNode {
    /* // TODO:
    autoOrder Default
    ComboBox MUST set label on Input but helperText on Listbox !!!
    */
    const {
      autoOpen = true, optionData = [], scroll = true, tabIndex = 0,
      multiple = false, useNativeElement = false, activeIndex = -1,
      bottom = false, onFocus, onBlur
    } = this.properties;
    const scrollMin = typeof scroll === 'boolean' ? (scroll ? 7 : 0) :
      (typeof scroll === 'number' ? Math.max(scroll, 3) : 7);

    const indices = Array.isArray(activeIndex) ? activeIndex : [activeIndex];
    if (!this._selected) {
      this._selected = new Set(indices.filter((i) => i > -1));
    }
    /*
    if (multiple || (!multiple && this._activeIndex < 0)) {
      this._activeIndex = indices[0];
    }
    */
    return v('div', {
      key: 'root',
      style: !!scrollMin && scrollMin !== 7 ? `--lines: ${scrollMin};` : null,
      classes: [
        ...this.theme([
          ...this.getRootClasses(),
          bottom === true || this._bottom === true ? css.bottom : css.top
        ]),
        ...this.getSizeClasses(),
        ...this.getSchemaClasses(css, true)
      ],
      tabIndex,
      focus: this.shouldFocus,
      onkeydown: this._onKeyDown,
      onfocus: () => {
        if (autoOpen) {
          const _offset = !!scroll ? 0 : this.meta(Dimensions).get('options').offset.height + 16;
          setTimeout(() => {
            const { position, offset: rootOffset } = this.meta(Dimensions).get('root');
            const { offset } = this.meta(Dimensions).get('options');
            let isBottom = (position.top + offset.height) > window.innerHeight;

            const scrollHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight,
                   document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );

            if (isBottom && scrollHeight > scrollY + (position.top + offset.height)) {
              // console.log(scrollHeight, scrollY + (position.top + offset.height), offset.height);
              isBottom = false;
              window.scrollBy({
                top: Math.round(offset.height - (window.innerHeight - position.top) + _offset),
                left: 0,
                behavior: 'smooth'
              });
            }
            if (this._bottom !== isBottom) {
              this._bottom = isBottom;
              this.invalidate();
            }
          })
        }
        onFocus && onFocus(this.properties.key || '');
        // TODO this.onFocus
      },
      onblur: () => onBlur && onBlur(this.properties.key || '')
    }, [
      this.renderLabel(true, false),
			useNativeElement ? this.renderNativeSelect() : this.renderCustomSelect(),
			this.renderHelperText()
    ]);
	}


  protected borderStyle(): string | null {
		const {
      widgetId = this._idBase, optionData = [], autoOpen = true, autoOrder = true,
      required = false, multiple = false, scroll = true
    } = this.properties;
    const oId = `${widgetId}-option-`;
    let topHeight = 0;
    if (required && multiple && !this._selected.size) {
      return `top: var(--ui-border-width-emphasized);`
    } else if (scroll || (!multiple && !autoOpen)) {
      const curDim = this.meta(Dimensions).get(`${widgetId}-option-${Math.min(...this._selected)}`);
      topHeight = curDim.offset.height;
      return `top: ${topHeight}px;`
    } else if (multiple) {
      for (let index of this._selected) {
        const curDim = this.meta(Dimensions).get(`${widgetId}-option-${index}`);
        topHeight += curDim.offset.height;
      }
      return `top: ${topHeight}px;`
    }
    return null
  }
  /*
  protected animateScroll(scrollValue: number) {
    this.meta(ScrollMeta).scroll('options', scrollValue);
  }
  @diffProperty('activeIndex', auto)
  protected calculateScroll(previousProperties: ListboxProperties, { activeIndex = 0 }: ListboxProperties) {
    const menuDimensions = this.meta(Dimensions).get('options');
    const scrollOffset = menuDimensions.scroll.top;
    const menuHeight = menuDimensions.offset.height;
    const optionOffset = this.meta(Dimensions).get(this._getOptionId(activeIndex)).offset;

    if (optionOffset.top - scrollOffset < 0) {
      this.animateScroll(optionOffset.top);
    }

    else if ((optionOffset.top + optionOffset.height) > (scrollOffset + menuHeight)) {
      this.animateScroll(optionOffset.top + optionOffset.height - menuHeight);
    }
  }

  protected getModifierClasses() {
    const { raised, readOnly, required } = this.properties;
    return [
      this.getDisabledClass(css),
      this.getValidClass(css),
      ...this.getStyleClasses(css),
      raised ? css.raised : null, // TODO getStyleClasses
      readOnly ? css.readonly : null,
      required ? css.required : null
    ];
  }
  */

  /*
  protected getOptionWrapperClasses(ui = css) {
    return [
      this.theme(ui.optionWrapper),
      this.getDisabledClass(ui),
      ...this.getSchemaClasses(ui, true),
      this.getSizeClasses(ui)[0]
    ]
  }
  protected getOptionClasses(active: boolean, disabled: boolean, selected: boolean, ui = css) {
    return [
      ui.option,
      active ? ui.activeOption : null,
      selected ? ui.selectedOption : null
    ];
  }
  */

/* TODO
  protected renderExpandIcon(): DNode {
		const { theme, classes } = this.properties;
		return v('span', { classes: this.theme(css.arrow) }, [
			w(Icon, { type: 'downIcon', theme, classes })
		]);
	}
*/
}

export default class Listbox extends ListboxBase<ListboxProperties> {}
