import { create, tsx } from '@dojo/framework/core/vdom';
import List, { ListItem, ListOption } from '@dojo/widgets/list';
import states from './states';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import {
	createMemoryResourceTemplate,
	createResourceMiddleware
} from '@dojo/framework/core/middleware/resources';

const resource = createResourceMiddleware();
const factory = create({ icache, resource });
const template = createMemoryResourceTemplate<ListOption>();

export default factory(function ItemRenderer({ id, middleware: { icache, resource } }) {
	return (
		<Example>
			<List
				resource={resource({ template, initOptions: { id, data: states } })}
				onValue={(value) => {
					icache.set('value', value);
				}}
				itemsInView={8}
			>
				{({ value }, props) => {
					const color = value.length > 7 ? 'red' : 'blue';
					return (
						<ListItem {...props}>
							<div styles={{ color: color }}>{value}</div>
						</ListItem>
					);
				}}
			</List>
			<p>{`Clicked On: ${icache.getOrSet('value', '')}`}</p>
		</Example>
	);
});
