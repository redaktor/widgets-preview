import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Audio, { AudioProperties } from '@dojo/widgets/audio';
/*
kind
How the text track is meant to be used. If omitted the default kind is subtitles.

subtitles
Subtitles provide translation of content that cannot be understood by the viewer.
For example speech or text that is not English in an English language film.
Subtitles may contain additional content, usually extra background information.

captions
Closed captions provide a transcription and possibly a translation of audio.
It may include important non-verbal information such as music cues or sound effects.
It may indicate the cue's source (e.g. music, text, character).
Suitable for users who are deaf or when the sound is muted.

descriptions
Textual description of the video content.
Suitable for users who are blind or where the video cannot be seen.

chapters
Chapter titles are intended to be used when the user is navigating the media resource.

metadata
Tracks used by scripts. Not visible to the user.
---
label
A user-readable title of the text track which is used by the browser when listing available text tracks.

src
Address of the track (.vtt file)
srclang

import Map from '@dojo/widgets/map';

	<div
		styles={{
			width: '100%',
			height: '100%',
			position: 'absolute',
			top: '0px',
			left: '0px',
			zIndex: '10000'
		}}
	>
		<Map mapId="75a3ce8990674a5ebd5b9ab66bdab893" center={[51.568255, 6.743474]} />
	</div>


  , {
    "@context": "https://www.w3.org/ns/activitystreams",
    id: "https://ben.example.com/",
    handle: "@ben@example.com",
    name: "Ben",
    summary: "B Proof That Bitdiddle Industries Are Exactly What You Are Looking For",
    type: "Person"
  }
*/
const exampleData: AudioProperties = {
  "@context": "https://www.w3.org/ns/activitystreams",
  type: "Audio",
  id: "#0",
  attributedTo: [{
    "@context": "https://www.w3.org/ns/activitystreams",
    id: "https://alyssa.example.com/",
    handle: "@alyssa@example.com",
    name: "Alyssa",
    summary: "Proof That Bitdiddle Industries Are Exactly What You Are Looking For",
    type: "Person"
  }],
  name: ["The Government's Secret Campaign Against Cats","Special Episode","Super"],
  summary: "Article 10 Easy Ways To Make Tin Foil Hats Stronger. Proof That Cats Are Exactly What You Are Looking For",
  image: {type: "Link", href: "card-photo-2-3.3G_muD46.jpg"},
  privacy: "public",
  published: "23m ago",
  bookmark: false,
  kicker: 'yo kicker',
  topic: {color: [ 223, 220, 0 ], name: "Journalism"},
}

const factory = create();
const ogg = 'https://upload.wikimedia.org/wikipedia/commons/8/86/20090724NIHWiki.ogg';
const mp3 = 'http://localhost:9999/sample.mp3';
const vtt = 'http://localhost:9999/sample.vtt';
export default factory(function Basic() {
	return (
		<Example spaced={true}>
			<div styles={{ width: '299px' }}>
				<Audio {...exampleData} url={[ogg,mp3]}>
          <track label="English" src={vtt} kind="subtitles" srclang="en" default />
          <track label="English captions" src={vtt} kind="captions" srclang="en" />
          <track label="Deutsche captions" src={vtt} kind="captions" srclang="de" />
          <track label="Spanish captions" src={vtt} kind="captions" srclang="es" />
          <track label="English chapters" src={vtt} kind="chapters" srclang="en" />
          <track label="Deutsche Beschreibung" src={vtt} kind="descriptions" srclang="de" />
        </Audio>
			</div>
		</Example>
	);
});
