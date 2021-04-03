import { create, tsx } from '@dojo/framework/core/vdom';
import TriggerPopup from '@dojo/widgets/trigger-popup';
import Popup from '@dojo/widgets/popup';
import Calendar from '@dojo/widgets/calendar';
import Button from '@dojo/widgets/button';
import Example from '../../Example';

import * as css from './styles/Basic.m.css';

const factory = create();

export default factory(function Basic() {
	return (
		<Example>
			<div classes={css.root} styles={{ paddingTop: '100px' }}>
				<TriggerPopup position="below">
					{{
						trigger: (onToggleOpen) => (
							<Button onClick={onToggleOpen}>Popup Below</Button>
						),
						content: () => (
							<div styles={{ background: 'red', height: '480px', width: '360px' }}>
							<Calendar
								key="calendar"
							/>
							</div>
						)
					}}
				</TriggerPopup>
				<TriggerPopup position="above">
					{{
						trigger: (onToggleOpen) => (
							<Button onClick={onToggleOpen}>Popup Above</Button>
						),
						content: () => (
							<div
								styles={{ background: 'green', height: '100px', fontSize: '32px' }}
							>
								Hello Above!
							</div>
						)
					}}
				</TriggerPopup>
				<TriggerPopup position="left">
					{{
						trigger: (onToggleOpen) => (
							<Button onClick={onToggleOpen}>Popup Left</Button>
						),
						content: () => (
							<div
								styles={{ background: 'green', height: '100px', fontSize: '32px' }}
							>
								Hello Left!
							</div>
						)
					}}
				</TriggerPopup>
				<TriggerPopup position="right">
					{{
						trigger: (onToggleOpen) => (
							<Button onClick={onToggleOpen}>Popup Right</Button>
						),
						content: () => (
							<div styles={{ background: 'red', height: '100px', fontSize: '32px' }}>
								Hello Right!
							</div>
						)
					}}
				</TriggerPopup>
			</div>
		</Example>
	);
});
