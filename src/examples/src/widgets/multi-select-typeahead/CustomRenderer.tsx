import { create, tsx } from '@dojo/framework/core/vdom';
import ChipTypeahead from '@dojo/widgets/multi-select-typeahead';
import { ListItem, ListOption } from '@dojo/widgets/list';
import Example from '../../Example';
import {
	createMemoryResourceTemplate,
	createResourceMiddleware
} from '@dojo/framework/core/middleware/resources';

const resource = createResourceMiddleware();
const factory = create({ resource });
const options = [
	{ value: 'apples', label: 'Apples' },
	{ value: 'tacos', label: 'Tacos' },
	{ value: 'pizza', label: 'Pizza' }
];

const template = createMemoryResourceTemplate<ListOption>();

export default factory(function CustomRenderer({ id, middleware: { resource } }) {
	return (
		<Example>
			<ChipTypeahead resource={resource({ template, initOptions: { id, data: options } })}>
				{{
					label: 'Favorite Foods',
					items: (item, props) => (
						<ListItem {...props}>
							{item.selected ? '❤️' : '🤢'} {item.label}
						</ListItem>
					),
					selected: (value) => {
						switch (value) {
							case 'apples':
								return '🍎';
							case 'tacos':
								return '🌮';
							case 'pizza':
								return '🍕';
						}
					}
				}}
			</ChipTypeahead>
		</Example>
	);
});
