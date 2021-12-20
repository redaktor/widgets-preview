const PL = 'n, plural, offset:0 ';
export default {
	now: 'अभी',
	minute: `{type, select,
	ago {{${PL}
		=0 {अभी}
		=1 {1 मिनट पहले}
		other {# मिनट पहले}}}
	agoShort {{${PL}
		=0 {अभी}
		other {# मिनट पहले}}}
	aheadShort {{${PL}
		=0 {कुछ समय}
		other {# मिनट में}}}
	other {{${PL}
		=0 {अभी कुछ समय}
		=1 {1 मिनट में}
		other {# मिनट में}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1 घंटे पहले}
		other {# घंटे पहले}}}
	agoShort {{${PL}
		other {# घंटे पहले}}}
	aheadShort {{${PL}
		other {# घंटे में}}}
	other {{${PL}
		=1 {1 घंटे में}
		other {# घंटे में}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1 दिन पहले}
		other {# दिन पहले}}}
	agoShort {{${PL}
		other {# दिन पहले}}}
	aheadShort {{${PL}
		other {# दिनों में}}}
	other {{${PL}
		=1 {1 दिन में}
		other {# दिनों में}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1 सप्ताह पहले}
		other {# हफ्ते पहले}}}
	agoShort {{${PL}
		other {# हफ्ते पहले}}}
	aheadShort {{${PL}
		other {# हफ्तों में}}}
	other {{${PL}
		=1 {1 सप्ताह में}
		other {# हफ्तों में}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1 महीने पहले}
		other {# महीने पहले}}}
	agoShort {{${PL}
		other {# महीने पहले}}}
	aheadShort {{${PL}
		other {# महीनों में}}}
	other {{${PL}
		=1 {1 महीने में}
		other {# महीनों में}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1 साल पहले}
		other {# साल पहले}}}
	agoShort {{${PL}
		other {# साल पहले}}}
	aheadShort {{${PL}
		other {# साल में}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {# साल में}}}}`
};
