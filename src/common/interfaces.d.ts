import commonBundle from './nls/common';
import { ThemedProperties } from '@dojo/framework/core/mixins/Themed';
import { RGB } from '../framework/color';
import { Keys, Sizes, Material } from './util';

/* COMMON EXPORTS */
export type CommonMessages = typeof commonBundle.messages;

export interface Labeled {
	value: string;
	label?: string;
}

export interface MenuOption {
	value: string;
	label?: string;
	disabled?: boolean
}

export type AriaPropertyObject = {
	[key: string]: string;
}

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
export interface ColoredItem {
	name?: string;
	color?: RGB;
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

/* REDAKTOR EXPORTS */
// interfaces for the extended API
export interface RedaktorProperties extends ThemedProperties {
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  responsive?: boolean;
	size?: Sizes;
	schema?: any; // TODO
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

export type IconType = 'private' | 'group' | 'public';

type anyURI = string /* RFCs 2396 and 2732 */;
type dateTime = string; /* ISO 8601, 5.4 - e.g. 2020-10-26T21:32:52+02:00 */
type duration = string /* xsd:duration */;
type nonNegativeInteger = number /* xsd:nonNegativeInteger */;
type float = number /* xsd:float */;


/* ACTIVITYPUB as:EXPORTS */
export type AsActorTypes = 'Application'|'Group'|'Organization'|'Person'|'Service';
export type AsActivityTypes = 'Activity'|'Accept'|'Add'|'Announce'|'Arrive'|
'Block'|'Create'|'Delete'|'Dislike'|'Flag'|'Follow'|'Ignore'|'Invite'|'Join'|'Leave'|
'Like'|'Listen'|'Move'|'Offer'|'Question'|'Reject'|'Read'|'Remove'|'TentativeReject'|
'TentativeAccept'|'Travel'|'Undo'|'Update'|'View';
export type AsObjectTypes = 'Article'|'Audio'|'Document'|'Event'|'Image'|
'Note'|'Object'|'Page'|'Place'|'Video'|'Profile'|'Relationship'|'Tombstone'|'Link'|'Mention'|
'Collection'|'OrderedCollection'|'CollectionPage'|'OrderedCollectionPage';
export type AsLinkTypes = 'Link'|'Mention';
export type AsTypes = AsActorTypes|AsActivityTypes|AsObjectTypes|AsLinkTypes;

export interface LangMap {
	[iso: string]: string;
}

export interface AsBase {
/*
OBJECT
tag 	The key difference between attachment and tag is
			that the former implies association by inclusion, while the latter implies associated by reference.
url 	Identifies one or more links to representations of the object
*/
	type?: anyURI | anyURI[];
	id?: anyURI;
	url?: anyURI | AsLink | (anyURI|AsLink)[];

	icon?: AsImage | AsLink | (AsImage | AsLink)[];
	image?: AsImage | AsLink | (AsImage | AsLink)[];
	mediaType?: string; /* Functional - TODO TS: MIME Media Type */

	attributedTo?: AP | AsActor | RedaktorActor | (AsActor | RedaktorActor)[];
	generator?: AP;
	published?: dateTime; /* Functional */
	updated?: dateTime; /* Functional */
	duration?: duration; /* Functional */
	startTime?: dateTime; /* Functional */
	endTime?: dateTime; /* Functional */

	name?: string | string[];
	nameMap?: LangMap | LangMap[];
	summary?: string | string[];
	summaryMap?: LangMap | LangMap[];
	source?: string | string[];
	sourceMap?: LangMap | LangMap[];
	content?: string | string[];
	contentMap?: LangMap | LangMap[];

	location?: AP;

	inReplyTo?: AP;
	audience?: AP;
	to?: AP;
	cc?: AP;
	bto?: AP;
	bcc?: AP;

	attachment?: AP;
	tag?: AP;
	preview?: AP;
	replies?: AsCollection; /* Functional */

