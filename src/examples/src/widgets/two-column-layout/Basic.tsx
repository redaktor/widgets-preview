import { create, tsx } from '@dojo/framework/core/vdom';
import TwoColumnLayout from '@redaktor/widgets/two-column-layout';

const factory = create();

export default factory(function Basic() {
	return (
		<TwoColumnLayout>
			{{
				leading: (
					<div styles={{ textAlign: 'center', borderRight: '1px solid black' }}>
						This is the leading content
					</div>
				),
				trailing: <div styles={{ textAlign: 'center' }}>This is the trailing content</div>
			}}
		</TwoColumnLayout>
	);
});
