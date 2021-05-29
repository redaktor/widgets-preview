import { tsx, create } from '@dojo/framework/core/vdom';

import Grid from '@redaktor/widgets/grid';
import { ColumnConfig } from '@redaktor/widgets/grid/interfaces';
import { createFetcher, createUpdater } from '@redaktor/widgets/grid/utils';

import { createData } from './data';

const columnConfig: ColumnConfig[] = [
	{
		id: 'id',
		title: 'ID'
	},
	{
		id: 'firstName',
		title: 'First Name',
		editable: true
	},
	{
		id: 'lastName',
		title: 'Last Name',
		editable: true
	}
];

const data = createData();
const fetcher = createFetcher(data);
const updater = createUpdater(data);
const factory = create();

export default factory(() => {
	return <Grid updater={updater} fetcher={fetcher} columnConfig={columnConfig} height={450} />;
});
