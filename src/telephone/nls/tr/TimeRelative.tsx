const PL = 'n, plural, offset:0 ';
export default {
	now: 'az önce',
	minute: `{type, select,
	ago {{${PL}
		=0 {az önce}
		=1 {1 dakika önce}
		other {# dakika önce}}}
	agoShort {{${PL}
		=0 {az önce}
		other {# dakika önce}}}
	aheadShort {{${PL}
		=0 {şimdi}
		other {# dakika içinde}}}
	other {{${PL}
		=0 {az önce şimdi}
		=1 {1 dakika içinde}
		other {# dakika içinde}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1 saat önce}
		other {# saat önce}}}
	agoShort {{${PL}
		other {# saat önce}}}
	aheadShort {{${PL}
		other {# saat içinde}}}
	other {{${PL}
		=1 {1 saat içinde}
		other {# saat içinde}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1 gün önce}
		other {# gün önce}}}
	agoShort {{${PL}
		other {# gün önce}}}
	aheadShort {{${PL}
		other {# gün içinde}}}
	other {{${PL}
		=1 {1 gün içinde}
		other {# gün içinde}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1 hafta önce}
		other {# hafta önce}}}
	agoShort {{${PL}
		other {# hafta önce}}}
	aheadShort {{${PL}
		other {# hafta içinde}}}
	other {{${PL}
		=1 {1 hafta içinde}
		other {# hafta içinde}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1 ay önce}
		other {# ay önce}}}
	agoShort {{${PL}
		other {# ay önce}}}
	aheadShort {{${PL}
		other {# ay içinde}}}
	other {{${PL}
		=1 {1 ay içinde}
		other {# ay içinde}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1 yıl önce}
		other {# yıl önce}}}
	agoShort {{${PL}
		other {# yıl önce}}}
	aheadShort {{${PL}
		other {# yıl içinde}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {# yıl içinde}}}}`
};
