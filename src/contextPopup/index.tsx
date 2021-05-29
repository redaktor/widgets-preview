import { create, tsx } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import focus from '@dojo/framework/core/middleware/focus';
import Popup from '../popup';

import * as css from '../theme/default/contextPopup.m.css';

export interface ContextPopupProperties {
	onClose?(): void;
	onOpen?(): void;
}

export interface ContextPopupChildren {
	trigger: RenderResult;
	content: (callbacks: { close(): void; shouldFocus(): boolean }) => RenderResult;
}

interface ContextIcache {
	x: number;
	y: number;
	open: boolean;
}

const icache = createICacheMiddleware<ContextIcache>();

const factory = create({ icache, focus })
	.properties<ContextPopupProperties>()
	.children<ContextPopupChildren>();

const CursorWidth = 2;
const CursorHeight = 4;

export const ContextPopup = factory(function({
	properties,
	children,
	middleware: { icache, focus }
}) {
	const x = icache.getOrSet('x', 0);
	const y = icache.getOrSet('y', 0);

	const { trigger, content } = children()[0];
	const close = () => {
		const { onClose } = properties();
		icache.set('open', false);
		onClose && onClose();
	};

	return (
		<virtual>
			<div
				classes={css.trigger}
				key="trigger"
				oncontextmenu={(event: MouseEvent) => {
					const { onOpen } = properties();
					event.preventDefault();
					focus.focus();
					icache.set('x', event.pageX - CursorWidth);
					icache.set('y', event.pageY - CursorHeight);
					icache.set('open', true);
					onOpen && onOpen();
				}}
			>
				{trigger}
			</div>
			<Popup
				key="popup"
				x={x}
				yTop={y}
				yBottom={document.documentElement.scrollTop + document.documentElement.clientHeight}
				onClose={close}
				position="below"
				open={icache.get('open')}
			>
				<div>{content({ close, shouldFocus: focus.shouldFocus })}</div>
			</Popup>
		</virtual>
	);
});

export default ContextPopup;
