import { dimensions } from '@dojo/framework/core/middleware/dimensions';
import { create, tsx } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import Popup, { BasePopupProperties } from '../popup';
import * as fixedCss from './trigger-popup.m.css';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';

export interface TriggerPopupProperties extends BasePopupProperties {
	/** If the popup wrapper should match the trigger width (defaults to true) */
	matchWidth?: boolean;
	/** Optional min height for the popup's preferred position */
	minHeight?: number;
	/** Callback when the menu is opened  */
	onOpen?(position: any): void;
}

export interface TriggerPopupChildren {
	trigger: (toggleOpen: () => void) => RenderResult;
	content: (close: () => void) => RenderResult;
}

interface TriggerPopupICache {
	open: boolean;
	openPopup: boolean;
}

const icache = createICacheMiddleware<TriggerPopupICache>();

const factory = create({ dimensions, icache })
	.properties<TriggerPopupProperties>()
	.children<TriggerPopupChildren>();

export const TriggerPopup = factory(function({
	properties,
	children,
	middleware: { dimensions, icache }
}) {
	const { matchWidth = true, minHeight = 0, onOpen, ...otherProperties } = properties();

	const { position: triggerPosition, size: triggerSize } = dimensions.get('trigger');
	const el = document.scrollingElement || document.documentElement;
	const scrollTop = el.scrollTop || Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
	const triggerTop = triggerPosition.top + scrollTop;
	const triggerBottom = triggerTop + triggerSize.height;
	const wrapperStyles = {
		width: matchWidth ? `${triggerSize.width}px` : 'auto'
	};

	const { trigger, content } = children()[0];
	const close = () => {
		const { onClose } = properties();
		icache.set('open', false);
		onClose && onClose();
	};

	return (
		<virtual>
			<span key="trigger" classes={fixedCss.trigger}>
				{trigger(() => {
					icache.set('open', !icache.get('open'));
					if (icache.get('open')) {
						icache.set('openPopup', true);
					}
				})}
			</span>
			<Popup
				key="popup"
				{...otherProperties}
				x={triggerPosition.left}
				yTop={triggerBottom}
				yBottom={triggerTop}
				minHeight={minHeight}
				onOpen={(pos:any) => {
					if (open && icache.get('openPopup')) {
						const { onOpen } = properties();
						icache.set('openPopup', false);
						onOpen && onOpen(pos);
					}
				}}
				onClose={close}
				open={icache.get('open')}
			>
				<div key="trigger-wrapper" styles={wrapperStyles}>
					{content(close)}
				</div>
			</Popup>
		</virtual>
	);
});

export default TriggerPopup;
