import Accordion from '@redaktor/widgets/accordion';
import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
const factory = create();

export default factory(function Basic() {
	return (<Example spaced={true}><div>
		<Accordion color="dark" spaced iconLeft variant="raised" exclusive={true} panes={['foo', 'bar', 'baz']}>
				<p>
					foo content Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id
					purus ipsum. Aenean ac purus purus. Nam sollicitudin varius augue, sed lacinia
					felis tempor in.
				</p>
				<p>
					bar content Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id
					purus ipsum. Aenean ac purus purus. Nam sollicitudin varius augue, sed lacinia
					felis tempor in.
				</p>
				<p>
					baz content Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id
					purus ipsum. Aenean ac purus purus. Nam sollicitudin varius augue, sed lacinia
					felis tempor in.
				</p>
		</Accordion>

		<Accordion rounded color="primary" panes={['foo', 'bar', 'baz']}>
				<p>
					foo content Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id
					purus ipsum. Aenean ac purus purus. Nam sollicitudin varius augue, sed lacinia
					felis tempor in.
				</p>
				<p>
					bar content Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id
					purus ipsum. Aenean ac purus purus. Nam sollicitudin varius augue, sed lacinia
					felis tempor in.
				</p>
				<p>
					baz content Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id
					purus ipsum. Aenean ac purus purus. Nam sollicitudin varius augue, sed lacinia
					felis tempor in.
				</p>
		</Accordion>
	</div></Example>
	);
});
