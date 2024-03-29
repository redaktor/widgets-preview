import { RenderResult } from '@dojo/framework/core/interfaces';
import { tsx, create, node } from '@dojo/framework/core/vdom';
import id from '@redaktor/widgets/middleware/id';
import focus from '@dojo/framework/core/middleware/focus';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { clampStrings } from '../common/activityPubUtil';
import { AsObject } from '../common/interfaces';
import theme from '../middleware/theme';
import breakpoints from '../middleware/breakpoint';
import i18nActivityPub from '../middleware/i18nActivityPub';
import { Row, Cell } from '../table';
import { parseDuration, formatTime } from '../duration';
import Paginated from '../paginated';
import Collapsed from '../collapsed';
import Srcset from '../srcset';
import Name from '../name';
import AttributedTo from '../attributedTo';
import AudioAvatar from '../audioAvatar';
import DynamicSelect from '../selectDynamic';
import Details from '../details';
import Chip from '../chip';
import Button from '../button';
import Slider from '../slider';
import Icon from '../icon';
import Img from '../image/image';
import Images from '../images';
import Attachment from '../attachment';
import Locales from '../locales';
import bundle from './nls/Audio';
import * as ui from '../theme/material/_ui.m.css';
import * as viewCss from '../theme/material/_view.m.css';
import * as css from '../theme/material/audio.m.css';
/* TODO exists in this module: */
import MD from '../MD/';

// import Table from '../table';

/* TODO
columnName, rowName, media

- VTT flag for Meta
- attachment with tableRow -> tableRow w. preview or row

state store:
store the last used
- volume
- visibility of captions, subtitles, descriptions


canPlay + error message / disabled states
---
slider:
aria-valuetext="seek audio bar"
aria-valuemax="100"
aria-valuemin="0"
aria-valuenow={Math.round(percentage)}
*/

