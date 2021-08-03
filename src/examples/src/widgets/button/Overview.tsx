import { create, tsx } from '@dojo/framework/core/vdom';
import Example, { ExampleProperties, designs, exampleColors } from '../../Example';
import Button from '@redaktor/widgets/button';

const factory = create().properties<ExampleProperties>();

export default factory(function Overview({ properties }) {
	const { design = 'flat', color } = properties();
	return <Example spaced={true}>
			<p>
				A {`${design} `}
				<Button design={design} color={color} size="s">small</Button> button and a {`${design} `}
				small <Button design={design} color={color} size="s" disabled={true}>disabled</Button> button
			</p>
			<p>Medium sized button designs</p>
			{...exampleColors.map((c: any) => <virtual>
				<div class="flexRow">
					{designs.map((d) => <Button design={d} color={c}>{d}</Button>)}
				</div><br />
			</virtual>)}
			<br /><br /><br />
			{designs.map((v) => (<virtual>
				<h5>{v}</h5>
				<div class="flexRow">{...['xs','s','m','l','xl','xxl'].map((size: any) =>
					<Button design={v} size={size} spaced="right">Size {size.toUpperCase()}</Button>)}
				</div><br />
			</virtual>))}
			<p>See other examples for colors and more<br /></p>
	</Example>;
});
