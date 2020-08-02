
import { ISO31661_2, ISO31661_3 } from './ISO3166';
import { ISO639_1, ISO639_2, ISO639_3 } from './ISO639';
export const militaryTime:RegExp = /^([01]\d|2[0-3]):?([0-5]\d)$/;
export const fullWidth:RegExp = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
export const halfWidth:RegExp = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
export const hexColor:RegExp = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
export const hexadecimal:RegExp = /^[0-9a-fA-F]+$/;
export const mongoId:RegExp = /^[0-9a-fA-F]+$/;
export const multibyte:RegExp = /[^\x00-\x7F]/;
export const surrogatePair:RegExp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
export const uuid3:RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-3[0-9a-fA-F]{3}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
export const uuid4:RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89AB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
export const uuid5:RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-5[0-9a-fA-F]{3}-[89AB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
export const uuid:RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
export const iso31661_2:RegExp = new RegExp(`^${ISO31661_2}$`);
export const iso31661_3:RegExp = new RegExp(`^${ISO31661_3}$`);
export const iso31661:RegExp = new RegExp(`^${ISO31661_2}|${ISO31661_3}$`);
export const iso639_1:RegExp = new RegExp(`^${ISO639_1}$`);
export const iso639_2:RegExp = new RegExp(`^${ISO639_2}$`);
export const iso639_3:RegExp = new RegExp(`^${ISO639_3}$`);
export const iso639:RegExp = new RegExp(`^${ISO639_1}|${ISO639_3}$`); /* ISO639_3 contains _2 */
export const bcp47exceptions = 'en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon'+
'|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE'+
'|art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang';
export const bcp47:RegExp = new RegExp(`^(?:${ISO639_1}|${ISO639_2})(?:-|$)`+
  `(?:(?:[A-Za-z]{2,3})|[A-Za-z]{4}|[A-Za-z]{5,8})?`+
  `(?:-([A-Za-z]{4}))?(?:-([A-Za-z]{2}|\\d{3}))?((?:-(?:[\\dA-Za-z]{5,8}|\\d[\\dA-Za-z]{3}))*)?`+
  `((?:-[\\da-wy-z](?:-[\\dA-Za-z]{2,8})+)*)?(-x(?:-[\\dA-Za-z]{1,8})+)?$`+
  `|`+
  `(?:^${bcp47exceptions}$)`);
export const mimeBase:RegExp = new RegExp(
  `^(application|audio|chemical|font|image|message|model|multipart|text|video|x-conference|x-shader)`+
  `[\\/](?:([a-zA-Z0-9_+\\.\\-]){2,80})$`
)
