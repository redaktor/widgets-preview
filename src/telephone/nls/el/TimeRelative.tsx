const PL = 'n, plural, offset:0 ';
export default {
	now: 'μόλις τώρα',
	minute: `{type, select,
	ago {{${PL}
		=0 {μόλις τώρα}
		=1 {1 λεπτό πριν}
		other {# λεπτά πριν}}}
	agoShort {{${PL}
		=0 {μόλις τώρα}
		other {# λεπτά πριν}}}
	aheadShort {{${PL}
		=0 {σε λίγο}
		other {σε # λεπτά}}}
	other {{${PL}
		=0 {μόλις τώρα σε λίγο}
		=1 {σε 1 λεπτό}
		other {σε # λεπτά}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1 ώρα πριν}
		other {# ώρες πριν}}}
	agoShort {{${PL}
		other {# ώρες πριν}}}
	aheadShort {{${PL}
		other {σε # ώρες}}}
	other {{${PL}
		=1 {σε 1 ώρα}
		other {σε # ώρες}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1 μέρα πριν}
		other {# μέρες πριν}}}
	agoShort {{${PL}
		other {# μέρες πριν}}}
	aheadShort {{${PL}
		other {σε # μέρες}}}
	other {{${PL}
		=1 {σε 1 μέρα}
		other {σε # μέρες}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1 εβδομάδα πριν}
		other {# εβδομάδες πριν}}}
	agoShort {{${PL}
		other {# εβδομάδες πριν}}}
	aheadShort {{${PL}
		other {σε # εβδομάδες}}}
	other {{${PL}
		=1 {σε 1 εβδομάδα}
		other {σε # εβδομάδες}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1 μήνα πριν}
		other {# μήνες πριν}}}
	agoShort {{${PL}
		other {# μήνες πριν}}}
	aheadShort {{${PL}
		other {σε # μήνες}}}
	other {{${PL}
		=1 {σε 1 μήνα}
		other {σε # μήνες}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1 χρόνο πριν}
		other {# χρόνια πριν}}}
	agoShort {{${PL}
		other {# χρόνια πριν}}}
	aheadShort {{${PL}
		other {σε # χρόνια}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {σε # χρόνια}}}}`
};
