import { tsx, create, node } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { uuid } from '@dojo/framework/core/util';
import { clampStrings } from '../common/activityPubUtil';
import { ActivityPubObject, ActivityPubObjectNormalized } from '../common/interfaces';
import theme from '../middleware/theme';
import breakpoints from '../middleware/breakpoint';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
/*
import {
	createResourceTemplate,
	createResourceMiddleware,
	defaultFilter
} from '@dojo/framework/core/middleware/resources';
import focus from '@dojo/framework/core/middleware/focus';
*/
import i18n from '@dojo/framework/core/middleware/i18n';
import { normalizeActivityPub } from '../common/activityPubUtil';
import Paginated from '../paginated';
import Collapsed from '../collapsed';
import Srcset from '../srcset';
import Name from '../name';
import AttributedTo from '../attributedTo';
import AudioAvatar from '../audioAvatar';
import RadioGroup from '../radio-group';
import Chip from '../chip';
import Button from '../button';
import Slider from '../slider';
import Icon from '../icon';
import Image from '../image';
import Images from '../images';
import bundle from './nls/Audio';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/audio.m.css';

/* TODO exists in this module: */
import MD from '../MD/';


/*
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Audio",
  "name": "Interview With A Famous Technologist",
  "url": {
    "type": "Link",
    "href": "http://example.org/podcast.mp3",
    "mediaType": "audio/mp3"
  },

  "startTime": "2014-12-31T23:00:00-08:00",
  "endTime": "2015-01-01T06:00:00-08:00"

  "duration": "PT2H"
  // icon, image
  "attachment": [
    {
      "type": "Image",
      "content": "This is what he looks like.",
      "url": "http://example.org/cat.jpeg"
    }
  ]
}

context
Identifies the context within which the object exists or an activity was performed.
The notion of "context" used is intentionally vague. The intended function is to serve
as a means of grouping objects and activities that share a common originating context
or purpose. An example could be all activities relating to a common project or event.
*/

/* TODO
duration:
if APo.duration, use as fallback right from start
state store:
store the last used
- volume
- visibility of captions, subtitles, descriptions
*/

export interface AudioProperties extends ActivityPubObject {
	isRow?: boolean;
	editable?: boolean;
	fullscreen?: boolean;
	currentTime?: number;
	autoPlay?: boolean;
	muted?: boolean;
	volume?: number;
	speed?: number;
	/*deployPictureInPicture?: func;*/
	/* crossorigin parameter, default 'anonymous' */
	crossorigin?: 'anonymous' | 'use-credentials';
	onLoad?: () => any;
	onPlay?: (currentTime: number) => any;
	onPause?: (currentTime: number) => any;
	onMouseEnter?: (currentTime: number) => any;
	onMouseLeave?: (currentTime: number) => any;
	/* snap to baseline, default false */
	baselined?: boolean;
	/** `id` set on the root DOM node */
	widgetId?: string;
	/* show poster image (poster or image[0]), default true */
	hasPoster?: boolean;
	/* show audio controls, default true */
	hasControls?: boolean;
	/* show summary and content, default true */
	hasContent?: boolean;
	/* show images and attachments, default true */
	hasAttachment?: boolean;
}

interface TextTrack {
	index: number;
	language: string;
	label: string;
}
/* per spec
"A media element cannot have more than one track with the same kind, srclang and label"
*/
type TT = Map<string, TextTrack>;
export interface TextTracks {
	captions:TT, subtitles:TT, descriptions:TT, chapters:TT, metadata:TT
}
export interface VisibleTracks {
	captions: string; subtitles: string; descriptions: string; chapters: string; metadata: string;
};
export interface AudioIcache {
	l: any;
	id: string;
	width: number;
	currentTime: number;
	buffer: number;
	duration: number;
	volume: number;
	speed: number;
	tracks: TextTracks;
	trackMenu: RenderResult;
	tracksVisible: VisibleTracks | {};
	hasTracks: boolean;
	isSpeedMenuOpen: boolean;
	isTrackMenuOpen: boolean;
	isPicInPic: boolean;
	isDragging: boolean;
	isFresh: boolean;
	isPaused: boolean;
	isMuted: boolean;
	isRemaining: boolean;

