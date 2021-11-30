const PL = 'n, plural, offset:0 ';
export default {
	now: '剛剛',
	minute: `{type, select,
	ago {{${PL}
		=0 {剛剛}
		=1 {1 分鐘前}
		other {# 分鐘前}}}
	agoShort {{${PL}
		=0 {剛剛}
		other {# 分鐘前}}}
	aheadShort {{${PL}
		=0 {片刻後}
		other {# 分鐘後}}}
	other {{${PL}
		=0 {剛剛 片刻後}
		=1 {1 分鐘後}
		other {# 分鐘後}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1 小時前}
		other {# 小時前}}}
	agoShort {{${PL}
		other {# 小時前}}}
	aheadShort {{${PL}
		other {# 小時後}}}
	other {{${PL}
		=1 {1 小時後}
		other {# 小時後}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1 天前}
		other {# 天前}}}
	agoShort {{${PL}
		other {# 天前}}}
	aheadShort {{${PL}
		other {# 天後}}}
	other {{${PL}
		=1 {1 天後}
		other {# 天後}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1 週前}
		other {# 週前}}}
	agoShort {{${PL}
		other {# 週前}}}
	aheadShort {{${PL}
		other {# 週後}}}
	other {{${PL}
		=1 {1 週後}
		other {# 週後}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1 個月前}
		other {# 個月前}}}
	agoShort {{${PL}
		other {# 個月前}}}
	aheadShort {{${PL}
		other {# 個月後}}}
	other {{${PL}
		=1 {1 個月後}
		other {# 個月後}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1 年前}
		other {# 年前}}}
	agoShort {{${PL}
		other {# 年前}}}
	aheadShort {{${PL}
		other {# 年後}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {# 年後}}}}`
};
