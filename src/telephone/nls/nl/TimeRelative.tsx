const PL = 'n, plural, offset:0 ';
export default {
	now: 'recent',
	minute: `{type, select,
	ago {{${PL}
		=0 {recent}
		=1 {1 minuut geleden}
		other {# minuten geleden}}}
	agoShort {{${PL}
		=0 {recent}
		other {# minuten geleden}}}
	aheadShort {{${PL}
		=0 {binnenkort}
		other {binnen # minuten}}}
	other {{${PL}
		=0 {recent binnenkort}
		=1 {binnen 1 minuut}
		other {binnen # minuten}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1 uur geleden}
		other {# uur geleden}}}
	agoShort {{${PL}
		other {# uur geleden}}}
	aheadShort {{${PL}
		other {binnen # uur}}}
	other {{${PL}
		=1 {binnen 1 uur}
		other {binnen # uur}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1 dag geleden}
		other {# dagen geleden}}}
	agoShort {{${PL}
		other {# dagen geleden}}}
	aheadShort {{${PL}
		other {binnen # dagen}}}
	other {{${PL}
		=1 {binnen 1 dag}
		other {binnen # dagen}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1 week geleden}
		other {# weken geleden}}}
	agoShort {{${PL}
		other {# weken geleden}}}
	aheadShort {{${PL}
		other {binnen # weken}}}
	other {{${PL}
		=1 {binnen 1 week}
		other {binnen # weken}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1 maand geleden}
		other {# maanden geleden}}}
	agoShort {{${PL}
		other {# maanden geleden}}}
	aheadShort {{${PL}
		other {binnen # maanden}}}
	other {{${PL}
		=1 {binnen 1 maand}
		other {binnen # maanden}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1 jaar geleden}
		other {# jaar geleden}}}
	agoShort {{${PL}
		other {# jaar geleden}}}
	aheadShort {{${PL}
		other {binnen # jaar}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {binnen # jaar}}}}`
};
