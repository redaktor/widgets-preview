import { tsx, create } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import focus from '@dojo/framework/core/middleware/focus';
import { RedaktorActor, AsActivity } from '../common/interfaces';
import i18nActivityPub from '../middleware/i18nActivityPub';
import { getActorName } from '../common/activityPubUtil';
import Img from '../image/image';
import Button from '../button';
// import Chip from '../chip';
import Icon from '../icon';
import Avatar from '../avatar';
import Input from '../inputText';
import bundle from '../_ld/redaktor/nls/redaktor';
import * as viewCSS from '../theme/material/_view.m.css';
import * as detailsCss from '../theme/material/details.m.css';
import * as iconCss from '../theme/material/icon.m.css';
import * as css from '../theme/material/actors.m.css';
import theme from '../middleware/theme';

export interface ActorProperties extends RedaktorActor {
/* small typo, inline */
	compact?: boolean;

	allowFollow?: boolean; /* default true */
	allowAnnounce?: boolean; /* default true */
	ignore?: boolean; /* default false TODO */
	byline?: RenderResult;
	activityType?: string;
	onOpen?: (hasProfileImage: boolean) => any;
	onClose?: () => any;
	onFocus?: () => any;
	onBlur?: () => any;
	onChangePetname?: (v: string) => any;
	onFollow?: (ap: AsActivity) => any;
	open?: boolean;
}
interface ActorICache {
	open: boolean;
	focused: boolean;
	edgeNamesVisible?: boolean;
	follow: boolean | 'follower' | 'mutual' | 'me';
	preferredUsername: string;
	petName?: string;
}

/*
TODO : DOC edgeNames - edgeNames Array is sorted by most important first !

before edgeList: summary like

{<Chip
	classes={{
		'@redaktor/widgets/chip': {
			root: [themedCss.trustChip, follow === 'me' ? themedCss.me : null]
		}
	}}
	design="filled" spaced={false} inline={true}
	color={follow === 'me' ? 'neutral' : (!following ? 'blueGrey' : 'secondary')}
	onClick={() => set('edgeNamesVisible', !get('edgeNamesVisible'))}
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
*/
const icache = createICacheMiddleware<ActorICache>();
const factory = create({ icache, focus, i18nActivityPub, theme })
	.properties<ActorProperties>()

