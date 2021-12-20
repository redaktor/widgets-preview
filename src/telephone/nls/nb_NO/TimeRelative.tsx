const PL = 'n, plural, offset:0 ';
export default {
	now: 'akkurat nå',
	minute: `{type, select,
	ago {{${PL}
		=0 {akkurat nå}
		=1 {1 minutt siden}
		other {# minutter siden}}}
	agoShort {{${PL}
		=0 {akkurat nå}
		other {# minutter siden}}}
	aheadShort {{${PL}
		=0 {om litt}
		other {om # minutter}}}
	other {{${PL}
		=0 {akkurat nå om litt}
		=1 {om 1 minutt}
		other {om # minutter}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1 time siden}
		other {# timer siden}}}
	agoShort {{${PL}
		other {# timer siden}}}
	aheadShort {{${PL}
		other {om # timer}}}
	other {{${PL}
		=1 {om 1 time}
		other {om # timer}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1 dag siden}
		other {# dager siden}}}
	agoShort {{${PL}
		other {# dager siden}}}
	aheadShort {{${PL}
		other {om # dager}}}
	other {{${PL}
		=1 {om 1 dag}
		other {om # dager}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1 uke siden}
		other {# uker siden}}}
	agoShort {{${PL}
		other {# uker siden}}}
	aheadShort {{${PL}
		other {om # uker}}}
	other {{${PL}
		=1 {om 1 uke}
		other {om # uker}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1 måned siden}
		other {# måneder siden}}}
	agoShort {{${PL}
		other {# måneder siden}}}
	aheadShort {{${PL}
		other {om # måneder}}}
	other {{${PL}
		=1 {om 1 måned}
		other {om # måneder}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1 år siden}
		other {# år siden}}}
	agoShort {{${PL}
		other {# år siden}}}
	aheadShort {{${PL}
		other {om # år}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {om # år}}}}`
};
