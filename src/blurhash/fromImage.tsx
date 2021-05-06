import { create, tsx } from '@dojo/framework/core/vdom';
import VisualBlurhash from './';
import { encode } from './woltappBlurhash';

export interface BlurhashProperties {
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

const factory = create().properties<BlurhashProperties>();

export const Blurhash = factory(function Blurhash({ properties }) {
	let { url } = properties();
	const {
		height,
		width,
		componentX,
		componentY,
		punch = 1,
		output = 'canvas',
		...canvasProps
	} = properties();
	if (!url) { return ''; }
	if (!Array.isArray(url)) { url = [url] }

	const loadImage = async (src: string) =>
		new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = (...args) => reject(args);
			img.src = src;
		});

	const getImageData = (image: any) => {
		const canvas = document.createElement("canvas");
		const [w, h] = [width||image.width, height||image.height];
		canvas.width = w;
		canvas.height = h;
		const context = canvas.getContext("2d");
		context && context.drawImage(image, 0, 0);
		return context && context.getImageData(0, 0, w, h);
	};

	const converted = url.map(async (u: string) => {
		try {
			const image = await loadImage(u);
			const imageData = getImageData(image);
			if (imageData) {
				const [w, h] = [width||imageData.width, height||imageData.height];
				const ratio = w/h;
				const [x, y] = [
					ratio < 0.5625 ? 3 : (ratio > 1.78 ? 5 : 4),
					ratio > 1.78 ? 3 : (ratio < 0.5625 ? 5 : 4)
				];
				const blurhash = encode(imageData.data, w, h, x, y);
				if (output === 'blurhash') { return blurhash }
				return <VisualBlurhash {...{...canvasProps, blurhash, output, punch, width: w, height: h}} />
			}
		} catch (err) {
			console.error('Blurhash decoding failed', { err, url });
		}
	});

	return <virtual>{...converted}</virtual>
});

export default Blurhash;
