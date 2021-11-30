const PL = 'n, plural, offset:0 ';
/*
TODO =2 …

number === 2 ? ['לפני שעתיים', 'בעוד שעתיים'] : ['לפני %s שעות', 'בעוד %s שעות'], stunde
['אתמול', 'מחר'],
number === 2 ? ['לפני יומיים', 'בעוד יומיים'] : ['לפני %s ימים', 'בעוד %s ימים'], tag
['לפני שבוע', 'בעוד שבוע'],
number === 2 ? ['לפני שבועיים', 'בעוד שבועיים'] : ['לפני %s שבועות', 'בעוד %s שבועות'], woche
['לפני חודש', 'בעוד חודש'],
number === 2 ? ['לפני חודשיים', 'בעוד חודשיים'] : ['לפני %s חודשים', 'בעוד %s חודשים'], monat
['לפני שנה', 'בעוד שנה'],
number === 2 ? ['לפני שנתיים', 'בעוד שנתיים'] : ['לפני %s שנים', 'בעוד %s שנים'], jahr
*/
export default {
	now: 'זה עתה',
	minute: `{type, select,
	ago {{${PL}
		=0 {זה עתה}
		=1 {לפני דקה}
		other {לפני # דקות}}}
	agoShort {{${PL}
		=0 {זה עתה}
		other {לפני # דקות}}}
	aheadShort {{${PL}
		=0 {עכשיו}
		other {בעוד # דקות}}}
	other {{${PL}
		=0 {זה עתה עכשיו}
		=1 {בעוד דקה}
		other {בעוד # דקות}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {לפני שעה}
		other {לפני # שעות}}}
	agoShort {{${PL}
		other {לפני # שעות}}}
	aheadShort {{${PL}
		other {בעוד # שעות}}}
	other {{${PL}
		=1 {בעוד שעה}
		other {בעוד # שעות}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {אתמול}
		other {לפני # ימים}}}
	agoShort {{${PL}
		other {לפני # ימים}}}
	aheadShort {{${PL}
		other {בעוד # ימים}}}
	other {{${PL}
		=1 {מחר}
		other {בעוד # ימים}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {לפני שבוע}
		other {לפני # שבועות}}}
	agoShort {{${PL}
		other {לפני # שבועות}}}
	aheadShort {{${PL}
		other {בעוד # שבועות}}}
	other {{${PL}
		=1 {בעוד שבוע}
		other {בעוד # שבועות}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {לפני חודש}
		other {לפני # חודשים}}}
	agoShort {{${PL}
		other {לפני # חודשים}}}
	aheadShort {{${PL}
		other {בעוד # חודשים}}}
	other {{${PL}
		=1 {בעוד חודש}
		other {בעוד # חודשים}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {לפני שנה}
		other {לפני # שנים}}}
	agoShort {{${PL}
		other {לפני # שנים}}}
	aheadShort {{${PL}
		other {בעוד # שנים}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {בעוד # שנים}}}}`
};
