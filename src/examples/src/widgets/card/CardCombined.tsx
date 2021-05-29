import { create, tsx } from '@dojo/framework/core/vdom';
import Card from '@redaktor/widgets/card';
import Button from '@redaktor/widgets/button';
import Icon from '@redaktor/widgets/icon';
const mediaSrc = require('./img/card-photo.jpg');

const factory = create();

export default factory(function CardWithMediaContent() {
	return (
		<div styles={{ width: '400px' }}>
			<Card
				onAction={() => {}}
				mediaSrc={mediaSrc}
				name="Hello, World"
				status="A pretty picture"
			>
				{{
					header: <div>Header Content</div>,
					content: <span>Travel the world today.</span>,
					actionButtons: (
						<virtual>
							<Button>Read</Button>
							<Button>Bookmark</Button>
						</virtual>
					),
					actionIcons: (
						<virtual>
							<Icon type="secureIcon" />
							<Icon type="downIcon" />
							<Icon type="upIcon" />
						</virtual>
					)
				}}
			</Card>
		</div>
	);
});
