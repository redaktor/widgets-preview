import { create, tsx } from '@dojo/framework/core/vdom';
import BreadcrumbGroup from '@redaktor/widgets/breadcrumbGroup';
import Example from '../../Example';

const factory = create();

const App = factory(function() {
	const items = [
		{ label: 'Home', href: '/' },
		{
			label: 'Overview',
			href: '/#widget/breadcrumb/overview',
			title: 'Breadcrumb Overview'
		},
		{
			label: 'Tests',
			href: '/#widget/breadcrumb/tests',
			title: 'Breadcrumb Tests'
		}
	];

	return <Example spaced={true}>
		<BreadcrumbGroup label="breadcrumb" items={items} />
	</Example>;
});

export default App;
