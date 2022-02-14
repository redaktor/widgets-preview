import { tsx, create } from '@dojo/framework/core/vdom';
import theme, { ViewportProperties} from '../middleware/theme';
import { AsObject, AsObjectNormalized } from '../common/interfaces';
import i18nActivityPub from '../middleware/i18nActivityPub';
import Details from '../details';
import Icon from '../icon';
import Table, { Row, Cell } from '../table';
import bundle from './nls/Attachment';
import * as css from '../theme/material/attachment.m.css';

export interface AttachmentProperties extends AsObject, ViewportProperties {
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


	const {
		attachment: a = [], isRow = false, lines = 8
	} = i18nActivityPub.normalized();
	const attachment = a.filter((o) => !!o);
	if (!attachment.length) { return '' }
	const themedCss = theme.classes(css);
	const { localize } = i18nActivityPub;
	const { messages } = localize(bundle);
	return <Details key="attachment" classes={{ '@redaktor/widgets/details': {
		root: [themedCss.root, isRow ? themedCss.row : themedCss.column]
	}}}>{{
		summary: <span classes={themedCss.detailsSummary}>
			<Icon spaced={'right'} type="pin" color="neutral" />
			<strong>{attachment.length} {attachment.length === 1 ? messages.singular : messages.plural}</strong>
		</span>,
		content: <Table lines={lines} columns={[{type:'flexible', width:'40px'},'flexible']}
			classes={{ '@redaktor/widgets/table': { scrollTable: [themedCss.table] }}}
			>
			{ attachment && attachment.map((o: AsObjectNormalized, j) => <Row bordered="horizontal"
				classes={{ '@redaktor/widgets/table': { item: [themedCss.tableItem] }}}
				onClick={() => {console.log('row click',j,o)}} /* TODO emit onStack */
			>
					<Cell align="center">
						<Icon type={(o.type[0].toLowerCase() as any)} />
					</Cell>
					<Cell>
						{o.name && o.name.map((n) => <strong classes={themedCss.name}>{n} </strong>).concat(
							<div classes={[themedCss.nowrap]}>
								{o.summary ? o.summary.map((n) => <span classes={themedCss.summary}>{n} </span>) : []}
							</div>
						)}
					</Cell>
				</Row>
			)}
		</Table>
	}}</Details>
});

export default Attachment;
