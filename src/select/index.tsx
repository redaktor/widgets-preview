import { create, tsx } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { focus } from '@dojo/framework/core/middleware/focus';
import { i18n } from '@dojo/framework/core/middleware/i18n';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { createResourceMiddleware } from '@dojo/framework/core/middleware/resources';
import theme from '@redaktor/widgets/middleware/theme';
import id from '@redaktor/widgets/middleware/id';
import { find } from '@dojo/framework/shim/array';
import { Keys } from '@redaktor/widgets/common/util';
import HelperText from '@redaktor/widgets/helperText';
import Icon from '@redaktor/widgets/icon';
import Label from '@redaktor/widgets/label';
import {
	ItemRendererProperties,
	List,
	ListOption
} from '@redaktor/widgets/list';
import {
	ListItemProperties,
	MenuItemProperties
} from '@redaktor/widgets/list/Listitem';
import { PopupPosition } from '@redaktor/widgets/popup';
import TriggerPopup from '@redaktor/widgets/triggerPopup';
import LoadingIndicator from '@redaktor/widgets/loadingIndicator';
import * as listCss from '@redaktor/widgets/theme/material/list.m.css';
import * as labelCss from '@redaktor/widgets/theme/material/label.m.css';
import * as iconCss from '@redaktor/widgets/theme/material/icon.m.css';
import * as css from '@redaktor/widgets/theme/material/select.m.css';
import bundle from './nls/Select';


export interface SelectProperties {
	/** Callback called when user selects a value */
	onValue(value: ListOption): void;
	/** The initial selected value */
	initialValue?: string;
	/** Controlled value property */
	value?: string;
	/** Property to determine how many items to render. Defaults to 6 */
	itemsInView?: number;
	/** placement of the select menu; 'above' or 'below' */
	position?: PopupPosition;
	/** Placeholder value to show when nothing has been selected */
	placeholder?: string;
	/** Property to determine if the input is disabled */
	disabled?: boolean;
	/** Sets the helper text of the input */
	helperText?: string;
	/** Boolean to indicate if field is required */
	required?: boolean;
	/** Callabck when valid state has changed */
	onValidate?(valid: boolean): void;
	/** The name property of the input */
	name?: string;
}

export interface SelectChildren {
	/** Custom renderer for item contents */
	items?(
		item: ItemRendererProperties,
		props: ListItemProperties & MenuItemProperties
	): RenderResult;
	/** The label to show */
	label?: RenderResult;
}

interface SelectICache {
	dirty: boolean;
	expanded: boolean;
	focusNode: string;
	initial: string;
	menuId: string;
	triggerId: string;
	valid: boolean;
	value: string;
}

const icache = createICacheMiddleware<SelectICache>();

const factory = create({
	icache,
	focus,
	theme,
	i18n,
	id,
	resource: createResourceMiddleware<ListOption>()
})
	.properties<SelectProperties>()
	.children<SelectChildren | undefined>();

