import { create } from '@dojo/framework/core/vdom';
import { ActivityPubObject } from '../common/interfaces';
import coreTheme, { ThemeProperties as CoreProps } from '@dojo/framework/core/middleware/theme';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { ThemeWithVariant, ClassNames, Theme } from '@dojo/framework/core/interfaces';
import { isThemeInjectorPayloadWithVariant } from '@dojo/framework/core/ThemeInjector';
import { Sizes, Viewports, Materials, Spaced, Designs, Elevation, PointerDevices } from '../common/util';
import * as ui from '@redaktor/widgets/theme/material/_ui.m.css';
import * as colors from '@redaktor/widgets/theme/material/_color.m.css';

export { formatAriaProperties, Keys, Designs } from '../common/util';
export interface ViewportProperties extends CoreProps {
	/** The size for the button: 'xs', 's', 'm', 'l', 'xl', 'xxl'
	 * 'm' by default
	 */
	size?: Viewports;
}
export interface ThemeProperties extends CoreProps {
	variant?: string;
	view?: 'responsive' | 'column' | 'row' | 'tableRow';
	/** The size for the button: 'xs', 's', 'm', 'l', 'xl', 'xxl'
	 * 'm' by default
	 */
	size?: Sizes;
	/** The material for the button, e.g. 'secondary', 'success', 'orange', 'deepPurple'
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
	/** The design for the button: 'flat', 'outlined', 'raised', 'shaped'
	 * 'filled' by default
	 */
	design?: Designs;
	/* Shadow */
	depth?: keyof typeof Elevation;
}
interface ThemeIcache {
	l: number;
	viewDesktopCSS: {[k:string]: string;} | false;
}
export type ThemedActivityPubObject = ActivityPubObject & ThemeProperties;
const icache = createICacheMiddleware<ThemeIcache>();
const factory = create({ coreTheme, icache }).properties<ThemeProperties>();

export const THEME_KEY = ' _key';

