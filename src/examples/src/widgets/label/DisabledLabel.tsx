import { create, tsx } from '@dojo/framework/core/vdom';
import Label from '@redaktor/widgets/label';

const factory = create();

export default factory(function DisabledLabel() {
	return <Label disabled>Disabled Label</Label>;
});