	height?: nonNegativeInteger; /* Functional */
	width?: nonNegativeInteger; /* Functional */
	[key: string]: any;
}
export interface AsBaseNormalized extends AsBase {
	type?: anyURI[];
	id?: anyURI;
	url?: (anyURI|AsLink)[];

	icon?: (AsImage | AsLink)[];
	image?: (AsImage | AsLink)[];

	attributedTo?: (AsActor | RedaktorActor)[];
	generator?: APnormalized;

	name?: string[];
	nameMap?: LangMap[];
	summary?: string[];
	summaryMap?: LangMap[];
	source?: string[];
	sourceMap?: LangMap[];
	content?: string[];
	contentMap?: LangMap[];

	location?: APnormalized & AsPlace;

	inReplyTo?: APnormalized;
	audience?: APnormalized;
	to?: APnormalized;
	cc?: APnormalized;
	bto?: APnormalized;
	bcc?: APnormalized;

	attachment?: APnormalized;
	tag?: APnormalized;
	preview?: APnormalized;
	[key: string]: any;
}
/* ui extends :
	language?: string;
	kicker?: string;
	byline?: string;
	bookmark?: boolean | ColoredItem;
	topic?: boolean | ColoredItem;
	privacy?: IconType;
	petName?: string;
	actorName?: string;

	activity?: string;
	handle?: string;
*/

/*
RELATIONSHIP
relationship, describes
*/
export interface AsEndpoints {
	[endpointID: string]: anyURI;
}
export interface AsActor extends AsBase {
	type: AsActorTypes | [AsActorTypes, ...(AsActorTypes | AsObjectTypes | string)[]];
	inbox?: AsOrderedCollection; /* Functional */
	outbox?: AsOrderedCollection; /* Functional */
	following?: anyURI;
	followers?: anyURI;
	liked?: anyURI;

