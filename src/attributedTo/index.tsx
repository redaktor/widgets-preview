import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import focus from '@dojo/framework/core/middleware/focus';
import { RedaktorActor } from '../common/interfaces';
import { normalizeAs, isActor } from '../common/activityPubUtil';
import id from '../middleware/id';
import theme, { ThemedAsObject } from '../middleware/theme';
import Actor from '../actor';
import Avatar from '../avatar';
import * as css from '../theme/material/actors.m.css';

export interface ActorsProperties extends ThemedAsObject {
	widgetId?: string;
	/* Show a maximum Avatars */
	max?: number;
	/* If more than max, show a count, default true */
	moreCount?: boolean;
	byline?: RenderResult;
}
export interface ActorsIcache {
	hasProfileImage?: boolean;
	openIndex?: number;
	focusIndex?: number;
}
const icache = createICacheMiddleware<ActorsIcache>();
const factory = create({ theme, focus, icache, id }).properties<ActorsProperties>()
const AttributedTo = factory(function AttributedTo({ properties, middleware: { theme, focus, icache, id } }) {
	const themedCss = theme.classes(css);
	const {
		widgetId,
		byline,
		max = 99,
		more = true,
		spaced: _spaced = true,
		size = 's',
		color = 'primary'
	} = properties();
	const {
		...APo
	} = normalizeAs(properties());

	const { get, set, getOrSet } = icache;
	const idBase = widgetId || id.getId('attributedTo');

	if (!APo.attributedTo) { return '' }
	const attributedTo: RedaktorActor[] = APo.attributedTo.filter((actor) => isActor(actor))
	getOrSet('openIndex', -1);
	const closeID = `${idBase}_closeProfiles`;
	const spaced = attributedTo.length > max ? false : _spaced;
	const spaceClass = attributedTo.length > max ?
		themedCss.dense : spaced && themedCss.spaced;
	const remainingCount = !!max &&attributedTo.length > max &&
		attributedTo.length - max;

	return <div classes={[themedCss.root, spaceClass]}>
	{
		(attributedTo.length === 1) &&
			<Actor {...{...attributedTo[0], byline}} focus={focus.shouldFocus} />
	}
	{
		(attributedTo.length > 1) &&
		<div classes={[
			themedCss.actors,
			get('openIndex') !== -1 && themedCss.active,
			!!get('hasProfileImage') && themedCss.hasProfileImage
		]}>
			{attributedTo.map((attrO: RedaktorActor, i) => {
				// TODO src for label -> image Avatar
				const name = attrO.name ? attrO.name[0] : '';
				return <Actor
					{...{...attrO}}
					open={get('openIndex') === i}
					classes={attributedTo.length > 2 ? {
						'@redaktor/widgets/actors': {
							attributions: [
								attributedTo.length === 3 ? themedCss.has3 : themedCss.more3
							]
						}
					} : {}}
					onOpen={(hasImage) => {
						set('hasProfileImage', hasImage)
						set('openIndex', i)
					}}
					onClose={() => { setTimeout(() => i === get('openIndex') && set('openIndex', -1), 1) }}
					focus={focus.shouldFocus}
				/>
			})}
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
