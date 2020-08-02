import { RenderResult } from '@dojo/framework/core/interfaces';
import focus from '@dojo/framework/core/middleware/focus';
import { theme, formatAriaProperties } from '../middleware/theme';
import { create, tsx } from '@dojo/framework/core/vdom';

import { CheckboxBaseProperties } from '../checkbox';
// import Label from '../label';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as cb from '../theme/material/checkbox.m.css';
import * as css from '../theme/material/switch.m.css';

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
		variant = 'flat',
		// classes,
		disabled,
		labelHidden,
		name,
		onBlur,
		onFocus,
		onValue,
		onOut,
		onOver,
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
			aria-hidden={type && value ? 'true' : null}
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
				themedCss[variant as (keyof typeof themedCss)], /* TODO */
				theme.spaced(ui),
				theme.colored(colors),
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
				classes={themedCss.input}
				checked={!!value}
				disabled={disabled}
				focus={focus.shouldFocus()}
				aria-invalid={valid === false ? 'true' : null}
				name={name}
				readonly={readOnly}
				aria-readonly={readOnly === true ? 'true' : null}
				required={required}
				type="checkbox"
				value={`${value}`}
				role="switch"
				aria-checked={value}
				onblur={() => onBlur && onBlur()}
				onchange={(event: Event) => {
					event.stopPropagation();
					const checkbox = event.target as HTMLInputElement;
					onValue && onValue(checkbox.checked);
				}}
				onfocus={() => onFocus && onFocus()}
				onpointerenter={() => onOver && onOver()}
				onpointerleave={() => onOut && onOut()}
			/>
			<div classes={[theme.sized(ui), themedCss.track]}>
				<div classes={[
					cb[variant as (keyof typeof cb)],
					themedCss.thumb
				]}/>
			</div>
			{onLabel && (getLabel(onLabel, 'onLabel'))}
			{label && (getLabel(label, 'label'))}
		</div>
	);
});
