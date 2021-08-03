import { create, tsx, node } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { dimensions } from '@dojo/framework/core/middleware/dimensions';
import { theme, ThemeProperties/*, Designs */} from '../middleware/theme';
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
if (!(window as any).AudioContext) {
	(window as any).AudioContext = (window as any).webkitAudioContext ||
		(window as any).mozAudioContext || (window as any).msAudioContext
}
if (!(window as any).requestAnimationFrame) {
	window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
		(window as any).mozRequestAnimationFrame || (window as any).msRequestAnimationFrame;
}
const icache = createICacheMiddleware<AvatarICache>();
const factory = create({ theme, node, dimensions, icache }).properties<AvatarProperties>();

export const AudioAvatar = factory(function Avatar({ middleware: { theme, node, dimensions, icache }, properties, children }) {
	const { get, set, getOrSet } = icache;
	const themedCss = theme.classes(css);
	const {
		audioElement: audio,
		canvFillColor = 'transparent',
		lineWidth = 2.5, lineSpace = 2, barWidth = 1.5, barLength = 0,
		src, name, alt, radius,
		shape = 'circle',
		design = 'filled' as (keyof typeof buttonCss)
	} = properties();

	const canvas = node.get('canvas');
	const ctx = canvas && (canvas as HTMLCanvasElement).getContext('2d');

	const c = children();
	const avatarStr = (s: string) => {
		const w = words(s);
		return !w.length ? '' :
			(w.length < 2 ? s.substr(0,2) : `${w[0].charAt(0)}${w[1].charAt(0)}`)
	}
	const content = !src && !!name ? avatarStr(name) :
		(c.length === 1 ? c.map((c0) => typeof c0 === 'string' ? avatarStr(c0) : c0) : c);

	getOrSet('canVisualise', false, false);
	getOrSet('animId', 0);


	const {width: w, height: h} = dimensions.get('root').offset;
	const rootWH = [(w * 2)||100, (h * 2)||100];
	const {width, height} = dimensions.get('canvas').offset;
	// console.log(w, h, width, height, audio);
	/**
	 * Set audio audioCtx analyser.
	 */
	const setAnalyser = () => {
		try {
			if (!get('audioCtx')) {
				set('audioCtx', new ((window as any).AudioContext)(), false);
				set('analyser', get('audioCtx').createAnalyser(), false);
			}
			if (!get('audioCtx')) {
				console.log('No AudioContext');
				return
			}
			const source = get('audioCtx').createMediaElementSource(audio);
			source.connect(get('analyser'));
			get('analyser').connect(get('audioCtx').destination);
			set('canVisualise', true);
		} catch (e) {
			console.log(`AudioContext: ${e.toString()}`);
		}
  }
  /**
   * Canvas gradient. Vertical, from top down
   */
	const fillGradient = (colorsArray: string[]) => {
    const [w, h] = rootWH;
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
    ctx.clearRect(0, 0, width, height);
    (ctx as any).fillStyle = Array.isArray(canvFillColor)
      ? fillGradient(canvFillColor)
      : canvFillColor
    !!ctx && ctx.fillRect(0, 0, width, height)
  }

	let { barColors } = properties();
	if (!barColors) {
		barColors = [
			canvas && getComputedStyle(canvas).getPropertyValue('--m-800') || '#e03c05',
			canvas && getComputedStyle(canvas).getPropertyValue('--m-500') || '#ff7a00'
		];
	}
  const _setBarColor = (cx: number, cy: number) => {
		if (!ctx) { return }
		const [w] = rootWH;
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
		const [w, h] = rootWH;
		const cx = w / 2; // center X
    const cy = h / 2; // center Y
    const r = radius ? radius : Math.round(w / 2 * 0.5);
    const arcStep = Math.ceil(lineWidth + lineSpace);
    const frqBits = get('analyser').frequencyBinCount;
    const data = new Uint8Array(frqBits);
    const step = ((lineWidth + lineSpace) / data.length) * (2 * Math.PI);
    const barLen = barLength > 0 ? barLength : (w / 2) - r;
    let angle = Math.PI * 1.5; // TODO this._rotate() // start from top

    _setCanvas();
    get('analyser').getByteFrequencyData(data);

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
		!audio.paused && set('animId', requestAnimationFrame(paint), false)
	}

	const restart = () => {
		const audioCtx = get('audioCtx');
		console.log('restart',audioCtx.state);
		if (!audioCtx || audioCtx.state === 'closed') { return }
		audioCtx.close();
		set('audioCtx',null,false);
		set('canVisualise',false);
		cancelAnimationFrame(get('animId')||0);
	}
	audio.addEventListener('loadedmetadata', function metadata() {
		console.log('loadedmetadata');
		audio.addEventListener('seeked', restart);
		audio.addEventListener('ended', restart);
		audio.addEventListener('play', function play() {
			const audioCtx = get('audioCtx');
	    if (!audioCtx || !get('canVisualise')) { setAnalyser() }
			if (!!audioCtx ) { // not defined for waveform
				set('animId', requestAnimationFrame(paint), false);
				audioCtx.onstatechange = function() {
					if (audioCtx.state === 'suspended') { audioCtx.resume() }
		    }
			}
	  });
		audio.addEventListener('pause', function pause() {
			const audioCtx = get('audioCtx');
			if (!!audioCtx) {
	      audioCtx.suspend();
				cancelAnimationFrame(get('animId')||0);
	    }
		})
	})

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
				buttonCss[design],
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
