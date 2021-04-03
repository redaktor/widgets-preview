import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Avatar from '@dojo/widgets/avatar';
const avatar = require('./img/dojo.jpg');

const factory = create();

export default factory(function Basic() {
	return (<Example spaced={true}>
		<span>
			<div styles={{ width: '400px', display: 'flex', justifyContent: 'space-around' }}>
				<Avatar variant="flat">A</Avatar>
				<Avatar variant="filled">A</Avatar>
				<Avatar variant="raised">A</Avatar>
				<Avatar variant="outlined">A</Avatar>
				<Avatar variant="shaped">A</Avatar>
			</div>
			<br /><br />
			<div styles={{ width: '400px', display: 'flex', justifyContent: 'space-around' }}>
				<Avatar variant="flat" src={avatar} alt="Dojo" />
				<Avatar variant="filled" src={avatar} alt="Dojo" />
				<Avatar variant="raised" src={avatar} alt="Dojo" />
				<Avatar variant="outlined" src={avatar} alt="Dojo" />
				<Avatar variant="shaped" src={avatar} alt="Dojo" />
			</div>
		</span>
	</Example>);
});
