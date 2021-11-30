const PL = 'n, plural, offset:0 ';
export default {
	now: 'இப்போது',
	minute: `{type, select,
	ago {{${PL}
		=0 {இப்போது}
		=1 {1 நிமிடத்திற்க்கு முன்}
		other {# நிமிடத்திற்க்கு முன்}}}
	agoShort {{${PL}
		=0 {இப்போது}
		other {# நிமிடத்திற்க்கு முன்}}}
	aheadShort {{${PL}
		=0 {சற்று நேரம் முன்பு}
		other {# நிமிடங்களில்}}}
	other {{${PL}
		=0 {இப்போது சற்று நேரம் முன்பு}
		=1 {1 நிமிடத்தில்}
		other {# நிமிடங்களில்}}}}`,
	hour: `{type, select,
	ago {{${PL}
		=1 {1 மணி நேரத்திற்கு முன்}
		other {# மணி நேரத்திற்கு முன்}}}
	agoShort {{${PL}
		other {# மணி நேரத்திற்கு முன்}}}
	aheadShort {{${PL}
		other {# மணி நேரத்திற்குள்}}}
	other {{${PL}
		=1 {1 மணி நேரத்திற்குள்}
		other {# மணி நேரத்திற்குள்}}}}`,
	day: `{type, select,
	ago {{${PL}
		=1 {1 நாளுக்கு முன்}
		other {# நாட்களுக்கு முன்}}}
	agoShort {{${PL}
		other {# நாட்களுக்கு முன்}}}
	aheadShort {{${PL}
		other {# நாட்களில்}}}
	other {{${PL}
		=1 {1 நாளில்}
		other {# நாட்களில்}}}}`,
	week: `{type, select,
	ago {{${PL}
		=1 {1 வாரத்திற்கு முன்}
		other {# வாரங்களுக்கு முன்}}}
	agoShort {{${PL}
		other {# வாரங்களுக்கு முன்}}}
	aheadShort {{${PL}
		other {# வாரங்களில்}}}
	other {{${PL}
		=1 {1 வாரத்தில்}
		other {# வாரங்களில்}}}}`,
	month: `{type, select,
	ago {{${PL}
		=1 {1 மாதத்திற்கு முன்}
		other {# மாதங்களுக்கு முன்}}}
	agoShort {{${PL}
		other {# மாதங்களுக்கு முன்}}}
	aheadShort {{${PL}
		other {# மாதங்களில்}}}
	other {{${PL}
		=1 {1 மாதத்தில்}
		other {# மாதங்களில்}}}}`,
	year: `{type, select,
	ago {{${PL}
		=1 {1 வருடத்திற்கு முன்}
		other {# வருடங்களுக்கு முன்}}}
	agoShort {{${PL}
		other {# வருடங்களுக்கு முன்}}}
	aheadShort {{${PL}
		other {# வருடங்களில்}}}
	other {{${PL}
		=1 {in 1 Jahr}
		other {# வருடங்களில்}}}}`
};
