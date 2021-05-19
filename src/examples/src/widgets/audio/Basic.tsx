import { create, tsx } from '@dojo/framework/core/vdom';
import { ActivityPubLink } from '../../../../common/interfaces';
import Example from '../../Example';
import Audio, { AudioProperties } from '@dojo/widgets/audio';
import Image, { ImageProperties } from '@dojo/widgets/image';

import * as tableCSS from '../../../../theme/material/table.m.css';
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

const ogg: ActivityPubLink = {type: 'Link', href: 'http://localhost:9999/assets/nihWikimedia.ogg', mediaType: 'audio/ogg'};
const mp3: ActivityPubLink = {type: 'Link', href: 'http://localhost:9999/assets/nihWikimedia.mp3', mediaType: 'audio/mp3'};
const _1_1: ActivityPubLink = {type: "Link", href: "card-photo-1-1.3vTxmshj.jpg", width: 2717, height: 2717, mediaType: "image/jpg", blurhash: 'UPF5Q:~W0z9uDND%EfNHyEtRs9xaE1WCxtV@'};
const _1_4: ActivityPubLink = {type: "Link", href: "card-photo-1-4.9vfpAQ1n.jpg", width: 13228, height: 3307, mediaType: "image/jpg", blurhash: 'MlIhplt7t7WB%M~qj[t7WBt7-;ofayWBWB'};
const _2_3: ActivityPubLink = {type: "Link", href: "card-photo-2-3.3G_muD46.jpg", width: 1417, height: 945, mediaType: "image/jpg", blurhash: 'UgF~XEDiMxxu_4D$oIozbcM{ozM{M{t7t7RP'};

const exampleData: AudioProperties | ImageProperties = {
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
  summary: ["10 Easy Ways To Make Tin Foil #Hats Stronger. Proof That #Cats Are Exactly What You Are Looking For","summary2"],
  content: [`Jetzt herrscht **Goldgräberstimmung** an der New Yorker *Technologiebörse* NASDAQ. Dort will ~~Zonk~~ Coinbase am Mittwoch mit einem sogenannten Direct Listing aufs #Parkett. \nParsed handle @sl@sl.de – handle @sl@sl.de – link-handle @https://localhost:9999 – link https://localhost:9999 \n Jetzt herrscht **Goldgräberstimmung** an der New Yorker *Technologiebörse* NASDAQ. Dort will ~~Zonk~~ Coinbase am Mittwoch mit einem sogenannten Direct Listing aufs Parkett. Dies sind Sätze mit Zeichen bis zu 500 LOREM IPSUM dolor sit amet, consectetur adipiscing elit.

  ---

  Lorem Ipsum

  - a list
  - with another item

  Mauris convallis, neque non iaculis volutpat, ipsum mi dapibus odio, sed efficitur ipsum lacus eu ipsum. Nunc quam elit, rutrum sit amet enim eget, tincidunt tristique leo. Nulla lorem nulla, luctus et mauris ac, feugiat convallis orci. Cras placerat urna orci, eu efficitur augue congue vel. Mauris nec semper dolor, quis vestibulum urna. Etiam et tortor vitae erat bibendum tristique non at metus. Curabitur dapibus pharetra eros, et rutrum libero tempus id. Suspendisse at nibh turpis. Integer id blandit velit. Nulla et mollis felis. Suspendisse potenti.`,
  `2 Jetzt herrscht Goldgräberstimmung an der New Yorker Technologiebörse NASDAQ. Dort will Coinbase am Mittwoch mit einem sogenannten Direct Listing aufs Börsenparkett. Gemessen am Referenzpreis der Aktien ist Coinbase rund 68 Milliarden Dollar wert. Analysten trauen Coinbase sogar eine Bewertung von 100 Milliarden Dollar zu – ein aberwitziger Preis für ein Unternehmen mit 56 Millionen Kunden und gut 1700 Mitarbeitern. Die schwindelerregende Bewertung erklären Analysten mit dem Hype um Kryptowährung LOREM IPSUM dolor sit amet, consectetur adipiscing elit. Mauris convallis, neque non iaculis volutpat, ipsum mi dapibus odio, sed efficitur ipsum lacus eu ipsum. Nunc quam elit, rutrum sit amet enim eget, tincidunt tristique leo. Nulla lorem nulla, luctus et mauris ac, feugiat convallis orci. Cras placerat urna orci, eu efficitur augue congue vel. Mauris nec semper dolor, quis vestibulum urna. Etiam et tortor vitae erat bibendum tristique non at metus. Curabitur dapibus pharetra eros, et rutrum libero tempus id. Suspendisse at nibh turpis. Integer id blandit velit. Nulla et mollis felis. Suspendisse potenti.`],
  image: [ _2_3, _1_1, _2_3, _1_4, _1_1, _1_4, _2_3, _2_3, _1_1, _2_3, _1_1, _2_3, _1_4, _1_1, _2_3, _2_3, _2_3, _1_1, _2_3, _1_4, _1_1, _1_4, _2_3, _2_3, _1_1, _2_3, _1_1, _2_3, _1_4, _1_1, _2_3, _2_3, _1_1 ],
  privacy: "public",
  published: "23m ago",
  bookmark: false,
  kicker: 'yo kicker',
  topic: {color: [ 223, 220, 0 ], name: "Journalism"},
  sensitive: true,
  duration: 'PT167S'
}
/* <--
1:1 2717 UPF5Q:~W0z9uDND%EfNHyEtRs9xaE1WCxtV@
1:4 13228x3307 MlIhplt7t7WB%M~qj[t7WBt7-;ofayWBWB

*/
const exampleImage: ImageProperties = {
  ...(exampleData as ImageProperties),
  type: 'Image',
  name: (exampleData as any).name[0],
  width: 1417,
  height: 945,
  blurhash: 'UgF~XEDiMxxu_4D$oIozbcM{ozM{M{t7t7RP',
  url: [ _2_3 ]
};
const exampleAudio: AudioProperties = {
  ...(exampleData as AudioProperties),
  url: [ ogg, mp3 ],
  attachment: [ exampleImage ]
};

