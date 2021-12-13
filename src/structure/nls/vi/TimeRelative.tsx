const PL = 'n, plural, offset:0 ';
export default {
	now: 'vừa xong',
	minute: `{type, select,
	ago {{${PL}
		=0 {vừa xong}
		=1 {1 phút trước}
		other {# phút trước}}}
	agoShort {{${PL}
		=0 {vừa xong}
		other {# phút trước}}}
	aheadShort {{${PL}
		=0 {một lúc}
		other {trong # phút}}}
	other {{${PL}
		=0 {vừa xong một lúc}
		=1 {trong 1 phút}
		other {trong # phút}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1 giờ trước}
		other {# giờ trước}}}
	agoShort {{${PL}
		other {# giờ trước}}}
	aheadShort {{${PL}
		other {trong # giờ}}}
	other {{${PL}
		=1 {trong 1 giờ}
		other {trong # giờ}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1 ngày trước}
		other {# ngày trước}}}
	agoShort {{${PL}
		other {# ngày trước}}}
	aheadShort {{${PL}
		other {trong # ngày}}}
	other {{${PL}
		=1 {trong 1 ngày}
		other {trong # ngày}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1 tuần trước}
		other {# tuần trước}}}
	agoShort {{${PL}
		other {# tuần trước}}}
	aheadShort {{${PL}
		other {trong # tuần}}}
	other {{${PL}
		=1 {trong 1 tuần}
		other {trong # tuần}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1 tháng trước}
		other {# tháng trước}}}
	agoShort {{${PL}
		other {# tháng trước}}}
	aheadShort {{${PL}
		other {trong # tháng}}}
	other {{${PL}
		=1 {trong 1 tháng}
		other {trong # tháng}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1 năm trước}
		other {# năm trước}}}
	agoShort {{${PL}
		other {# năm trước}}}
	aheadShort {{${PL}
		other {trong # năm}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {trong # năm}}}}`
};
