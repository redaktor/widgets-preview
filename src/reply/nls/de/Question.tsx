export default {
	question: 'Frage',
	poll: 'Abstimmung',
	answer: 'Antwort',
	questionShort: 'F',
	wasAsked: 'gefragt',
	wasActive: 'aktiv',
	answered: 'antwortete',
	doVote: 'abstimmen',
	doAnswer: 'antworten',
	answers: `{count, plural, offset:0
		=1 {Antwort}
		other {Antworten}}`,
	comments: `{count, plural, offset:0
		=1 {Kommentar}
		other {Kommentare}}`,
	readAnswers: `{count, plural, offset:0
		=0 {Noch keine Antworten}
		=1 {Noch keine weiteren Antworten}
		=2 {Antwort lesen}
		other {Antworten lesen}}`,
	moreInfo: 'Weiterführende Informationen',
	duplicate: 'Duplikat von',
	tentativeaccept: 'Akzeptabel',
	accepted: 'Akzeptierte Antwort',
	close: `{tense, select,
	  past {Die Frage wurde {date} geschlossen.}
		other {Die Frage schließt {date}!}
	}`
};
