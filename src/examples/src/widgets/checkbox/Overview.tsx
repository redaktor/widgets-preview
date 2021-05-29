import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import Checkbox from '@redaktor/widgets/checkbox';

const factory = create({ icache });

export default factory(function Overview({ middleware: { icache } }) {
	const checked = icache.getOrSet('checked', false);
	const variant = 'filled';
	return (<Example spaced={true}>
		<span>
			<p>Medium sized checkbox variants</p>
			<div class="flexRow">
				<Checkbox variant='flat' checked={checked}>flat</Checkbox>
				<Checkbox variant='filled' checked={checked}>filled</Checkbox>
				<Checkbox variant='outlined' checked={checked}>outlined</Checkbox>
				<Checkbox variant='raised' checked={checked}>raised</Checkbox>
				<Checkbox variant='shaped' checked={checked}>shaped</Checkbox>
			</div>
			<br />
			<div class="flexRow">
			<Checkbox variant='flat' checked={checked} color='secondary'>flat</Checkbox>
			<Checkbox variant='filled' checked={checked} color='secondary'>filled</Checkbox>
			<Checkbox variant='outlined' checked={checked} color='secondary'>outlined</Checkbox>
			<Checkbox variant='raised' checked={checked} color='secondary'>raised</Checkbox>
			<Checkbox variant='shaped' checked={checked} color='secondary'>shaped</Checkbox>
			</div>
			<p>All the sizes</p>
			<div class="flexRow">
				<Checkbox variant={variant} size="xs" checked={checked}
					onValue={(checked) => { icache.set('checked', checked); }}>
					XS Box
				</Checkbox>
				<Checkbox variant={variant} size="s" checked={checked}
					onValue={(checked) => { icache.set('checked', checked); }}>
					S Box
				</Checkbox>
				<Checkbox variant={variant} size="m" checked={checked}
					onValue={(checked) => { icache.set('checked', checked); }}>
					M Box
				</Checkbox>
				<Checkbox variant={variant} size="l" checked={checked}
					onValue={(checked) => { icache.set('checked', checked); }}>
					L Box
				</Checkbox>
				<Checkbox variant={variant} size="xl" checked={checked}
					onValue={(checked) => { icache.set('checked', checked); }}>
					XL Box
				</Checkbox>
				<Checkbox variant={variant} size="xxl" checked={checked}
					onValue={(checked) => { icache.set('checked', checked); }}>
					XXL
				</Checkbox>
			</div>
			<p>See other examples for colors and more</p>
		</span>
	</Example>);
});