	imagesCount: number;
	imagesLoaded: number;
}
export interface AudioChildren {
	/** Optional Header */
	header?: RenderResult;
	/** Optional Footer */
	footer?: RenderResult;
}

export const formatTime = (sec: number) => {
  const hours   = Math.floor(sec / 3600);
  const minutes = Math.floor((sec - (hours * 3600)) / 60);
  const seconds = sec - (hours * 3600) - (minutes * 60);
	const m0 = minutes < 10 ? '0' : '';
	const s0 = seconds < 10 ? '0' : '';
  return (hours === 0 ? '' : `${hours}:`) + `${m0}${minutes}:${s0}${seconds}`;
};

const icache = createICacheMiddleware<AudioIcache>();
/*
const resource = createResourceMiddleware();
export const listOptionTemplate = createResourceTemplate<ListOption>({
	idKey: 'value',
	read: async (req, { put }) => {
		const { offset, size, query } = req;
		const filteredData = timezones.map((s: string) =>
			({label: s, value: s})).filter((item) => defaultFilter(query, item));
		put({ data: filteredData.slice(offset, offset + size), total: filteredData.length }, req);
	}
});
*/


/* TODO
canPlay + error message / disabled states
---
slider:
aria-valuetext="seek audio bar"
aria-valuemax="100"
aria-valuemin="0"
aria-valuenow={Math.round(percentage)}
*/
const factory = create({
	icache,
	node,
	i18n,
	theme,
	breakpoints
	/*, resource */
})
	.properties<AudioProperties>()
	.children<AudioChildren | RenderResult | undefined>();

