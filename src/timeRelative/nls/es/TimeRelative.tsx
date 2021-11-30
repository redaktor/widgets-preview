const PL = 'n, plural, offset:0 ';
export default {
	now: 'justo ahora',
	minute: `{type, select,
	ago {{${PL}
		=0 {justo ahora}
		=1 {hace 1 minuto}
		other {hace # minutos}}}
	agoShort {{${PL}
		=0 {justo ahora}
		other {hace # minutos}}}
	aheadShort {{${PL}
		=0 {en un rato}
		other {en # minutos}}}
	other {{${PL}
		=0 {justo ahora en un rato}
		=1 {en 1 minuto}
		other {en # minutos}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {hace 1 hora}
		other {hace # horas}}}
	agoShort {{${PL}
		other {hace # horas}}}
	aheadShort {{${PL}
		other {en # horas}}}
	other {{${PL}
		=1 {en 1 hora}
		other {en # horas}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {hace 1 día}
		other {hace # días}}}
	agoShort {{${PL}
		other {hace # días}}}
	aheadShort {{${PL}
		other {en # días}}}
	other {{${PL}
		=1 {en 1 día}
		other {en # días}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {hace 1 semana}
		other {hace # semanas}}}
	agoShort {{${PL}
		other {hace # semanas}}}
	aheadShort {{${PL}
		other {en # semanas}}}
	other {{${PL}
		=1 {en 1 semana}
		other {en # semanas}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {hace 1 mes}
		other {hace # meses}}}
	agoShort {{${PL}
		other {hace # meses}}}
	aheadShort {{${PL}
		other {en # meses}}}
	other {{${PL}
		=1 {en 1 mes}
		other {en # meses}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {hace 1 año}
		other {hace # años}}}
	agoShort {{${PL}
		other {hace # años}}}
	aheadShort {{${PL}
		other {en # años}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {en # años}}}}`
};
