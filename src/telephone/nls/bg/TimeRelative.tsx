const PL = 'n, plural, offset:0 ';
export default {
	now: 'току що',
	minute: `{type, select,
	ago {{${PL}
		=0 {току що}
		=1 {преди 1 минута}
		other {преди # минути}}}
	agoShort {{${PL}
		=0 {току що}
		other {преди # минути}}}
	aheadShort {{${PL}
		=0 {съвсем скоро}
		other {след # минути}}}
	other {{${PL}
		=0 {току що съвсем скоро}
		=1 {след 1 минута}
		other {след # минути}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {преди 1 час}
		other {преди # часа}}}
	agoShort {{${PL}
		other {преди # часа}}}
	aheadShort {{${PL}
		other {след # часа}}}
	other {{${PL}
		=1 {след 1 час}
		other {след # часа}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {преди 1 ден}
		other {преди # дни}}}
	agoShort {{${PL}
		other {преди # дни}}}
	aheadShort {{${PL}
		other {след # дни}}}
	other {{${PL}
		=1 {след 1 ден}
		other {след # дни}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {преди 1 седмица}
		other {преди # седмици}}}
	agoShort {{${PL}
		other {преди # седмици}}}
	aheadShort {{${PL}
		other {след # седмици}}}
	other {{${PL}
		=1 {след 1 седмица}
		other {след # седмици}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {преди 1 месец}
		other {преди # месеца}}}
	agoShort {{${PL}
		other {преди # месеца}}}
	aheadShort {{${PL}
		other {след # месеца}}}
	other {{${PL}
		=1 {след 1 месец}
		other {след # месеца}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {преди 1 година}
		other {преди # години}}}
	agoShort {{${PL}
		other {преди # години}}}
	aheadShort {{${PL}
		other {след # години}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {след # години}}}}`
};
