import { create, tsx } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import focus from '@dojo/framework/core/middleware/focus';
import { theme, formatAriaProperties } from '@redaktor/widgets/middleware/theme';
import { CheckboxBaseProperties } from '@redaktor/widgets/checkbox';
// import Label from '@redaktor/widgets/label';
import * as ui from '@redaktor/widgets/theme/material/_ui.m.css';
import * as colors from '@redaktor/widgets/theme/material/_color.m.css';
import * as cb from '@redaktor/widgets/theme/material/checkbox.m.css';
import * as css from '@redaktor/widgets/theme/material/switch.m.css';

interface SwitchProperties extends CheckboxBaseProperties {}

export interface SwitchChildren {
	/** The label to be displayed for the switch */
	label?: RenderResult;
	/** Label to show in the "off" position of the switch */
	offLabel?: RenderResult;
	/** Label to show in the "on" position of the switch */
	onLabel?: RenderResult;
}

const factory = create({ theme, focus })
	.properties<SwitchProperties>()
	.children<SwitchChildren | RenderResult | undefined>();

export default factory(function Switch({ children, properties, id, middleware: { theme, focus } }) {
	const {
		aria = {},
		design,
		disabled,
		labelHidden,
		name,
		onBlur,
		onFocus,
		onValue,
		onOut,
		onEnter,
		readOnly,
		required,
		theme: themeProp,
		valid,
		value = false
	} = properties();

	const [{ label: l, offLabel, onLabel } = {} as any] = children();
	const label: SwitchChildren | undefined = (!!l ? l : (!l && !!children()) ?
		children() : void 0) as SwitchChildren | undefined;
	const themedCss = theme.classes(css);
	const idBase = `switch-${id}`;

	const getLabel = (text: typeof label, type: keyof typeof themedCss) =>
		<label
			key={type}
			classes={[theme.sized(ui), themedCss[type]]}
			aria-hidden={type && value ? 'true' : void 0}
			theme={themeProp}
			disabled={disabled}
			focused={focus.isFocused('root')}
			valid={valid}
			readOnly={readOnly}
			required={required}
			hidden={labelHidden}
			for={idBase}
			secondary={true}
		>{text}</label>


	return (
		<div
			key="root"
			classes={[
				theme.variant(),
				themedCss.root,
				theme.shaped(themedCss),
				theme.sized(ui),
				theme.colored(colors),
				theme.spaced(ui),
				theme.animated(themedCss),
				value ? themedCss.checked : null,
				disabled ? themedCss.disabled : null,
				focus.isFocused('root') ? themedCss.focused : null,
				valid === false ? themedCss.invalid : null,
				valid === true ? themedCss.valid : null,
				readOnly ? themedCss.readonly : null,
				required ? themedCss.required : null
			]}
		>
			{offLabel && (getLabel(offLabel, 'offLabel'))}
			<input
				id={idBase}
				{...formatAriaProperties(aria)}
				classes={[themedCss.input, theme.elevated(ui)]}
				checked={!!value}
				disabled={disabled}
				focus={focus.shouldFocus()}
				aria-invalid={valid === false ? 'true' : void 0}
				name={name}
				readonly={readOnly}
				aria-readonly={readOnly === true ? 'true' : void 0}
				required={required}
				type="checkbox"
				value={`${value}`}
				role="switch"
				aria-checked={value ? 'true' : 'false'}
				onblur={() => onBlur && onBlur()}
				onchange={(event: Event) => {
					event.stopPropagation();
					const checkbox = event.target as HTMLInputElement;
					onValue && onValue(checkbox.checked);
				}}
				onfocus={() => onFocus && onFocus()}
				onpointerenter={() => onEnter && onEnter()}
				onpointerleave={() => onOut && onOut()}
			/>
			<div classes={[theme.sized(ui), themedCss.track]}>
				<div classes={[
					cb[design as (keyof typeof cb)],
					themedCss.thumb
				]}/>
			</div>
			{onLabel && (getLabel(onLabel, 'onLabel'))}
			{label && (getLabel(label, 'label'))}
		</div>
	);
});
