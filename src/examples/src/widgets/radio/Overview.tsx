import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Example, { ExampleProperties, designs, exampleColors } from '../../Example';
import Radio from '@redaktor/widgets/Radio';

const factory = create({ icache }).properties<ExampleProperties>();

export default factory(function Overview({ properties, middleware: { icache } }) {
	const { design = 'filled', color } = properties();
	const checked = icache.getOrSet('checked', false);

	return <Example spaced={true}>
			<p>
				A {`${design} `}
				<Radio design={design} color={color} size="s">small</Radio> radio and a {`${design} `}
				small <Radio design={design} color={color} size="s" disabled={true}>disabled</Radio> radio
			</p>
			<p>Medium sized button designs</p>
			{...exampleColors.map((c: any) => <virtual>
				<div class="flexRow">
					{designs.map((d) => <Radio design={d} color={c} checked={checked}>{d}</Radio>)}
				</div><br />
			</virtual>)}
			<br /><br />
			{designs.map((v) => (<virtual>
				<h5>{v}</h5>
				<div class="flexRow">{...['xs','s','m','l','xl','xxl'].map((size: any) =>
					<Radio design={v} size={size} spaced="right" checked={checked}
						onValue={(checked) => { icache.set('checked', checked); }}>
							Size {size.toUpperCase()}
					</Radio>)}
				</div><br />
			</virtual>))}
			<p>See other examples for colors and more<br /></p>
	</Example>;
});
