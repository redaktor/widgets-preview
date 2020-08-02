import { create, tsx } from '@dojo/framework/core/vdom';
import Button from '@dojo/widgets/button';
import { ExampleProperties } from '@dojo/widgets/common/util';

const factory = create().properties<ExampleProperties>();

export default factory(function Basic({properties}) {
	const { variant = 'flat' } = properties();
	return <span>
		<p>A medium sized disabled flat button (default)</p>
		<Button variant={variant} size="s">xs</Button>

		<p>All the sizes</p>
		<div>
			<Button variant={variant} size="xs">Size XS</Button>
			<Button variant={variant} size="s">Size S</Button>
			<Button variant={variant} size="m">Size M</Button>
			<Button variant={variant} size="l">Size L</Button>
			<Button variant={variant} size="xl">Size XL</Button>
			<Button variant={variant} size="xxl">XXL</Button>
		</div>
		<p>Some colors</p>
		<Button variant={variant} size="l" color="neutral">neutral</Button>
		<Button variant={variant} size="l" color="primary">primary</Button>
		<Button variant={variant} size="l" color="secondary">secondary</Button>
		<Button variant={variant} size="l" color="green">green</Button>
		<Button variant={variant} size="l" color="amber">amber</Button>
		<br />

		<p>Lorem <Button variant={variant} size="s">Button M</Button> Ipsum</p>
		<p>Lorem Ipsum</p>
	</span>;
});
