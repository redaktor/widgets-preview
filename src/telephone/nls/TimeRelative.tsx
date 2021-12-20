const locales = {
	bg: () => import('./bg/TimeRelative'),
	bn_IN: () => import('./bn_IN/TimeRelative'),
	da: () => import('./da/TimeRelative'),
	de: () => import('./de/TimeRelative'),
	el: () => import('./el/TimeRelative'),
	es: () => import('./es/TimeRelative'),
	eu: () => import('./eu/TimeRelative'),
	fa: () => import('./fa/TimeRelative'),
	fi: () => import('./fi/TimeRelative'),
	fr: () => import('./fr/TimeRelative'),
	gl: () => import('./gl/TimeRelative'),
	he: () => import('./he/TimeRelative'),
	hi_IN: () => import('./hi_IN/TimeRelative'),
	hu: () => import('./hu/TimeRelative'),
	id_ID: () => import('./id_ID/TimeRelative'),
	it: () => import('./it/TimeRelative'),
	ja: () => import('./ja/TimeRelative'),
	ka: () => import('./ka/TimeRelative'),
	ko: () => import('./ko/TimeRelative'),
	ml: () => import('./ml/TimeRelative'),
	my: () => import('./my/TimeRelative'),
	nb_NO: () => import('./nb_NO/TimeRelative'),
	nl: () => import('./nl/TimeRelative'),
	nn_NO: () => import('./nn_NO/TimeRelative'),
	oc: () => import('./oc/TimeRelative'),
	pt_BR: () => import('./pt_BR/TimeRelative'),
	ro: () => import('./ro/TimeRelative'),
	ru: () => import('./ru/TimeRelative'),
	sq: () => import('./sq/TimeRelative'),
	sv: () => import('./sv/TimeRelative'),
	ta: () => import('./ta/TimeRelative'),
	th: () => import('./th/TimeRelative'),
	tr: () => import('./tr/TimeRelative'),
	vi: () => import('./vi/TimeRelative'),
	zh_TW: () => import('./zh_TW/TimeRelative')
};

const PL = 'n, plural, offset:0 ';
const messages = {
	now: 'now',
	minute: `{type, select,
	ago {{${PL}
		=0 {a while ago}
		=1 {One minute ago}
		other {# minutes ago}}}
	agoShort {{${PL}
		=0 {just now}
		other {#m ago}}}
	aheadShort {{${PL}
		=0 {right now}
		other {in #m}}}
	other {{${PL}
		=0 {right now}
		=1 {in 1 minute}
		other {in # minutes}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {One hour ago}
		other {# hours ago}}}
	agoShort {{${PL}
		other {#h ago}}}
	aheadShort {{${PL}
		other {in #h}}}
	other {{${PL}
		=1 {in 1 hour}
		other {in # hours}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {One day ago}
		other {# days ago}}}
	agoShort {{${PL}
		other {#d ago}}}
	aheadShort {{${PL}
		other {in #d}}}
	other {{${PL}
		=1 {in 1 day}
		other {in # days}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {One week ago}
		other {# weeks ago}}}
	agoShort {{${PL}
		other {#w ago}}}
	aheadShort {{${PL}
		other {in #w}}}
	other {{${PL}
		=1 {in 1 week}
		other {in # weeks}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {One month ago}
		other {# months ago}}}
	agoShort {{${PL}
		other {#mo ago}}}
	aheadShort {{${PL}
		other {in #mo}}}
	other {{${PL}
		=1 {in 1 month}
		other {in # months}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {One year ago}
		other {# years ago}}}
	agoShort {{${PL}
		other {#yr ago}}}
	aheadShort {{${PL}
		other {in #yr}}}
	other {{${PL}
		=1 {in 1 year}
		other {in # years}}}}`
};

export default { locales, messages };
