import { tsx, create } from '@dojo/framework/core/vdom';
import theme, { ViewportProperties} from '../middleware/theme';
import { ActivityPubObject } from '../common/interfaces';
import i18nActivityPub from '../middleware/i18nActivityPub';
import Icon from '../icon';
import Table, { Row, Cell } from '../table';

import * as css from '../theme/material/attachment.m.css';

export interface AttachmentProperties extends ActivityPubObject, ViewportProperties {
	/* max. height of table, count of lines or false, default 6 */
	lines?: number | false;
	isRow?: boolean;
	onSelect?: (i: number) => any;
}

const factory = create({ i18nActivityPub, theme }).properties<AttachmentProperties>();
/*
<div key="attachmentControl" classes={themedCss.attachmentControl}>
	<Chip>
		{{ label: <virtual><Icon spaced={true} type="pin" color="neutral" /> {(APo.attachment||[]).length}</virtual> }}
	</Chip>
	{ attachmentIcons }
</div>
<span>a</span>
<span>b</span>
*/
export const Attachment = factory(function Attachment({
	middleware: { i18nActivityPub, theme }
}) {

	const themedCss = theme.classes(css);
	const {
		attachment = [], isRow = false, lines = 7
	} = i18nActivityPub.normalized();

	if (!attachment.length) { return '' }

	return <details key="attachment" classes={[
		themedCss.root,
		isRow ? themedCss.row : themedCss.column
	]}>
		<summary classes={themedCss.summary}>
			<Icon spaced={'right'} type="pin" color="neutral" /><b>3</b> attachments
		</summary>
		<Table lines={lines} columns={[{type:'flexible', width:'40px'},'flexible']}>
			{ attachment && attachment.map((o) => <Row onClick={(i) => {!i && console.log('row click',i)}}>
					<Cell align="center">
						<Icon type={(o.type[0].toLowerCase() as any)} />
					</Cell>
					<Cell>
						{o.name && o.name.map((n) => <span>{n} </span>).concat(
							<div classes={[themedCss.nowrap]}>
								{o.summary ? o.summary.map((n) => <span>{n} </span>) : []}
							</div>
						)}
					</Cell>
				</Row>
			)}
		</Table>
	</details>
});

export default Attachment;
