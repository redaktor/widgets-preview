const PL = 'n, plural, offset:0 ';
export default {
	now: 'ယခုအတွင်း',
	minute: `{type, select,
	ago {{${PL}
		=0 {ယခုအတွင်း}
		=1 {1 မိနစ် အကြာက}
		other {# မိနစ် အကြာက}}}
	agoShort {{${PL}
		=0 {ယခုအတွင်း}
		other {# မိနစ် အကြာက}}}
	aheadShort {{${PL}
		=0 {ယခု}
		other {# မိနစ်အတွင်း}}}
	other {{${PL}
		=0 {ယခုအတွင်း ယခု}
		=1 {1 မိနစ်အတွင်း}
		other {# မိနစ်အတွင်း}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1 နာရီ အကြာက}
		other {# နာရီ အကြာက}}}
	agoShort {{${PL}
		other {# နာရီ အကြာက}}}
	aheadShort {{${PL}
		other {# နာရီအတွင်း}}}
	other {{${PL}
		=1 {1 နာရီအတွင်း}
		other {# နာရီအတွင်း}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1 ရက် အကြာက}
		other {# ရက် အကြာက}}}
	agoShort {{${PL}
		other {# ရက် အကြာက}}}
	aheadShort {{${PL}
		other {# ရက်အတွင်း}}}
	other {{${PL}
		=1 {1 ရက်အတွင်း}
		other {# ရက်အတွင်း}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1 ပတ် အကြာက}
		other {# ပတ် အကြာက}}}
	agoShort {{${PL}
		other {# ပတ် အကြာက}}}
	aheadShort {{${PL}
		other {# ပတ်အတွင်း}}}
	other {{${PL}
		=1 {1 ပတ်အတွင်း}
		other {# ပတ်အတွင်း}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1 လ အကြာက}
		other {# လ အကြာက}}}
	agoShort {{${PL}
		other {# လ အကြာက}}}
	aheadShort {{${PL}
		other {# လအတွင်း}}}
	other {{${PL}
		=1 {1 လအတွင်း}
		other {# လအတွင်း}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1 နှစ် အကြာက}
		other {# နှစ် အကြာက}}}
	agoShort {{${PL}
		other {# နှစ် အကြာက}}}
	aheadShort {{${PL}
		other {# နှစ်အတွင်း}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {# နှစ်အတွင်း}}}}`
};
