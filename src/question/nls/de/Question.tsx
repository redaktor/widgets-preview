export default {
	questionShort: 'F',
	answerShort: 'A',
	question: 'Frage',
	poll: 'Abstimmung',
	answer: 'Antwort',
	comment: 'Kommentar',
	ofQuestioner: 'der fragestellenden Person',
	ofAccepted: 'der akzeptierten Person',
	wasAsked: 'gefragt',
	wasActive: 'aktiv',
	answered: 'antwortete',
	doVote: 'abstimmen',
	doAnswer: 'antworten',
	readAnswers: `{hasAccepted, select,
		yes {
			{count, plural, offset:0
				=0 {Keine weiteren Antworten}
				=1 {weitere Antwort lesen}
				other {weitere Antworten lesen}}}
		other {
			{count, plural, offset:0
				=0 {Noch keine Antworten}
				=1 {Antwort lesen}
				other {Antworten lesen}}}
	}`,
	moreInfo: 'Weiterführende Informationen',
	duplicate: 'Duplikat von',
	tentativeaccept: 'Akzeptabel',
	accepted: 'Akzeptierte Antwort',
	close: `{tense, select,
	  past {Die Frage wurde {date} geschlossen.}
		other {Die Frage schließt {date}!}
	}`
};
