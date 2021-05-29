import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import Switch from '@redaktor/widgets/switch';
const factory = create({ icache });

export default factory(function Overview({ middleware: { icache } }) {
	const switch1 = icache.getOrSet('switch1', true);
	const switched = icache.getOrSet('switched', false);
	const variant = 'flat';
	return (<Example spaced={true}>
		<span>
			<div class="flexRow">
				<Switch variant='flat' checked={switch1}>{{label: 'flat'}}</Switch>
				<Switch variant='filled' checked={switch1}>{{label: 'filled'}}</Switch>
				<Switch variant='outlined' checked={switch1}>{{label: 'outlined'}}</Switch>
				<Switch variant='raised' checked={switch1}>{{label: 'raised'}}</Switch>
				<Switch variant='shaped' checked={switch1}>{{label: 'shaped'}}</Switch>
			</div>
			<div class="flexRow">
				<Switch variant='flat' checked={switch1} color='secondary'>flat</Switch>
				<Switch variant='filled' checked={switch1} color='secondary'>filled</Switch>
				<Switch variant='outlined' checked={switch1} color='secondary'>outlined</Switch>
				<Switch variant='raised' checked={switch1} color='secondary'>raised</Switch>
				<Switch variant='shaped' checked={switch1} color='secondary'>shaped</Switch>
			</div>

			<p>All the sizes</p>
			<br />
			<div class="flexRow">
				<Switch variant={variant} size="xs" checked={switched}
					onValue={(switched) => { icache.set('switched', switched); }}>
					XS Box
				</Switch>
				<Switch variant={variant} size="s" checked={switched}
					onValue={(switched) => { icache.set('switched', switched); }}>
					S Box
				</Switch>
				<Switch variant={variant} size="m" checked={switched}
					onValue={(switched) => { icache.set('switched', switched); }}>
					M Box
				</Switch>
				<Switch variant={variant} size="l" checked={switched}
					onValue={(switched) => { icache.set('switched', switched); }}>
					L Box
				</Switch>
				<Switch variant={variant} size="xl" checked={switched}
					onValue={(switched) => { icache.set('switched', switched); }}>
					XL Box
				</Switch>
				<Switch variant={variant} size="xxl" checked={switched}
					onValue={(switched) => { icache.set('switched', switched); }}>
					XXL
				</Switch>
			</div>
			<p>See other examples for colors and more</p>
		</span>
	</Example>);
});
