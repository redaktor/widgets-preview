import { create, tsx } from '@dojo/framework/core/vdom';
import Card from '@dojo/widgets/card';

const factory = create();

export default factory(function Basic() {
	return (
		<div styles={{ width: '440px' }}>
			<Card name="Hello, World">
				{{
					content: <p>Nulla quam libero, convallis ut malesuada a, porta sit amet sem cras at.</p>
				}}
			</Card>
		</div>
	);
});
