import { tsx, create } from '@dojo/framework/core/vdom';
import { ActivityPubObject, ActivityPubObjectNormalized } from '../common/interfaces';
import i18nActivityPub from '../middleware/i18nActivityPub';
import theme, { ViewportProperties } from '../middleware/theme';
import { clampStrings } from '../common/activityPubUtil';
import MD from '../MD/';
import Paginated from '../paginated';
import Collapsed from '../collapsed';
import Name from '../name';
import AttributedTo from '../attributedTo';
import Attachment from '../attachment';
import Icon from '../icon';
import * as css from '../theme/material/images.m.css';
import * as ui from '../theme/material/_ui.m.css';
import * as columns from '../theme/material/_columns.m.css';

export interface ImageCaptionProperties extends ActivityPubObject, ViewportProperties {
	baselined?: boolean;
	editable?: boolean;
	view?: 'responsive' | 'column' | 'row' | 'tableRow';
	/* navigation position, top or bottom, default top */
	navPosition?: 'top' | 'bottom';
	/* maximum number of items, default 1000 */
	max?: number;
	/* max. manual items per “page”, normally calculated */
	itemsPerPage?: number;
	/* hover animation for scroller, grayscale -> colors, default true */
	desaturateScroll?: boolean;
	/* show summary and content for itemsPerPage=1, default true */
	hasContent?: boolean;
	/* show attachments, default true */
	hasAttachment?: boolean;
	/* when all images have loaded */
	onLoad?: () => any;
	/* when clicking an image */
	onClick?: (img: ActivityPubObjectNormalized) => any;
}

export interface ImageCaptionIcache {
	l: any;
	paginated: any[];
	lightImageCaption: boolean[];
	loaded: number[];
	currentPage: number;
	brightnessClass: string;
}

const factory = create({ theme, i18nActivityPub }).properties<ImageCaptionProperties>();

export const ImageCaption = factory(function ImageCaption({
	middleware: { theme, i18nActivityPub }
}) {
	const themedCss = theme.classes(css);
	const viewCSS = theme.viewCSS();
	const viewDesktopCSS = theme.viewDesktopCSS();

	const {
		size = 'm', view = 'column', name: n, summary, content, href = '', sensitive, attachment, ...rest
	} = i18nActivityPub.normalized();

	const name = n || [href];

	const [isColumn, isResponsive, isRow] = [(view === 'column'), (view === 'responsive'), (view === 'row')];
	let [vp, isMini, typoClass] = [size, false, isRow ? themedCss.rowTypo : themedCss.columnTypo];
	if (isResponsive) {
		isMini = (isRow && (vp === 'micro' || vp === 'xs' || vp === 's')) || (!isRow && (vp === 'micro' || vp === 'xs'));
		typoClass = isMini ? ui.s : (vp === 'l' || vp === 'xl' ? ui.l : ui.m);
	}

	const nameNode = <Name name={name} isRow={isRow} size={!vp || vp === 'micro' ? 'xs' : (vp as any)} />;
	const hasContent = (summary && summary.length) || (content && content.length);

	return <div classes={themedCss.pageCaption}>
		{!hasContent ? <div classes={[themedCss.contentDetailsSummary, themedCss.muted]}>{name ? name[0] : ''}</div> : 
			<details key="details" classes={themedCss.contentDetails}>
				<summary key="summary" classes={themedCss.contentDetailsSummary}>
					<Icon type="info" spaced="right" /> {name ? name[0] : 'info'}
				</summary>
				<div classes={themedCss.columnName}>{nameNode}</div>
				<div classes={[themedCss.contentWrapper, !!viewCSS && viewCSS.content]}>
					<div classes={themedCss.rowName}>{nameNode}</div>
					{!sensitive && (summary && <Paginated key="summary" property="summary">
						{clampStrings(summary, 500).map((_summary, i) =>
							<MD classes={[themedCss.summary, isResponsive ? typoClass : columns.typo]} key={`summary${i}`} content={_summary} />
						)}
					</Paginated>)}
					{
						content && <Collapsed responsive={!isRow} lines={isRow ? 2 : 12} classes={
							{ '@redaktor/widgets/collapsed': { root: [themedCss.contentCollapsed] } }
						}>
							{content.map((_content: string, i: number) => <virtual>
								<MD classes={[themedCss.content, isResponsive ? typoClass : columns.typo]} key={`content${i}`} content={_content} />
								<hr />
							</virtual>)}
						</Collapsed>
					}
				</div>
			</details>}

		<div classes={themedCss.attributions}>
			<AttributedTo {...rest} max={39} />
		</div>

		{attachment && <Attachment attachment={attachment} isRow={isRow} />}
	</div>
});

export default ImageCaption;
