import { tsx, create, node } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { uuid } from '@dojo/framework/core/util';
import { ActivityPubObject, ActivityPubObjectNormalized } from '../common/interfaces';
import resize from '@dojo/framework/core/middleware/resize';
import theme from '../middleware/theme';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
/*
import {
	createResourceTemplate,
	createResourceMiddleware,
	defaultFilter
} from '@dojo/framework/core/middleware/resources';
*/
import focus from '@dojo/framework/core/middleware/focus';
import i18n from '@dojo/framework/core/middleware/i18n';
import { normalizeActivityPub } from '../common/activityPubUtil';
import Paged from '../paged';
import AttributedTo from '../attributedTo';
import Button from '../button';
import Slider from '../slider';
import Icon from '../icon';
import bundle from './nls/Audio';
import * as ui from '../theme/material/_ui.m.css';
import * as colors from '../theme/material/_color.m.css';
import * as css from '../theme/material/audio.m.css';
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
export interface AudioProperties extends ActivityPubObject {
	poster?: string;
	editable?: boolean;
	fullscreen?: boolean;
	currentTime?: number;
	autoPlay?: boolean;
	muted?: boolean;
	volume?: number;
	speed?: number;
	/*deployPictureInPicture?: func;*/
	onPlay?: (currentTime: number) => any;
	onPause?: (currentTime: number) => any;
	onMouseEnter?: (currentTime: number) => any;
	onMouseLeave?: (currentTime: number) => any;
	/** `id` set on the root button DOM node */
	widgetId?: string;
}
export interface AudioIcache {
	l: any;
	id: string;
	width: number;
	currentTime: number;
	buffer: number;
	duration: number;
	fresh: boolean;
	paused: boolean;
	muted: boolean;
	volume: number;
	speed?: number;
	speedControl: boolean;
	hasTracks: boolean;
	dragging: boolean;
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
	focus,
	resize
	/*, resource */
})
	.properties<AudioProperties>()
	.children<AudioChildren | RenderResult | undefined>();

