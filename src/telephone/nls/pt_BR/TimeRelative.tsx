const PL = 'n, plural, offset:0 ';
export default {
	now: 'agora mesmo',
	minute: `{type, select,
	ago {{${PL}
		=0 {agora mesmo}
		=1 {há um minuto}
		other {há # minutos}}}
	agoShort {{${PL}
		=0 {agora mesmo}
		other {há # minutos}}}
	aheadShort {{${PL}
		=0 {agora}
		other {em # minutos}}}
	other {{${PL}
		=0 {agora mesmo agora}
		=1 {em um minuto}
		other {em # minutos}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {há uma hora}
		other {há # horas}}}
	agoShort {{${PL}
		other {há # horas}}}
	aheadShort {{${PL}
		other {em # horas}}}
	other {{${PL}
		=1 {em uma hora}
		other {em # horas}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {há um dia}
		other {há # dias}}}
	agoShort {{${PL}
		other {há # dias}}}
	aheadShort {{${PL}
		other {em # dias}}}
	other {{${PL}
		=1 {em um dia}
		other {em # dias}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {há uma semana}
		other {há # semanas}}}
	agoShort {{${PL}
		other {há # semanas}}}
	aheadShort {{${PL}
		other {em # semanas}}}
	other {{${PL}
		=1 {em uma semana}
		other {em # semanas}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {há um mês}
		other {há # meses}}}
	agoShort {{${PL}
		other {há # meses}}}
	aheadShort {{${PL}
		other {em # meses}}}
	other {{${PL}
		=1 {em um mês}
		other {em # meses}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {há um ano}
		other {há # anos}}}
	agoShort {{${PL}
		other {há # anos}}}
	aheadShort {{${PL}
		other {em # anos}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {em # anos}}}}`
};
