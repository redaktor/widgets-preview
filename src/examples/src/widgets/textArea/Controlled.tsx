import { create, tsx } from '@dojo/framework/core/vdom';
import TextArea from '@redaktor/widgets/textArea';
import Example from '../../Example';
import icache from '@dojo/framework/core/middleware/icache';

const factory = create({ icache });

export default factory(function Controlled({ middleware: { icache } }) {
	return (<Example spaced={true}>
		<TextArea
			value={icache.getOrSet('value', '')}
			onValue={(value) => {
				icache.set('value', value);
			}}
		/>
	</Example>);
});
