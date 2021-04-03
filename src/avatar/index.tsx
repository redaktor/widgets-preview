import { create, tsx } from '@dojo/framework/core/vdom';
import { theme, ThemeProperties, Variants } from '../middleware/theme';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as buttonCss from '../theme/material/button.m.css';
import * as css from '../theme/material/avatar.m.css';

export interface AvatarProperties extends ThemeProperties {
	shape?: 'square' | 'rounded' | 'circle';
	src?: string;
	alt?: string;
}

const factory = create({ theme }).properties<AvatarProperties>();

export const Avatar = factory(function Avatar({ middleware: { theme }, properties, children }) {
	const themeCss = theme.classes(css);
	const {
		src, alt,
		shape = 'circle',
		variant = 'filled' as (keyof typeof buttonCss)
	} = properties();
	return (
		<div
			key="root"
			role={src && 'image'}
			aria-label={alt}
			classes={[
				theme.variant(),
				theme.shaped(ui),
				theme.colored(colors),
				theme.elevated(ui),
				theme.sized(ui, 'l'),
				theme.spaced(ui),
				buttonCss.root,
				themeCss.root,
				buttonCss[variant],
				themeCss[shape]
				// theme.animated(themeCss)
			]}
			styles={ src ? { backgroundImage: `url(${src})` } : {} }
		>
			{children()}
		</div>
	);
});

export default Avatar;
