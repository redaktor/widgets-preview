const PL = 'n, plural, offset:0 ';
export default {
	now: '방금',
	minute: `{type, select,
	ago {{${PL}
		=0 {방금}
		=1 {1분 전}
		other {#분 전}}}
	agoShort {{${PL}
		=0 {방금}
		other {#분 전}}}
	aheadShort {{${PL}
		=0 {곧}
		other {#분 후}}}
	other {{${PL}
		=0 {방금 곧}
		=1 {1분 후}
		other {#분 후}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1시간 전}
		other {#시간 전}}}
	agoShort {{${PL}
		other {#시간 전}}}
	aheadShort {{${PL}
		other {#시간 후}}}
	other {{${PL}
		=1 {1시간 후}
		other {#시간 후}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1일 전}
		other {#일 전}}}
	agoShort {{${PL}
		other {#일 전}}}
	aheadShort {{${PL}
		other {#일 후}}}
	other {{${PL}
		=1 {1일 후}
		other {#일 후}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1주일 전}
		other {#주일 전}}}
	agoShort {{${PL}
		other {#주일 전}}}
	aheadShort {{${PL}
		other {#주일 후}}}
	other {{${PL}
		=1 {1주일 후}
		other {#주일 후}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1개월 전}
		other {#개월 전}}}
	agoShort {{${PL}
		other {#개월 전}}}
	aheadShort {{${PL}
		other {#개월 후}}}
	other {{${PL}
		=1 {1개월 후}
		other {#개월 후}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1년 전}
		other {#년 전}}}
	agoShort {{${PL}
		other {#년 전}}}
	aheadShort {{${PL}
		other {#년 후}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {#년 후}}}}`
};
