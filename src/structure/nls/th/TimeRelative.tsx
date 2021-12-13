const PL = 'n, plural, offset:0 ';
export default {
	now: 'เมื่อสักครู่นี้',
	minute: `{type, select,
	ago {{${PL}
		=0 {เมื่อสักครู่นี้}
		=1 {1 นาทีที่แล้ว}
		other {# นาทีที่แล้ว}}}
	agoShort {{${PL}
		=0 {เมื่อสักครู่นี้}
		other {# นาทีที่แล้ว}}}
	aheadShort {{${PL}
		=0 {อีกสักครู่}
		other {ใน # นาที}}}
	other {{${PL}
		=0 {เมื่อสักครู่นี้ อีกสักครู่}
		=1 {ใน 1 นาที}
		other {ใน # นาที}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1 ชั่วโมงที่แล้ว}
		other {# ชั่วโมงที่แล้ว}}}
	agoShort {{${PL}
		other {# ชั่วโมงที่แล้ว}}}
	aheadShort {{${PL}
		other {ใน # ชั่วโมง}}}
	other {{${PL}
		=1 {ใน 1 ชั่วโมง}
		other {ใน # ชั่วโมง}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1 วันที่แล้ว}
		other {# วันที่แล้ว}}}
	agoShort {{${PL}
		other {# วันที่แล้ว}}}
	aheadShort {{${PL}
		other {ใน # วัน}}}
	other {{${PL}
		=1 {ใน 1 วัน}
		other {ใน # วัน}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1 อาทิตย์ที่แล้ว}
		other {# อาทิตย์ที่แล้ว}}}
	agoShort {{${PL}
		other {# อาทิตย์ที่แล้ว}}}
	aheadShort {{${PL}
		other {ใน # อาทิตย์}}}
	other {{${PL}
		=1 {ใน 1 อาทิตย์}
		other {ใน # อาทิตย์}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1 เดือนที่แล้ว}
		other {# เดือนที่แล้ว}}}
	agoShort {{${PL}
		other {# เดือนที่แล้ว}}}
	aheadShort {{${PL}
		other {ใน # เดือน}}}
	other {{${PL}
		=1 {ใน 1 เดือน}
		other {ใน # เดือน}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1 ปีที่แล้ว}
		other {# ปีที่แล้ว}}}
	agoShort {{${PL}
		other {# ปีที่แล้ว}}}
	aheadShort {{${PL}
		other {ใน # ปี}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {ใน # ปี}}}}`
};
