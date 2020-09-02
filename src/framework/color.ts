export type RGB = [number, number, number];

export function specificLight(rgb: RGB) {
  const [r,g,b] = rgb;
  return 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}
export function bestTextColor(rgb: RGB, lightText = '#ffffff', darkText = '#000000', average = 0.5) {
  return specificLight(rgb) > average ? lightText : darkText;
}

export function rgb2hex(r: number, g: number, b: number) {
	return [r, g, b].reduce((s, v) => {
  	const hex = v.toString(16);
    return s + (hex.length === 1 ? '0' + hex : hex);
  }, '#');
}
export function rgb2hsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if(max === min){
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    typeof h === 'number' ? h /= 6 : h = 1;
  }
  return [360*h, 100*s, 100*l]
}

export function hsl2rgb(_h: number, _s: number, _l: number): RGB {
  let r, g, b;
  let [h, s, l] = [_h, _s, _l].map((v, i) => v / (!i ? 360 : 100));
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) { t += 1 }
      if (t > 1) { t -= 1 }
      if (t < 1/6) { return p + (q - p) * 6 * t }
      if (t < 1/2) { return q }
      if (t < 2/3) { return p + (q - p) * (2/3 - t) * 6 }
      return p;
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r*255), Math.round(g*255), Math.round(b*255)];
}
export function hsl2hex(h: number, s: number, l: number) {
	return rgb2hex(...hsl2rgb(h, s, l));
}

function toHex(hex: string) {
  hex = hex.replace(/^#/,'');
  const CL = [2,2,2].map((n,i) => `([a-f\\d]{${hex.length > 5-i ? n : 1}})`);
  const hexArr = new RegExp(`^#?${CL[0]}${CL[1]}${CL[2]}$`, 'i').exec(hex);
  return !hexArr ? null : hexArr.slice(1).map((c) => c.length === 2 ? c : `${c}${c}`)
}
export function hex2rgb(hex: string): RGB {
	const hexArr = toHex(hex);
  return !hexArr ? [-1, -1, -1] : <RGB>hexArr.map(s => parseInt(s, 16));
}
export function hex2hsl(hex: string) {
  const hexArr = toHex(hex);
	return !hexArr ? [-1, -1, -1] : rgb2hsl(...hex2rgb(hex));
}
/**
 * Minimize the maximum possible loss
 *
 * @param      {number}             val The input value to test
 * @return     {number}             A number between 0 and 100
 */
export function minmax(v: number, maxi = 100, mini = 0) {
  return Math.min(maxi, Math.max(mini, v))
}
export function minmaxHue(h: number) {
return h < 0 ? (h + 360) : (h > 360 ? (h - 360) : h);
}
export function hslCheck(h: number, s: number, l: number) {
  if (isNaN(h) || isNaN(s) || isNaN(l)) {
    throw new TypeError('Invalid input')
  }
  if (h < 0 || h > 360) {
    throw new RangeError(`Hue must be an integer within [0, 360]; given ${h}`)
  }
  if (s < 0 || s > 100) {
    throw new RangeError(`Saturation must be an integer within [0, 100]; given ${s}`)
  }
  if (l < 0 || l > 100) {
    throw new RangeError(`Lightness must be an integer within [0, 100]; given ${l}`)
  }
}
