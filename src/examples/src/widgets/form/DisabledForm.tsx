import { create, tsx } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';

import Button from '@redaktor/widgets/button';
import TextInput from '@redaktor/widgets/inputText';
import Form from '@redaktor/widgets/form';
import { FormMiddleware } from '@redaktor/widgets/form/middleware';

const icache = createICacheMiddleware<{
	basic?: Partial<Fields>;
}>();

const factory = create({ icache });

interface Fields {
	firstName?: string;
	middleName?: string;
	lastName?: string;
	email?: string;
}

const App = factory(function({ middleware: { icache } }) {
	const results = icache.get('basic');

	return (
		<virtual>
			<Form onValue={(values) => icache.set('basic', { ...icache.get('basic'), ...values })}>
				{({ disabled, field }: FormMiddleware<Fields>) => {
					const firstName = field('firstName');
					const middleName = field('middleName');
					const lastName = field('lastName');
					const email = field('email');

					return (
						<virtual>
							<TextInput
								key="firstName"
								placeholder="Enter first name"
								initialValue={firstName.value()}
								onValue={firstName.value}
								disabled={firstName.disabled()}
							>
								{{ label: 'First Name' }}
							</TextInput>
							<TextInput
								key="middleName"
								placeholder="Enter a middle name"
								initialValue={middleName.value()}
								onValue={middleName.value}
								disabled={middleName.disabled()}
							>
								{{ label: 'Middle Name' }}
							</TextInput>
							<TextInput
								key="lastName"
								placeholder="Enter a last name"
								initialValue={lastName.value()}
								onValue={lastName.value}
								disabled={lastName.disabled()}
							>
								{{ label: 'Last Name' }}
							</TextInput>
							<TextInput
								key="email"
								placeholder="Enter an email address"
								initialValue={email.value()}
								onValue={email.value}
								type="email"
								disabled={email.disabled()}
							>
								{{ label: 'Email' }}
							</TextInput>
							<Button
								key="disableForm"
								type="button"
								onClick={() => disabled(!disabled())}
							>
								{`${disabled() ? 'Enable' : 'Disable'} Form`}
							</Button>
						</virtual>
					);
				}}
			</Form>
			{results && (
				<div key="onValueResults">
					<h2>onValue Results</h2>
					<ul>
						<li>First Name: {results.firstName}</li>
						<li>Middle Name: {results.middleName}</li>
						<li>Last Name: {results.lastName}</li>
						<li>Email: {results.email}</li>
					</ul>
				</div>
			)}
		</virtual>
	);
});

export default App;