export const Audio = factory(function Audio({
	middleware: { icache, node, i18n, theme, focus, resize /*, resource */ },
	properties,
	children
}) {
	const themedCss = theme.classes(css);
	const { messages } = i18n.localize(bundle);
	const {
		alt, editable, onPlay, onPause, onMouseEnter, onMouseLeave, widgetId = uuid(),
		autoPlay = false, muted = false, volume = 1, speed = 1, poster, ..._rest
	} = normalizeActivityPub(properties());

	const APo: ActivityPubObjectNormalized = _rest;

	const tracks = (children() as any || []).filter((c: any) => c.tag === 'track');
	icache.set('hasTracks', !!tracks.length, false);
	icache.getOrSet('l', theme.line(), false);
	icache.getOrSet('id', widgetId, false);
	icache.getOrSet('buffer', 0, false);
	icache.getOrSet('currentTime', 0, false);
	icache.getOrSet('fresh', true, false);
	icache.getOrSet('muted', muted, false);
	icache.getOrSet('volume', Math.min(Math.max(0, volume), 1), false);
	icache.getOrSet('speed', Math.min(Math.max(0.2, speed), 2), false);
	icache.getOrSet('speedControl', false, false);
	icache.getOrSet('paused', !autoPlay);
	if (!icache.get('paused') && icache.get('fresh')) { icache.set('fresh', false) }
	const audio = (node.get('audio') as HTMLAudioElement);

	const dim = resize.get('media');
	const smallViewport = dim && dim.width < 300;
	let mml = 0;
	if (icache.get('l')) {
		const lh = ((dim && dim.height)||0) / icache.get('l');
		mml = (Math.max(0, Math.ceil(lh)) - lh);
	}

  const togglePlay = (e?: Event) => {
		e && e.preventDefault();
		e && e.stopPropagation();
		icache.set('paused', !icache.get('paused'));
		!!audio && audio[!icache.get('paused') ? 'play' : 'pause']();
		if (!icache.get('paused') && onPlay) {
			onPlay(icache.get('currentTime')||0)
		} else if (onPause) {
			onPause(icache.get('currentTime')||0)
		}
  }
  const toggleMute = () => {
    audio.muted = icache.set('muted', !icache.get('muted'));
  }

	const handleDownload = () => {
		/*
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

	const handleLoadedData = () => {
		const { autoPlay, currentTime, muted = false, volume = 1, speed = 1 } = properties();
		icache.set('duration', audio.duration, false);
		if (currentTime) {
			audio.currentTime = currentTime;
		}
		audio.muted = icache.get('muted')||muted;
		audio.volume = icache.get('volume')||volume;
		audio.playbackRate = icache.get('speed')||speed;
		autoPlay && togglePlay();
	}

	const handleProgress = () => {
    const lastTimeRange = audio.buffered.length - 1;
    if (lastTimeRange > -1) {
			icache.set('buffer', Math.ceil(audio.buffered.end(lastTimeRange) / audio.duration * 100));
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
	const seekBy = (time: number) => {
    const currentTime = audio.currentTime + time;
    if (!isNaN(currentTime)) {
			icache.set('currentTime', currentTime);
			audio.currentTime = currentTime;
    }
  }

	/* TODO timeupdate event:
	Should we debounce ???
	Firefox fires the timeupdate event once per frame.
	Safari/Chrome fire every 250ms. Opera every 200ms.
	*/
	const setTime = (v: number) => {
		if (typeof v === 'number') { audio.currentTime = v; }
		icache.set('currentTime', audio.currentTime);
	}

	/*
		classNames('audio-player', { editable })
	*/
	const vol = icache.get('volume')||0;
	const playerProps: any = {
		id: icache.get('id'),
		alt: !!APo.summary && !!APo.summary.length ? APo.summary[0]||'' : '',
		classes: [themedCss.audio, icache.get('hasTracks') ? themedCss.video : null],
		preload: autoPlay ? 'auto' : 'none',
		onplay: onPlay && onPlay(icache.get('currentTime')||0),
		onpause: onPause && onPause(icache.get('currentTime')||0),
		onprogress: handleProgress,
		onloadeddata: handleLoadedData,
		ontimeupdate: setTime,
		crossOrigin: 'anonymous'
	};
	if (icache.get('hasTracks') && audio) {
		audio.textTracks.onaddtrack = (e: TrackEvent) => {
			/*
			A media element cannot have more than one track with the same kind, srclang, and label.
			VTT CSS Extensions https://w3c.github.io/webvtt/#css-extensions
			kind: "subtitles"
			label: "English"
			language: "en"
			mode: "showing"
			*/
			console.log('onaddtrack .track', e.track);
		}
		audio.onloadedmetadata = (e: Event) => {
			console.log('onloadedmetadata', e);

		}
	}
	const sources = !!APo.url && !!APo.url.length && APo.url.map((_src) => {
		if (typeof _src === 'object' && !!_src.href && !!_src.mediaType) {
			return <source src={_src.href} type={_src.mediaType} />
		} else if (typeof _src === 'object' && !!_src.href) {
			return <source src={_src.href} />
		} else if (typeof _src === 'string') {
			return <source src={_src} />
		}
	});
	const posterSrc = poster || !!APo.image && !!APo.image[0] && APo.image[0].href;
;
	return <div
		key="root"
		classes={[
			theme.variant(),
			themedCss.root,
			theme.shaped(themedCss),
			theme.sized(ui),
			theme.colored(colors),
			theme.elevated(ui),
			theme.animated(themedCss),
			icache.get('paused') && themedCss.paused,
			smallViewport && themedCss.smallViewport
		]}
		onMouseEnter={onMouseEnter && onMouseEnter(icache.get('currentTime')||0)}
		onMouseLeave={onMouseLeave && onMouseLeave(icache.get('currentTime')||0)}
		onKeyDown={handleKeyDown}
		aria-label="Audio Player"
		role="region"
	>
		<div
			key="media"
			classes={[
				themedCss.media,
				/* TODO isJS */
				/* theme.isJS() && */
				icache.get('fresh') && themedCss.mediaFresh
			]}
			style={`--mml: ${mml};`}
		>
			<noscript>
				<video controls={true} {...playerProps}>{sources}{children()}</video>
			</noscript>
			{!!posterSrc && <img src={posterSrc} classes={themedCss.poster} />}
			{!icache.get('hasTracks') ?
				<audio key="audio" {...playerProps}>{sources}{children()}</audio> :
				<video key="audio" {...playerProps}>{sources}{children()}</video>
			}
			{icache.get('paused') && APo.name && <Paged property="name">
				{ APo.name.map((_name, i) => <h5 key={`name${i}`} classes={themedCss.name}>{_name}</h5>) }
			</Paged>}
			<button
				type="button"
				title={icache.get('paused') ? messages.play : messages.pause}
				aria-controls={icache.get('id')}
				aria-label={icache.get('paused') ? messages.play : messages.pause}
				classes={themedCss.playPause} onclick={togglePlay}
			/>
		</div>
		<div classes={themedCss.controls}>
			<Slider
				key="progress"
				max={audio ? audio.duration : 100}
				value={icache.get('currentTime')||0}
				buffer={icache.get('buffer')||0}
				size="s"
				onValue={setTime}
				classes={{
					'@dojo/widgets/progress': { root: [themedCss.progress] }
				}}
			/>
			<div classes={themedCss.row}>
				<p classes={themedCss.caption}>
					<span classes={themedCss.time}>
						{formatTime(Math.floor(icache.get('currentTime')||0))}{smallViewport ? '' : ' '}
					</span>
					<span classes={themedCss.duration}>
						/{smallViewport ? '' : ' '}{formatTime(Math.floor(icache.get('duration')||0))}
					</span>
				</p>
				<button
					tabIndex={0}
					type="button"
					title={messages.speed}
					aria-label={messages.speed}
					classes={[themedCss.speedControl, icache.get('muted') && themedCss.muted]}
					onclick={() => icache.set('speedControl', !icache.get('speedControl'))}
				>
					{icache.get('speed')}x
				</button>
				<div classes={themedCss.volume}>
					<Slider
						key="volumeOrSpeed"
						max={icache.get('speedControl') ? 2 : 1}
						step={0.1}
						markType={icache.get('speedControl') ? 'dot' : void 0}
						marks={icache.get('speedControl') ? {1:'|'} : void 0}
						color={(icache.get('muted') || vol < 0.05) ? 'warning' : 'grey'}
						value={
							icache.get('speedControl') ?
								icache.get('speed') :
								(icache.get('muted') ? 0 : vol)
						}
						onValue={(v) => {
							if (icache.get('speedControl')) {
								audio.playbackRate = icache.set('speed', Math.max(0.2,v))||1;
							} else {
								if (vol >= 0.05) {
									icache.set('muted', false, false);
								}
								audio.volume = icache.set('volume', v);
							}
						}}
						size="s"
					/>
					{!icache.get('speedControl') &&
						<button
							tabIndex={0}
							type="button"
							title={icache.get('muted') ? messages.unmute : messages.mute}
							aria-label={icache.get('muted') ? messages.unmute : messages.mute}
							classes={[themedCss.mute, icache.get('muted') && themedCss.muted]}
							onclick={toggleMute}
						>
							<Icon type={
								(icache.get('muted') || vol < 0.05) ? 'volumeMute' :
								(vol > 0.75 ? 'volumeHigh' : (vol > 0.3 ? 'volumeMedium' : 'volumeLow'))
							} />
						</button>
					}
				</div>
			</div>
		</div>
		<AttributedTo {...APo} />
	</div>

});

export default Audio;
/*
<div classes={themedCss.row}>
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
*/
