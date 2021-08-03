import { create, tsx } from '@dojo/framework/core/vdom';
import { theme, ThemeProperties } from '../middleware/theme';
import words from '../framework/String/words';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as buttonCss from '../theme/material/button.m.css';
import * as css from '../theme/material/avatar.m.css';

export interface AvatarProperties extends ThemeProperties {
	shape?: 'square' | 'rounded' | 'circle';
	src?: string;
	name?: string;
	alt?: string;
}

const factory = create({ theme }).properties<AvatarProperties>();

export const Avatar = factory(function Avatar({ middleware: { theme }, properties, children }) {
	const themedCss = theme.classes(css);
	const {
		src, name, alt,
		shape = 'circle',
		design = 'filled' as (keyof typeof buttonCss)
	} = properties();

	const c = children();
	const avatarStr = (s: string) => {
		const w = words(s);
		return !w.length ? '' :
			(w.length < 2 ? s.substr(0,2) : `${w[0].charAt(0)}${w[1].charAt(0)}`)
	}
	const content = !src && !!name ? avatarStr(name) :
		(c.length === 1 ? c.map((c0) => typeof c0 === 'string' ? avatarStr(c0) : c0) : c);

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
				themedCss.root,
				buttonCss[design],
				themedCss[shape]
				// theme.animated(themedCss)
			]}
			styles={ src ? { backgroundImage: `url(${src})` } : {} }
		>
			<span classes={themedCss.content}>{content}</span>
		</div>
	);
});

export default Avatar;
