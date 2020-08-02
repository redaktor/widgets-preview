import { create } from '@dojo/framework/core/vdom';
import { Sizes, Materials, Spaced, PointerDevices } from '../common/util';
import coreTheme, { ThemeProperties as CoreProps } from '@dojo/framework/core/middleware/theme';
import { ClassNames, Theme } from '@dojo/framework/core/mixins/Themed';
import { ThemeWithVariant } from '@dojo/framework/core/interfaces';

export { formatAriaProperties, Keys, Variants } from '../common/util';

export const THEME_KEY = ' _key';

function uppercaseFirstChar(value: string) {
	return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function lowercaseFirstChar(value: string) {
	return `${value.charAt(0).toLowerCase()}${value.slice(1)}`;
}

function isThemeWithVariant(theme: any): theme is ThemeWithVariant {
	return theme && theme.hasOwnProperty('variant');
}

export interface ThemeProperties extends CoreProps {
	/** The size for the button: 'xs', 's', 'm', 'l', 'xl', 'xxl'
	 * 'm' by default
	 */
	size?: Sizes;
	/** The material for the button, e.g. 'secondary', 'success', 'orange', 'deep_purple'
	 * 'primary' by default
	 */
	color?: Materials;
	/** The horizontal space: true for equal, false for not spaced or 'left', 'right'
	 * true by default
	 */
	spaced?: Spaced;
	/** Whether it has a pulse animation, can be an Array: 'mouse', 'pen', 'touch'
	 * true by default
	 */
	animated?: PointerDevices;
}
const factory = create({ coreTheme }).properties<ThemeProperties>();
export const theme = factory(function({ middleware: { coreTheme }, properties }) {
	return {
		isJS: () => !document.documentElement.classList.contains('no-js'),
		sized: <T extends ClassNames>(uiCss: T, _default = 'm' as (keyof typeof uiCss)) => {
			const { size = _default } = properties();
			return uiCss.hasOwnProperty(size) ? uiCss[size] : null
		},
		spaced: <T extends ClassNames>(uiCss: T, _default = true) => {
			const { spaced = _default } = properties();
			const spaceClass = (spaced === false ? null : (spaced === 'left' ? 'spaceLeft' :
				(spaced === 'right' ? 'spaceRight' : 'spaceEqual')));
			return spaceClass && uiCss.hasOwnProperty(spaceClass) ? uiCss[spaceClass] : null
		},
		colored: <T extends ClassNames>(colorCss: T, _default = 'primary' as (keyof typeof colorCss)) => {
			const { color = _default} = properties();
			return colorCss.hasOwnProperty(color) ? colorCss[color] : null
		},
		animated: <T extends ClassNames>(themeCss: T, _default = true) => {
			const { animated = _default } = properties();
			const animationClass = animated === true ? 'animated' : (!Array.isArray(animated) ?
				null : ((animated.indexOf('mouse') > -1 && window.matchMedia("(hover: hover) and (pointer: fine)").matches) ||
					(animated.indexOf('touch') > -1 && window.matchMedia("(hover: none) and (pointer: coarse)").matches) ?
						'animated' : null));
			return animationClass && themeCss.hasOwnProperty(animationClass) ? themeCss[animationClass] : null
		},

		compose: <T extends ClassNames, B extends ClassNames>(
			baseCss: B,
			css: T,
			prefix?: string
		): Theme | ThemeWithVariant => {
			const theme = properties().theme || coreTheme.get();
			const baseKey = baseCss[THEME_KEY];
			const variantKey = css[THEME_KEY];
			const virtualCss = Object.keys(baseCss).reduce(
				(virtualCss, key) => {
					if (key === THEME_KEY) {
						return virtualCss;
					}
					if (prefix && !virtualCss[`${prefix}${uppercaseFirstChar(key)}`]) {
						virtualCss[`${prefix}${uppercaseFirstChar(key)}`] = ' ';
					}
					if (!css[key]) {
						virtualCss[key] = ' ';
					}
					return virtualCss;
				},
				{ [THEME_KEY]: variantKey } as ClassNames
			);
			const virtualTheme = coreTheme.classes(virtualCss);
			const variantTheme = coreTheme.classes(css);
			let baseTheme = coreTheme.classes(baseCss);
			if (prefix) {
				const prefixedCss = Object.keys({ ...virtualTheme, ...variantTheme }).reduce(
					(prefixCss, key) => {
						if (key.indexOf(prefix) === 0 && key !== prefix) {
							const classKey = lowercaseFirstChar(key.replace(prefix, ''));
							if (
								!variantTheme[key] &&
								virtualTheme[key] &&
								virtualTheme[key].trim()
							) {
								prefixCss[classKey] = `${baseTheme[classKey]} ${virtualTheme[
									key
								].trim()}`;
							}
							if (variantTheme[key]) {
								prefixCss[classKey] = variantTheme[key];
							}
						}
						return prefixCss;
					},
					{} as ClassNames
				);
				baseTheme = { ...baseTheme, ...prefixedCss };

				if (isThemeWithVariant(theme)) {
					return {
						theme: {
							...theme.theme,
							[baseKey]: baseTheme
						},
						variant: theme.variant
					};
				}

				return {
					...theme,
					[baseKey]: baseTheme
				};
			}

			const constructedTheme = Object.keys(baseTheme).reduce(
				(theme, key) => {
					if (key === THEME_KEY) {
						return theme;
					}
					const variantComposesClass = variantTheme[key] && variantTheme[key].trim();
					if (variantTheme[key]) {
						theme[key] = variantComposesClass;
					} else if (virtualTheme[key] && virtualTheme[key].trim()) {
						theme[key] = `${theme[key]} ${virtualTheme[key].trim()}`;
					}
					return theme;
				},
				{ ...baseTheme } as ClassNames
			);

			if (isThemeWithVariant(theme)) {
				return {
					theme: {
						...theme.theme,
						[baseKey]: constructedTheme
					},
					variant: theme.variant
				};
			}

			return {
				...theme,
				[baseKey]: constructedTheme
			};
		},
		...coreTheme
	};
});

export default theme;
