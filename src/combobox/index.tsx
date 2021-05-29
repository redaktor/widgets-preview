import { create, tsx } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import {
	Input, CommonMessages, RedaktorProperties, LabeledProperties, PointerEventProperties,
	/* TODO KeyEventProperties, */ CustomAriaProperties
} from '../common/interfaces';
import { keyName } from '../commonOld/util';
import TextInput, { TextInputProperties } from '../inputText';
import Listbox, { ListboxProperties, Operation } from '../listbox';

import { I18nMixin } from '@dojo/framework/core/mixins/I18n';
import Focus from '@dojo/framework/core/meta/Focus';
import MetaBase from '@dojo/framework/core/meta/Base';

import { focus } from '@dojo/framework/core/middleware/focus';
import { i18n } from '@dojo/framework/core/middleware/i18n';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { createResourceMiddleware } from '@dojo/framework/core/middleware/resources';
/*import { createDataMiddleware } from '@dojo/framework/core/middleware/data';*/
import { uuid } from '@dojo/framework/core/util';
import { Keys } from '../common/util';
import HelperText from '../helperText';
import Icon from '../icon';
import Label from '../label';
import {
	ItemRendererProperties,
	List,
	ListOption,
	// defaultTransform as listTransform
} from '../list';
import theme from '../middleware/theme';
/*
import { PopupPosition } from '../popup';
import TriggerPopup from '../triggerPopup';
*/
import * as listCss from '../theme/material/listbox.m.css';
import * as comboCss from '../theme/material/combobox.m.css';

import * as labelCss from '../theme/default/label.m.css';
import * as iconCss from '../theme/default/icon.m.css';
import bundle from './combobox.nls';
// import { find } from '@dojo/framework/shim/array';
import LoadingIndicator from '../loadingIndicator';
import Search, { SearchResult } from '../framework/String/search/';


interface Indices { type: 'exact'|'token'|'fuzzy', range: [number, number] }

export interface ComboBoxProperties extends RedaktorProperties, LabeledProperties,
PointerEventProperties, CustomAriaProperties/*, KeyEventProperties*/ {
	/* TODO goes to main / RedaktorCSS */
  animated?: boolean;
  /* <-- */

	strict?: boolean;
	clearable?: boolean;
	disabled?: boolean;

	helperText?: string;
	widgetId?: string;
	openOnFocus?: boolean; /* default true */
	blurOnSelect?: boolean; /* default true */
	valid?: { valid?: boolean; message?: string } | boolean;
	readOnly?: boolean;
	required?: boolean;
	results?: any[];
	sortable?: boolean;
	value?: string;
	initialValue?: number | string;

	getOptionText?(result: any, index: number, input: string): string;
	getOptionLabel?(result: any, index: number, output: RenderResult): RenderResult;

	getOptionSelected?(result: any, index: number): boolean;
	getOptionDisabled?(result: any): boolean;
	getValue?(result: any, index: number): any;

	onBlur?(evt: FocusEvent, value: string, key?: string | number): void;
	onFocus?(evt: FocusEvent, value: string, key?: string | number): void;
	onChange?(value: string, index: number, key?: string | number): void;
	onMenuChange?(open: boolean, key?: string | number): void;

	onRequestResults?(key?: string | number): void;
	onResultSelect?(result: any, index: number, key?: string | number): void;
	onValidate?(valid: boolean | undefined, message: string): void;

	onToken?(result: string): string[];
	onSort?(result: Result): (-1 | 0 | 1);
	/* TODO ???
	events: [
		'onChange', 'onBlur', 'onFocus',
		'onClick', 'onInput', 'onMouseDown', 'onMouseUp',
		'onKeyDown', 'onKeyPress', 'onKeyUp', 'onTouchCancel', 'onTouchEnd', 'onTouchStart'
	] */

	// Input Properties partial
	name?: string;
	maxLength?: number | string;
	minLength?: number | string;
	leading?: RenderResult;
	trailing?: RenderResult;
	autofocus?: boolean;
	autocomplete?: boolean | string;
	pattern?: string | RegExp;
	placeholder?: string;
	spellcheck?: boolean;
	// Listbox Properties partial
	bottom?: boolean;
	focus?: boolean;
	raised?: boolean;
	muted?: boolean;
	scroll?: boolean | number;
	useNativeElement?: boolean;
}
// Enum used when traversing items using arrow keys
export interface Result { value: string, intersection: string[], score: number }

