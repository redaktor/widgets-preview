import { create, tsx } from '@dojo/framework/core/vdom';
import Card from '@dojo/widgets/card';
/*
import Map from '@dojo/widgets/map';

	<div
		styles={{
			width: '100%',
			height: '100%',
			position: 'absolute',
			top: '0px',
			left: '0px',
			zIndex: '10000'
		}}
	>
		<Map mapId="75a3ce8990674a5ebd5b9ab66bdab893" center={[51.568255, 6.743474]} />
	</div>




	.esri-ui-corner .esri-expand .esri-widget--panel,
	.esri-ui-corner .esri-expand .esri-widget--panel-height-only,
	.esri-ui-corner .esri-component>.esri-widget--panel,
	.esri-ui-corner .esri-component.esri-widget--panel {}

	940 - 1000		252px
	1000 - 1060 	280px
	1060 - 1366 	300px
	1366 - 1380 	252px
	1380 - 1400 	280px
	>1400  				300px
	2680 					320px
	3580 					360px
*/

const factory = create();

export default factory(function Basic() {
	return (
		<div>
			<div styles={{ width: '440px' }}>
				<Card name="Hello, World">
					{{
						content: (
							<p>
								Nulla quam libero, convallis ut malesuada a, porta sit amet sem cras
								at.
							</p>
						)
					}}
				</Card>
			</div>
		</div>
	);
});
