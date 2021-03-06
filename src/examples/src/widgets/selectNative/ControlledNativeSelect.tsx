import { create, tsx } from '@dojo/framework/core/vdom';
import NativeSelect from '@redaktor/widgets/selectNative';
import icache from '@dojo/framework/core/middleware/icache';

const factory = create({ icache });
const options = [{ value: 'cat' }, { value: 'dog' }, { value: 'fish' }, { value: 'unicorn' }];

export default factory(function Controlled({ middleware: { icache } }) {
	return (
		<virtual>
			<NativeSelect
				options={options}
				onValue={(value) => {
					icache.set('value', value);
				}}
				value={icache.getOrSet('value', 'dog')}
			>
				Basic Select
			</NativeSelect>
			<pre>{icache.get('value')}</pre>
		</virtual>
	);
});
