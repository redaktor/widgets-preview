const PL = 'n, plural, offset:0 ';
export default {
	now: 'jetzt',
	minute: `{type, select,
	ago {{${PL}
		=0 {gerade eben}
		=1 {vor einer Minute}
		other {vor # Minuten}}}
	agoShort {{${PL}
		=0 {eben}
		other {vor # Min.}}}
	aheadShort {{${PL}
		=0 {gleich}
		other {in # Min.}}}
	other {{${PL}
		=0 {jetzt gleich}
		=1 {in einer Minute}
		other {in # Minuten}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {vor einer Stunde}
		other {vor # Stunden}}}
	agoShort {{${PL}
		other {vor # Std.}}}
	aheadShort {{${PL}
		other {in # Std.}}}
	other {{${PL}
		=1 {in einer Stunde}
		other {in # Stunden}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {vor einem Tag}
		other {vor # Tagen}}}
	agoShort {{${PL}
		other {vor # T.}}}
	aheadShort {{${PL}
		other {in # T.}}}
	other {{${PL}
		=1 {in einem Tag}
		other {in # Tagen}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {vor einer Woche}
		other {vor # Wochen}}}
	agoShort {{${PL}
		other {vor # W.}}}
	aheadShort {{${PL}
		other {in # W.}}}
	other {{${PL}
		=1 {in einer Woche}
		other {in # Wochen}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {vor einem Monat}
		other {vor # Monaten}}}
	agoShort {{${PL}
		other {vor # M.}}}
	aheadShort {{${PL}
		other {in # M.}}}
	other {{${PL}
		=1 {in einem Monat}
		other {in # Monaten}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {vor einem Jahr}
		other {vor # Jahren}}}
	agoShort {{${PL}
		other {vor # J.}}}
	aheadShort {{${PL}
		other {in # J.}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {in # Jahren}}}}`
};
