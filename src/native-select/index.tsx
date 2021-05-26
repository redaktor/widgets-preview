import { create, tsx } from '@dojo/framework/core/vdom';
import focus from '@dojo/framework/core/middleware/focus';
import { i18n } from '@dojo/framework/core/middleware/i18n';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import HelperText from '../helper-text';
import { theme, formatAriaProperties, ThemeProperties, Variants } from '../middleware/theme';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/native-select.m.css';
import * as labelCss from '../theme/material/label.m.css';
import * as iconCss from '../theme/material/icon.m.css';
import Icon from '../icon';
import Label from '../label';
import { RenderResult } from '@dojo/framework/core/interfaces';

export type MenuOption = { value: string; label?: string; disabled?: boolean };

export interface NativeSelectProperties extends ThemeProperties {
	/** The initial selected value */
	initialValue?: string;
	/** A controlled value */
	value?: string;
	/** Options to display within the menu */
	options: MenuOption[];
	/** Property to determine if the input is disabled */
	disabled?: boolean;
	/** Sets the helper text of the input */
	helperText?: string;
	/** Boolean to indicate if field is required */
	required?: boolean;
	/** Used to specify the name of the control */
	name?: string;
	/** Represents the number of rows the are visible at one time */
	rowMax?: number;
	/** Serif typo options, default false */
	isSerif?: boolean;
	/** Callback called when user selects a value */
	onValue?(value: string): void;
	/** Handler for events triggered by select field losing focus */
	onBlur?(): void;
	/** Handler for events triggered by the select element being focused */
	onFocus?(): void;
}

interface NativeSelectICache {
	initial: string;
	value: string;
	prependBlank: boolean;
}

const icache = createICacheMiddleware<NativeSelectICache>();

const factory = create({ icache, focus, theme, i18n })
	.properties<NativeSelectProperties>()
	.children<RenderResult | undefined>();

export const NativeSelect = factory(function NativeSelect({
	properties,
	children,
	id,
	middleware: { icache, theme, focus }
}) {
	const {
		variant = 'flat',
		isSerif = false,
		size,
		classes,
		disabled,
		helperText,
		initialValue,
		onValue,
		options,
		required,
		name,
		rowMax,
		onFocus,
		onBlur
	} = properties();

	const [label] = children();
	let { value } = properties();

	if (value === undefined) {
		value = icache.get('value');
		const existingInitialValue = icache.get('initial');
		icache.set('prependBlank', true);

		if (initialValue !== undefined) {
			icache.set('prependBlank', false);
			if (initialValue !== existingInitialValue) {
				icache.set('initial', initialValue);
				icache.set('value', initialValue);
				value = initialValue;
			}
		}
	}

	const selectedValue = value;
	const themedCss = theme.classes(css);
	const inputFocused = focus.isFocused('native-select');

	return (
		<div
			classes={[
				theme.variant(),
				themedCss.root,
				theme.sized(ui),
				size && themedCss[(size as keyof typeof themedCss)],
				theme.spaced(ui),
				theme.colored(colors),
				theme.animated(themedCss),
				disabled && themedCss.disabled,
				required && themedCss.required,
				inputFocused ? themedCss.focused : undefined
			]}
			key="root"
		>
			{label && (
				<Label
					theme={theme.compose(
						labelCss,
						css,
						'label'
					)}
					focused={inputFocused}
					classes={classes}
					disabled={disabled}
					forId={id}
					required={required}
					active={!!selectedValue}
				>
					{label}
				</Label>
			)}
			<div classes={themedCss.inputWrapper}>
				<select
					key="native-select"
					onchange={(event: Event) => {
						const { value } = event.target as HTMLInputElement;
						if (value !== icache.get('value')) {
							icache.set('value', value);
							onValue && onValue(value);
						}
					}}
					disabled={disabled}
					name={name}
					required={required}
					id={id}
					rowMax={rowMax}
					tabIndex={0}
					onfocus={() => {
						console.log('on Focus');
						onFocus && onFocus();
					}}
					onblur={() => {
						onBlur && onBlur();
					}}
					classes={[
						themedCss.select,
						theme.sized(ui),
						themedCss[variant as (keyof typeof themedCss)],
						isSerif ? themedCss.serif : themedCss.sans
					]}
				>
					{icache.get('prependBlank') && <option key="blank-option" value="" />}

					// TODO optgroup / multiple
					{options.map(({ value, label, disabled = false }, index) => {
						return (
							<option
								key={`option-${index}`}
								value={value}
								disabled={disabled}
								selected={selectedValue === value}
							>
								{label ? label : value}
							</option>
						);
					})}
				</select>
				<div classes={[themedCss.box, theme.elevated(ui)]} />
				<div classes={[themedCss.arrow]}>
					<Icon
						type="down"
						theme={theme.compose(
							iconCss,
							css,
							'icon'
						)}
						classes={classes}
					/>
				</div>
			</div>
			<HelperText key="helperText" text={helperText} />
		</div>
	);
});

export default NativeSelect;
