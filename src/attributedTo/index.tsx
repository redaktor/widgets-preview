import { tsx, create } from '@dojo/framework/core/vdom';
import { uuid } from '@dojo/framework/core/util';
import { RedaktorActor, ActivityPubObject, ActivityPubObjectNormalized } from '../common/interfaces';
import { normalizeActivityPub, isActor } from '../common/activityPubUtil';
import Actor from '../actor';
import Avatar from '../avatar';
import * as css from '../theme/material/actors.m.css';
import theme from '../middleware/theme';

export interface ActorsProperties extends ActivityPubObject {
	openIndex?: number;
	widgetId?: string;
}

const factory = create({ theme }).properties<ActorsProperties>()
const AttributedTo = factory(function AttributedTo({ properties, middleware: { theme } }) {
	const themedCss = theme.classes(css);
	const {
		openIndex,
		widgetId = uuid(),
		..._rest
	} = normalizeActivityPub(properties());

	const APo: ActivityPubObjectNormalized = _rest;

	return <div classes={themedCss.root}>
	{
		(APo.attributedTo && APo.attributedTo.length === 1) && isActor(APo.attributedTo[0]) &&
			<Actor {...{...APo.attributedTo[0]}}
				classes={{
					'@dojo/widgets/actor': { avatar: [themedCss.avatar] }
				}}
			/>
	}
	{
		(APo.attributedTo && APo.attributedTo.length > 1) &&
		<div classes={themedCss.actors}>
			{APo.attributedTo.map((attrO: RedaktorActor, i) => {

				// TODO src for label -> image Avatar
				const name = attrO.name ? attrO.name[0] : '';
				return isActor(attrO) &&
					<virtual>
						<input type="radio" id={`${widgetId}_attr${i}`} name={widgetId} />
						<label for={`${widgetId}_attr${i}`}>
							<Avatar
								size="s"
								spaced={true}
								name={name}
								classes={{
									'@dojo/widgets/avatar': { content: [themedCss.avatarsContent] }
								}}
							/>
						</label>
						<Actor {...{...attrO}}
							open={true}
							classes={{
								'@dojo/widgets/actor': { avatar: [themedCss.avatar] }
							}}
						/>
					</virtual>
			})}
			<input type="radio" id={`${widgetId}_closeProfiles`} classes={themedCss.closeActors} name={widgetId} />
		</div>
	}
</div>

});

export default AttributedTo;
/*
<div classes={themedCss.bookmark} />
<div classes={themedCss.topic}>topic</div>
*/
