import { tsx, create } from '@dojo/framework/core/vdom';
import { RedaktorActor, ActivityPubObjectNormalized } from '../common/interfaces';
import { normalizeActivityPub, isActor } from '../common/activityPubUtil';
import id from '../middleware/id';
import theme, { ThemedActivityPubObject } from '../middleware/theme';
import Actor from '../actor';
import Avatar from '../avatar';
import * as css from '../theme/material/actors.m.css';

export interface ActorsProperties extends ThemedActivityPubObject {
	openIndex?: number;
	widgetId?: string;
	/* Show a maximum Avatars */
	max?: number;
	/* If more than max, show a count, default true */
	moreCount?: boolean;
}

const factory = create({ theme, id }).properties<ActorsProperties>()
const AttributedTo = factory(function AttributedTo({ properties, middleware: { theme, id } }) {
	const themedCss = theme.classes(css);
	const {
		widgetId,
		openIndex,
		max,
		more = true,
		spaced: _spaced = true,
		size = 's',
		color = 'primary',
		..._rest
	} = normalizeActivityPub(properties());
	const idBase = widgetId || id.getId('attributedTo');

	const APo: ActivityPubObjectNormalized = _rest;
	if (!APo.attributedTo) { return '' }


	const closeID = `${idBase}_closeProfiles`;
	const spaced = APo.attributedTo.length > max ? false : _spaced;
	const spaceClass = APo.attributedTo.length > max ?
		themedCss.dense : spaced && themedCss.spaced;
	const remainingCount = !!max &&APo.attributedTo.length > max &&
		APo.attributedTo.length - max;

	return <div classes={[themedCss.root, spaceClass]}>
	{
		(APo.attributedTo.length === 1) && isActor(APo.attributedTo[0]) &&
			<Actor {...{...APo.attributedTo[0]}}
				classes={{
					'@redaktor/widgets/actor': { avatar: [themedCss.avatar] }
				}}
			/>
	}
	{
		(APo.attributedTo.length > 1) &&
		<div classes={themedCss.actors}>
			{APo.attributedTo.map((attrO: RedaktorActor, i) => {

				// TODO src for label -> image Avatar
				const name = attrO.name ? attrO.name[0] : '';
				return isActor(attrO) &&
					<virtual>
						<input type="radio" id={`${idBase}_attr${i}`} name={idBase} />
						<label for={`${idBase}_attr${i}`} classes={themedCss.actor}>
							<Avatar {...{size, spaced, color, name }}
								classes={{
									'@redaktor/widgets/avatar': { content: [themedCss.avatarsContent] }
								}}
							/>
						</label>
						<Actor {...{...attrO}}
							open={true}
							classes={{
								'@redaktor/widgets/actor': { avatar: [themedCss.avatar] }
							}}
						/>
					</virtual>
			})}
			<input type="radio" id={closeID} classes={themedCss.closeActors} name={idBase} />
			{
				!!remainingCount && <div classes={themedCss.moreWrapper}>
					<Avatar {...{size, spaced, color, name }}
					classes={{
						'@redaktor/widgets/avatar': {
							content: [themedCss.moreContent, remainingCount > 99 && themedCss.moreContentDense]
						}
					}}>
						{`+${remainingCount}`}
					</Avatar>
				</div>
			}
		</div>
	}
</div>

});

export default AttributedTo;
/*
<div classes={themedCss.bookmark} />
<div classes={themedCss.topic}>topic</div>
*/
