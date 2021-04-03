import commonBundle from './nls/common';
import { ThemedProperties } from '@dojo/framework/core/mixins/Themed';
import { Keys, Sizes, Material } from './util';

export type CommonMessages = typeof commonBundle.messages;

export type AriaPropertyObject = {
	[key: string]: string;
};

export interface CustomAriaProperties {
	aria?: AriaPropertyObject;
}

export interface Focus extends FocusEvent {
	readonly value?: string;
}
export interface Mouse extends MouseEvent {
	readonly previousScreenX: number;
	readonly previousScreenY: number;
	readonly movementX: number;
	readonly movementY: number;
	readonly relatedTarget: any;
	readonly targetKey: string | null;
}
export interface Input extends UIEvent {
	readonly value: string;
	readonly data: string;
	readonly dataTransfer: DataTransfer;
	readonly inputType: 'insertText' | 'insertCompositionText' | 'insertFromComposition' |
	'insertFromPaste' | 'insertFromDrop' | 'insertReplacementText' | 'insertFromYank'|
	'formatSetBlockTextDirection' | 'formatSetInlineTextDirection' | 'formatBackColor'|
	'formatFontColor' | 'formatFontName' | 'insertLink' | 'historyUndo' | 'historyRedo';
  readonly isComposing: boolean;
	readonly target: HTMLInputElement;
}
export interface Toggle extends MouseEvent {
	readonly value: string;
	readonly checked: boolean;
}
export interface Keyboard extends KeyboardEvent {
	readonly which: number;
	readonly key: Keys;
	readonly isStart: boolean;
	readonly isEnd: boolean;
}
/* TODO POINTER
var myObject = {
    get readOnlyProperty() { return 42; }
};
export interface x extends MouseEvent {
	readonly event: MouseEvent;
}
*/

/**
 * @type LabeledProperties
 * @property labelAfter     If false, moves the label before the input
 * @property labelHidden    If true, the label will be accessible but visually hidden
 * @property label          String value for the label
 */
export interface LabeledProperties {
	labelAfter?: boolean;
	labelHidden?: boolean;
	labelStatic?: boolean;
	label?: string;
	helperText?: string;
}

/**
 * @type InputProperties
 *
 * Properties that can be set on a input component
 *
 * @property disabled       Prevents the user from interacting with the form field
 * @property widgetId       Adds an id property to the input node so custom labels are possible
 * @property valid        	Indicates if the value entered in the form field is invalid
 * @property name           The form widget's name
 * @property readOnly       Allows or prevents user interaction
 * @property required       Whether or not a value is required
 */
export interface GenericInputProperties {
	disabled?: boolean;
	widgetId?: string;
	valid?: { valid?: boolean; message?: string; } | boolean;

	name?: string;
	readOnly?: boolean;
	required?: boolean;
}

export interface WidgetEventProperties {
	onHover?: (evt: MouseEvent) => void;
	onClick?(evt: MouseEvent): void;
}
/**
 * @type InputEventProperties
 * @property onBlur         Called when the input loses focus
 * @property onChange       Called when the node's 'change' event is fired
 * @property onFocus        Called when the input is focused
 * @property onInput        Called when the 'input' event is fired
 */
export interface InputEventProperties extends WidgetEventProperties {
	onFocus?(evt: FocusEvent): void;
	onBlur?(evt: FocusEvent): void;
	onChange?(evt: Input): void;
	onBeforeInput?(evt: Input): void;
	onInput?(evt: Input): void;
}

export interface CheckEventProperties extends WidgetEventProperties {
	onFocus?(evt: FocusEvent): void;
	onBlur?(evt: FocusEvent): void;
	onChange?(evt: Toggle): void;
}

export interface ImageEventProperties extends WidgetEventProperties {
	onLoadStart?(currentSrc: string, isLarger: boolean): void;
	onLoad?(evt: Event): void;
	onError?(evt: Event): void;
	onFadeEnd?(evt: AnimationEvent): void;
}

/**
 * @type KeyEventProperties
 * @property onKeyDown      Called on the input's keydown event
 * @property onKeyPress     Called on the input's keypress event
 * @property onKeyUp        Called on the input's keyup event
 */
export interface KeyEventProperties {
	onKeyDown?(event: Keyboard, preventDefault: () => void): void;
	onKeyPress?(event: Keyboard, preventDefault: () => void): void;
	onKeyUp?(event: Keyboard, preventDefault: () => void): void;
}

/**
 * @type PointerEventProperties
 * @property onMouseDown    Called on the input's mousedown event
 * @property onMouseUp      Called on the input's mouseup event
 * @property onTouchStart   Called on the input's touchstart event
 * @property onTouchEnd     Called on the input's touchend event
 * @property onTouchCancel  Called on the input's touchcancel event
 */
export interface PointerEventProperties {
	onMouseDown?(event: MouseEvent): void;
	onMouseUp?(event: MouseEvent): void;
	onTouchStart?(event: TouchEvent): void;
	onTouchEnd?(event: TouchEvent): void;
	onTouchCancel?(event: TouchEvent): void;
}

export interface HasInput {
	documentMode: number,
	beforeInput: boolean,
	fallbackCompositionData: boolean,
	compositionEvent: boolean,
	textInputEvent: boolean,
	beforeInputEmitted: boolean
}

export interface Level2Input {
	inputType: string,
	data: string | null,
	dataTransfer: DataTransfer | null,
	isComposing: boolean,
	getTargetRanges: () => any[],
	range: number[],
	type: string
}


// interfaces for the extended API
export interface RedaktorProperties extends ThemedProperties {
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  responsive?: boolean;
	size?: Sizes | undefined;
	schema?: any; // TODO
  filled?: boolean;
  outlined?: boolean;
  shaped?: boolean;
}
export interface RedaktorBaseCSS {
  /* only ENUMS Material and Size TODO */
  [index:string]: string;
  // FIXME TS next https://github.com/Microsoft/TypeScript/pull/23592
}
export interface RedaktorSizesCSS extends RedaktorBaseCSS {
  smallUI: string;
  defaultUI: string;
  mediumUI: string;
  largeUI: string;
  smallTypo: string;
  defaultTypo: string;
  mediumTypo: string;
  largeTypo: string;
  responsive: string;
}
export interface RedaktorSchemaCSS extends RedaktorBaseCSS {
  parentSchema: string;
  hasSchema?: any;
}
export interface RedaktorDisabledCSS extends RedaktorBaseCSS {
  enabled: string;
  disabled: string;
  readonly?: any;
}
export interface RedaktorValidCSS extends RedaktorBaseCSS {
  valid: string;
  invalid: string;
}
export interface RedaktorStyleCSS extends RedaktorBaseCSS {
  filled: string;
  outlined: string;
  shaped: string;
}
export interface RedaktorPositionCSS extends RedaktorBaseCSS {
	left: string;
	center: string;
	right: string;
	top: string;
	middle: string;
	bottom: string;
}

export type RedaktorCSS = RedaktorDisabledCSS & RedaktorValidCSS & RedaktorSchemaCSS;
