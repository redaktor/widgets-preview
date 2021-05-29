import { create, tsx } from '@dojo/framework/core/vdom';
import focus from '@dojo/framework/core/middleware/focus';
import { i18n } from '@dojo/framework/core/middleware/i18n';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { RadioGroupProperties } from '../radioGroup';
import { theme, formatAriaProperties } from '../middleware/theme';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/selectNative.m.css';
import * as labelCss from '../theme/material/label.m.css';
import * as iconCss from '../theme/material/icon.m.css';
import HelperText from '../helperText';
import Icon from '../icon';
import Label from '../label';

export interface NativeSelectProperties extends RadioGroupProperties {
	/** Allow multiple selected values, default false */
	multiple?: boolean;
	/** Sets the helper text of the input */
	helperText?: string;
	/** Represents the number of rows the are visible at one time */
	rowMax?: number;
}

interface NativeSelectICache {
	initial: string;
	value: string;
	prependBlank: boolean;
}

const icache = createICacheMiddleware<NativeSelectICache>();

const factory = create({ icache, focus, theme, i18n })
	.properties<NativeSelectProperties>()
	.children<any>();

export const NativeSelect = factory(function NativeSelect({
	properties,
	children,
	id,
	middleware: { icache, theme, focus }
}) {
	const {
		variant = 'flat',
		isSerif = false,
		focusable = true,
		multiple = false,
		aria = {},
		classes,
		disabled,
		helperText,
		initialValue,
		onEnter,
		onOut,
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
	const inputFocused = focus.isFocused('selectNative');
	const selectProperties: any = !focusable ? {} : { tabIndex: 0 };
	if (!!multiple) { selectProperties.multiple = true }
	return (
		<div
			classes={[
				theme.variant(),
				themedCss.root,
				theme.sized(ui),
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
					key="selectNative"
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
					onfocus={() => {
						console.log('on Focus');
						onFocus && onFocus();
					}}
					onblur={() => {
						onBlur && onBlur();
					}}
					onpointerenter={() => onEnter && onEnter()}
					onpointerleave={() => onOut && onOut()}
					classes={[
						themedCss.select,
						theme.sized(ui),
						themedCss[variant as (keyof typeof themedCss)],
						isSerif ? themedCss.serif : themedCss.sans
					]}
					{...formatAriaProperties(aria)}
					{...selectProperties}
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
