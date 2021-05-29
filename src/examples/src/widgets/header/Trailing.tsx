import Header from '@redaktor/widgets/header';
import Icon from '@redaktor/widgets/icon';
import { Link } from '@dojo/framework/routing/Link';
import { create, tsx } from '@dojo/framework/core/vdom';

const factory = create();

export default factory(function Basic() {
	return (
		<Header>
			{{
				title: 'My App',
				actions: [
					<Link to="#foo">Foo</Link>,
					<Link to="#bar">Bar</Link>,
					<Link to="#baz">Baz</Link>
				],
				trailing: <Icon type="searchIcon" />
			}}
		</Header>
	);
});
