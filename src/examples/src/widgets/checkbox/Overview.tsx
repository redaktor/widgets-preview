import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example, { ExampleProperties, designs, exampleColors } from '../../Example';
import Checkbox from '@redaktor/widgets/checkbox';

const factory = create({ icache }).properties<ExampleProperties>();

export default factory(function Overview({ properties, middleware: { icache } }) {
	const { design = 'filled', color } = properties();
	const checked = icache.getOrSet('checked', false);

	return <Example spaced={true}>
			<p>
				A {`${design} `}
				<Checkbox design={design} color={color} size="s">small</Checkbox> checkbox and a {`${design} `}
				small <Checkbox design={design} color={color} size="s" disabled={true}>disabled</Checkbox> checkbox
			</p>
			<p>Medium sized button designs</p>
			{...exampleColors.map((c: any) => <virtual>
				<div class="flexRow">
					{designs.map((d) => <Checkbox design={d} color={c} checked={checked}>{d}</Checkbox>)}
				</div><br />
			</virtual>)}
			<br /><br /><br />
			{designs.map((v) => (<virtual>
				<h5>{v}</h5>
				<div class="flexRow">{...['xs','s','m','l','xl','xxl'].map((size: any) =>
					<Checkbox design={v} size={size} spaced="right" checked={checked}
						onValue={(checked) => { icache.set('checked', checked); }}>
							Size {size.toUpperCase()}
					</Checkbox>)}
				</div><br />
			</virtual>))}
			<p>See other examples for colors and more<br /></p>
	</Example>;
});
