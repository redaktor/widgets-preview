const PL = 'n, plural, offset:0 ';
export default {
	now: 'chiar acum',
	minute: `{type, select,
	ago {{${PL}
		=0 {chiar acum}
		=1 {acum un minut}
		other {acum # minute}}}
	agoShort {{${PL}
		=0 {chiar acum}
		other {acum # minute}}}
	aheadShort {{${PL}
		=0 {chiar acum}
		other {peste # minute}}}
	other {{${PL}
		=0 {chiar acum chiar acum}
		=1 {peste un minut}
		other {peste # minute}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {acum o oră}
		other {acum # ore}}}
	agoShort {{${PL}
		other {acum # ore}}}
	aheadShort {{${PL}
		other {peste # ore}}}
	other {{${PL}
		=1 {peste o oră}
		other {peste # ore}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {acum o zi}
		other {acum # zile}}}
	agoShort {{${PL}
		other {acum # zile}}}
	aheadShort {{${PL}
		other {peste # zile}}}
	other {{${PL}
		=1 {peste o zi}
		other {peste # zile}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {acum o săptămână}
		other {acum # săptămâni}}}
	agoShort {{${PL}
		other {acum # săptămâni}}}
	aheadShort {{${PL}
		other {peste # săptămâni}}}
	other {{${PL}
		=1 {peste o săptămână}
		other {peste # săptămâni}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {acum o lună}
		other {acum # luni}}}
	agoShort {{${PL}
		other {acum # luni}}}
	aheadShort {{${PL}
		other {peste # luni}}}
	other {{${PL}
		=1 {peste o lună}
		other {peste # luni}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {acum un an}
		other {acum # ani}}}
	agoShort {{${PL}
		other {acum # ani}}}
	aheadShort {{${PL}
		other {peste # ani}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {peste # ani}}}}`
};
