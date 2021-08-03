import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Icon from '@redaktor/widgets/icon';
import * as iconCss from '@redaktor/widgets/theme/material/icon.m.css';

const factory = create();
const icons: {name: string; icons: (string & keyof typeof iconCss)[][]}[] = [
	{name: 'Actor', icons: [['application'], ['group'], ['organization'], ['person'], ['service']]},
	{name: 'Activity', icons: [
		['announce','share'], ['announced'], ['shared'], ['add'], ['remove'], ['accept'], ['arrive'],
		['block'], ['close'],  ['create'], ['_delete'], ['flag'], ['follow'], ['unfollow'],
		['like'], ['likeAlt'], ['dislike'], ['dislikeAlt'], ['ignore'], ['invite'], ['join'], ['leave'],
		['move'], ['offer'], ['question'], ['update'], ['listen'], ['view'], ['read'],
		['reject'], ['travel'], ['tentativeAccept'], ['tentativeReject']
	]},
	{name: 'Object', icons: [
		['article'], ['audio'], ['image'], ['video'],
		['collection'], ['collectionpage'], ['orderedcollection'], ['orderedcollectionpage'],
		['event'], ['note'], ['page'], ['place'], ['profile'], ['relationship'], ['tombstone']
	]},
	{name: 'Link', icons: [ ['link'], ['linkExt'], ['mention'] ]},
	{name: 'UI', icons: [
		['redaktor'], ['more'], ['globe'], ['group'], ['closed'], ['bookmark'], ['topic'],
		['chat'], ['code'], ['codeInline'], ['followFollower'], ['followAtoB'],
		['followFollowing'], ['followBtoA'], ['followMutual'], ['poll'], ['inReplyTo'],
		['comment'], ['reply'], ['announceSystem'], ['shareSystem'], ['login'], ['logout'],
	  ['trending'], ['order'], ['stack'], ['bullhorn'], ['bell'], ['bellMuted'],
	  ['bellStrong'], ['calendar'], ['pin'], ['display'], ['desktop'], ['mobile'], ['tablet'],
	  ['undo'], ['redo'], ['refresh'], ['enlarge'], ['shrink'], ['download'], ['upload'],
	  ['clock'], ['timezone'], ['history'], ['timing'], ['down'], ['up'], ['left'], ['right'],
	  ['caretDown'], ['caretUp'], ['closeIcon'], ['cancel'], ['plus'], ['minus'], ['check'],
	  ['search'], ['bars'], ['settings'], ['admin'], ['alert'], ['help'], ['info'],
	  ['checkboxChecked'], ['checkedBox'], ['phone'], ['edit'], ['edited'], ['date'],
	  ['linkIcon'], ['mapMarker'], ['location'], ['lock'], ['secure'], ['mail'], ['eye'],
	  ['eyeSlash'], ['eyedropper'], ['star'], ['moreIcon'], ['trash'], ['bin'], ['lab'],
	  ['keyboard'], ['activity']
	]},
	{name: 'UI media', icons: [
		['zoomIn'], ['zoomOut'], ['play'], ['pause'], ['mic'], ['volumeMute'], ['volumeLow'],
		['volumeMedium'], ['volumeHigh']
	]},
	{name: 'UI map', icons: [
		['map'], ['mapAeroNautical'], ['mapBike'], ['mapHike'], ['mapHobby'], ['mapHumanitarian'],
		['mapPublicTransport'], ['mapSat'], ['mapStreet'], ['mapTopo'], ['mapOSM']
	]},
	{name: 'UI editor', icons: [
		['pLeft'], ['pCenter'], ['pJustify'], ['pRight'], ['indentDecrease'], ['indentIncrease'],
		['grid'], ['flex'], ['ol'], ['ul'], ['headline'], ['bold'], ['italic'], ['quote'], ['quoteAll'],
	  ['filter'], ['sortAmountDesc'], ['sortAmountAsc'], ['sortAlphaAsc'], ['sortAlphaDesc'],
		['sortNumericAsc'], ['sortNumericDesc']
	]}
];

export default factory(function Basic() {
	const iconExample = (v: (string & keyof typeof iconCss)[]) => {
		const [title, ...aliases] = v;
		const alias = aliases.join(',');
		return (<virtual>
			<p>{title} {alias && `(${alias})`}</p>
			<Icon spaced="right" type={title} size="xs" />{' '}
			<Icon spaced="right" type={title} size="s" />{' '}
			<Icon spaced="right" type={title} size="m" />{' '}
			<Icon spaced="right" type={title} size="l" />{' '}
			<Icon spaced="right" type={title} size="xl" />{' '}
			<Icon type={title} size="xxl" />
			<br /><br />
		</virtual>)
	};

	return (<Example spaced={true}>
		<h1>Icon</h1>
		<p>redaktorLogo</p>
		<Icon type="redaktorLogo" size="xl" />
		<br /><br /><br />
		{icons.map((o) => (<virtual>
			<h5>{o.name}</h5>
			{o.icons.map(iconExample)}
		</virtual>))}
		<p>Playground</p>
		<p>Lorem Ipsum</p>
	</Example>);
});
