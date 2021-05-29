import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Avatar from '@redaktor/widgets/avatar';
const avatar = require('./img/dojo.jpg');

const factory = create();

export default factory(function Basic() {
	return (<Example spaced={true}>
		<div styles={{ width: '400px', display: 'flex', justifyContent: 'space-around' }}>
			<Avatar src={avatar} alt="Dojo" />
			<Avatar shape="rounded" src={avatar} alt="Dojo" />
			<Avatar shape="square" src={avatar} alt="Dojo" />
		</div>
	</Example>);
});
