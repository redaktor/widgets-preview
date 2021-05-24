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
	Up = 38,
	Shift = 16
}

export const Elevation = {
	0:0,
	1:1,
	2:2,
	3:3,
	4:4,
	6:6,
	8:8,
	12:12,
	16:16,
	24:24
}

export enum AspectRatioNamed {
	"portraitVideo","9/16","portraitPhoto","2/3","3/4","4/5","6/7","square","1/1",
	"7/6","5/4","4/3","photo","3/2","16/10","video","16/9","cinema","37/20","16/7",
	"cinemaWide","21/9","8/3","apsP","3/1","16/5","10/3","pano3","9/2","pano4","12/2"
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

export enum VP {
	'micro' = 'micro',
	'xs' = 'xs',
	's' = 's',
	'm' = 'm',
	'l' = 'l',
	'xl' = 'xl',
	'xxl' = 'xxl'
}
export type Viewports = (VP | keyof typeof VP);

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

	'red' = 'red',
	'deepOrange' = 'deepOrange',
	'orange' = 'orange',
	'amber' = 'amber',
	'yellow' = 'yellow',
	'lime' = 'lime',
	'lightGreen' = 'lightGreen',
	'green' = 'green',
	'teal' = 'teal',
	'cyan' = 'cyan',
	'lightBlue' = 'lightBlue',
	'blue' = 'blue',
	'indigo' = 'indigo',
	'deepPurple' = 'deepPurple',
	'purple' = 'purple',
	'pink' = 'pink',
	'brown' = 'brown',
	'grey' = 'grey',
	'blueGrey' = 'blueGrey',

	'neutral' = 'neutral',
	'dark' = 'dark',
	'light' = 'light'
}
export type Materials = (Material | keyof typeof Material);

export interface ExampleProperties {
	variant?: Variants;
}
