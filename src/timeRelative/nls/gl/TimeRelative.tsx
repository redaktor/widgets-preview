const PL = 'n, plural, offset:0 ';
export default {
	now: 'xusto agora',
	minute: `{type, select,
	ago {{${PL}
		=0 {xusto agora}
		=1 {hai 1 minuto}
		other {hai # minutos}}}
	agoShort {{${PL}
		=0 {xusto agora}
		other {hai # minutos}}}
	aheadShort {{${PL}
		=0 {daquí a un pouco}
		other {en # minutos}}}
	other {{${PL}
		=0 {xusto agora daquí a un pouco}
		=1 {nun minuto}
		other {en # minutos}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {hai 1 hora}
		other {hai # horas}}}
	agoShort {{${PL}
		other {hai # horas}}}
	aheadShort {{${PL}
		other {en # horas}}}
	other {{${PL}
		=1 {nunha hora}
		other {en # horas}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {hai 1 día}
		other {hai # días}}}
	agoShort {{${PL}
		other {hai # días}}}
	aheadShort {{${PL}
		other {en # días}}}
	other {{${PL}
		=1 {nun día}
		other {en # días}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {hai 1 semana}
		other {hai # semanas}}}
	agoShort {{${PL}
		other {hai # semanas}}}
	aheadShort {{${PL}
		other {en # semanas}}}
	other {{${PL}
		=1 {nunha semana}
		other {en # semanas}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {hai 1 mes}
		other {hai # meses}}}
	agoShort {{${PL}
		other {hai # meses}}}
	aheadShort {{${PL}
		other {en # meses}}}
	other {{${PL}
		=1 {nun mes}
		other {en # meses}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {hai 1 ano}
		other {hai # anos}}}
	agoShort {{${PL}
		other {hai # anos}}}
	aheadShort {{${PL}
		other {en # anos}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {en # anos}}}}`
};
