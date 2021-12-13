const PL = 'n, plural, offset:0 ';
export default {
	now: 'fa un moment',
	minute: `{type, select,
	ago {{${PL}
		=0 {fa un moment}
		=1 {fa 1 minuta}
		other {fa # minutas}}}
	agoShort {{${PL}
		=0 {fa un moment}
		other {fa # minutas}}}
	aheadShort {{${PL}
		=0 {d'aquí un moment}
		other {d'aquí # minutas}}}
	other {{${PL}
		=0 {fa un moment d'aquí un moment}
		=1 {d'aquí 1 minuta}
		other {d'aquí # minutas}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {fa 1 ora}
		other {fa # oras}}}
	agoShort {{${PL}
		other {fa # oras}}}
	aheadShort {{${PL}
		other {d'aquí # oras}}}
	other {{${PL}
		=1 {d'aquí 1 ora}
		other {d'aquí # oras}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {fa 1 jorn}
		other {fa # jorns}}}
	agoShort {{${PL}
		other {fa # jorns}}}
	aheadShort {{${PL}
		other {d'aquí # jorns}}}
	other {{${PL}
		=1 {d'aquí 1 jorn}
		other {d'aquí # jorns}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {fa 1 setmana}
		other {fa # setmanas}}}
	agoShort {{${PL}
		other {fa # setmanas}}}
	aheadShort {{${PL}
		other {d'aquí # setmanas}}}
	other {{${PL}
		=1 {d'aquí 1 setmana}
		other {d'aquí # setmanas}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {fa 1 mes}
		other {fa # meses}}}
	agoShort {{${PL}
		other {fa # meses}}}
	aheadShort {{${PL}
		other {d'aquí # meses}}}
	other {{${PL}
		=1 {d'aquí 1 mes}
		other {d'aquí # meses}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {fa 1 an}
		other {fa # ans}}}
	agoShort {{${PL}
		other {fa # ans}}}
	aheadShort {{${PL}
		other {d'aquí # ans}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {d'aquí # ans}}}}`
};
