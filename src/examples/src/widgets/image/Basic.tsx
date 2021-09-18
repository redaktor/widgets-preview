import { create, tsx } from '@dojo/framework/core/vdom';
import { uuid } from '@dojo/framework/core/util';
import { ActivityPubObject, ActivityPubImage, ActivityPubLink } from '../../../../common/interfaces';
import Example from '../../Example';
import Image, { ImageProperties } from '@redaktor/widgets/image';
import Images from '@redaktor/widgets/images';
/*
import Table from '@redaktor/widgets/table';

<br /><br /><br />
<div>
<p>tableRow</p>
<Table columns={['fixed','resizable','resizable','responsive']}>
  {<Image {...exampleImage} view="tableRow" />}
  {<Image {...exampleImage} view="tableRow" />}
  {<Image {...exampleImage} view="tableRow" />}
</Table>
</div>
*/
import * as viewCSS from '@redaktor/widgets/theme/material/_view.m.css';
import * as columnsDesktop from '@redaktor/widgets/theme/material/_columnsDesktop.m.css';
const LOC: any = [
  [7.475748821884049, 51.49455016726148], [7.47267, 51.49518], [7.47756, 51.49446],
  [7.47709, 51.49633], [7.47934, 51.49374], [7.47867, 51.49518], [7.47309, 51.49373],
  [7.47554, 51.4936], [7.47455, 51.49574], [7.47562, 51.49293], [7.47408, 51.49657],
  [7.47709, 51.49723], [7.47382, 51.49291], [7.47867, 51.49418], [7.47936, 51.49764],
  [7.48056, 51.49443], [7.47399, 51.49601], [7.47682, 51.49528], [7.47760, 51.49550],
  [7.47709, 51.49733], [7.47934, 51.49384], [7.47867, 51.49618], [7.47860, 51.49610],
].map((a, i) => {
  const o = i === 2 || i === 4 ? {location: {id: uuid(), type: "Place", name: "Dortmund"}} : ({location: {id: uuid(), type: "Place", name: "Test", longitude: a[0], latitude: a[1]}});
  return i > 3 ? o : ({location: {...o.location, altitude: 200, radius: i >1 ? 800 : 400}})
});
const _1_1: ActivityPubImage = {id: uuid(), type: "Image", url: {type: "Link", href: "card-photo-1-1.D8Qv-iDb.jpg", width: 600, height: 600, mediaType: "image/jpg"}, blurhash: 'UPF5Q:~W0z9uDND%EfNHyEtRs9xaE1WCxtV@', ...LOC[1]};
const _1_4: ActivityPubImage = {id: uuid(), type: "Image", url: {type: "Link", href: "card-photo-1-4.39BgjdJb.jpg", width: 1200, height: 300, mediaType: "image/jpg"}, blurhash: 'MlIhplt7t7WB%M~qj[t7WBt7-;ofayWBWB', ...LOC[2]};
const _2_3: ActivityPubImage = {id: uuid(), type: "Image", url: {type: "Link", href: "card-photo-2-3.2sbeBGHg.jpg", width: 1417, height: 945, mediaType: "image/jpg"}, blurhash: 'UgF~XEDiMxxu_4D$oIozbcM{ozM{M{t7t7RP', ...LOC[3]};
const _3_2: ActivityPubImage = {id: uuid(), type: "Image", url: {type: "Link", href: "card-photo-3-2.1cjXm1gs.jpg", width: 400, height: 600, mediaType: "image/jpg"}, ...LOC[4]}


