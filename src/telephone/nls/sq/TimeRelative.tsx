const PL = 'n, plural, offset:0 ';
export default {
	now: 'pak më parë',
	minute: `{type, select,
	ago {{${PL}
		=0 {pak më parë}
		=1 {para një minute}
		other {para # minutash}}}
	agoShort {{${PL}
		=0 {pak më parë}
		other {para # minutash}}}
	aheadShort {{${PL}
		=0 {pas pak}
		other {pas # minutash}}}
	other {{${PL}
		=0 {pak më parë pas pak}
		=1 {pas një minute}
		other {pas # minutash}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {para një ore}
		other {para # orësh}}}
	agoShort {{${PL}
		other {para # orësh}}}
	aheadShort {{${PL}
		other {pas # orësh}}}
	other {{${PL}
		=1 {pas një ore}
		other {pas # orësh}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {dje}
		other {para # ditësh}}}
	agoShort {{${PL}
		other {para # ditësh}}}
	aheadShort {{${PL}
		other {pas # ditësh}}}
	other {{${PL}
		=1 {nesër}
		other {pas # ditësh}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {para një jave}
		other {para # javësh}}}
	agoShort {{${PL}
		other {para # javësh}}}
	aheadShort {{${PL}
		other {pas # javësh}}}
	other {{${PL}
		=1 {pas një jave}
		other {pas # javësh}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {para një muaji}
		other {para # muajsh}}}
	agoShort {{${PL}
		other {para # muajsh}}}
	aheadShort {{${PL}
		other {pas # muajsh}}}
	other {{${PL}
		=1 {pas një muaji}
		other {pas # muajsh}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {para një viti}
		other {para # vjetësh}}}
	agoShort {{${PL}
		other {para # vjetësh}}}
	aheadShort {{${PL}
		other {pas # vjetësh}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {pas # vjetësh}}}}`
};
