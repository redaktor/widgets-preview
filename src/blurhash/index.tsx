import { create, tsx, node } from '@dojo/framework/core/vdom';
import { decode } from './woltappBlurhash';

export interface BlurhashProperties {
	/** The blurhash to render, see https://blurha.sh */
	blurhash: string | string[];
	/** The render result, default is canvas, can be image or dataURL (Data-URL) */
	output?: 'canvas' | 'image' | 'dataURL';
	/** The width of the canvas showing the blurred pixels, default is 40 */
	width?: number;
	/** The height of the canvas showing the blurred pixels, default is `width` */
	height?: number;
	/** It is a parameter that adjusts the contrast on the decoded image.
	 * 1 means normal, smaller values will make the effect more subtle,
	 * larger values will make it stronger. Lets you adjust the look.
	 */
	punch?: number;
}

const factory = create({node}).properties<BlurhashProperties>();

export const Blurhash = factory(function Blurhash({ properties, middleware: { node } }) {
	const {
		blurhash: b,
		height: h,
		width = 40,
		punch = 1,
		output = 'canvas',
		...canvasProps
	} = properties();
	if (!b) { return ''; }
	const blurhash = !Array.isArray(b) ? [b] : b;
	const height = !h ? width : h;

	const converted = blurhash.map((hash: string, i: number) => {
		const canvas = node.get(`canvas${i}`);
		if (!!canvas) {
			try {
		    const pixels = decode(hash, width, height, punch);
		    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
		    const imageData = new ImageData(pixels, width, height);
				ctx && ctx.putImageData(imageData, 0, 0);
				return (canvas as HTMLCanvasElement).toDataURL();
			} catch (err) {
				console.error('Blurhash decoding failed', { err, hash });
			}
		}
	}).filter((s) => !!s);

	if ((output === 'dataURL' || output === 'image') && converted.length === blurhash.length) {
		return output === 'dataURL' ? (converted.length === 1 ? converted[0] : converted) :
			converted.map((s) => <img src={s} width={width} height={height} />)
	}

	return <virtual>
		{blurhash.map((hash: string, i: number) =>
			<canvas {...canvasProps} key={`canvas${i}`} width={width} height={height} />
		)}
	</virtual>
});
export default Blurhash;
