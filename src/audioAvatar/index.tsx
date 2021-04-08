import { create, tsx, node } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { dimensions } from '@dojo/framework/core/middleware/dimensions';
import { theme, ThemeProperties, Variants } from '../middleware/theme';
import words from '../framework/String/words';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as buttonCss from '../theme/material/button.m.css';
import * as css from '../theme/material/avatar.m.css';

export interface AvatarProperties extends ThemeProperties {
	audioElement: HTMLMediaElement;
	shape?: 'square' | 'rounded' | 'circle';
	src?: string;
	name?: string;
	alt?: string;
	canvFillColor?: string;
	radius?: number;
	lineWidth?: number;
	lineSpace?: number;
	barWidth?: number;
	barLength?: number;
	barColors?: string[];
}
export interface AvatarICache {
	animId: number;
	canVisualise: boolean;
	audioCtx: any;
	analyser: any;
}
// browsers compatibility
(window as any).AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext ||
	(window as any).mozAudioContext || (window as any).msAudioContext;
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
	(window as any).mozRequestAnimationFrame || (window as any).msRequestAnimationFrame;

const icache = createICacheMiddleware<AvatarICache>();
const factory = create({ theme, node, dimensions, icache }).properties<AvatarProperties>();

export const AudioAvatar = factory(function Avatar({ middleware: { theme, node, dimensions, icache }, properties, children }) {
	const themedCss = theme.classes(css);
	const {
		audioElement: audio,
		canvFillColor = 'transparent',
		lineWidth = 2.5, lineSpace = 2, barWidth = 1.5, barLength = 0,
		src, name, alt, radius,
		shape = 'circle',
		variant = 'filled' as (keyof typeof buttonCss)
	} = properties();
	let { barColors } = properties();

	const canvas = node.get('canvas');
	if (!barColors) {
		barColors = [
			canvas && getComputedStyle(canvas).getPropertyValue('--m-800') || '#e03c05',
			canvas && getComputedStyle(canvas).getPropertyValue('--m-500') || '#ff7a00'
		];
	}
	const c = children();
	const avatarStr = (s: string) => {
		const w = words(s);
		return !w.length ? '' :
			(w.length < 2 ? s.substr(0,2) : `${w[0].charAt(0)}${w[1].charAt(0)}`)
	}
	const content = !src && !!name ? avatarStr(name) :
		(c.length === 1 ? c.map((c0) => typeof c0 === 'string' ? avatarStr(c0) : c0) : c);


	const ctx = canvas && (canvas as HTMLCanvasElement).getContext('2d');
	icache.getOrSet('canVisualise', false, false);
	icache.getOrSet('animId', 0);
	/**
	 * Set audio audioCtx analyser.
	 */
	const setAnalyser = () => {
		if (!icache.get('audioCtx')) {
			icache.set('audioCtx', new ((window as any).AudioContext || (window as any).webkitAudioContext)(), false);
			icache.set('analyser', icache.get('audioCtx').createAnalyser(), false);
		}
		if (!icache.get('audioCtx')) {
			console.log('No AudioContext');
			return
		}
		try {
			const source = icache.get('audioCtx').createMediaElementSource(audio);
			source.connect(icache.get('analyser'));
			icache.get('analyser').connect(icache.get('audioCtx').destination);
			icache.set('canVisualise', true);
		} catch (e) {
			console.log(e.toString());
		}
  }

	const wh = () => [
		(dimensions.get('root').offset.width * 2)||100,
		(dimensions.get('root').offset.height * 2)||100
	];
  /**
   * Canvas gradient. Vertical, from top down
   */
	const fillGradient = (colorsArray: string[]) => {
    const [w, h] = wh();
    const gradient = ctx && ctx.createLinearGradient(w / 2, 0, w / 2, h);
    let offset = 0;
    colorsArray.forEach(color => {
      gradient && gradient.addColorStop(offset, color);
      offset += (1 / colorsArray.length);
    })
    return gradient
  }


  const _setCanvas = () => {
		if (!ctx || !canvFillColor) { return }
		const [w, h] = wh();
    ctx.clearRect(0, 0, w, h);
    (ctx as any).fillStyle = Array.isArray(canvFillColor)
      ? fillGradient(canvFillColor)
      : canvFillColor
    !!ctx && ctx.fillRect(0, 0, w, h)
  }

  const _setBarColor = (cx: number, cy: number) => {
		if (!ctx) { return }
		const [w] = wh();
    if (!Array.isArray(barColors)) {
      return barColors
    }
    const gradient = ctx.createRadialGradient(cx, cy, w / 2, cx, cy, 0)
    let offset = 0

    barColors.forEach((color: string, i, a) => {
      gradient.addColorStop(offset, color)
      offset += (1 / a.length)
    })
    return gradient
  }

	const paint = () => {
		if (!ctx) { return }
		const [w, h] = wh();
		const cx = w / 2; // center X
    const cy = h / 2; // center Y
    const r = radius ? radius : Math.round(w / 2 * 0.5);
    const arcStep = Math.ceil(lineWidth + lineSpace);
    const frqBits = icache.get('analyser').frequencyBinCount;
    const data = new Uint8Array(frqBits);
    const step = ((lineWidth + lineSpace) / data.length) * (2 * Math.PI);
    const barLen = barLength > 0 ? barLength : (w / 2) - r;
    let angle = Math.PI * 1.5; // TODO this._rotate() // start from top

    _setCanvas();
    icache.get('analyser').getByteFrequencyData(data);
/*
    // contour outline
    if (this.outlineWidth > 0) {
      this._drawOutline(r, cx, cy)
    }

    // draw play progress meter
    if (this.progress) {
      this._drawProgress(r, cx, cy)
    }

    // draw played time
    if (this.playtime) {
      this._drawPlaytime(cx, cy)
    }
*/
    // circle bar lines
    ctx.lineWidth = barWidth;
    ctx.strokeStyle = _setBarColor(cx, cy)||'';

    data.forEach((_, index) => {
      angle += step;
      if (index % arcStep) { return }
      const bits = Math.round(data.slice(index, index + arcStep)
        .reduce((v, t) => t + v, 0) / arcStep);

      const bLen = r + (bits / 255.0 * barLen);
      !!ctx && ctx.beginPath();
      !!ctx && ctx.moveTo(r * Math.cos(angle) + cx, r * Math.sin(angle) + cy);
      !!ctx && ctx.lineTo(bLen * Math.cos(angle) + cx, bLen * Math.sin(angle) + cy);
      !!ctx && ctx.stroke();
    });
		icache.set('animId', requestAnimationFrame(paint), false);
	}

	if (!!audio) {
		const audioCtx = icache.get('audioCtx');
	  audio.addEventListener('canplay', setAnalyser);
		audio.addEventListener('play', () => {
	    if (!icache.get('canVisualise')) { setAnalyser() }
			icache.set('animId', requestAnimationFrame(paint));
			if (!!audioCtx && audioCtx.state === 'suspended') { // not defined for waveform
	      audioCtx.resume();
	    }
	  });
		audio.addEventListener('pause', () => {
			if (!!audioCtx) {
	      audioCtx.suspend();
	      cancelAnimationFrame(icache.get('animId')||0)
	    }
		});
		audio.addEventListener('ended', () => {
			if (!!audioCtx) {
	      audioCtx.close();
	      cancelAnimationFrame(icache.get('animId')||0);
				icache.set('audioCtx',null,false);
				icache.set('canVisualise',false);
	    }
		});
	}

	return (<div
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
				themedCss.audio,
				buttonCss[variant],
				themedCss[shape]
				// theme.animated(themedCss)
			]}
			styles={ src ? { backgroundImage: `url(${src})` } : {} }
		>
			<span classes={themedCss.content}>{content}</span>
			<div classes={themedCss.canvasWrapper}>
				<canvas key="canvas"></canvas>
			</div>
		</div>);
});

export default AudioAvatar;
