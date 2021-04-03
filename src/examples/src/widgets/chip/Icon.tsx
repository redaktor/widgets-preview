import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Chip from '@dojo/widgets/chip';
import Icon from '@dojo/widgets/icon';

const factory = create();

const App = factory(function IconExample() {
	return (<Example spaced={true}>
		<Chip>
			{{
				label: 'Icon Example',
				icon: () => <Icon type="follow" />
			}}
		</Chip>
	</Example>);
});

export default App;
