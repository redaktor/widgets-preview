import { create, tsx } from '@dojo/framework/core/vdom';
import TriggerPopup from '@redaktor/widgets/triggerPopup';
import Button from '@redaktor/widgets/button';
import Example from '../../Example';

const factory = create();

export default factory(function SetWidth() {
	return (
		<Example>
			<TriggerPopup position="below" matchWidth={false}>
				{{
					trigger: (onToggleOpen) => <Button onClick={onToggleOpen}>Own Width</Button>,
					content: () => (
						<div styles={{ background: 'orange', width: '350px', fontSize: '32px' }}>
							My Width is 150px!
						</div>
					)
				}}
			</TriggerPopup>
		</Example>
	);
});
