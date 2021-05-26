import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import NativeSelect from '@dojo/widgets/native-select';
import icache from '@dojo/framework/core/middleware/icache';

const factory = create({ icache });
const options = [{ value: 'cat' }, { value: 'dog' }, { value: 'fish' }, { value: 'unicorn' }];

const comboProps: any = {
	// size,
	responsive: false,
	blurOnSelect: false,
	name: 'testcombo1',
	autocomplete: false,
	schema: 'primary',
	// animated: false,
	// muted: true,
	// filled: true,
	// outlined: true,
	label: 'A primary Combobox',
	placeholder: 'optional placeholder',
	// helperText: 'Lorem Ipsum - helperText'
	scroll: false,
	widgetId: 'combo1',
	// helperText: 'Lorem Ipsum - helperText',
	// schema: 'primary',
	// raised: true,
	results: options,
	getOptionText: (o: any, i: number) => o.label,
	// getOptionLabel: (o: any, i: number, textNode: any) => textNode
	// tabIndex: _open ? 0 : -1,

	onResultSelect: (v: any, i: number, key: string) => console.log('!!! onResultSelect', v, i, key),
	onChange: (v: any, i: number, key: string) => { console.log('!!! onChange', v, i, key) }
}

export default factory(function Basic({ middleware: { icache } }) {
	return (<Example spaced={true}>
		<virtual>
			<NativeSelect
				size="xs"
				options={options}
				onValue={(value) => {
					icache.set('value', value);
				}}
			/>
			<NativeSelect
				size="s"
				options={options}
				onValue={(value) => {
					icache.set('value', value);
				}}
			/>
			<NativeSelect
				size="m"
				options={options}
				onValue={(value) => {
					icache.set('value', value);
				}}
			/>
			<NativeSelect
				size="l"
				options={options}
				onValue={(value) => {
					icache.set('value', value);
				}}
			/>
			<br />
			<NativeSelect
				size="xl"
				options={options}
				onValue={(value) => {
					icache.set('value', value);
				}}
				isSerif
			/>

			<p>{icache.getOrSet('value', '')}</p>

		</virtual>
	</Example>);
});
