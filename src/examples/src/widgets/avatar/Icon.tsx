import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Avatar from '@redaktor/widgets/avatar';
import Icon from '@redaktor/widgets/icon';

const factory = create();

export default factory(function Basic() {
	return (<Example spaced={true}>
		<div styles={{ width: '400px', display: 'flex', justifyContent: 'space-around' }}>
			<Avatar shape="circle">
				<Icon type="announce" />
			</Avatar>
			<Avatar shape="rounded">
				<Icon type="like" />
			</Avatar>
			<Avatar shape="square">
				<Icon type="follow" />
			</Avatar>
		</div>
	</Example>);
});
