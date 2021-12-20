const PL = 'n, plural, offset:0 ';
export default {
	now: 'for et øjeblik siden',
	minute: `{type, select,
	ago {{${PL}
		=0 {for et øjeblik siden}
		=1 {for 1 minut siden}
		other {for # minutter siden}}}
	agoShort {{${PL}
		=0 {for et øjeblik siden}
		other {for # minutter siden}}}
	aheadShort {{${PL}
		=0 {om et øjeblik}
		other {om # minutter}}}
	other {{${PL}
		=0 {for et øjeblik siden om et øjeblik}
		=1 {om 1 minut}
		other {om # minutter}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {for 1 time siden}
		other {for # timer siden}}}
	agoShort {{${PL}
		other {for # timer siden}}}
	aheadShort {{${PL}
		other {om # timer}}}
	other {{${PL}
		=1 {om 1 time}
		other {om # timer}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {for 1 dag siden}
		other {for # dage siden}}}
	agoShort {{${PL}
		other {for # dage siden}}}
	aheadShort {{${PL}
		other {om # dage}}}
	other {{${PL}
		=1 {om 1 dag}
		other {om # dage}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {for 1 uge siden}
		other {for # uger siden}}}
	agoShort {{${PL}
		other {for # uger siden}}}
	aheadShort {{${PL}
		other {om # uger}}}
	other {{${PL}
		=1 {om 1 uge}
		other {om # uger}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {for 1 måned siden}
		other {for # måneder siden}}}
	agoShort {{${PL}
		other {for # måneder siden}}}
	aheadShort {{${PL}
		other {om # måneder}}}
	other {{${PL}
		=1 {om 1 måned}
		other {om # måneder}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {for 1 år siden}
		other {for # år siden}}}
	agoShort {{${PL}
		other {for # år siden}}}
	aheadShort {{${PL}
		other {om # år}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {om # år}}}}`
};