const exampleData: ImageProperties = {
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
  nameMap: [{en: "The Government's Secret Campaign Against Cats", de: "Das ist alles nur Blindtext Das ist alles nur Blindtext Das ist alles nur Blindtext Das ist alles nur Blindtext"},{en: "Special Episode", de: "Spezielle Episode"}, {en: "Super", de: "Super"}],
  summary: ["10 Easy Ways To Make Tin Foil #Hats Stronger. Proof That #Cats Are Exactly What You Are Looking For","summary2"],
  content: [`Jetzt herrscht **Goldgräberstimmung** an der New Yorker *Technologiebörse* NASDAQ. Dort will ~~Zonk~~ Coinbase am Mittwoch mit einem sogenannten Direct Listing aufs #Parkett. \nParsed handle @sl@sl.de – handle @sl@sl.de – link-handle @https://localhost:9999 – link https://localhost:9999 \n Jetzt herrscht **Goldgräberstimmung** an der New Yorker *Technologiebörse* NASDAQ. Dort will ~~Zonk~~ Coinbase am Mittwoch mit einem sogenannten Direct Listing aufs Parkett. Dies sind Sätze mit Zeichen bis zu 500 LOREM IPSUM dolor sit amet, consectetur adipiscing elit.

  ---

  Lorem Ipsum

  - a list
  - with another item

  Mauris convallis, neque non iaculis volutpat, ipsum mi dapibus odio, sed efficitur ipsum lacus eu ipsum. Nunc quam elit, rutrum sit amet enim eget, tincidunt tristique leo. Nulla lorem nulla, luctus et mauris ac, feugiat convallis orci. Cras placerat urna orci, eu efficitur augue congue vel. Mauris nec semper dolor, quis vestibulum urna. Etiam et tortor vitae erat bibendum tristique non at metus. Curabitur dapibus pharetra eros, et rutrum libero tempus id. Suspendisse at nibh turpis. Integer id blandit velit. Nulla et mollis felis. Suspendisse potenti.`,
  `2 Jetzt herrscht Goldgräberstimmung an der New Yorker Technologiebörse NASDAQ. Dort will Coinbase am Mittwoch mit einem sogenannten Direct Listing aufs Börsenparkett. Gemessen am Referenzpreis der Aktien ist Coinbase rund 68 Milliarden Dollar wert. Analysten trauen Coinbase sogar eine Bewertung von 100 Milliarden Dollar zu – ein aberwitziger Preis für ein Unternehmen mit 56 Millionen Kunden und gut 1700 Mitarbeitern. Die schwindelerregende Bewertung erklären Analysten mit dem Hype um Kryptowährung LOREM IPSUM dolor sit amet, consectetur adipiscing elit. Mauris convallis, neque non iaculis volutpat, ipsum mi dapibus odio, sed efficitur ipsum lacus eu ipsum. Nunc quam elit, rutrum sit amet enim eget, tincidunt tristique leo. Nulla lorem nulla, luctus et mauris ac, feugiat convallis orci. Cras placerat urna orci, eu efficitur augue congue vel. Mauris nec semper dolor, quis vestibulum urna. Etiam et tortor vitae erat bibendum tristique non at metus. Curabitur dapibus pharetra eros, et rutrum libero tempus id. Suspendisse at nibh turpis. Integer id blandit velit. Nulla et mollis felis. Suspendisse potenti.`],
  image: [ {..._1_1, name:'test'}, _2_3, _3_2, _1_4],
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
  name: (exampleData as any).nameMap[0].en,
  width: 1417,
  height: 945,
  blurhash: 'UgF~XEDiMxxu_4D$oIozbcM{ozM{M{t7t7RP',
  url: [ _2_3.url ],
  ...LOC[0]
};
exampleImage.attachment = [ _1_1 ].concat([
  'Object', 'Audio', 'Article', 'Document', 'Event', 'Page', 'Note', 'Place',
  'Video', 'Profile', 'Relationship', 'Link', 'Travel', 'Arrive', 'Collection', 'OrderedCollection',
  'CollectionPage', 'OrderedCollectionPage'
].map((type, i) => ({type, id: `attachTest${i}`, name: 'attachTest ...', summary: 'a summary', content: 'a content', ...LOC[i+5]})));

const factory = create();
export default factory(function Basic() {

/* tableRow is meant to be 100vw */
	return (
		<Example spaced={true}>
      <virtual>
        <div><h5>Image ActivityPub Object</h5><p>column</p></div>

        <div classes={[viewCSS.root, columnsDesktop.root]}>
          <ul classes={viewCSS.items}>
            <Image {...exampleImage} />
          </ul>
        </div>
        <br /><br />
        <p>row</p>
        <input type="checkbox" checked={true} classes={viewCSS.isRow} />
        <div
        classes={[viewCSS.root]}
        styles={{
          position: 'absolute',
          left: '0',
          width: '100%',
          zIndex: '9998',
          paddingLeft: 'var(--line)',
          paddingRight: 'var(--lineHalf)',
          background: 'var(--bg)'
        }}>
          <ul classes={viewCSS.items}>
            <Image {...exampleImage} view="row" />
          </ul>
        </div>

        <p>Lorem Ipsum</p>

      </virtual>
		</Example>
	);
});
