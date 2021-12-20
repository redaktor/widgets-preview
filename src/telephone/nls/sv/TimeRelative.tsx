const PL = 'n, plural, offset:0 ';
export default {
	now: 'just nu',
	minute: `{type, select,
	ago {{${PL}
		=0 {just nu}
		=1 {1 minut sedan}
		other {# minuter sedan}}}
	agoShort {{${PL}
		=0 {just nu}
		other {# minuter sedan}}}
	aheadShort {{${PL}
		=0 {om en stund}
		other {om # minuter}}}
	other {{${PL}
		=0 {just nu om en stund}
		=1 {om 1 minut}
		other {om # minuter}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1 timme sedan}
		other {# timmar sedan}}}
	agoShort {{${PL}
		other {# timmar sedan}}}
	aheadShort {{${PL}
		other {om # timmar}}}
	other {{${PL}
		=1 {om 1 timme}
		other {om # timmar}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1 dag sedan}
		other {# dagar sedan}}}
	agoShort {{${PL}
		other {# dagar sedan}}}
	aheadShort {{${PL}
		other {om # dagar}}}
	other {{${PL}
		=1 {om 1 dag}
		other {om # dagar}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1 vecka sedan}
		other {# veckor sedan}}}
	agoShort {{${PL}
		other {# veckor sedan}}}
	aheadShort {{${PL}
		other {om # veckor}}}
	other {{${PL}
		=1 {om 1 vecka}
		other {om # veckor}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1 månad sedan}
		other {# månader sedan}}}
	agoShort {{${PL}
		other {# månader sedan}}}
	aheadShort {{${PL}
		other {om # månader}}}
	other {{${PL}
		=1 {om 1 månad}
		other {om # månader}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1 år sedan}
		other {# år sedan}}}
	agoShort {{${PL}
		other {# år sedan}}}
	aheadShort {{${PL}
		other {om # år}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {om # år}}}}`
};
