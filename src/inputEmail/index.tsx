import { RenderResult } from '@dojo/framework/core/interfaces';
import { tsx, create } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import theme from '@redaktor/widgets/middleware/theme';
import { TextInput, BaseInputProperties, TextInputChildren } from '@redaktor/widgets/inputText';
import * as textInputCss from '@redaktor/widgets/theme/material/inputText.m.css';
import * as emailInputCss from '@redaktor/widgets/theme/material/inputEmail.m.css';

export interface EmailInputProperties extends BaseInputProperties {}

interface EmailInputICache {
	valid?: boolean;
	message?: string;
}

const icache = createICacheMiddleware<EmailInputICache>();
const factory = create({ icache, theme })
	.properties<EmailInputProperties>()
	.children<TextInputChildren | RenderResult | undefined>();

export const EmailInput = factory(function({
	properties,
	children,
	middleware: { icache, theme }
}) {
	const { get, set } = icache;
	const props = properties();
	const _children: any = Array.isArray(children()) ? children()[0] : children();

	return (
		<TextInput
			{...props}
			type={'email'}
			onValidate={(valid, message) => {
				set('valid', valid);
				set('message', message);
				props.onValidate && props.onValidate(valid, message);
			}}
			valid={{ valid: get('valid'), message: get('message') }}
			theme={theme.compose(
				textInputCss,
				emailInputCss
			)}
		>
			{_children}
		</TextInput>
	);
});

export default EmailInput;