export const Audio = factory(function Audio({
	middleware: { icache, node, i18n, theme, breakpoints /*, resource */ },
	properties,
	children
}) {
	const { get, set, getOrSet } = icache;
	const themedCss = theme.classes(css);
	const { messages } = i18n.localize(bundle);
	const {
		alt, editable, onLoad, onPlay, onPause, onMouseEnter, onMouseLeave, widgetId = uuid(),
		baselined = true, hasPoster = true, hasControls = true, hasContent = true, hasAttachment = true,
		isRow = false, autoPlay = false, muted = false,
		crossorigin = 'anonymous', volume = 1, speed = 1, ..._rest
	} = normalizeActivityPub(properties());

	const APo: ActivityPubObjectNormalized = _rest;

	if (APo.type.indexOf('Audio') < 0 && (!APo.mediaType || APo.mediaType.toLowerCase().indexOf('audio') !== 0)) {
		return ''
	}

	const audio = (node.get('audio') as HTMLAudioElement);
	const tracks = (children() as any || []).filter((c: any) => c.tag === 'track');
	set('hasTracks', !!tracks.length, false);
	getOrSet('trackMenu', '', false);
	getOrSet('l', theme.line(), false);
	getOrSet('id', widgetId, false);
	getOrSet('buffer', 0, false);
	getOrSet('currentTime', 0, false);
	getOrSet('volume', Math.min(Math.max(0, volume), 1), false);
	getOrSet('speed', Math.min(Math.max(0.2, speed), 2), false);
	getOrSet('isSpeedMenuOpen', false, false);
	getOrSet('isTrackMenuOpen', false, false);
	getOrSet('isFresh', true, false);
	getOrSet('isMuted', muted, false);
	getOrSet('isRemaining', true, false);
	getOrSet('isPaused', !autoPlay);
	getOrSet('tracksVisible', {captions: '', subtitles: '', descriptions: '', chapters: '', metadata: ''});
	if (!get('isPaused') && get('isFresh')) { set('isFresh', false) }

  const togglePlay = (e?: Event) => {
		e && e.preventDefault();
		e && e.stopPropagation();
		set('isPaused', !get('isPaused'));
		!!audio && audio[!get('isPaused') ? 'play' : 'pause']();
		if (!get('isPaused') && onPlay) {
			onPlay(get('currentTime')||0)
		} else if (onPause) {
			onPause(get('currentTime')||0)
		}
  }
  const toggleMute = () => {
    audio.muted = set('isMuted', !get('isMuted'));
  }

	const handleDownload = () => {
		/* TODO - transkripts / WebVTT
  	fetch(url).then(res => res.blob()).then(blob => {
    	const element   = document.createElement('a');
    	const objectURL = URL.createObjectURL(blob);

    	element.setAttribute('href', objectURL);
    	// element.setAttribute('download', fileNameFromURL(url));
    	document.body.appendChild(element);
    	element.click();
    	document.body.removeChild(element);

    	URL.revokeObjectURL(objectURL);
  	}).catch(err => {
    	console.error(err);
  	});
		*/
  }
	const handleLoadedMetadata = () => {
		if (!audio) { return }
		set('duration', audio.duration, false);
		let trackMenu: RenderResult = [];
		if (audio.textTracks && audio.textTracks.length) {
			const textTracks: any = {
				captions:(new Map()),
				subtitles:(new Map()),
				descriptions:(new Map()),
				chapters:(new Map()),
				metadata:(new Map())
			};
			const l = audio.textTracks.length;
			let i;
			for (i = 0; i < l; i++) {
				const {kind, label, language, mode} = audio.textTracks[i];
				if (mode === 'showing') {
					icache.set('tracksVisible', {...icache.get('tracksVisible'), [kind]: i.toString()})
				}
				textTracks[kind] && textTracks[kind].set(`${kind}-${label}-${language}`, {
					value: i.toString(), label, language, mode
				});
			}
			/* TODO sorting of languages: userLocale, Int locale, en, ...others  */
			const tracksVisible: any = icache.get('tracksVisible');
			trackMenu = textTracks &&
				<div key="tracksMenu" role="menu" aria-modal="true" classes={themedCss.trackMenu}>
					{Object.keys(textTracks).map((k) => {
						return k === 'metadata' || !textTracks[k].size ? '' :
							<RadioGroup
								name={k}
								size="s"
								vertical={true}
								initialValue={tracksVisible[k]}
								options={Array.from(textTracks[k].values()).map((v: any) => {
									v.label = <virtual>
										<Chip color="neutral" size="xs" spaced={true}>
											{{ label: ` ${v.language} ` }}
										</Chip>
										{v.label}
									</virtual>
									return v
								})}
								onValue={(iStr) => {
									if (!audio) { return }
									const i = parseInt(iStr, 10);
									const track = audio.textTracks[i];
									textTracks[track.kind].forEach((t: any) => {
										audio.textTracks[t.value].mode = 'hidden';
									});
									if (i > -1) { // TODO i -1 = hide all
										audio.textTracks[i].mode = 'showing';
										icache.set('tracksVisible', {
											...icache.get('tracksVisible'),
											[track.kind]: iStr}
										)
									}
								}}
							>
								{{
									label: (messages as any)[`${k}Track`]
								}}
							</RadioGroup>
					}
				)}
				</div>
		}
		set('trackMenu', trackMenu);
	}
	const handleLoadedData = () => {
		if (!audio) { return }
		const { autoPlay, currentTime, muted = false, volume = 1, speed = 1 } = properties();
		if (currentTime) {
			audio.currentTime = currentTime;
		}
		audio.muted = get('isMuted')||muted;
		audio.volume = get('volume')||volume;
		audio.playbackRate = get('speed')||speed;
		onLoad && onLoad();
		autoPlay && togglePlay();
	}

	const handleProgress = () => {
		if (!audio) { return }
    const lastTimeRange = audio.buffered.length - 1;
    if (lastTimeRange > -1) {
			set('buffer', Math.ceil(audio.buffered.end(lastTimeRange) / audio.duration * 100));
    }
  }
	const handleKeyDown = (e: KeyboardEvent) => {
		e.preventDefault();
		e.stopPropagation();
		switch(e.key) {
			case 'k':
				togglePlay();
				break;
			case 'm':
				toggleMute();
				break;
			case 'j':
				seekBy(-10);
				break;
			case 'l':
				seekBy(10);
				break;
		}
	}

	/* TODO timeupdate event:
	Should we debounce ???
	Firefox fires the timeupdate event once per frame.
	Safari/Chrome fire every 250ms. Opera every 200ms.
	*/
	const setTime = (v: number) => {
		if (typeof v === 'number') { audio.currentTime = v; }
		set('currentTime', audio.currentTime);
	}

	const seekBy = (time: number) => {
		const currentTime = audio.currentTime + time;
		if (!isNaN(currentTime)) {
			setTime(currentTime);
			audio.currentTime = currentTime;
		}
	}

	/*
		classNames('audio-player', { editable })
	*/
	const sources = !!APo.url && <Srcset url={APo.url} />;
	// const posterSrc = poster || !!APo.image && !!APo.image[0] && APo.image[0].href;
	const menuOpen = get('isTrackMenuOpen');
	const formattedDuration = formatTime(Math.floor(get('duration')||0));
	const {breakpoint: vp = 's'} = breakpoints.get('measure')||{};
	const {contentRect: dim = {height: 0}} = breakpoints.get('media')||{};

	const lineCount = !get('l') ? 0 : ((dim && dim.height)||0) / get('l');
	const mml = !get('l') || !baselined ? 0 : (Math.max(0, Math.ceil(lineCount)) - lineCount);
	const isMini = (isRow && (vp === 'micro' || vp === 'xs' || vp === 's')) || (!isRow && (vp === 'micro' || vp === 'xs'));
	const typoClass = isMini ? ui.s : (vp === 'l' || vp === 'xl' ? ui.l : ui.m);
	const audioAvatarSize = vp === 'micro' || vp === 'xs' || vp === 's' ? 'l' : 'xl';

	const attachmentIcons = hasAttachment ? (APo.attachment||[]).reduce((a: string[], ao) =>
		a.concat(ao.type.filter((t: string) => (a.indexOf(t) < 0))), []).map((type) =>
			<label classes={themedCss.attachmentType}>
				<Icon size="xxl" type={(type as any).toLowerCase()} />
			</label>) : '';

	const vol = get('volume')||0;
	const playerProps: any = {
		id: get('id'),
		alt: !!APo.summary && !!APo.summary.length ? APo.summary[0]||'' : '',
		classes: [
			themedCss.audio,
			typoClass,
			get('hasTracks') || get('isPicInPic') ? themedCss.video : null
		],
		preload: autoPlay ? 'auto' : 'metadata',
		onplay: onPlay && onPlay(get('currentTime')||0),
		onpause: onPause && onPause(get('currentTime')||0),
		onended: togglePlay,
		onprogress: handleProgress,
		onloadedmetadata: handleLoadedMetadata,
		onloadeddata: handleLoadedData,
		ontimeupdate: setTime,
		onseeked: togglePlay,
		crossorigin: crossorigin
	};

	if (get('hasTracks') && !!audio) {
		/*
		VTT CSS Extensions https://w3c.github.io/webvtt/#css-extensions
		kind: "subtitles"
		label: "English"
		language: "en"
		mode: "showing"
		*/
		/*
		audio.textTracks.addEventListener('addtrack', (e: TrackEvent) => {
			// TODO : begin to cache media
		});

		content, instrument, location
		*/
	}
	return <div
		key="root"
		classes={[
			theme.variant(),
			themedCss.root,
			isRow && themedCss.row,
			theme.shaped(themedCss),
			theme.sized(ui),
			theme.colored(colors),
			theme.elevated(ui),
			theme.animated(themedCss),
			get('isFresh') && themedCss.fresh,
			get('isPaused') && themedCss.paused,
			themedCss[(vp as keyof typeof themedCss)],
			menuOpen && themedCss.menuOpen
		]}
		onMouseEnter={onMouseEnter && onMouseEnter(get('currentTime')||0)}
		onMouseLeave={onMouseLeave && onMouseLeave(get('currentTime')||0)}
		onKeyDown={handleKeyDown}
		aria-label="Audio Player"
		role="region"
	>
		<div classes={themedCss.measure} key="measure" />
		<div classes={themedCss.mediaFreshTop}>
			<Icon type="listen" spaced={true} />
			<i classes={themedCss.freshDuration}>{formattedDuration}</i>
		</div>
		<div classes={themedCss.mediaTop}>
			<Button
				title={messages.captions}
				variant="flat"
				aria-haspopup="menu"
				onClick={() => { set('isTrackMenuOpen', !menuOpen) }}
			>
				<Icon size="xxl" type="code" />
			</Button>
		</div>
		<div
			key="media"
			classes={[
				themedCss.media,
				/* TODO isJS */
				/* theme.isJS() && */
			]}
			style={`--mml: ${mml};`}
		>
			{ menuOpen && get('trackMenu') }
			<div key="avatar" classes={themedCss.audioAvatarWrapper}>
				<AudioAvatar audioElement={audio} size={audioAvatarSize}>SL</AudioAvatar>
			</div>
			<noscript>
				<video controls={true} {...playerProps}>{sources}{children()}</video>
			</noscript>
			{
				hasPoster && !!APo.image && !!APo.image[0] &&
					<Image {...APo.image[0]}
						fit={true} baselined={false} isRow={isRow} hasContent={false} hasAttachment={false}
					/>
			}

			{!get('hasTracks') && !get('isPicInPic') ?
				<audio key="audio" {...playerProps}>{sources}{children()}</audio> :
				<video key="audio" {...playerProps}>{sources}{children()}</video>
			}
			{!menuOpen &&
				<button
					type="button"
					title={get('isPaused') ? messages.play : messages.pause}
					aria-controls={get('id')}
					aria-label={get('isPaused') ? messages.play : messages.pause}
					classes={themedCss.playPause} onclick={togglePlay}
				/>
			}
		</div>

		{hasControls && <div classes={themedCss.controls}>
			<Slider
				key="progress"
				max={audio ? audio.duration : 100}
				value={get('currentTime')||0}
				buffer={get('buffer')||0}
				size="s"
				onValue={(n) => {
					togglePlay();
					setTime(n);
				}}
				classes={{
					'@dojo/widgets/progress': { root: [themedCss.progress] }
				}}
			/>
			<div classes={themedCss.captionRow}>
				<p classes={themedCss.caption}>
					<span classes={themedCss.time} onclick={() => { set('isRemaining', !get('isRemaining')) }}>
						{
							get('isRemaining') ?
							`- ${formatTime(Math.floor((get('duration')||0) - (get('currentTime')||0)))}` :
							formatTime(Math.floor(get('currentTime')||0))
						}
						{vp === 'micro' || vp === 'xs' ? '' : ' '}
					</span>
					{
						get('isRemaining') ? '' :
							<span classes={themedCss.duration} onclick={() => { set('isRemaining', true) }}>
								/{vp === 'micro' || vp === 'xs' ? '' : ' '}{formattedDuration}
							</span>
					}
				</p>
				<button
					tabIndex={0}
					type="button"
					title={messages.speed}
					aria-label={messages.speed}
					classes={[themedCss.speedControl, get('isMuted') && themedCss.muted]}
					onclick={() => set('isSpeedMenuOpen', !get('isSpeedMenuOpen'))}
				>
					{get('speed')}x
				</button>
				<div classes={themedCss.volume}>
					<Slider
						key="volumeOrSpeed"
						max={get('isSpeedMenuOpen') ? 2 : 1}
						step={0.1}
						markType={get('isSpeedMenuOpen') ? 'dot' : void 0}
						marks={get('isSpeedMenuOpen') ? {1:'|'} : void 0}
						color={(get('isMuted') || vol < 0.05) ? 'warning' : 'grey'}
						value={
							get('isSpeedMenuOpen') ?
								get('speed') :
								(get('isMuted') ? 0 : vol)
						}
						onValue={(v) => {
							if (get('isSpeedMenuOpen')) {
								audio.playbackRate = set('speed', Math.max(0.2,v))||1;
							} else {
								if (vol >= 0.05) {
									set('isMuted', false, false);
								}
								audio.volume = set('volume', v);
							}
						}}
						size="s"
					/>
					{!get('isSpeedMenuOpen') &&
						<Button
							variant="flat"
							size="xs"
							onClick={toggleMute}
							title={get('isMuted') ? messages.unmute : messages.mute}
							aria={{label: get('isMuted') ? messages.unmute : messages.mute}}
						>
							<Icon type={
								(get('isMuted') || vol < 0.05) ? 'volumeMute' :
								(vol > 0.75 ? 'volumeHigh' : (vol > 0.3 ? 'volumeMedium' : 'volumeLow'))
							} />
						</Button>
					}
				</div>
			</div>
		</div>}

		{!isRow && !menuOpen && get('isPaused') && <Name name={APo.name} isRow={isRow} size={(vp as any)} />}

		<div classes={themedCss.attributions}>
			<AttributedTo {...APo} max={39} />
		</div>

		{hasContent && <div classes={themedCss.contentWrapper}>
			{!!isRow && <Name name={APo.name} isRow={isRow} size={(vp as any)} />}
			{
				APo.summary && <Paginated key="summary" property="summary" classes={{
						'@dojo/widgets/paginated': { root: [themedCss.summaryPaginated] }
					}}
				>
					{clampStrings(APo.summary, 500).map((_summary, i) =>
						<MD classes={[themedCss.summary, typoClass]} key={`summary${i}`} content={_summary} />
					)}
				</Paginated>
			}
			{
				APo.content && <Collapsed responsive={!isRow} lines={isRow ? (get('isFresh') ? 2 : 1) : 12} classes={{
						'@dojo/widgets/collapsed': { root: [themedCss.contentCollapsed] }
					}}>
					{APo.content.map((_content, i) => <virtual>
						<MD classes={[themedCss.content, typoClass]} key={`content${i}`} content={_content} /><hr />
					</virtual>)}
				</Collapsed>
			}
		</div>}

		{hasAttachment && <virtual>
			<Images key="images" isRow={isRow} image={APo.image} size={(vp as any)} />
			<div key="attachment" classes={themedCss.attachment}>
				<div key="attachmentControl" classes={themedCss.attachmentControl}>
					<Chip>
						{{ label: <virtual><Icon spaced={true} type="pin" /> {(APo.attachment||[]).length}{' attachment'}</virtual> }}
					</Chip>
					{ attachmentIcons }
				</div>
				<span>a</span>
				<span>b</span>
			</div>
		</virtual>}
	</div>

});

export default Audio;
/*

<button onclick={() => {
	set('isPicInPic', true);
	try {
		const doc: any = document;
		if (audio !== doc.pictureInPictureElement) {
			(audio as any).requestPictureInPicture();
		} else {
			doc.exitPictureInPicture();
		}
	} catch {}
}}>P</button>


<div classes={themedCss.captionRow}>
	<Button size="xs">Captions</Button>
</div>
<button
	tabIndex={0}
	type="button"
	title={messages.download}
	aria-label={messages.download}
	classes={themedCss.download}
	onclick={handleDownload}
>
	<Icon type="download" />
</button>


generator
location

instrument
Identifies one or more objects used (or to be used) in the completion of an Activity.

result
Describes the result of the activity. For instance, if a particular action results in the creation
of a new resource, the result property can be used to describe that new resource.

context
Identifies the context within which the object exists or an activity was performed.
The notion of "context" used is intentionally vague. The intended function is to serve
as a means of grouping objects and activities that share a common originating context or purpose.
An example could be all activities relating to a common project or event.

attachment
origin/target
*/