export function uppercaseFirstChar(value: string) {
	return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

export function lowercaseFirstChar(value: string) {
	return `${value.charAt(0).toLowerCase()}${value.slice(1)}`;
}

export function isThemeWithVariant(theme: any): theme is ThemeWithVariant {
	return theme && theme.hasOwnProperty('variant');
}

export const theme = factory(function({ middleware: { coreTheme, icache }, properties }) {
	const { get, getOrSet } = icache;
	function getTheme() {
		const { theme } = properties();
		if (theme) {
			return theme;
		}
		const themePayload = coreTheme.get();
		if (isThemeInjectorPayloadWithVariant(themePayload)) {
			return { theme: themePayload.theme, variant: themePayload.variant };
		} else if (themePayload) {
			return themePayload.theme;
		}
	}

	return {
		variant: () => {
			return properties().variant === 'inherit' ? undefined : coreTheme.variant();
		},
		get: coreTheme.get,
		set: coreTheme.set,
		classes: coreTheme.classes,
		compose: <T extends ClassNames, B extends ClassNames>(
			baseCss: B,
			css: T,
			prefix?: string
		): Theme | ThemeWithVariant => {
			const theme = getTheme();
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
							const variantClass =
								typeof variantTheme[key] === 'string' && variantTheme[key].trim();
							const virtualClass =
								typeof virtualTheme[key] === 'string' && virtualTheme[key].trim();
							if (!variantClass && virtualClass) {
								prefixCss[classKey] = `${baseTheme[classKey]} ${virtualClass}`;
							}
							if (variantClass) {
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
							theme: {
								...theme.theme.theme,
								[baseKey]: baseTheme
							},
							variants: theme.theme.variants
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
					const variantComposesClass =
						typeof variantTheme[key] === 'string' && variantTheme[key].trim();
					const virtualClass =
						typeof virtualTheme[key] === 'string' && virtualTheme[key].trim();
					if (variantComposesClass) {
						theme[key] = variantComposesClass;
					} else if (virtualClass) {
						theme[key] = `${theme[key]} ${virtualClass}`;
					}
					return theme;
				},
				{ ...baseTheme } as ClassNames
			);

			if (isThemeWithVariant(theme)) {
				return {
					theme: {
						theme: {
							...theme.theme.theme,
							[baseKey]: constructedTheme
						},
						variants: theme.theme.variants
					},
					variant: theme.variant
				};
			}

			return {
				...theme,
				[baseKey]: constructedTheme
			};
		},
		viewDesktopCSS: () => {

			/* TODO : MUST be included in `noscript` build flag builds ! */

			const { view = 'column' } = properties();
			if (!get('viewDesktopCSS')) {
				if (view === 'column' && window.screen.width > 820) {
					import('../theme/material/_columnsDesktop.m.css').then((c) => { getOrSet('viewDesktopCSS', c) });
				} else {
					getOrSet('viewDesktopCSS', false);
				}
			}
			return get('viewDesktopCSS')
		},
		line: () => icache.getOrSet('l', () => {
			const newDiv = document.createElement("div");
			newDiv.style.height = `${window.getComputedStyle(document.documentElement).getPropertyValue('--line')}`;
			document.body.appendChild(newDiv);
			return parseInt(window.getComputedStyle(newDiv).height||''.replace('px',''), 10);
		}),
		isJS: () => !document.documentElement.classList.contains('no-js'),
		uiSize: (_default = 'm' as (keyof typeof ui)) => {
			const { size = _default } = properties();
			return ui.hasOwnProperty(size) ? ui[size] : null
		},
		sized: <T extends ClassNames>(uiCss: T, _default = 'm' as (keyof typeof uiCss)) => {
			const { size = _default } = properties();
			return uiCss.hasOwnProperty(size) ? uiCss[size] : null
		},
		uiSpace: (_default = false) => {
			const { spaced = _default } = properties();
			const spaceClass = (spaced === false ? null : (spaced === 'left' ? 'spaceLeft' :
				(spaced === 'right' ? 'spaceRight' : 'spaceEqual')));
			return spaceClass && ui.hasOwnProperty(spaceClass) ? ui[spaceClass] : null
		},
		spaced: <T extends ClassNames>(uiCss: T, _default = false) => {
			const { spaced = _default } = properties();
			const spaceClass = (spaced === false ? null : (spaced === 'left' ? 'spaceLeft' :
				(spaced === 'right' ? 'spaceRight' : 'spaceEqual')));
			return spaceClass && uiCss.hasOwnProperty(spaceClass) ? uiCss[spaceClass] : null
		},
		uiColor: (_default = 'primary' as (keyof typeof colors)) => {
			const { color = _default } = properties();
			return colors.hasOwnProperty(color) ? colors[color] : null
		},
		colored: <T extends ClassNames>(colorCss: T, _default = 'primary' as (keyof typeof colorCss)) => {
			const { color = _default } = properties();
			return colorCss.hasOwnProperty(color) ? colorCss[color] : null
		},
		uiElevation: (
			defaultShape = 'filled', defaultDepth = { shaped: 1, filled: 2, raised: 4, outlined: 0, flat: 0 }
		) => {
			const { design = defaultShape, depth } = properties();
			const elevation = (typeof depth === 'number' && (depth in Elevation)) ? depth :
				design && defaultDepth.hasOwnProperty(design) ? (defaultDepth as any)[design] : 0;
			return (`raised${elevation}` in ui) && (ui as any)[`raised${elevation}`]
		},
		elevated: <T extends ClassNames>(
			uiCss: T, defaultShape = 'filled', defaultDepth = { shaped: 1, filled: 2, raised: 4, outlined: 0, flat: 0 }
		) => {
			const { design = defaultShape, depth } = properties();
			const elevation = (typeof depth === 'number' && (depth in Elevation)) ? depth :
				design && defaultDepth.hasOwnProperty(design) ? (defaultDepth as any)[design] : 0;
			return (`raised${elevation}` in uiCss) && (uiCss as any)[`raised${elevation}`]
		},
		animated: <T extends ClassNames>(themeCss: T, _default = true) => {
			const { animated = _default } = properties();
			const animationClass = animated === true ? 'animated' : (!Array.isArray(animated) ?
				null : ((animated.indexOf('mouse') > -1 && window.matchMedia("(hover: hover) and (pointer: fine)").matches) ||
					(animated.indexOf('touch') > -1 && window.matchMedia("(hover: none) and (pointer: coarse)").matches) ?
						'animated' : null));
			return animationClass && themeCss.hasOwnProperty(animationClass) ? themeCss[animationClass] : null
		},
		shaped: <T extends ClassNames>(uiCss: T, _default = 'filled') => {
			const { design = _default } = properties();
			return design && uiCss.hasOwnProperty(design) ? uiCss[design] : null
		}
	}
});

export default theme;
