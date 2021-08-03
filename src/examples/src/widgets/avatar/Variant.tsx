import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Avatar from '@redaktor/widgets/avatar';
const avatar = require('./img/dojo.jpg');

const factory = create();

export default factory(function Basic() {
	return (<Example spaced={true}>
		<span>
			<div styles={{ width: '400px', display: 'flex', justifyContent: 'space-around' }}>
				<Avatar design="flat">A</Avatar>
				<Avatar design="filled">A</Avatar>
				<Avatar design="raised">A</Avatar>
				<Avatar design="outlined">A</Avatar>
				<Avatar design="shaped">A</Avatar>
			</div>
			<br /><br />
			<div styles={{ width: '400px', display: 'flex', justifyContent: 'space-around' }}>
				<Avatar design="flat" src={avatar} alt="Dojo" />
				<Avatar design="filled" src={avatar} alt="Dojo" />
				<Avatar design="raised" src={avatar} alt="Dojo" />
				<Avatar design="outlined" src={avatar} alt="Dojo" />
				<Avatar design="shaped" src={avatar} alt="Dojo" />
			</div>
		</span>
	</Example>);
});
