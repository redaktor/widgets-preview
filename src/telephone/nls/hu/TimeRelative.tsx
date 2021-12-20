const PL = 'n, plural, offset:0 ';
export default {
	now: 'éppen most',
	minute: `{type, select,
	ago {{${PL}
		=0 {éppen most}
		=1 {1 perce}
		other {# perce}}}
	agoShort {{${PL}
		=0 {éppen most}
		other {# perce}}}
	aheadShort {{${PL}
		=0 {éppen most}
		other {# percen belül}}}
	other {{${PL}
		=0 {éppen most éppen most}
		=1 {1 percen belül}
		other {# percen belül}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1 órája}
		other {# órája}}}
	agoShort {{${PL}
		other {# órája}}}
	aheadShort {{${PL}
		other {# órán belül}}}
	other {{${PL}
		=1 {1 órán belül}
		other {# órán belül}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1 napja}
		other {# napja}}}
	agoShort {{${PL}
		other {# napja}}}
	aheadShort {{${PL}
		other {# napon belül}}}
	other {{${PL}
		=1 {1 napon belül}
		other {# napon belül}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1 hete}
		other {# hete}}}
	agoShort {{${PL}
		other {# hete}}}
	aheadShort {{${PL}
		other {# héten belül}}}
	other {{${PL}
		=1 {1 héten belül}
		other {# héten belül}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1 hónapja}
		other {# hónapja}}}
	agoShort {{${PL}
		other {# hónapja}}}
	aheadShort {{${PL}
		other {# hónapon belül}}}
	other {{${PL}
		=1 {1 hónapon belül}
		other {# hónapon belül}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1 éve}
		other {# éve}}}
	agoShort {{${PL}
		other {# éve}}}
	aheadShort {{${PL}
		other {# éven belül}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {# éven belül}}}}`
};
