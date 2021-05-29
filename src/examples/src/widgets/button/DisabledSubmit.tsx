import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Button from '@redaktor/widgets/button';

const factory = create();

export default factory(function DisabledSubmitButton() {
	return (<Example spaced={true}>
		<Button variant="filled" type="submit" disabled>
			Submit
		</Button>
	</Example>);
});
