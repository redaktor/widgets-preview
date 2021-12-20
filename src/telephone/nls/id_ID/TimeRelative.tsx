const PL = 'n, plural, offset:0 ';
export default {
	now: 'baru saja',
	minute: `{type, select,
	ago {{${PL}
		=0 {baru saja}
		=1 {1 menit yang lalu}
		other {# menit yang lalu}}}
	agoShort {{${PL}
		=0 {baru saja}
		other {# menit yang lalu}}}
	aheadShort {{${PL}
		=0 {sebentar}
		other {dalam # menit}}}
	other {{${PL}
		=0 {baru saja sebentar}
		=1 {dalam 1 menit}
		other {dalam # menit}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1 jam yang lalu}
		other {# jam yang lalu}}}
	agoShort {{${PL}
		other {# jam yang lalu}}}
	aheadShort {{${PL}
		other {dalam # jam}}}
	other {{${PL}
		=1 {dalam 1 jam}
		other {dalam # jam}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1 hari yang lalu}
		other {# hari yang lalu}}}
	agoShort {{${PL}
		other {# hari yang lalu}}}
	aheadShort {{${PL}
		other {dalam # hari}}}
	other {{${PL}
		=1 {dalam 1 hari}
		other {dalam # hari}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1 minggu yang lalu}
		other {# minggu yang lalu}}}
	agoShort {{${PL}
		other {# minggu yang lalu}}}
	aheadShort {{${PL}
		other {dalam # minggu}}}
	other {{${PL}
		=1 {dalam 1 minggu}
		other {dalam # minggu}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1 bulan yang lalu}
		other {# bulan yang lalu}}}
	agoShort {{${PL}
		other {# bulan yang lalu}}}
	aheadShort {{${PL}
		other {dalam # bulan}}}
	other {{${PL}
		=1 {dalam 1 bulan}
		other {dalam # bulan}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1 tahun yang lalu}
		other {# tahun yang lalu}}}
	agoShort {{${PL}
		other {# tahun yang lalu}}}
	aheadShort {{${PL}
		other {dalam # tahun}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {dalam # tahun}}}}`
};
