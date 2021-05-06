import { create, tsx } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import VisualBlurhash from './';
import { encode } from './woltappBlurhash';

export interface BlurhashImgProperties {
	/** The image source to encode, see https://blurha.sh */
	url: string | string[];
	/** The render result, default is blurhash, can be canvas, image or dataURL */
	output?: 'blurhash' | 'canvas' | 'image' | 'dataURL';
	/** If output is 'canvas' | 'image', it is a parameter that adjusts the contrast
	 * on the decoded image.
	 * 1 means normal, smaller values will make the effect more subtle,
	 * larger values will make it stronger. Lets you adjust the look.
	 */
	punch?: number;
	/** If output is 'canvas' | 'image':
	 * The width of the canvas showing the blurred pixels, default is image width
	 */
	width?: number;
	/** If output is 'canvas' | 'image':
	 * The height of the canvas showing the blurred pixels, default is image height
	 */
	height?: number;
	/** number of components for width, default is usually 4 but depends on aspect ratio */
	componentX?: number;
	/** number of components for height, default is usually 4 but depends on aspect ratio */
	componentY?: number;
}
export interface BlurhashImgIcache {
	mapped: boolean;
	nodes: any[];
}
const icache = createICacheMiddleware<BlurhashImgIcache>();

const factory = create({ icache }).properties<BlurhashImgProperties>();

export const BlurhashImg = factory(function Blurhash({ properties, middleware: { icache } }) {
	let { url } = properties();
	const {
		componentX,
		componentY,
		height,
		width = 40,
		punch = 1,
		output = 'blurhash',
		...canvasProps
	} = properties();
	if (!url) { return ''; }
	if (!Array.isArray(url)) { url = [url] }
	icache.getOrSet('mapped', false, false);
	icache.getOrSet('nodes', [], false);

	const loadImage = async (src: string) =>
		new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = (...args) => reject(args);
			img.src = src;
		});

	const getImageData = (image: any) => {
		const canvas = document.createElement("canvas");
		const [w, h] = [
			width||image.width,
			height||(!!width ? Math.round(image.height/(image.width/width)) : image.height)
		];
		canvas.width = w;
		canvas.height = h;
		const context = canvas.getContext("2d");
		context && context.drawImage(image, 0, 0);
		return context && context.getImageData(0, 0, w, h);
	};

	if (!icache.get('mapped')) {
		url.map(async (u: string) => {
			try {
				const image = await loadImage(u);
				const imageData = getImageData(image);
				if (imageData) {
					const [w, h] = [
						width||imageData.width,
						height||(!!width ? Math.round(imageData.height/(imageData.width/width)) : imageData.height)
					];
					const ratio = w/h;
					const [x, y] = [
						ratio < 0.5625 ? 3 : (ratio > 1.78 ? 5 : 4),
						ratio > 1.78 ? 3 : (ratio < 0.5625 ? 5 : 4)
					];
					const blurhash = encode(imageData.data, w, h, x, y);
					const nodes = (icache.get('nodes')||[]).concat([
						output === 'blurhash' ? blurhash :
							<VisualBlurhash {...{
								...canvasProps, blurhash, output, punch,
								width: imageData.width, height: imageData.height
							}} />
					]);
					console.log('nodes', nodes);
					icache.set('nodes', nodes);
				}
			} catch (err) {
				console.error('Blurhash decoding failed', { err, url });
			}
		});
		icache.set('mapped', true, false)
	}

	return <virtual>{...(icache.get('nodes')||[])}</virtual>
});

export default BlurhashImg;
