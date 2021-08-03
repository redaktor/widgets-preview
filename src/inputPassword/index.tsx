import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { create, tsx } from '@dojo/framework/core/vdom';
import { ValidationRules } from '@redaktor/widgets/middleware/validation';
import theme from '@redaktor/widgets/middleware/theme';
import Icon from '@redaktor/widgets/icon';
import ConstrainedInput, { ConstrainedInputProperties } from '@redaktor/widgets/inputConstrained';
import TextInput, { TextInputChildren, Addon } from '@redaktor/widgets/inputText';
import * as css from '@redaktor/widgets/theme/material/inputPassword.m.css';
import * as textInputCss from '@redaktor/widgets/theme/material/inputText.m.css';

export type Omit<T, E> = Pick<T, Exclude<keyof T, E>>;

export interface PasswordInputProperties
	extends Omit<ConstrainedInputProperties, 'type' | 'rules'> {
	rules?: ValidationRules;
}

export interface PasswordInputState {
	showPassword: boolean;
	valid: { valid?: boolean; message?: string } | undefined;
}

const factory = create({
	icache: createICacheMiddleware<PasswordInputState>(),
	theme
})
	.properties<PasswordInputProperties>()
	.children<TextInputChildren | RenderResult | undefined>();

export const PasswordInput = factory(function PasswordInput({
	middleware: { theme, icache },
	properties,
	children
}) {
	const props = properties();
	const _children: any = Array.isArray(children()) ? children()[0] : children();
	const showPassword = icache.getOrSet('showPassword', false);
	const classes = theme.classes(css);

	const trailing = (
		<Addon>
			<button
				onclick={(e) => {
					e.stopPropagation();
					icache.set('showPassword', !showPassword);
				}}
				classes={classes.toggleButton}
				type="button"
			>
				<Icon type={showPassword ? 'eyeSlash' : 'eye'} />
			</button>
		</Addon>
	);

	const handleValidation = (valid?: boolean, message?: string) => {
		icache.set('valid', { valid, message });
		props.onValidate && props.onValidate(valid);
	};

	return props.rules ? (
		<ConstrainedInput
			{...props}
			rules={props.rules}
			key="root"
			type={showPassword ? 'text' : 'password'}
			theme={theme.compose(
				textInputCss,
				css
			)}
		>
			{{ label: _children, trailing }}
		</ConstrainedInput>
	) : (
		<TextInput
			{...props}
			key="root"
			type={showPassword ? 'text' : 'password'}
			theme={theme.compose(
				textInputCss,
				css
			)}
			onValidate={handleValidation}
			valid={icache.get('valid')}
		>
			{{ label: _children, trailing }}
		</TextInput>
	);
});

export default PasswordInput;
