import { create, tsx } from '@dojo/framework/core/vdom';
import { icache } from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import Chip from '@redaktor/widgets/chip';
import Icon from '@redaktor/widgets/icon';

const factory = create({ icache });

const App = factory(function ClosableRenderer({ middleware: { icache } }) {
	const { get, set } = icache;
	const closed = get<boolean>('closed');

	return (<Example spaced={true}>
			{!closed && (
				<Chip
					onClose={() => {
						set('closed', true);
					}}
				>
					{{
						label: 'Close me',
						closeIcon: <Icon type="close" />
					}}
				</Chip>
			)}
		</Example>);
});

export default App;