const factory = create();

const vttEn = 'http://localhost:9999/assets/nihWikimedia_en.vtt';
const vttDe = 'http://localhost:9999/assets/nihWikimedia_de.vtt';
const vttEs = 'http://localhost:9999/assets/nihWikimedia_es.vtt';
const vttChapters = 'http://localhost:9999/assets/nihWikimedia_CHA_en.vtt';
const vtt = 'http://localhost:9999/assets/nihWikimedia_SUB_en.vtt';

export default factory(function Basic() {
  const audio = (view: 'column' | 'row' | 'tableRow' = 'column') => <Audio {...exampleAudio} view={view}>
    <track label="English captions" src={vttEn} kind="captions" srclang="en" />
    <track label="Deutsche Übersetzung" src={vttDe} kind="captions" srclang="de" default />
    <track label="Traducción Española" src={vttEs} kind="captions" srclang="es" />
    <track label="English subtitles" src={vtt} kind="subtitles" srclang="es" />
    <track label="Chapters" src={vttChapters} kind="chapters" srclang="en" />
  </Audio>;

/* tableRow is meant to be 100vw */
	return (
		<Example spaced={true}>
      <virtual>
  			<div styles={{ width: '66.666%' }}>{audio()}</div>
        <br /><br />
        <div styles={{ width: '100%' }}>{audio('row')}</div>
        <br /><br />
        <table
          classes={[tableCSS.table, tableCSS.bordered]}
          styles={{ position: 'absolute', left: '0px', zIndex: '9999' }}
        >
          {audio('tableRow')}
          {audio('tableRow')}
          {audio('tableRow')}
        </table>
        <br /><br /><br /><br /><br /><br />
        <p>Lorem</p>
        <div styles={{ width: '66.666%' }}>
          <Image {...exampleImage} />
        </div>
      </virtual>
		</Example>
	);
});
