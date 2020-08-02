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
}

export enum Keys {
	Down = 40,
	End = 35,
	Enter = 13,
	Escape = 27,
	Home = 36,
	Left = 37,
	PageDown = 34,
	PageUp = 33,
	Right = 39,
	Space = 32,
	Tab = 9,
	Up = 38
}

interface AriaPropertyObject {
	[key: string]: string | null;
}
export function formatAriaProperties(aria: AriaPropertyObject): AriaPropertyObject {
	const formattedAria = Object.keys(aria).reduce((a: AriaPropertyObject, key: string) => {
		a[`aria-${key.toLowerCase()}`] = aria[key];
		return a;
	}, {});
	return formattedAria;
}

export enum PointerDevice {
	'mouse' = 'mouse',
	'pen' = 'pen',
	'touch' = 'touch'
}
export type PointerDevices = (boolean | (PointerDevice | keyof typeof PointerDevice)[]);

export enum Size {
	'xs' = 'xs',
	's' = 's',
	'm' = 'm',
	'l' = 'l',
	'xl' = 'xl',
	'xxl' = 'xxl'
}
export type Sizes = (Size | keyof typeof Size);

export enum Variant {
	'flat' = 'flat',
	'filled' = 'filled',
	'outlined' = 'outlined',
	'raised' = 'raised',
	'shaped' = 'shaped'
}
export type Variants = (Variant | keyof typeof Variant);

export enum Space {
	'left' = 'left',
	'right' = 'right'
}
export type Spaced = (boolean | Space | keyof typeof Space);

export enum Material {
	'primary' = 'primary',
	'secondary' = 'secondary',
	'settings' = 'settings',
	'info' = 'info',
	'warning' = 'warning',
	'error' = 'error',
	'success' = 'success',
	'neutral' = 'neutral',

	'red' = 'red',
	'deep_orange' = 'deep_orange',
	'orange' = 'orange',
	'amber' = 'amber',
	'yellow' = 'yellow',
	'lime' = 'lime',
	'light_green' = 'light_green',
	'green' = 'green',
	'teal' = 'teal',
	'cyan' = 'cyan',
	'light_blue' = 'light_blue',
	'blue' = 'blue',
	'indigo' = 'indigo',
	'deep_purple' = 'deep_purple',
	'purple' = 'purple',
	'pink' = 'pink',
	'brown' = 'brown',
	'grey' = 'grey',
	'blue_grey' = 'blue_grey'
}
export type Materials = (Material | keyof typeof Material);

export interface ExampleProperties {
	variant?: Variants;
}
