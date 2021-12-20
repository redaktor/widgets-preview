const PL = 'n, plural, offset:0 ';
export default {
	now: 'এইমাত্র',
	minute: `{type, select,
	ago {{${PL}
		=0 {এইমাত্র}
		=1 {1 মিনিট আগে}
		other {# এর মিনিট আগে}}}
	agoShort {{${PL}
		=0 {এইমাত্র}
		other {# এর মিনিট আগে}}}
	aheadShort {{${PL}
		=0 {একটা সময়}
		other {# এর মিনিটের মধ্যে}}}
	other {{${PL}
		=0 {এইমাত্র একটা সময়}
		=1 {1 মিনিটে}
		other {# এর মিনিটের মধ্যে}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1 ঘন্টা আগে}
		other {# ঘণ্টা আগে}}}
	agoShort {{${PL}
		other {# ঘণ্টা আগে}}}
	aheadShort {{${PL}
		other {# এর ঘন্টার মধ্যে}}}
	other {{${PL}
		=1 {1 ঘন্টা}
		other {# এর ঘন্টার মধ্যে}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1 দিন আগে}
		other {# এর দিন আগে}}}
	agoShort {{${PL}
		other {# এর দিন আগে}}}
	aheadShort {{${PL}
		other {# এর দিন}}}
	other {{${PL}
		=1 {1 দিনের মধ্যে}
		other {# এর দিন}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1 সপ্তাহ আগে}
		other {# এর সপ্তাহ আগে}}}
	agoShort {{${PL}
		other {# এর সপ্তাহ আগে}}}
	aheadShort {{${PL}
		other {# সপ্তাহের মধ্যে}}}
	other {{${PL}
		=1 {1 সপ্তাহের মধ্যে}
		other {# সপ্তাহের মধ্যে}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1 মাস আগে}
		other {# মাস আগে}}}
	agoShort {{${PL}
		other {# মাস আগে}}}
	aheadShort {{${PL}
		other {# মাসে}}}
	other {{${PL}
		=1 {1 মাসে}
		other {# মাসে}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1 বছর আগে}
		other {# বছর আগে}}}
	agoShort {{${PL}
		other {# বছর আগে}}}
	aheadShort {{${PL}
		other {# বছরে}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {# বছরে}}}}`
};
