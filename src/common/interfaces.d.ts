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


/* ACTIVITYPUB EXPORTS */

export type ActivityPubActorTypes = 'Application'|'Group'|'Organization'|'Person'|'Service';
export type ActivityPubActivityTypes = 'Activity'|'Accept'|'Add'|'Announce'|'Arrive'|
'Block'|'Create'|'Delete'|'Dislike'|'Flag'|'Follow'|'Ignore'|'Invite'|'Join'|'Leave'|
'Like'|'Listen'|'Move'|'Offer'|'Question'|'Reject'|'Read'|'Remove'|'TentativeReject'|
'TentativeAccept'|'Travel'|'Undo'|'Update'|'View';
export type ActivityPubObjectTypes = 'Article'|'Audio'|'Document'|'Event'|'Image'|
'Note'|'Page'|'Place'|'Video'|'Profile'|'Relationship'|'Tombstone'|'Link'|'Mention'|
'Collection'|'OrderedCollection'|'CollectionPage'|'OrderedCollectionPage';
export type ActivityPubLinkTypes = 'Link'|'Mention';

export interface LangMap {
	[iso: string]: string;
}

export interface ActivityPubBase {
/*
OBJECT
tag 	The key difference between attachment and tag is
			that the former implies association by inclusion, while the latter implies associated by reference.
url 	Identifies one or more links to representations of the object
*/
	type?: anyURI | anyURI[];
	id?: anyURI;
	url?: anyURI | ActivityPubLink | (anyURI|ActivityPubLink)[];

	icon?: ActivityPubImage | ActivityPubLink | (ActivityPubImage | ActivityPubLink)[];
	image?: ActivityPubImage | ActivityPubLink | (ActivityPubImage | ActivityPubLink)[];
	mediaType?: string; /* Functional - TODO TS: MIME Media Type */

	attributedTo?: AP | ActivityPubActor | RedaktorActor | (ActivityPubActor | RedaktorActor)[];
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
	replies?: ActivityPubCollection; /* Functional */

	height?: nonNegativeInteger; /* Functional */
	width?: nonNegativeInteger; /* Functional */
	[key: string]: any;
}
export interface ActivityPubBaseNormalized extends ActivityPubBase {
	type?: anyURI[];
	id?: anyURI;
	url?: (anyURI|ActivityPubLink)[];

	icon?: (ActivityPubImage | ActivityPubLink)[];
	image?: (ActivityPubImage | ActivityPubLink)[];

	attributedTo?: (ActivityPubActor | RedaktorActor)[];
	generator?: APnormalized;

	name?: string[];
	nameMap?: LangMap[];
	summary?: string[];
	summaryMap?: LangMap[];
	source?: string[];
	sourceMap?: LangMap[];
	content?: string[];
	contentMap?: LangMap[];

	location?: APnormalized;

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
export interface ActivityPubEndpoints {
	[endpointID: string]: anyURI;
}
export interface ActivityPubActor extends ActivityPubBase {
	type: ActivityPubActorTypes | [ActivityPubActorTypes, ...(ActivityPubActorTypes | ActivityPubObjectTypes | string)[]];
	inbox?: ActivityPubOrderedCollection; /* Functional */
	outbox?: ActivityPubOrderedCollection; /* Functional */
	following?: anyURI;
	followers?: anyURI;
	liked?: anyURI;

