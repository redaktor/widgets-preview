const PL = 'n, plural, offset:0 ';
export default {
	now: 'nett no',
	minute: `{type, select,
	ago {{${PL}
		=0 {nett no}
		=1 {1 minutt sidan}
		other {# minutt sidan}}}
	agoShort {{${PL}
		=0 {nett no}
		other {# minutt sidan}}}
	aheadShort {{${PL}
		=0 {om litt}
		other {om # minutt}}}
	other {{${PL}
		=0 {nett no om litt}
		=1 {om 1 minutt}
		other {om # minutt}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1 time sidan}
		other {# timar sidan}}}
	agoShort {{${PL}
		other {# timar sidan}}}
	aheadShort {{${PL}
		other {om # timar}}}
	other {{${PL}
		=1 {om 1 time}
		other {om # timar}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1 dag sidan}
		other {# dagar sidan}}}
	agoShort {{${PL}
		other {# dagar sidan}}}
	aheadShort {{${PL}
		other {om # dagar}}}
	other {{${PL}
		=1 {om 1 dag}
		other {om # dagar}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1 veke sidan}
		other {# veker sidan}}}
	agoShort {{${PL}
		other {# veker sidan}}}
	aheadShort {{${PL}
		other {om # veker}}}
	other {{${PL}
		=1 {om 1 veke}
		other {om # veker}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1 månad sidan}
		other {# månadar sidan}}}
	agoShort {{${PL}
		other {# månadar sidan}}}
	aheadShort {{${PL}
		other {om # månadar}}}
	other {{${PL}
		=1 {om 1 månad}
		other {om # månadar}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1 år sidan}
		other {# år sidan}}}
	agoShort {{${PL}
		other {# år sidan}}}
	aheadShort {{${PL}
		other {om # år}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {om # år}}}}`
};
