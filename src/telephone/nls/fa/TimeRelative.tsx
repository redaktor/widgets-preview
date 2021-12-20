const PL = 'n, plural, offset:0 ';
export default {
	now: 'لحظاتی پیش',
	minute: `{type, select,
	ago {{${PL}
		=0 {لحظاتی پیش}
		=1 {۱ دقیقه پیش}
		other {# دقیقه پیش}}}
	agoShort {{${PL}
		=0 {لحظاتی پیش}
		other {# دقیقه پیش}}}
	aheadShort {{${PL}
		=0 {همین حالا}
		other {# دقیقه دیگر}}}
	other {{${PL}
		=0 {لحظاتی پیش همین حالا}
		=1 {۱ دقیقه دیگر}
		other {# دقیقه دیگر}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {۱ ساعت پیش}
		other {# ساعت پیش}}}
	agoShort {{${PL}
		other {# ساعت پیش}}}
	aheadShort {{${PL}
		other {# ساعت دیگر}}}
	other {{${PL}
		=1 {۱ ساعت دیگر}
		other {# ساعت دیگر}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {۱ روز پیش}
		other {# روز پیش}}}
	agoShort {{${PL}
		other {# روز پیش}}}
	aheadShort {{${PL}
		other {# روز دیگر}}}
	other {{${PL}
		=1 {۱ روز دیگر}
		other {# روز دیگر}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {۱ هفته پیش}
		other {# هفته پیش}}}
	agoShort {{${PL}
		other {# هفته پیش}}}
	aheadShort {{${PL}
		other {# هفته دیگر}}}
	other {{${PL}
		=1 {۱ هفته دیگر}
		other {# هفته دیگر}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {۱ ماه پیش}
		other {# ماه پیش}}}
	agoShort {{${PL}
		other {# ماه پیش}}}
	aheadShort {{${PL}
		other {# ماه دیگر}}}
	other {{${PL}
		=1 {۱ ماه دیگر}
		other {# ماه دیگر}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {۱ سال پیش}
		other {# سال پیش}}}
	agoShort {{${PL}
		other {# سال پیش}}}
	aheadShort {{${PL}
		other {# سال دیگر}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {# سال دیگر}}}}`
};
