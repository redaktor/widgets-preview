import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import Radio from '@dojo/widgets/radio';

const factory = create({ icache });

export default factory(function Overview({ middleware: { icache } }) {
	const singleChecked = icache.getOrSet('singleChecked', false);
	const checked = icache.getOrSet('checked', false);
	const variant = 'flat';
	return (<Example spaced={true}>
		<span>
			<div class="flexRow">
				<Radio variant='flat' checked={singleChecked}>flat</Radio>
				<Radio variant='filled' checked={singleChecked}>filled</Radio>
				<Radio variant='outlined' checked={singleChecked}>outlined</Radio>
				<Radio variant='raised' checked={singleChecked}>raised</Radio>
				<Radio variant='shaped' checked={singleChecked}>shaped</Radio>
			</div>
			<br />
			<div class="flexRow">
				<Radio variant='flat' checked={singleChecked} color='secondary'>flat</Radio>
				<Radio variant='filled' checked={singleChecked} color='secondary'>filled</Radio>
				<Radio variant='outlined' checked={singleChecked} color='secondary'>outlined</Radio>
				<Radio variant='raised' checked={singleChecked} color='secondary'>raised</Radio>
				<Radio variant='shaped' checked={singleChecked} color='secondary'>shaped</Radio>
			</div>
			<p>All the sizes</p>
			<div class="flexRow">
				<Radio variant={variant} size="xs" checked={checked}
					onValue={(checked) => { icache.set('checked', checked); }}>
					XS Box
				</Radio>
				<Radio variant={variant} size="s" checked={checked}
					onValue={(checked) => { icache.set('checked', checked); }}>
					S Box
				</Radio>
				<Radio variant={variant} size="m" checked={checked}
					onValue={(checked) => { icache.set('checked', checked); }}>
					M Box
				</Radio>
				<Radio variant={variant} size="l" checked={checked}
					onValue={(checked) => { icache.set('checked', checked); }}>
					L Box
				</Radio>
				<Radio variant={variant} size="xl" checked={checked}
					onValue={(checked) => { icache.set('checked', checked); }}>
					XL Box
				</Radio>
				<Radio variant={variant} size="xxl" checked={checked}
					onValue={(checked) => { icache.set('checked', checked); }}>
					XXL
				</Radio>
			</div>
			<p>See other examples for colors and more</p>
		</span>
	</Example>);
});
