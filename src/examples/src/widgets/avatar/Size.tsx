import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Avatar from '@dojo/widgets/avatar';

const factory = create();

export default factory(function Basic() {
	return (<Example spaced={true}>
		<div
			styles={{
				width: '400px',
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center'
			}}
		>
			<Avatar size="s">S</Avatar>
			<Avatar size="m">M</Avatar>
			<Avatar size="l">L</Avatar>
			<Avatar size="xl">XL</Avatar>
		</div>
	</Example>);
});
