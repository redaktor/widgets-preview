const PL = 'n, plural, offset:0 ';
export default {
	now: 'just now',
	minute: `{type, select,
	ago {{${PL}
		=0 {just now}
		=1 {1 минуту назад}
		other {через # минут}}}
	agoShort {{${PL}
		=0 {just now}
		other {через # минут}}}
	aheadShort {{${PL}
		=0 {a while ago}
		other {через # минут}}}
	other {{${PL}
		=0 {just now a while ago}
		=1 {через 1 минуту}
		other {через # минут}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1 час назад}
		other {1 час}}}
	agoShort {{${PL}
		other {1 час}}}
	aheadShort {{${PL}
		other {через # минут}}}
	other {{${PL}
		=1 {через # минут}
		other {через # минут}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1 час назад}
		other {через # часов}}}
	agoShort {{${PL}
		other {через # часов}}}
	aheadShort {{${PL}
		other {через # часов}}}
	other {{${PL}
		=1 {через 1 час}
		other {через # часов}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1 день назад}
		other {1 день}}}
	agoShort {{${PL}
		other {1 день}}}
	aheadShort {{${PL}
		other {через # часов}}}
	other {{${PL}
		=1 {через # часов}
		other {через # часов}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1 день назад}
		other {1 неделя назад}}}
	agoShort {{${PL}
		other {1 неделя назад}}}
	aheadShort {{${PL}
		other {1 неделя от сейчас}}}
	other {{${PL}
		=1 {через 1 день}
		other {1 неделя от сейчас}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1 неделя}
		other {1 неделя}}}
	agoShort {{${PL}
		other {1 неделя}}}
	aheadShort {{${PL}
		other {1 неделя от сейчас}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {1 неделя от сейчас}}}}`
};
