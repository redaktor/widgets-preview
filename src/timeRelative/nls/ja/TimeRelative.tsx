const PL = 'n, plural, offset:0 ';
export default {
	now: 'すこし前',
	minute: `{type, select,
	ago {{${PL}
		=0 {すこし前}
		=1 {1分前}
		other {#分前}}}
	agoShort {{${PL}
		=0 {すこし前}
		other {#分前}}}
	aheadShort {{${PL}
		=0 {すぐに}
		other {#分以内}}}
	other {{${PL}
		=0 {すこし前 すぐに}
		=1 {1分以内}
		other {#分以内}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1時間前}
		other {#時間前}}}
	agoShort {{${PL}
		other {#時間前}}}
	aheadShort {{${PL}
		other {#時間以内}}}
	other {{${PL}
		=1 {1時間以内}
		other {#時間以内}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1日前}
		other {#日前}}}
	agoShort {{${PL}
		other {#日前}}}
	aheadShort {{${PL}
		other {#日以内}}}
	other {{${PL}
		=1 {1日以内}
		other {#日以内}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1週間前}
		other {#週間前}}}
	agoShort {{${PL}
		other {#週間前}}}
	aheadShort {{${PL}
		other {#週間以内}}}
	other {{${PL}
		=1 {1週間以内}
		other {#週間以内}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1ヶ月前}
		other {#ヶ月前}}}
	agoShort {{${PL}
		other {#ヶ月前}}}
	aheadShort {{${PL}
		other {#ヶ月以内}}}
	other {{${PL}
		=1 {1ヶ月以内}
		other {#ヶ月以内}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1年前}
		other {#年前}}}
	agoShort {{${PL}
		other {#年前}}}
	aheadShort {{${PL}
		other {#年以内}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {#年以内}}}}`
};
