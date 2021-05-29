import { tsx, create } from '@dojo/framework/core/vdom';

import Grid from '@redaktor/widgets/grid';
import { ColumnConfig } from '@redaktor/widgets/grid/interfaces';
import { createFetcher } from '@redaktor/widgets/grid/utils';

import { createData } from './data';

const columnConfig: ColumnConfig[] = [
	{
		id: 'id',
		title: 'ID'
	},
	{
		id: 'firstName',
		title: 'First Name',
		sortable: true
	},
	{
		id: 'lastName',
		title: 'Last Name',
		sortable: true
	}
];

const fetcher = createFetcher(createData());
const factory = create();

export default factory(() => {
	return <Grid fetcher={fetcher} columnConfig={columnConfig} height={450} />;
});
