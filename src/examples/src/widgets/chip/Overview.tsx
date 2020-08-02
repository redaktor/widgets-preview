import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Chip from '@dojo/widgets/chip';

const factory = create({ icache });

export default factory(function Overview({ middleware: { icache } }) {
	const checked = icache.getOrSet('checked', false);
	const variant = 'flat';
	return (
		<div>
			<p>Medium sized Chip variants</p>
			<div class="flexRow">
				<Chip variant='flat' checked={checked}>flat</Chip>
				<Chip variant='filled' checked={checked}>filled</Chip>
				<Chip variant='outlined' checked={checked}>outlined</Chip>
				<Chip variant='raised' checked={checked}>raised</Chip>
				<Chip variant='shaped' checked={checked}>shaped</Chip>
			</div>
			<br />
			<div class="flexRow">
			<Chip variant='flat' checked={checked} color='secondary'>flat</Chip>
			<Chip variant='filled' checked={checked} color='secondary'>filled</Chip>
			<Chip variant='outlined' checked={checked} color='secondary'>outlined</Chip>
			<Chip variant='raised' checked={checked} color='secondary'>raised</Chip>
			<Chip variant='shaped' checked={checked} color='secondary'>shaped</Chip>
			</div>
			<p>All the sizes</p>
			<div class="flexRow">
				<Chip variant={variant} size="xs">XS Box</Chip>
				<Chip variant={variant} size="s">S Box</Chip>
				<Chip variant={variant} size="m">M Box</Chip>
				<Chip variant={variant} size="l">L Box</Chip>
				<Chip variant={variant} size="xl">XL Box</Chip>
				<Chip variant={variant} size="xxl">XXL Box</Chip>
			</div>
			<p>See other examples for colors and more</p>
		</div>
	);
});
