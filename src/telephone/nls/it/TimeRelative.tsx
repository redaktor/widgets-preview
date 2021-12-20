const PL = 'n, plural, offset:0 ';
export default {
	now: 'poco fa',
	minute: `{type, select,
	ago {{${PL}
		=0 {poco fa}
		=1 {un minuto fa}
		other {# minuti fa}}}
	agoShort {{${PL}
		=0 {poco fa}
		other {# minuti fa}}}
	aheadShort {{${PL}
		=0 {fra poco}
		other {fra # minuti}}}
	other {{${PL}
		=0 {poco fa fra poco}
		=1 {fra un minuto}
		other {fra # minuti}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {un'ora fa}
		other {# ore fa}}}
	agoShort {{${PL}
		other {# ore fa}}}
	aheadShort {{${PL}
		other {fra # ore}}}
	other {{${PL}
		=1 {fra un'ora}
		other {fra # ore}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {un giorno fa}
		other {# giorni fa}}}
	agoShort {{${PL}
		other {# giorni fa}}}
	aheadShort {{${PL}
		other {fra # giorni}}}
	other {{${PL}
		=1 {fra un giorno}
		other {fra # giorni}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {una settimana fa}
		other {# settimane fa}}}
	agoShort {{${PL}
		other {# settimane fa}}}
	aheadShort {{${PL}
		other {fra # settimane}}}
	other {{${PL}
		=1 {fra una settimana}
		other {fra # settimane}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {un mese fa}
		other {# mesi fa}}}
	agoShort {{${PL}
		other {# mesi fa}}}
	aheadShort {{${PL}
		other {fra # mesi}}}
	other {{${PL}
		=1 {fra un mese}
		other {fra # mesi}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {un anno fa}
		other {# anni fa}}}
	agoShort {{${PL}
		other {# anni fa}}}
	aheadShort {{${PL}
		other {fra # anni}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {fra # anni}}}}`
};
