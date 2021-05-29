import { tsx, create } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { RedaktorActor, ActivityPubActivity } from '../common/interfaces';
import words from '../framework/String/words';
import { isLinkOrImage, getActorName, normalizeActivityPub } from '../common/activityPubUtil';
import Button from '../button';
import Chip from '../chip';
import Icon from '../icon';
import Avatar from '../avatar';
import Input from '../inputText';
import * as css from '../theme/material/card.m.css';
import theme from '../middleware/theme';

export interface ProfileProperties extends RedaktorActor {
	allowFollow?: boolean; /* default true */
	allowAnnounce?: boolean; /* default true */
	ignore?: boolean; /* default false TODO */
	byline?: string;
	activityType?: string;
	onChangePetname?: (v: string) => any;
	onFollow?: (ap: ActivityPubActivity) => any;
}
interface ProfileICache {
	open: boolean;
	edgeNamesVisible?: boolean;
	follow: boolean | 'follower' | 'mutual' | 'me';
	preferredUsername: string[];
	petName?: string[];
}

/*
TODO : DOC edgeNames - edgeNames Array is sorted by most important first !
*/

const icache = createICacheMiddleware<ProfileICache>();
const factory = create({ icache, theme })
	.properties<ProfileProperties>()

export const Profile = factory(function Profile({ children, properties, middleware: { icache, theme } }) {
	const themedCss = theme.classes(css);

	const {
		handle = '?',
		edgeNames = [],
		icon,
		image,
		byline,
		summary,
		follow: f,
		petName: p
	} = normalizeActivityPub(properties());

	const preferredUsername = getActorName(properties());
	icache.getOrSet('preferredUsername', preferredUsername);

	const follow = icache.getOrSet('follow', f||false);
	const petName = icache.getOrSet('petName', p);
	const following = !!(follow === 'mutual' || follow === 'me');

	const _onFollow = () => {
		icache.set('petName', icache.get('preferredUsername'), false);
		icache.set('follow', !icache.get('follow') ? true : 'mutual')
		/* TODO !
			onFollow && onFollow(apActivity: ActivityPubActivity)
		*/
	}

	const eCount = edgeNames.length;
	const edgeLabel = !eCount ? ` • followed by nobody you know` :
` • followed by ${getActorName(edgeNames[0])}
${eCount < 2 ? '' : (eCount === 2 ? ' and 1' : `& ${eCount-1} others`)}`;
	const edgeList = () => {
		let i;
		let names = [];
		let l = Math.min(5,edgeNames.length);
		for (i = 0; i < l; i++) {
			names.push(getActorName(edgeNames[i]))
		}
		return names
	}

	const avatarFromStr = () => {
		const prefName = icache.get('preferredUsername')||['?']
		const s = prefName[0]||'?';
		const w = words(s);
		return !w.length ? '' : <Avatar spaced={false}>
			{w.length < 2 ? s.substr(0,2) : `${w[0].charAt(0)}${w[1].charAt(0)}`}
		</Avatar>
	}
	let avatarImg = icon ?
		(Array.isArray(icon) ? icon[0] : isLinkOrImage(icon) && icon) :
		(Array.isArray(image) ? image[0] : isLinkOrImage(image) && image);
	const avatarSrc = avatarImg ?
		(typeof avatarImg === 'string') ? avatarImg : (avatarImg.url||avatarImg.href) :
		null;
	const avatar = avatarSrc ? <Avatar spaced={false} src={avatarSrc} /> : avatarFromStr();
	const followVerb = !follow ? '' :
		(follow === true ? 'followed' : (follow === 'follower' ? 'follows you' : 'mutual')) ||
		'';

	return (
		<details classes={[
			themedCss.attributions,
			avatar ? themedCss.hasAvatar : null,
			petName ? themedCss.wellKnown : null
		]}
		>
			<summary
				classes={themedCss.summary}
				onclick={() => icache.set('open', !icache.get('open'))}
			>
				<span classes={themedCss.avatar}>{avatar}</span>
				<div classes={themedCss.metaWrapper}>
					{petName ?
						<h2 classes={themedCss.petname}>{petName}</h2> :
						(icache.get('preferredUsername') ?
							<h5 classes={themedCss.actorName}>{icache.get('preferredUsername')}</h5> :
							''
						)
					}
					{byline && <span>{byline}</span>}
				</div>
			</summary>
			{handle ? <span classes={themedCss.handle}>{handle}</span> : ''}
			{summary && icache.get('open') && !icache.get('edgeNamesVisible') &&
				<p classes={[themedCss.responsiveTypo, themedCss.actorDetails]}>
					{summary}
				</p>
			}

			{follow !== 'me' &&
				<details classes={!following ? themedCss.followAction : themedCss.unfollowAction}>
					{icache.get('open') && !following && <virtual>
						<Input
							variant="flat"
							color="primary" spaced={false} required={true} selection={true}
							initialValue={preferredUsername[0]}
							onValue={(v = '') => icache.set('preferredUsername', [v])}
							onKeyDown={(keyNr) => keyNr === 13 && _onFollow()}
						>
							{{label: <small>pet name</small>}}
						</Input>
						<summary classes={themedCss.followBtn}>
							<Button
							  variant={preferredUsername !== icache.get('preferredUsername') ? 'filled' : 'outlined'}
								color="primary" responsive={true} spaced={false}
							  onClick={() => _onFollow()}
							>
								<Icon type="follow" /> Follow
							</Button>
						</summary>
					</virtual>
					}
					{icache.get('open') && !!following &&
						<Button variant="outlined" color='secondary' spaced={false}>Unfollow</Button>
					}
				</details>
			}
			{icache.get('open') && <Chip
				classes={{
					'@redaktor/widgets/chip': {
						root:[themedCss.trustChip, follow === 'me' ? themedCss.me : null]
					}
				}}
				variant="filled" spaced={false} inline={true}
				color={follow === 'me' ? 'neutral' : (!following ? 'blueGrey' : 'secondary')}
				onClick={() => icache.set('edgeNamesVisible', !icache.get('edgeNamesVisible'))}
			>
				{{
					label: <div classes={themedCss.followerLabel}>
						{follow !== 'me' ? followVerb : '/me'}
						{follow !== 'me' && edgeLabel && <span>{edgeLabel}</span>}
					</div>,
					icon: () => {
						if (!follow || follow === 'me') { return null }
						const iconType = follow === true ? 'followAtoB' :
						(follow === 'follower' ? 'followBtoA' : 'followMutual');
						return <Icon size="xxl" type={iconType} />
					}
				}}
			</Chip>}
			{!!edgeList().length && icache.get('open') && icache.get('edgeNamesVisible') &&
				<p classes={[themedCss.responsiveTypo]}>
					<ul>{edgeList().map((n) => <li>{n}</li>)}</ul>
				</p>}
		</details>
	);
});
export default Profile;
/*
<div classes={themedCss.bookmark} />
<div classes={themedCss.topic}>topic</div>
*/
