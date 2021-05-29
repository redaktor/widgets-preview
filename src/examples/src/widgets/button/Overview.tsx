import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Button from '@redaktor/widgets/button';

const factory = create();

export default factory(function Overview() {
	const variant = 'flat';
	return <Example spaced={true}>
		<span>
			<p>Medium sized button variants</p>
			<div class="flexRow">
				<Button variant='flat'>flat</Button>
				<Button>filled</Button>
				<Button variant='outlined'>outlined</Button>
				<Button variant='raised'>raised</Button>
				<Button variant='shaped'>shaped</Button>
			</div>
			<br />
			<div class="flexRow">
				<Button variant='flat' color='secondary'>flat</Button>
				<Button color='secondary'>filled</Button>
				<Button variant='outlined' color='secondary'>outlined</Button>
				<Button variant='raised' color='secondary'>raised</Button>
				<Button variant='shaped' color='secondary'>shaped</Button>
			</div>
			<br />
			<div class="flexRow">
				<Button variant='flat' color='amber'>flat</Button>
				<Button color='amber'>filled</Button>
				<Button variant='outlined' color='amber'>outlined</Button>
				<Button variant='raised' color='amber'>raised</Button>
				<Button variant='shaped' color='amber'>shaped</Button>
			</div>
			<br />
			<div class="flexRow">
				<Button variant='flat' color='dark'>flat</Button>
				<Button color='dark'>filled</Button>
				<Button variant='outlined' color='dark'>outlined</Button>
				<Button variant='raised' color='dark'>raised</Button>
				<Button variant='shaped' color='dark'>shaped</Button>
			</div>
			<br />
			<div class="flexRow">
				<Button variant='flat' color='neutral'>flat</Button>
				<Button color='neutral'>filled</Button>
				<Button variant='outlined' color='neutral'>outlined</Button>
				<Button variant='raised' color='neutral'>raised</Button>
				<Button variant='shaped' color='neutral'>shaped</Button>
			</div>
			<br />
			<div class="flexRow">
				<Button variant='flat' color='light'>flat</Button>
				<Button color='light'>filled</Button>
				<Button variant='outlined' color='light'>outlined</Button>
				<Button variant='raised' color='light'>raised</Button>
				<Button variant='shaped' color='light'>shaped</Button>
			</div>
			<br />
			<p>Sizes (filled)</p>
			<div class="flexRow">
				<Button variant={variant} size="xs">Size XS</Button><br />
				<Button variant={variant} size="s">Size S</Button><br />
				<Button variant={variant} size="m">Size M</Button><br />
				<Button variant={variant} size="l">Size L</Button><br />
				<Button variant={variant} size="xl">Size XL</Button><br />
				<Button variant={variant} size="xxl">XXL</Button>
			</div>
			<p>See other examples for colors and more<br /></p>
		</span>
	</Example>;
});
