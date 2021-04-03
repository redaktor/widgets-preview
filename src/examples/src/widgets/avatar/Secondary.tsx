import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Avatar from '@dojo/widgets/avatar';

const factory = create();

export default factory(function Basic() {
	return (<Example spaced={true}>
		<div styles={{ width: '400px', display: 'flex', justifyContent: 'space-around' }}>
			<Avatar color="secondary" shape="circle">
				A
			</Avatar>
			<Avatar color="secondary" shape="rounded">
				A
			</Avatar>
			<Avatar color="secondary" shape="square">
				A
			</Avatar>
		</div>
	</Example>);
});
