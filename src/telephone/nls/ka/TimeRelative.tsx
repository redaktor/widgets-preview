const PL = 'n, plural, offset:0 ';
export default {
	now: 'ამ წამს',
	minute: `{type, select,
	ago {{${PL}
		=0 {ამ წამს}
		=1 {1 წუთის წინ}
		other {# წუთის წინ}}}
	agoShort {{${PL}
		=0 {ამ წამს}
		other {# წუთის წინ}}}
	aheadShort {{${PL}
		=0 {ახლა}
		other {# წუთში}}}
	other {{${PL}
		=0 {ამ წამს ახლა}
		=1 {1 წუთში}
		other {# წუთში}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1 საათის წინ}
		other {# საათის წინ}}}
	agoShort {{${PL}
		other {# საათის წინ}}}
	aheadShort {{${PL}
		other {# საათში}}}
	other {{${PL}
		=1 {1 საათში}
		other {# საათში}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1 დღის წინ}
		other {# დღის წინ}}}
	agoShort {{${PL}
		other {# დღის წინ}}}
	aheadShort {{${PL}
		other {# დღეში}}}
	other {{${PL}
		=1 {1 დღეში}
		other {# დღეში}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1 კვირის წინ}
		other {# კვირის წინ}}}
	agoShort {{${PL}
		other {# კვირის წინ}}}
	aheadShort {{${PL}
		other {# კვირაში}}}
	other {{${PL}
		=1 {1 კვირაში}
		other {# კვირაში}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1 თვის წინ}
		other {# თვის წინ}}}
	agoShort {{${PL}
		other {# თვის წინ}}}
	aheadShort {{${PL}
		other {# თვეში}}}
	other {{${PL}
		=1 {1 თვეში}
		other {# თვეში}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1 წლის წინ}
		other {# წლის წინ}}}
	agoShort {{${PL}
		other {# წლის წინ}}}
	aheadShort {{${PL}
		other {# წელიწადში}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {# წელიწადში}}}}`
};
