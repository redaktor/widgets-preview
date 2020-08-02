import { create, tsx } from '@dojo/framework/core/vdom';
import Button from '@dojo/widgets/button';

const factory = create();

export default factory(function Overview() {
	const variant = 'flat';
	return <span>
		<p>Medium sized button variants</p>
		<div class="flexRow">
			<Button variant='flat'>flat</Button>
			<Button variant='filled'>filled</Button>
			<Button variant='outlined'>outlined</Button>
			<Button variant='raised'>raised</Button>
			<Button variant='shaped'>shaped</Button>
		</div>
		<br />
		<div class="flexRow">
			<Button variant='flat' color='secondary'>flat</Button>
			<Button variant='filled' color='secondary'>filled</Button>
			<Button variant='outlined' color='secondary'>outlined</Button>
			<Button variant='raised' color='secondary'>raised</Button>
			<Button variant='shaped' color='secondary'>shaped</Button>
		</div>
		<br />
		<p>Sizes (filled)</p>
		<div class="flexRo">
			<Button variant={variant} size="xs">Size XS</Button><br />
			<Button variant={variant} size="s">Size S</Button><br />
			<Button variant={variant} size="m">Size M</Button><br />
			<Button variant={variant} size="l">Size L</Button><br />
			<Button variant={variant} size="xl">Size XL</Button><br />
			<Button variant={variant} size="xxl">XXL</Button>
		</div>
		<p>See other examples for colors and more</p>
	</span>;
});
