import { Keyboard } from '../interfaces';

export enum Key {
	Unidentified = 0,
	Cancel = 3,
	Help = 6,
	Backspace = 8,
	Tab = 9,
	Clear = 12,
	Enter = 13,
	Shift = 16,
	Control = 17,
	Alt = 18,
	Pause = 19,
	CapsLock = 20,
	Escape = 27,
	Convert = 28,
	NonConvert = 29,
	Accept = 30,
	ModeChange = 31,
	' '  = 32,
	PageUp = 33,
	PageDown = 34,
	End = 35,
	Home = 36,
	ArrowLeft = 37,
	ArrowUp = 38,
	ArrowRight = 39,
	ArrowDown = 40,
	Select = 41,
	Print = 42,
	Execute = 43,
	PrintScreen = 44,
	Insert = 45,
	Delete = 46,
	/* Printable ASCII */
	Meta = 91,
	ContextMenu = 93,
	/* ... NumPad */
	'*' = 106,
	'+' = 107,
	'-' = 109,
	'.' = 110,
	'/' = 111,
	/* ... F Keys */
	NumLock = 144,
	ScrollLock = 145,
	VolumeMute = 181,
	VolumeDown = 182,
	VolumeUp = 183,
	AltGraph = 225,
	Attn = 246,
	CrSel = 247,
	ExSel = 248,
	EraseEof = 249,
	Play = 250,
	ZoomOut = 251
}
export type Keys = keyof typeof Key;

function keyShim(event: KeyboardEvent): string {
	/*
	IE9:
	The Scroll Lock key is reported as "Scroll" instead of "ScrollLock"
	IE9, FF (per bug 1232918) :
	The Windows key is reported as "OS" instead of "Meta".
	These keys are returned as "OS" by Firefox:
	VK_LWIN (91) and VK_RWIN (92) on Windows, and GDK_KEY_Super_L (0xFFEB),
	GDK_KEY_Super_R (0xFFEC), GDK_KEY_Hyper_L (0xFFED), and GDK_KEY_Hyper_R (0xFFEE) on Linux.
	*/
	if (typeof event.key === 'string' && event.key !== 'OS') {
		if (event.key === 'Scroll') { return 'ScrollLock' }
		return event.key
	}
	// event has no .key
  const i: number = event.which || event.keyCode || event.charCode;
  if (!i || typeof i !== 'number') { return 'Unidentified' }
	if (i === 16 || i === 160 || i === 161) { return 'Shift' }
	if (i === 17 || i === 162 || i === 163) { return 'Control' }
	if (i === 18 || i === 164 || i === 165) { return 'Alt' }
	if (i === 91 || i === 92 || i === 224) { return 'Meta' }
	const key = String.fromCharCode(i);
	if (i > 64 && i < 91) {
		return !event.shiftKey ? key.toLowerCase() : key
	} else if (i > 111 && i < 136) {
		return `F${i - 111}`
	} else if (i > 95 && i < 106) {
		return String.fromCharCode(i - 48)
	}

	return Key[i] || key || 'Unidentified'
}


export function key(event: KeyboardEvent): string
export function key(event: KeyboardEvent, qKey: string, ...keys: string[]): string | boolean
export function key(event: KeyboardEvent, qKey?: string, ...keys: string[]): string | boolean {
	const _key = keyShim(event);
	return qKey ? ([qKey, ...keys].some((k) => (_key === k)) ? _key : false) : _key;
}
export function keyName(event: KeyboardEvent): Keys
export function keyName(event: KeyboardEvent, qKey: Keys, ...keys: Keys[]): Keys | boolean
export function keyName(event: KeyboardEvent, qKey?: Keys, ...keys: Keys[]): Keys | boolean {
	const _key = keyShim(event);
	return qKey ? ([qKey, ...keys].some((k) => (_key === k)) ? <Keys>_key : false) :
		(_key in Key ? <Keys>key(event) : 'Unidentified');
}

export default function keyboard(event: KeyboardEvent): Keyboard {
	if (!event.key) {
		Object.defineProperty(event, 'key',  {
			value: key(event),
			writable: false
		});
	}
	Object.defineProperty(event, 'KEY',  {
		value: keyName(event),
		writable: false
	});
	Object.defineProperty(event, 'isStart',  {
		value: (event.which === 229),
		writable: false
	});
	Object.defineProperty(event, 'isEnd',  {
		value: (event.which === 9 || event.which === 13 || event.which === 27 || event.which === 32),
		writable: false
	});
	return <Keyboard>event
}
