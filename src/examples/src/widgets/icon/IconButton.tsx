import { create, tsx } from '@dojo/framework/core/vdom';
import Icon from '@redaktor/widgets/icon';
import Button from '@redaktor/widgets/button';

const factory = create();

export default factory(function IconButton() {
	return (
		<Button>
			Send <Icon type="mailIcon" />
		</Button>
	);
});
