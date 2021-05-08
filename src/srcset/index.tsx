import { create, tsx } from '@dojo/framework/core/vdom';
import { ActivityPubLinkObject } from '../common/interfaces';
export interface SrcsetProperties {
	/** The url or urls for the sources */
	url: string | ActivityPubLinkObject | (string|ActivityPubLinkObject)[];
	/** srcset for a <picture> default false */
	isPicture?: boolean;
}

const factory = create().properties<SrcsetProperties>();

export const Srcset = factory(function Srcset({ properties }) {
	const { url: u, isPicture = false } = properties();
	if (!u) { return ''; }
	const url = (Array.isArray(u) ? u : [u]);

	return <virtual>
		{
			!!url.length && url.map((_src) => {
				if (typeof _src === 'object' && !!_src.href) {
					const {href, mediaType, width, height} = _src;
					const media = (!width && !height) ? '' :
						`${!!width ? `(max-width: ${width}px)` : ''}${(!width || !height) ? '' : ' and '}
						${!!height ? `(max-height: ${height}px)` : ''}`;
					const srcProperties = isPicture ?
						{srcset: href, type: mediaType, media} :
						{src: href, type: mediaType};
					return <source {...srcProperties} />
				} else if (typeof _src === 'string') {
					return <source src={_src} />
				}
			})
		}
	</virtual>
});
export default Srcset;
