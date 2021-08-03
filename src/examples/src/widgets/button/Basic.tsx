import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Button from '@redaktor/widgets/button';
import { ExampleProperties } from '@redaktor/widgets/common/util';

const factory = create().properties<ExampleProperties>();

export default factory(function Basic({ properties }) {
	const { design = 'flat' } = properties();
	console.log('render');
	return <Example spaced={true}>
		<span>
			<p>A medium sized disabled {design} button (default)</p>
			<Button spaced="right" design={design} size="s">xs</Button>

			<p>All the sizes</p>
			<div>
				<Button spaced="right" design={design} size="xs">Size XS</Button>
				<Button spaced="right" design={design} size="s">Size S</Button>
				<Button spaced="right" design={design} size="m">Size M</Button>
				<Button spaced="right" design={design} size="l">Size L</Button>
				<Button spaced="right" design={design} size="xl">Size XL</Button>
				<Button spaced="right" design={design} size="xxl">XXL</Button>
			</div>
			<p>Some colors</p>
			<Button spaced="right" design={design} size="l" color="neutral">neutral</Button>
			<Button spaced="right" design={design} size="l" color="primary">primary</Button>
			<Button spaced="right" design={design} size="l" color="secondary">secondary</Button>
			<Button spaced="right" design={design} size="l" color="green">green</Button>
			<Button spaced="right" design={design} size="l" color="amber">amber</Button>
			<br />

			<p>Lorem <Button spaced="right" design={design} size="s">Button M</Button> Ipsum</p>
			<p>Lorem Ipsum</p>
		</span>
	</Example>;
});
