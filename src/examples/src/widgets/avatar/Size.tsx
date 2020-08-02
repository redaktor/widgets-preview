import { create, tsx } from '@dojo/framework/core/vdom';
import Avatar from '@dojo/widgets/avatar';

const factory = create();

export default factory(function Basic() {
	return (
		<div
			styles={{
				width: '400px',
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center'
			}}
		>
			<Avatar size="s">A</Avatar>
			<Avatar size="l">A</Avatar>
			<Avatar size="xl">A</Avatar>
		</div>
	);
});
