import { create, tsx } from '@dojo/framework/core/vdom';
import ChipTypeahead from '@redaktor/widgets/typeaheadChip';
import { ListItem, ListOption } from '@redaktor/widgets/list';
import Example from '../../Example';
import {
	createResourceTemplate,
	createResourceMiddleware
} from '@dojo/framework/core/middleware/resources';

const resource = createResourceMiddleware();
const factory = create({ resource });
const options = [
	{ value: '1', label: 'Apples' },
	{ value: '2', label: 'Tacos' },
	{ value: '3', label: 'Pizza' }
];

const template = createResourceTemplate<ListOption>('value');

export default factory(function CustomRenderer({ id, middleware: { resource } }) {
	return (
		<Example>
			<ChipTypeahead resource={resource({ template: template({ id, data: options }) })}>
				{{
					label: 'Favorite Foods',
					items: (item, props) => (
						<ListItem {...props}>
							{item.selected ? '❤️' : '🤢'} {item.label}
						</ListItem>
					),
					selected: (value) => {
						switch (value) {
							case '1':
								return '🍎';
							case '2':
								return '🌮';
							case '3':
								return '🍕';
						}
					}
				}}
			</ChipTypeahead>
		</Example>
	);
});
