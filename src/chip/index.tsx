import { create, tsx } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import theme, { ThemeProperties, Keys, Variants } from '../middleware/theme';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/chip.m.css';
import Icon from '../icon/index';

export interface ChipProperties extends ThemeProperties {
	/** A callback when the close icon is clicked, if `closeRenderer` is not provided a default X icon will be used */
	onClose?(): void;
	/** An optional callback for the the widget is clicked */
	onClick?(): void;
	/** Whether the widget is disabled, only affects the widget when `onClick` is provided */
	disabled?: boolean;
	/** Indicates whe "checked" state of the widget, will be passed to the icon renderer */
	checked?: boolean;
	/** */
	inline?: boolean;
}

export interface ChipChildren {
	/** Renders an icon, provided with the value of the checked property */
	icon?(checked?: boolean): RenderResult;
	/** The label to be displayed in the widget */
	label: RenderResult;
	/** Renders a close icon, ignored if `onClose` is not provided */
	closeIcon?: RenderResult;
}

const factory = create({ theme })
	.properties<ChipProperties>()
	.children<ChipChildren | RenderResult>();

export default factory(function Chip({ properties, children, middleware: { theme } }) {
	const themedCss = theme.classes(css);
	const {
		onClose, onClick, disabled, checked, inline,
		variant = 'flat' as (keyof typeof themedCss)
	} = properties();
	const [{ icon, closeIcon, label: l} = {} as any] = children();
	const label = (!!l ? l : (!l && !!children()) ?
		children() : void 0) || void 0;
	const clickable = !disabled && onClick;
	return (
		<span
			key="root"
			classes={[
				theme.variant(),
				themedCss.root,
				theme.shaped(themedCss),
				theme.sized(ui),
				theme.colored(colors),
				theme.elevated(ui),
				theme.spaced(ui),
				theme.animated(themedCss),
				inline && themedCss.inline,
				disabled && themedCss.disabled,
				clickable && themedCss.clickable
			]}
			role={clickable ? 'button' : undefined}
			onclick={() => {
				if (clickable && onClick) {
					onClick();
				}
			}}
			tabIndex={clickable ? 0 : undefined}
			onkeydown={(event) => {
				if (
					clickable &&
					onClick &&
					(event.which === Keys.Enter || event.which === Keys.Space)
				) {
					event.preventDefault();
					onClick();
				}
			}}
		>
			{icon && <span classes={themedCss.iconWrapper}>{icon(checked)}</span>}
			{label}
			{onClose && (
				<span
					key="closeButton"
					classes={themedCss.closeIconWrapper}
					tabIndex={0}
					role="button"
					onclick={(event) => {
						event.stopPropagation();
						onClose();
					}}
					onkeydown={(event) => {
						if (event.which === Keys.Enter || event.which === Keys.Space) {
							event.stopPropagation();
							event.preventDefault();
							onClose();
						}
					}}
				>
					{closeIcon || (
						<Icon
							type="close"
							classes={{ '@redaktor/widgets/icon': { icon: [themedCss.icon] } }}
						/>
					)}
				</span>
			)}
		</span>
	);
});
