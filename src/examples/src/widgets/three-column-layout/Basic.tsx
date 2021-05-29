import { create, tsx } from '@dojo/framework/core/vdom';
import ThreeColumnLayout from '@redaktor/widgets/three-column-layout';

const factory = create();

export default factory(function Basic() {
	return (
		<ThreeColumnLayout>
			{{
				leading: (
					<div styles={{ textAlign: 'center', borderRight: '1px solid black' }}>
						This is the leading content
					</div>
				),
				center: <div styles={{ textAlign: 'center' }}>This is the center content</div>,
				trailing: (
					<div styles={{ textAlign: 'center', borderLeft: '1px solid black' }}>
						This is the trailing content
					</div>
				)
			}}
		</ThreeColumnLayout>
	);
});
