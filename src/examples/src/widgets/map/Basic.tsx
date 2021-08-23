import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Map from '@redaktor/widgets/map';
import * as viewCSS from '@redaktor/widgets/theme/material/_view.m.css';
import * as columnsDesktop from '@redaktor/widgets/theme/material/_columnsDesktop.m.css';

const factory = create();

export default factory(function Basic() {
	return <Example spaced={false}>
    <virtual>
      <div><h5>Image ActivityPub Object</h5><p>column</p></div>

      <div classes={[viewCSS.root, columnsDesktop.root]}>
        <ul classes={viewCSS.items}>
					<Map />
				</ul>
			</div>
		</virtual>
	</Example>
});