export interface ComboBoxChildren {
	/** Custom renderer for item contents */
	items?(properties: ItemRendererProperties): RenderResult;
	/** The label to show */
	label?: RenderResult;
}

// export const defaultTransform = listTransform;

interface ComboBoxICache {
	dirty: boolean;
	expanded: boolean;
	focusNode: string;
	initial: string;
	menuId: string;
	triggerId: string;
	valid: boolean;
	value: string;
	meta?: any; // ResourceMeta;

	hasMatch?: boolean;
	hadMatch?: boolean;
	indexed?: RenderResult;
	indices?: number[];
	activeIndex?: number;
	callInputFocus?: boolean;
	ignoreBlur?: boolean;
	menuHasVisualFocus?: boolean;
	open?: boolean;
	wasOpen?: boolean;
}

const icache = createICacheMiddleware<ComboBoxICache>();

const factory = create({ icache, focus, theme, i18n })
	.properties<ComboBoxProperties>()
	.children<ComboBoxChildren | undefined>();

export const ComboBox = factory(function ComboBox({
	properties,
	middleware: { icache, focus, theme, i18n }
}) {

/*
	const { createOptions, isLoading, meta, find } = resource;
	const {
		classes,
		disabled,
		helperText,
		initialValue,
		itemsInView = 6,
		onValidate,
		onValue,
		placeholder = '',
		position,
		required,
		name,
		resource: { template, options = createOptions(id) }
	} = properties();
	const [{ items, label } = { items: undefined, label: undefined }] = children();
*/
	const { messages } = i18n.localize(bundle);
	let { initialValue, value } = properties();
	if (value === undefined) {
		if (initialValue !== undefined && initialValue !== icache.get('initial')) {
			icache.set('initial', `${initialValue}`);
			icache.set('value', `${initialValue}`);
		}
		value = icache.get('value');
	}

	icache.getOrSet('menuId', uuid());
	icache.getOrSet('triggerId', uuid());
	icache.getOrSet('focusNode', 'trigger');

	const shouldFocus = focus.shouldFocus();
	const themedCss = theme.classes(listCss);
/*
	let valid = icache.get('valid');
	const dirty = icache.get('dirty');
	const metaInfo = icache.set('meta', (current) => {
		const newMeta = meta(template, options());
		return newMeta || current;
	});

	if (required && dirty) {
		const isValid = value !== undefined;
		if (isValid !== valid) {
			icache.set('valid', isValid);
			valid = isValid;
			onValidate && onValidate(isValid, '');
		}
	}
*/
	icache.getOrSet('activeIndex', -1);
	icache.getOrSet('open', false);
	icache.getOrSet('wasOpen', false);
	icache.getOrSet('hasMatch', false);
	icache.getOrSet('hadMatch', false);
	icache.getOrSet('callInputFocus', false);
	icache.getOrSet('menuHasVisualFocus', false);
	/*
	const _indexed: RenderResult;
	const _indices: number[];
	const _ignoreBlur: boolean;
	*/
	// uuid();
	const _idBase = `combo${Date.now()}`;

	const _onTokens = {
		whitespace: (str: string) => {
			// str = _.toStr(str);
		  return str ? str.split(/\s+/) : [];
		},
		nonword: (str: string) => {
			// str = _.toStr(str);
			return str ? str.split(/\W+/) : [];
		}
	}
	const _onSorts = {
		score: (a: Result, b: Result) => {
		  return a.score < b.score ? 1 : -1
		}
	}

/*
// TODO autofill / spellchecker ? "insertReplacementText"
		this._value = (<HTMLInputElement>event.target).value;
		this.readonlyProp('value', this._value, event);
		properties().onInput && properties().onInput(event);
		this.invalidate()
	}
*/
	const _getOptionText = (result: any, index: number) => {
		const { getOptionText } = properties();
		return getOptionText ? getOptionText(result, index, icache.get('value')||'') :
			((typeof result === 'object' && 'value' in result) ? result.value : `${result}`);
	}
	const searchResult = (query: string, indices: Indices[]) => {
		const firstIndex = indices[0].range[0];
		const children: RenderResult[] = indices.reduce((_children: RenderResult[] = [], o, i) => {
			if (!_children) { _children = [] }
			const text = query.substring(o.range[0], o.range[1]);
	  	const next = i+1 === indices.length ? void 0 : indices[i+1].range[0];
			// TODO might go to Search
			/*const considerExact = this._value.toLowerCase() === text.toLowerCase();*/
			return _children.concat(
				<u key={`${Date.now()}`} classes={[themedCss.match, themedCss[o.type]]}>{text}</u>,
				query.substring(o.range[1], next)
			)
	  }, !firstIndex ? [] : [query.substring(0, firstIndex)]);
	  return <span>{children}</span>;
	}

	const _indexResults = (query: string = icache.get('value')||'') => {
		const {
			results = [], sortable = true,
			onToken = _onTokens.whitespace,
			onSort = _onSorts.score
		} = properties();
		icache.set('hadMatch', icache.get('hasMatch'), false);
		icache.set('hasMatch', false, false);
		if (!query) {
			const indexed = results.map(_getOptionText);
			icache.set('indexed', indexed, false);
			return indexed
		}
		// TODO : or phonetic ...
		const resultTexts = new Search(results.map(_getOptionText), {
			shouldSort: sortable,
			threshold: 0.6,
			location: 0,
			distance: 100,
			maxPatternLength: 32,
			minMatchCharLength: 1,
			tokenize: true
		});

		let indices: number[] = []
		const indexed = resultTexts.search(query).map((r) => {
			indices.push(r.index);
			if (!r.matches.length) { return r.value }
			if (r.score === 0) {
				icache.set('value', r.value, false);
				icache.set('hasMatch', true, false);
				if (!icache.get('menuHasVisualFocus')) { icache.set('activeIndex', 0) }
			}
			const indexMap = new Map();
			r.matches.forEach((m) => m.indices.forEach((o: Indices) => indexMap.set(o, 1)));
			return searchResult(r.value, Array.from(indexMap.keys()))
		});
		icache.set('indexed', indexed, false);
		icache.set('indices', indices, false);

		return indexed
	}

	const _onMenuChange = () => {
		const { key, onMenuChange } = properties();
		if (!onMenuChange) { return }
		const open = {is: icache.get('open'), was: icache.get('wasOpen')};
		open.is && !open.was && onMenuChange(true, key);
		!open.is && open.was && onMenuChange(false, key);
	}

	const _onInput = (evt: Input | any) => {
		const { key, onChange } = properties();
		icache.set('menuHasVisualFocus', false, false);
		icache.set('open', true, false);
		onChange && onChange(evt.value, icache.get('activeIndex')||0, (key as any));
		icache.set('value', evt.value);
	}
	const _onResultMouseDown = (event: MouseEvent) => {
		event.stopPropagation();
		// Maintain underlying input focus on next render
		icache.set('ignoreBlur', true, false);
		icache.set('callInputFocus', true, false);
	}
	const _onInputBlur = (evt: FocusEvent) => {
		const { key, onBlur } = properties();
		if (icache.get('ignoreBlur')) {
			icache.set('ignoreBlur', false, false);
			return;
		}
		onBlur && onBlur(evt, icache.get('value')||'', key);
		icache.get('open') && _closeMenu();
	}
	const _onInputFocus = (evt: FocusEvent) => {
		const { key, disabled, readOnly, onFocus, openOnFocus = true } = properties();
		onFocus && onFocus(evt, icache.get('value')||'', key);
		const _onlyFocus = icache.get('callInputFocus');
		icache.set('callInputFocus', false, false)
		!disabled && !readOnly && !_onlyFocus && openOnFocus && _openMenu();
	}
	const _openMenu = () => {
		const { key, onRequestResults } = properties();
		/*this._activeIndex = 0;*/
		onRequestResults && onRequestResults(key);
		icache.set('open', true);
	}
	const _closeMenu = () => icache.set('open', false);
	const _getMenuId = () => `${_idBase}-menu`;
	const _getOptionId = (result: any, index: number) => `${_idBase}-result${index}`;

	const _getOptionLabel = (result: any, index: number) => {
		const { getOptionLabel } = properties();
		const indexed: any = (icache.get('indexed')||[]);
		return getOptionLabel ? getOptionLabel(result, index, indexed[index]) : indexed[index];
	}
	const _getOptionSelected = (result: any, index: number) => {
		const { getOptionSelected, value } = properties();
		return getOptionSelected ? getOptionSelected(result, index) : _getOptionLabel(result, index) === value;
	}
	const _getValue = (result: any, index: number) => {
		const { getValue = _getOptionText } = properties();
		return getValue ? `${getValue(result, index)}` : `${result}`;
	}

	const _selectIndex = (
		index = icache.get('activeIndex')||0, key = properties().key, isFresh: boolean = true
	) => {
		const { onChange, onResultSelect, blurOnSelect = true, results = [] } = properties();
		const [indices = [], activeIndex, hasMatch] = [
			icache.get('indices'), icache.get('activeIndex'), icache.get('hasMatch')
		];

		const i = indices.length ? indices[index] : index;
		const changed = activeIndex !== index;
		icache.set('value', _getOptionText(results[i], i), false);
		(hasMatch || changed) && onChange && onChange(_getValue(results[i], i), i, key);
		(hasMatch || isFresh) && onResultSelect && onResultSelect(results[i], i, key);
		icache.get('open') && _closeMenu();
	}
	const _selectedIndex = (index = icache.get('activeIndex')||0, key = properties().key) => {
		_selectIndex(index, key, false);
	}
	// KEYBOARD NAVIGATION
	const _moveActiveIndex = (operation: Operation) => {
		const { onResultSelect, key, results = [] } = properties();
		if (!results.length) {
			icache.set('activeIndex', -1);
			return;
		}
		const [indices = [], activeIndex] = [icache.get('indices'), icache.get('activeIndex')];
		const total = results.length;
		const nextIndex = ((activeIndex||0) + operation + total) % total;
		const i = indices.length ? indices[nextIndex] : nextIndex;
		icache.set('activeIndex', nextIndex);
		onResultSelect && onResultSelect(results[i], i, key);
	}
	const _onInputKeyDown = (event: KeyboardEvent) => {
		const {
			disabled,
			readOnly,
			getOptionDisabled = () => false,
			blurOnSelect = true,
			results = []
		} = properties();
		const pressed = keyName(event);
		const visualFocus: any = {ArrowUp:1, ArrowDown:1, Home:1, End:1}
		if (visualFocus[pressed]) { icache.set('menuHasVisualFocus', true, false) }
		const [open, activeIndex, menuHasVisualFocus] = [
			icache.get('open'), icache.get('activeIndex'), icache.get('menuHasVisualFocus')
		];
		switch (pressed) {
			case 'ArrowUp':
				event.preventDefault();
				_moveActiveIndex(Operation.decrease);
				break;
			case 'ArrowDown':
				event.preventDefault();
				if (!open && !disabled && !readOnly) {
					_openMenu();
				} else if (open) {
					_moveActiveIndex(Operation.increase);
				}
				break;
			case 'Escape':
				open && _closeMenu();
				icache.set('menuHasVisualFocus', false, false);
				break;
			case 'Enter':
			case ' ':
				const hasFocus = menuHasVisualFocus;
				const isDisabled = getOptionDisabled(results[activeIndex||0]); // TODO indexed results
				if (pressed === ' ' && hasFocus) { event.preventDefault() }
				if ((pressed === ' ' && !hasFocus) || (hasFocus && isDisabled)) {
					return;
				}
				icache.set('menuHasVisualFocus', false, false);
				if (open) {
					if (blurOnSelect && !icache.get('ignoreBlur') && !icache.get('callInputFocus')) {
						// this.meta(Focus).set('root'); TODO
						if ("activeElement" in document) {(document as any).activeElement.blur();}
					}
					_selectedIndex();
				}
				break;
			case 'Home':
				icache.set('activeIndex', 0);
				break;
			case 'End':
				icache.set('activeIndex', results.length - 1);
				break;
		}
	}

	const renderInput = () => {
		const inputProperties: any = properties();
		const {
			autofocus, blurOnSelect = true, strict = false, results = []
		} = properties();
		/* TODO if (icache.get('open')) { inputProperties.labelStatic = true } */
		return <TextInput {...inputProperties}
			key="textinput" type="text"
			aria={{controls: _getMenuId()}}
			autofocus={(!icache.get('wasOpen') && autofocus) || (!blurOnSelect && icache.get('callInputFocus'))}
			focus={focus.shouldFocus}
			value={icache.get('value')}
			onClick={() => !icache.get('open') && _openMenu()}
			onFocus={_onInputFocus}
			onBlur={_onInputBlur}
			onKeyDown={_onInputKeyDown}
			valid={strict && icache.get('hasMatch')}
			// valid: strict ? this._hasMatch : true
			// customValidator: !strict ? null : (v: string) => ({ valid: this._hasMatch, message: '' })
			// TODO onValidate

		/>
	}
	const renderMenu = () => {
		const {
			getOptionDisabled, onChange, blurOnSelect = true, sortable = true,
			animated = true, results = [], ...listProperties
		} = properties();
		const isOpen = icache.get('open');
		if (!results.length || (!isOpen && !animated)) { return null }

		// const listProperties: Partial<ListboxProperties> = properties();
		const wasOpen = icache.get('wasOpen');
		icache.set('wasOpen', isOpen, false);

		// console.log('render menu', this._activeIndex, this._menuHasVisualFocus);
		console.log('_opening', !wasOpen && isOpen, '::', wasOpen, isOpen)
		// TODO shaped
		const [open, indices, indexed, activeIndex = 0] = [
			icache.get('open'), icache.get('indices'), icache.get('indexed'), icache.get('activeIndex')
		];

		return <div key="dropdown" classes={[
			comboCss.dropdown,
			open === true ? comboCss.open : comboCss.closed
		]}>
			<Listbox
				key={_getMenuId()}
				autoOpen={false}
				autoOrder={false}
				activeIndex={activeIndex > -1 ? activeIndex : void 0}
				optionData={(indexed as any)}
				tabIndex={-1} // this._open ? 0 : -1,
				closed={!open}
				_opening={!wasOpen && open}
				getOptionDisabled={getOptionDisabled}
				// getOptionId: this._getOptionId, TODO FIXME
				getOptionLabel={_getOptionLabel}
				// getOptionSelected: this._getOptionSelected, TODO FIXME
				onActiveIndexChange={ (index: number) => {
					// console.log('index change V', index, this._value);
					const indices = icache.get('indices')||[];
					icache.set('activeIndex', indices.length ? indices[index] : index);
				} }
				onOptionSelect={_selectIndex}
			/>
		</div>
	}
	_onMenuChange();
	_indexResults();
/*
	this.
	this._indexResults();
	if (!this._hasMatch && !this._menuHasVisualFocus) {
		this._activeIndex = -1;
	} else if (!this._hadMatch && this._hasMatch) {
		this._selectedIndex();
	}
	if (this._open) {
		this.meta(ScrollViewMeta).scroll('dropdown');
	}
*/
	return <div key="root">
		{ renderInput() }
		{ renderMenu() }
	</div>
});

export default ComboBox;