	streams?: (AsCollection|AsOrderedCollection)[];
	preferredUsername?: string;
	endpoints?: AsEndpoints;
}
export interface RedaktorActor extends AsActor {
	petName?: string; /* seeAlso preferredUsername as self-proposed name */
	edgeNames?: (AsActor | RedaktorActor)[];
	handle?: string;
	follow?: boolean | 'follower' | 'mutual' | 'me';
}
export interface AsActivity extends AsBase {
	type: AsActivityTypes | [AsActivityTypes, ...(AsActivityTypes | string)[]];
	object?: AP;
	actor?: AsActor | RedaktorActor | AsLink | (AsActor | RedaktorActor | AsLink)[];
	instrument?: AP;
	origin?: AP;
	target?: AP;
	result?: AP;
	/* Question */
	oneOf?: AP;
	anyOf?: AP;
	closed?: AP | dateTime | boolean;
}
export interface AsActivityNormalized extends AsBaseNormalized {
	type: [AsActivityTypes, ...(AsActivityTypes | string)[]];
	object?: APnormalized;
	actor?: (AsActor | RedaktorActor | AsLink)[];
	instrument?: APnormalized;
	origin?: APnormalized;
	target?: APnormalized;
	result?: APnormalized;
	/* Question */
	oneOf?: APnormalized;
	anyOf?: APnormalized;
	closed?: APnormalized | dateTime | boolean;
}

interface AsCore extends AsBase {
	type?: AsObjectTypes | [AsObjectTypes, ...(AsObjectTypes | string)[]];
}
export interface AsObject extends AsBase {
	type?: AsObjectTypes | [AsObjectTypes, ...(AsObjectTypes | string)[]];
	/* Collection */
	current?: AsCollectionPage | AsLink; /* Functional */
	first?: AsCollectionPage | AsLink; /* Functional */
	last?: AsCollectionPage | AsLink; /* Functional */
	items?: AsCollection; /* Functional */
	totalItems?: nonNegativeInteger; /* Functional */
	/* CollectionPage */
	next?: AsCollectionPage | AsLink; /* Functional */
	prev?: AsCollectionPage | AsLink; /* Functional */
	partOf?: AsCollection | AsLink; /* Functional */
	/* OrderedCollection */
	startIndex?: nonNegativeInteger; /* Functional */
	/* Place */
	accuracy?: float; /* percentage [>= 0.0f, <= 100.0f] Functional*/
	altitude?: float; /* Functional */
	latitude?: float; /* Functional */
	longitude?: float; /* Functional */
	radius?: float; /* [>= 0.0f] Functional */
	units?: "cm" | "feet" | "inches" | "km" | "m" | "miles" | anyURI;
	/* Link */
	href?: string; /* Functional */
	hreflang?: string; /* Functional */
	rel?: string | string[];
}
export interface AsObjectNormalized extends AsBaseNormalized {
	type: [AsObjectTypes, ...(AsObjectTypes | string)[]];
	/* Collection */
	current?: AsCollectionPage | AsLink; /* Functional */
	first?: AsCollectionPage | AsLink; /* Functional */
	last?: AsCollectionPage | AsLink; /* Functional */
	items?: AsCollection; /* Functional */
	totalItems?: nonNegativeInteger; /* Functional */
	/* CollectionPage */
	next?: AsCollectionPage | AsLink; /* Functional */
	prev?: AsCollectionPage | AsLink; /* Functional */
	partOf?: AsCollection | AsLink; /* Functional */
	/* OrderedCollection */
	startIndex?: nonNegativeInteger; /* Functional */
	/* Place */
	accuracy?: float; /* percentage [>= 0.0f, <= 100.0f] Functional*/
	altitude?: float; /* Functional */
	latitude?: float; /* Functional */
	longitude?: float; /* Functional */
	radius?: float; /* [>= 0.0f] Functional */
	units?: "cm" | "feet" | "inches" | "km" | "m" | "miles" | anyURI;
	/* Link */
	href?: string; /* Functional */
	hreflang?: string; /* Functional */
	rel?: string[];
	/* available locales */
	locales?: Labeled[];
}

export interface AsCollection extends AsCore {
	current?: AsCollectionPage | AsLink; /* Functional */
	first?: AsCollectionPage | AsLink; /* Functional */
	last?: AsCollectionPage | AsLink; /* Functional */

	items?: AsCollection; /* Functional */
	totalItems?: nonNegativeInteger; /* Functional */
}
export interface AsCollectionPage extends AsCollection {
	next?: AsCollectionPage | AsLink; /* Functional */
	prev?: AsCollectionPage | AsLink; /* Functional */
	partOf?: AsCollection | AsLink; /* Functional */
}
export interface AsOrderedCollection extends AsCollection {
	startIndex?: nonNegativeInteger; /* Functional */
}
export type AsOrderedCollectionPage = AsOrderedCollection & AsCollectionPage;

export interface AsPlace extends AsCore {
	type: 'Place' | ['Place', ...AsObjectTypes[]];
	accuracy?: float /* percentage [>= 0.0f, <= 100.0f] Functional*/;
	altitude?: float; /* Functional */
	latitude?: float; /* Functional */
	longitude?: float; /* Functional */
	radius?: float; /* [>= 0.0f] Functional */
	units?: "cm" | "feet" | "inches" | "km" | "m" | "miles" | anyURI;
}
export interface AsImage extends AsCore {
	type: 'Image' | ['Image', ...AsObjectTypes[]];
	blurhash?: string;
	focalPoint?: [number, number];
}

export interface AsLinkObject extends AsCore {
	type: AsLinkTypes;
	href?: string; /* Functional */
	hreflang?: string; /* Functional */
	rel?: string | string[];
}
export type AsLink = AsLinkObject;

export type AP = AsObject | AsActivity |
	(AsObject | AsActivity)[];
export type APnormalized = (AsObjectNormalized | AsActivityNormalized)[];