	streams?: (ActivityPubCollection|ActivityPubOrderedCollection)[];
	preferredUsername?: string;
	endpoints?: ActivityPubEndpoints;
}
export interface RedaktorActor extends ActivityPubActor {
	petName?: string; /* seeAlso preferredUsername as self-proposed name */
	edgeNames?: (ActivityPubActor | RedaktorActor)[];
	handle?: string;
	follow?: boolean | 'follower' | 'mutual' | 'me';
}
export interface ActivityPubActivity extends ActivityPubBase {
	type: ActivityPubActivityTypes | [ActivityPubActivityTypes, ...(ActivityPubActivityTypes | string)[]];
	object?: AP;
	actor?: ActivityPubActor | RedaktorActor | ActivityPubLink | (ActivityPubActor | RedaktorActor | ActivityPubLink)[];
	instrument?: AP;
	origin?: AP;
	target?: AP;
	result?: AP;
	/* Question */
	oneOf?: AP;
	anyOf?: AP;
	closed?: AP | dateTime | boolean;
}
export interface ActivityPubActivityNormalized extends ActivityPubBaseNormalized {
	type: [ActivityPubActivityTypes, ...(ActivityPubActivityTypes | string)[]];
	object?: APnormalized;
	actor?: (ActivityPubActor | RedaktorActor | ActivityPubLink)[];
	instrument?: APnormalized;
	origin?: APnormalized;
	target?: APnormalized;
	result?: APnormalized;
	/* Question */
	oneOf?: APnormalized;
	anyOf?: APnormalized;
	closed?: APnormalized | dateTime | boolean;
}

interface ActivityPubCore extends ActivityPubBase {
	type?: ActivityPubObjectTypes | [ActivityPubObjectTypes, ...(ActivityPubObjectTypes | string)[]];
}
export interface ActivityPubObject extends ActivityPubBase {
	type?: ActivityPubObjectTypes | [ActivityPubObjectTypes, ...(ActivityPubObjectTypes | string)[]];
	/* Collection */
	current?: ActivityPubCollectionPage | ActivityPubLink; /* Functional */
	first?: ActivityPubCollectionPage | ActivityPubLink; /* Functional */
	last?: ActivityPubCollectionPage | ActivityPubLink; /* Functional */
	items?: ActivityPubCollection; /* Functional */
	totalItems?: nonNegativeInteger; /* Functional */
	/* CollectionPage */
	next?: ActivityPubCollectionPage | ActivityPubLink; /* Functional */
	prev?: ActivityPubCollectionPage | ActivityPubLink; /* Functional */
	partOf?: ActivityPubCollection | ActivityPubLink; /* Functional */
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
export interface ActivityPubObjectNormalized extends ActivityPubBaseNormalized {
	type: [ActivityPubObjectTypes, ...(ActivityPubObjectTypes | string)[]];
	/* Collection */
	current?: ActivityPubCollectionPage | ActivityPubLink; /* Functional */
	first?: ActivityPubCollectionPage | ActivityPubLink; /* Functional */
	last?: ActivityPubCollectionPage | ActivityPubLink; /* Functional */
	items?: ActivityPubCollection; /* Functional */
	totalItems?: nonNegativeInteger; /* Functional */
	/* CollectionPage */
	next?: ActivityPubCollectionPage | ActivityPubLink; /* Functional */
	prev?: ActivityPubCollectionPage | ActivityPubLink; /* Functional */
	partOf?: ActivityPubCollection | ActivityPubLink; /* Functional */
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

export interface ActivityPubCollection extends ActivityPubCore {
	current?: ActivityPubCollectionPage | ActivityPubLink; /* Functional */
	first?: ActivityPubCollectionPage | ActivityPubLink; /* Functional */
	last?: ActivityPubCollectionPage | ActivityPubLink; /* Functional */

	items?: ActivityPubCollection; /* Functional */
	totalItems?: nonNegativeInteger; /* Functional */
}
export interface ActivityPubCollectionPage extends ActivityPubCollection {
	next?: ActivityPubCollectionPage | ActivityPubLink; /* Functional */
	prev?: ActivityPubCollectionPage | ActivityPubLink; /* Functional */
	partOf?: ActivityPubCollection | ActivityPubLink; /* Functional */
}
export interface ActivityPubOrderedCollection extends ActivityPubCollection {
	startIndex?: nonNegativeInteger; /* Functional */
}
export type ActivityPubOrderedCollectionPage = ActivityPubOrderedCollection & ActivityPubCollectionPage;

export interface ActivityPubPlace extends ActivityPubCore {
	type: 'Place' | ['Place', ...ActivityPubObjectTypes[]];
	accuracy?: float /* percentage [>= 0.0f, <= 100.0f] Functional*/;
	altitude?: float; /* Functional */
	latitude?: float; /* Functional */
	longitude?: float; /* Functional */
	radius?: float; /* [>= 0.0f] Functional */
	units?: "cm" | "feet" | "inches" | "km" | "m" | "miles" | anyURI;
}
export interface ActivityPubImage extends ActivityPubCore {
	type: 'Image' | ['Image', ...ActivityPubObjectTypes[]];
	blurhash?: string;
	focalPoint?: [number, number];
}

export interface ActivityPubLinkObject extends ActivityPubCore {
	type: ActivityPubLinkTypes;
	href?: string; /* Functional */
	hreflang?: string; /* Functional */
	rel?: string | string[];
}
export type ActivityPubLink = ActivityPubLinkObject;

export type AP = ActivityPubObject | ActivityPubActivity |
	(ActivityPubObject | ActivityPubActivity)[];
export type APnormalized = (ActivityPubObjectNormalized | ActivityPubActivityNormalized)[];
