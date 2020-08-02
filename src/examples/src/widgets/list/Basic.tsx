import { create, tsx } from '@dojo/framework/core/vdom';
import List, { ListOption } from '@dojo/widgets/list';
import icache from '@dojo/framework/core/middleware/icache';
import {
	createMemoryResourceTemplate,
	createResourceMiddleware
} from '@dojo/framework/core/middleware/resources';

const resource = createResourceMiddleware();
const factory = create({ icache, resource });

const animals = [{ value: 'cat' }, { value: 'dog' }, { value: 'mouse' }, { value: 'rat' }];
const template = createMemoryResourceTemplate<ListOption>();

export default factory(function Basic({ id, middleware: { icache, resource } }) {
	return (
		<virtual>
			<List
				resource={resource({ template, initOptions: { id, data: animals } })}
				onValue={(value: string) => {
					icache.set('value', value);
				}}
			/>
			<br />
			<List
				variant='filled'
				resource={resource({ template, initOptions: { id, data: animals } })}
				onValue={(value: string) => {
					icache.set('value', value);
				}}
			/>
			<br />
			<List
				variant='outlined'
				resource={resource({ template, initOptions: { id, data: animals } })}
				onValue={(value: string) => {
					icache.set('value', value);
				}}
			/>
			<br />
			<List
				variant='raised'
				resource={resource({ template, initOptions: { id, data: animals } })}
				onValue={(value: string) => {
					icache.set('value', value);
				}}
			/>
			<br />
			<List
				variant='shaped'
				resource={resource({ template, initOptions: { id, data: animals } })}
				onValue={(value: string) => {
					icache.set('value', value);
				}}
			/>
			<p>{`Clicked on: ${icache.getOrSet('value', '')}`}</p>
		</virtual>
	);
});