export interface AudioProperties extends AsObject {
	view?: 'responsive' | 'column' | 'row' | 'tableRow';

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

export interface TextTrack {
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
	l: number;
	id: string;
	width: number;
	currentLocale: {locale: string, rtl?: boolean};
	currentTime: number;
	buffer: number;
	duration: number;
	sampleRate: number;
	numberOfChannels: number;
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
// browsers compatibility
if (!(window as any).AudioContext) {
	(window as any).AudioContext = (window as any).webkitAudioContext ||
		(window as any).mozAudioContext || (window as any).msAudioContext
}

const icache = createICacheMiddleware<AudioIcache>();
const factory = create({ icache, node, focus, theme, breakpoints, id, i18nActivityPub })
	.properties<AudioProperties>()
	.children<AudioChildren | RenderResult | undefined>();

export const Audio = factory(function Audio({
	middleware: { icache, node, focus, theme, breakpoints, id, i18nActivityPub /*, resource */ },
	properties,
	children
}) {
	const { get, set, getOrSet } = icache;
	const { localize, normalized, setLocale } = i18nActivityPub;

	const {
		alt, editable, onLoad, onPlay, onPause, onMouseEnter, onMouseLeave, widgetId, locale: currentLocale,
		baselined = true, hasPoster = true, hasControls = true, hasContent = true, hasAttachment = true,
		autoPlay = false, muted = false, view = 'column',
		crossorigin = 'anonymous', volume = 1, speed = 1, ...APo
	} = normalized();
	if (APo.type.indexOf('Audio') < 0 && (!APo.mediaType || APo.mediaType.toLowerCase().indexOf('audio') !== 0)) {
		return ''
	}
	const themedCss = theme.classes(css);
	const { messages } = localize(bundle);
	const [locale, locales] = [i18nActivityPub.get(), i18nActivityPub.getLocales()];
	getOrSet('currentLocale', currentLocale ? {locale: currentLocale} : locale);
	getOrSet('duration', parseDuration(APo.duration||''), false);
	getOrSet('sampleRate', 44100);
	const [duration, sampleRate, numberOfChannels] = [get('duration'), get('sampleRate'), get('numberOfChannels')];
	if (view === 'tableRow') {
		return <Row>
			<Cell align="center" onClick={(i) => {!i && console.log('icon click',i)}}>
	      <Icon type="audio" />
	    </Cell>
			<Cell>{APo.name && APo.name.map((n) => <span>{n}</span>)}</Cell>
			<Cell>{APo.summary && APo.summary.map((s) => <span>{s}</span>)}</Cell>
			<Cell>
				<Icon type="listen" />
				{duration && <virtual key="time"> {formatTime(duration)}</virtual>}
				{duration && sampleRate && ','}
				{sampleRate && <span classes={ui.muted} key="sampleRate"> {sampleRate}Hz</span>}
				{numberOfChannels && <span classes={ui.muted}  key="numberOfChannels"> • {numberOfChannels}Ch</span>}
			</Cell>
	  </Row>
	}


	/* TODO
	const handleDownload = () => {
		// TODO - transkripts / WebVTT
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
	}
	*/

	/* <-- */

	/*
	if (get('hasTracks') && !!audio) {
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
	}
	*/

	const audio = (node.get('audio') as HTMLAudioElement);
	const tracks = (children() as any || []).filter((c: any) => c.tag === 'track');
	set('hasTracks', !!tracks.length, false);
	getOrSet('trackMenu', '', false);
	getOrSet('buffer', 0, false);
	getOrSet('currentTime', 0, false);
	getOrSet('volume', Math.min(Math.max(0, volume), 1), false);
	getOrSet('speed', Math.min(Math.max(0.2, speed), 2), false);
	getOrSet('isSpeedMenuOpen', false, false);
	getOrSet('isTrackMenuOpen', false, false);
	getOrSet('isFresh', true, false);
	getOrSet('isMuted', muted, false);
	getOrSet('isRemaining', true, false);
	getOrSet('isPaused', !autoPlay, false);
	getOrSet('tracksVisible', {captions: '', subtitles: '', descriptions: '', chapters: '', metadata: ''});
	if (!get('isPaused') && get('isFresh')) { set('isFresh', false) }

  const togglePlay = (e?: Event) => {
		e && e.preventDefault();
		e && e.stopPropagation();
		if (!!menuOpen) { return }
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

	const handleLoadedMetadata = async () => {
		if (!audio) { return }
		const audioCtx = new AudioContext();
		const res = await fetch(audio.currentSrc, {
			headers: new Headers({'Range': 'bytes=0-640'}),
      mode: 'no-cors'
		});
		const buf = await res.arrayBuffer();
		audioCtx.decodeAudioData(buf, function(decodedBuffer) {
			getOrSet('sampleRate', decodedBuffer.sampleRate||44100);
			getOrSet('numberOfChannels', decodedBuffer.numberOfChannels||1);
	  }, function( /*error: Error*/ ) {
	    // console.log(error); // TODO
	  });

		set('duration', audio.duration, false);
		let trackMenu: RenderResult;
		if (audio.textTracks && audio.textTracks.length) {
			console.log(audio.textTracks);
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
					set('tracksVisible', {...get('tracksVisible'), [kind]: i.toString()})
				}
				textTracks[kind] && textTracks[kind].set(`${kind}-${label}-${language}`, {
					value: i.toString(), label, language, mode
				});
			}
			/* TODO sorting of languages: userLocale, Int locale, en, ...others  */
			const tracksVisible: any = get('tracksVisible');
			// const tracksVisibleCount = !tracksVisible ? 0 : Object.values(tracksVisible).join('').length;
			// console.log('tracksVisible',tracksVisible, tracksVisibleCount);
			trackMenu = textTracks && Object.keys(textTracks).map((k) => {
						return k === 'metadata' || !textTracks[k].size ? '' :
							<virtual>
								<h5>{k}</h5>
								<DynamicSelect
									singleMax={8}
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
											set('tracksVisible', {
												...get('tracksVisible'),
												[track.kind]: iStr}
											)
										}
									}}
								>
									{{
										label: (messages as any)[`${k}Track`]
									}}
								</DynamicSelect>
							</virtual>
					}
				)
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

