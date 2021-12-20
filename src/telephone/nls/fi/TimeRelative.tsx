const PL = 'n, plural, offset:0 ';
export default {
	now: 'juuri äsken',
	minute: `{type, select,
	ago {{${PL}
		=0 {juuri äsken}
		=1 {minuutti sitten}
		other {# minuuttia sitten}}}
	agoShort {{${PL}
		=0 {juuri äsken}
		other {# minuuttia sitten}}}
	aheadShort {{${PL}
		=0 {juuri nyt}
		other {# minuutin päästä}}}
	other {{${PL}
		=0 {juuri äsken juuri nyt}
		=1 {minuutin päästä}
		other {# minuutin päästä}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {tunti sitten}
		other {# tuntia sitten}}}
	agoShort {{${PL}
		other {# tuntia sitten}}}
	aheadShort {{${PL}
		other {# tunnin päästä}}}
	other {{${PL}
		=1 {tunnin päästä}
		other {# tunnin päästä}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {päivä sitten}
		other {# päivää sitten}}}
	agoShort {{${PL}
		other {# päivää sitten}}}
	aheadShort {{${PL}
		other {# päivän päästä}}}
	other {{${PL}
		=1 {päivän päästä}
		other {# päivän päästä}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {viikko sitten}
		other {# viikkoa sitten}}}
	agoShort {{${PL}
		other {# viikkoa sitten}}}
	aheadShort {{${PL}
		other {# viikon päästä}}}
	other {{${PL}
		=1 {viikon päästä}
		other {# viikon päästä}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {kuukausi sitten}
		other {# kuukautta sitten}}}
	agoShort {{${PL}
		other {# kuukautta sitten}}}
	aheadShort {{${PL}
		other {# kuukauden päästä}}}
	other {{${PL}
		=1 {kuukauden päästä}
		other {# kuukauden päästä}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {vuosi sitten}
		other {# vuotta sitten}}}
	agoShort {{${PL}
		other {# vuotta sitten}}}
	aheadShort {{${PL}
		other {# vuoden päästä}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {# vuoden päästä}}}}`
};