const Actor = factory(function Actor({ /*children,*/ properties, middleware: { icache, focus, i18nActivityPub, theme } }) {
	const themedCss = theme.classes(css);
	const viewDesktopCSS = theme.viewDesktopCSS();
	const normalized = i18nActivityPub.normalized<ActorProperties>();
	const {
		byline, onFocus, onBlur, onOpen, onClose,
		focus: focused = false, compact = false, open = false
	} = properties();
	const {
		handle = '?',
		edgeNames = [],
		icon,
		image,
		summary,
		follow: f,
		petName: p
	} = normalized;
	const { messages } = i18nActivityPub.localize(bundle);
	const { get, set, getOrSet } = icache;
	const preferredUsername = getActorName(normalized);
	// console.log(normalized, preferredUsername);
	getOrSet('preferredUsername', preferredUsername);
	getOrSet('open', open);
	// getOrSet('focused', open);

	const follow = getOrSet('follow', f||false);
	const petName = getOrSet('petName', p);
	const following = !!(follow === 'mutual' || follow === 'me');

	const _onFollow = () => {
		set('petName', get('preferredUsername'), false);
		set('follow', !get('follow') ? true : 'mutual')
		/* TODO !
			onFollow && onFollow(apActivity: AsActivity)
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


	const getSrc = (img: any) => img ? ((typeof img === 'string') ? img :
		(!!img.href ? img.href : (!!img.url ? img.url.map(getSrc) : null))) : null;
	const avatarImg = icon ? icon[0] : (image ? image[0] : void 0);
	const profileImage = (!!icon && !!icon.length && !!image && !!image.length) ? image : void 0;
	/* TODO profileImage focalPoint */
	const avatarSrc = getSrc(avatarImg);
	const prefName = get('preferredUsername') || preferredUsername || '?';
	const avatar = !avatarSrc ? <Avatar spaced={false} name={prefName} /> :
		<Avatar spaced={false} src={avatarSrc} />;
	const followVerb = !follow ? '' :
		(follow === true ? 'followed' : (follow === 'follower' ? 'follows you' : 'mutual')) ||
		'';

	const detailsContent = <div classes={themedCss.detailsContent}>
		{handle ? <i classes={themedCss.handle}>{handle}</i> : ''}
		{summary && !get('edgeNamesVisible') &&
			<p classes={[themedCss.responsiveTypo, themedCss.actorDetails]}>
				{summary}
			</p>
		}
		{follow !== 'me' && <virtual>
			{!following && <div classes={themedCss.followWrapper}>
				<Input
					design="flat"
					color="primary" spaced={false} required={true} selection={true}
					initialValue={prefName}
					autocomplete="name"
					focus={!!focused && !!get('focused') ? focus.shouldFocus : void 0}
					onBlur={() => set('focused', false)}
					onValue={(v = '') => set('preferredUsername', v)}
					onKeyDown={(keyNr) => keyNr === 13 && _onFollow()}
					classes={{
						'@redaktor/widgets/inputText': {
							focusedContent: [themedCss.petNameIcon]
						}
					}}
				>
					{{
						label: <small>pet name</small>,
						focusContent: <i classes={[iconCss.icon, iconCss.people]}></i>
					}}
				</Input>
				<span classes={themedCss.actionButtons}>
					<Button design="filled" color="lime" responsive={true} spaced={false} onClick={_onFollow}>
						{messages.follow}
					</Button>
					<Button design="filled" color="primary" responsive={false} spaced="left" onClick={() => {}}>
						<Icon type="bullhorn" />
					</Button>
					<Button design="filled" color="primary" responsive={false} spaced="left" onClick={() => {}}>
						<Icon type="profile" />
					</Button>
				</span>
			</div>
			}
			{!!following &&
				<Button design="outlined" color='secondary' spaced={false}>Unfollow</Button>
			}
		</virtual>}


		{!!edgeList().length && get('edgeNamesVisible') &&
			<p classes={[themedCss.responsiveTypo]}>
				<ul>{edgeList().map((n) => <li>{n}</li>)}</ul>
			</p>}
	</div>

	return <details
		key="details"
		classes={[
			themedCss.attributions,
			compact ? themedCss.compact : themedCss.headline,
			avatar && themedCss.hasAvatar,
			petName && themedCss.wellKnown
		]}
		open={open}
		ontoggle={(evt: Event) => {
			evt.preventDefault();
			console.log('ontoggle');
			set('open', !get('open'));
			if (get('open')) {
				console.log('open')
				set('focused', true);
				onOpen && onOpen(!!profileImage && !!profileImage.length);
				focus.focus()
			} else {
				onClose && onClose()
			}
		}}
		onfocus={() => { onFocus && onFocus() }}
		onblur={() => { onBlur && onBlur() }}
	>
		<summary key="summary" classes={[
			detailsCss.animated, detailsCss.summary, themedCss.summary,
			!!profileImage && !!profileImage.length && themedCss.hasProfileImage
		]}>

			{!!profileImage && !!profileImage.length && profileImage.map((img: any) => {
				return <div aria-hidden="true" classes={[
					themedCss.profileImage,
					viewCSS.m16by5,
					viewDesktopCSS && viewDesktopCSS.m16by5
				]}>
					<Img
						{...img}
						key="profileImage"
						fit="cover"
						focalPoint={void 0}
						aspectRatio="16/5"
					/>
				</div>
			})}
			<div classes={themedCss.summaryContent}>
				{!compact && <span classes={themedCss.avatar}>{avatar}</span>}
				<div classes={themedCss.metaWrapper}>
					{petName ? (compact ? <span>{petName.substr(0,36)}</span> :
						<virtual>
							<h5 classes={[detailsCss.summaryContent, themedCss.actorName, themedCss.closed, themedCss.petName]}>{petName}</h5>
							<h3 classes={[detailsCss.summaryContent, themedCss.actorName, themedCss.petName]}>{petName}</h3>
						</virtual>) :
						(get('preferredUsername') ? (compact ? <span>{(get('preferredUsername')||'').substr(0,36)}</span> :
							<h5 classes={[detailsCss.summaryContent, themedCss.actorName, themedCss.noPetName]}>{get('preferredUsername')}</h5>) :
							''
						)
					}
					{byline && <small classes={themedCss.byline}>{byline}</small>}
				</div>
			</div>
		</summary>
		{detailsContent}
	</details>
});
export default Actor;
/*
<div classes={themedCss.bookmark} />
<div classes={themedCss.topic}>topic</div>
*/
