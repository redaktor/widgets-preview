import { create, tsx } from '@dojo/framework/core/vdom';
import BreadcrumbGroup, { Breadcrumb, BreadcrumbSeparator } from '@redaktor/widgets/breadcrumbGroup';
import Icon from '@redaktor/widgets/icon';
import Example from '../../Example';

import * as css from './CustomRenderer.m.css';

const factory = create();

const App = factory(function() {
	const items = [
		{ completed: true, key: 'step1', label: 'Step 1' },
		{ completed: true, key: 'step2', label: 'Step 2' },
		{ completed: false, current: true, key: 'step3', label: 'Step 3' },
		{ completed: false, key: 'step4', label: 'Step 4' }
	];

	return (
		<Example spaced={true}>
			<BreadcrumbGroup label="breadcrumb" items={items}>
				{(items) =>
					items.map((item, i) => (
						<virtual>
							{i !== 0 && (
								<BreadcrumbSeparator key={`${item.key}-separator`}>
									<Icon type="right" />
								</BreadcrumbSeparator>
							)}

							<Breadcrumb
								key={`${item.key}`}
								classes={{
									'@redaktor/widgets/breadcrumb-group': {
										breadcrumb: [item.current ? css.current : undefined]
									}
								}}
								current={item.current ? 'step' : undefined}
								href={item.href}
								title={item.title}
							>
								{item.completed && (
									<Icon
										classes={{ '@redaktor/widgets/icon': { icon: [css.icon] } }}
										type="check"
									/>
								)}
								<span>{item.label}</span>
							</Breadcrumb>
						</virtual>
					))
				}
			</BreadcrumbGroup>
		</Example>
	);
});

export default App;
