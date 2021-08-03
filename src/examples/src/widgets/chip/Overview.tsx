import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import Chip from '@redaktor/widgets/chip';

const factory = create({ icache });

export default factory(function Overview({ middleware: { icache } }) {
	const checked = icache.getOrSet('checked', false);
	const design = 'flat';
	return (<Example spaced={true}>
		<div>
			<p>Medium sized Chip designs</p>
			<div class="flexRow">
				<Chip design='flat' checked={checked}>flat</Chip>
				<Chip design='filled' checked={checked}>filled</Chip>
				<Chip design='outlined' checked={checked}>outlined</Chip>
				<Chip design='raised' checked={checked}>raised</Chip>
				<Chip design='shaped' checked={checked}>shaped</Chip>
			</div>
			<br />
			<div class="flexRow">
			<Chip design='flat' checked={checked} color='secondary'>flat</Chip>
			<Chip design='filled' checked={checked} color='secondary'>filled</Chip>
			<Chip design='outlined' checked={checked} color='secondary'>outlined</Chip>
			<Chip design='raised' checked={checked} color='secondary'>raised</Chip>
			<Chip design='shaped' checked={checked} color='secondary'>shaped</Chip>
			</div>
			<p>All the sizes</p>
			<div class="flexRow">
				<Chip design={design} size="xs">XS Box</Chip>
				<Chip design={design} size="s">S Box</Chip>
				<Chip design={design} size="m">M Box</Chip>
				<Chip design={design} size="l">L Box</Chip>
				<Chip design={design} size="xl">XL Box</Chip>
				<Chip design={design} size="xxl">XXL Box</Chip>
			</div>
			<p>See other examples for colors and more</p>
		</div>
	</Example>);
});