export const Select = factory(function Select({
	children,
	properties,
	middleware: { icache, focus, theme, i18n, id, resource }
}) {
	const {
		classes,
		design,
		theme: themeProp,
		disabled,
		helperText,
		initialValue,
		itemsInView = 6,
		onValidate,
		onValue,
		placeholder = '',
		position,
		required,
		name,
		resource: {
			template,
			options = resource.createOptions((curr, next) => ({ ...curr, ...next }))
		}
	} = properties();
	const {
		get,
		template: { read }
	} = resource.template(template);

	console.log(resource, get(options(), { read }))

	const [{ items, label } = { items: undefined, label: undefined }] = children();
	let { value } = properties();

	if (value === undefined) {
		if (initialValue !== undefined && initialValue !== icache.get('initial')) {
			icache.set('initial', initialValue);
			icache.set('value', initialValue);
		}
		value = icache.get('value');
	}

	const menuId = id.getId('menuId');
	const triggerId = id.getId('triggerId');
	const focusNode = icache.getOrSet('focusNode', 'trigger');
	const shouldFocus = focus.shouldFocus();
	const themedCss = theme.classes(css);
	let valid = icache.get('valid');
	const dirty = icache.get('dirty');
	const { messages } = i18n.localize(bundle);
	const expanded = icache.get('expanded');
	const {
		meta: { total, status },
		data
	} = get(options(), { read, meta: true });

	if (required && (dirty || value !== undefined)) {
		const isValid = value !== undefined;
		if (isValid !== valid) {
			icache.set('valid', isValid);
			valid = isValid;
			onValidate && onValidate(isValid);
		}
	}

	let valueOption: ListOption | undefined;
	if (value && data) {
		let found = find(data, (item) => {
			return Boolean(item.value && item.value.value === value);
		});
		if (found) {
			valueOption = found.value;
		} else {
			const items = get(options({ query: { value } }), { read });
			if (items && items.length > 0 && items[0].value === value) {
				valueOption = items[0];
			}
		}
	}
	value = valueOption ? valueOption.value : undefined;

	return (
		<div
			classes={[
				theme.variant(),
				themedCss.root,
				disabled && themedCss.disabled,
				valid === true && themedCss.valid,
				valid === false && themedCss.invalid,
				shouldFocus === true && themedCss.focused,
				expanded && themedCss.expanded
			]}
			key="root"
		>
			{label && (
				<Label
					theme={theme.compose(
						labelCss,
						css,
						'label'
					)}
					classes={classes}
					design={design}
					disabled={disabled}
					forId={triggerId}
					valid={valid}
					required={required}
					active={!!(value || icache.get('expanded'))}
					focused={shouldFocus}
				>
					{label}
				</Label>
			)}
			<TriggerPopup
				key="popup"
				onOpen={() => {
					icache.set('expanded', true);
				}}
				onClose={() => {
					icache.set('expanded', false);
					if (!dirty) {
						icache.set('dirty', true);
					}
				}}
				position={position}
				theme={themeProp}
				classes={classes}
				design={design}
			>
				{{
					trigger: (toggleOpen: any) => {
						function openMenu() {
							if (!disabled) {
								icache.set('focusNode', 'menu');
								focus.focus();
								toggleOpen();
							}
						}

						return (
							<button
								name={name}
								value={value}
								focus={() => focusNode === 'trigger' && shouldFocus}
								aria-controls={menuId}
								aria-haspopup="listbox"
								aria-expanded={
									icache.getOrSet('expanded', false) ? 'true' : 'false'
								}
								key="trigger"
								type="button"
								id={triggerId}
								disabled={disabled}
								classes={themedCss.trigger}
								onclick={openMenu}
								onkeydown={(event) => {
									if (
										event.which === Keys.Down ||
										event.which === Keys.Space ||
										event.which === Keys.Enter
									) {
										event.preventDefault();
										openMenu();
									}
								}}
							>
								<span
									classes={[themedCss.value, expanded && themedCss.valueExpanded]}
								>
									{(valueOption && valueOption.label) || (
										<span classes={themedCss.placeholder}>{placeholder}</span>
									)}
								</span>
								<span classes={themedCss.arrow}>
									<Icon
										type="down"
										theme={theme.compose(
											iconCss,
											css,
											'icon'
										)}
										classes={classes}
										design={design}
									/>
								</span>
							</button>
						);
					},
					content: (close: any) => {
						function closeMenu() {
							icache.set('focusNode', 'trigger');
							close();
						}

						return total === undefined && status === 'reading' ? (
							<LoadingIndicator
								key="loading"
								theme={themeProp}
								design={design}
								classes={classes}
							/>
						) : (
							<div key="menu-wrapper" classes={themedCss.menuWrapper}>
								<List
									key="menu"
									height="auto"
									focus={() => focusNode === 'menu' && shouldFocus}
									resource={resource({ template, options })}
									onValue={(value) => {
										focus.focus();
										closeMenu();
										value.value !== icache.get('value') &&
											icache.set('value', value.value);
										onValue(value);
									}}
									onRequestClose={closeMenu}
									onBlur={closeMenu}
									initialValue={value}
									itemsInView={itemsInView}
									theme={theme.compose(
										listCss,
										css,
										'menu'
									)}
									classes={classes}
									design={design}
									widgetId={menuId}
								>
									{items}
								</List>
							</div>
						);
					}
				}}
			</TriggerPopup>
			<HelperText
				key="helperText"
				text={valid === false ? messages.requiredMessage : helperText}
				valid={valid}
				classes={(classes as any)}
				design={design}
				theme={themeProp}
			/>
		</div>
	);
});

export default Select;
