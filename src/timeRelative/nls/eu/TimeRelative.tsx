const PL = 'n, plural, offset:0 ';
export default {
	now: 'orain',
	minute: `{type, select,
	ago {{${PL}
		=0 {orain}
		=1 {duela minutu 1}
		other {duela # minutu}}}
	agoShort {{${PL}
		=0 {orain}
		other {duela # minutu}}}
	aheadShort {{${PL}
		=0 {denbora bat barru}
		other {# minutu barru}}}
	other {{${PL}
		=0 {orain denbora bat barru}
		=1 {minutu 1 barru}
		other {# minutu barru}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {duela ordu 1}
		other {duela # ordu}}}
	agoShort {{${PL}
		other {duela # ordu}}}
	aheadShort {{${PL}
		other {# ordu barru}}}
	other {{${PL}
		=1 {ordu 1 barru}
		other {# ordu barru}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {duela egun 1}
		other {duela # egun}}}
	agoShort {{${PL}
		other {duela # egun}}}
	aheadShort {{${PL}
		other {# egun barru}}}
	other {{${PL}
		=1 {egun 1 barru}
		other {# egun barru}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {duela aste 1}
		other {duela # aste}}}
	agoShort {{${PL}
		other {duela # aste}}}
	aheadShort {{${PL}
		other {# aste barru}}}
	other {{${PL}
		=1 {aste 1 barru}
		other {# aste barru}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {duela hillabete 1}
		other {duela # hillabete}}}
	agoShort {{${PL}
		other {duela # hillabete}}}
	aheadShort {{${PL}
		other {# hillabete barru}}}
	other {{${PL}
		=1 {hillabete 1 barru}
		other {# hillabete barru}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {duela urte 1}
		other {duela # urte}}}
	agoShort {{${PL}
		other {duela # urte}}}
	aheadShort {{${PL}
		other {# urte barru}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {# urte barru}}}}`
};