		console.log(e.key);
		switch(e.key) {
			case 'Enter':
				e.preventDefault();
				e.stopPropagation();
				focus.isFocused('media') && togglePlay();
				break;
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
	Firefox fires the timeupdate event each frame.
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

	const viewDesktopCSS = theme.viewDesktopCSS();
	const [isColumn, isResponsive, isRow] = [(view === 'column'), (view === 'responsive'), (view === 'row')];
	let [isMini, vp, typoClass, audioAvatarSize] = [false, 'm', viewCss.typo, 'xl'];
	if (isResponsive) {
		const {breakpoint = 'm'} = isResponsive ? breakpoints.get('measure')||{} : {};
		vp = breakpoint;
		isMini = (isRow && (vp === 'micro' || vp === 'xs' || vp === 's')) || (!isRow && (vp === 'micro' || vp === 'xs'));
		typoClass = isMini ? ui.s : (vp === 'l' || vp === 'xl' ? ui.l : ui.m);
		audioAvatarSize = vp === 'micro' || vp === 'xs' || vp === 's' ? 'l' : 'xl';
	}

	const sources = !!APo.url && <Srcset url={APo.url} />;
	const menuOpen = get('isTrackMenuOpen');
	const formattedDuration = formatTime(Math.floor(get('duration')||0));

	const tracksVisible: any = get('tracksVisible');
	const tracksVisibleCount = !tracksVisible ? 0 : Object.values(tracksVisible).join('').length;

	const audioId = id.getId('audio');
	const vol = get('volume')||0;
	const playerProps: any = {
		id: audioId,
		alt: !!APo.summary && !!APo.summary.length ? APo.summary[0]||'' : '',
		classes: [
			themedCss.audio,
			typoClass,
			get('hasTracks') || get('isPicInPic') ? themedCss.video : null
		],
		preload: autoPlay ? 'auto' : 'metadata',
		onplay: () => onPlay && onPlay(get('currentTime')||0),
		onpause: () => onPause && onPause(get('currentTime')||0),
		// onended: togglePlay,
		onprogress: handleProgress,
		onloadedmetadata: handleLoadedMetadata,
		onloadeddata: handleLoadedData,
		ontimeupdate: setTime,
		// onseeked: togglePlay,
		crossorigin: crossorigin
	};

	const extraClasses = {
		audioAvatar: { '@redaktor/widgets/avatar': { root: [themedCss.audioAvatar] } },
		progress: { '@redaktor/widgets/progress': { root: [themedCss.progress] } },
		details: { '@redaktor/widgets/details': { root: [themedCss.locales] } },
		columnName: { '@redaktor/widgets/name': { root: [themedCss.columnName, viewCss.columnName] } },
		rowName: { '@redaktor/widgets/name': { root: [viewCss.rowName] } },
		summary: { '@redaktor/widgets/paginated': { root: [themedCss.summaryPaginated] } },
		collapsed: { '@redaktor/widgets/collapsed': { root: [themedCss.contentCollapsed] } },
		images: { '@redaktor/widgets/images': { root: [themedCss.images] } }
	}

 console.log('Audio render')
	return <div
		key="root"
		classes={[
			theme.variant(),
			themedCss.root,
			viewCss.item,
			!!viewDesktopCSS && viewDesktopCSS.item,
			theme.shaped(themedCss),
			theme.uiSize(),
			theme.uiColor(),
			theme.uiElevation(),
			theme.animated(themedCss),
			get('isFresh') && themedCss.fresh,
			get('isPaused') && themedCss.paused,
			themedCss[(vp as keyof typeof themedCss)],
			menuOpen && themedCss.menuOpen
		]}
		onkeydown={handleKeyDown}
		onmouseenter={onMouseEnter && onMouseEnter(get('currentTime')||0)}
		onmouseleave={onMouseLeave && onMouseLeave(get('currentTime')||0)}
		aria-label="Audio Player"
		role="region"
	>
		{isResponsive && <div classes={themedCss.measure} key="measure" />}
		<div classes={[themedCss.metaTop, viewCss.metaTop]}>
			<Details serif>
			{{
				summary: <virtual><Icon type="listen" spaced /><i>{formattedDuration}</i></virtual>,
				content: <ul>
					{get('sampleRate') && <li>
						<span classes={ui.muted} key="sampleRate">{get('sampleRate')}Hz</span>
					</li>}
					{get('numberOfChannels') && <li>
						<span classes={ui.muted} key="numberOfChannels">{get('numberOfChannels')}Ch</span>
					</li>}
				</ul>
			}}
			</Details>
		</div>
		<div classes={themedCss.vttButtonWrapper}>
			<Button
				title={messages.captions}
				design="flat"
				aria-haspopup="menu"
				onClick={() => { set('isTrackMenuOpen', !menuOpen) }}
			>
				<Icon size="xxl" type="code" />
			</Button>
		</div>
		<div
			key="media"
			tabIndex={0}
			role="button"
			title={get('isPaused') ? messages.play : messages.pause}
			aria-controls={audioId}
			aria-label={get('isPaused') ? messages.play : messages.pause}
			onclick={togglePlay}
			classes={[
				themedCss.media,
				viewCss.media,
				viewCss.item,
				viewCss.baselined,
				viewCss.m1by1,
				!!viewDesktopCSS && viewDesktopCSS.item,
				!!viewDesktopCSS && viewDesktopCSS.m1by1
			]}
		>
			{ !!menuOpen && !!get('trackMenu') &&
					<div key="tracksMenu" role="menu" aria-modal="true"
						classes={[themedCss.trackMenu, tracksVisibleCount > 1 && themedCss.multipleVTT]}
					>
						{get('trackMenu')}
					</div>
			}
			<div key="avatar" classes={themedCss.avatarWrapper}>
				{audio &&
					<AudioAvatar audioElement={audio} size={(audioAvatarSize as any)} classes={extraClasses.audioAvatar}>
						SL
					</AudioAvatar>}
			</div>
			<noscript>
				<video controls={true} {...playerProps}>{sources}{children()}</video>
			</noscript>
			{ hasPoster && !!APo.image && !!APo.image[0] &&
					<div classes={themedCss.poster}><Img {...APo.image[0]} fit="cover" /></div> }

			{!get('hasTracks') && !get('isPicInPic') ?
				<audio key="audio" {...playerProps}>{sources}{children()}</audio> :
				<video key="audio" {...playerProps}>{sources}{children()}</video>
			}
		</div>

		{hasControls && <div classes={[themedCss.controls, viewCss.controls]}>
			<Slider
				key="progress"
				max={audio ? audio.duration : 100}
				value={get('currentTime')||0}
				buffer={get('buffer')||0}
				size="s"
				classes={extraClasses.progress}
				onValue={(n) => {
					togglePlay();
					setTime(n);
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
							design="flat"
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

		{!!locales && locales.length > 1 &&
			<Locales classes={extraClasses.details} locale={get('currentLocale')||{locale:'en'}} locales={locales} onValue={(l) => {
				setLocale(l)
			}} />
		}
		{get('isPaused') && <Name name={APo.name} isRow={false} size={(vp as any)} classes={extraClasses.columnName} />}
		<div classes={themedCss.attributions}>
			<AttributedTo {...APo} max={39} />
		</div>

		{hasContent && <div classes={[themedCss.contentWrapper, viewCss.content]}>
			<Name name={APo.name} isRow={true} size={(vp as any)} classes={extraClasses.rowName} />
			{
				APo.summary && <Paginated key="summary" property="summary" classes={extraClasses.summary}>
					{clampStrings(APo.summary, 500).map((_summaries, i) => <span>
						{_summaries.map((s: any) => <MD classes={[themedCss.summary, typoClass]} key={`summary${i}`} content={s} />)}
					</span>)}
				</Paginated>
			}
			{
				APo.content && <Collapsed responsive={!isRow} lines={isRow ? (get('isFresh') ? 2 : 1) : 5} classes={extraClasses.collapsed}>
					{APo.content.map((_content, i) => <virtual>
						<MD classes={[themedCss.content, isColumn && themedCss.serif, typoClass]} key={`content${i}`} content={_content} /><hr />
					</virtual>)}
				</Collapsed>
			}
		</div>}

		{hasAttachment && <virtual>
			<Images key="images" view={view} image={APo.image} size={(vp as any)} classes={extraClasses.images} />
			<Attachment attachment={APo.attachment} isRow={isRow} />
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
